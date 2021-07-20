/**
 * @author Martin Alemajoh
 * @description This controller handles signup requests
 * @date 7/19/2021
 */

const path = require('path');
const Controller = require(path.join(__dirname, './Controller'));
const SendResponse = require(path.join(__dirname, "../utils/SendResponse"));
const Hash = require(path.join(__dirname, "../services/Hash"))
const middleware = require(path.join(__dirname, "../middleware/signupMiddleware"));
const Logger = require(path.join(__dirname, "../utils/Logger"));


class LoginController extends Controller {

    static async login(req, res) {

        const { phone, password } = req.body;

        try {
            const selectResult = await Query.selectOne("login", "phone", phone);
            if (selectResult.length === 1) {

                if (Hash.hashData(password) === selectResult[0]["password"]) {
                    const statusCode = 200;
                    const message = "Login Successful";
                    res.cookie('authentication', signature, { expires: new Date(Date.now() + 1 * 3600000), httpOnly: true, secure: true, sameSite: "None" });
                    SendResponse.successResponse(statusCode, req, res, message);
                }
                else {
                    const updateFails = selectResult[0]["fails"] += 1;
                    await Query.updateOne("login", "fails", updateFails, "phone", phone);
                    const statusCode = 400;
                    const error = "Invalid phone or password";
                    SendResponse.failedResponse(statusCode, req, res, error);
                    Logger.logWarning(err.message, __filename, new Date());

                }
            }
            else {
                const statusCode = 400;
                const error = "Invalid phone or password";
                SendResponse.failedResponse(statusCode, req, res, error);
                Logger.logWarning(err.message, __filename, new Date());

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