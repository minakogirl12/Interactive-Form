//Select all the DOM input elements into variables
const userName = document.getElementById('name'); //line of text
const userEmail = document.getElementById('mail'); //line of text
const userTitle = document.getElementById('title');  //drop-down menu
const userOtherTitle = document.getElementById('other-title');

//elements for the shirt
const userShirtSize = document.getElementById('size');
const userShirtDesign = document.getElementById('design');
const userShirtColorDiv = document.querySelector('#shirt-colors');
const userShirtColor = document.getElementById('color');

//array of all the activities
const userActivities = document.querySelectorAll('input[type=checkbox]'); //adapted from Stackoverflow code: document.querySelectorAll('input[type=text]')


//hide the input field for other job titles
userOtherTitle.style.display = "none";

//hide color fields from being visible
userShirtColorDiv.style.display = "none";

//focus on first element by default when page first loads
userName.focus();



//add the listener to the shirt drop down
userShirtDesign.addEventListener('change', () => {

    //capture valuse of the drop down into a variable
    let shirtValue = userShirtDesign.value;
    let colors = document.getElementById('color').children; //list of all color elements
    
    switch(shirtValue){
        case 'Select Theme':
            console.log('select theme selected');
            userShirtColorDiv.style.display = "none";

            break;
        case 'js puns':
            console.log('js puns selected');
            userShirtColorDiv.style.display = "";
            break;
        case 'heart js':
            console.log('heart js selected');
            userShirtColorDiv.style.display = "";
            break;

    }


});