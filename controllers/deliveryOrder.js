import Order from "../models/orderModel.js";

const deliveryDetail = async(req, res) => {
  const Orders = await Order.find({isDelivered: false});
  res.json({Orders});
}

const deliverySuccess = async(req, res) => {
  await Order.updateOne({_id: req.body.orderId},{isDelivered: true, isPaid: true});
  res.json({message:'done'});
}

export {
  deliveryDetail,
  deliverySuccess
};
