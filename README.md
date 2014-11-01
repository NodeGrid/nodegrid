nodegrid
========

NodeGrid is a simple, light-weight ***backend as a service*** framework for mobile applications. Build you app, we care about your backend. NodeGrid core is built top of light-weight NodeJS and MongoDB 

----------

Documents
-------------

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

Installation
--------------

#### **Pre-requisite**

 * Node server - v0.10.0 or higher
	http://nodejs.org/
 * NodeJS dependency installer `npm`
    https://www.npmjs.org/ 
 * MongoDB server - v2.6 or higher
	http://www.mongodb.org/

#### **Running**

After setup the pre-requisite clone the NodeGrid to your system.

 * Install nodejs dependencies,

> npm install

 * Run the NodeGrid,

> node app.js


