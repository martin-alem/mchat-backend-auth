/**
 * @author Martin Alemajoh
 * @description Holds all the middleware functions  for signup
 */

const path = require('path');
const Validate = require(path.join(__dirname, "../validations/ValidateCredentials"));
const Query = require(path.join(__dirname, "../model/Query"));
const Logger = require(path.join(__dirname, "../utils/Logger"));
const SendEmail = require(path.join(__dirname, "../services/SendEmail"))

const middleware = new Map();

function validatePayLoad(req, res, next) {
    const payload = req.body;
    if (Object.keys(payload).length === 0 || !payload.phone || !payload.password) {
        const statusCode = 400;
        const error = "Please provide a phone number and password";
        next({ error, statusCode });
        return;
    }
    next();
}

function validate(req, res, next) {

    const { phone, password } = req.body.phone;
    if (!Validate.isValidPhone(phone) || !Validate.isValidPassword(password)) {
        const statusCode = 400;
        const error = "Invalid phone number or password";
        next({ error, statusCode });
        return;
    }
    next();

}

async function isBlackListed(req, res, next) {

    const phone = req.body.phone;
    try {
        const selectResult = await Query.selectOne("blacklist", "phone", phone);
        if (selectResult.length > 0) {
            const statusCode = 400;
            const error = "This account has been blacklisted.";
            next({ error, statusCode });
            return;
        }
        next();
    } catch (err) {
        const statusCode = 500;
        const error = "Internal server error";
        next({ error, statusCode });
        Logger.logWarning(err.message, __filename, new Date());
        return;
    }
}

async function loginAttempts(req, res, next) {

    const { phone } = req.body;

    try {
        const
        const result = await Query.selectOne("login", "phone", phone);
        if (!result.length === 1) {
            const statusCode = 403;
            const error = "Unauthorized";
            next({ error, statusCode });
            return;
        }
        else if (result[0]["fails"] >= 5) {

            const insertObject = { "phone": phone, "reason": "Multiple failed login attempts", "date": new Date() };
            await Query.insert("blacklist", insertObject);
            const options = { "templateName": "block", "address": payload.email, "subject": "Account Blocked" }
            await SendEmail.sendEmail(options);
            const statusCode = 403;
            const error = "Account Blocked. Please follow up with the email sent to you.";
            next({ error, statusCode });
            return;
        }

        next();
    } catch (err) {
        const statusCode = 500;
        const error = "Internal server error";
        next({ error, statusCode });
        Logger.logWarning(err.message, __filename, new Date());
        return;
    }
}

middleware.set("validatePayLoad", validatePayLoad);
middleware.set("validate", validate);
middleware.set("isBlackListed", isBlackListed);
middleware.set("loginAttempts", loginAttempts);

module.exports = middleware;
