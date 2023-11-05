import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import * as actions from "../../redux-store/Actions/garbagecollactions";
import * as orderactions from "../../../User/redux-store/Actions/orderAction";

import classes from "./CompleteOrder.css";

const CompleteOrder = (props) => {
  const history = useHistory();

  const [showmodal, setshowmodal] = useState(false);
  const [showextramodal, setshowextramodal] = useState(false);
  const [state, sestate] = useState({});
  const [amount, setamount] = useState({});
  const [error, seterror] = useState("");
  const [paper, setpaper] = useState([]);
  const [plastic, setplastic] = useState([]);
  const [metal, setmetal] = useState([]);
  const [ewaste, setewaste] = useState([]);
  const [other, setother] = useState([]);
  const [totalWeight, settotalWeight] = useState(null);
  const [totalAmount, settotalAmount] = useState(null);
  const [garbage, setGarbage] = useState([]);
  const [extraGarbageList, setExtraGarbageList] = useState([]);
  const [deleteform, setdeleteform] = useState({
    deleteCategory: "",
    deleteGarbageName: "",
    subcatagoryNum: null,
    deleteGError: {},
  });

  useEffect(() => {
    async function fetchorder() {
      await props.getorderbyid(props.match.params.id);
      await props.getgarbage();
    }
    fetchorder();
  }, []);

  useEffect(() => {
    console.info(props.garbage);
    setGarbage(props.order.garbage);
    console.info(props.order);
  }, [props.order]);

  const onstatechange = (e, name, rate) => {
    e.preventDefault();
    const ans = parseFloat(parseFloat(e.target.value * rate).toFixed(2));
    const w = e.target.value;
    const weight = parseFloat(parseFloat(w).toFixed(2));
    sestate({ ...state, [name]: weight });
    setamount({ ...amount, [name]: ans });
  };

  let len = 0;
  for (let i = 0; i < garbage?.length; i++) {
    len += Object.values(garbage[i])[0]?.length;
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let paper = [];
    let plastic = [];
    let metal = [];
    let ewaste = [];
    let other = [];
    let error = "";
    let isValid = true;
    const val = Object.values(state).length;
    if (val !== len) {
      error = "Please fill Order Details";
      isValid = false;
    } else {
      const valarr = Object.values(state).some((val) => val === "");
      if (valarr) {
        isValid = false;
        error = "Please fill Order Details";
      }
    }
    if (isValid) {
      Object.values(garbage[0])[0].map((item) => {
        Object.keys(state).map((name) => {
          if (name === item.name) {
            if (item.quantityin === "lb") {
              const sc = {
                name: name,
                weight: state[name],
                amount: amount[name],
              };
              paper.push(sc);
            } else {
              const sc = {
                name: name,
                weight: parseFloat(
                  (parseInt(state[name]) * item.defaultWeight).toFixed(3)
                ),
                amount: amount[name],
              };
              paper.push(sc);
            }
          }
        });
      });
      Object.values(garbage[1])[0].map((item) => {
        Object.keys(state).map((name) => {
          if (name === item.name) {
            if (item.quantityin === "lb") {
              const sc = {
                name: name,
                weight: state[name],
                amount: amount[name],
              };
              plastic.push(sc);
            } else {
              const sc = {
                name: name,
                weight: parseFloat(
                  (parseInt(state[name]) * item.defaultWeight).toFixed(3)
                ),
                amount: amount[name],
              };
              plastic.push(sc);
            }
          }
        });
      });
      Object.values(garbage[2])[0].map((item) => {
        Object.keys(state).map((name) => {
          if (name === item.name) {
            if (item.quantityin === "lb") {
              const sc = {
                name: name,
                weight: state[name],
                amount: amount[name],
              };
              metal.push(sc);
            } else {
              const sc = {
                name: name,
                weight: parseFloat(
                  (parseInt(state[name]) * item.defaultWeight).toFixed(3)
                ),
                amount: amount[name],
              };
              metal.push(sc);
            }
          }
        });
      });
      Object.values(garbage[3])[0].map((item) => {
        Object.keys(state).map((name) => {
          if (name === item.name) {
            if (item.quantityin === "lb") {
              const sc = {
                name: name,
                weight: state[name],
                amount: amount[name],
              };
              ewaste.push(sc);
            } else {
              const sc = {
                name: name,
                weight: parseFloat(
                  (parseInt(state[name]) * item.defaultWeight).toFixed(3)
                ),
                amount: amount[name],
              };
              ewaste.push(sc);
            }
          }
        });
      });
      Object.values(garbage[4])[0].map((item) => {
        Object.keys(state).map((name) => {
          if (name === item.name) {
            if (item.quantityin === "lb") {
              const sc = {
                name: name,
                weight: state[name],
                amount: amount[name],
              };
              other.push(sc);
            } else {
              const sc = {
                name: name,
                weight: parseFloat(
                  (parseInt(state[name]) * item.defaultWeight).toFixed(3)
                ),
                amount: amount[name],
              };
              other.push(sc);
            }
          }
        });
      });
      let tpaperw = 0;
      let tpapera = 0;
      for (let i = 0; i < paper.length; i++) {
        tpaperw += paper[i].weight;
        tpapera += paper[i].amount;
      }
      const paperobj = {
        totalPaperWeight: tpaperw,
        totalPaperAmount: tpapera,
      };
      paper.push(paperobj);

      let tplasticw = 0;
      let tplastica = 0;
      for (let i = 0; i < plastic.length; i++) {
        tplasticw += plastic[i].weight;
        tplastica += plastic[i].amount;
      }
      const plasticobj = {
        totalPlasticWeight: tplasticw,
        totalPlasticAmount: tplastica,
      };
      plastic.push(plasticobj);

      let tmetalw = 0;
      let tmetala = 0;
      for (let i = 0; i < metal.length; i++) {
        tmetalw += metal[i].weight;
        tmetala += metal[i].amount;
      }
      const metalobj = {
        totalMetalWeight: tmetalw,
        totalMetalAmount: tmetala,
      };
      metal.push(metalobj);

      let tewastew = 0;
      let tewastea = 0;
      for (let i = 0; i < ewaste.length; i++) {
        tewastew += ewaste[i].weight;
        tewastea += ewaste[i].amount;
      }
      const ewasteobj = {
        totaleWasteWeight: tewastew,
        totaleWasteAmount: tewastea,
      };
      ewaste.push(ewasteobj);

      let totherw = 0;
      let tothera = 0;
      for (let i = 0; i < other.length; i++) {
        totherw += other[i].weight;
        tothera += other[i].amount;
      }
      const otherobj = {
        totalOtherWeight: totherw,
        totalOtherAmount: tothera,
      };
      other.push(otherobj);
      const totalWeight = parseFloat(
        (tpaperw + tplasticw + tmetalw + tewastew + totherw).toFixed(3)
      );
      const totalAmount = parseFloat(
        (tpapera + tplastica + tmetala + tewastea + tothera).toFixed(3)
      );
      if (totalWeight < 20) {
        error = "Order Weight Must Be Greater Or Equal 20.";
      } else {
        settotalWeight(totalWeight);
        settotalAmount(totalAmount);
        setpaper(paper);
        setplastic(plastic);
        setmetal(metal);
        setewaste(ewaste);
        setother(other);
        setshowmodal(true);
        seterror("");
      }
    }
    seterror(error);
  };

  const onsendmoney = async (e) => {
    e.preventDefault();
    const order = {
      orderId: props.order._id,
      city: props.order.city,
      garbage: {
        Paper: paper,
        Plastic: plastic,
        Metal: metal,
        Ewaste: ewaste,
        Other: other,
      },
      totalWeight,
      totalAmount,
    };
    await props.sendconfirmedorder(order);
    setshowmodal(false);
    history.push({ pathname: "/gc/dashboard" });
  };

  const ondeletestatechange = (e) => {
    let st = { ...deleteform, deleteCategory: e.target.value };
    if (e.target.value === "Paper") {
      st = {
        ...st,
        subcatagoryNum: 0,
      };
    }
    if (e.target.value === "Plastic") {
      st = {
        ...st,
        subcatagoryNum: 1,
      };
    }
    if (e.target.value === "Metal") {
      st = {
        ...st,
        subcatagoryNum: 2,
      };
    }
    if (e.target.value === "E-Waste") {
      st = {
        ...st,
        subcatagoryNum: 3,
      };
    }
    if (e.target.value === "Other") {
      st = {
        ...st,
        subcatagoryNum: 4,
      };
    }
    setdeleteform(st);
  };

  const addExtra = () => {
    setshowextramodal(true);
  };

  const addExtraGarbageHandler = () => {
    let g = [];
    props.order.garbage.map((item) =>
      Object.values(item)[0].map((i) => g.push(i.name))
    );
    let isExist = g.some((item) => item === deleteform.deleteGarbageName);
    if (!isExist) {
      let ga = props.garbage[deleteform.subcatagoryNum].subcatagory.find(
        (item) => (item.name === deleteform.deleteGarbageName)
      );
      delete ga._id;
      let a = [...garbage];
      let b = Object.values(a[deleteform.subcatagoryNum])[0].concat({...ga,quantityin:ga.quntityin});
      a[deleteform.subcatagoryNum]={[Object.keys(a[deleteform.subcatagoryNum])[0]]:b}
      console.info('aaaaaaaa',a)
      setGarbage(a)
      setshowextramodal(false)
      setdeleteform({
        deleteCategory: "",
        deleteGarbageName: "",
        subcatagoryNum: null,
        deleteGError: {},
      })
    }
  };

  let completeOrder = (
    <div className={classes.details}>
      <h3
        style={{ textAlign: "center", paddingTop: "10px", fontWeight: "bold" }}
      >
        Order Details
      </h3>
      <br />
      <span>
        <b>Name:</b> {props.order.name}
      </span>
      <br />
      <span>
        <b>Mobile No:</b> {props.order.mobile}
      </span>
      <br />
      <span>
        <b>Weight:</b> {props.order.weight}
      </span>
      <br />
      <span>
        <b>Address:</b> {props.order.address}
      </span>
      <br />
      <br />
      <br />
      <h3 style={{ fontWeight: "bold" }}>Fill Garbage Details</h3>
      <br />
      {garbage?.map((garbage) => {
        return (
          <div key={garbage}>
            {Object.values(garbage).map((items) => {
              return (
                <div key={items}>
                  {items.length !== 0 ? (
                    <div className={classes.container1}>
                      <h4>
                        &#8226;{" "}
                        {Object.keys(garbage)[0].charAt(0).toUpperCase() +
                          Object.keys(garbage)[0].slice(1)}
                      </h4>
                      {items.map((item) => {
                          console.info(item)
                        return (
                          <div className={classes.info} key={item.name}>
                            <span
                              style={{
                                marginTop: "-1px",
                                fontSize: "18px",
                                fontWeight: "500",
                              }}
                            >
                              {item.name}{" "}
                            </span>
                            <span
                              style={{
                                position: "absolute",
                                right: "780px",
                                marginTop: "0px",
                              }}
                            >
                              :
                            </span>
                            {item.quantityin === "lb" ? (
                              <input
                                type="number"
                                onChange={(e) =>
                                  onstatechange(e, item.name, item.rate)
                                }
                                value={state[item.name]}
                                placeholder="Enter Weight in lb"
                                style={{
                                  width: "170px",
                                  position: "absolute",
                                  borderRadius: "5px",
                                  right: "600px",
                                  marginTop: "-5px",
                                }}
                                required
                              />
                            ) : (
                              <input
                                type="number"
                                onChange={(e) =>
                                  onstatechange(e, item.name, item.rate)
                                }
                                value={state[item.name]}
                                placeholder="Enter Quantity"
                                style={{
                                  width: "170px",
                                  position: "absolute",
                                  borderRadius: "5px",
                                  right: "600px",
                                  marginTop: "-5px",
                                }}
                                required
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        );
      })}
      <span style={{ color: "red" }}>{error ? error : null}</span>
      <div>
        <button
          style={{
            width: "35%",
            margin: "auto",
            height: "40px",
            marginTop: "25px",
            textAlign: "center",
            alignItems: "center",
            background: "#94b8b8",
            color: "#000",
            display: "flex",
            justifyContent: "center",
          }}
          onClick={() => addExtra()}
        >
          Add extra garbage
        </button>
      </div>
      <div class={classes.clearfix}>
        <Link to="/gc/dashboard">
          <button type="button" class={classes.cancelbtn}>
            Cancel
          </button>
        </Link>
        <button
          type="submit"
          class={classes.signupbtn}
          onClick={(e) => onSubmitHandler(e)}
        >
          Continue
        </button>
      </div>
    </div>
  );

  let modal = (
    <div>
      {showmodal ? (
        <div
          className={classes.Backdrop}
          onClick={() => setshowmodal(false)}
        ></div>
      ) : null}
      <div
        className={classes.Modal}
        style={{
          transform: showmodal ? "translateY(0)" : "translateY(-100vh)",
          opacity: showmodal ? "1" : "0",
        }}
      >
        <div>
          <h5 style={{ textAlign: "center" }}>Order Summary</h5>
          <div className={classes.summary}>
            <h6>Garbage</h6>
            <h6>Quantity(lb/piece)</h6>
            <h6>Amount</h6>
          </div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "-35px",
              }}
            >
              {Object.keys(state)?.map((name) => {
                return (
                  <div key={name}>
                    <span>{name}</span>
                  </div>
                );
              })}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "-10px",
              }}
            >
              {Object.values(state)?.map((qut) => {
                return (
                  <div key={qut}>
                    <span>{qut}</span>
                  </div>
                );
              })}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "60px",
              }}
            >
              {Object.values(amount)?.map((amt) => {
                return (
                  <div key={amt}>
                    <span>&#x24; {amt}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <br />
          <h5 style={{ marginLeft: "25px" }}>
            Total Amount : &#x24; {totalAmount}
          </h5>
          <br />
          <div style={{ display: "flex" }}>
            <div
              style={{
                color: "red",
                cursor: "pointer",
                fontWeight: "bold",
                marginLeft: "170px",
              }}
              onClick={() => setshowmodal(false)}
            >
              Cancel
            </div>
            <div
              style={{
                color: "green",
                cursor: "pointer",
                fontWeight: "bold",
                marginLeft: "50px",
              }}
              onClick={(e) => onsendmoney(e)}
            >
              Send Money
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  let extramodal = (
    <div>
      {showextramodal ? (
        <div
          className={classes.Backdrop}
          onClick={() => setshowextramodal(false)}
        ></div>
      ) : null}
      <div
        className={classes.Modal}
        style={{
          transform: showextramodal ? "translateY(0)" : "translateY(-100vh)",
          opacity: showextramodal ? "1" : "0",
        }}
      >
        <div>
          <h5 style={{ textAlign: "center" }}>Select Extra Garbage</h5>

          <div className={classes.addform}>
            <label style={{ marginTop: "15px" }}>
              <b>Select Category of Garbage</b>
            </label>
            <span style={{ color: "red", marginLeft: "25px" }}>
              {deleteform.deleteGError?.cname
                ? deleteform.deleteGError.cname
                : null}
            </span>
            <select
              className={classes.catg}
              value={deleteform.deleteCategory}
              onChange={(e) => ondeletestatechange(e)}
            >
              <option value="sc">Select Category</option>
              <option value="Paper">Paper</option>
              <option value="Plastic">Plastic</option>
              <option value="Metal">Metal</option>
              <option value="E-Waste">E-waste</option>
              <option value="Other">Other</option>
            </select>
            <label style={{ marginTop: "15px" }}>
              <b>Select Garbage</b>
            </label>
            <span style={{ color: "red", marginLeft: "25px" }}>
              {deleteform.deleteGError?.scname
                ? deleteform.deleteGError.scname
                : null}
            </span>
            <select
              className={classes.catg}
              onChange={(e) =>
                setdeleteform({
                  ...deleteform,
                  deleteGarbageName: e.target.value,
                })
              }
            >
              <option value="sg">Select Garbage</option>
              {props.garbage[deleteform.subcatagoryNum]?.subcatagory.map(
                (sc) => {
                  return <option>{sc.name}</option>;
                }
              )}
            </select>

            <button onClick={() => addExtraGarbageHandler()}>ADD</button>
          </div>
        </div>
      </div>
    </div>
  );


  console.info(garbage)

  return (
    <div className={classes.container}>
      {completeOrder}
      {modal}
      {extramodal}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    order: state.GC.order,
    garbage: state.Order.garbage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getgarbage: () => dispatch(orderactions.getgarbage()),
    getorderbyid: (id) => dispatch(actions.getorderbyid(id)),
    sendconfirmedorder: (order) => dispatch(actions.sendconfirmedorder(order)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompleteOrder);
