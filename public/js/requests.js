
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
		console.log('Success:', data);
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
  .then(data => console.log('Success:', data))
  .catch(error => console.error('Error:', error));
}