const form = document.querySelector('.intro__form');
const inputFieldsMap = ['firstname', 'lastname', 'email', 'password'];
const labelFields = document.querySelectorAll('.intro__form-label');
const errorObject = {};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const values = inputFieldsMap.map((field) => formData.get(field));

  if (isFormValid(values)) {
    console.log('Form submitted successfully');
    form.reset();
  }

});

function isFormValid(values) {
  const [firstname, lastname, email, password] = values;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const errorObject = {};

  if (!firstname.trim() || firstname.length === 0) {
    errorObject.firstname = 'First Name cannot be empty';
    console.error('First cannot be empty');    
  }

  if (!lastname.trim() || lastname.length === 0) {
    errorObject.lastname = 'Last Name cannot be empty';
    console.error('Last cannot be empty');
  }

  if (!email.trim() || email.length == 0 || !emailRegex.test(email)) {
    errorObject.email = 'Looks like this is not a proper email format';
    console.error('Looks like this is not a proper email format');
  }

  if (!password.trim() || password.length === 0) {
    errorObject.password = 'Password cannot be empty';
    console.error('Password cannot be empty');
  }

  displayErrors(errorObject);

  return Object.keys(errorObject).length === 0;
}

function displayErrors(errorObject) {
  labelFields.forEach((labelField) => {
    labelField.classList.remove('error');
    labelField.querySelector('.intro__form-error-message').textContent = '';
  });

  for (const [key, value] of Object.entries(errorObject)) {
    const inputField = document.querySelector(`label[for=${key}]`);
    inputField.classList.add('error');
    inputField.querySelector('.intro__form-error-message').textContent = value;
  }
}