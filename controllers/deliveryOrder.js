import Order from "../models/orderModel.js";

const deliveryDetail = async(req, res) => {
  const Orders = await Order.find({});
  res.json({Orders});
}

export {
  deliveryDetail
};
