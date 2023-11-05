const Order = require("../models/ordermodel");
const ConfirmOrder = require("../models/confirmedOrder");

exports.sendorder = async (req, res) => {
  const order = new Order({
    userId: req.user._id,
    name: req.body.name,
    address: req.body.address,
    mobile: req.body.mobile,
    city: req.user.city,
    garbage: req.body.garbage,
    weight: req.body.weight,
    pickupslot: req.body.pickupslot,
    status: req.body.status,
  });

  await order.save().then((order) => {
    return res.status(201).send(order);
  });
};

exports.getorders = async (req, res) => {
  const userid = req.user._id;
  await Order.find({ userId: userid })
    .then((orders) => {
      return res.status(200).send(orders);
    })
    .catch((e) => {
      return res.status(400).send(e);
    });
};

exports.cancelorder = async (req, res) => {
  const orderid = req.body.id;
  await Order.findByIdAndDelete(orderid);

  return res.status(200).send("order canceled");
};

exports.updateorderaddress = async (req, res) => {
  const orderid = req.body.id;
  await Order.findById(orderid).then(async (order) => {
    order.address = req.body.address;
    await order.save().then((resp) => {
      return res.status(200).send("updated address");
    });
  });
};

exports.getconfirmorder = async (req, res) => {
  try {
    await ConfirmOrder.findOne({ orderId: req.query.id }).then(
      async (order) => {
        return res.status(200).send({ order, email: req.user.email });
      }
    );
  } catch (e) {
    return res.status(400).send(e);
  }
};

