# E-Commerce
An e-commerce app that digitize trading process between customer and seller in a digitized market. This app has:
* CRUD Product
* CRUD Cart
* CRUT Wishlist
* Register and Login
* JSON formatted response

&nbsp;

## RESTful endpoints
```
- POST /register
- POST /login
- post /googleLogin
- POST /products
- GET /products
- GET /products/:id
- PUT /products/:id
- DELETE /products/:id
- POST /banners
- GET /banners
- GET /banners/:id
- PUT /banners/:id
- DELETE /banners/:id

- POST /carts/:productId
- GET /carts
- GET /carts/:id
- PUT /carts/:id
- DELETE /carts/:id
- POST /carts/checkoutall
- POST /carts/checkout/:id
- POST /wishlists/:productId
- GET /wishlists
- GET /carts/:id
- PUT /carts/:id
- DELETE /carts/:id
```

### POST /register

> Register a new user to database

_Request Header_
```
not needed
```

_Request Body_
```
{
  "username": "<username to be inserted into database>" <string><required>,
  "email": "<email to be inserted into database>" <string><required>,
  "password": "<password to authenticate user credentials>" <string><required>,
  "role" "<role of a user in the CMS>" <string><default:customer>
}
```

_Response (201 - Created)_
```
{
  "access_token": "<your access token>" <string>,
  "email": "<posted email>" <string>,
  "role" "<role of a user in the CMS>" <string>
}
```

_Response (400 - Bad Request)_
```
{
  "errors": [
    "<error messages regarding constraints and validations>"
  ]
}
```

_Response(500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ] 
}
```
---
### POST /login

> Logged in an existing user and authenticate his/her credentials

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<user's email>" <string><required>,
  "password": "<user's password>" <string><required>
}
```

_Response (200 - OK)_
```
{
  "access_token": "<your access token>" <string>,
  "email": "<your_email@provider.domain>" <string>
}
```

_Response (400 - Bad Request)_
```
{
  "errors": [
    "Invalid email or password"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ]
}
```
---
### POST /googleLogin

> Logging in a user and/or registering a new user into database

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "username": "<username to get insert into>",
  "email": "<email to get insert into>",
}
```

_Response (200 - OK)_
```
{
  "access_token": "<your access token>",
  "avatar": "<your gogle profile picture>",
  "email": "<your google email>"
}
```

_Response (403 - Forbidden)_
```
{
  "errors": [
    "The verifyIdToken method requires an ID Token"
  ]
}
```

_Response(500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ]  
}
```
#### _for more information about google oAuth please visit https://developers.google.com/gdata/docs/auth/overview_
---
### POST /products

