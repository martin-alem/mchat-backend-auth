/**
 * Send email
 * @date 5/28/2021
 * @author Martin Alemajoh
 */

const path = require('path');
const sgMail = require("@sendgrid/mail");
const Helper = require(path.join(__dirname, "../utils/Helper"));
const Logger = require(path.join(__dirname, "../utils/Logger"))

class SendEmail {

    /**
     * sends an email using sendgrid library.
     * This function internally handles any exceptions.
     * @param {object} options options for sending mail
     * @returns {promise} return a promise that resolves or rejects to a boolean
     */
    static async sendEmail(options) {
        const { templateName, address, subject } = options;
        const template = await Helper.buildEmailTemplate(templateName);
        sgMail.setApiKey(process.env.SG_API_KEY);
        const msg = {
            to: address,
            from: process.env.EMAIL,
            subject: subject,
            html: template,
        }

        try {
            await sgMail.send(msg);
            Logger.logError("Email sent", __filename, new Date());
            return true;
        } catch (error) {
            Logger.logError(err.message, __filename, new Date());
            return false;
        }

    }
}

module.exports = SendEmail;