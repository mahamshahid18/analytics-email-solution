'use strict';

import request from 'request';

import * as users from '../users.json';
import { Helper } from '../utilities/helpers';

class QueryProcessor {
    static getStats(emailId) {
        return Promise.all([
            QueryProcessor.getTransformerStats(emailId),
            QueryProcessor.getSdkStats(emailId),
            QueryProcessor.getDocsStats(emailId)
        ]);
    }
    static getTransformerStats(emailId) {
        let user = users.default.find(user => user.email == emailId);

        return new Promise((resolve, reject) => {
            request(Helper.getRequestOptions('transformer', emailId), (err, response, body) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    let respBody = JSON.parse(body);
                    if (respBody !== null && respBody.length > 0) {
                        user.transformations = respBody[0];
                        resolve();
                    }
                }
            });
        });
    };

    static getSdkStats(emailId) {
        let user = users.default.find(user => user.email == emailId);

        const langsMap = {
            node_javascript_lib: 'node',
            angular_javascript_lib: 'angular',
            go_generic_lib: 'go',
            ruby_generic_lib: 'ruby',
            python_generic_lib: 'python',
            php_generic_lib: 'php',
            objc_cocoa_touch_ios_lib: 'objectivec',
            java_gradle_android_lib: 'java',
            java_eclipse_jax_rs: 'java',
            java_eclipse_jre_lib: 'java',
            cs_portable_net_lib: 'csharp',
            cs_universal_windows_platform_lib: 'csharp',
            cs_net_standard_lib: 'csharp'
        };

        return new Promise((resolve, reject) => {
            request(Helper.getRequestOptions('sdk', emailId), (err, response, body) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    let respBody = JSON.parse(body);
                    if (respBody.length > 0) {
                        respBody.forEach((item) => {
                            const eventName = item.event.name;
                            let language = '';
                            if (eventName.includes('SDKGenerated')) {
                                language = item.event.properties.Language;
                                user.sdks[langsMap[language.toLowerCase()]]++;
                                user.sdksGenerated = true;
                                resolve();
                            }
                        });
                    }
                }
            });
        });
    };

    static getDocsStats(emailId) {
        let user = users.default.find(user => user.email == emailId);

        return new Promise((resolve, reject) => {
            request(Helper.getRequestOptions('docs', emailId), (err, response, body) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    let respBody = JSON.parse(body);
                    if (respBody.length > 0) {
                        respBody.forEach((item) => {
                            const eventName = item.event.name;
                            let language = '';
                            if (eventName.includes('DocsViewed')) {
                                language = item.event.properties.Platform;
                                if (Helper.IsNotNullOrEmpty(language)) {
                                    if (language === 'DotNet') {
                                        language = 'csharp';
                                    } else if (language === 'IOS') {
                                        language = 'objectivec';
                                    }
                                    user.docs[language.toLowerCase()]++;
                                    user.docsViewed = true;
                                    resolve();
                                }
                            }
                        });
                    }
                }
            });
        });
    }
}

export { QueryProcessor };
