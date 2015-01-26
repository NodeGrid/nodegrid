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
From this feature, NodeGrid facilitate all the backend functionalities for GCM (Google Cloud Messaging) & APNS (Apple Push Notification Service). Developers only need to care about there client application.

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

> curl -X GET -H "Content-Type: application/json" http://localhost:3000/system/user/\<userId\>

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

> curl -X GET -H "Content-Type: application/json" http://localhost:3000/system/user/\<username\>

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

> curl -X DELETE -H "Content-Type: application/json" http://localhost:3000/system/user/\<userId\>

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

<br/>

### App

Users can create dynmic entities and do CRUD operations from NodeGrid. NodeGrid facilitate keep relationships between created dynamic entities.

<br/>
#### **Store**
--------------

#### *Create new entity and store object*

As an example let's get entity called `books`. In books entity has follwing type object `{"name":"NodeGrid Tutorials", "author":"John Smith", "type": "Tutorials"}`.
<br/>
This request is authenticated from user accessToken. Therefore you need to set `Authorization` HEADER to request.

Replace the `<accessToken>` from your user's accessToken.

URL: `http://localhost:3000/app/books`
<br/>Request Type: `POST`
<br/>Data Object: `{"name":"NodeGrid Tutorials", "author":"John Smith"}`

> curl -X POST -H "Content-Type: application/json" -H "Authorization: \<accessToken\>" -d '{"name":"NodeGrid Tutorials", "Author":"John Smith", "type": "Tutorials"}' http://localhost:3000/app/books

Sample Response:
```
{
  "status": "SUCCESS",
  "msg": "New model added successfully",
  "data": {
    "__v": 0,
    "data": {
      "type": "Tutorials",
      "Author": "John Smith",
      "name": "NodeGrid Tutorials"
    },
    "_id": "54759bfb14706eb4488f9b7c"
  }
}
```

#### *Query objects from entity*

Let's use the same example entity `books`.
<br/>
This request is authenticated from user accessToken. Therefore you need to set `Authorization` HEADER to request.

Replace the `<accessToken>` from your user's accessToken.

URL: `http://localhost:3000/app/books`
<br/>Request Type: `GET`

> curl -X GET -H "Content-Type: application/json" -H "Authorization: \<accessToken\>" http://localhost:3000/app/books

Sample Response:
```
{
  "status": "SUCCESS",
  "msg": "[books] data successfully retrieved",
  "data": [
    {
      "_id": "5451bb4e3ab7a4760fed4fea",
      "data": {
        "type": "Story",
        "author": "J. R. R. Tolkien",
        "name": "The Hobbit"
      },
      "__v": 0
    },
    {
      "_id": "54759bfb14706eb4488f9b7c",
      "data": {
        "type": "Tutorials",
        "name": "NodeGrid Tutorials",
        "Author": "John Smith"
      },
      "__v": 0
    }
  ]
}
```

#### *Query object in entity from given object id*

Let's use the same example entity `books`.
<br/>
This request is authenticated from user accessToken. Therefore you need to set `Authorization` HEADER to request.

Replace the `<accessToken>` from your user's accessToken.
<br/>Replace the `<object id>` from your entity object id

URL: `http://localhost:3000/app/books/<object id>`
<br/>Request Type: `GET`

> curl -X GET -H "Content-Type: application/json" -H "Authorization: \<accessToken\>" http://localhost:3000/app/books/\<object id\>

Sample Response:
```
{
  "status": "SUCCESS",
  "msg": "[books] data successfully retrieved",
  "data": [
    {
      "_id": "54759bfb14706eb4488f9b7c",
      "data": {
        "type": "Tutorials",
        "name": "NodeGrid Tutorials",
        "Author": "John Smith"
      },
      "__v": 0
    }
  ]
}
```

#### *Delete object in entity from given object id*

Let's use the same example entity `books`.
<br/>
This request is authenticated from user accessToken. Therefore you need to set `Authorization` HEADER to request.

Replace the `<accessToken>` from your user's accessToken.
<br/>Replace the `<object id>` from your entity object id

URL: `http://localhost:3000/app/books/<object id>`
<br/>Request Type: `DELETE`

> curl -X DELETE -H "Content-Type: application/json" -H "Authorization: \<accessToken\>" http://localhost:3000/app/books/\<object id\>

Sample Response:
```
{
  "status": "SUCCESS",
  "msg": "[books] data successfully deleted",
  "data": {
    "_id": "54759bfb14706eb4488f9b7c",
    "data": {
      "type": "Tutorials",
      "name": "NodeGrid Tutorials",
      "Author": "John Smith"
    },
    "__v": 0
  }
}
```

<br/>
#### **Relationships**
----------------------

#### *Create relationship between entity objects*