> Insert a new product into database

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "name": "<product name>" <string><required>,
  "image_url": "<product image>" <string><required>,
  "price": "<price of the product>" <number><required>,
  "stock": "<stock of the product>" <number><required>,
  "category": "<product category>" <string><required>,
}
```

_Response (201 - Created)_
```
{
  "id": "<a unique id given by postgres>" <number>,  
  "name": "<product name>" <string>,
  "image_url": "<product image>" <string>,
  "price": "<price of the product>" <number>,
  "stock": "<stock of the product>" <number>.
  "category": "<product category>" <string>,
  "createdAt": "2020-08-31T06:30:49.914Z" <date>,
  "updatedAt": "2020-08-31T06:30:49.914Z" <date>
}
```

_Response (400 - Bad request)_
```
{
  "errors": [
    "<error messages regarding constraints and validations>"
  ]
}
```

_Response (401 - Unauthenticated)_
```
{
  "errors": [
    "User is not authenticated"
  ]
}
```

_Response (403 - Unauthorized)_
```
{
  "errors": [
    "Unauthorized Access"
  ]
}
```

_Response (404 - Not found)_
```
{
  "errors": [
    "Not Found"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ]
}
```
---
### GET /products

> Get all products

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

_Response (200 - OK)_
```
[
  {
    "id": "<a unique id given by postgres>" <number>,  
    "name": "<product name>" <string>,
    "image_url": "<product image>" <string>,
    "price": "<price of the product>" <string>,
    "stock": "<stock of the product>" <number>.
    "createdAt": "2020-08-31T06:30:49.914Z" <date>,
    "updatedAt": "2020-08-31T06:30:49.914Z" <date>
  },
  {
    "id": "<a unique id given by postgres>" <number>,  
    "name": "<product name>" <string>,
    "image_url": "<product image>" <string>,
    "price": "<price of the product>" <string>,
    "stock": "<stock of the product>" <number>.
    "createdAt": "2020-08-31T06:30:49.914Z" <date>,
    "updatedAt": "2020-08-31T06:30:49.914Z" <date>
  }
]
```

_Response (400 - Bad request)_
```
{
  "errors": [
    "<error messages regarding constraints and validations>"
  ]
}
```

_Response (401 - Unauthenticated)_
```
{
  "errors": [
    "User is not authenticated"
  ]
}
```

_Response (403 - Unauthorized)_
```
{
  "errors": [
    "Unauthorized Access"
  ]
}
```

_Response (404 - Not found)_
```
{
  "errors": [
    "Not Found"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ]
}
```
---
### GET /products/:id

> Get task based on id

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

_Response (200 - OK)_
```
{
  "id": "<a unique id given by postgres>" <number>,  
  "name": "<product name>" <string>,
  "image_url": "<product image>" <string>,
  "price": "<price of the product>" <string>,
  "stock": "<stock of the product>" <number>,
  "category": "<product category>" <string>,
  "createdAt": "2020-08-31T06:30:49.914Z" <date>,
  "updatedAt": "2020-08-31T06:30:49.914Z" <date>
}
```

_Response (400 - Bad request)_
```
{
  "errors": [
    "<error messages regarding constraints and validations>"
  ]
}
```

_Response (401 - Unauthenticated)_
```
{
  "errors": [
    "User is not authenticated"
  ]
}
```

_Response (403 - Unauthorized)_
```
{
  "errors": [
    "Unauthorized Access"
  ]
}
```

_Response (404 - Not found)_
```
{
  "errors": [
    "Not Found"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ]
}
```
---
### PUT /products/:id

> Update task based on id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "name": "<product name>" <string><required>,
  "image_url": "<product image>" <string><required>,
  "price": "<price of the product>" <number><required>,
  "stock": "<stock of the product>" <number><required>,
  "category": "<product category>" <string><required>,
}
```

_Response (200 - OK)_
```
{
  "id": "<a unique id given by postgres>" <number>,  
  "name": "<product name>" <string>,
  "image_url": "<product image>" <string>,
  "price": "<price of the product>" <number>,
  "stock": "<stock of the product>" <number>,
  "category": "<product category>" <string>,
  "createdAt": "2020-08-31T06:30:49.914Z" <date>,
  "updatedAt": "2020-08-31T06:30:49.914Z" <date>
}
```

_Response (400 - Bad request)_
```
{
  "errors": [
    "<error messages regarding constraints and validations>"
  ]
}
```

_Response (401 - Unauthenticated)_
```
{
  "errors": [
    "User is not authenticated"
  ]
}
```

_Response (403 - Unauthorized)_
```
{
  "errors": [
    "Unauthorized Access"
  ]
}
```

_Response (404 - Not found)_
```
{
  "errors": [
    "Not Found"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ]
}
```
---
### DELETE /products/:id

> Delete task based on id

_Request Header_
```
{
  "access_token": "<your acsess token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
  "message": "Product has been deleted successfully"
}
```

_Response (401 - Unauthenticated)_
```
{
  "errors": [
    "User is not authenticated"
  ]
}
```

_Response (403 - Unauthorized)_
```
{
  "errors": [
    "Unauthorized Access"
  ]
}
```

_Response (404 - Not found)_
```
{
  "errors": [
    "Not Found"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ]
}
```
---
### POST /banners

