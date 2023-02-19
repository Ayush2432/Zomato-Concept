import joi from "joi";

export const ValidateRestaurantId = (resId) =>{                   //as in the food API we r searching food  on the basis of restaurant id and  other API is base don category  
    
    const Schema = joi.object({        
        _id: joi.string().required()
    });
    
    return Schema.validateAsync(resId);
    
};


export const ValidateCategory= (category) =>{                   
    
    const Schema = joi.object({        
        category: joi.string().required()
    });
    
    return Schema.validateAsync(category);
    
};