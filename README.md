# e-commerce (Client)
Firebase: https://wewearblack-hacktiv8.web.app

Login with: testuser@mail.com / pass: testuser

An application to display e-commerce as a client interface. This project took 3 days to include learning the Technologies.

Technologies include :
- Server-side: Sequelize, Express, PostgreSQL, JWT, Jest
- Client-side : Vue, Vue Router, Vuex, Axios , HTML, & CSS (Bootstrap)
- Deployment: Heroku(server), Firebase (client)


# API Documentation
E-Commerce on We Wear Black. This app has:
&nbsp;

## Endpoints
````
- POST /register
- POST /login
- GET /products
- POST /products
- GET /products/:id
- PUT /products/:id
- DELETE /products/:id

- POST /products/:id/cart
- GET /carts
- GET /carts/:id
- PUT /carts/:id/add
- PUT /carts/:id/sub
- DELETE /carts/:id
````

### RESTful endpoints

### POST /register

> Register
_Request Header_
```
not needed
```

_Request Body_
```json
{
    "email": "<email to get insert into>",
    "password": "<password to get insert into>"
}
```

_Response (201)_
```json
{
    "email": "admincms@mail.com",
    "message": "Successfully registered"
}
```
_Response (401 - Bad Request)_
```json
{
    "errors": [
        "Invalid email format",
        "Email is required!",
        "Email has been taken!",
        "Password is required!",
        "password must 6-15 characters"
    ]
}
```

_Response (500 - Internal Server Error)_
```json
{
    "message": "Internal Server Error"
}
```

### POST /login

> Login
_Request Header_
```
not needed
```

_Request Body_
```json
{
    "email": "<email to get insert into>",
    "password": "<password to get insert into>"
}
```

_Response (200)_
```json
{
    "access_token": "<generate unique token>"
}
```
_Response (400 - Bad Request)_
```json
{
    "errors": [
        "Register first!",
         "Invalid username or password!"
    ]
}
```

_Response (500 - Internal Server Error)_
```json
{
    "message": "Internal Server Error"
}
```

### POST /products

> Create new We Wear Black products
_Request Header_
```json
{
  "access_token": "<user access token>"
}
```

_Request Body_
```json
{
  "name": "<name to get insert into>",
  "image_url": "<image_url to get insert into>",
  "price": "<price to get insert into>",
  "stock": "<stock to get insert into>"
}
```

_Response (201 - Created)_
```json
{
  "id": 1,
	"name": "sample",
	"image_url": "https://sample.jpg",
	"price": 99,
	"stock": 99,
}
```

_Response (401 - Not Authenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Name is required!, Image Url is required!, price cant set less than 0, stock cant set less than 0"
}
```

### GET /products

> Show all We Wear Black products
_Request Header_
```json
{
  "access_token": "<user access token>"
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
		"id": 1,
		"name": "sample",
		"image_url": "https://sample.jpg",
		"price": 99,
		"stock": 99,
	},
	{
		"id": 2,
		"name": "sample",
		"image_url": "https://sample.jpg",
		"price": 99,
		"stock": 99,
	}
]
```

_Response (401 - Not Authenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (500 - Internal server error)_
```json
{
  "message": "Internal Server Error"
}
```

### GET /products/:id

> Get detail We Wear Black product by ID
_Request Header_
```json
{
  "access_token": "<user access token>"
}
```
_Request Params_
```
<id product>
```

_Request Body_
```
not needed
```

_Response (200)_
```json
{
  "id": 1,
	"name": "sample",
	"image_url": "https://sample.jpg",
	"price": 99,
	"stock": 99,
}
```

_Response (401 - Not Authenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Null"
}
```

### PUT /products/:id

> Update We Wear Black product by ID
_Request Header_
```json
{
  "access_token": "<user access token>"
}
```

_Request Params_
```
<id product>
```

_Request Body_
```json
{
  "id": 1,
	"name": "edited sample",
	"image_url": "https://sample.jpg",
	"price": 999,
	"stock": 999,
}
```