> Insert a new banner into database

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "<banner title>" <string><required>,
  "status": "<banner status if it is active or not>" <boolean><default:false>,
  "image_url": "<banner url> <string><required>"
}
```

_Response (201 - Created)_
```
{
  "title": "<banner title>" <string>,
  "status": "<banner status if it is active or not>" <boolean>,
  "image_url": "<banner url>" <string>,
  "createdAt": "2020-08-31T06:30:49.914Z" <date>,
  "updatedAt": "2020-08-31T06:30:49.914Z" <date>
}
```

_Response (400 - Bad request)_
```
{
  "errors": [
    "<error messages regarding constraints and validations>"
  ]
}
```

_Response (401 - Unauthenticated)_
```
{
  "errors": [
    "User is not authenticated"
  ]
}
```

_Response (403 - Unauthorized)_
```
{
  "errors": [
    "Unauthorized Access"
  ]
}
```

_Response (404 - Not found)_
```
{
  "errors": [
    "Not Found"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ]
}
```
---
### GET /banners

> Get all banners

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

_Response (200 - OK)_
```
[
  {
    "id": "<a unique id given by postgres>" <number>,  
    "title": "<banner title>" <string>,
    "status": "<banner status if it is active or not>" <boolean>,
    "image_url": "<banner url>" <string>,
    "createdAt": "2020-08-31T06:30:49.914Z" <date>,
    "updatedAt": "2020-08-31T06:30:49.914Z" <date>
  },
  {
    "id": "<a unique id given by postgres>" <number>,  
    "title": "<banner title>" <string>,
    "status": "<banner status if it is active or not>" <boolean>,
    "image_url": "<banner url>" <string>,
    "createdAt": "2020-08-31T06:30:49.914Z" <date>,
    "updatedAt": "2020-08-31T06:30:49.914Z" <date>
  }
]
```

_Response (400 - Bad request)_
```
{
  "errors": [
    "<error messages regarding constraints and validations>"
  ]
}
```

_Response (401 - Unauthenticated)_
```
{
  "errors": [
    "User is not authenticated"
  ]
}
```

_Response (403 - Unauthorized)_
```
{
  "errors": [
    "Unauthorized Access"
  ]
}
```

_Response (404 - Not found)_
```
{
  "errors": [
    "Not Found"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ]
}
```
---
### GET /banners/:id

> Get banner based on id

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

_Response (200 - OK)_
```
{
  "id": "<a unique id given by postgres>" <number>,  
  "title": "<banner title>" <string>,
  "status": "<banner status if it is active or not>" <boolean>,
  "image_url": "<banner url>" <string>,
  "createdAt": "2020-08-31T06:30:49.914Z" <date>,
  "updatedAt": "2020-08-31T06:30:49.914Z" <date>
}
```

_Response (400 - Bad request)_
```
{
  "errors": [
    "<error messages regarding constraints and validations>"
  ]
}
```

_Response (401 - Unauthenticated)_
```
{
  "errors": [
    "User is not authenticated"
  ]
}
```

_Response (403 - Unauthorized)_
```
{
  "errors": [
    "Unauthorized Access"
  ]
}
```

_Response (404 - Not found)_
```
{
  "errors": [
    "Not Found"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ]
}
```
---
### PUT /banners/:id

> Update banner based on id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "<banner title>" <string><required>,
  "status": "<banner status if it is active or not>" <boolean><default:false>,
  "image_url": "<banner url>" <string><required>
}
```

_Response (200 - OK)_
```
{
  "id": "<a unique id given by postgres>" <number>,  
  "title": "<banner title>" <string>,
  "status": "<banner status if it is active or not>" <boolean>,
  "image_url": "<banner url>" <string>,
  "createdAt": "2020-08-31T06:30:49.914Z" <date>,
  "updatedAt": "2020-08-31T06:30:49.914Z" <date>
}
```

_Response (400 - Bad request)_
```
{
  "errors": [
    "<error messages regarding constraints and validations>"
  ]
}
```

