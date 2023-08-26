function validatePostFormat({owner, content, image, likes}) {
    if(content.trim().length > 500) {
        throw new Error('Content can be 500 characters maximum.');
    }

    if(owner != undefined || likes != undefined) {
        throw new Error('You cannot set owner and likes properties from client!');
    }

    return {
        content: content.trim(),
        image
    }
}

module.exports = validatePostFormat;