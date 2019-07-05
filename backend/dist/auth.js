"use strict";
exports.__esModule = true;
var user_1 = require("./user");
exports.handleAuthentication = function (req, res) {
    var user = req.body;
    if (isValid(user)) {
        var dbUser = user_1.users[user.email];
        res.json(dbUser);
    }
    else {
        res.status(403).json({ message: 'Dados inválidos!' });
    }
};
function isValid(user) {
    if (!user) {
        return false;
    }
    var dbUser = user_1.users[user.email];
    return dbUser !== undefined && dbUser.matches(user);
}