_Response (401 - Unauthenticated)_
```
{
  "errors": [
    "User is not authenticated"
  ]
}
```

_Response (403 - Unauthorized)_
```
{
  "errors": [
    "Unauthorized Access"
  ]
}
```

_Response (404 - Not found)_
```
{
  "errors": [
    "Not Found"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ]
}
```
---
### DELETE /banners/:id

> Delete banner based on id

_Request Header_
```
{
  "access_token": "<your acsess token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
  "message": "Banner has been deleted successfully"
}
```

_Response (401 - Unauthenticated)_
```
{
  "errors": [
    "User is not authenticated"
  ]
}
```

_Response (403 - Unauthorized)_
```
{
  "errors": [
    "Unauthorized Access"
  ]
}
```

_Response (404 - Not found)_
```
{
  "errors": [
    "Not Found"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ]
}
```
---
### POST /carts/:productId

> Insert a new cart into database

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "quantity": <number of product inserted into user's cart> <number><default: 1>
  "status": <transaction status of the cart> <boolean><default:false>
}
```

_Response (201 - Created)_
```
{
  "id": "<a unique id given by postgres for a user's cart>" <number>,
  "quantity": <number of product inserted into user's cart> <number>,
  "status": <transaction status of the cart> <boolean>,
  "ProductId": "<a unique id given by postgres for a product>" <number>,
  "UserId": "<a unique id given by postgres for a user>" <number>,
  "createdAt": "2020-08-31T06:30:49.914Z" <date>,
  "updatedAt": "2020-08-31T06:30:49.914Z" <date>
}
```

_Response (400 - Bad request)_
```
{
  "errors": [
    "Quantity exceeds stock!"
  ]
}

OR

{
  "errors": [
    "<error messages regarding constraints and validations>"
  ]
}
```

_Response (401 - Unauthenticated)_
```
{
  "errors": [
    "User is not authenticated"
  ]
}
```

_Response (403 - Unauthorized)_
```
{
  "errors": [
    "Unauthorized Access"
  ]
}
```

_Response (404 - Not found)_
```
{
  "errors": [
    "Not Found"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ]
}
```
---
### GET /carts

> Get all user's carts content

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

_Response (200 - OK)_
```
[
  {
    "id": "<a unique id given by postgres for a user's cart>" <number>,
    "quantity": <number of product inserted into user's cart> <number>,
    "status": <transaction status of the cart> <boolean>,
    "ProductId": "<a unique id given by postgres for a product>" <number>,
    "UserId": "<a unique id given by postgres for a user>" <number>,
    "createdAt": "2020-08-31T06:30:49.914Z" <date>,
    "updatedAt": "2020-08-31T06:30:49.914Z" <date>
  },
  {
    "id": "<a unique id given by postgres for a user's cart>" <number>,
    "quantity": <number of product inserted into user's cart> <number>,
    "status": <transaction status of the cart> <boolean>,
    "ProductId": "<a unique id given by postgres for a product>" <number>,
    "UserId": "<a unique id given by postgres for a user>" <number>,
    "createdAt": "2020-08-31T06:30:49.914Z" <date>,
    "updatedAt": "2020-08-31T06:30:49.914Z" <date>
  }
]
```

_Response (400 - Bad request)_
```
{
  "errors": [
    "<error messages regarding constraints and validations>"
  ]
}
```

_Response (401 - Unauthenticated)_
```
{
  "errors": [
    "User is not authenticated"
  ]
}
```

_Response (403 - Unauthorized)_
```
{
  "errors": [
    "Unauthorized Access"
  ]
}
```

_Response (404 - Not found)_
```
{
  "errors": [
    "Not Found"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ]
}
```
---
### GET /carts/:id

> Get cart based on id

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

_Response (200 - OK)_
```
{
  "id": "<a unique id given by postgres for a user's cart>" <number>,
  "quantity": <number of product inserted into user's cart> <number>,
  "status": <transaction status of the cart> <boolean>,
  "ProductId": "<a unique id given by postgres for a product>" <number>,
  "UserId": "<a unique id given by postgres for a user>" <number>,
  "createdAt": "2020-08-31T06:30:49.914Z" <date>,
  "updatedAt": "2020-08-31T06:30:49.914Z" <date>
}
```

_Response (400 - Bad request)_
```
{
  "errors": [
    "<error messages regarding constraints and validations>"
  ]
}
```

_Response (401 - Unauthenticated)_
```
{
  "errors": [
    "User is not authenticated"
  ]
}
```

_Response (403 - Unauthorized)_
```
{
  "errors": [
    "Unauthorized Access"
  ]
}
```

_Response (404 - Not found)_
```
{
  "errors": [
    "Not Found"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ]
}
```
---
### PUT /carts/:id

> Update cart based on id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "quantity": <number of product inserted into user's cart> <number><required>
}
```

