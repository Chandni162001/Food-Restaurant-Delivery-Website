const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    orderItems: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
        name:{
            type:String
        },
        quantity: {
            type: Number, 
            default: 1
        },
        itemPrice: {
            type:Number,
        }
    }],

    orderTotal: {
        type:Number
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'shipped', 'delivered','cancelled'],
        default: 'pending'
    },
    address: {
        type: String,
    },
    paymentInfo: {
        paymentMethod: {
            type: String,
            enum: ['credit card', 'debit card', 'paypal', 'cash on delivery'],
        },
        transactionId: {
            type: String
        },
    },
    shippingInfo: {
        shippingCost: {
            type: Number,
        },
        expectedDeliveryDate: {
            type: Date
        },
        trackingInfo: {
            type: String
        },
    },
    orderTime: {
        type: Date,
        default: Date.now
    },

    deliveryTime:{
         type: Date,
        default: Date.now
    }
    
});

module.exports = mongoose.model('Order', orderSchema);