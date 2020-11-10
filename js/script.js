//focus on first element by default when page first loads
const userName = document.getElementById('name');
userName.focus();


/**
 * Job Role Section
 */
//hide the input field for other job titles
const userOtherTitle = document.getElementById('other-title');
userOtherTitle.style.display = "none";
//add event listener for jobs drop-down to determine when other text input field is available
const userTitleDropDown = document.getElementById('title');
userTitleDropDown.addEventListener('change', () => {
    let selectedItemValue = userTitleDropDown.options[userTitleDropDown.selectedIndex].text;
    if(selectedItemValue == 'Other'){
        userOtherTitle.style.display = "";
    }
    else{
        userOtherTitle.style.display = "none";
    }
});



/**
 * T-shirt Info Section
 */
//elements for the shirt
const userShirtSize = document.getElementById('size'); //drop-down for size
const userShirtDesign = document.getElementById('design'); //drop-down for designs
const userShirtColor = document.getElementById('color'); //drop-down for colors
//hide color fields from being visible and display “Please select a T-shirt theme”.
userShirtColor.style.display = "none";
let error = document.createElement('p');
error.textContent = "Please select a T-shirt theme";
error.style.color = 'red';
error.style.fontWeight = 'bold';
userShirtColor.parentNode.appendChild(error);
//add the listener to the shirt drop down
userShirtDesign.addEventListener('change', () => {

    //capture valuse of the drop down into a variable
    let shirtValue = userShirtDesign.value;
    let colors = document.getElementById('color').children; //list of all color elements
    let selectedItemText = userShirtColor.options[userShirtColor.selectedIndex].text;
    switch(shirtValue){
        case 'Select Theme':
            //console.log('select theme selected');
            userShirtColor.style.display = "none";
            error.style.display = "";

            break;

        case 'js puns':
           // console.log('js puns selected');
            userShirtColor.style.display = "";
            error.style.display = "none";
            //if selected item is unavailable changed selected item to available color
            if(!selectedItemText.includes('JS Puns')){
               //set to default of cornflower blue
                userShirtColor.value = 'cornflowerblue';
            }
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
            //console.log('heart js selected');
            userShirtColor.style.display = "";
            error.style.display = "none";
            if(selectedItemText.includes('JS Puns')){
                //set to default of tomato
                 userShirtColor.value = 'tomato';
             }

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



/**
 * Register for Activities Section
 */
//select all the checkboxes and parent of all checkboxes for the click listners
const userActivities = document.querySelectorAll('input[type=checkbox]');
const activitiesRegistration = document.querySelector('.activities');
//add click event listener to the Registration area
activitiesRegistration.addEventListener('click', (event) => {
    //get element that orginated the event
    const element = event.target;
    let totalCost = 0;

    for(let i = 0; i < userActivities.length; i++){
        if(element.getAttribute('data-day-and-time') == userActivities[i].getAttribute('data-day-and-time') &&
        element.getAttribute('name') != userActivities[i].getAttribute('name')){
            //disable activites with conflicting times when checked
            if(element.checked){
                userActivities[i].disabled = true;
                userActivities[i].parentNode.style.textDecoration = 'line-through';
            }
            //enable activities when item is unchecked
            else{
                userActivities[i].disabled = false;
                userActivities[i].parentNode.style.textDecoration = '';
            }
        }
        
        //Check to see which elements is selected and add it to the total cost
       if(userActivities[i].checked){
        //add cost of checked element to total
        totalCost += parseInt(userActivities[i].getAttribute('data-cost'));
       }

    }

    //display the total cost, if total = 0 hide the total
    const totalElement = document.querySelector('#total-cost');
    if(totalCost > 0){
        //if user total element does not exist add it to the DOM
        
        if(totalElement == 'undefined' || totalElement == null){
            //create and add element to the div
            let userTotal = document.createElement('p');
            userTotal.textContent = `Total: $${totalCost.toFixed(2)}`; //output test: console.log(userTotal);
             userTotal.id = 'total-cost';
            userTotal.style.borderStyle = 'solid';
            activitiesRegistration.appendChild(userTotal);
        }
        else{
            //update the total
            totalElement.textContent = `Total: $${totalCost.toFixed(2)}`;
        } 
    }
    else{
        //clear element if it exists and the total is 0
        if(totalElement != 'undefined' && totalElement != null){
            activitiesRegistration.removeChild(totalElement);
        }
    }

});



/**
 * Payment Info Section
 */
//Select elemnents for payment information section and set default to credit card
const userPayment = document.getElementById('payment');
userPayment.selectedIndex = 1;

//disable Select Payment option
userPayment.options[0].disabled = true;

 //select sections for different payments and default of paypal and bitcoin info hidden
 const creditCardInfo = document.getElementById('credit-card');
 const paypalInfo = document.getElementById('paypal');
 paypalInfo.style.display = "none";
 const bitcoinInfo = document.getElementById('bitcoin');
 bitcoinInfo.style.display = "none";

//add action listener to hide #credit-card div if Paypal or Bitcoin are selected
userPayment.addEventListener('change', (event) => {
    //determine which option was selected and assign value to variable
    let selectedItem = userPayment.options[userPayment.selectedIndex].value;
    //determine which info is shown based on selected item id
    switch(selectedItem){
        case 'credit card':
            creditCardInfo.style.display = "";
            paypalInfo.style.display = "none";
            bitcoinInfo.style.display = "none";
            break;
        case 'paypal':
            creditCardInfo.style.display = "none";
            paypalInfo.style.display = "";
            bitcoinInfo.style.display = "none";
            break;
        case 'bitcoin':
            creditCardInfo.style.display = "none";
            paypalInfo.style.display = "none";
            bitcoinInfo.style.display = "";
                break;
    }
});

//select submit button and add listener for it to check all fields for valid content