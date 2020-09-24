# My e-Commerce CMS App Server
My e-Commerce CMS App is an application to manage e-commerce content. This app has : 
* CRUD Todo
* JSON formatted response

&nbsp;

## endpoints
``` 
- POST /users/login
- GET /items
- POST /items
- PUT /items/:itemId
- DELETE /items/:itemId
- GET /customers
- POST /customers/login
- POST /customers/register
- POST /customers/addwl/:productId
- POST /customers/addcart/:productId
- GET /customers/cart
- GET /customers/wishlist
- PUT /customers/updatecart
- DELETE /customers/deletewl/:wlId
- DELETE /customers/deletecart/:cartId
- PUT /customers/checkout
```


## RESTful endpoints
### POST /user/login

> user login

_Request Header_
```
{
not needed
}
```

_Request Body_
```
{
    "email": "user's email",
    "password": "user's password"
}
```

_Response (200 - OK)_
```
{
  "access_token": "JWT generated token"
}
```

_Response (400 - Bad Request)_
```
{
  "message":"Invalid email or password"
}
```

_Response (401 - Unauthorized)_
```
{
  "message":"you don't have access for this features"
}
```
---


### GET /items

> Get all items

_Request Header_
```
{
  "access_token": "<jwt generated token>"
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
        "name": "Seiko SKX007",
        "gender": "Men",
        "category": "Diver",
        "diameter": "43mm"
        "movement": "automatic"
        "description": "blabla"
        "createdAt": "2020-09-11T04:02:14.558Z",
        "updatedAt": "2020-09-11T04:02:14.558Z"
    },
    {
        "id": 2,
        "name": "Seiko SKX009",
        "gender": "Men",
        "category": "Diver",
        "diameter": "43mm"
        "movement": "automatic"
        "description": "blabla"
        "createdAt": "2020-09-11T04:02:14.558Z",
        "updatedAt": "2020-09-11T04:02:14.558Z"
    },
]
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```

_Response (401 - Unauthorized)_
```
{
  "message":"you don't have access for this features"
}
```
---



### POST /items

> Post new item

_Request Header_
```
{
  "access_token": "<jwt generated token>"
}
```

_Request Body_
```
{
        "id": 4,
        "name": "Seiko SKX007",
        "gender": "Men",
        "category": "Diver",
        "diameter": "43mm"
        "movement": "automatic"
        "description": "blabla"
        "createdAt": "2020-09-11T04:02:14.558Z",
        "updatedAt": "2020-09-11T04:02:14.558Z"
    }
```

_Response (201 - Created)_
```
[
    1
]
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```

_Response (401 - Unauthorized)_
```
{
  "message":"you don't have access for this features"
}
```
---



### PUT /items/:itemId

> Update existing item where id: req.params.itemId

_Request Header_
```
{
  "access_token": "<jwt generated token>"
}
```

_Request Body_
```
{
        "id": 4,
        "name": "Seiko SKX007",
        "gender": "Men",
        "category": "Diver",
        "diameter": "43mm"
        "movement": "automatic"
        "description": "blabla"
        "createdAt": "2020-09-11T04:02:14.558Z",
        "updatedAt": "2020-09-11T04:02:14.558Z"
    }
```

_Response (200 - OK)_
```
[
    1
]
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```

_Response (401 - Unauthorized)_
```
{
  "message":"you don't have access for this features"
}
```
---



### DELETE /items/:itemId

> Delete existing item where id: req.params.itemId

_Request Header_
```
{
  "access_token": "<jwt generated token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
[
    1
]
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```

_Response (401 - Unauthorized)_
```
{
  "message":"you don't have access for this features"
}
```
---

### POST /customers/login

> customer login

_Request Header_
```
{
not needed
}
```

_Request Body_
```
{
    "email": "user's email",
    "password": "user's password"
}
```

_Response (200 - OK)_
```
{
  "access_token": "JWT generated token"
}
```

_Response (400 - Bad Request)_
```
{
  "message":"Invalid email or password"
}
```

_Response (401 - Unauthorized)_
```
{
  "message":"you don't have access for this features"
}
```
---

### POST /customers/register

> customer register

