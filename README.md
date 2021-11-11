# Hanabata-Code

## Table of Contents

* [Developer Guide](#developer-guide)
<br />

## Overview
Hiking trails application that allows to view information about the trails on their phone. Admins must use Meteor web app to add, edit, delete trails detail. also, they can assign admin roles to existing members who registered an account through the Meteor web app.

This project contains two application. "dlnr-app" for smart phone application and "meteor" for web application. Meteor is the central database/server for the dlnr-app.
All the data we collected from APIs and Users will go through the Meteor including sign up, sign in, sign out.


## Developer Guide: 

### Installation

#### Meteor Install

First, [install Meteor](https://www.meteor.com/install).

Second, download [Hanabata-Code](https://github.com/HACC2021/Hanabata-Code), and request permission to gain access to Hanabata-Code. 

Third, cd into the "meteor/app/" directory and install required libraries: meteor:

```
$ meteor npm install
```

#### Expo Install

First, download expo-cli golbally

```
$ npm install --global expo-cli
```

Second, cd into the "dlnr-app/" directory and install required libraraies:

```
$ expo install
```

### Running the system

#### Meteor

After installation, you can run the application from the "meteor/app/" directory by typing:

```
$ meteor npm run start
```
The first time running the application will add default users: 

```
$ meteor npm run start

> meteor-application-template-react@ start /Users/name/Desktop/GitHub/COKOA/app
> meteor --no-release-check --exclude-archs web.browser.legacy,web.cordova --settings ../config/settings.development.json
```

#### Expo

After installation, you can run the application from the "dlnr-app" directory by typing:

```
$ npm run start
```

### Deployment


## Meet the Team:

[Yong Kim](https://yongkim93.github.io) <br />

[Yeji Han](https://yejihan92.github.io) <br />

[Kai Hwang](https://hwangwooj.github.io) <br />

[Cheolhoon Choi](https://cheolhoon.github.io) <br />

[Keith Okuna]() <br /> <br /> <br />


