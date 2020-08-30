// Get a reference to the "Generate Password" button element
let generateBtn = document.getElementById('generate')
// Add a "click" event listener to the button that will display a new password
generateBtn.addEventListener('click', displayNewPassword)

/**
 * This `click` event handler function will generate a new password
 * and then display it as the value for the `#password` element
 * @returns {void} Nothing
 */
function displayNewPassword () {
  let criteria = getCriteria()
  let password = generatePassword(criteria)
  let passwordText = document.getElementById('password')
  passwordText.value = password
}


/* Your solution code goes here ... */

function getCriteria() {
  
  const userCriteria = {
    length: 8,
    includeLowercase: true,
    includeUppercase: false,
    includeNumbers: false,
    includeSpecialChar: false,
  }

  userCriteria.length = askPasswordLength();
  //console.log(userCriteria.length);

  do {
    userCriteria.includeLowercase = confirm("Would you like to include lowercase characters in your password?");

    userCriteria.includeUppercase = confirm("Would you like to include uppercase characters in your password?");

    userCriteria.includeNumbers = confirm("Would you like to include numbers in your password?");

    userCriteria.includeSpecialChar = confirm("Would you like to include special characters in your password?");
    
    //console.log(userCriteria.characterTypes);
  } while(!isACharacterTypeSelected(userCriteria));

  return userCriteria;
}

function isACharacterTypeSelected(userCriteria) {
  const userCriteriaKeys = Object.values(userCriteria);
  
  for (let i = 1; i < userCriteriaKeys.length; i ++) {
    if (userCriteriaKeys[i]) {
      return true;
    }
  }
  alert("You did not select any character types to include in your password. \n Please answer 'OK' at least to one of the character types.");
  return false;
}

function askPasswordLength() {
  let length = prompt("How long would you like the password to be? (Must be a number from 8 to 128)");

  while (!isPasswordLengthValid(length)) {
    length = prompt(`Sorry, ${length} is an invalid length.` + '\n The length must be: \n - An integer \n - At minimum, 8 \n - At maximum, 128 \nHow long would you like the password to be?');
  }
  return length;
}

function isPasswordLengthValid(length) {
  const convertedLength = Number(length);
  const isPassLengthValid = (!Number.isNaN(convertedLength)
    && convertedLength % 1 === 0
    && convertedLength >= 8
    && convertedLength <= 128); 

  return isPassLengthValid;
}

function generatePassword(userCriteria) {
  const allRequestedCharacters = getRequestedCharacters(userCriteria);

  /*To ensure that all character types appear in the password,
  a list is generated of all the selected character types. 
  When a character type is used, it is removed
  from the list so that it may not be randomly selected
  again and the computer has to select another character type. 
  Once the list of possible character types to pick from is exhausted, 
  this list is refreshed again.*/

  const numberOfCharacterTypes = allRequestedCharacters.length;
  //generated list here
  let availableCharacterTypes = getListOfCharacterTypes(numberOfCharacterTypes);

  let password = [];

  for (let i = 0; i < userCriteria.length; i ++) {
    const indexOfCharType = Math.floor(Math.random()*availableCharacterTypes.length);
    const charType = availableCharacterTypes[indexOfCharType];

    const charNum = Math.floor(Math.random() * (allRequestedCharacters[charType].length));
    
    password.push(allRequestedCharacters[charType][charNum]);

    //removed used character type here
    availableCharacterTypes.splice(indexOfCharType, 1);
    if (availableCharacterTypes.length === 0) {
      availableCharacterTypes = getListOfCharacterTypes(numberOfCharacterTypes);
    }
  }
  password = password.toString().replace(/,/g,"");

  return password;
}

function getListOfCharacterTypes(numberOfCharacterTypes) {
  let charTypes = [];
  for (let i = 0; i < numberOfCharacterTypes; i ++) {
    charTypes.push(i);
  }
  return charTypes;
}

function getRequestedCharacters(userSelection) {
  let allRequestedCharacters = [];
  
  if (userSelection.includeLowercase) {
    allRequestedCharacters.push(getLowercaseList());
  } 
  if (userSelection.includeUppercase) {
    allRequestedCharacters.push(getUppercaseList());
  } 
  if (userSelection.includeNumbers) {
    allRequestedCharacters.push(getNumbersList());
  } 
  if (userSelection.includeSpecialChar) {
    allRequestedCharacters.push(getSpecialCharactersList());
  }
  
  return allRequestedCharacters;
}

function getLowercaseList() {
  const lowercase = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  return lowercase;
}

function getUppercaseList() {
  const upperCase = getLowercaseList().toString().toUpperCase().split(",");
  return upperCase;
}

function getNumbersList() {
  const numbers = [0,1,2,3,4,5,6,7,8,9];
  return numbers;
}

function getSpecialCharactersList() {
  const specialChar = ['!', '"', '#', "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "]", "\\", "]", "^", "_", "`","{", "|", "}", "~"];
  return specialChar;
}