# e-commerce
Membuat Website e-commerce

# Register (email, password, role bisa via hooks beforeCreate role: customer)
# Login
# Add to cart (pastikan quantity tidak melebihi stock ). Jika add barang yang sama, tidak boleh dobel, tapi quantity nya yang nambah.
# Show cart
# Remove cart
# Update cart
# Deploy
# Updated API DOC, endpoint baru tinggal ditambah di doc (server)

### Deadline Kamis 13.00

E-Commerce-CMS with name Schmetterling Laden. This app has:

&nbsp;

## Endpoints
````
- POST /login
- POST /register
- GET /products
- POST /products
- GET /products/:id
- PUT /products/:id
- DELETE /products/:id
- GET /carts
- PUT /carts
- POST /carts/product/:id
- DELETE /carts/:ProductId
- PATCH /carts/:ProductId/quantity
- PATCH /carts/:ProductId/status
````

### RESTful endpoints

### POST /login

> Login to Tokoku
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
    "access_token": "<access_token>"
}
```
_Response (400 - Bad Request)_
```json
{
    "message": "Invalid email or password"
}
```

_Response (500 - Internal Server Error)_
```json
{
    "message": "Internal Server Error"
}
```
### POST /register

Request:

- data:

```json
{
  "email": "user@mail.com",
  "password": "1234"
}
```

Response:

- status: 201
- body:
  ​

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjQsImVtYWlsIjoidXNlcjEyQG1haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE1OTg1MDE4OTB9.Qoqr5QNYDXdQyfqZ5nS6Z1hBmxGnJgpTnSD0FXj8Kcg"
}
```

- status 400

```json
{
    "message": "Duplicate Email"
}
```

### GET /products

> Show all Tokoku products
_Request Header_
```json
{
  "access_token": "<access_token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```json
{
   "id": "<id_of_the_product>",
    "name": "<product_name>",
    "image_url": "<product_image_url>",
    "price": "<product_price>",
    "stock": "<product_stock>",
    "createdAt": "2020-09-09T14:55:06.648Z",
    "updatedAt": "2020-09-09T15:30:58.690Z", 
}
```

_Response (401 - Not Authenticated)_
```json
{
  "message": "Doesnt recognize user.."
}
```

_Response (500 - Internal server error)_
```json
{
  "message": "Internal Server Error"
}
```

### POST /products

> Create new products
_Request Header_
```json
{
  "access_token": "<access_token>"
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
  "id": "<given id by system>",
  "name": "<posted name>",
  "image_url": "<posted image_url>",
  "price": "<posted price>",
  "stock": "<posted stock>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (401 - Not Authenticated)_
```json
{
  "message": "Doesnt recognize user.."
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Please fill the field!, Do not input value under 1!"
}
```

### GET /products/:id

> Find detail product by ID
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
{
   "id": 1,
    "name": "<product_name>",
    "image_url": "<product_image_url>",
    "price": "<product_price>",
    "stock": "<product_stock>",
    "createdAt": "2020-09-09T14:55:06.648Z",
    "updatedAt": "2020-09-09T15:30:58.690Z", 
}
```

_Response (401 - Not Authenticated)_
```json
{
  "message": "Doesnt recognize user.."
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Not Found"
}
```

### PUT /products/:id

> Update product by ID
_Request Header_
```json
{
  "access_token": "<your access token>"
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

_Response (200)_
```json
{
  "id": "<selected id>",
  "name": "<updated name>",
  "image_url": "<updated image_url>",
  "price": "<updated price>",
  "stock": "<updated stock>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad request)_
```json
{
  "message": "Please fill the field!, Do not input value under 1!"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Not Found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```

### DELETE /products/:id

> Delete product data by ID
_Request Header_
```json
{
  "access_token": "<access_token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```json
{
   "id": 1,
    "name": "<product_name>",
    "image_url": "<product_image_url>",
    "price": "<product_price>",
    "stock": "<product_stock>",
    "createdAt": "2020-09-09T14:55:06.648Z",
    "updatedAt": "2020-09-09T15:30:58.690Z", 
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Not Found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```
### GET /carts
Request:

- headers:

```json
{
    "access_token": "<access_token>"
}
```

Response:

- status: 200
- body:
  ​

```json
{
    "carts": [
        {
            "id": "<given by the system>",
            "ProductId": "<ProductId>",
            "UserId": "<UserId>",
            "quantity": "<quantity>",
            "status": "<boolean>",
            "createdAt": "2020-08-26T17:24:14.040Z",
            "updatedAt": "2020-08-26T17:41:10.495Z",
            "Product": {
                "id": "<given by system>",
                "name": "<product name>",
                "image_url": "<image url>",
                "price": "<price>",
                "stock": "<Stock>",
                "UserId": "<user id>"
            },
            "User": {
                "id": "<given by system>",
                "email": "<your email>",
                "role": "user"
            }
        },
        ...
]}
```

- status: 401

```json
{
    "message": [
        "Invalid password or email"
    ]
}
```

### PUT /carts

Request:

- headers:

```json
{
    "access_token": "<access_token>"
}
```

Response:

- status: 200
- body:
  ​

```json
{
    "message": "Successfully Updated"
}
```
- status: 401

```json
{
    "message": [
        "Invalid password or email"
    ]
}
```


### POST /carts/product/:id

Request:

- headers:

```json
{
    "access_token": "<access_token>"
}
```

Response:

- status: 201
- body:
  ​

```json
{
    "added": {
        "id": "<given by system>",
        "UserId": "<UserId>",
        "ProductId": "<ProductId>",
        "status": "<boolean>",
        "quantity": "<quantity>",
        "updatedAt": "2020-08-27T04:29:44.605Z",
        "createdAt": "2020-08-27T04:29:44.605Z"
    }
}
```

### DELETE /carts/:ProductId

Request:

- headers:

```json
{
    "access_token": "<access_token>"
}
```

- body:

```json
{
    "name": "<product name>",
    "image_url": "<image url>",
    "price": "<price>",
    "stock": "<stock>"
}
```

Response:

- status: 200
- body:
  ​

```json
{
    "message": "Delete complete "
}
```


### PATCH /carts/:ProductId/quantity

Request:

- headers:

```json
{
    "access_token": "<access_token>"
}
```

- body:

```json
{
    "quantity": "<quantity>"
}
```

Response:

- status: 200
- body:
  ​

```json
{
    "message": "Successfully updated"
}
```

### PATCH /carts/:ProductId/status

Request:

- headers:

```json
{
    "access_token": "<access_token>"
}
```

- body:

```json
{
    "quantity": "integer"
}
```

Response:

- status: 200
- body:
  ​

```json
{
    "message": "Successfully updated"
}
```