# E-Commerce CMS Server

This E-Commerce CMS server has:

- RESTful API endpoint for products (CRUD Operation)
- RESTful API endpoint for categories (CRUD Operation)
- RESTful API endpoint for carts (CRUD Operation)
- JSON formatted request & response

## RESTful API endpoints overview

- POST /register
- POST /login
- POST /products
- GET /products
- GET /products/:id
- PUT /products/:id
- DELETE /products/:id
- GET /categories
- GET /categories/:id
- POST /carts/:productId
- GET /carts
- GET /carts/:id
- PUT /carts/:id
- DELETE /carts/:id

## RESTful API endpoints detail

### POST /register

> Register a new user

_Request Body_

```json
{
	"email": "<user email>",
	"password": "<user password>"
}
```

_Response (201 - Created)_

```json
{
	"id": "<user id>",
	"email": "<user email>",
	"role": "<user role (default: customer)>",
	"access_token": "<access_token>"
}
```

_Response (400 - Bad request)_

```json
{
	"errors": [
		{
			"name": "is_null",
			"message": "Email cannot null"
		},
		{
			"name": "is_null",
			"message": "Username cannot null"
		},
		{
			"name": "is_null",
			"message": "Password cannot null"
		},
		{
			"name": "minLength",
			"message": "Password must be minimal 6 characters"
		},
		{
			"name": "isEmail",
			"message": "Email format is invalid"
		},
		{
			"name": "is",
			"message": "Username can only contain alphanumeric character and special . _"
		},
		{
			"name": "notEmpty",
			"message": "Email cannot empty"
		},
		{
			"name": "notEmpty",
			"message": "Username cannot empty"
		},
		{
			"name": "notEmpty",
			"message": "Password cannot empty"
		},
		{
			"name": "not_unique",
			"message": "Email already registered"
		}
		{
			"name": "not_unique",
			"message": "Username already registered"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
}
```

### POST /login

> Login to app

_Request Body_

```json
{
	"email": "<user email>",
	"password": "<user password>"
}
```

_Response (200 - OK)_

```json
{
	"id": "<user id>",
	"email": "<user email>",
	"access_token": "<access_token>"
}
```

_Response (400 - Bad request)_

```json
{
	"errors": [
		{
			"name": "invalidLogin",
			"message": "Invalid email or password!"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
}
```

### POST /products

> Create a new product

_Request Headers_

```json
{
	"access_token": "<access token>"
}
```

_Request Body_

```json
{
	"name": "<product name>",
	"image_url": "<product image url>",
	"price": "<product price>",
	"stock": "<product stock>",
	"slug": "<product slug>",
	"CategoryId": "<product category id>"
}
```

_Response (201 - Created)_

```json
{
	"id": "<product id>",
	"name": "<product name>",
	"image_url": "<product image url>",
	"price": "<product price>",
	"stock": "<product stock>",
	"slug": "<product slug>",
	"CategoryId": "<product category id>"
}
```

_Response (400 - Bad request)_

```json
{
	"errors": [
		{
			"name": "is_null",
			"message": "Name cannot null"
		},
		{
			"name": "notEmpty",
			"message": "Name cannot empty"
		},
		{
			"name": "is_null",
			"message": "Image url cannot null"
		},
		{
			"name": "notEmpty",
			"message": "Image url cannot empty"
		},
		{
			"name": "is_null",
			"message": "Slug cannot null"
		},
		{
			"name": "notEmpty",
			"message": "Slug cannot empty"
		},
		{
			"name": "is_null",
			"message": "Price cannot null"
		},
		{
			"name": "notEmpty",
			"message": "Price cannot empty"
		},
		{
			"name": "is_null",
			"message": "Stock cannot null"
		},
		{
			"name": "notEmpty",
			"message": "Stock cannot empty"
		},
		{
			"name": "is_null",
			"message": "Category id cannot null"
		},
		{
			"name": "notEmpty",
			"message": "Category id cannot empty"
		},
		{
			"name": "isInt",
			"message": "Price must be positive numbers with no leading zeroes"
		},
		{
			"name": "isInt",
			"message": "Stock must be positive numbers with no leading zeroes"
		}
	]
}
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthenticated",
			"message": "User not authenticated"
		}
	]
}
```

_Response (403 - Forbidden)_

```json
{
	"errors": [
		{
			"name": "notAuthorizedUser",
			"message": "User not authorized perform this action"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
}
```

### GET /products

> Get all products

