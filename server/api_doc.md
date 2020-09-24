# Kanban App Server
E-Commerce CMS is an application to help you to organize your e-commerce. This app has : 
* User Login
* CRUD Products
* JSON formatted response

&nbsp;

## Endpoints
```
- POST /register
- POST /login
- POST /googleLogin
- POST /product
- GET /product
- GET /product/:id
- PUT /product/:id
- DELETE /product/:id
- POST /cart
- GET /cart
- DELETE /cart/:id
- PUT /cart/:id
```

## RESTful endpoints

### POST /register

> Register new user

_Request Header_
```
not needed
```

_Request Body_
```json
{
  "email": "cust@mail.com",
  "password": "123456"
}
```

_Response (200)_
```json
{
    "id": 1,
    "email": "cust@mail.com",
    "role": "customer"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "email must be filled",
  "message": "password must be filled",
  "message": "password min 6 characters"
}
```
_Response (500 - Internal Server Error)_
```json
{
  "message": "internal server error"
}
```

### POST /login

> Login user

_Request Header_
```
not needed
```

_Request Body_
```json
{
  "email": "admin@mail.com",
  "password": "inipassword"
}
```

_Response (200)_
```json
{
    "id": 1,
    "email": "admin@mail.com",
    "access_token": "<access_token>"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "invalid email or password"
}
```
_Response (500 - Internal Server Error)_
```json
{
  "message": "internal server error"
}
```

### POST /googleLogin

> Login user by google account

_Request Header_
```json
{
  "google_access_token": "<google_access_token>"
}
```

_Request Body_
```json
not needed
```

_Response (200)_
```json
{
    "id": 1,
    "email": "user@mail.com",
    "access_token": "<access_token>"
}
```

### POST /product

> Create new product

_Request Header_
```json
{
  "access_token": "<access_token>"
}
```

_Request Body_
```json
{
  "name": "Lea Jeans",
  "image_url": "https://cdn.shopify.com/s/files/1/0028/5825/4382/files/Leajeans-webbanner-4x3-diskon10_1400x.jpg?v=1567404509",
  "price": 489500,
  "stock": 20
}
```

_Response (201 - Created)_
```json
{
  "id": 1,
  "name": "Lea Jeans",
  "image_url": "https://cdn.shopify.com/s/files/1/0028/5825/4382/files/Leajeans-webbanner-4x3-diskon10_1400x.jpg?v=1567404509",
  "price": 489500,
  "stock": 20,
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "name must be filled",
  "message": "image must be filled",
  "message": "price must be filled",
  "message": "stock must be filled",
  "message": "price must be more than 0",
  "message": "stock must be more than 0",
}
```
_Response (500 - Internal Server Error)_
```json
{
  "message": "internal server error"
}
```


### GET /product

> Show all product from database

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
[
  {
  "id": 1,
  "name": "Lea Jeans",
  "image_url": "https://cdn.shopify.com/s/files/1/0028/5825/4382/files/Leajeans-webbanner-4x3-diskon10_1400x.jpg?v=1567404509",
  "price": 489500,
  "stock": 20,
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
  "id": 2,
  "name": "Adidas Firebird Track Jacket",
  "image_url": "https://static.shop.adidas.co.id/media/catalog/product/cache/2/thumbnail/1200x/9df78eab33525d08d6e5fb8d27136e95/D/V/DV1530_FR_Model_eCom.jpg",
  "price": 700000,
  "stock": 7,
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]

```
_Response (403 - Forbidden Access)_
```json
{
  "message": "user not authenticate"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "internal server error"
}
```

---

### GET /product/:id

> Show all product by id from database

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
"name": "Lea Jeans",
"image_url": "https://cdn.shopify.com/s/files/1/0028/5825/4382/files/Leajeans-webbanner-4x3-diskon10_1400x.jpg?v=1567404509",
"price": 489500,
"stock": 20,
"createdAt": "2020-03-20T07:15:12.149Z",
"updatedAt": "2020-03-20T07:15:12.149Z",
}

```
_Response (403 - Forbidden Access)_
```json
{
  "message": "user not authenticate"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "internal server error"
}
```

-------

### PUT /product/:id

> Update product by id

_Request Header_
```json
{
  "access_token": "<access_token>"
}
```

_Request Body_
```json
{
  "id": 1,
  "name": "Lea Jeans",
  "image_url": "https://cdn.shopify.com/s/files/1/0028/5825/4382/files/Leajeans-webbanner-4x3-diskon10_1400x.jpg?v=1567404509",
  "price": 489500,
  "stock": 10,
  }
```

_Response (200)_
```json
{
  "message": "update success"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "product's not found"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "name must be filled",
  "message": "image must be filled",
  "message": "price must be filled",
  "message": "stock must be filled",
  "message": "price must be more than 0",
  "message": "stock must be more than 0",
}
```

_Response (403 - Forbidden Access)_
```json
{
  "message": "user not authorize"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "internal server error"
}
```

---

### DELETE /product/:id

> Delete product by id from database

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
  "message": "delete success"
}
```

_Response (403 - Forbidden Access)_
```json
{
  "message": "user is not authorize"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "product's not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "internal server error"
}
```

### POST /cart

> Create new cart

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

_Response (201 - Created)_
```json
{
  "id": 1,
  "qty": 1,
  "price": 350000,
  "UserId": 5,
  "ProductId": 3,
  "createdAt": "2020-09-22T05:15:41.811Z",
  "updatedAt": "2020-09-22T05:15:41.812Z"
}
```
Response (403 - Forbidden Access)_
```json
{
  "message": "user not authenticate"
}

_Response (500 - Internal Server Error)_
```json
{
  "message": "internal server error"
}
```

### GET /cart

> Show cart by UserId

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
[
    {
        "id": 1,
        "qty": 1,
        "price": 220000,
        "UserId": 5,
        "ProductId": 1,
        "createdAt": "2020-09-22T04:37:41.963Z",
        "updatedAt": "2020-09-22T04:37:41.966Z",
        "Product": {
            "id": 1,
            "name": "Adidas",
            "image_url": "https://s0.bukalapak.com/img/53684606541/large/data.png",
            "price": 220000,
            "stock": 20,
            "category": "sport",
            "createdAt": "2020-09-16T12:02:07.255Z",
            "updatedAt": "2020-09-16T12:02:07.255Z"
        }
    },
    {
        "id": 2,
        "qty": 3,
        "price": 1410000,
        "UserId": 5,
        "ProductId": 2,
        "createdAt": "2020-09-22T04:42:47.351Z",
        "updatedAt": "2020-09-22T05:11:39.187Z",
        "Product": {
            "id": 2,
            "name": "Puma",
            "image_url": "https://cf.shopee.co.id/file/b2ca8315ef7b796c287ee3af16cbe355",
            "price": 235000,
            "stock": 15,
            "category": "sport",
            "createdAt": "2020-09-16T12:02:07.255Z",
            "updatedAt": "2020-09-19T04:35:56.619Z"
        }
    }
]

```
_Response (403 - Forbidden Access)_
```json
{
  "message": "user not authenticate"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "internal server error"
}
```

### PUT /cart/:id

> Update product by id

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
  "message": "update success"
}
```

_Response (403 - Forbidden Access)_
```json
{
  "message": "user not authorize"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "internal server error"
}
```