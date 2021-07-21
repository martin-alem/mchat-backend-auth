/**
 * @author Martin Alemajoh
 * @description This controller handles signup requests
 * @date 7/19/2021
 */

const path = require('path');
const Controller = require(path.join(__dirname, './Controller'));
const SendResponse = require(path.join(__dirname, "../utils/SendResponse"));
const Hash = require(path.join(__dirname, "../services/Hash"));
const Query = require(path.join(__dirname, "../model/Query"))
const middleware = require(path.join(__dirname, "../middleware/loginMiddleware"));
const Logger = require(path.join(__dirname, "../utils/Logger"));
const Helper = require(path.join(__dirname, "../utils/Helper"));


class LoginController extends Controller {

    static async login(req, res) {

        let { phone, password, d_password, fails } = req.body;

        try {
            if (Hash.hashData(password) === d_password) {
                const privateKey = await Helper.getKey("private");
                const signature = Helper.signToken(phone, privateKey);
                const statusCode = 200;
                const message = "Login Successful";
                res.cookie('authentication', signature, { expires: new Date(Date.now() + 1 * 3600000), httpOnly: true, secure: true, sameSite: "None" });
                SendResponse.successResponse(statusCode, req, res, message);
            }
            else {
                const updateFails = fails += 1;
                await Query.updateOne("login", "fails", updateFails, "phone", phone);
                const statusCode = 400;
                const error = "Invalid phone or password";
                SendResponse.failedResponse(statusCode, req, res, error);
            }
        } catch (err) {
            const statusCode = 500;
            const error = "Internal server error";
            SendResponse.failedResponse(statusCode, req, res, error);
            Logger.logWarning(err.message, __filename, new Date());
        }
    }


    static middleware() {
        const middlewareFunctions = [];

        for (const [_, value] of middleware) {
            middlewareFunctions.push(value);
        }
        return middlewareFunctions;
    }
}

module.exports = LoginController;