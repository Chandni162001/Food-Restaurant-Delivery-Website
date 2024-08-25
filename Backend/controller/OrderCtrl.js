const OrderModel = require("../model/OrderModel")


const addOrder = async(req,res)=>{
    try {
        const userId = req.user.userId; 
        const { orderItems, orderTotal, status, address, paymentInfo, shippingInfo,deliveryTime } = req.body;

        const newOrder = new OrderModel({
            userId,
            orderItems,
            orderTotal,
            status,
            address,
            paymentInfo,
            shippingInfo,
            deliveryTime
        });

        const savedOrder = await newOrder.save();

        res.status(201).json(savedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


const viewOrders = async(req,res)=>{
    try{
        const userId = req.user.userId; 
        const allOrders=await OrderModel.find({userId})
        res.status(200).json(allOrders);
    } catch (err) {
      res.status(500).json({ error: 'Failed to show all orders', err });
    }
}


const getAllOrders= async (req, res) => {
    try {
      const orders = await OrderModel.find({})
      res.json(orders);
    } catch (err) {
      res.status(500).send('Failed to show orders');
    }
  };

const cancelOrder =async (req,res)=>{
    try{
        const order = await OrderModel.findByIdAndUpdate(req.params.id, {status: 'cancelled'}, {new:true})
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json({ message: 'Order is cancelled successfully', order });
    }
    catch (err){
        res.json({ error: 'Failed to cancel order', err });
    }
    }


module.exports={addOrder, viewOrders,getAllOrders,cancelOrder}