# Gadget Space E-Commerce App
Gadget Space application web to manage database for e-commerce. This app has : 
* RESTful endpoint for product's CRUD operation
* Login as admin
* JSON formatted response

&nbsp;

## Endpoints
``` 
- GET /products
- GET /products/:productId
- POST /products
- PUT /products/:productId
- DELETE /products/:productId
- GET /categories
- POST /login
- POST /register
- GET /carts
- POST /carts/:productId
- DELETE /carts/:productId
- PUT /carts/:productId
- POST /checkout
- GET /profile
- POST /profile
- GET /transactions
- GET /wishlists
- POST /wishlists/:productId
- DELETE /wishlists/:productId
```

## RESTful endpoints
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

_Response (200)_
```
[
  {
    "id": 3,
    "name": "Samsung Galaxy S20",
    "img_url": "https://images.samsung.com/id/smartphones/galaxy-s20/buy/1-7-hubble-x1-cloud-pink-gallery-mobile-img.jpg",
    "color": "Cloud Pink",
    "capacity": "128GB",
    "price": 14499000,
    "stock": 10,
    "CategoryId": 1,
    "createdAt": "2020-09-19T04:56:39.457Z",
    "updatedAt": "2020-09-19T05:23:35.135Z",
    "Category": {
      "id": 1,
      "name": "Smartphone"
    }
  },
  {
    "id": 2,
    "name": "Samsung Galaxy S20",
    "img_url": "https://images.samsung.com/fr/smartphones/galaxy-s20/buy/carousel/mobile/1-9-hubble-x1-cosmic-gray-gallery-img.jpg",
    "color": "Cosmic Gray",
    "capacity": "128GB",
    "price": 14499000,
    "stock": 10,
    "CategoryId": 1,
    "createdAt": "2020-09-19T04:56:39.457Z",
    "updatedAt": "2020-09-19T04:56:39.457Z",
    "Category": {
      "id": 1,
      "name": "Smartphone"
    }
  }
]
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---
### GET /products/:productId

> Get product by id

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
    "id": 2,
    "name": "Samsung Galaxy S20",
    "img_url": "https://images.samsung.com/fr/smartphones/galaxy-s20/buy/carousel/mobile/1-9-hubble-x1-cosmic-gray-gallery-img.jpg",
    "color": "Cosmic Gray",
    "capacity": "128GB",
    "price": 14499000,
    "stock": 10,
    "CategoryId": 1,
    "createdAt": "2020-09-19T04:56:39.457Z",
    "updatedAt": "2020-09-19T04:56:39.457Z",
    "Category": {
      "id": 1,
      "name": "Smartphone"
    }
  }
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---
### POST /products

> Create new product

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "name": <product name>,
    "img_url": <product img url>,
    "color": <product color>,
    "capacity": <product capacity>,
    "price": <product price>,
    "stock": <product stock>,
    "CategoryId": <category id>
}
```

_Response (201)_
```
{
  "product": {
    "id": <given by system>,
    "name": "Samsung Galaxy S20+",
    "img_url": "https://images.samsung.com/id/smartphones/galaxy-s20/buy/1-8-hubble-x1-could-blue-gallery-mobile-img.jpg",
    "color": "Cloud Blue",
    "capacity": "128GB",
    "price": 14499000,
    "stock": 10,
    "CategoryId": 1,
    "updatedAt": "2020-09-19T06:09:38.426Z",
    "createdAt": "2020-09-19T06:09:38.426Z"
  },
  "message": "New product has been added"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---
### PUT /products/:productId

> Update product by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "name": <product name>,
    "img_url": <product img url>,
    "color": <product color>,
    "capacity": <product capacity>,
    "price": <product price>,
    "stock": <product stock>,
    "CategoryId": <category id>
}
```

_Response (200)_
```
{
  "message": "Product has been updated"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---
### DELETE /products/:productId

> Delete product by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
no needed
```

_Response (200)_
```
{
  "message": "Product has been deleted"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---
### GET /categories

> Get all categories

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
no needed
```

