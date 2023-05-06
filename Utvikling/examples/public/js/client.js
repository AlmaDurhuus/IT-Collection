
//------ option/Sort-----------//
function optionSort() {
    //Selecting the option id and getting all divs with item calss
    const option = document.getElementById('option').value;
    const itemArray = Array.from(document.getElementsByClassName('item'))

    //Looping through the items and setting their display
    for (let i = 0; i < itemArray.length; i++) {
        const element = itemArray[i];
        if (option === "none" || element.id === option) {
            element.style.display = "block";
          } else {element.style.display = "none";}
    }
  }
  