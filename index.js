
const fs = require('fs');
const dotenv = require('dotenv');
const Moralis = require("moralis").default;
// const { Provider, Wallet, types } = require('zksync-ethers');
dotenv.config()
const {connectToDatabase} = require('./db.js');
const cors = require('cors');
const crypto = require('crypto');
const axios = require('axios');


// index.js

const express = require('express');
const app = express();
const CryptoJS = require('crypto-js')
// Use CORS middleware
app.use(cors({origin: 'http://127.0.0.1:5500'}));

// Middleware to parse JSON bodies
app.use(express.json());
// Set the port number to listen on
const PORT = process.env.PORT || 3000;

// Define a simple route
app.post('/api/saveCred', (req, res) => {
    const publicKey = req.body.publicKey;
    const appLink = req.body.appLink;
    // Encrypt the message with the public key
    console.log("req.body.publicKey ", req.body.publicKey, req.body.signature)
    // const key = publicKeyToAesKey(publicKey);
    // const iv = crypto.randomBytes(16); // Initialization vector
    // const cipherUser = crypto.createCipheriv('aes-256-cbc', key, iv);
    // const cipherPassword = crypto.createCipheriv('aes-256-cbc', key, iv);
    // const cipherApplink = crypto.createCipheriv('aes-256-cbc', key, iv);
    // let encrypted = cipherUser.update(req.body.user, 'utf8', 'hex');
    // let encrypted1 = cipherPassword.update(req.body.password, 'utf8', 'hex');
    // let encrypted2 = cipherApplink.update(req.body.appLink, 'utf8', 'hex');

    // encrypted += cipherUser.final('hex');
    // encrypted1 += cipherPassword.final('hex');
    // encrypted2 += cipherApplink.final('hex');

    // const encryptedUser = iv.toString('hex') + ':' + encrypted;
    // const encryptedPassword = iv.toString('hex') + ':' + encrypted1;
    // const encryptedappLink = iv.toString('hex') + ':' + encrypted2;


    // Encrypt
    var encryptedUser = CryptoJS.AES.encrypt(req.body.user, req.body.signature).toString();
    var encryptedPassword = CryptoJS.AES.encrypt(req.body.password, req.body.signature).toString();
    var encryptedApplink = CryptoJS.AES.encrypt(req.body.appLink, req.body.signature).toString();

    uploadToIpfs(publicKey, encryptedUser, encryptedPassword, encryptedApplink, req.body.appLink)
    const newData = {publicKey, encryptedUser, encryptedPassword, appLink};


    // Read the existing data from the file
    fs.readFile('./saveCred.json', 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') throw err;

        const jsonArray = data ? JSON.parse(data) : [];
        console.log('jsonA----- ', jsonArray)
        // Append the new data
        jsonArray.push(newData);

        // Write the updated array back to the file
        fs.writeFile('./saveCred.json', JSON.stringify(jsonArray, null, 2), (err) => {
            if (err) throw err;
            console.log('Data appended to file');
        });
    });
    return res.status(200).send({publicKey, encryptedUser, encryptedPassword, appLink})

});


async function uploadToIpfs(publicKey, encryptedUser, encryptedPassword, encryptedappLink, appLink){
    const fileUploads = [
        {
            path: "zk-pass",
            content: {publicKey, encryptedUser, encryptedPassword, encryptedappLink}
        }
      ]
    if(!Moralis.Core.isStarted){
        await Moralis.start({
            apiKey: process.env.MORALIS_KEY
        })
    } else{
        console.log('Moralis is already started!')
    } 
    const res = await Moralis.EvmApi.ipfs.uploadFolder({
        abi: fileUploads
    })
    console.log(res.result)
    storeToDB(publicKey, res.result, appLink)
}
async function storeToDB(publicKey, ipfsHash, appLink){
    const db = await connectToDatabase();
    const collection = db.collection('zkpass-credentials');
    const result = await collection.insertOne({publicKey, ipfsHash, appLink})
    console.log('document inserted Id ', result.insertedId.toString())
}

// Function to convert a public key to an AES encryption key
function publicKeyToAesKey(publicKey) {
    // Use the first 32 bytes of the public key hash as the AES key
    const key = crypto.createHash('sha256').update(publicKey).digest().slice(0, 32);
    return key;
}

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



