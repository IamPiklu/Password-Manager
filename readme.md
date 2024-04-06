# 🔒 Password Manager

## 📖 **Overview**
🔒 This is a **Password Manager** project that includes a Chrome extension for generating, storing, and retrieving passwords for different sites. The passwords are stored in a MongoDB database with encryption for security. 🛡️

## 🌟 Features
- 🔐 **Generate a password** based on user preferences (length, include digits, include special characters).
- 💾 **Store the generated password** for a specific site in a MongoDB database.
- 📤 **Retrieve the stored password** for a specific site from the database.
- 🛡️ **Encrypt passwords** before storing and decrypt them before sending to the user for security. The encryption process in `app.js` is handled by a module called `crypto-js`. Here's how it works:
  1. 🗝️ **Key Generation**: A secret key is generated. This key is used for both encryption and decryption processes. It's important to keep this key secure, as anyone with access to it can decrypt the passwords.

  2. 🔐 **Encryption**: When a password is received from the client, it is encrypted using the `crypto-js.AES.encrypt` function. This function takes the plaintext password and the secret key as inputs and returns the encrypted password. The encrypted password is then stored in the database. This ensures that even if someone gains unauthorized access to the database, they won't be able to read the passwords.

  3. 🔓 **Decryption**: When a password is requested by the client, it is fetched from the database and decrypted using the `crypto-js.AES.decrypt` function. This function takes the encrypted password and the secret key as inputs and returns the plaintext password. The plaintext password is then sent to the client.

  4. 🚫 **Error Handling**: If there's an error during the encryption or decryption process, the error is caught and handled appropriately. This ensures that the application doesn't crash and the user is informed of the issue.

Remember, encryption is a crucial part of any application that handles sensitive data. It's like a lock that keeps your secrets safe from prying eyes.

## 🛠️ **Technologies Used**

- 🌐 **Frontend**: HTML, CSS (Tailwind CSS), and JavaScript for the Chrome extension.
- 🚀 **Backend**: Node.js and Express.js for the server.
- 🗄️ **Database**: MongoDB for data persistence.
- 🔐 **Security**: Crypto module for password encryption and decryption.

## 📁 **Files**
- 🌐 `index.html`: The **main page** of the Chrome extension.
- 🛠️ `popup.js`: Contains functions to **generate a password** based on user preferences, **store the password** for a site, and **fetch the stored password** for a site.
- 🚀 `app.js`: Contains the **server-side logic**, including endpoints to store and retrieve passwords from the MongoDB database, with encryption and decryption for security.
- 🎧 `background.js`: Contains **event listeners** for when the extension is installed and when a tab URL is updated.
- ⚙️ `manifest.json`: Contains the **configuration and permissions** for the Chrome extension.

