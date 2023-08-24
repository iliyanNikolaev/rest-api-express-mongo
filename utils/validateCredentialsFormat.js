function validateCredentials(username, password){
    if (username == undefined || password == undefined) {
        throw new Error('You must to provide username and password in request body!');
    }
    if (username == '' || username.length < 3 || username.length > 20) {
        throw new Error('Username must be between 3 and 20 characters!');
    }
    if (password == '' || password.length < 6 || password.length > 30) {
        throw new Error('Username must be between 3 and 20 characters!');
    }
}

module.exports = validateCredentials;