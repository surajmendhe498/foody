const Restaurant= require('../models/Restaurant.model');

const addRestaurant= async(req, res)=>{
    try {
        const {name, cuisine, location}= req.body;

        if(req.user.role !== 'Admin'){
            return res.status(403).json({message: 'Access Denied. You are not authorized'});
        }

        if(!name || !cuisine || !location){
            return res.status(400).json({message: 'All fields are required'});
        }

        const newRestaurant= new Restaurant({
            name,
            cuisine,
            location
        });

        await newRestaurant.save();

        res.status(201).json({message: 'Restaurant added successfully', restaurant:newRestaurant});
        
    } catch (err) {
        return res.status(500).json({message: 'Internaal server error'});
    }
};

const fetchRestaurant= async(req, res)=>{
    try {
        const restaurants= await Restaurant.find();

        if(restaurants.length == 0){
            return res.status(404).json({message: 'Restaurants not found'});
        }

        res.status(200).json({message: 'Restaurant fetched successfully', restaurants:restaurants});
        
    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
}

module.exports= { addRestaurant, fetchRestaurant };