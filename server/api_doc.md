# E-Commerce App Server

## List of available endpoints:
```
- POST /login
- POST /register
- POST /products
- GET /products
- GET /products/:id
- PUT /products/:id
- DELETE /products/:id
- GET /carts
- POST /carts/:id
- PUT /carts/:id
- DELETE /carts/:id
```

## POST /login
> Login user

_Request_:

- data:
```json
{
  "email": "string",
  "password": "string"
}
```

_Response_:

- status: 200
- body: 
```json
{
  "access_token": "access_token",
  "role": "admin"
}
```
- status: 400
```json
{  
  "email": "email must be filled",
  "password": "password must be filled"
}
```
- status: 500
```json
{
  "message": "Internal Server Error"
}
```

## POST /register
> Register user

_Request_:

- data:
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

_Response_:

- status: 200
- body: 
```json
{
  "id": "integer",
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "customer"
}
```
- status: 400
```json
{  
  "email": "email must be filled",
  "password": "password must be filled"
}
```
- status: 500
```json
{
  "message": "Internal Server Error"
}
```

## POST /products
> add new products

_Request_:

- header:
```json
{
  "access_token": "access_token"
}
```

_Response_:

- status: 201
- body: 
```json
{
  "name": "string",
  "image_url": "string",
  "price": "integer",
  "stock": "integer"
}
```
- status: 400
```json
{  
  "name": "name item must be filled",
  "price": "price must be greater than -1",
  "stock": "stock must be greater than 0"
}
```
- status: 500
```json
{
  "message": "Internal Server Error"
}
```

## GET /products
> show all products

_Request_:

- header:
```json
{
    "access_token": "access_token"
}
```

_Response_:

- status: 200
- body: 
```json
{
  "name": "string",
  "image_url": "string",
  "price": "integer",
  "stock": "integer"
}
```
- status: 500
```json
{
  "message": "Internal Server Error"
}
```

## GET /products/:id
> show products by id

_Request_:

- header:
```json
{
  "access_token": "access_token"
}
```

_Response_:

- status: 200
- body: 
```json
{
  "name": "string",
  "image_url": "string",
  "price": "integer",
  "stock": "integer"
}
```
- status: 500
```json
{
  "message": "Internal Server Error"
}
```

## PUT /products/:id
> edit products

_Request_:

- header:
```json
{
  "access_token": "access_token"
}
```

_Response_:

- status: 200
- body: 
```json
{
  "name": "string",
  "image_url": "string",
  "price": "integer",
  "stock": "integer"
}
```
- status: 400
```json
{  
  "name": "name item must be filled",
  "price": "price must be greater than -1",
  "stock": "stock must be greater than 0"
}
```
- status: 403
```json
{  
  "message": "No access"
}
```
- status: 500
```json
{
  "message": "Internal Server Error"
}
```

## DELETE /products/:id
> delete products

_Request_:

- header:
```json
{
  "access_token": "access_token"
}
```
- params:
```json
{
  "id": "integer"
}
```

_Response_:

- status: 200
- body:
```json
{
    "message": "Successfully delete products"
}
```
- status: 400
```json
{  
  "message": "Failed delete products"
}
```
- status: 403
```json
{  
  "message": "No access"
}
```
- status: 500
```json
{
  "message": "Internal Server Error"
}
```
## CRUD Carts

## GET /carts
> Get all carts

_Request_:

- header:
```json
{
  "access_token": "access_token"
}
```

_Response_:

- status: 200
- body: 
```json
{
  "UserId": "integer",
  "ProductId": "integer",
  "amount": "integer",
  "total": "integer"
}
```
- status: 403
```json
{  
  "message": "No access"
}
```
- status: 500
```json
{
  "message": "Internal Server Error"
}
```

## POST /carts/:id
> add to carts

_Request_:

- header:
```json
{
  "access_token": "access_token",
  
}
```
- body: 
```json
{
  "UserId": "integer",
  "ProductId": "integer",
  "amount": "integer",
  "total": "integer"
}
```

_Response_:

- status: 201
- body: 
```json
{
  "UserId": "integer",
  "ProductId": "integer",
  "amount": "integer",
  "total": "integer"
}
```
- status: 400
```json
{  
  "message": "Product's out of stock",
  "message": "You've reached the order limit"
}
```
- status: 500
```json
{
  "message": "Internal Server Error"
}
```

## PUT /carts/:id
> edit amount carts

_Request_:

- header:
```json
{
  "access_token": "access_token"
}
```
- body: 
```json
{
  "amount": "integer"
}
```

_Response_:

- status: 200
- body: 
```json
{
  "message": "Successfully edit amount"
}
```
- status: 403
```json
{  
  "message": "No access"
}
```
- status: 500
```json
{
  "message": "Internal Server Error"
}
```

## DELETE /carts/:id
> delete product from carts

_Request_:

- header:
```json
{
  "access_token": "access_token"
}
```
- body: no needed

_Response_:

- status: 200
- body: 
```json
{
  "message": "Successfully delete cart"
}
```
- status: 403
```json
{  
  "message": "No access"
}
```
- status: 500
```json
{
  "message": "Internal Server Error"
}
```