_Response (200)_
```
[
  {
    "id": 1,
    "name": "Smartphone",
    "createdAt": "2020-09-19T04:56:39.424Z",
    "updatedAt": "2020-09-19T04:56:39.425Z"
  },
  {
    "id": 2,
    "name": "Tablet",
    "createdAt": "2020-09-19T04:56:39.425Z",
    "updatedAt": "2020-09-19T04:56:39.425Z"
  }
]
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---
### POST /register

> Register your account

_Request Header_
```
not needed
```

_Request Body_
```
{
  "firstName": "<your first name>",
  "lastName": "<your last name>",
  "email": "<your email>"
  "password": "<your password>",
}
```

_Response (201 - created)_
```
{
  "firstName": "Abdul",
  "lastName": "Fattah",
  "access_token": <access_token>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---
### POST /login

> Login to your account

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<your registered email>"
  "password": "<your registered password>",
}
```

_Response (200 - ok)_
```
{
  "firstName": "Abdul",
  "lastName": "Fattah",
  "access_token": <access_token>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---
### GET /carts

> Get all my carts

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
  "carts": [
    {
      "qty": 1,
      "status": "UNPAID",
      "UserId": 4,
      "ProductId": 1,
      "createdAt": "2020-09-24T03:40:57.077Z",
      "updatedAt": "2020-09-24T03:40:57.077Z",
      "Product": {
        "id": 1,
        "name": "Galaxy S20",
        "img_url": "https://images.samsung.com/id/smartphones/galaxy-s20/buy/1-8-hubble-x1-could-blue-gallery-mobile-img.jpg",
        "color": "Cloud Blue",
        "capacity": "128GB",
        "price": 14499000,
        "stock": 7,
        "CategoryId": 1,
        "createdAt": "2020-09-24T03:24:10.743Z",
        "updatedAt": "2020-09-24T03:26:24.696Z"
      }
    }
  ],
  "grandTotal": {
    "qty": 1,
    "price": 14499000
  }
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---
### POST /carts/:productId

> Add product to your cart

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
no needed
```

_Response (201)_
```
{
  "cart": {
    "qty": 1,
    "status": "UNPAID",
    "UserId": 4,
    "ProductId": 2,
    "updatedAt": "2020-09-24T03:42:52.255Z",
    "createdAt": "2020-09-24T03:42:52.255Z"
  },
  "message": "Product added to your cart"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---
### DELETE /carts/:productId

> Delete cart by productId

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
no needed
```

_Response (200)_
```
{
  "message": "Product deleted from your cart"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---
### PUT /carts/:productId

> Decrement qty product in your cart

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
no needed
```

_Response (200)_
```
{
  "message": "Product updated from your cart"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---
### POST /checkout

> Checkout all product from your cart

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
no needed
```

_Response (201)_
```
{
  "transaction": {
    "id": 2,
    "description": "Galaxy S20 Cloud Blue 128GB Qty: 1, Galaxy S20 Cosmic Gray 128GB Qty: 1",
    "shippingAddress": "Bintaro Jaya",
    "status": "PAID",
    "total": 28998000,
    "UserId": 2,
    "updatedAt": "2020-09-24T03:55:56.378Z",
    "createdAt": "2020-09-24T03:55:56.378Z"
  },
  "grandTotal": {
    "qty": 2,
    "price": 28998000
  },
  "message": "Payment success"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---
### GET /profile

> Get detail of your profile

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
  "firstName": "Salman",
  "lastName": "Hamka",
  "address": "Bintaro Jaya",
  "phone": "087808497900"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---
### POST /profile

> Create your profile detail

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "address": <your address>,
  "phone": <your phone>
}
```

_Response (201)_
```
{
  "profile": {
    "id": 2,
    "address": "Bintaro",
    "phone": "087808497900",
    "UserId": 4,
    "updatedAt": "2020-09-24T04:03:50.820Z",
    "createdAt": "2020-09-24T04:03:50.820Z"
  },
  "message": "Profile updated"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---
### GET /transactions

> Get all your history transaction

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
    "id": 1,
    "description": "Galaxy S20 Cloud Pink 128GB Qty: 2, Galaxy S20 Cosmic Gray 128GB Qty: 2, Galaxy S20 Cloud Blue 128GB Qty: 3, Galaxy Tab S6 Gray 128GB Qty: 5",
    "shippingAddress": "Bintaro Jaya",
    "total": 166488000,
    "status": "PAID",
    "UserId": 2,
    "createdAt": "2020-09-24T03:26:24.739Z",
    "updatedAt": "2020-09-24T03:26:24.739Z",
    "User": {
      "firstName": "Salman",
      "lastName": "Hamka"
    }
  },
  {
    "id": 2,
    "description": "Galaxy S20 Cloud Blue 128GB Qty: 1, Galaxy S20 Cosmic Gray 128GB Qty: 1",
    "shippingAddress": "Bintaro Jaya",
    "total": 28998000,
    "status": "PAID",
    "UserId": 2,
    "createdAt": "2020-09-24T03:55:56.378Z",
    "updatedAt": "2020-09-24T03:55:56.378Z",
    "User": {
      "firstName": "Salman",
      "lastName": "Hamka"
    }
  }
]
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---
### GET /wishlists

> Get all your wishlist

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
    "id": 5,
    "UserId": 2,
    "ProductId": 5,
    "createdAt": "2020-09-24T03:28:30.360Z",
    "updatedAt": "2020-09-24T03:28:30.360Z",
    "Product": {
      "id": 5,
      "name": "Galaxy Tab S6",
      "img_url": "https://images.samsung.com/is/image/samsung/id-galaxy-tab-s6-t865-sm-t865nzaaxid-frontgray-178517793?$PD_GALLERY_L_JPG$",
      "color": "Gray",
      "capacity": "128GB",
      "price": 12999000,
      "stock": 3,
      "CategoryId": 2,
      "createdAt": "2020-09-24T03:24:10.743Z",
      "updatedAt": "2020-09-24T03:26:24.719Z"
    }
  },
  {
    "id": 6,
    "UserId": 2,
    "ProductId": 1,
    "createdAt": "2020-09-24T04:08:50.677Z",
    "updatedAt": "2020-09-24T04:08:50.677Z",
    "Product": {
      "id": 1,
      "name": "Galaxy S20",
      "img_url": "https://images.samsung.com/id/smartphones/galaxy-s20/buy/1-8-hubble-x1-could-blue-gallery-mobile-img.jpg",
      "color": "Cloud Blue",
      "capacity": "128GB",
      "price": 14499000,
      "stock": 6,
      "CategoryId": 1,
      "createdAt": "2020-09-24T03:24:10.743Z",
      "updatedAt": "2020-09-24T03:55:56.325Z"
    }
  }
]
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---
### POST /wishlists/:productId

> Add product to your wishlist

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
no needed
```

_Response (201)_
```
{
  "wishlist": {
    "id": 7,
    "ProductId": 2,
    "UserId": 2,
    "updatedAt": "2020-09-24T04:10:13.771Z",
    "createdAt": "2020-09-24T04:10:13.771Z"
  },
  "message": "Product added to your wishlist"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---
### DELETE /wishlists/:productId

> Delete product from your wishlist

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
no needed
```

_Response (201)_
```
{
  "message": "Product removed from your wishlist"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---