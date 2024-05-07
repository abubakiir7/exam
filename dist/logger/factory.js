"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerFactory = void 0;
const nest_winston_1 = require("nest-winston");
const winston_1 = require("winston");
const LoggerFactory = (appName) => {
    let consoleFormat;
    consoleFormat = winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.ms(), nest_winston_1.utilities.format.nestLike(appName, {
        colors: true,
        prettyPrint: true,
    }));
    return nest_winston_1.WinstonModule.createLogger({
        level: 'debug',
        transports: [
            new winston_1.transports.Console({ format: consoleFormat }),
            new winston_1.transports.File({
                filename: 'logger/error.log',
                level: 'error',
                format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json()),
            }),
        ],
    });
};
exports.LoggerFactory = LoggerFactory;
//# sourceMappingURL=factory.js.map