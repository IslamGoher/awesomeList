console.log(`test`);

document.querySelector('.logout-btn').addEventListener('click', () => {
  logoutRequest('http://localhost:3000/api/v1/logout');
});