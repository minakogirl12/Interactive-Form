function isValid(){
    //console.log("you've reached the validation area"); - verifies that function is called properly

    //check all forms and if not valid change for validity to false and return it
    let valid = true;
    if(!validateBasicInfo()){
        valid = false;
    }
    if(!validTShirtInfo()){
        valid = false;
    };
    if(!validActivities()){
        valid = false;
    };
    if(!validPayment())
    {
        valid = false;
    }
    return valid;
   
}

/**
 * Function to validate the name and email fields
 * Displays error message if there is invalid input in the form
 * returns true if the input fields have valid information
 */
function validateBasicInfo(){
    //capture if name field is not empty if name field is empty display error message
    let nameExists = document.getElementById('name').value != "";

    //capture email information and check for correct formattting
    let userEmail = document.getElementById('mail').value;
    let regexTest = /^[\w\d]+@[\w]+\.[\w]{2,3}$/m;
    let isValidEmail = regexTest.test(userEmail);
    
    //check if other job title is selected and the text field is not empty
    let validJobTitle;
    if(document.getElementById('title').value == 'other' && document.getElementById('other-title').value == ""){
        validJobTitle = false;
    }
    else{
        validJobTitle = true;
    }

    
    //if both are true return true, and remove any error messages if they exist
    //else return false and display error messages
    if(nameExists && isValidEmail && validJobTitle){

        //remove error messages
        removeErrorMessage('name-error');
        removeErrorMessage('mail-error');
        removeErrorMessage('title-error');

        return true;
    }
    else{
        //display error is name does not exist and remove it it does exist
        if(!nameExists){

            //create error message for name element
            addErrorMessage(document.getElementById('name').parentElement, document.getElementById('name').nextElementSibling, 
            'name-error', 'Name field cannot be empty');
            
            console.log('invalid name');
        }
        else{
            removeErrorMessage('name-error');
        }
        //display error is email is not formatted as XXXXX@XXXXX.XXX
        if(!isValidEmail){
            addErrorMessage(document.getElementById('mail').parentElement, document.getElementById('mail').nextElementSibling,
             'mail-error','Invalid email format');
            console.log('invalid email');

        }
        else{
            removeErrorMessage('mail-error');
        }
        //display error if other job title field is empty
        if(!validJobTitle){
            addErrorMessage(document.getElementById('other-title').parentElement, document.getElementById('other-title').nextElementSibling,
             'title-error','Must enter a job title');
        }
        else{
            removeErrorMessage('title-error');
        }
        return false;
    }

}

/**
 * If a valid t-shirt theme is not selected the form will not be considered valid
 */
function validTShirtInfo(){
    //if select theme is selected the return false else return true
    if(document.getElementById('design').value == 'Select Theme'){
        return false;
    }
    else{
        return true;
    }

}

/**
 * Verify that at least on activity is select or display and error message
 */
function validActivities(){
    //select all checkboxes
    const userActivities = document.querySelectorAll('input[type=checkbox]');

    //check if at least on checkbox is selected default to false
    let activitySelected = false;
    for(let i = 0; i < userActivities.length; i++){
        if(userActivities[i].checked == true ){
            activitySelected = true;
        }
    }

    //return that this is a section is valid
    if(activitySelected){
        removeErrorMessage('activity-error');
        return activitySelected;
    }
    //display errror message and return false
    else{
        //select the Register for Activites legend and display error under it
        const activityLegend = document.querySelector('fieldset.activities legend');
        addErrorMessage(activityLegend.parentElement, activityLegend.nextElementSibling, 
            'activity-error', 'At least one activity must be selected');
        return activitySelected;
    }
}


function validPayment(){
    
    //select drop down and preform test if credit card is selected
    const paymentElement = document.getElementById('payment');
    const paymentType = paymentElement.options[paymentElement.selectedIndex].value;

    if(paymentType == 'credit card'){

        //regular expressions for testing
        let ccTest = /^[\d]{13,16}$/; //checks for all digits the a lenght between 13-16
        let zipTest = /^[\d]{5}$/; //checks for all digits the a lenght between 5
        let ccvTest = /^[\d]{3}$/; //checks for all digits the a lenght between 3

        //select text in all payment fileds
        //check if the payment fields are filled correctly
        let userCardNum = document.getElementById('cc-num').value;
        let userZipCode = document.getElementById('zip').value;
        let userCVV = document.getElementById('cvv').value;

        //run tests
        const cardIsValid = ccTest.test(userCardNum);
        const zipIsValid = zipTest.test(userZipCode);
        const cvvIsValid = ccvTest.test(userCVV);

        //check for valid info else display error message
        if(cardIsValid && zipIsValid && cvvIsValid){
            //remove error if it exists
            removeErrorMessage('payment-error');
            return true;
        }
        else{
            
            //create error message
            let error = "";
            
            if(!cardIsValid){
                 //add card error message
                 error += "Card number must be between 13 and 16 digits. ";
            }
            if(!zipIsValid){
                 //add zip code error message
                 error += "Zip code must be 5 digits. ";
            }
            if(!cvvIsValid){
                 //add cvv error message
                 error += "CVV must be 3 digits";
            }

             //display error message
             addErrorMessage(document.getElementById('credit-card'), document.getElementById('credit-card').firstElementChild, 
             'payment-error', error);
            return false;
        }
    }
    else{
        //remove any error messages and return true if Bitcoin or Paypal is selected
        removeErrorMessage('payment-error');
        return true;
    }

}

/**
 * 
 * @param {*} parentElement 
 * @param {*} insertBeforeElement Element that the error message will be added after
 * @param {*} elementID id of the error message for identification when it needs to be removed
 * @param {*} message Error message
 * 
 * Creates an error message for an invalid input and displays it to the DOM
 */
function addErrorMessage(parentElement, insertBeforeElement, elementID, message){

    //create and add error message only if on previously did not exist
    if(document.getElementById(elementID) == null || document.getElementById == 'undefined'){
        const errorMsg = document.createElement('p');
        errorMsg.textContent = message;
        errorMsg.id = elementID;
        errorMsg.className = 'error';
        parentElement.insertBefore(errorMsg, insertBeforeElement);
    }
    

}

/**
 * @param id is the id element containing the error message
 * Checks is there is an element displaying and error message and removes it
 */
function removeErrorMessage(id){

    const element = document.getElementById(id);
    if(element != null && element != 'undefined'){
        element.parentElement.removeChild(element);
    }
}