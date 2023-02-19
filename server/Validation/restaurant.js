import joi from "joi";

export const ValidateRestaurantCity = (resCity) =>{                   
    
    const Schema = joi.object({        
        city: joi.string().required()
    });
    
    return Schema.validateAsync(resCity);
    
};


export const ValidateRestaurantSearchString = (restaurantObj) =>{                   
    
    const Schema = joi.object({        
        searchString: joi.string().required()
    });
    
    return Schema.validateAsync(restaurantObj);
    
};