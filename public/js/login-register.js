const container = document.getElementById('formContainer');
const signUpAnimate = document.getElementById('signUp');
const signInAnimate = document.getElementById('signIn');

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



// form validation
const validateForm = (enteredName,enteredEmail,enteredPassword) => {

	const emailRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(enteredEmail);

	// array to contain error messages
	let errorMessages = [];

	// check if empty or valid
	if (!enteredName || enteredName.length < 5) {
		errorMessages.push('Enter valid name');
	}
	if (!enteredEmail || !emailRegEx) {
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
		signupRequest(data,'http://localhost:3000/api/v1/signup');
	}
});