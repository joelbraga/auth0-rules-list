# Auth0 Rules List

[Auth0](https://auth0.com) is an authentication broker that supports social identity providers as well as enterprise identity providers such as Active Directory, LDAP, Google Apps, Salesforce.

## Introduction

In this repository, you'll find an API and Web Application that can dynamically generate, at any time, a list of the applications in your **Auth0** account and the [rules](https://github.com/auth0/rules) which apply to each application.

## Setup

- Generate an [APIv2 Token](https://auth0.com/docs/api/v2/tokens) with the `Token Generator` in the [Auth0 APIv2 explorer](https://auth0.com/docs/api/v2). You must add the `read:rules` scope to the token.
- Create a new application in [Auth0 Dashboard](https://manage.auth0.com).
- If you want the rules list to be only available to a selected whitelist of users:
    - Go to [Rules Section](https://manage.auth0.com/#/rules) in [Auth0 Dashboard](https://manage.auth0.com).
    - Add rule that will only allow access to users with specific email addresses on this application using this [example](https://github.com/auth0/rules/blob/master/rules/simple-user-whitelist-for-app.md).

## Installation

```bash
$ npm install
```

Make sure you change the `server/config/auth0.config.js` file with your newly created application settings:
    
        module.exports = {
          clientId: 'myClientID',
          clientSecret: 'myClientSecret',
          domain: 'mydomain.auth0.com',
          rulesToken: 'myRulesToken',
        };

* `clientId`: The identifier for the application you've created. This can be found in the settings for your app on Auth0.
* `clientSecret`: The secret for the application you've created. This can be found in the settings for your app on Auth0.
* `domain`: The domain you have from your Auth0 account. This can be found in the settings for your app on Auth0.
* `rulesToken`: The token you generated with the [Token Generator](https://auth0.com/docs/api/v2) (`read:rules` scope).

If you want to view the rules list from the Web Application make sure you change the `client/app/core/constants.js` file with your newly created application settings:

      angular
        .module('app')
        .constant('auth0Config', {
          clientId: 'myClientID',
          domain: 'mydomain.auth0.com',
        })
        .constant('apiUrl', 'http://localhost:3000')
        .constant('rulesListCloseOthers', false);
        
* `clientId`: The identifier for the application you've created. This can be found in the settings for your app on Auth0.
* `domain`: The domain you have from your Auth0 account. This can be found in the settings for your app on Auth0.
* `apiUrl`: The endpoint of the auth0 rules list server [Default: http://localhost:3000]
* `rulesListCloseOthers`: Control whether expanding a application rules list will cause the others to close.
        
## Run

```bash
$ cd server
$ node bin/www
```

### API Usage

#### GET /api/list

This endpoint is protected by Auth0 authentication.

Example: http://localhost:3000/api/list

### Web Application Usage

Access via:

```http
http://localhost:3000/
```

Example:

![](http://i.imgur.com/kz27X5C.png?1)

