# e-commerce-cms
Membuat Content Management System untuk e-commerce
test

# BOOKIEPEDIA store
This is e-commerce website to sell all popular books around the world, including book from Indonesia tho.

Disclaimer:
For your convenient, please use full screen resolution browser on your desktop (1920 x 1080) pixels while using this website.


##
Firebase:
Admin : https://bookiepedia-sam.web.app
Customer : https://bookiepedia-client-sam.web.app

If you're want to login as an admin, please use samuel@mail.com as a login email
If you're want to login as an security (not admin), please use aming@mail.com as a login email


Admin can access all feature in this bookepedia website (CRUD).
Meanwhile, security (not admin) only have access for read all books and banner.


# API Documentation
&nbsp;

## RESTful endpoints
```
  - POST /login
  - POST /products
  - GET /products
  - GET /products/:product_id
  - DELETE /products/:product_id
  - PUT /products/:product_id
  - GET /banners
  - POST /banners
  - GET /banners/:banner_id
  - DELETE /banners/:banner_id
  - PUT /banners/:banner_id

  - GET carts/
  - PUT carts/
  - POST carts/:product_id
  - PUT carts/:product_id
  - DELETE carts/:product_id
```

### POST /login

> User login

_Request Header_
```
{
  not needed
}
```

_Request Body_
```
{
  "email": "<your admin email>",
  "password": "<your admin password>"
}
```

_Response (200 - OK)_
```
{
  "access_token": "<access_token>,
  "email": "<your admin email>",
  "name": "<your admin name>",
  "role": "<your admin role>",
  
  
}
```