_Response (200 - OK)_
```
{
  "id": "<a unique id given by postgres for a user's cart>" <number>,
  "quantity": <number of product inserted into user's cart> <number>,
  "status": <transaction status of the cart> <boolean>,
  "ProductId": "<a unique id given by postgres for a product>" <number>,
  "UserId": "<a unique id given by postgres for a user>" <number>,
  "createdAt": "2020-08-31T06:30:49.914Z" <date>,
  "updatedAt": "2020-08-31T06:30:49.914Z" <date>
}
```

_Response (400 - Bad request)_
```
{
  "errors": [
    "Quantity exceeds stock!>"
  ]
}

OR

{
  "errors": [
    "<error messages regarding constraints and validations>"
  ]
}
```

_Response (401 - Unauthenticated)_
```
{
  "errors": [
    "User is not authenticated"
  ]
}
```

_Response (403 - Unauthorized)_
```
{
  "errors": [
    "Unauthorized Access"
  ]
}
```

_Response (404 - Not found)_
```
{
  "errors": [
    "Not Found"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ]
}
```
---
### DELETE /carts/:id

> Delete cart based on id

_Request Header_
```
{
  "access_token": "<your acsess token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
  "message": "A product has been removed from cart"
}
```

_Response (401 - Unauthenticated)_
```
{
  "errors": [
    "User is not authenticated"
  ]
}
```

_Response (403 - Unauthorized)_
```
{
  "errors": [
    "Unauthorized Access"
  ]
}
```

_Response (404 - Not found)_
```
{
  "errors": [
    "Not Found"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ]
}
```
### POST /carts/checkoutall

> Checkout all the products in the carts

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "activeCarts": <all product in cart that have false status> <array><required><sent by client>
  "totalPrice": <total price that should be paid by the users> <number><required><sent by client>
}
```

_Response (200 - OK)_
```
{
  message: 'Checkout Success'
}
```

_Response (400 - Bad request)_
```
{
  "message": [
    "Message about the remaining stock of a product"
  ]
}

OR

{
  "errors": [
    "<error messages regarding constraints and validations>"
  ]
}
```

_Response (401 - Unauthenticated)_
```
{
  "errors": [
    "User is not authenticated"
  ]
}
```

_Response (403 - Unauthorized)_
```
{
  "errors": [
    "Unauthorized Access"
  ]
}
```

_Response (404 - Not found)_
```
{
  "errors": [
    "Not Found"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ]
}
```
### POST /checkout/:id

> Insert a new cart into database

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "totalPrice": <total price that should be paid by the users> <number><required><sent by client>
}
```

_Response (200 - OK)_
```
{
  message: 'Checkout Success'
}
```

_Response (400 - Bad request)_
```
{
  "message": [
    "Message about the remaining stock of a product"
  ]
}

OR

{
  "errors": [
    "<error messages regarding constraints and validations>"
  ]
}
```

_Response (401 - Unauthenticated)_
```
{
  "errors": [
    "User is not authenticated"
  ]
}
```

_Response (403 - Unauthorized)_
```
{
  "errors": [
    "Unauthorized Access"
  ]
}
```

