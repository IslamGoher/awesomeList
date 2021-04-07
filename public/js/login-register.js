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

	// regEx validation functions that returns true if valid
	const isValid = {
		isName: function(name){
			if (name >= 5) {
				return true;
			}else{
				return false;
			}
		},
		isEmail: function(email){
			return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
		},
		isPassword: function(password){
			if (password >= 8) {
				return true;
			}else{
				return false;
			}
		}
	};

	// array to contain error messages
	let errorMessages = [];

	// check if empty
	if (enteredName === '' || enteredName == null) {
		errorMessages.push('Name is required');
	}else if(isValid.isName(enteredName)){
		errorMessages.push('Enter valid name');
	}
	if (enteredEmail === '' || enteredEmail == null) {
		errorMessages.push('Email is required');
	}else if(!(isValid.isEmail(enteredEmail))){
		errorMessages.push('Enter valid Email');
	}
	if (enteredPassword === '' || enteredPassword == null) {
		errorMessages.push('Password is required');
	}else if(!(isValid.isPassword(enteredPassword))){
		errorMessages.push('Enter valid Password');
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
		signUpErrorElement.innerText = `* ${errorMessages.join(', ')}`;
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
		console.log(data);
		// signupRequest(data);
	}
});