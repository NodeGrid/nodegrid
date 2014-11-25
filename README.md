# NodeGrid

NodeGrid is a simple, light-weight ***backend as a service*** framework for mobile applications. Build you app, we care about your backend. NodeGrid core is built top of light-weight NodeJS and MongoDB 

----------

## Documents

NodeGrid contains REST API for provide the services. NodeGrid provide following services

- User Management
- Enable Security
- Store and Query dynamic entities (CRUD operations)
- Create relations between dynamic entities
- Send push notification
- Enable server side events

-----------
#### **User Management**
Developers now need to worry about their application's backend users. NodeGrid provide service for users operations and developers can keep there dynamic data in user object as they wish 

#### **Enable Security**
In each API requests are authenticated using token authentication. For using the NodeGrid, user need to log-in and get a token from system to access the  other REST calls.

#### **Store and Query dynamic entities**
Authenticated user can create, read, update, delete entities just using simple REST calls

#### **Create relations between stored entities**
This is one of special feature NodeGrid provide to developers. Developers can create relations between the objects and entities they created dynamically. This also can do from simple REST call.

#### **Send push notification**

#### **Enable server side events**


-----------

<br/>

## Installation

#### **Pre-requisite**

 * Node server - v0.10.0 or higher
	(http://nodejs.org/)
 * NodeJS dependency installer `npm`
	(https://www.npmjs.org/) 
 * MongoDB server - v2.6 or higher
	(http://www.mongodb.org/)

#### **Running**

After setup the pre-requisite clone the NodeGrid to your system.

 * Install nodejs dependencies,

	> npm install

 * Run the NodeGrid,

	> node app.js


----------

<br/>

## Samples

### Application Status

After you install and start `NodeGrid` you can check the application status

#### **check status**

URL: `http://localhost:3000/system/status`
<br/>Request Type: `GET`

> curl -X GET -H "Content-Type: application/json" http://localhost:3000/system/status

Sample Response:
```
{
    "status": "SUCCESS",
    "mongo-connection": "CONNECTED"
}
```

<br/>

### Users

To use NodeGrid you need to create users, Those users can access the REST API.

#### **Create user**

URL: `http://localhost:3000/system/user`
<br/>Request Type: `POST`
<br/>Data Object: `{"name":"John Smith", "username":"john", "password":"john123"}`

> curl -X POST -H "Content-Type: application/json" -d '{"name":"John Smith", "username":"john", "password":"john123"}' http://localhost:3000/system/user

Sample Response:
```
{
    "status": "SUCCESS",
    "msg": "New system user added successfully",
    "data": {
        "__v": 0,
        "data": {
            "lastAccessedTime": "",
            "createdTime": 1416892013,
            "password": "$2a$10$pUu03u5k260tuIKaJpM1cODK0D2CsTj.GxzFHMBfwrHLRHmCOn5/u",
            "username": "john",
            "name": "John Smith"
        },
        "_id": "54740e6d721de8b8135dfb4e"
    }
}
```

#### **Get user from** - *userId*

Replace the `<userId>` from your user's id.

URL: `http://localhost:3000/system/user/<userId>`
<br/>Request Type: `GET`

> curl -X GET -H "Content-Type: application/json"http://localhost:3000/system/user/\<userId\>

Sample Response:
```
{
    "status": "SUCCESS",
    "msg": "Data retrieved successfully",
    "data": [
        {
            "_id": "54740e6d721de8b8135dfb4e",
            "data": {
                "name": "John Smith",
                "username": "john",
                "password": "$2a$10$pUu03u5k260tuIKaJpM1cODK0D2CsTj.GxzFHMBfwrHLRHmCOn5/u",
                "createdTime": 1416892013,
                "lastAccessedTime": ""
            },
            "__v": 0
        }
    ]
}
```

#### **Get user from** - *username*

Replace the `<username>` from your user's username.

URL: `http://localhost:3000/system/user/<username>`
<br/>Request Type: `GET`

> curl -X GET -H "Content-Type: application/json"http://localhost:3000/system/user/\<username\>

Sample Response:
```
{
    "status": "SUCCESS",
    "msg": "Data retrieved successfully",
    "data": [
        {
            "_id": "54740e6d721de8b8135dfb4e",
            "data": {
                "name": "John Smith",
                "username": "john",
                "password": "$2a$10$pUu03u5k260tuIKaJpM1cODK0D2CsTj.GxzFHMBfwrHLRHmCOn5/u",
                "createdTime": 1416892013,
                "lastAccessedTime": ""
            },
            "__v": 0
        }
    ]
}
```

#### **Delete user from** - *userId*

Replace the `<userId>` from your user's id.

URL: `http://localhost:3000/system/user/<userId>`
<br/>Request Type: `DELETE`

> curl -X DELETE -H "Content-Type: application/json"http://localhost:3000/system/user/\<userId\>

Sample Response:
```
{
    "status": "SUCCESS",
    "msg": "System user removed from the collection successfully.",
    "data": 1
}
```

<br/>

### Token Authentication

Created user need to authenticate NodeGrid to access the REST API. This authentication happen from accessToken. For each and every REST call, user need to pass accessToken.

#### **Generate AccessToken**

URL: `http://localhost:3000/system/security/generateToken`
<br/>Request Type: `POST`
<br/>Data Object: `{"username":"john", "password":"john123"}`

> curl -X POST -H "Content-Type: application/json" -d '{"username":"john", "password":"john123"}' http://localhost:3000/system/security/generateToken

Sample Response:
```
{
    "status": "SUCCESS",
    "msg": "New accessToken saved successfully",
    "data": {
        "__v": 0,
        "data": {
            "status": "valid",
            "expiringTime": 1416980339,
            "createdTime": 1416893939,
            "userId": "547415c57cb17d271ce44ae7",
            "accessToken": "f02a2e0e569b8fc216b3d1da6035d6581ea1cec4"
        },
        "_id": "547415f37cb17d271ce44ae8"
    }
}
```
