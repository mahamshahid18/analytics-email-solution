'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { WebhookDataParser } from './data/webhook-data-parser';

const app = express();

// support encoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Greetings, young one!');
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server started...');
});

app.route('/webhook-data')
    .post((req, res) => {
        const data = JSON.parse(req.body.users);
        res.status(200).send();

        WebhookDataParser.processWebhookData(data);
    });