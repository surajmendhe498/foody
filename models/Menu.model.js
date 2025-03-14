const mongoose= require('mongoose');

const menuItemSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    restaurant: {
        type: mongoose.Schema.ObjectId, ref: 'Restaurant',
        required: true
    }
})


module.exports= mongoose.model('MenuItem', menuItemSchema);
