
// signup form post request
const signupRequest = (data,url) => {
  fetch(url , {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
	.then(response => response.json())
	.then(data => {
		// console.log('Success:', data.redirectURL);
		window.location.replace(`http://localhost:3000${data.redirectURL}`);
	})
	.catch((error) => {
		console.error('Error:', error);
	});
}

// logout DELETE request
const logoutRequest = (url) => {
  fetch(url , {
    method: 'DELETE',
  })
  .then(response => response.json())
  .then(data => {
		// console.log('Success:', data);
		window.location.replace(`http://localhost:3000${data.redirectURL}`);
	})
  .catch(error => console.error('Error:', error));
}