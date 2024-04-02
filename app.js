require('dotenv').config();
const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const crypto = require('crypto');

const app = express();
app.use(cors());  // Enable CORS

const client = new MongoClient('mongodb://127.0.0.1:27017');
let db, collection;

client.connect().then(() => {
  db = client.db('myproject');
  collection = db.collection('passwords');
});

app.use(express.json());

app.post('/storePassword', async (req, res) => {
  const passwordEntry = req.body;
  passwordEntry.password = encrypt(passwordEntry.password);  // Encrypt the password before storing

  // Check if an entry for this site already exists
  const existingEntry = await collection.findOne({ site: passwordEntry.site });

  if (existingEntry) {
    // If an entry exists, update it
    const result = await collection.updateOne({ site: passwordEntry.site }, { $set: { password: passwordEntry.password } });
    res.json(result);
  } else {
    // If no entry exists, insert a new one
    const result = await collection.insertOne(passwordEntry);
    res.json(result);
  }
});

app.get('/getPassword/:site', async (req, res) => {
  const site = req.params.site;
  const passwordEntry = await collection.findOne({ site });
  passwordEntry.password = decrypt(passwordEntry.password);  // Decrypt the password before sending
  res.json(passwordEntry);
});

app.listen(3000, () => console.log('Server is running on port 3000'));

function encrypt(text) {
  let iv = crypto.randomBytes(16);
  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(process.env.ENCRYPTION_KEY, 'hex'), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

function decrypt(text) {
  let iv = Buffer.from(text.iv, 'hex');
  let encryptedText = Buffer.from(text.encryptedData, 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(process.env.ENCRYPTION_KEY, 'hex'), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