_Request Header_
```
{
not needed
}
```

_Request Body_
```
{
    "email": "user's email",
    "password": "user's password"
}
```

_Response (201 - Created)_
```
{
    "email": "user's email",
    "role": "user"
}
```

_Response (400 - Bad Request)_
```
{
  "message":"Invalid email or password"
}
```

_Response (401 - Unauthorized)_
```
{
  "message":"you don't have access for this features"
}
```
---

{
    "email": "user's email",
    "password": "user's password"
}


### GET /customers

> get product list

_Request Header_
```
{
not needed
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
        "id": 3,
        "name": "Seiko SZSC005",
        "gender": "Men",
        "category": "Dive Watch",
        "diameter": "44mm",
        "movement": "Automatic",
        "description": "Prospex Jade Monster Jade Dial Stainless Steel Automatic Diver Scuba 200M",
        "image": "https://i.pinimg.com/originals/9b/32/8c/9b328c4221f79720b0f5455d5f4a312c.jpg",
        "stock": 3,
        "price": 7200000,
        "createdAt": "2020-09-22T05:23:08.793Z",
        "updatedAt": "2020-09-22T05:23:08.793Z"
    },
    {
        "id": 5,
        "name": "Seiko SBDN-01X Titanium",
        "gender": "Women",
        "category": "Dive Watch",
        "diameter": "38mm",
        "movement": "Solar-powered",
        "description": "Seiko’s new titanium Solar divers are matching pairs offered in two sizes—the SBDJ range is 44.1mm x 52.6mm x 12.4mm (marketed to men) and the SBDN range is 38.8mm x 46.5mm x 11.2mm (marketed to women).",
        "image": "https://cdn11.bigcommerce.com/s-e31c8/images/stencil/500x659/products/1113/10988/Prospex_Air_Diver_Solar_SBDN017__46814.1466786974.1280.1280__89925.1469391394.png?c=2",
        "stock": 10,
        "price": 7800000,
        "createdAt": "2020-09-22T05:23:08.793Z",
        "updatedAt": "2020-09-22T05:23:08.793Z"
    },
    {
        "id": 6,
        "name": "Frederique Constant FC303S5B6",
        "gender": "Men",
        "category": "Dress Watch",
        "diameter": "39mm",
        "movement": "Automatic",
        "description": "The FC303S5B6 pays homage to the classic Patek Philippe Calatrava dress watch and that’s very apparent in its elegant design. So it’s perfect for an understated dress watch on just about any sized wrist.",
        "image": "https://cdn.watchreviewblog.com/wp-content/uploads/2018/04/Frederique-Constant-FC303S5B6.jpg",
        "stock": 12,
        "price": 10500000,
        "createdAt": "2020-09-22T05:23:08.793Z",
        "updatedAt": "2020-09-22T05:23:08.793Z"
    },
    {
        "id": 9,
        "name": "Longines DolceVita 20mm Gold and Steel",
        "gender": "Women",
        "category": "Dress Watch",
        "diameter": "20mm",
        "movement": "Quartz",
        "description": "The Longines DolceVita Collection watch features a 20mm rectangular case in stainless steel and 18k gold, sapphire crystal, bracelet and quartz movement.",
        "image": "https://www.prestigetime.com/preowned/images/watches/2020/07/101496/Longines_-L52555797_48351_01.jpg",
        "stock": 12,
        "price": 19500000,
        "createdAt": "2020-09-22T05:23:08.793Z",
        "updatedAt": "2020-09-22T05:23:08.793Z"
    },
    {
        "id": 1,
        "name": "Seiko SKX007",
        "gender": "Men",
        "category": "Dive Watch",
        "diameter": "43mm",
        "movement": "Automatic",
        "description": "Seiko Dive Watch with a 200m water resistance and ISO certified case. SKX007 is one of the most iconic and respected piece from the Seiko divers lineup",
        "image": "https://cdn.shopify.com/s/files/1/0022/9792/1591/files/SS221820B020_Seiko-SKX007-MT_1400x.jpg?v=1562911459",
        "stock": 8,
        "price": 3500000,
        "createdAt": "2020-09-22T05:23:08.793Z",
        "updatedAt": "2020-09-24T03:10:30.732Z"
    },
    {
        "id": 2,
        "name": "Seiko SKX009",
        "gender": "Men",
        "category": "Dive Watch",
        "diameter": "43mm",
        "movement": "Automatic",
        "description": "Seiko Dive Watch with a 200m water resistance and ISO certified case. SKX009 is one of the most iconic and respected piece from the Seiko divers lineup",
        "image": "https://cdn.shopify.com/s/files/1/0022/9792/1591/products/W_SS221820BPS106_Seiko-SKX009-MT_2000x.jpg?v=1576118066",
        "stock": 15,
        "price": 3500000,
        "createdAt": "2020-09-22T05:23:08.793Z",
        "updatedAt": "2020-09-24T03:26:59.339Z"
    },
    {
        "id": 10,
        "name": "ORIENT RA-KA0004L00B SUN AND MOON",
        "gender": "Women",
        "category": "Dress Watch",
        "diameter": "34mm",
        "movement": "Solar-powered",
        "description": "Blending classic design with modern essence, this new ORIENT 34.8mm classic quartz watch delivers several notable features showcasing superior watchmaking.",
        "image": "https://cdn2.jomashop.com/media/catalog/product/o/r/orient-sun-and-moon-blue-dial-ladies-watch-ra-ka0004l10b.jpg",
        "stock": 8,
        "price": 2800000,
        "createdAt": "2020-09-22T05:23:08.793Z",
        "updatedAt": "2020-09-24T03:10:30.735Z"
    },
    {
        "id": 7,
        "name": "Tissot Heritage 1948",
        "gender": "Men",
        "category": "Dress Watch",
        "diameter": "39mm",
        "movement": "Automatic",
        "description": "It's a vintage-inspired automatic chronograph measuring in under 40mm with a solid movement inside.",
        "image": "https://www.heuermart.com/wp-content/uploads/2017/11/Tissot-Heritage-1948-aBlogtoWatch-01.jpg",
        "stock": 20,
        "price": 17500000,
        "createdAt": "2020-09-22T05:23:08.793Z",
        "updatedAt": "2020-09-24T03:10:30.733Z"
    },
    {
        "id": 8,
        "name": "Seiko Solar SUP880",
        "gender": "Men",
        "category": "Dress Watch",
        "diameter": "32mm",
        "movement": "Automatic",
        "description": "The “Tanko” nickname comes from the obvious homage to the iconic Cartier Tank.",
        "image": "https://cf.shopee.com.my/file/828c13545f8855885c6d7eeef9b65553",
        "stock": 15,
        "price": 2100000,
        "createdAt": "2020-09-22T05:23:08.793Z",
        "updatedAt": "2020-09-24T03:10:30.734Z"
    },
    {
        "id": 4,
        "name": "Citizen BN0151-09L Promaster Professional Diver",
        "gender": "Men",
        "category": "Dive Watch",
        "diameter": "48mm",
        "movement": "Eco Drive Solar-powered",
        "description": "Round watch featuring unidirectional bezel and blue dial with date window at 4 o'clock and luminous hands/hour markers",
        "image": "https://i.pinimg.com/originals/78/cb/e7/78cbe7c8e18b232103acb595869b1da7.jpg",
        "stock": 12,
        "price": 3000000,
        "createdAt": "2020-09-22T05:23:08.793Z",
        "updatedAt": "2020-09-24T03:47:06.969Z"
    }
]
```

