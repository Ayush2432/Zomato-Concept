/* we will be importing all the models here and exporting  so whenever
we require any models in any particular file we will import this allmodel file so that 
no models are missed by chance

so instead of importing models one by one in other files we will import this whole bunch of models ek saaath
so that we destructure the required model anytime wee need in any file

*/

import {FoodModel} from "./food";
import {ImageModel} from "./image";
import {MenuModel} from "./menu";
import {OrderModel} from "./order";
import {RestaurantModel} from "./restaurant";
import {ReviewModel} from "./review";
import {UserModel} from "./user";


export{
    FoodModel,
    ImageModel,
    MenuModel,
    OrderModel,
    RestaurantModel,
    ReviewModel,
    UserModel
};

