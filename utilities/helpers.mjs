'use strict';

import dotenv from 'dotenv';
dotenv.config()

import { QueryTemplates } from '../queries/queries-templates';

import * as users from '../users.json';

class Helper {
    static getAuthHeader() {
        const un = process.env.USERNAME;
        const pwd = process.env.PASSWORD;
        const creds = `${un}:${pwd}`;
        return `Basic ${Buffer.from(creds).toString('base64')}`
    }

    static getRequestHeaders() {
        return {
            'Authorization': Helper.getAuthHeader(),
            'content-type': 'application/x-www-form-urlencoded'
        };
    }

    static getRequestOptions(event_name, email) {
        let query = '';
        if (event_name.toLowerCase() == 'transformer') {
            query = QueryTemplates.getTransformerQuery(email);
        } else if (event_name.toLowerCase() == 'sdk') {
            query = QueryTemplates.getSDKQuery(email);
        } else {
            query = QueryTemplates.getDocsQuery(email);
        }

        return {
            uri: process.env.JQL_URI,
            method: 'POST',
            headers: Helper.getRequestHeaders(),
            form: {
                script: query
            }
        };
    }

    static IsNotNullOrEmpty(item) {
        return (item !== '' && item !== null && item !== undefined);
    };

    static getFormattedDate(date, isFromDate) {
        let formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

        if (isFromDate) {
            let d = date.getDate();
            let month = date.getMonth();
            const amountToSubtract = 7 - d;

            if (d - 7 < 1) {
                d = getPrevMonthDate(month) - amountToSubtract;
                month = (month - 1 + 12) % 12;
            } else {
                d -= 7;
            }
            formattedDate = `${date.getFullYear()}-${month + 1}-${d}`;
        }

        return formattedDate.toString();
    };

    static getPrevMonthDate(currentMonth) {
        let dateOfMonth;
        const monthsWith31Days = [0, 2, 4, 6, 7, 9, 11];

        if (monthsWith31Days.indexOf(currentMonth - 1) > 0) {
            dateOfMonth = 31;
        } else {
            dateOfMonth = (currentMonth == 2) ? 28 : 30;
        }

        return dateOfMonth;
    };

    static getUser(email) {
        users.default.find((user) => user.email == email );
    }

    static getUsers() {
        return users;
    }

};

export { Helper };