_Response (400 - Bad Request)_
```
{
  "message":"Invalid email or password"
}
```

_Response (401 - Unauthorized)_
```
{
  "message":"you don't have access for this features"
}
```
---

{
    "email": "user's email",
    "password": "user's password"
}


### POST /customers/addwl/:productId

> add product to wishlist where product's id = req.params.productId

_Request Header_
```
{
access_token: JWT generated token
}
```

_Request Body_
```
not needed
```

_Response (201 - Created)_
```
if wishlist already exists
{
    message: 'Removed from wishlist'
}
else 
{
    message: 'Successfully added to wishlist'
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```

_Response (401 - Unauthorized)_
```
{
  "message":"you don't have access for this features"
}
```
---


### POST /customers/addcart/:productId

> add product to cart where product's id = req.params.productId

_Request Header_
```
{
access_token: JWT generated token
}
```

_Request Body_
```
{
  quantity: posted quantity
}
```

_Response (201 - Created)_
```
if product already exists in cart
{
    "UserId": 5,
    "ProductId": 8,
    "quantity": 1,
    "status": "cart",
    "updatedAt": "2020-09-24T04:19:09.128Z",
    "createdAt": "2020-09-24T04:19:09.128Z"
}
else 
{
    "UserId": 5,
    "ProductId": 8,
    "quantity": 2,
    "status": "cart",
    "updatedAt": "2020-09-24T04:19:09.128Z",
    "createdAt": "2020-09-24T04:19:09.128Z"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```