Stored entity objects can have relationships. NodeGrid facilitate developers to keep those relations in the database. That also can do from simple end_points like above examples.
<br/>
This request is authenticated from user accessToken. Therefore you need to set `Authorization` HEADER to request.
<br/>
Let's use simple example. There are two entities called `users` & `books`. There can be relationship like **users has books**

First Entity: `users`
<br/>Relationship: `has`
<br/>Second Entity: `books`

Replace the `<accessToken>` from your user's accessToken.
<br/>Replace the `<object id>` from your entity object id

URL: `http://localhost:3000/app/users/<object id>/has/books/<object id>`
<br/>Request Type: `POST`

> curl -X POST -H "Content-Type: application/json" -H "Authorization: \<accessToken\>" http://localhost:3000/app/users/\<object id\>/has/boooks/\<object id\>

Sample Response:
```
{
    "status": "SUCCESS",
    "msg": "New relations added successfully",
    "data": {
        "__v": 0,
        "data": {
            "secondIdentifier": "544e1c45c9c22bea2dc046cb",
            "secondEntity": "books",
            "relationType": "has",
            "firstIdentifier": "547415c57cb17d271ce44ae7",
            "firstEntity": "users"
        },
        "_id": "54bf3c8a1c89390000d6c2bd"
    }
}
```

#### *Query relationships between entities*

This created relationships supports to build relational mapping between entiry objects. This following relations can query as follows.

Let's use the relationship, created above.
<br/>
This request is authenticated from user accessToken. Therefore you need to set `Authorization` HEADER to request.

Replace the `<accessToken>` from your user's accessToken.
<br/>Replace the `<object id>` from your entity object id

URL: `http://localhost:3000/app/users/<object id>/has/books`
<br/>Request Type: `GET`

> curl -X GET -H "Content-Type: application/json" -H "Authorization: \<accessToken\>" http://localhost:3000/app/users/\<object id\>/has/boooks

Sample Response:
```
{
    "status": "SUCCESS",
    "msg": "[entity_relations] data retrieved successfully",
    "data": [
        {
            "_id": "54bf698e1c89390000d6c2be",
            "data": {
                "name": "NodeGrid Tutorials",
                "Author": "John Smith",
                "type": "Tutorials"
            },
            "__v": 0
        }
    ]
}
```
#### *Delete relationships between entities*

Let's use the relationship, created above.
<br/>
This request is authenticated from user accessToken. Therefore you need to set `Authorization` HEADER to request.

Replace the `<accessToken>` from your user's accessToken.
<br/>Replace the `<object id>` from your entity object id

URL: `http://localhost:3000/app/users/<object id>/has/books/<object id>`
<br/>Request Type: `DELETE`

> curl -X DELETE -H "Content-Type: application/json" -H "Authorization: \<accessToken\>" http://localhost:3000/app/users/\<object id\>/has/boooks/\<object id\>

Sample Response:
```
{
    "status": "SUCCESS",
    "msg": "[entity_relations] data relationship successfully deleted",
    "data": {
        "_id": "54bf69f31c89390000d6c2bf",
        "data": {
            "firstEntity": "users",
            "firstIdentifier": "547415c57cb17d271ce44ae7",
            "relationType": "has",
            "secondEntity": "books",
            "secondIdentifier": "54bf698e1c89390000d6c2be"
        },
        "__v": 0
    }
}
```

<br/>
#### **Push**
-------------

Nower days in web application, notifications plays a big roll. That helps to notify some thing to clients, devices, or any server in instant. NodeGrid mBaaS supports for Push Notifications as a backend. This facilitate GCM (Google Cloud Messaging) & APNS (Apple Push Notification Service) implementations. Developer can configure the keys in to NodeGrid and simply can do the push notification in there applications.

#### *Set Google Notifier to NodeGrid*

In GCM (Google Cloud Messaging) developer has to configure server side configurations. First developer need to create an app in Google AppEngine. From the Google AppEngine app, we have to create server-key for push sender. That server-key must configure to NodeGrid to send push notification using GCM.


This request is authenticated from user accessToken. Therefore you need to set `Authorization` HEADER to request.

Replace the `<accessToken>` from your user's accessToken.
<br/>Replace the `<server-key-from-google-app>` from your google AppEngine app server-key.

URL: `http://localhost:3000/app/push/notifier/google`
<br/>Request Type: `POST`
<br/>Data Object: `{"server_key":"<server-key-from-google-app>"}`

> curl -X POST -H "Content-Type: application/json" -H "Authorization: \<accessToken\>" -d '{"server_key":"\<server-key-from-google-app\>"}' http://localhost:3000/app/push/notifier/google

Sample Response:
```
{
    "status": "SUCCESS",
    "msg": "[google] Push notifier updated successfully",
    "data": {
        "server_key": "AIzaSyD2KCj6ib1PG-8tDROMCJvO9_6eT11eJuM",
        "name": "google"
    }
}
```

#### *Set Apple Notifier to NodeGrid*
