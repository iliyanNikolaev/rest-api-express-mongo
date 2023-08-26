function validateProfileDetailsFormat({ username, profilePicture, coverPicture, description }) {
    if (username == undefined || profilePicture == undefined || coverPicture == undefined || description == undefined) {
        throw new Error('You must to provide username, profilePicture, coverPicture and description in request body!');
    }
    if (username == '' || username.length < 3 || username.length > 20) {
        throw new Error('Username must be between 3 and 20 characters!');
    }
    if(description.trim().length > 100) {
        throw new Error('Description must be maximum 100 characters!');
    }

    return {
        username: username.trim().toLowerCase(),
        profilePicture: profilePicture.trim(),
        coverPicture: coverPicture.trim(),
        description: description.trim()
    }
}

module.exports = validateProfileDetailsFormat;