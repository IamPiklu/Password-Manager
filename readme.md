# 🔒 Password Manager

## 📖 **Overview**
🔒 This is a **Password Manager** project that includes a Chrome extension for generating, storing, and retrieving passwords for different sites. The passwords are stored in a MongoDB database with encryption for security. 🛡️


## 🌟 Features
- 🔐 **Generate a password** based on user preferences (length, include digits, include special characters).
- 💾 **Store the generated password** for a specific site in a MongoDB database.
- 📤 **Retrieve the stored password** for a specific site from the database.
- 🛡️ **Encrypt passwords** before storing and decrypt them before sending to the user for security.

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
5. 🔍 You can retrieve the stored password for the current site by clicking **'Fetch Password'**.

## 📝 **Note**
🎓 This project is for **educational purposes only**. Be sure to understand the security implications before using it for personal passwords. 🔐

## 📜 **License**
🔖 This project is licensed under the [**MIT License**](LICENSE).


