'use strict';

import fs from 'fs';
import Users from './user-data';
import { Helper } from '../utilities/helpers';

class WebhookDataParser {
    static processWebhookData(data) {
        data.forEach((row) => {
            if (Helper.IsNotNullOrEmpty(row.$properties.$email)) {
                WebhookDataParser.populateEmailsArray(row.$properties.$email);
            }
        });
        fs.writeFile('users.json', JSON.stringify(Users.getUsers()), 'utf8', (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('file saved');
            }
        });
    }

    static populateEmailsArray(emailId) {
        const userData = Users.getUserData();
        userData.email = emailId;
        Users.addUser(userData);
        Users.clearUserData();
    };
}

export { WebhookDataParser };
