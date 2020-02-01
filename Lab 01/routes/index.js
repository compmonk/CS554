const taskRoute = require("./tasks");

// This function is taken from https://stackoverflow.com/a/17252151
/**
 * object.padding(number, string)
 * Transform the string object to string of the actual width filling by the padding character (by default ' ')
 * Negative value of width means left padding, and positive value means right one
 *
 * @return      string
 * @access      public
* @param n      Width of string
 * @param c     Padding chacracter (by default, ' ')
 */
String.prototype.padding = function(n, c)
{
    var val = this.valueOf();
    if ( Math.abs(n) <= val.length ) {
        return val;
    }
    let m = Math.max((Math.abs(n) - this.length) || 0, 0);
    let pad = Array(m + 1).join(String(c || ' ').charAt(0));
    return (n < 0) ? pad + val : val + pad;
};

const constructorMethod = app => {

    const logger = function (request, response, next) {
        console.log(`\n${"".padding(100, '*')}`);
        console.log(`\n${request.method}\t${request.originalUrl}\nBODY:\n${JSON.stringify(request.body, null, 2)}\n`);
        next()
    };
    app.use(logger);

    let count = {};
    let maxLength = 0;
    const counter = function (request, response, next) {

        if (count.hasOwnProperty(request.originalUrl)) {
            count[request.originalUrl] += 1;
        } else {
            count[request.originalUrl] = 1;
            maxLength = Math.max(maxLength, request.originalUrl.length)
        }

        console.log(`${"URL".padding(maxLength+ 5)}|\tCOUNT`);
        for (let url in count) {
            console.log(`${url.padding(maxLength + 5)}|\t${count[url]}`)
        }

        next()
    };
    app.use(counter);

    app.use("/api/tasks", taskRoute);

    app.use("*", (request, response) => {
        response.status(404).json({error: "Route not found"});
    });
};

module.exports = constructorMethod;
