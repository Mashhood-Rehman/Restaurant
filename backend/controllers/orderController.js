const orderModel = require("../models/orderModel")
const userModel = require("../models/user")

const placeOrder =  async (req, res) => {
try {
    const newOrder = new orderModel({
        userId: req.body.userId,
        items:req.body.items,
        amount:req.body.amount,
         address:req.body.address
    })
    await newOrder.save()
    
} catch (error) {
    console.log(error)
    res.json({success:false , message:("error" , error)})
}
}
module.exports = {placeOrder}