"use strict";
exports.__esModule = true;
var User = /** @class */ (function () {
    function User(email, name, password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }
    User.prototype.matches = function (another) {
        return (another !== undefined &&
            another.email === this.email &&
            another.password === this.password);
    };
    return User;
}());
exports.User = User;
exports.users = {
    'prmorais1302@gmail.com': new User('prmorais1302@gmail.com', 'Paulo Rotberto', 'Paulo13'),
    'nanda04@gmail.com': new User('nanda04@gmail.com', 'Maria Fernanda', 'Nanda04')
};