_Response (200)_
```json
{
  "id": 1,
	"name": "edited sample",
	"image_url": "https://sample.jpg",
	"price": 999,
	"stock": 999,
}
```

_Response (400 - Bad request)_
```json
{
  "message": "Name is required!, Image Url is required!, price cant set less than 0, stock cant set less than 0"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```

### DELETE /products/:id

> Delete We Wear Black products data by ID
_Request Header_
```json
{
  "access_token": "<user access token>"
}
```

_Request Params_
```
<id product>
```

_Request Body_
```
not needed
```

_Response (200)_
```json

{
  "message": "Success"
}

```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```


### POST /products/:id/cart

> Create new We Wear Black cart
_Request Header_
```json
{
  "access_token": "<user access token>"
}
```

_Request Body_
```json
{
    "ProductId": "<req product id>",
    "UserId": "<req user id>"
}
```

_Response (201 - Created)_(if not found)
```json
{
    "id": 1,
    "ProductId": 1,
    "UserId": 1,
    "quantity": 1,
    "status": "waiting payment",
}
```

_Response (201 - Created)_(if found)
```json
[1]
```

_Response (401 - Not Authenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (500 - Internal server error)_
```json
{
  "message": "Internal Server Error"
}

### GET /carts

> Show all We Wear Black products
_Request Header_
```json
{
  "access_token": "<user access token>"
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
        "id": 2,
        "quantity": 13,
        "status": "waiting payment",
        "ProductId": 2,
        "UserId": 2,
        "Product": {
            "id": 2,
            "name": "baju bekas jokowi",
            "image_url": "https://cf.shopee.co.id/file/4869088b82e659ca1358c2baa906827c",
            "price": 50000,
            "stock": 8,
            "category": "Kaos",
        }
    },
    {
        "id": 4,
        "quantity": 0,
        "status": "waiting payment",
        "ProductId": 3,
        "UserId": 2,
        "Product": {
            "id": 3,
            "name": "Baju baru nih",
            "image_url": "https://cf.shopee.co.id/file/4869088b82e659ca1358c2baa906827c",
            "price": 50000,
            "stock": 1,
            "category": "Kaos",
        }
    }
]
```

_Response (401 - Not Authenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (500 - Internal server error)_
```json
{
  "message": "Internal Server Error"
}
```

### GET /carts/:id

> Get detail We Wear Black product by ID
_Request Header_
```json
{
  "access_token": "<user access token>"
}
```
_Request Params_
```
<id product>
```

_Request Body_
```
not needed
```

_Response (200)_
```json
{
    "id": 4,
    "quantity": 1,
    "status": "waiting payment",
    "ProductId": 3,
    "UserId": 2,
}
```

_Response (401 - Not Authenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Null"
}
```

_Response (500 - Internal server error)_
```json
{
  "message": "Internal Server Error"
}
```


### PUT /carts/:id/add

> Update We Wear Black product by ID
_Request Header_
```json
{
  "access_token": "<user access token>"
}
```

_Request Params_
```
<id product>
```

_Request Body_
```json
{
    "ProductId": "<req product id>",
    "UserId": "<req user id>",
    "quantity" : "<increment by 1>"
}
```

_Response (200)_
```json
{
  "message": "Success"
}

```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```

### PUT /carts/:id/sub

> Update We Wear Black product by ID
_Request Header_
```json
{
  "access_token": "<user access token>"
}
```

_Request Params_
```
<id product>
```

_Request Body_
```json
{
    "ProductId": "<req product id>",
    "UserId": "<req user id>",
    "quantity" : "<decrement by 1>"
}
```

_Response (200)_
```json
{
  "message": "Success"
}

```


_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```

### DELETE /carts/:id

> Delete We Wear Black products data by ID
_Request Header_
```json
{
  "access_token": "<user access token>"
}
```

_Request Params_
```
<id product>
```

_Request Body_
```
not needed
```

_Response (200)_
```json

{
  "message": "Success"
}

```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
