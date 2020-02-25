const express = require("express");
const redis = require("redis");
const bluebird = require("bluebird");

const data = require("./data");

const app = express();
const client = redis.createClient();
client.flushdb(function (err, succeeded) {
    console.log(`Cache cleared : ${succeeded}`);
});

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);


app.get('/api/people/history', async function (request, response) {
    const people = await client.lrangeAsync("list", -20, -1);
    response.json(people.reverse().map(JSON.parse))
});

app.get('/api/people/:id', async function (request, response) {
    try {
        let person;
        const personIdx = await client.hmgetAsync("ids", request.params.id);
        if (personIdx[0] === null) {
            person = await data.getById(request.params.id);
            await client.rpushAsync("list", JSON.stringify(person));
            const idx = await client.llenAsync("list");
            await client.hmsetAsync("ids", person.id, idx)
        } else {
            person = await client.lrangeAsync("list", personIdx[0] - 1, personIdx[0] - 1);
            await client.rpushAsync("list", person[0]);
            person = JSON.parse(person[0])
        }
        response.json(person);
    } catch (e) {
        response.setHeader('content-type', 'application/json');
        response.status(e.http_code).send(e.message)
    }
});

const port = 3000;

app.listen(port, () => {
    console.log("The server is up and running !!!");
    console.log(`The routes are running on http://localhost:${port}`);
});