function validateCommentFormat({ comment }) {
    if(comment == '') {
        throw new Error('Comment must have some content!');
    }

    if(comment.length > 300) {
        throw new Error('Comment can be 300 characters maximum!');
    }


    return {
        comment
    }
}

module.exports = validateCommentFormat;