_Response (401 - Unauthorized)_
```
{
  "message":"you don't have access for this features"
}
```
---


### GET /customers/cart

> get customer's cart

_Request Header_
```
{
access_token: JWT generated token
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
        "id": 19,
        "UserId": 5,
        "ProductId": 8,
        "quantity": 2,
        "Product": {
            "id": 8,
            "name": "Seiko Solar SUP880",
            "gender": "Men",
            "category": "Dress Watch",
            "diameter": "32mm",
            "movement": "Automatic",
            "description": "The “Tanko” nickname comes from the obvious homage to the iconic Cartier Tank.",
            "image": "https://cf.shopee.com.my/file/828c13545f8855885c6d7eeef9b65553",
            "stock": 15,
            "price": 2100000,
            "createdAt": "2020-09-22T05:23:08.793Z",
            "updatedAt": "2020-09-24T03:10:30.734Z"
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

_Response (401 - Unauthorized)_
```
{
  "message":"you don't have access for this features"
}
```
---


### GET /customers/wishlist

> get customer's wishlist

_Request Header_
```
{
access_token: JWT generated token
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
        "id": 19,
        "UserId": 5,
        "ProductId": 8,
        "Product": {
            "id": 8,
            "name": "Seiko Solar SUP880",
            "gender": "Men",
            "category": "Dress Watch",
            "diameter": "32mm",
            "movement": "Automatic",
            "description": "The “Tanko” nickname comes from the obvious homage to the iconic Cartier Tank.",
            "image": "https://cf.shopee.com.my/file/828c13545f8855885c6d7eeef9b65553",
            "stock": 15,
            "price": 2100000,
            "createdAt": "2020-09-22T05:23:08.793Z",
            "updatedAt": "2020-09-24T03:10:30.734Z"
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

_Response (401 - Unauthorized)_
```
{
  "message":"you don't have access for this features"
}
```
---


### PUT /customers/updatecart

> update customer's cart

_Request Header_
```
{
access_token: JWT generated token
}
```

_Request Body_
```
{
  "quantity": posted quantity
}
```

_Response (200 - OK)_
```
[
    1
]
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```

_Response (401 - Unauthorized)_
```
{
  "message":"you don't have access for this features"
}
```
---


### DELETE /customers/deletewl/:wlId

> delete customer's Wishlist where: {id: req.params.wlId}

_Request Header_
```
{
access_token: JWT generated token
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
  message: 'Wishlist successfully deleted
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```

_Response (401 - Unauthorized)_
```
{
  "message":"you don't have access for this features"
}
```
---


### DELETE /customers/deletecart/:cartId

> delete customer's cart where: {id: req.params.cartId}

_Request Header_
```
{
access_token: JWT generated token
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
  message: 'Cart item successfully deleted
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```

_Response (401 - Unauthorized)_
```
{
  "message":"you don't have access for this features"
}
```
---



### PUT /customers/checkout

> delete customer's Wishlist where: {id: req.params.wlId}

_Request Header_
```
{
access_token: JWT generated token
}
```

_Request Body_
```
{
  carts: [
    { id: 19, UserId: 5, ProductId: 8, quantity: 2, Product: [Object] }
  ],
  status: 'paid'
}
```

_Response (200 - OK)_
```
{
  message: 'Checkout Successful'
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```

_Response (401 - Unauthorized)_
```
{
  "message":"you don't have access for this features"
}
```
---