_Response (404 - Not found)_
```
{
  "errors": [
    "Not Found"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ]
}
```
---
### POST /wishlists/:productId

> Insert a new wishlist into database

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

_Response (201 - Created)_
```
{
  "id": "<a unique id given by postgres for a user's cart>" <number>,
  "ProductId": "<a unique id given by postgres for a product>" <number>,
  "UserId": "<a unique id given by postgres for a user>" <number>,
  "createdAt": "2020-08-31T06:30:49.914Z" <date>,
  "updatedAt": "2020-08-31T06:30:49.914Z" <date>
}
```

_Response (400 - Bad request)_
```
{
  "errors": [
    "<Product has already existed in the wishlist>"
  ]
}

OR

{
  "errors": [
    "<error messages regarding constraints and validations>"
  ]
}
```

_Response (401 - Unauthenticated)_
```
{
  "errors": [
    "User is not authenticated"
  ]
}
```

_Response (403 - Unauthorized)_
```
{
  "errors": [
    "Unauthorized Access"
  ]
}
```

_Response (404 - Not found)_
```
{
  "errors": [
    "Not Found"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ]
}
```
---
### GET /wishlists

> Get all user's wishlists content

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

_Response (200 - OK)_
```
[
  {
    "id": "<a unique id given by postgres for a user's cart>" <number>,
    "ProductId": "<a unique id given by postgres for a product>" <number>,
    "UserId": "<a unique id given by postgres for a user>" <number>,
    "createdAt": "2020-08-31T06:30:49.914Z" <date>,
    "updatedAt": "2020-08-31T06:30:49.914Z" <date>
  },
  {
    "id": "<a unique id given by postgres for a user's cart>" <number>,
    "ProductId": "<a unique id given by postgres for a product>" <number>,
    "UserId": "<a unique id given by postgres for a user>" <number>,
    "createdAt": "2020-08-31T06:30:49.914Z" <date>,
    "updatedAt": "2020-08-31T06:30:49.914Z" <date>
  }
]
```

_Response (400 - Bad request)_
```
{
  "errors": [
    "<error messages regarding constraints and validations>"
  ]
}
```

_Response (401 - Unauthenticated)_
```
{
  "errors": [
    "User is not authenticated"
  ]
}
```

_Response (403 - Unauthorized)_
```
{
  "errors": [
    "Unauthorized Access"
  ]
}
```

_Response (404 - Not found)_
```
{
  "errors": [
    "Not Found"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ]
}
```
---
### GET /wishlists/:id

> Get wishlists based on id

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

_Response (200 - OK)_
```
{
  "id": "<a unique id given by postgres for a user's cart>" <number>,
  "ProductId": "<a unique id given by postgres for a product>" <number>,
  "UserId": "<a unique id given by postgres for a user>" <number>,
  "createdAt": "2020-08-31T06:30:49.914Z" <date>,
  "updatedAt": "2020-08-31T06:30:49.914Z" <date>
}
```

_Response (400 - Bad request)_
```
{
  "errors": [
    "<error messages regarding constraints and validations>"
  ]
}
```

_Response (401 - Unauthenticated)_
```
{
  "errors": [
    "User is not authenticated"
  ]
}
```

_Response (403 - Unauthorized)_
```
{
  "errors": [
    "Unauthorized Access"
  ]
}
```

_Response (404 - Not found)_
```
{
  "errors": [
    "Not Found"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ]
}
```
---
### DELETE /wishlists/:id

> Delete wishlist based on id

_Request Header_
```
{
  "access_token": "<your acsess token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
  "message": "A product has been removed from wishlist"
}
```

_Response (401 - Unauthenticated)_
```
{
  "errors": [
    "User is not authenticated"
  ]
}
```

_Response (403 - Unauthorized)_
```
{
  "errors": [
    "Unauthorized Access"
  ]
}
```

_Response (404 - Not found)_
```
{
  "errors": [
    "Not Found"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ]
}
```
---