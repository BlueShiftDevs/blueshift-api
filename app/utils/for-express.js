module.exports = {
    processResponse: function (success, failure) {
        return function (error, card) {
            if (error) {
                failure(error);
            } else {
                success(card);
            }
        }
    }
}