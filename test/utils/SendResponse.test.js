const path = require("path");
const SendResponse = require(path.join(__dirname, "../../utils/SendResponse"));

describe("successResponse ", () => {

    const req = {
        hostname: "localhost",
    };
    const mockResponse = () => {
        const res = {};
        res.type = jest.fn().mockReturnValue(res);
        res.set = jest.fn().mockReturnValue(res);
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockImplementation(response => response);
        return res;
    };

    const expected = {
        "status": "success",
        "response": {
            "message": "Signup server up and running",
            "error": null
        }
    }

    test("should return the correct response for success response", () => {
        const received = SendResponse.successResponse(200, req, mockResponse(), "Signup server up and running");
        expect(received).toEqual(expected);
    });
})

describe("failedResponse", () => {

    const req = {
        hostname: "localhost",
    };
    const mockResponse = () => {
        const res = {};
        res.type = jest.fn().mockReturnValue(res);
        res.set = jest.fn().mockReturnValue(res);
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockImplementation(response => {
            return response;
        });
        return res;
    };

    const expected = {
        "status": "fail",
        "response": {
            "message": "",
            "error": "Invalid request"
        }
    }

    test("should return the correct response for fail response", () => {
        const received = SendResponse.failedResponse(404, req, mockResponse(), "Invalid request");
        expect(received).toEqual(expected);
    });
})