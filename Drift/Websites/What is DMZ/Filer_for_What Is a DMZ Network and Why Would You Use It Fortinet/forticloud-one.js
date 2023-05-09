
var FORTINETONE_URL = 'https://site.fortinet.com/one';

/**
 *	sample javascript file for fortinet.com to do forticloud login and show menu
 */


//user email and menu html
var fclogin_useremail = '';
var fcmenu_services = '';
var fcmenu_support = '';
var fcmenu_user = '';

function fcmenu_reset() {
	fclogin_useremail = '';
	fcmenu_services = '';
	fcmenu_support = '';
	fcmenu_user = '';
}

/*
 * create menu html by json.
 *  - the parameter menu json has array of 'groups', each group has array of 'items'
 *  - each menu item has 'url' for link, 'display_name' as label, and 'image_content' (base64 image data)
 */
function fcmenu_create_menu_html(menu) {
	var menuHtml = '';

	if (menu != null && menu.groups.length > 0) {
		menuHtml = '<div class="fc-menu-content">';

		for (var i = 0; i < menu.groups.length; i++) {
			var group = menu.groups[i];

			menuHtml += '<div class="fc-menu-group">';

			if (group.display_name != null && group.display_name != '') {
				menuHtml += '<div class="fc-menu-group-title">' + group.display_name + '</div>';
			}

			menuHtml += '  <div class="fc-menu-group-body">';
			menuHtml += '    <ul>';

			if (group.items.length > 0) {
				for (var j = 0; j < group.items.length; j++) {
					var item = group.items[j];

                    if(item.display_name != "User Information" && item.display_name != "Switch Accounts" && item.display_name != "Switch Roles")
                    {
					menuHtml += '<li class="fc-menu-item">';

					/*if (item.image_content != null && item.image_content != '') {
						menuHtml += '<a href="' + item.url + '">' +
									'  <img src="data:image/svg+xml;base64,' + item.image_content + '">' +
									'</a>';
					}
					else {
						menuHtml += '<span class="img-placeholder"></span>';
					}

					menuHtml += '<a class="fc-menu-link" href="' + item.url + '">' + item.display_name + '</a>';
                    */
                    menuHtml += '<div data-url="' + item.url + '">'

					if (item.image_content != null && item.image_content != '') {
						menuHtml += '<span>' +
									'  <img src="data:image/svg+xml;base64,' + item.image_content + '">' +
									'</span>';
					}
					else {
						menuHtml += '<span class="img-placeholder"></span>';
					}
                    menuHtml += '<span>' + item.display_name + '</span>';
                    menuHtml += '</div>';

                    menuHtml += '</li>';
                    }

				}
			}

			menuHtml += '    </ul>';
			menuHtml += '  </div>'
			menuHtml += '</div>'
		}
		/*if(menu.name == "services")
        {
            menuHtml += '<form id="forticloud_one_form" method="POST" action="#"><input type="hidden" name="h_key" value="{source_app: \'fortinet.com\', account_id: \'0\', user_id: \'0\', visited_sites: [{app_name: \'fortinet.com\', last_url: \'' + window.location.href + '\'}]}" /></form>';
        }*/
		menuHtml += '</div>';
	}

	return menuHtml;
}

/**
 * create menus by login return (json)
 */
function fcmenu_create_all_menu(cloudLogin) {
	if (cloudLogin == null) {
		return false;
	}

	fcmenu_reset();

	if (cloudLogin.login == true) {					//login success
		fclogin_useremail = cloudLogin.email;		//login user's email

		for (var i = 0; i < cloudLogin.menus.length; i++) {
			var menu = cloudLogin.menus[i];
			var menuHtml = fcmenu_create_menu_html(menu);

			if (menu.name == 'services') {
                fcmenu_services = menuHtml;
			}
			else if (menu.name == 'support') {
				fcmenu_support = menuHtml;
			}
			else if (menu.name == 'user') {
				fcmenu_user = menuHtml;
			}
		}


	}

	return ((fclogin_useremail != '') && (fcmenu_services != '') && (fcmenu_support != '') && (fcmenu_user != ''));
}

//save menu data to local storage as cache
function fcmenu_save_cache() {
	localStorage.setItem('fclogin-timestamp', Date.now());
	localStorage.setItem('fclogin-useremail', fclogin_useremail);
	localStorage.setItem('fcmenu-services', fcmenu_services);
	localStorage.setItem('fcmenu-support', fcmenu_support);
	localStorage.setItem('fcmenu-user', fcmenu_user);
}

//load cached menu data from local storage (skip expired data if saved 30 minutes ago)
function fcmenu_load_cache() {
	var ts = localStorage.getItem('fclogin-timestamp');

	try {
		if (ts && (Date.now() - parseInt(ts) < 30 * 60 * 1000)) { 	// within 30 minutes
			fclogin_useremail	= localStorage.getItem('fclogin-useremail');
			fcmenu_services	= localStorage.getItem('fcmenu-services');
			fcmenu_support	= localStorage.getItem('fcmenu-support');
			fcmenu_user		= localStorage.getItem('fcmenu-user');

			return (fclogin_useremail != null && fclogin_useremail != '' &&
					fcmenu_services != null && fcmenu_services != '' &&
					fcmenu_support != null && fcmenu_support != '' &&
					fcmenu_user != null && fcmenu_user != '' );
		}
	} catch (e) {
	}

	return false;
}

//clear cached menu data
function fcmenu_clear_cache() {
	localStorage.removeItem('fclogin-timestamp');
	localStorage.removeItem('fclogin-useremail');
	localStorage.removeItem('fcmenu-services');
	localStorage.removeItem('fcmenu-support');
	localStorage.removeItem('fcmenu-user');
    $('#forticloud_one_form').remove();
}

