document.getElementById('go-to-generate').addEventListener('click', function() {
  // Hide the home section and show the generate section
  document.getElementById('home-section').style.display = 'none';
  document.getElementById('generate-section').style.display = 'block';
});

document.getElementById('go-to-fetch').addEventListener('click', function() {
  // Hide the home section and show the fetch section
  document.getElementById('home-section').style.display = 'none';
  document.getElementById('fetch-section').style.display = 'block';
});

document.getElementById('back-to-home-from-generate').addEventListener('click', function() {
  // Hide the generate section and show the home section
  document.getElementById('generate-section').style.display = 'none';
  document.getElementById('home-section').style.display = 'block';
});

document.getElementById('back-to-home-from-fetch').addEventListener('click', function() {
  // Hide the fetch section and show the home section
  document.getElementById('fetch-section').style.display = 'none';
  document.getElementById('home-section').style.display = 'block';
});

document.getElementById('generate').addEventListener('click', async function() {
  var length = document.getElementById('length').value;
  var useDigits = document.getElementById('useDigits').checked;
  var useSpecialChars = document.getElementById('useSpecialChars').checked;

  chrome.tabs.query({active: true, currentWindow: true}, async function(tabs) {
    var site = tabs[0].url;
    console.log('Site: ' + site);

    var password = generatePassword(length, useDigits, useSpecialChars);

    // Store the password associated with the site
    fetch('http://localhost:3000/storePassword', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ site, password: password })
    }).then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => console.log('Password saved for ' + site))
    .catch(error => console.log('There was a problem with the fetch operation: ' + error.message));

    // After generating the password, hide the generate section and show the fetch section
    document.getElementById('generate-section').style.display = 'none';
    document.getElementById('fetch-section').style.display = 'block';
  });
});

document.getElementById('fetch').addEventListener('click', async function() {
  chrome.tabs.query({active: true, currentWindow: true}, async function(tabs) {
    var site = tabs[0].url;
    console.log('Site: ' + site);

    fetch('http://localhost:3000/getPassword/' + encodeURIComponent(site))
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      document.getElementById('password').innerText = data.password;
    })
    .catch(error => console.log('There was a problem with the fetch operation: ' + error.message));

    // After fetching the password, hide the fetch section and show the generate section
    document.getElementById('fetch-section').style.display = 'none';
    document.getElementById('generate-section').style.display = 'block';
  });
});

function generatePassword(length, useDigits, useSpecialChars) {
  var lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  var uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var digits = useDigits ? '0123456789' : '';
  var specialCharacters = useSpecialChars ? '!@#$%^&*()_-+=<>?' : '';

  var characters = lowercaseLetters + uppercaseLetters + digits + specialCharacters;
  if (!characters) return 'Invalid complexity settings';

  var password = '';
  for (var i = 0; i < length; i++) {
    password += characters[Math.floor(Math.random() * characters.length)];
  }
  return password;
}