_Request Body_

```
not needed
```

_Response (200 - OK)_

```json
[
	{
		"id": "<product id>",
		"name": "<product name>",
		"image_url": "<product image url>",
		"price": "<product price>",
		"stock": "<product stock>",
		"slug": "<product slug>",
		"CategoryId": "<product category id>",
		"Category": {}
	}
]
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthenticated",
			"message": "User not authenticated"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
}
```

### GET /products/:id

> Get products by id

_Request Body_

```
not needed
```

_Response (200 - OK)_

```json
{
	"id": "<product id>",
	"name": "<product name>",
	"image_url": "<product image url>",
	"price": "<product price>",
	"stock": "<product stock>",
	"slug": "<product slug>",
	"CategoryId": "<product category id>",
	"Category": {}
}
```

_Response (404 - Not Found)_

```json
{
	"errors": [
		{
			"name": "notFoundProduct",
			"message": "Error product not found"
		}
	]
}
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthenticated",
			"message": "User not authenticated"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
}
```

### PUT /products/:id

> Update a product

_Request Headers_

```json
{
	"access_token": "<access token>"
}
```

_Request Body_

```json
{
	"name": "<product name>",
	"image_url": "<product image url>",
	"price": "<product price>",
	"stock": "<product stock>",
	"slug": "<product slug>",
	"CategoryId": "<product category id>"
}
```

_Response (200 - OK)_

```json
{
	"id": "<product id>",
	"name": "<product name>",
	"image_url": "<product image url>",
	"price": "<product price>",
	"stock": "<product stock>",
	"slug": "<product slug>",
	"CategoryId": "<product category id>"
}
```

_Response (404 - Not Found)_

```json
{
	"errors": [
		{
			"name": "notFoundProduct",
			"message": "Error product not found"
		}
	]
}
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthenticated",
			"message": "User not authenticated"
		}
	]
}
```

_Response (403 - Forbidden)_

```json
{
	"errors": [
		{
			"name": "notAuthorizedUser",
			"message": "User not authorized perform this action"
		}
	]
}
```

_Response (400 - Bad request)_

```json
{
	"errors": [
		{
			"name": "is_null",
			"message": "Name cannot null"
		},
		{
			"name": "notEmpty",
			"message": "Name cannot empty"
		},
		{
			"name": "is_null",
			"message": "Image url cannot null"
		},
		{
			"name": "notEmpty",
			"message": "Image url cannot empty"
		},
		{
			"name": "is_null",
			"message": "Slug cannot null"
		},
		{
			"name": "notEmpty",
			"message": "Slug cannot empty"
		},
		{
			"name": "is_null",
			"message": "Price cannot null"
		},
		{
			"name": "notEmpty",
			"message": "Price cannot empty"
		},
		{
			"name": "is_null",
			"message": "Stock cannot null"
		},
		{
			"name": "notEmpty",
			"message": "Stock cannot empty"
		},
		{
			"name": "isInt",
			"message": "Price must be positive numbers with no leading zeroes"
		},
		{
			"name": "isInt",
			"message": "Stock must be positive numbers with no leading zeroes"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
}
```

### DELETE /products/:id

> Delete a product

_Request Headers_

