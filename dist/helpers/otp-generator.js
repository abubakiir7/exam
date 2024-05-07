"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTP = void 0;
const otpGenerator = require("otp-generator");
function generateOTP(n) {
    return +otpGenerator.generate(n, {
        digits: true,
        specialChars: false,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
    });
}
exports.generateOTP = generateOTP;
//# sourceMappingURL=otp-generator.js.map