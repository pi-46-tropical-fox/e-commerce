# Ecommerce CMS
Website for manage your product. This app has : 
* CRUD Product
* JSON formatted response

&nbsp;

## Endpoints
```
- POST /register
- POST /login
- GET /products
- POST /products
- GET /products/:id
- PUT /products/:id
- DELETE /products/:id
- GET /carts
- POST /carts/:id
- PUT /carts/:id
- DELETE /carts/:id
```

## RESTful endpoints
---
### POST /register

> Register
_Request Header_
```json
not needed
```

_Request Params_
```json
  not needed
```

_Request Body_
```json
{
  "email": "<email from body>",
  "password": "<password from body>",
  "role": "<role from body with >" // from hooks
}
```

_Response (201)_
```json
[
  {
    "email": "<email from body>",
    "role": "<role from body>",
  }
]
```

_Response (400 - Bad Request)_
```json
{
  "message": "Validation Error"
}
```
---
### POST /login

> Login
_Request Header_
```json
not needed
```

_Request Params_
```json
    not needed
```

_Request Body_
```json
{
  "email": "<email from body>",
  "password": "<password from body>"
}
```

_Response (200)_
```json
{
  "access_token": "<access_token>",
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Validation Error"
}
```
---
### GET /products

> Get all products
_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```json
[
  {
    "id": "<product id>",
    "name": "<product name>",
    "image_url": "<product image_url>",
    "price": "<product price>",
    "stock": "<product stock>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": "<product id>",
    "name": "<product name>",
    "image_url": "<product image_url>",
    "price": "<product price>",
    "stock": "<product stock>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Server Error"
}
```
---
### POST /products

> Create new product
_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
    "name": "<product name>",
    "image_url": "<product image_url>",
    "price": "<product price>",
    "stock": "<product stock>"
}
```

_Response (201 - Created)_
```json
{
    "id": "<given id>",
    "name": "<posted name>",
    "image_url": "<posted image_url>",
    "price": "<posted price>",
    "stock": "<posted stock>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Validation Error"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Server Error"
}
```
---
### GET /products/:id

> Get products by id
_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{
  "id": "<id of product>"
}
```

_Request Body_
```
  not needed
```

_Response (200)_
```json

{
  "id": "<product id>",
  "name": "<product name>",
  "image_url": "<product image_url>",
  "price": "<product price>",
  "stock": "<product stock>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}

```

_Response (404 - Not Found)_
```json
{
  "message": "Data not found"
}
```
---
### PUT /products/:id

> Update products by id
_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{
    "id": "<id of product>"
}
```

_Request Body_
```json
{
  "name": "<product name>",
  "image_url": "<product image_url>",
  "price": "<product price>",
  "stock": "<product stock>"
}
```

_Response (200)_
```json

{
  "id": "<id of product>",
  "name": "<product name>",
  "image_url": "<product image_url>",
  "price": "<product price>",
  "stock": "<product stock>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}

```

_Response (400 - Bad Request)_
```json
{
  "message": "Validation errors"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Data not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Server Error"
}
```
---
### DELETE /products/:id

> Delete products by id
_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{
    "id": "<id of product>"
}
```

_Request Body_
```
    not needed
```

_Response (200)_
```json
{
  "message": "successfully delete"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Data not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Server Error"
}
```
### GET /carts

> Get all cart
_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
  not needed
```

_Request Body_
```
  not needed
```

_Response (200)_
```json

[
  {
    "id": 1,
    "name": "2020 Cervelo P-Series Disc 105 R7000 Carbon",
    "image_url": "https://i.ebayimg.com/images/g/BwkAAOSwxIld6Dcp/s-l300.jpg",
    "price": 47368040,
    "stock": 7,
    "createdAt": "2020-09-22T08:51:50.822Z",
    "updatedAt": "2020-09-22T08:51:50.822Z",
    "Cart": {
        "ProductId": 1,
        "UserId": 3,
        "quantity": 1,
        "total": 1,
        "createdAt": "2020-09-22T08:52:18.336Z",
        "updatedAt": "2020-09-22T09:28:20.531Z"
      }
  },
  {
    "id": 2,
    "name": "hexohm v3",
    "image_url": "https://i.ebayimg.com/images/g/BwkAAOSwxIld6Dcp/s-l300.jpg",
    "price": 47368040,
    "stock": 4545,
    "createdAt": "2020-09-22T09:29:29.585Z",
    "updatedAt": "2020-09-22T09:29:29.585Z",
    "Cart": {
        "ProductId": 2,
        "UserId": 3,
        "quantity": 1,
        "total": 1,
        "createdAt": "2020-09-22T12:09:59.439Z",
        "updatedAt": "2020-09-22T12:09:59.439Z"
      }
  }
]

```

_Response (400 - user not authenticated)_
```json
{
  "err": {
    "statusCode": 400,
    "message": "user not authenticated"
  },
  "message": "user not authenticated"
}
```
---
### POST /carts/:id

> Create new cart
_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "quantity": 1,
  "total": 1
}
```

_Response (201 - Created)_
```json
"Successfully added to cart"
```

_Response (400 - Bad Request)_
```json
{
  "err": {
    "statusCode": 400,
    "message": "user not authenticated"
  },
  "message": "user not authenticated"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Server Error"
}
```
---
### PUT /carts/:id

> Update cart by id
_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{
  "id": "<id of ProductId>"
}
```

_Request Body_
```json
{
  "quantity": 1
}
```

_Response (200)_
```json

{
  "message": "Successfully edit quantity"
}

```

_Response (400 - Bad Request)_
```json
{
  "err": {
    "statusCode": 400,
    "message": "user not authenticated"
  },
  "message": "user not authenticated"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Data not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Server Error"
}
```
---
### DELETE /carts/:id

> Delete carts by id
_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{
  "id": "<id of ProductId>"
}
```

_Request Body_
```
  not needed
```

_Response (200)_
```json
{
  "message": "successfully delete cart"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Data not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Server Error"
}
```