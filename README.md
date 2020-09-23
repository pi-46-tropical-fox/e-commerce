# e-commerce
Membuat E-Commerce
E-Commerce with name Tokoku. This app has:

&nbsp;

## Endpoints
````
- POST /login
- GET /products
- POST /products
- GET /products/:id
- PUT /products/:id
- DELETE /products/:id
- GET /carts
- POST /carts/:id
- DELETE /carts/:id
- POST /checkout
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
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJmYXVkemFuIiwiaWF0IjoxNTk4OTU1OTk2fQ.-bZ3Gi4AXPQMtrHfbxJ605On57u4gRXfU0ok88aIW94"
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

### GET /products

> Show all Tokoku products

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

> Show all Tokoku Carts

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
        "id": 51,
        "quantity": 2,
        "status": true,
        "createdAt": "2020-09-23T15:32:55.296Z",
        "updatedAt": "2020-09-23T15:51:36.319Z",
        "UserId": 3,
        "ProductId": 21,
        "Product": {
            "id": 21,
            "name": "Tiffany & Co. White Gold T Smile Bracelet",
            "image_url": "https://cdn.shopify.com/s/files/1/0341/9842/1549/products/tiffany-co-18k-white-gold-diamond-t-smile-bracelet-bracelets-tiffany-co-727050_2000x.jpg?v=1594139978",
            "price": 25000000,
            "stock": 3,
            "createdAt": "2020-09-19T06:30:47.109Z",
            "updatedAt": "2020-09-23T15:51:36.292Z"
        }
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

### POST /carts/:id

> Add Cart by ProductId

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

_Response (201)_
```json
{
    "id": 17,
    "UserId": 3,
    "ProductId": 23,
    "quantity": 1,
    "updatedAt": "2020-09-23T14:44:17.273Z",
    "createdAt": "2020-09-23T14:44:17.273Z",
    "status": false
}
```

_Response (200)_
```json
{
    "id": 54,
    "quantity": 2,
    "status": false,
    "createdAt": "2020-09-23T16:00:50.796Z",
    "updatedAt": "2020-09-23T16:00:54.347Z",
    "UserId": 3,
    "ProductId": 23
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

### DELETE /carts/:id

> Delete Cart by ProductId

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
        "id": 51,
        "quantity": 2,
        "status": true,
        "createdAt": "2020-09-23T15:32:55.296Z",
        "updatedAt": "2020-09-23T15:51:36.319Z",
        "UserId": 3,
        "ProductId": 21,
        "Product": {
            "id": 21,
            "name": "Tiffany & Co. White Gold T Smile Bracelet",
            "image_url": "https://cdn.shopify.com/s/files/1/0341/9842/1549/products/tiffany-co-18k-white-gold-diamond-t-smile-bracelet-bracelets-tiffany-co-727050_2000x.jpg?v=1594139978",
            "price": 25000000,
            "stock": 3,
            "createdAt": "2020-09-19T06:30:47.109Z",
            "updatedAt": "2020-09-23T15:51:36.292Z"
        }
    }
```
_Response (403 - Forbidden Access)_
```json
{
  "message": "Forbidden Access"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```

### POST /checkout

> Checkout all items in the cart

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
        "id": 16,
        "quantity": 1,
        "status": true,
        "createdAt": "2020-09-23T14:41:20.991Z",
        "updatedAt": "2020-09-23T14:44:33.360Z",
        "UserId": 3,
        "ProductId": 22,
        "Product": {
            "id": 22,
            "name": "Tiffany & Co. Gold Ring Band",
            "image_url": "https://media.tiffany.com/is/image/Tiffany/EcomItemL2/tiffany-coband-ring-27897851_934898_ED_M.jpg?&op_usm=1.75,1.0,6.0&$cropN=0.1,0.1,0.8,0.8&defaultImage=NoImageAvailableInternal&&wid=1250&hei=1250",
            "price": 17000000,
            "stock": 12,
            "createdAt": "2020-09-19T06:31:38.982Z",
            "updatedAt": "2020-09-23T14:44:33.108Z"
        }
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

