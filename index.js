const form = document.querySelector('.intro__form');
const validationRules = {
  firstname: {
    validate: value => value.trim() !== '',
    message: 'First Name cannot be empty'
  },
  lastname: {
    validate: value => value.trim() !== '',
    message: 'Last Name cannot be empty'
  },
  email: {
    validate: value => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
    message: 'Looks like this is not a proper email format'
  },
  password: {
    validate: value => value.trim() !== '',
    message: 'Password cannot be empty'
  }
};

const labelFields = document.querySelectorAll('.intro__form-label');
const errorObject = {};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const values = Object.fromEntries(formData.entries());
  const errors = validateForm(values);

  if (Object.keys(errors).length === 0) {
    console.log('Form submitted successfully');
    form.reset();
  }

  displayErrors(errors);

});

function validateForm(values) {
  const errors = {};
  for (const [field, rule] of Object.entries(validationRules)) {
    if (!rule.validate(values[field] ?? '')) {
      errors[field] = rule.message;
    }
  }
  return errors;
}

function displayErrors(errors) {
  document.querySelectorAll('.intro__form-label').forEach(label => {
    label.classList.remove('error');
    label.querySelector('.intro__form-error-message').textContent = '';
  });

  for (const [field, message] of Object.entries(errors)) {
    const label = document.querySelector(`label[for='${field}']`);
    if (!label) return;

    label.classList.add('error');
    label.querySelector('.intro__form-error-message').textContent = message;
  }
}