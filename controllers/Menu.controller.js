const Menu= require('../models/Menu.model');
const Restaurant= require('../models/Restaurant.model');

const addMenu= async(req, res)=>{
    try {
        const {name, price, restaurantId}= req.body;

        if(req.user.role != 'Admin'){
            return res.status(403).json({message: 'Access denied. You are not authorized'});
        }

        if(!name || !price || !restaurantId){
            return res.status(404).json({message: 'All fields are required'});
        }

        const restaurant= await Restaurant.findById(restaurantId);
        if(!restaurant){
            return res.status(404).json({message: 'Restaurant not found'});
        }

        const menuItem= new Menu({
            name,
            price,
            restaurant: restaurantId
        });

        await menuItem.save();

        restaurant.menu.push(menuItem._id);  // Add the menu item to the restaurant's menu list
        await restaurant.save();

        res.status(201).json({message: 'Menu item added successfully', menuItem: menuItem});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Internal server error'});
    }
};

const getMenu= async(req, res)=>{
    try {
        const restaurant= await Restaurant.findById(req.params.id).populate('menu');

        if(!restaurant){
            return res.status(404).json({message: 'Restaurant not found'});
        }

        res.status(200).json({message: 'Menu fetched successfully', restaurant});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Internal server error'});
    }
}


module.exports= { addMenu, getMenu};