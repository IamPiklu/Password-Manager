// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Add event listener for 'go-to-generate' button
  document.getElementById('go-to-generate').addEventListener('click', function() {
    // Hide home section and show generate section
    document.getElementById('home-section').style.display = 'none';
    document.getElementById('generate-section').style.display = 'block';
  });

  // Add event listener for 'go-to-fetch' button
  document.getElementById('go-to-fetch').addEventListener('click', function() {
    // Hide home section and show fetch section
    document.getElementById('home-section').style.display = 'none';
    document.getElementById('fetch-section').style.display = 'block';
    // Fetch the password immediately
    fetchPassword();
  });

  // Add event listener for 'back-to-home-from-generate' button
  document.getElementById('back-to-home-from-generate').addEventListener('click', function() {
    // Hide generate section and show home section
    document.getElementById('generate-section').style.display = 'none';
    document.getElementById('home-section').style.display = 'block';
  });

  // Add event listener for 'back-to-home-from-fetch' button
  document.getElementById('back-to-home-from-fetch').addEventListener('click', function() {
    // Hide fetch section and show home section
    document.getElementById('fetch-section').style.display = 'none';
    document.getElementById('home-section').style.display = 'block';
  });

  // Add event listener for 'generate' button
  document.getElementById('generate').addEventListener('click', async function() {
    // Get the length of the password from the input field
    var length = document.getElementById('length').value;
    
    // Query the active tab
    chrome.tabs.query({active: true, currentWindow: true}, async function(tabs) {
      // Get the URL of the active tab
      var site = tabs[0].url;
      console.log('Site: ' + site);
  
      // Generate a password of the specified length
      var password = generatePassword(length);
  
      // Send a POST request to store the password for the site
      fetch('http://localhost:3000/storePassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ site, password: password })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Password saved for ' + site);
        // Display the generated password and hide some elements
        document.getElementById('generated-password').textContent = password;
        document.getElementById('generated-password-container').style.display = 'block';
  
        document.getElementById('generate').style.display = 'none';
        document.getElementById('length').style.display = 'none';
        document.getElementById('dig').style.display = 'none';
        document.getElementById('sp').style.display = 'none';
  
        // Show the buttons for regenerating the password, saving the password, and going back to home
        document.getElementById('regenerate-password').style.display = 'block';
        document.getElementById('save-password').style.display = 'block';
        document.getElementById('back-to-home-from-generate').style.display = 'block';
      })
      .catch(error => {
        console.log('There was a problem with the fetch operation: ' + error.message);
        // Alert the user if there was an error saving the password
        alert('There was an error saving the password. Please try again.');
      });
    });
  });

  // Add event listener for 'save-password' button
  document.getElementById('save-password').addEventListener('click', function() {
    // Hide the generated password container and the generate section, and show the home section
    document.getElementById('generated-password-container').style.display = 'none';
    document.getElementById('generate-section').style.display = 'none';
    document.getElementById('home-section').style.display = 'block';
  });

  // Add event listener for 'regenerate-password' button
  document.getElementById('regenerate-password').addEventListener('click', function() {
    // Hide the generated password container and show the generate section
    document.getElementById('generated-password-container').style.display = 'none';
    document.getElementById('generate-section').style.display = 'block';
    
    // Reset the visibility of the elements in the generate section
    document.getElementById('generate').style.display = 'block';
    document.getElementById('length').style.display = 'block';
    document.getElementById('dig').style.display = 'block';
    document.getElementById('sp').style.display = 'block';
    
    // Hide the buttons for regenerating the password, saving the password, and going back to home
    document.getElementById('regenerate-password').style.display = 'none';
    document.getElementById('save-password').style.display = 'none';
    document.getElementById('back-to-home-from-generate').style.display = 'none';
  });

  // Function to fetch the password for the current site
  function fetchPassword() {
    // Query the active tab
    chrome.tabs.query({active: true, currentWindow: true}, async function(tabs) {
      // Get the URL of the active tab
      var site = tabs[0].url;
      console.log('Site: ' + site);

      // Send a GET request to fetch the password for the site
      fetch('http://localhost:3000/getPassword/' + encodeURIComponent(site))
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data && data.password) {
          // Display the fetched password
          document.getElementById('password').textContent = data.password;
          document.getElementById('password-container').style.display = 'block';
          document.getElementById('fetch').style.display = 'none';
        } else {
          // Hide the password container and display a message if no password was found
          document.getElementById('password-container').style.display = 'none';
          document.getElementById('password').textContent = 'No password found for this site.';
        }
      })
      .catch(error => {
        console.log('There was a problem with the fetch operation: ' + error.message);
        // Hide the password container and display an error message if there was an error fetching the password
        document.getElementById('password-container').style.display = 'none';
        document.getElementById('password').textContent = 'Error fetching password.';
        // Alert the user if there was an error retrieving the password
        alert('There was an error retrieving the password. Please try again.');
      });
    });
  }

  // Function to generate a random password of a specified length
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
});