/**
 * @author Martin Alemajoh
 * @description This controller handles ping requests
 * @date 7/19/2021
 */

const path = require('path');
const Controller = require(path.join(__dirname, './Controller'));
const SendResponse = require(path.join(__dirname, "../utils/SendResponse"));

class PingController extends Controller {

    static ping(req, res) {

        const statusCode = 200;
        const message = "Authentication server up and running";
        SendResponse.successResponse(statusCode, req, res, message);
    }

}

module.exports = PingController;