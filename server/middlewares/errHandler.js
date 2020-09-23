const errHandler = (err, req, res, next) => {
    let statusCode
    let errors = []
    if(err.name === 'SequelizeValidationError'){
        statusCode = 400
        for(const el of err.errors){
            errors.push(el.message)
        }
    }else if(err.name === 'SequelizeUniqueConstraintError'){
        statusCode = 400
        errors.push('Email already exists, please use another email')
    }else if(err.name === 'InvalidEmailPassword'){
        statusCode = 400
        errors.push('Email or Password is incorrect')
    }else if(err.name === 'QtyIsLimit'){
        statusCode = 400
        errors.push('This product has reached the limit in your cart')
    }else if(err.name === 'EmptyCart'){
        statusCode = 400
        errors.push('Your cart is empty, nothing to paid')
    }else if(err.name === 'ExistingProduct'){
        statusCode = 400
        errors.push('This product already in your wishlist')
    }else if(err.name === 'OutOfStockProduct'){
        statusCode = 400
        errors.push(err.message)
    }else if(err.name === 'OutOfStock'){
        statusCode = 400
        errors.push('Sorry, this product is out of stock')
    }else if(err.name === 'InvalidProfile'){
        statusCode = 400
        errors.push('Address and Phone is required')
    }else if(err.name === 'NotAuthenticated'){
        statusCode = 401
        errors.push(`User not authenticated`)
    }else if(err.name === 'JsonWebTokenError'){
        statusCode = 401
        errors.push(`User not authenticated`)
    }else if(err.name === 'ForbidenAccess'){
        statusCode = 403
        errors.push(`Forbidden access`)
    }else{
        statusCode = 500
        errors.push(err)
    }
    res.status(statusCode).json({ errors });
}
module.exports = errHandler