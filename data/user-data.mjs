'use strict';

class User {

    constructor() {
        this.users = [];
        this.userData = {
            email: '',
            sdksGenerated: false,
            docsViewed: false,
            transformations: 0,
            sdks: {
                node: 0,
                angular: 0,
                csharp: 0,
                android: 0,
                java: 0,
                php: 0,
                python: 0,
                ruby: 0,
                go: 0,
                objectivec: 0
            },
            docs: {
                node: 0,
                angular: 0,
                csharp: 0,
                android: 0,
                java: 0,
                php: 0,
                python: 0,
                ruby: 0,
                go: 0,
                objectivec: 0
            }
        };
    }

    getUserData() {
        return this.userData;
    }

    clearUserData() {
        this.userData = {
            email: '',
            sdksGenerated: false,
            docsViewed: false,
            transformations: 0,
            sdks: {
                node: 0,
                angular: 0,
                csharp: 0,
                android: 0,
                java: 0,
                php: 0,
                python: 0,
                ruby: 0,
                go: 0,
                objectivec: 0
            },
            docs: {
                node: 0,
                angular: 0,
                csharp: 0,
                android: 0,
                java: 0,
                php: 0,
                python: 0,
                ruby: 0,
                go: 0,
                objectivec: 0
            }
        };
    }

    addUser(user) {
        this.users.push(user);
    }

    getUser(email) {
        this.users.forEach((user) => {
            if (user.email === email) {
                return user;
            }
        });
    }

    getUsers() {
        return this.users;
    }

    clearUsers() {
        this.users = [];
    }
}


export default new User();
