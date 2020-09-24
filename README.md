# E-Commerce Gudang Kaos

`environment variables:`
>> file .env values:
> - SECRET_KEY=

`link deploy:`
> - heroku : 'https://server-ecommerce-syukur.herokuapp.com'
> - firebase : 'https://bakulkaos-syukur.web.app' & https://cms-bakul-kaos.web.app/

&nbsp;
## RESTful endpoints
---
### Global Responses
_Response (500 - Internal Server Error)_
> This endpoint should always return response below,
```
{ "message": "Interval Server Error" }
```
---
### POST /register

> Create a new user account
_Request Header_
```
  no need
```
_Request Body_
```
{
  email: <email input>,
  password: <email password>
}
```
_Response (201)_
```
{
    "id": <created id>,
    "email": <created email>,
    "password": <hashed password>,
    "status": "Admin",
    "updatedAt": "2020-05-05T08:39:37.867Z",
    "createdAt": "2020-05-05T08:39:37.867Z"
}
```
_Response (400 - Bad Request)_
```
{ message: 'Email already exist' }
```

---
### POST /login

> Create access_token to confirm selected account based on registered accounts
_Request Header_
```
  no need
```
_Request Body_
```
{
  email: <email input>,
  password: <email password>
}
```
_Response (201)_
```
{
    "access_token": <created access_token>
}
```
_Response (400 - Bad request)_
```
{ "message": "Invalid, check email or password" }
```

---
### GET /user/checkOut

> Determine Product Category
_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Body_
```
not needed
```
_Response (200)_
```
{ message: "Checkout Successfully" }
```

---
### GET /products

> Show all products list
_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Body_
```
not needed
```
_Response (200)_
```
[
    {
        "id": "<product id>",
        "name": "<product name>",
        "img_url": "<product img_url>",
        "price": "<product price>",
        "stock": "<product stock>",
        "UserId": "<product UserId>",
        "category": "<product category>",
        "description": "<product description>",
        "createdAt": "2020-05-09T07:43:14.693Z",
        "updatedAt": "2020-05-09T08:05:31.782Z",
        "User": "<register response>"
    },
    {
        "id": "<product id>",
        "name": "<product name>",
        "img_url": "<product img_url>",
        "price": "<product price>",
        "stock": "<product stock>",
        "UserId": "<product UserId>",
        "category": "<product category>",
        "description": "<product description>",
        "createdAt": "2020-05-09T07:43:14.693Z",
        "updatedAt": "2020-05-09T08:05:31.782Z",
        "User": "<register response>"
    }
]
```

---
### POST /products

> Create a new product to the products list
_Request Header_
```
{
    "access_token": "<your access token>"
}
```
_Request Body_
```
{
	"name": "<name to get insert into>",
    "img_url": "<img_url to get insert into>",
    "price": "<price to get insert into>",
    "stock": "<stock to get insert into>",
    "category": "<category to get insert into>",
    "description": "<description to get insert into>",
}
```
_Response (201 - Created)_
```
{
    "id": "<given id by system>",
    "name": "<posted name>",
    "img_url": "<posted img_url>",
    "price": "<posted price>",
    "stock": "<posted stock>",
    "UserId": "<posted UserId>",
    "category": "<posted category>",
    "description": "<posted description>",
    "updatedAt": "2020-05-09T08:07:50.265Z",
    "createdAt": "2020-05-09T08:07:50.265Z"
}
```
_Response(400- bad request)_
```
{ "message": "Unable created data product" }
```

---
### PUT /products/:id

> Update a selected product by ID
_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Body_
```
{
    "name": "<name to get insert into>",
    "img_url": "<img_url to get insert into>",
    "price": "<price to get insert into>",
    "stock": "<stock to get insert into>",
    "category": "<category to get insert into>",
    "description": "<description to get insert into>",
}
```
_Response(200)_
```
{ "message": "Update selected product successfully" }
```
_Response(400 - bad request)_
```
{ "message": "Unable updated data product" }
```
_Response(404 - not found)_
```
{ "message": "Data product not found" }
```

---
### DELETE /products/:id

> Delete a selected product by ID
_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Body_
```
not needed
```
_Response(200)_
```
{ "message": "Delete selected product successfully" }
```
_Response(404 - not found)_
```
{ "message": "Delete data product not found" }
```


---
### POST /carts

> Create a new cart for the selected product to the cart list
_Request Header_
```
{
    "access_token": "<your access token>"
}
```
_Request Body_
```
{
    "quantity": "<quantity to get insert into>",
}
```
_Response (201 - Created)_
```
{
    "id": "<given id by system>",
    "ProductId": "<given id by system>",
    "UserId": "<given id by system>",
    "quantity": "<cart quantity>",
    "totalPrice": "<computed totalPrice>",
    "createdAt": "2020-05-30T08:26:05.154Z",
    "updatedAt": "2020-05-30T08:26:05.154Z",
}
```
_Response(400- bad request)_
```
{ "message": "OWN_PRODUCT" }
or
{ "message": "OUT_OF_STOCK" }
```
_Response(404- not found)_
```
{ "message": "DATA NOT FOUND" }
```

---
### GET /carts/myCart

> Show all carts list
_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Body_
```
not needed
```
_Response (200)_
```
{
    "cart": [
        {
            "ProductId": "<cart ProductId>",
            "UserId": "<cart UserId>",
            "quantity": "<cart ProductId>",
            "totalPrice": "<cart ProductId>",
            "createdAt": "2020-05-30T08:26:05.154Z",
            "updatedAt": "2020-05-30T08:26:05.154Z",
            "Product": "<GET /products response>",
            "User": "<POST /register response>"
        },
        {
            "ProductId": "<cart ProductId>",
            "UserId": "<cart UserId>",
            "quantity": "<cart ProductId>",
            "totalPrice": "<cart ProductId>",
            "createdAt": "2020-05-30T08:26:05.154Z",
            "updatedAt": "2020-05-30T08:26:05.154Z",
            "Product": "<GET /products response>",
            "User": "<POST /register response>"
        },
    ]
}
```

---
### PUT /carts/updateCart

> Update a selected product by ID
_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Body_
```
{
    "quantity": "<quantity to get insert into>",
}
```
_Response (200)_
```
{ "message": "Succesfully update cart for selected product" }
```
_Response(400 - bad request)_
```
{ "message": "Unable update cart for selected product" }
```
---
### DELETE /carts/deleteCart

> Delete a cart for selected product
_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Body_
```
not needed
```
_Response(200)_
```
{ "message": "Sucessfully delete cart for selected product" }
```
_Response(404 - not found)_
```
{ "message": "Delete data cart for selected product not found" }
```

---