# API Endpoints

```
POST /user/register
POST /user/login

GET /products
GET /products/:id
POST /products
DELETE /products/:id
PUT /products/:id
```
## POST /user/register
### Request Header
```
none
```

### Request Body
```json
{
    "email" : "regan@mail.com",
    "password" : "aaaaaaaaaa"
}
```

### Response Body (201)
```json
{
    "id" : 2,
    "email" : "regan@mail.com",
}
```

## POST /user/login
### Request Header
```
none
```

### Request Body
```json
{
    "email" : "hal@g.com",
    "password" : "password"
}
```

### Response Body (200)
```json
{
    "id" : 1,
    "email" : "hal@g.com",
    "access_token" : "<jwt>"
}
```

### Response Body (401) (wrong credentials)
```json
{
    "message" : "Email/Password combination not found!"
}
```

## GET /cart
### Request Headers
```json
{
    "access_token" : "<jwt>"
}
```

### Response Body (200)
```json
[
    {
        "ProductId" : 2,
        "UserId" : 2,
        "product" : {
            "name" : "Kuaci",
            "image_url" : "https://goocl.c/a.jpg",
            "stock" : 2,
            "price" : 21390
        },
        "quantity" : 3
    }
]
```

## POST /cart
### Request Headers
```json
{
    "access_token" : "<jwt>"
}
```
### Request Body
```json
{
    "productId" : 2,
    "quantity" : 2
}
```

### Response Body
```json
{
    "ProductId" : 2,
    "UserId" : 2,
    "product" : {
        "name" : "Kuaci",
        "image_url" : "https://goocl.c/a.jpg",
        "stock" : 2,
        "price" : 21390
    },
    "quantity" : 3
}
```

## PUT /cart/:id
### Request Headers
```json
{
    "access_token" : "<jwt>"
}
```

### Request Body
```json
{
    "quantity" : 5
}
```

### Response (200)

## DELETE /cart/:id
### Request Headers
```json
{
    "access_token" : "<jwt>"
}
```

### Response (200)

## GET /products
### Request Headers
```json
{
    "access_token" : "<jwt>"
}

```

### Response Body (200)
```json
[
    {
        "id" : 1,
        "name" : "Kuaci",
        "image_url" : "https://goocl.c/a.jpg",
        "stock" : 2,
        "price" : 21390
    }
]
```

### Response Body (401) (No JWT Provided)
```json
[
    {
        "message" : "User not authenticated"
    }
]
```

## POST /products
### Request Headers
```json
{
    "access_token" : "<jwt>"
}
```

### Request Body
```json
{
    "name" : "Kuaci",
    "image_url" : "https://goocl.c/a.jpg",
    "stock" : 2,
    "price" : 21390
}
```


### Response Body (201)
```json
{
    "id" : 1,
    "name" : "Kuaci",
    "image_url" : "https://goocl.c/a.jpg",
    "stock" : 2,
    "price" : 21390
}
```

### Response Body (401) (No JWT Provided)
```json
[
    {
        "message" : "User not authenticated"
    }
]
```

## PUT /products/:id
```json
{
    "access_token" : "<jwt>"
}
```

### Request Body
```json
{
    "name" : "Kuaci",
    "image_url" : "https://goocl.c/a.jpg",
    "stock" : 2,
    "price" : 1000
}
```

### Response Body (200)
```json
{
    "id" : 1,
    "name" : "Kuaci",
    "image_url" : "https://goocl.c/a.jpg",
    "stock" : 2,
    "price" : 1000
}
```

### Response Body (401) (No JWT Provided)
```json
[
    {
        "message" : "User not authenticated"
    }
]
```

## DELETE /products/:id
```json
{
    "access_token" : "<jwt>"
}
```

### Response Body (200)
```json
{
    "message" : "Item deleted"
}
```

### Response Body (401) (No JWT Provided)
```json
[
    {
        "message" : "User not authenticated"
    }
]
```