## 🚀 **Setup**
1. 📂 **Clone the repository**.
2. 🧩 **Install dependencies** with `npm install`.
3. 🏁 **Start the server** with `npm start`.
4. 🌐 **Load the Chrome extension** into your browser. <sub>You can follow the instructions [here](https://developer.chrome.com/docs/extensions/mv3/getstarted/#manifest) to learn how to add extensions locally.</sub>
5. ⚙️ **Add a `.env` file** with the necessary environment variables. <sub>Refer to the instructions [here](https://www.geeksforgeeks.org/how-to-create-and-use-env-files-in-python/) for details on setting up the `.env` file.</sub>

## 🚀 **Usage**
1. 🖱️ **Click** on the extension icon to open the popup.
2. 📝 **Enter** your desired password length and **select** whether to include digits and special characters.
3. 🔄 **Click 'Generate'** to create a new password.
4. 🎉 The generated password will be automatically stored for the current site.
5. Click 📂**Save** to save the password or ♻️**Regenerate** to generate a new password.
6. 🔍 You can retrieve the stored password for the current site by clicking **'Fetch Password'**.

## 📚 Explanation:
 
### 📄 `index.html`
This HTML file is the face of our Chrome extension. It's the first thing users see and interact with. Let's take a closer look:
1. 🎨 The file starts with the usual HTML boilerplate. It includes a `<!DOCTYPE html>` declaration, an `<html>` element, and nested `<head>` and `<body>` elements. This is the canvas where we'll paint our masterpiece.
2. 📝 Inside the `<head>` element, we have a `<title>` that sets the title of our extension, and a `<link>` that includes our CSS for styling. This is where we set the stage for our performance.
3. 🏠 The `<body>` element contains three main sections: 'home', 'generate', and 'fetch'. These are the rooms in our house.
4. 🖼️ The 'home' section has two buttons: 'go-to-generate' and 'go-to-fetch'. These are the doors that lead to the other rooms.
5. 🎲 The 'generate' section contains a form for the user to specify their password preferences, and buttons to generate, save, and regenerate the password. This is where the user plays the game.
6. 🔍 The 'fetch' section contains a button to fetch the password for the current site, and a container to display the fetched password. This is where the user finds the treasure.
7. 🔄 Each section has a 'back-to-home' button that takes the user back to the 'home' section. This is the magic portal that transports the user back to the start.

8. 📚 At the end of the file, we include our JavaScript file, `popup.js`, with a `<script>` tag. This is the engine that powers our spaceship.

##
### 📄 `app.js`
This JavaScript file is the heart of the server-side logic. It's where the magic happens. Let's break it down:
1. 📦 The file begins by importing necessary modules such as `express`, `cors`, `body-parser`, and `mongoose`. These are the building blocks of our application.
2. 🚀 An Express application is created and configured. This is our spaceship, ready to take us to the stars.
3. 🌐 CORS is enabled to allow cross-origin requests, and `body-parser` is used to parse incoming request bodies in a middleware before your handlers.
4. 🗄️ A connection to the MongoDB database is established using `mongoose`. This is our treasure chest where we store our precious data.
5. 🛠️ Two API endpoints are set up: `storePassword` and `getPassword`. These are the tools our users will interact with.
6. 📬 The `storePassword` endpoint accepts POST requests. It takes a site and password from the request body, encrypts the password, and stores it in the database. It's like a trusted friend who keeps your secrets safe.
7. 🔍 The `getPassword` endpoint accepts GET requests. It takes a site from the request parameters, fetches the corresponding password from the database, decrypts it, and sends it back to the user. It's like a librarian who always knows where to find the book you're looking for.
8. 🚦 Finally, the server is started on a specified port, ready to accept incoming requests. It's like opening the doors to a party - everyone's invited!

## 
### 📄 `background.js`
This JavaScript file is the silent guardian of our Chrome extension. It's always running in the background, ready to spring into action when needed. Let's delve into its secrets:
1. 🎧 The file starts by setting up an event listener for the 'onInstalled' event. This event is fired when the extension is installed or updated, or when the browser is updated. It's like a welcome party for our extension.
2. 🚀 When the 'onInstalled' event is fired, the code sets up the initial state of the extension. This is like setting up the chess board before the game begins.
3. 🌐 The code also sets up an event listener for the 'onUpdated' event. This event is fired when a tab is updated with a new URL. It's like a watchful sentinel, always on the lookout for changes.
4. 🔄 When the 'onUpdated' event is fired, the code checks if the new URL matches any of the sites stored in the database. If it does, it fetches the password for that site and sends it to the popup script. It's like a faithful messenger, always ready to deliver important information.
5. 🎯 Finally, the code sets up an event listener for the 'onMessage' event. This event is fired when a message is sent from the popup script. The code responds by performing the requested action, such as generating a new password or fetching a stored password. It's like a loyal servant, always ready to fulfill the user's requests.

##
### 📄 `popup.js`
This JavaScript file powers a Chrome extension that generates and fetches passwords for websites. Let's dive into the details:
1. 🎧 The code patiently waits for the 'DOMContentLoaded' event, ensuring the HTML is fully loaded before the script springs into action.
2. 🖱️ Event listeners are added to various buttons in the extension's popup. These include:
   - 'go-to-generate'
   - 'go-to-fetch'
   - 'back-to-home-from-generate'
   - 'back-to-home-from-fetch'
   - 'generate'
   - 'save-password'
   - 'regenerate-password'
3. 🚀 The 'go-to-generate' and 'go-to-fetch' buttons cleverly hide the home section and reveal the generate or fetch sections, respectively.
4. 🔄 The 'back-to-home-from-generate' and 'back-to-home-from-fetch' buttons do the exact opposite, concealing the generate or fetch sections and unveiling the home section.
5. 🔐 The 'generate' button crafts a password of a specified length and sends a POST request to 'http://localhost:3000/storePassword' to store the password associated with the current site. If successful, it proudly displays the generated password and hides some elements. If there's an error, it alerts the user with a polite warning.
6. 💾 The 'save-password' button hides the generated password container and the generate section, and brings back the home section.
7. 🔄 The 'regenerate-password' button hides the generated password container and resets the visibility of the elements in the generate section.
8. 🔍 The 'fetchPassword' function fetches the password for the current site from 'http://localhost:3000/getPassword/'. If successful, it displays the password. If there's an error, it alerts the user with a polite warning.
9. 🔮 The 'generatePassword' function generates a random password of a specified length, optionally including digits and special characters. It's like a magic trick, but for passwords!



## 📝 **Note**
🎓 This project is for **educational purposes only**. Be sure to understand the security implications before using it for personal passwords. 🔐

## 📜 **License**
🔖 This project is licensed under the [**MIT License**](LICENSE).