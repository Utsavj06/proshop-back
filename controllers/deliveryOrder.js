import DeliverAgent from "../models/deliveryAgent.js";

const deliveryDetail = async(req, res) => {
  const Orders = await DeliverAgent.find({});
  console.log(Orders)
  res.json({mess:'success'});
}

export {
  deliveryDetail
};
