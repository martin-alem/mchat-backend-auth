const path = require("path");
const PingController = require(path.join(__dirname, "../../controllers/PingController"));
const SendResponse = require(path.join(__dirname, "../../utils/SendResponse"));

describe("PingController", () => {

    test("should call SendResponse.successResponse", () => {
        SendResponse.successResponse = jest.fn();
        PingController.ping({}, {});
        expect(SendResponse.successResponse).toHaveBeenCalled();
    });
});

describe("invalidRequest", () => {

    test("should call SendResponse.failedResponse", () => {
        SendResponse.failedResponse = jest.fn();
        PingController.invalid({}, {});
        expect(SendResponse.failedResponse).toHaveBeenCalled();
    });
});