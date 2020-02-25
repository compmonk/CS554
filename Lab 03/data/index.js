const people = require("./data");


getById = ((id) => {
    const error = new Error();
    error.http_code = 200;
    const errors = {};

    id = parseInt(id);
    if (isNaN(id)) {
        errors['id'] = "id is NaN";
        error.http_code = 400;
        error.message = JSON.stringify({
            errors: errors
        });
        throw error
    }
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let person = people.find(function (person) {
                return person.id === id
            });
            if (person) {
                resolve(person);
            } else {
                errors['id'] = `person with id ${id} not found`;
                error.http_code = 404;
                error.message = JSON.stringify({
                    errors: errors
                });
                reject(error)
            }
        }, 5000);
    });
});

module.exports = {
    getById
};