exports.getpickupslot = async (req, res) => {
  try {
    await Order.find({city:req.query.city}).then((orders) => {
      let slot = [];
      const d = new Date();
      const nd = new Date(d.getTime() + 24 * 60 * 60 * 1000);
      const nnd = new Date(nd.getTime() + 24 * 60 * 60 * 1000);
      let fms = `${nd.getDate()}/${
        nd.getMonth() + 1
      }/${nd.getFullYear()} 09 AM to 01 PM`;
      let fas = `${nd.getDate()}/${
        nd.getMonth() + 1
      }/${nd.getFullYear()} 02 PM to 06 PM`;
      let sms = `${nnd.getDate()}/${
        nnd.getMonth() + 1
      }/${nnd.getFullYear()} 09 AM to 01 PM`;
      let sas = `${nnd.getDate()}/${
        nnd.getMonth() + 1
      }/${nnd.getFullYear()} 02 PM to 06 PM`;

      let fmso = orders.filter((order) => order.pickupslot == fms);
      if (fmso.length <= 3) {
        slot.push(fms);
      }
      let faso = orders.filter((order) => order.pickupslot === fas);
      
      if (faso.length <= 3) {
        slot.push(fas);
      }
      let smso = orders.filter((order) => order.pickupslot === sms);
      if (smso.length <= 3) {
        slot.push(sms);
      }
      let saso = orders.filter((order) => order.pickupslot === sas);
      if (saso.length <= 3) {
        slot.push(sas);
      }
      if (slot.length === 0) {
        let a = new Date(nnd.getTime() + 24 * 60 * 60 * 1000);
        let b = new Date(a.getTime() + 24 * 60 * 60 * 1000);
        let ams = `${a.getDate()}/${
          a.getMonth() + 1
        }/${a.getFullYear()}  09 AM to 01 PM`;
        let aas = `${a.getDate()}/${
          a.getMonth() + 1
        }/${a.getFullYear()}  02 PM to 06 PM`;
        let bms = `${b.getDate()}/${
          b.getMonth() + 1
        }/${b.getFullYear()}  09 AM to 01 PM`;
        let bas = `${b.getDate()}/${
          b.getMonth() + 1
        }/${b.getFullYear()}  02 PM to 06 PM`;
        slot.push(ams);
        slot.push(aas);
        slot.push(bms);
        slot.push(bas);
      }
      if (slot.length === 1) {
        if (slot[0][0] == nd.getDate()) {
          if (slot[0].split(" ")[1] === "09") {
            let ams = `${nd.getDate()}/${
              nd.getMonth() + 1
            }/${nd.getFullYear()}  02 PM to 06 PM`;
            slot.push(ams);
            let bms = `${nnd.getDate()}/${
              nnd.getMonth() + 1
            }/${nnd.getFullYear()}  09 AM to 02 PM`;
            slot.push(bms);
            let cms = `${nnd.getDate()}/${
              nnd.getMonth() + 1
            }/${nnd.getFullYear()}  02 PM to 06 PM`;
            slot.push(cms);
          }
          if (slot[0].split(" ")[1] === "02") {
            let ams = `${nnd.getDate()}/${
              nnd.getMonth() + 1
            }/${nnd.getFullYear()}  09 AM to 02 PM`;
            slot.push(ams);
            let bms = `${nnd.getDate()}/${
              nnd.getMonth() + 1
            }/${nnd.getFullYear()}  02 PM to 06 PM`;
            slot.push(bms);
            let a = new Date(nnd.getTime() + 24 * 60 * 60 * 1000);
            let cms = `${a.getDate()}/${
              a.getMonth() + 1
            }/${a.getFullYear()}  09 AM to 02 PM`;
            slot.push(cms);
          }
        }
        if (slot[0][0] == nnd.getDate()) {
          if (slot[0].split(" ")[1] === "09") {
            let ams = `${nnd.getDate()}/${
              nnd.getMonth() + 1
            }/${nnd.getFullYear()}  02 PM to 06 PM`;
            slot.push(ams);
            let a = new Date(nnd.getTime() + 24 * 60 * 60 * 1000);
            let bms = `${a.getDate()}/${
              a.getMonth() + 1
            }/${a.getFullYear()}  09 AM to 02 PM`;
            slot.push(bms);
            let cms = `${a.getDate()}/${
              a.getMonth() + 1
            }/${a.getFullYear()}  02 PM to 06 PM`;
            slot.push(cms);
          }
          if (slot[0].split(" ")[1] === "02") {
            let a = new Date(nnd.getTime() + 24 * 60 * 60 * 1000);
            let ams = `${a.getDate()}/${
              a.getMonth() + 1
            }/${a.getFullYear()}  09 AM to 02 PM`;
            slot.push(ams);
            let bms = `${a.getDate()}/${
              a.getMonth() + 1
            }/${a.getFullYear()}  02 PM to 06 PM`;
            slot.push(bms);
            let b = new Date(b.getTime() + 24 * 60 * 60 * 1000);
            let cms = `${a.getDate()}/${
              a.getMonth() + 1
            }/${a.getFullYear()}  09 AM to 02 PM`;
            slot.push(cms);
          }
        }
      }

      if (slot.length === 2) {
        if (slot[1][0] == nd.getDate()) {
          if (slot[1].split(" ")[1] === "09") {
            let ams = `${nd.getDate()}/${
              nd.getMonth() + 1
            }/${nd.getFullYear()}  02 PM to 06 PM`;
            slot.push(ams);
            let bms = `${nnd.getDate()}/${
              nnd.getMonth() + 1
            }/${nnd.getFullYear()}  09 AM to 02 PM`;
            slot.push(bms);
          }
          if (slot[1].split(" ")[1] === "02") {
            let ams = `${nnd.getDate()}/${
              nnd.getMonth() + 1
            }/${nnd.getFullYear()}  09 AM to 02 PM`;
            slot.push(ams);
            let bms = `${nnd.getDate()}/${
              nnd.getMonth() + 1
            }/${nnd.getFullYear()}  02 PM to 06 PM`;
            slot.push(bms);
          }
        }
        if (slot[1][0] == nnd.getDate()) {
          if (slot[1].split(" ")[1] === "09") {
            let ams = `${nnd.getDate()}/${
              nnd.getMonth() + 1
            }/${nnd.getFullYear()}  02 PM to 06 PM`;
            slot.push(ams);
            let a = new Date(nnd.getTime() + 24 * 60 * 60 * 1000);
            let bms = `${a.getDate()}/${
              a.getMonth() + 1
            }/${a.getFullYear()}  09 AM to 02 PM`;
            slot.push(bms);
          }
          if (slot[1].split(" ")[1] === "02") {
            let a = new Date(nnd.getTime() + 24 * 60 * 60 * 1000);
            let ams = `${a.getDate()}/${
              a.getMonth() + 1
            }/${a.getFullYear()}  09 AM to 02 PM`;
            slot.push(ams);
            let bms = `${a.getDate()}/${
              a.getMonth() + 1
            }/${a.getFullYear()}  02 PM to 06 PM`;
            slot.push(bms);
          }
        }
      }
      if (slot.length === 3) {
        if (slot[2][0] == nd.getDate()) {
          if (slot[2].split(" ")[1] === "09") {
            let ams = `${nd.getDate()}/${
              nd.getMonth() + 1
            }/${nd.getFullYear()}  02 PM to 06 PM`;
            slot.push(ams);
          }
          if (slot[2].split(" ")[1] === "02") {
            let ams = `${nnd.getDate()}/${
              nnd.getMonth() + 1
            }/${nnd.getFullYear()}  09 AM to 02 PM`;
            slot.push(ams);
          }
        }
        if (slot[2][0] == nnd.getDate()) {
          if (slot[2].split(" ")[1] === "09") {
            let ams = `${nnd.getDate()}/${
              nnd.getMonth() + 1
            }/${nnd.getFullYear()}  02 PM to 06 PM`;
            slot.push(ams);
          }
          if (slot[2].split(" ")[1] === "02") {
            let a = new Date(nnd.getTime() + 24 * 60 * 60 * 1000);
            let ams = `${a.getDate()}/${
              a.getMonth() + 1
            }/${a.getFullYear()}  09 AM to 02 PM`;
            slot.push(ams);
          }
        }
      }
      return res.status(200).send(slot)
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};
