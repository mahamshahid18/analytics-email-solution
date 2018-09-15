'use strict';

// const Users = require('./data/user-data.mjs');
import fs from 'fs';
import schedule from 'node-schedule';
import sgMail from '@sendgrid/mail';

import { Helper } from './utilities/helpers';
import { QueryProcessor } from './queries/query-processor';
import { EmailGenerator } from './emails/email-generator';

import * as users from './users.json';
import * as emailDetails from './emails/email-content';

sgMail.setApiKey('apikey');

const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = 0;
rule.hour = 2;
rule.minute = 20;
// TODO: set it for Friday, at 4:00 PM
// rule.dayOfWeek = 5; rule.hour = 16; rule.minute = 0

const job = schedule.scheduleJob(rule, () => {
	console.log('The empire\'s time has come!');
	users.default.forEach((user, index) => {
		QueryProcessor.getStats(user.email)
		.then(() => {
			if (index == users.default.length - 1) {
				// if this was the last email in
				// the list & all queries have been run
				sendEmails();
			}
		})
		.catch((err) => {
			console.log(err);
		});
	});
});


const sendEmails = () => {
	users.default.forEach((user, index) => {
		let email = new EmailGenerator();
		email.generateEmail(user)
		.then((emailBody) => {
			let msg = {
				to: user.email,
				from: emailDetails.default.from,
				subject: emailDetails.default.subject,
				text: emailDetails.default.outlineText,
				html: emailBody,
			};
			console.log(msg);
			// use sendgrid API to send email here
			if (index == users.default.length -1) {
				// if email sent to last user
				createLogFile();
			}
		})
		.catch((err) => {
			console.log(err);
		});
	});
};

const createLogFile = () => {
	// all emails sent, create log file
	fs.writeFile(`${Helper.getFormattedDate(new Date())}.json`, JSON.stringify(users.default), 'utf8', (err) => {
		if (err) {
			console.log(err);
		} else {
			console.log('file saved');
		}
	});
}
