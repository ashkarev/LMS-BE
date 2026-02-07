const bcrypt = require('bcrypt');

const password = process.argv[2];

if (!password) {
    console.log("Please provide a password as an argument.");
    process.exit(1);
}

const saltRounds = 10;
bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("Your hashed password is:");
    console.log(hash);
});