```json
{
	"access_token": "<access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```json
{
	"id": "<product id>",
	"name": "<product name>",
	"image_url": "<product image url>",
	"price": "<product price>",
	"stock": "<product stock>",
	"slug": "<product slug>",
	"CategoryId": "<product category id>"
}
```

_Response (404 - Not Found)_

```json
{
	"errors": [
		{
			"name": "notFoundProduct",
			"message": "Error product not found"
		}
	]
}
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthenticated",
			"message": "User not authenticated"
		}
	]
}
```

_Response (403 - Forbidden)_

```json
{
	"errors": [
		{
			"name": "notAuthorizedUser",
			"message": "User not authorized perform this action"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
}
```

### GET /categories

> Get all categories

_Request Body_

```
not needed
```

_Response (200 - OK)_

```json
[
	{
		"id": "<category id>",
		"name": "<category name>",
		"slug": "<category slug>"
	}
]
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthenticated",
			"message": "User not authenticated"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
}
```

### GET /categories/:id

> Get category by id

_Request Body_

```
not needed
```

_Response (200 - OK)_

```json
{
	"id": "<category id>",
	"name": "<category name>",
	"slug": "<category slug>"
}
```

_Response (404 - Not Found)_

```json
{
	"errors": [
		{
			"name": "notFoundCategory",
			"message": "Error category not found"
		}
	]
}
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthenticated",
			"message": "User not authenticated"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
}
```

### POST /carts/:productId

> Create a new cart

_Request Headers_

```json
{
	"access_token": "<access token>"
}
```

_Request Body_

```json
{
	"UserId": "<cart user id>",
	"ProductId": "<cart product id>",
	"quantity": "<cart quantity>"
}
```

_Response (201 - Created)_

```json
{
	"id": "<cart id>",
	"UserId": "<cart user id>",
	"ProductId": "<cart product id>",
	"quantity": "<cart quantity>"
}
```

_Response (400 - Bad request)_

```json
{
	"errors": [
		{
			"name": "is_null",
			"message": "User id cannot null"
		},
		{
			"name": "notEmpty",
			"message": "User id cannot empty"
		},
		{
			"name": "is_null",
			"message": "Product id url cannot null"
		},
		{
			"name": "notEmpty",
			"message": "Product id url cannot empty"
		},
		{
			"name": "is_null",
			"message": "quantity cannot null"
		},
		{
			"name": "notEmpty",
			"message": "quantity cannot empty"
		},
		{
			"name": "isInt",
			"message": "Quantity must be positive numbers with no leading zeroes"
		},
		{
			"name": "isOverTheStock",
			"message": "Product's quantity in cart cannot exceed the product's stock"
		}
	]
}
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthenticated",
			"message": "User not authenticated"
		}
	]
}
```

_Response (403 - Forbidden)_

```json
{
	"errors": [
		{
			"name": "notAuthorizedUser",
			"message": "User not authorized perform this action"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
}
```

### GET /carts

> Get all carts

_Request Headers_

```json
{
	"access_token": "<access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```json
[
	{
		"id": "<cart id>",
		"UserId": "<cart user id>",
		"ProductId": "<cart product id>",
		"quantity": "<cart quantity>",
		"Product": {}
	}
]
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthenticated",
			"message": "User not authenticated"
		}
	]
}
```

_Response (403 - Forbidden)_

```json
{
	"errors": [
		{
			"name": "notAuthorizedUser",
			"message": "User not authorized perform this action"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
}
```

### GET /carts/:id

> Get cart by id

_Request Headers_

```json
{
	"access_token": "<access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```json
{
	"id": "<cart id>",
	"UserId": "<cart user id>",
	"ProductId": "<cart product id>",
	"quantity": "<cart quantity>",
	"Product": {}
}
```

_Response (404 - Not Found)_

```json
{
	"errors": [
		{
			"name": "notFoundCart",
			"message": "Error cart not found"
		}
	]
}
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthenticated",
			"message": "User not authenticated"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
}
```

### PUT /carts/:id

> Update a cart

_Request Headers_

```json
{
	"access_token": "<access token>"
}
```

_Request Body_

```json
{
	"quantity": "<cart quantity>"
}
```

_Response (200 - OK)_

```json
{
	"id": "<cart id>",
	"UserId": "<cart user id>",
	"ProductId": "<cart product id>",
	"quantity": "<cart quantity>"
}
```

_Response (404 - Not Found)_

```json
{
	"errors": [
		{
			"name": "notFoundCart",
			"message": "Error cart not found"
		}
	]
}
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthenticated",
			"message": "User not authenticated"
		}
	]
}
```

_Response (403 - Forbidden)_

```json
{
	"errors": [
		{
			"name": "notAuthorizedUser",
			"message": "User not authorized perform this action"
		}
	]
}
```

_Response (400 - Bad request)_

```json
{
	"errors": [
		{
			"name": "is_null",
			"message": "quantity cannot null"
		},
		{
			"name": "notEmpty",
			"message": "quantity cannot empty"
		},
		{
			"name": "isInt",
			"message": "Quantity must be positive numbers with no leading zeroes"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
}
```

### DELETE /carts/:id

> Delete a cart

_Request Headers_

```json
{
	"access_token": "<access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```json
{
	"message": "success delete cart"
}
```

_Response (404 - Not Found)_

```json
{
	"errors": [
		{
			"name": "notFoundCart",
			"message": "Error cart not found"
		}
	]
}
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthenticated",
			"message": "User not authenticated"
		}
	]
}
```

_Response (403 - Forbidden)_

```json
{
	"errors": [
		{
			"name": "notAuthorizedUser",
			"message": "User not authorized perform this action"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
}
```
