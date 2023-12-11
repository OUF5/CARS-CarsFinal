const mongoose = require('mongoose');
const Account = require('./model/account.model.js'); 

// MongoDB connection string
const dbURl = 'mongodb+srv://mohammed5ibnouf:xlcSXV3x6a3P1upc@cars.wec8tgx.mongodb.net/?retryWrites=true&w=majority'; 

// Connect to MongoDB
mongoose.connect(dbURl, { useNewUrlParser: true, useUnifiedTopology: true });

// Function to create a user
async function createUser(email, password, role) {
    try {
        const newUser = new Account({ email, role});
        await Account.register(newUser, password);
        console.log('User created successfully');
    } catch (error) {
        console.error('Error creating user:', error);
    } finally {
        mongoose.disconnect();
    }
}

// Get command line arguments for email, password, and role
const [email, password, role] = process.argv.slice(2);

if (!email || !password || !role) {
    console.log('Usage: node createAccount.js <email> <password> <Role>');
    process.exit(1);
}

createUser(email, password, role);

/*

Run the Script from the CLI
Run your script from the command line, passing the email, password, and role as arguments:

node createAccount.js email@example.com myPassword Role
*/

module.exports = {createUser}