/**
 * put menu html into the wrapper element.
 * e.g. for 'services' menu, put menu html into DOM element with id of 'fc-menu-services-wrap'
 */
function fcmenu_set_menu(menuHtml, id) {
	if ($('#fc-menu-' + id).length) {	//menu is there
		$('#fc-menu-' + id + '-wrap').html(menuHtml);
	}
}

/**
 * 1) hide DOM elements with class 'fc-menu-hide-after-loggedin'
 * 2) set menu html into wrapper elements
 * 3) show DOM elements with class 'fc-menu-show-after-loggedin'
 */
function fcmenu_show_all_menu() {
	$('.fc-menu-hide-after-loggedin').hide();

	$('#fc-menu-loggedin-user').html(fclogin_useremail);
	fcmenu_set_menu(fcmenu_services, 'services');
	fcmenu_set_menu(fcmenu_support, 'support');
	fcmenu_set_menu(fcmenu_user, 'user');

	$('.fc-menu-show-after-loggedin').show();
    $('.fortinet-one.notloggedin-support').hide();
    $('.fortinet-one.notloggedin-demo').hide();


    //$('#nav-top').prepend('<form id="forticloud_one_form" method="POST" action="#"><input type="hidden" name="h_key" value="{source_app: \'fortinet.com\', account_id: \'0\', user_id: \'0\', visited_sites: [{app_name: \'fortinet.com\', last_url: \'' + window.location.href + '\'}]}" /></form>');

    $('#nav-top').prepend('<form id="forticloud_one_form" method="POST" action="#"><input type="hidden" id="h_key" name="h_key" value="" /></form>');
    $('#top-nav').prepend('<form id="forticloud_one_form" method="POST" action="#"><input type="hidden" id="h_key" name="h_key" value="" /></form>');


	fcmenu_link_click();
}

function fcmenu_logout() {
	fcmenu_clear_cache();

	var url = FORTINETONE_URL + '/logout';

    $.ajax({
		url: 	url,
		data:	{ token: 'f1wmkroxglh5bceqz3' },
		dataType: 'jsonp',
		success: function(data, textStatus, xhr) {
			;

		},
		error: function(xmlhttprequest, textstatus, message) {
			;
		}
	});

    return false;
}

function replaceUrlParam(url, name, value) {
	if (value == null) {
		value = '';
	}
	name = encodeURIComponent(name);
	value = encodeURIComponent(value);
	var pattern = new RegExp('\\b(' + name + '=).*?(&|#|$)');

	if (url.search(pattern) >= 0) {
		return url.replace(pattern, '$1' + value + '$2');
	}
	else {
		url = url.replace(/[?#]$/, '');
		return url + (url.indexOf('?') > 0 ? '&' : '?') + name + '=' + value;
	}
}

/**
 * login/logout click event handler
 * - for login, adding current page as parameter 'from' (for redirecting back same page after login)
 */
function fcmenu_link_click() {
	$('#fc-menu-user a').click(function() {
		var element = $(this);
		var link = element.attr('href');
		var url;

		if (link.endsWith('/login')) {
			url = replaceUrlParam(link, 'from', window.location.href);
			window.location = url;
			return false;
		}
		else if (link.endsWith('/Logout') || link.endsWith('/CommonLogout.aspx')) {
			fcmenu_logout();
            location.reload();
			//url = replaceUrlParam(link, 'ReturnApp', 'FortinetHome');
			//window.location = url;
			return false;
		}

		return true;
	});
}

jQuery(document).ready(function($) {

        	//fix accessibility for 2 supscription forms

         	if($('.footer-row.mobile').is(':visible'))
            {
    			$('.footer-row.desktop #email').attr('id','desktop-email');
                $('.footer-row.desktop #terms').attr('id','desktop-terms');
            }
            else
            {
                $('.footer-row.mobile #email').attr('id','mobile-email');
                $('.footer-row.mobile #terms').attr('id','mobile-terms');
            }
        	//end fix accessibility for 2 supscription forms

	//setup login click handler
	fcmenu_link_click();

	//load from local storage
	if (fcmenu_load_cache()) {
		fcmenu_show_all_menu();
		return;
	}


	//query menu data
	$.ajax({
		url: 	FORTINETONE_URL + '/api/menu',
		data:	{ token: 'f1wmkroxglh5bceqz3' },
		dataType:		'jsonp',
		success: function(data, textStatus, xhr) {
			if (xhr.status == 200) {
				if (fcmenu_create_all_menu(data)) {
					fcmenu_save_cache();
					fcmenu_show_all_menu();
				}
			}
		},
		error: function(xmlhttprequest, textstatus, message) {
			if (textstatus=='timeout' || textstatus=='error') {
			}
		}
	});


$('body').on('click','#fc-menu-services .fc-menu-item div,#fc-menu-support .fc-menu-item div,#fc-menu-user .fc-menu-item div',function(e){
    e.preventDefault();
    var fortioneURL = $(this).attr('data-url');
    $('#forticloud_one_form').attr('action',fortioneURL);

    var h_key = {
        "source_app": "fortinet.com",
        "user_id": 0,
        "sub_user_id": 0,
        "sub_user_fullaccess": "",
        "partner_id": "",
        "context_data": "",
    };
    var visited_sites = [];
    visited_sites.push({
            'app_name':'fortinet.com',
            'last_url' : location.href
        });
	h_key['visited_sites'] = visited_sites;
	$('#h_key').val(JSON.stringify(h_key));
    $('#forticloud_one_form').submit();

});



});
window.onpagehide = event => {
   // Clear the local storage
   fcmenu_clear_cache();
   $('#forticloud_one_form').remove();
}