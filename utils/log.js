/**
 * Created by kavi707 on 8/30/14.
 * log.js
 * @author Kavimal Wijewardana <kavi707@gmail.com>
 */

var winston = require('winston');

/**
 * Create logger object
 */
var logger = new(winston.Logger)({
    transports: [
        new(winston.transports.Console)({
            json: false,
            timestamp: true
        }),
        new winston.transports.File({
            filename: __dirname + '/logs/node_grid-debug.log',
            json: false
        })
    ],
    exceptionHandlers: [
        new(winston.transports.Console)({
            json: false,
            timestamp: true
        }),
        new winston.transports.File({
            filename: __dirname + '/logs/node_grid-exceptions.log',
            json: false
        })
    ],
    exitOnError: false
});

module.exports = logger;