_Response (401 - Unauthorized)_
```
{
  "errors": [
    Invalid name or password
  ]
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

### POST /products

> Create new product

_Request Header_
```
{
  "access_token": "<your admin access token>"
}
```

_Request Body_
```
{
  "name": "<your product name>",
  "image_url": "<your product url image>",
  "price": "<your product price>",
  "stock": "<your product stock>"
}
```

_Response (200 - OK)_
```
{
  "id": "<your product id>",
  "name": "<your product name>",
  "image_url": "<your product image_url>",
  "price": "<your product price>",
  "stock": "<your product stock>",
  "createdAt": "2020-09-15T14:20:17.621Z",
  "updatedAt": "2020-09-15T14:20:17.621Z"
}
```

_Response (400 )_
```
{
  "errors": [
    "Product name must not empty"
    "Invalid price input"
    "Invalid stock input "
  ]
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

### GET /products

> Show all product

_Request Header_
```
{
  "access_token": "<your admin access token>"
}
```

_Request Body_
```
{
  not needed
}
```

_Response (200 - OK)_
```
[
    {
        "id": "<your product id>",
        "name": "<your product name>",
        "image_url": "<your product image_url>",
        "price": "<your product price>",
        "stock": "<your product stock>",
        "createdAt": "2020-09-15T14:20:17.621Z",
        "updatedAt": "2020-09-15T14:20:17.621Z"
    },
    {
        "id": "<your product id>",
        "name": "<your product name>",
        "image_url": "<your product image_url>",
        "price": "<your product price>",
        "stock": "<your product stock>",
        "createdAt": "2020-09-15T14:20:17.621Z",
        "updatedAt": "2020-09-15T14:20:17.621Z"
    }
    
]
```

_Response (404 - Not Found)_
```
{
  "errors": [
    "Product does not exist!"
  ]
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

### GET /products/:product_id

> Get product by its owner

_Request Header_
```
{
  "access_token": "<your admin access token>",
}
```
_Request Params_
```
{
  "product_id": "<your product id>",
}
```

_Request Body_
```
  not needed
```

_Response (200 - )_
```
  "id": "<your product id>",
  "name": "<your product name>",
  "image_url": "<your product image_url>",
  "price": "<your product price>",
  "stock": "<your product stock>",
  "createdAt": "2020-09-15T14:22:28.867Z",
  "updatedAt": "2020-09-15T14:30:51.816Z"    
```

_Response (404 - Bad Request)_
```
{
  "errors": [
    Product does not exist!
  ]
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---



### DELETE /products/:product_id
> delete product by its id

_Request Header_
```
{
  "access_token": "<your admin access token>"
}
```

_Request Body_
```
{
  "id": <request id of product for delete>
}
```

_Response (200 - OK)_
```
"Product has been successfully removed"
```

_Response (404 - Not found)_
```
{
  "errors": [
    Product does not exist! 
  ]
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---


### PUT /products/:product_id
> update product by its id
_Request Header_
```
 { 
  "access_token": "<your admin access token>",
 }
 ```
_Request Params_
```
 { 
  "product_id": "<your product id>
 }
```

_Request Body_
```
{
  "id": "<your product id>",
  "name": "<your product name>",
  "image_url": "<your product image_url>",
  "price": "<your product price>",
  "stock": "<your product stock>",
}
```

_Response (200 - OK)_
```
{
  "id": "<selected product id>",
  "name": "<updated product name>",
  "image_url": "<updated product image_url>",
  "price": "<updated product price>",
  "stock": "<updated product stock>",
  "createdAt": "<updated date>",
  "updatedAt": "<updated date>"
}
```

_Response (400 - Bad Request)_
```
{  
  errors: [
    "Product name must not empty"
    "Invalid price input"
    "Invalid stock input "
  ]

}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

### POST /banners

> Create new banner

_Request Header_
```
{
  "access_token": "<your admin access token>"
}
```

_Request Body_
```
{
  "name": "<your banner name>",
  "image_url": "<your banner url image>",
  "status": "<your banner status>",

}
```

_Response (200 - OK)_
```
{
  "id": "<your banner id>",
  "name": "<your banner name>",
  "image_url": "<your banner image_url>",
  "status": "<your banner status>",

  "createdAt": "2020-09-15T14:20:17.621Z",
  "updatedAt": "2020-09-15T14:20:17.621Z"
}
```

_Response (400 )_
```
{
  "errors": [
    "banner name must not empty"
    "Invalid status input"

  ]
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

### GET /banners

> Show all banner

_Request Header_
```
{
  "access_token": "<your admin access token>"
}
```

_Request Body_
```
{
  not needed
}
```

_Response (200 - OK)_
```
[
    {
        "id": "<your banner id>",
        "name": "<your banner name>",
        "image_url": "<your banner image_url>",
        "status": "<your banner status>",

        "createdAt": "2020-09-15T14:20:17.621Z",
        "updatedAt": "2020-09-15T14:20:17.621Z"
    },
    {
        "id": "<your banner id>",
        "name": "<your banner name>",
        "image_url": "<your banner image_url>",
        "status": "<your banner status>",

        "createdAt": "2020-09-15T14:20:17.621Z",
        "updatedAt": "2020-09-15T14:20:17.621Z"
    }
    
]
```

_Response (404 - Not Found)_
```
{
  "errors": [
    "banner does not exist!"
  ]
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

### GET /banners/:banner_id

> Get banner by its owner

_Request Header_
```
{
  "access_token": "<your admin access token>",
}
```
_Request Params_
```
{
  "banner_id": "<your banner id>",
}
```

_Request Body_
```
  not needed
```

_Response (200 - )_
```
  "id": "<your banner id>",
  "name": "<your banner name>",
  "image_url": "<your banner image_url>",
  "status": "<your banner status>",

  "createdAt": "2020-09-15T14:22:28.867Z",
  "updatedAt": "2020-09-15T14:30:51.816Z"    
```

_Response (404 - Bad Request)_
```
{
  "errors": [
    banner does not exist!
  ]
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---



### DELETE /banners/:banner_id
> delete banner by its id

_Request Header_
```
{
  "access_token": "<your admin access token>"
}
```

_Request Body_
```
{
  "id": <request id of banner for delete>
}
```

_Response (200 - OK)_
```
"banner has been successfully removed"
```

_Response (404 - Not found)_
```
{
  "errors": [
    banner does not exist! 
  ]
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---


### PUT /banners/:banner_id
> update banner by its id
_Request Header_
```
 { 
  "access_token": "<your admin access token>",
 }
 ```
_Request Params_
```
 { 
  "banner_id": "<your banner id>
 }
```

_Request Body_
```
{
  "id": "<your banner id>",
  "name": "<your banner name>",
  "image_url": "<your banner image_url>",
  "status": "<your banner status>",

}
```

_Response (200 - OK)_
```
{
  "id": "<selected banner id>",
  "name": "<updated banner name>",
  "image_url": "<updated banner image_url>",
  "status": "<updated banner status>",

  "createdAt": "<updated date>",
  "updatedAt": "<updated date>"
}
```

_Response (400 - Bad Request)_
```
{  
  errors: [
    "banner name must not empty"
    "Invalid status input"

  ]

}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---


### POST /carts/:product_id

> Create new cart and update existing cart

_Request Header_
```
{
  "access_token": "<your admin access token>"
}
```

_Request Body_
```
{
  "quantity" : <quantity of product requested by user>

}
```

_Response (201 - Created)_
```
{
  "id": <cart id>,
  "ProductId": <product id that requested by user>,
  "UserId": <user id>,
  "quantity": <product quantity that requested by user>,
  "updatedAt": "2020-09-23T07:20:45.983Z",
  "createdAt": "2020-09-23T07:20:45.983Z",
  "status": "beforeCheckout",
  "total": <quantity * price of product>
}
```
_Response (200 - OK)_
```
{
  "id": <cart id>,
  "ProductId": <product id that requested by user>,
  "UserId": <user id>,
  "quantity": <product quantity that requested by user>,
  "total": <quantity * price of product>
  "updatedAt": "2020-09-23T07:20:45.983Z",
  "createdAt": "2020-09-23T07:20:45.983Z",
  "status": "beforeCheckout",
}
```

_Response (400 )_
```
{
  message: 'Sorry our stock is only <stock of product>'
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---


### GET /carts

> Show carts of user

_Request Header_
```
{
  "access_token": "<your admin access token>"
}
```

_Request Body_
```
{
  not needed
}
```

_Response (200 - OK)_
```
[
  
    {
        "id": <cart id>,
        "ProductId": <product id of cart>,
        "UserId": <user id of cart>,
        "quantity": <quantity product of cart>,
        "total": <price * quantity>,
        "status": "beforeCheckout",
        "createdAt": <date created>,
        "updatedAt": <date updated>,
        "User": {
            "id": <user id>,
            "name": <user name>,
            "email": <user email>,
            "password": <user hash password>
            "role": "customer",
            "createdAt": <date created>,
            "updatedAt": <date updated>,
        },
        "Product": {
            "id": <product id>,
            "name": <product name>,
            "image_url": <product image link>,
            "price": <product price>,
            "stock": <product stock>
            "createdAt": <date created>,
            "updatedAt": <date updated>
        }
    },
    {
        "id": <cart id>,
        "ProductId": <product id of cart>,
        "UserId": <user id of cart>,
        "quantity": <quantity product of cart>,
        "total": <price * quantity>,
        "status": "beforeCheckout",
        "createdAt": <date created>,
        "updatedAt": <date updated>,
        "User": {
            "id": <user id>,
            "name": <user name>,
            "email": <user email>,
            "password": <user hash password>
            "role": "customer",
            "createdAt": <date created>,
            "updatedAt": <date updated>,
        },
        "Product": {
            "id": <product id>,
            "name": <product name>,
            "image_url": <product image link>,
            "price": <product price>,
            "stock": <product stock>
            "createdAt": <date created>,
            "updatedAt": <date updated>
        }
    }
    
]
```

_Response (404 - Not Found)_
```
{
  "message": [
    "Sorry, your shopinng cart is not exist"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

### DELETE /carts/:product_id

> delete carts by its user id and product id

_Request Header_
```
{
  "access_token": "<your admin access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
"item has been removed from the cart"
```

_Response (404 - Not found)_
```
{
  "message": item is not exist
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

### PUT carts/:product_id
> delete carts by its user id and product id

_Request Header_
```
{
  "access_token": "<your admin access token>"
}
```

_Request Body_
```
  "quantity": <quantity of product>
```

_Response (200 - OK)_
```
"item has been removed from the cart"
```

_Response (404 - Not found)_
```
{
  "message": item is not exist
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

### PUT carts/
> checkout carts, then updating db stock product

_Request Header_
```
{
  "access_token": "<your admin access token>"
}
```

_Request Body_
```
  "quantity": <quantity of product>
```

_Response (200 - OK)_
```
"Successfully checkout product"
```

_Response (404 - Not found)_
```
{
  "message": cart is not exist
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
