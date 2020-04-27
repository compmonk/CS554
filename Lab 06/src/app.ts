import * as express from 'express';
import * as bodyParser from 'body-parser'; //used to parse the form data that you pass in the request
import {Routes} from './routes';

let count: object = {};
let maxLength: number = 0;

class App {
    public app: express.Application;
    public routes: Routes = new Routes();

    constructor() {
        this.app = express(); //run the express instance and store in app
        this.config();
        this.routes.routes(this.app);
    }

    private logger = function (request: express.Request, response: express.Response, next: Function): void {
        // console.log(`\n${"".padding(100, '*')}`);
        console.log(`\n${request.method}\t${request.originalUrl}\nBODY:\n${JSON.stringify(request.body, null, 2)}\n`);
        next()
    };

    private counter = function (request: express.Request, response: express.Response, next: Function): void {

        if (count.hasOwnProperty(request.originalUrl)) {
            count[request.originalUrl] += 1;
        } else {
            count[request.originalUrl] = 1;
            maxLength = Math.max(maxLength, request.originalUrl.length)
        }

        console.log("URL|\tCOUNT");
        let url: string
        for (url in count) {
            console.log(`${url}|\t${count[url]}`)
        }

        next()
    };


    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(
            bodyParser.urlencoded({
                extended: false
            })
        );
        this.app.use(this.logger);
        this.app.use(this.counter);
    }
}

export default new App().app;