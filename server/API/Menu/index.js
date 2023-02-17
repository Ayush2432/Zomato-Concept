import  express  from "express";
import { MenuModel,ImageModel} from "../../database/allModels";


const Router = express.Router();



// 1-->API for all menu based on a particular restaurant

/* Design of the API or the wire frame of the API

Route         /list
Description   Get  the menu of the  particular restaurant
params        _id(of the restaurant)
Access        Public 
Method         GET REquest
*/


Router.get("/list/:_id",async(req,res) => {
    try{
        const {_id} = req.params;
        const  menus = await MenuModel.findOne(_id);    //findOne because any restaurant will have only one menu              

    return res.json({menus});

    }
    catch(error){

        return res.status(500).json({error: error.message});

    }
});



// 2-->API for all menu images on a particular restaurant

/* Design of the API or the wire frame of the API

Route         /image
Description   Get all the  images of the  particular menu based on id
params        _id(of the restaurant)
Access        Public 
Method         GET REquest
*/


Router.get("/image/:_id",async(req,res) => {
    try{
        const {_id} = req.params;
        const  menus= await ImageModel.findOne(_id);    //findOne because any restaurant will have only one menu              

    return res.json({menus});

    }
    catch(error){

        return res.status(500).json({error: error.message});

    }
});





export default Router;
