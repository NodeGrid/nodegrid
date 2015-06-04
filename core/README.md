## Samples

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
  "res": {
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

#### *Advance Quering*

This is a special feature developer get from NodeGrid.From advance quering, developer can pass a `SQL` query to NodeGrid. Then NodeGrid process the given 'SQL' query and return objects from 'MongoDB'.

Let's use the same example entity `books`.
<br/>
This request is authenticated from user accessToken. Therefore you need to set `Authorization` HEADER to request.

Replace the `<accessToken>` from your user's accessToken.
Replace the `<sql query>` from your query that you are going to use in SQL.
Replace the `<sort>` from your sorting column in the SQL table.
Replace the `<limit>` from your limiting column in the SQL table.

URL: `http://localhost:3000/app/advance/books?qry=<sql query>&sort=<sorting column name>&limit=<limit column name>`
<br/>Request Type: `GET`

> curl -X GET -H "Content-Type: application/json" -H "Authorization: \<accessToken\>" http://localhost:3000/app/advance/books?qry=\<sql query\>&sort=\<sorting column name\>&limit=\<limit column name\>

Example:
`http://localhost:3000/app/advance/books?qry=SELECT name, author, price WHERE price < 1000&sort=price`
</br>
Above is a example url, that you have send for advance quering.

Sample Response:
```
{
  "status": "SUCCESS",
  "msg": "[books] data successfully retrieved",
  "data": [
    {
      "_id": "54759bfb14706eb4488f9b7c",
      "data": {
        "name": "NodeGrid Tutorials",
        "Author": "John Smith",
        "price": "999"
      },
      "__v": 0
    },
    {
      "_id": "54759bfb14706eb4488f9b7b",
      "data": {
        "name": "Practical NodeJS",
        "Author": "Azat Mardan",
        "price": "800"
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
   "status":"SUCCESS",
   "msg":"[books] data successfully deleted"
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
<br/>Replace the `<entity name>` from your entity
<br/>Replace the `<object id>` from your entity object id

URL: `http://localhost:3000/app/users/<object id>/has/books/<object id>`
<br/>Request Type: `POST`

> curl -X POST -H "Content-Type: application/json" -H "Authorization: \<accessToken\>" http://localhost:3000/app/users/\<object id\>/has/boooks/\<object id\>

Sample Response:
```
{
  "status": "SUCCESS",
  "msg": "New relations added successfully",
  "res": {
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
<br/>Replace the `<entity name>` from your entity

URL: `http://localhost:3000/app/users/<entity name>/has/books`
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
<br/>Replace the `<entity name>` from your entity
<br/>Replace the `<object id>` from your entity object id

URL: `http://localhost:3000/app/users/<entity name>/has/books/<object id>`
<br/>Request Type: `DELETE`

> curl -X DELETE -H "Content-Type: application/json" -H "Authorization: \<accessToken\>" http://localhost:3000/app/users/\<object id\>/has/boooks/\<object id\>

Sample Response:
```
{  
   "status":"SUCCESS",
   "msg":"[entity_relations] data relationship successfully deleted"
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
  "res": {
    "server_key": "AIzaSyD2KCj6ib1PG-8tDROMCJvO9_6eT11eJuM",
    "name": "google"
  }
}
```

#### *Get Google Notifier*

This is for query the configured `Google Notifier` 

This request is authenticated from user accessToken. Therefore you need to set `Authorization` HEADER to request.

Replace the `<accessToken>` from your user's accessToken.

URL: `http://localhost:3000/app/push/notifier/google`
<br/>Request Type: `GET`

> curl -X GET -H "Content-Type: application/json" -H "Authorization: \<accessToken\>" http://localhost:3000/app/push/notifier/google

Sample Response:
```
{  
   "status":"SUCCESS",
   "msg":"[google] Push notifier retrieved successfully",
   "data":[  
      {  
         "_id":"549ee5b917dfc0af5768ab5b",
         "name":"google",
         "data":{  
            "name":"google",
            "server_key":"AIzaSyD2KCj6ib1PG-8tDROMCJvO9_6eT11eJuM"
         }
      }
   ]
}
```

#### *Set Apple Notifier to NodeGrid*

Feature is still on development

#### *Get Apple Notifier*

Feature is still on development

#### *Notify all desitinations in the given entity*

Send notifications to all configured objects in the given entity.  

This request is authenticated from user accessToken. Therefore you need to set `Authorization` HEADER to request.

Replace the `<accessToken>` from your user's accessToken.
<br/>Replace the `<entity name>` from your entity object id

URL: `http://localhost:3000/app/push/<entity name>/all`
<br/>Request Type: `POST`
<br/>Data Object: `{"message":"<message object you need to send>"}`

> curl -X POST -H "Content-Type: application/json" -H "Authorization: \<accessToken\>" -d '{"message":"Hi NodeGrid"}' http://localhost:3000/app/push/\<entity name\>/all

Sample Response:
```
{
  "status": "SUCCESS",
  "msg": "Push is sent",
  "res": {
    "multicast_id": 4755411179386174000,
    "success": 1,
    "failure": 0,
    "canonical_ids": 0,
    "results": [
      {
        "message_id": "0:1422777415039749%29557986002efde3"
      }
    ]
  }
}
```

#### *Notify given desitinations in the given entity*

Send notifications to given people who configured in the given entity.  

This request is authenticated from user accessToken. Therefore you need to set `Authorization` HEADER to request.

Replace the `<accessToken>` from your user's accessToken.
<br/>Replace the `<entity name>` from your entity
<br/>Replace the `<object id>` from your entity object id

URL: `http://localhost:3000/app/push/<entity name>/all`
<br/>Request Type: `POST`
<br/>Data Object: `{"ids":[<object id 1>, <object id 2>, <object id 3>], "message":"<message object you need to send>"}`

> curl -X POST -H "Content-Type: application/json" -H "Authorization: \<accessToken\>" -d '{"ids":[\<object id 1\>, \<object id 2\>, \<object id 3\>], "message":"\<message object you need to send\>"}' http://localhost:3000/app/push/\<entity name\>

Sample Response:
```
{
  "status": "SUCCESS",
  "msg": "Push is sent",
  "res": {
    "multicast_id": 8815822366424330000,
    "success": 1,
    "failure": 0,
    "canonical_ids": 0,
    "results": [
      {
        "message_id": "0:1422778963162858%29557986002efde3"
      }
    ]
  }
}
```
