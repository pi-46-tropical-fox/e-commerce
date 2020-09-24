# Ecommerce CMS & Customer App Server
Ecommerce APP adalah Single Page Application (SPA) yang memiliki 2 site yaitu 'Admin Site' dan 'Customer Site'. Applikasi ini bertujuan untuk membantu 'admin' exommerce untuk mengatur database product dan banner yang akan ditampilkan pada aplikasi ecommerce customer site. Aplikasi ini memudahkan admin untuk menambahlan, mengubah dan mengedit data yang diperlukan. Sedangkan Customer dapat merasakan experience belanja online melalui customer site.

Aplikasi ini memiliki konfigurasi dan fitur sebagai berikut : 
* Aplikasi 'Admin Site' dapat diakses pada url https://ecommerce-cms-72024.web.app sedangkan 'Customer Site dapat diakses pada url https://ecommerce-customer-9d7da.web.app
* Kedua client site tersebut terintegrasi menggunakan server yang sama
* Aplikasi ini dideploy menggunakan "heroku" untuk server dan "firebase" untuk client
* RESTful endpoint dengan operasi CRUD
* Format respon berupa JSON.
* User memiliki dua tipe role yaitu 'Admin' dan 'Customer'
* Registrasi Admin dilakukan melalui seeding server oleh developer. Untuk admin yang telah didaftarkan adalah, email:'admin@mail.com' password:'123456'
* Sedangkan user customer dapat registrasi melalui website
* Authorized user (admin) dapat menambahkan, mengedit dan menghapus product dan banner
* Terdapat testing dengan metode TDD untuk memastikan lancarnya sistem kerja aplikasi ini
* Terdapat fitur Show Products, Show Banners, Cart, Wishlist, dan History dimana customer dapat menambahkan produk yang mereka mau
* Fitur Show Banners: Banner akan muncul ketika status banner diubah menjadi 'active' pada admin site
* Fitur Show Products: Products akan muncul ketika stock lebih dari 0 (nol)
* Fitur Cart: Fitur ini terdedikasikan untuk masing-masin customer. customer dapat menambahkan dari list products di laman Home, list cart dapat ditambahkan selama stock masih ada. Ketika customer 'Checkout' maka list cart akan terhapus dipindahkan ke data 'Transaction History' dan stock product akan terupdate. Customer dapat menghapus data di cart
* Fitur History: merekam seluruh transaction history setiap user setelah melakukan checkout pada cart
* Fitur Wishlist: menambahkan produk tertentu ke dalam wishlist yang terdedikasikan untuk masing-masing customer. Customer dapat menambahkan dan menghapus wishlist mereka masing-masing.


Constraint Aplikasi:
* User harus registrasi (admin:seeder, customer: via app) dan login terlebih dahulu agar dapat mengakses aplikasi
* Hanya authorized user (admin) yang dapat mengedit dan menghapus products / banners
* Customer tidak dapat mengakses 'Admin Site'
* Pada 'Customer Site' customer dapat melihat products dan banners, namun harus login terlebih dahulu untuk mengakses fitur cart, wishlist, dan history
* Customer hanya dapat mengakses dan mengedit data mereka sendiri berdasarkan UserId


&nbsp;

## Depedencies
* axios
* vue
* vue-router
* vuex
* core-js
* bootstrap
* bcryptjs
* cors
* dotenv
* express
* jsonwebtoken
* pg
* sequelize

## Endpoints
* POST /register
* POST /login
* POST /products
* GET /products
* GET /products/:id
* PUT /products/:id
* DELETE /products/:id
* POST /banners
* GET /banners
* GET /banners/:id
* PUT /banners/:id
* DELETE /banners/:id
* POST /carts/:productId
* GET /carts
* GET /carts/products
* DELETE /carts/:id
* POST /wishlists/:productId
* GET /wishlists
* DELETE /wishlists/:id


## RESTful endpoints
### POST /register

> Create new user with role customer
  - email and password harus diisi
  - email harus unik
  - email harus menggunakan format email
  - password min 6 characters
  - 'role' akan secara otomatis terisi 'customer'
  - password akan di "hash" menggunakan bcrypjtjs sebelum disimpan dalam database

_Request Header_
```
no need
```

_Request Body_
```json
{
    "email": "amanda@mail.com",
    "password": "123456"
}
```

_Response (201 - Created)_
```json
{
    "email": "amanda@mail.com",
    "message": "Has been successfully registered!"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid required users data"
}
```


