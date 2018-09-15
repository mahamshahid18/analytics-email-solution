'use strict';

import * as content from './email-content';

class EmailGenerator {
    constructor() {
        this.emailContent = null;
        this.languages = ['csharp', 'java', 'php', 'node', 'python', 'angular', 'ruby', 'android', 'go', 'objectivec'];
        this.languageMap = {
            node: 'Node.js',
            angular: 'AngularJs',
            csharp: 'C#',
            android: 'Android',
            java: 'Java',
            php: 'PHP',
            python: 'Python',
            ruby: 'Ruby',
            go: 'Go',
            objectivec: 'Objective C'
        };
    }

    // returns a promise when
    // the content is complete
    generateEmail(user) {
        return new Promise((resolve, reject) => {
            try {
                this.generateEmailStart();
                this.generateSdkDocsContent(user);
                this.generatedTransformationsContent(user);
                this.generateCallToAction(user);
                this.generateEmailEnd();
                this.emailContent = this.emailContent.replace(new RegExp('\n', 'g'), '')
                                    .replace(new RegExp('\t', 'g'), '')
                                    .replace(new RegExp('\\\'', 'g'), '');
                resolve(this.emailContent);
            } catch(error) {
                reject(error);
            }
        });
    }

    generateEmailStart() {
        this.emailContent = content.default.start;
    }

    generateEmailEnd() {
        this.decorateWithDivider(1);
        this.emailContent += content.default.end;
    }

    generateSdkDocsContent(user) {
        if (user.sdksGenerated || user.docsViewed) {
            this.generateLanguagesTable(user);
            this.decorateWithDivider(2);
        }
    }

    generatedTransformationsContent(user) {
        if (user.transformations > 0) {
            this.generateTranformerStatsTable(user);
        }
    }

    generateCallToAction(user) {
        if (user.transformations > 0 && !user.sdksGenerated && !user.docsViewed) {
            this.emailContent += content.default.cta.portalAndSdk;
            this.decorateWithDivider(1);
        } else if (user.sdksGenerated && !user.docsViewed && user.transformations < 1) {
            this.emailContent += content.default.cta.portalAndTransformer;
            this.decorateWithDivider(1);
        } else if (user.sdksGenerated && user.transformations > 0 && !user.docsViewed) {
            this.emailContent += content.default.cta.portal;
            this.decorateWithDivider(1);
        }
    }

    decorateWithDivider(dividerNumber) {
        for (let i = 0; i < dividerNumber; i++) {
            this.emailContent += '<br\>';
        }
    }

    generateLanguagesTable(user) {
        this.emailContent += `<table style="border:1px solid #e9ecef; border-collapse: collapse; font-family: 'Open Sans', sans-serif;">
		    <tr style="border-bottom:1px solid #e9ecef;">
                <th style="font-size:14px; border-right:1px solid #e9ecef; color:#234371; border-collapse: collapse;padding: 10px 20px;">Event</th>`;
        // generate table header row
        this.languages.forEach((language) => {
            this.emailContent += `<th style="font-size:14px; color:#234371; border-collapse: collapse;padding: 10px 20px;">${this.languageMap[language]}</th>`;
        });
        this.emailContent += `</tr>`;

        // generate SDKs generated row
        this.emailContent += `<tr>
            <td style="font-size:14px; font-weight:600; border-right:1px solid #e9ecef; color:#234371; border-collapse: collapse;padding: 10px 20px;">SDKs Generated</td>`;
        this.languages.forEach((language) => {
            this.emailContent += `<td style="font-size:12px; color:#234371; border-collapse: collapse;padding: 10px 20px;">${user.sdks[language]}</td>`;
        });
        this.emailContent += `</tr>`;

        // generate Docs Viewed row
        this.emailContent += `<tr style="background:#f8fafc;">
            <td style="font-size:14px; font-weight:600; border-right:1px solid #e9ecef; color:#234371; border-collapse: collapse;padding: 10px 20px;">Docs Viewed</td>`;
        this.languages.forEach((language) => {
            this.emailContent += `<td style="font-size:12px; color:#234371; border-collapse: collapse;padding: 10px 20px;">${user.docs[language]}</td>`;
        });
        this.emailContent += `</tr>`;

        // end table
        this.emailContent += `</table>`;
    }

    generateTranformerStatsTable(user) {
        this.emailContent += `<table style="border:1px solid #e9ecef; border-collapse: collapse; font-family: Open Sans, sans-serif;">
            <tr style="border-bottom:1px solid #e9ecef;">
                <td style="font-size:12px; color:#234371; font-weight:bold; border-right: 1px solid #e9ecef; border-collapse: collapse;padding: 10px 20px;">${user.transformations}</td>
                <td style="font-size:12px; color:#234371; border-right: 1px solid #e9ecef; border-collapse: collapse;padding: 10px 20px;">APIs Transformed</td>
            </tr>
        </table>`;
    }
}

export { EmailGenerator };
