# User Maintenance App

## Introduction

Main functionality of this application is to manage list of fictional people's personal information (name, surname, phone number, age etc.). App allows to review and update data of specific user in a separate view. There is also an option to delete user both from table and user view. In the table view there is an additional possibility to delete multiple users. All types of deletions can be reverted, so that users will be restored.
User Maintenance App was created in TypeScript using CRA with TypeScript template. Styling was done using Material UI components + CSS modules. Application can be divided into three main parts: - database: 2 JSON files act as a source of data for Loki database. They can be found in `api/resources` folder. - backend: Created with help of express. - frontend: Web app created using React.

## Prerequisites:

User Maintenance App requires [Node.js](https://nodejs.org/) to run.

## Installation

Install the dependencies and devDependencies for both client and api.

```sh
cd api
npm i

cd ../client
npm i
```

## How to start the application:

Run start script from the main folder
a. For Windows: Run `start.bat`
b. For Linux: Change the access permissions to the `start.sh` file and run it
