const mongoose= require('mongoose');

const restaurantSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cuisine: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    menu: [{
        type: mongoose.Schema.ObjectId, ref: 'MenuItem',
    }]
});


module.exports= mongoose.model('Restaurant', restaurantSchema);