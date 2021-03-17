const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('formContainer');

signUpButton.addEventListener('click', () => {
	container.classList.add("bottom-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("bottom-panel-active");
});