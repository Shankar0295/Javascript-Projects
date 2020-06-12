const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('confirm_password');
const pwd = document.getElementsByClassName('pwd2')[0].id;
//show input error messages
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//Show success Outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

//Check email
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   if (re.test(input.value.trim())) {
        showSuccess(input);
    }else if(input.value.length === 0){
        showError(input, `${getFieldName(input)} is required`);
    } else {
        showError(input, 'Email is not valid');
    }
}
//Check requried fields
function checkRequired(inputArr) {
    inputArr.forEach(function (input) {
        if(input.id === pwd && input.value.length <= 0){
            showError(input, 'Password is required')
        }
        else if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        }else {
            showSuccess(input);
        }
    })
}
// Check input length
function checkLength(input, min, max) {
    if (input.value.trim() == '') {
        showError(
            input,
            `${getFieldName(input)} is required`
        );
    }
    else if (input.value.length < min) {
        showError(
            input,
            `${getFieldName(input)} must be at least ${min} characters`
        );
    } else if (input.value.length > max) {
        showError(
            input,
            `${getFieldName(input)} must be less than ${max} characters`
        );
    } else {
        showSuccess(input);
    }
}

// Check passwords match
function checkPasswordMatch(inp1, inp2) {
    if (inp1.value !== inp2.value) {
        showError(inp2, 'Passwords do not match');
    }
}

//Get fieldname
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Event Listeners
form.addEventListener('submit', function (e) {
    e.preventDefault();
    if(username.value != '' && email.value != '' && password.value != '' && password.value === password2.value){
        window.location.href = "https://www.google.com"
    }

    checkRequired([username, email, password, confirm_password]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkPasswordMatch(password, confirm_password);
    checkEmail(email);
})
