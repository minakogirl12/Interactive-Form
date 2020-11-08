//elements for the shirt
const userShirtSize = document.getElementById('size'); //drop-down for size
const userShirtDesign = document.getElementById('design'); //drop-down for designs
const userShirtColor = document.getElementById('color'); //drop-down for colors

//hide the input field for other job titles
const userOtherTitle = document.getElementById('other-title');
userOtherTitle.style.display = "none";

//hide color fields from being visible and display “Please select a T-shirt theme”.
userShirtColor.style.display = "none";
let error = document.createElement('p');
error.textContent = "Please select a T-shirt theme";
error.style.color = 'red';
error.style.fontWeight = 'bold';
userShirtColor.parentNode.appendChild(error);

//focus on first element by default when page first loads
const userName = document.getElementById('name');
userName.focus();

//add the listener to the shirt drop down
userShirtDesign.addEventListener('change', () => {
    //capture valuse of the drop down into a variable
    let shirtValue = userShirtDesign.value;
    let colors = document.getElementById('color').children; //list of all color elements
    let selectedItemText = userShirtColor.options[userShirtColor.selectedIndex].text;
    switch(shirtValue){
        case 'Select Theme':
            console.log('select theme selected');
            userShirtColor.style.display = "none";
            error.style.display = "";

            break;

        case 'js puns':
            console.log('js puns selected');
            userShirtColor.style.display = "";
            error.style.display = "none";
            //if selected item is unavailable changed selected item to available color
            if(selectedItemText.includes('JS Puns')){}
            //Make sure only js puns colors are available
            for(let i = 0; i < colors.length; i++){
                if(colors[i].textContent.includes('JS Puns')){
                    colors[i].disabled = false;
                }
                else{
                    colors[i].disabled = true;
                }
            }
            //if selected item is unavailable changed selected item to available color
            break;

        case 'heart js':
            console.log('heart js selected');
            userShirtColor.style.display = "";
            error.style.display = "none";

            for(let i = 0; i < colors.length; i++){
                if(colors[i].textContent.includes('JS Puns')){
                    colors[i].disabled = true;
                }
                else{
                    colors[i].disabled = false;
                }
            }
            break;
        }}
        );