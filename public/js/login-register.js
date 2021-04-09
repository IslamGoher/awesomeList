const container = document.getElementById('formContainer');
const signUpAnimate = document.getElementById('signUp');
const signInAnimate = document.getElementById('signIn');

const loginForm = document.querySelector('.login');
const loginSubmit = document.querySelector('#loginBtn');
const loginErrorElement = document.querySelector('.login-error');

const signUpForm = document.querySelector('.register');
const signUpSubmit = document.querySelector('#signupBtn');
const signUpErrorElement = document.querySelector('.signup-error');


// form overlay animation
const formAnimation = () =>{
	signUpAnimate.addEventListener('click', () => {
		container.classList.add("bottom-panel-active");
	});
	signInAnimate.addEventListener('click', () => {
		container.classList.remove("bottom-panel-active");
	});
}
formAnimation();



// email validation RegEx
const emailRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


// form validation
const validateForm = (enteredName,enteredEmail,enteredPassword) => {
	// array to contain error messages
	let errorMessages = [];

	// check if empty or valid
	if (!enteredName || enteredName.length < 5) {
		errorMessages.push('Enter valid name');
	}
	if (!enteredEmail || !emailRegEx.test(enteredEmail)) {
		errorMessages.push('Enter valid email');
	}
	if (!enteredPassword || enteredPassword.length < 8) {
		errorMessages.push('Enter valid password');
	}

	// display error message (return true to send request)
	if (errorMessages.length === 0) {
		signUpErrorElement.style.display = "none";
		return true;
	}else if (errorMessages.length > 0 && errorMessages.length <= 2) {
		signUpErrorElement.innerText = `* ${errorMessages.join(', ')}`;
		signUpErrorElement.style.display = "block";
		return false;
	}else if (errorMessages.length > 2) {
		signUpErrorElement.innerText = `* Enter valid values`;
		signUpErrorElement.style.display = "block";
		return false;
	}
}



// signup form submit
signUpSubmit.addEventListener('click', (e) => {
	e.preventDefault();
	const enteredName = signUpForm.name.value.trim();
	const enteredEmail = signUpForm.email.value.trim();
	const enteredPassword = signUpForm.password.value;

	if (validateForm(enteredName,enteredEmail,enteredPassword)) {
		const data = {
			method: 'signup',
			params: {
				name: enteredName,
				email: enteredEmail,
				password: enteredPassword
			}
		};
		authPostRequest('http://localhost:3000/api/v1/signup' , data);
	}
});



// display wrong email or password when enter wrong data in login form
const unauthorizedError = () => {
	loginErrorElement.innerText = `* Wrong email or password`;
	loginErrorElement.style.display = "block";
}

// login form submit
loginSubmit.addEventListener('click', (e) => {
	e.preventDefault();
	const enteredEmail = loginForm.email.value.trim();
	const enteredPassword = loginForm.password.value;

	if (!enteredEmail || !emailRegEx.test(enteredEmail)) {
		loginErrorElement.innerText = '* Enter valid email';
		loginErrorElement.style.display = "block";
	}else{
		const data = {
			method: 'authentication',
			params: {
				email: enteredEmail,
				password: enteredPassword
			}
		};
		authPostRequest('http://localhost:3000/api/v1/auth' , data);
	}

});