### POST /login

> Login to app
  - hash password dari database akan divalidasi pada proses ini


_Request Header_
```
no need
```

_Request Body_
```json
{
  "email": "amanda@mail.com",
  "password": "123456"
}
```

_Response (200 - Ok)_
```json
{
    "access_token": "<access_token>",
    "role": "admin",
    "message": "Success to login!"
}
```

_Response (400 - Bad request)_
```json
{
  "message": "Email or/and password is invalid"
}
```


### POST /products

> Create a new product
  - data name, Image Url, price, stock dan kategori harus diisi
  - user admin harus login terlebih dahulu untuk mengakses laman ini (authentication)
  - hanya user dengan role 'admin' yang dapat mengakses laman ini (authorization)
  - stock dan price harus diinput dengan angka dan lebih besar dari 0 (nol)

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
    "name": "Product A",
    "image_url": "http://...",
    "price": 10000,
    "stock": 10,
    "category": "fashion"
}
```

_Response (201 - Created)_
```json
{
    "id": 1,
    "name": "Product A",
    "image_url": "http://...",
    "price": 10000,
    "stock": 10,
    "category": "fashion",
    "updatedAt": "4 September 2020",
    "createdAt": "4 September 2020"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "name/image/price/stock/category harus diisi"
}
```

_Response (401 - Not Athenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (500 - Internal server error)_
```json
{
  "message": "Internal server error"
}
```


### GET /products

> Get product list
  - User admin harus login untuk mengakses laman ini

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
none
```

_Response (200 - Ok)_
```json
[
  {
    "id": 1,
    "name": "Product A",
    "image_url": "http://...",
    "price": 10000,
    "stock": 10,
    "category": "fashion",
    "updatedAt": "4 September 2020",
    "createdAt": "4 September 2020"
  },
  {
    "id": 2,
    "name": "Product B",
    "image_url": "http://...",
    "price": 10000,
    "stock": 10,
    "category": "fashion",
    "updatedAt": "4 September 2020",
    "createdAt": "4 September 2020"
  }
]
```

_Response (401 - Not Athenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (500 - Internal server error)_
```json
{
  "message": "Internal server error"
}
```


### GET /products/:id

> Get a certain product
  - User harus login untuk mengakses laman ini
  - Hanya authorized user (damin) yang dapat mengakses laman ini

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
no need
```

_Request Params_
```
product id
```

_Response (200 - Ok)_
```json
{
    "id": 1,
    "name": "Product A",
    "image_url": "http://...",
    "price": 10000,
    "stock": 10,
    "category": "fashion",
    "updatedAt": "4 September 2020",
    "createdAt": "4 September 2020"
}
```

_Response (401 - Not Athenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (402 - Not Athorized)_
```json
{
  "message": "User not authorized"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Product data is not found!"
}
```


### PUT /products/:id

> Update a spesific product
  - User harus login terlebih dahulu untuk mengakses laman ini
  - Hanya authorized user (admin) yang dapat mengakses laman ini

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params
```
task id
```

_Request Body_
```json
{
    "name": "Product A",
    "image_url": "http://...",
    "price": 10000,
    "stock": 10,
    "category": "fashion",
}
```

_Response (200 - Ok)_
```json
{
    "id": 1,
    "name": "Product A",
    "image_url": "http://...",
    "price": 10000,
    "stock": 10,
    "category": "fashion",
    "updatedAt": "4 September 2020",
    "createdAt": "4 September 2020"
}
```

_Response (401 - Not Athenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (402 - Not Athorized)_
```json
{
  "message": "User not authorized"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Product data is not found!"
}
```

_Response (500 - Internal server error)_
```json
{
  "message": "Internal server error"
}
```


### Delete /products/:id

> Delete a selected product
  - User harus login untuk mengakses laman ini
  - Hanya authorized user (damin) yang dapat menghapus product.


_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params
```
product id
```

_Request Body_
```
ne need
```

_Response (200 - Ok)_
```json
{
  "message": "Product is successfully deleted!"
}
```

_Response (401 - Not Athenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (402 - Not Athorized)_
```json
{
  "message": "User not authorized"
}

_Response (404 - Not Found)_
```json
{
  "message": "Product data is not found!"
}
```


_Response (500 - Internal server error)_
```json
{
  "message": "Internal server error"
}
```



### POST /banners

> Create a new banner
  - data title, category, dan status harus diisi
  - user admin harus login terlebih dahulu untuk mengakses laman ini (authentication)
  - hanya user dengan role 'admin' yang dapat mengakses laman ini (authorization)

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
    "title": "http://....",
    "status": "inactive",
    "category": "fashion"
}
```

_Response (201 - Created)_
```json
{
    "id": 1,
    "title": "http://....",
    "status": "inactive",
    "category": "fashion",
    "updatedAt": "4 September 2020",
    "createdAt": "4 September 2020"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "title/status/category harus diisi"
}
```

_Response (401 - Not Athenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (500 - Internal server error)_
```json
{
  "message": "Internal server error"
}
```


### GET /banners

> Get banner list
  - user harus login untuk mengakses laman ini
  - hanya user dengan role 'admin' yang dapat mengakses laman ini (authorization)

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
none
```

