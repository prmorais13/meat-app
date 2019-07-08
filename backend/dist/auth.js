"use strict";
exports.__esModule = true;
var api_config_1 = require("./api-config");
var user_1 = require("./user");
var jwt = require("jsonwebtoken");
exports.handleAuthentication = function (req, res) {
    var user = req.body;
    if (isValid(user)) {
        var dbUser = user_1.users[user.email];
        var token = jwt.sign({ sub: dbUser.email, iss: 'meat-api' }, api_config_1.apiConfig.secret);
        var email = dbUser.email, name_1 = dbUser.name;
        res.json({ email: email, name: name_1, successToken: token });
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