_Response (200 - Ok)_
```json
[
  {
    "id": 1,
    "title": "http://....",
    "status": "inactive",
    "category": "fashion",
    "updatedAt": "4 September 2020",
    "createdAt": "4 September 2020"
  },
  {
    "id": 2,
    "title": "http://....",
    "status": "inactive",
    "category": "automotive",
    "updatedAt": "4 September 2020",
    "createdAt": "4 September 2020"
  }
]
```

_Response (401 - Not Athenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (500 - Internal server error)_
```json
{
  "message": "Internal server error"
}
```


### GET /banners/:id

> Get a certain banner
  - User harus login untuk mengakses laman ini
  - Hanya authorized user (damin) yang dapat mengakses laman ini

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
no need
```

_Request Params_
```
banner id
```

_Response (200 - Ok)_
```json
{
    "id": 1,
    "title": "http://....",
    "status": "inactive",
    "category": "fashion",
    "updatedAt": "4 September 2020",
    "createdAt": "4 September 2020"
}
```

_Response (401 - Not Athenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (402 - Not Athorized)_
```json
{
  "message": "User not authorized"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Banner data is not found!"
}
```


### PUT /banners/:id

> Update a spesific banner
  - User harus login terlebih dahulu untuk mengakses laman ini
  - Hanya authorized user (admin) yang dapat mengakses laman ini

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params
```
banner id
```

_Request Body_
```json
{
    "title": "http://....",
    "status": "inactive",
    "category": "fashion"
  }
```

_Response (200 - Ok)_
```json
{
    "id": 1,
    "title": "http://....",
    "status": "inactive",
    "category": "fashion",
    "updatedAt": "4 September 2020",
    "createdAt": "4 September 2020"
  }
```

_Response (401 - Not Athenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (402 - Not Athorized)_
```json
{
  "message": "User not authorized"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Banner data is not found!"
}
```

_Response (500 - Internal server error)_
```json
{
  "message": "Internal server error"
}
```


### Delete /banners/:id

> Delete a selected banner
  - User harus login untuk mengakses laman ini
  - Hanya authorized user (damin) yang dapat menghapus product.


_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params
```
banner id
```

_Request Body_
```
ne need
```

_Response (200 - Ok)_
```json
{
  "message": "Banner is successfully deleted!"
}
```

_Response (401 - Not Athenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (402 - Not Athorized)_
```json
{
  "message": "User not authorized"
}

_Response (404 - Not Found)_
```json
{
  "message": "Banner data is not found!"
}
```

_Response (500 - Internal server error)_
```json
{
  "message": "Internal server error"
}
```


### POST /carts/:productId

> Create a new cart
  - menambahkan data product ke cart
  - user admin harus login terlebih dahulu untuk mengakses laman ini (authentication)
  - stock harus lebih dari 0 (nol) agar dapat ditambahkan ke dalam cartlist

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
none
```

_Response (201 - Created)_
```json
{
    "id": 1,
    "name": "Product A",
    "image_url": "http://...",
    "price": 10000,
    "stock": 10,
    "category": "fashion",
    "updatedAt": "4 September 2020",
    "createdAt": "4 September 2020"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Limited Stock!"
}
```

_Response (401 - Not Athenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (500 - Internal server error)_
```json
{
  "message": "Internal server error"
}
```

### GET /carts

> Get cart list
  - User harus login untuk mengakses laman ini
  - Hanya menampilkan cart list milik user tertentu berdasarkan UserIdnya

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
none
```

_Response (200 - Ok)_
```json
[
  {
    "id": 1,
    "name": "Product A",
    "image_url": "http://...",
    "price": 10000,
    "stock": 10,
    "category": "fashion",
    "updatedAt": "4 September 2020",
    "createdAt": "4 September 2020"
  },
  {
    "id": 2,
    "name": "Product B",
    "image_url": "http://...",
    "price": 10000,
    "stock": 10,
    "category": "fashion",
    "updatedAt": "4 September 2020",
    "createdAt": "4 September 2020"
  }
]
```

_Response (401 - Not Athenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (500 - Internal server error)_
```json
{
  "message": "Internal server error"
}
```


### GET /carts/products

> Checkout feature
  - user harus login untuk mengakses laman ini
  - merupakan action ketika customer melakukan checkout
  - status product di cart akan berubah menjadi 'inactive' dan dipassing ke data 'transaction history'
  - data stock products akan terupdate

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
none
```

_Response (200 - Ok)_
```json
{
  "message": "Checkout success!"
}
```

_Response (401 - Not Athenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (500 - Internal server error)_
```json
{
  "message": "Internal server error"
}
```

### PUT /carts/:id

> Update cart quantity feature
  - user harus login untuk mengakses laman ini
  - merupakan action ketika customer ingin mengupdate quantity product yang akan dibeli
  - quantity yang diupdate tidak bisa lebih dari stock product yang tersedia
  - data quantity cart akan terupdate

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
cart id
```

_Response (200 - Ok)_
```json
{
  "message": "Quantity updated successfully!"
}
```

_Response (401 - Not Athenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (500 - Internal server error)_
```json
{
  "message": "Internal server error"
}
```


### Delete /carts/:id

> Delete a selected cart
  - User harus login untuk mengakses laman ini
  - Hanya authorized customer (customer pemilik cart) yang dapat menghapus product.


_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params
```
cart id
```

_Request Body_
```
ne need
```

_Response (200 - Ok)_
```json
{
  "message": "Cart is successfully deleted!"
}
```

_Response (401 - Not Athenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (402 - Not Athorized)_
```json
{
  "message": "User not authorized"
}

_Response (404 - Not Found)_
```json
{
  "message": "Cart data is not found!"
}
```


_Response (500 - Internal server error)_
```json
{
  "message": "Internal server error"
}
```


### POST /wishlists/:productId

> Create a new wishlist
  - menambahkan data product ke wishlist
  - user harus login terlebih dahulu untuk mengakses laman ini (authentication)


_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
none
```

_Response (201 - Created)_
```json
{
    "id": 1,
    "name": "Product A",
    "image_url": "http://...",
    "price": 10000,
    "stock": 10,
    "category": "fashion",
    "updatedAt": "4 September 2020",
    "createdAt": "4 September 2020"
}
```

_Response (401 - Not Athenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (500 - Internal server error)_
```json
{
  "message": "Internal server error"
}
```


### GET /wishlists

> Get  wishlist
  - User harus login untuk mengakses laman ini
  - Hanya menampilkan  wishlist milik user tertentu berdasarkan UserIdnya

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
none
```

_Response (200 - Ok)_
```json
[
  {
    "id": 1,
    "name": "Product A",
    "image_url": "http://...",
    "price": 10000,
    "stock": 10,
    "category": "fashion",
    "updatedAt": "4 September 2020",
    "createdAt": "4 September 2020"
  },
  {
    "id": 2,
    "name": "Product B",
    "image_url": "http://...",
    "price": 10000,
    "stock": 10,
    "category": "fashion",
    "updatedAt": "4 September 2020",
    "createdAt": "4 September 2020"
  }
]
```

_Response (401 - Not Athenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (500 - Internal server error)_
```json
{
  "message": "Internal server error"
}
```



### Delete /wishlists/:id

> Delete a selected wishlist
  - User harus login untuk mengakses laman ini
  - Hanya authorized customer (customer pemilik wishlist) yang dapat menghapus product


_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params
```
wishlsit id
```

_Request Body_
```
ne need
```

_Response (200 - Ok)_
```json
{
  "message": "Wishlist is successfully deleted!"
}
```

_Response (401 - Not Athenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (402 - Not Athorized)_
```json
{
  "message": "User not authorized"
}

_Response (404 - Not Found)_
```json
{
  "message": "Wishlist data is not found!"
}
```


_Response (500 - Internal server error)_
```json
{
  "message": "Internal server error"
}
```


