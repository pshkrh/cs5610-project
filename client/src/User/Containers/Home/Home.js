import React, { useEffect } from "react";
import { connect } from "react-redux";

import * as actions from "../../../Admin/redux-store/actions/gcactions";

import * as orderActions from "../../redux-store/Actions/orderAction";

import scrap from "../../../images/scrap.png";
import calander from "../../../images/calander.png";
import pickup from "../../../images/pickup.png";
import price from "../../../images/price.png";
import scrapitems from "../../../images/scrapitems.png";
import weight from "../../../images/weight.png";
import waterdrop from "../../../images/water-drop.png";
import tree from "../../../images/tree.png";
import energy from "../../../images/energy.png";
import oildrop from "../../../images/oil-drop.png";
import classes from "./Home.css";

const Home = (props) => {
  useEffect(() => {
    props.getdata();
    props.getorders();
    window.scrollTo(0, 0);
  }, []);

  const renderOrders = () => {
    if (!props.orders || props.orders.length === 0) {
      return <h3 className={classes.title}>You have not placed any orders</h3>;
    }

    return (
      <table className={classes.adjustOrders}>
        <thead>
          <tr>
            <th>Order Type</th>
            <th>Name</th>
            <th>Address</th>
            <th>Mobile Number</th>
            <th>Status</th>
            <th>Weight</th>
            <th>Pick up slot</th>
          </tr>
        </thead>
        <tbody>
          {props.orders.map((order, index) => (
            <tr key={index}>
              <td>
                {order.garbage[0].paper.length !== 0 ? (
                  <div className={classes.item}>
                    <span style={{ margin: "auto 5px", fontWeight: "bold" }}>
                      Paper :
                    </span>{" "}
                    {order.garbage[0].paper.map((paper) => (
                      <div className={classes.box}>{paper.name}</div>
                    ))}
                  </div>
                ) : null}
                {order.garbage[1].plastic.length !== 0 ? (
                  <div className={classes.item}>
                    <span style={{ margin: "auto 5px", fontWeight: "bold" }}>
                      Plastic :
                    </span>{" "}
                    {order.garbage[1].plastic.map((plastic) => (
                      <div className={classes.box}>{plastic.name}</div>
                    ))}
                  </div>
                ) : null}
                {order.garbage[2].metal.length !== 0 ? (
                  <div className={classes.item}>
                    <span style={{ margin: "auto 5px", fontWeight: "bold" }}>
                      Metal :
                    </span>{" "}
                    {order.garbage[2].metal.map((metal) => (
                      <div className={classes.box}>{metal.name}</div>
                    ))}
                  </div>
                ) : null}
                {order.garbage[3].ewaste.length !== 0 ? (
                  <div className={classes.item}>
                    <span style={{ margin: "auto 5px", fontWeight: "bold" }}>
                      E-Waste :
                    </span>{" "}
                    {order.garbage[3].ewaste.map((ewaste) => (
                      <div className={classes.box}>{ewaste.name}</div>
                    ))}
                  </div>
                ) : null}
                {order.garbage[4].other.length !== 0 ? (
                  <div className={classes.item}>
                    <span style={{ margin: "auto 5px", fontWeight: "bold" }}>
                      Other :
                    </span>{" "}
                    {order.garbage[4].other.map((other) => (
                      <div className={classes.box}>{other.name}</div>
                    ))}
                  </div>
                ) : null}
              </td>
              <td>
                <span>{order.name}</span>
              </td>
              <td>
                <span>{order.address}</span>
              </td>
              <td>
                <span>{order.mobile}</span>
              </td>
              <td>
                <span>{order.status}</span>
              </td>
              <td>
                <span>{order.weight}</span>
              </td>
              <td>
                <span>{order.pickupslot}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <div className={classes.container}>
        {/* 3 steps process*/}
        <div className={classes.process}>
          <div className={classes.title}>
            <h3>Sell Your waste in 3 easy Steps</h3>
          </div>
          <div className={classes.cards}>
            <div className={classes.card}>
              <img src={scrap} className={classes.img} alt="scarp" />
              <h5 className={classes.steps}>
                1.
                <br />
                Select waste item for selling
              </h5>
            </div>
            <div className={classes.card}>
              <img src={calander} className={classes.img} alt="calander" />
              <h5 className={classes.steps}>
                2.
                <br />
                Choose a date for waste pickup
              </h5>
            </div>
            <div className={classes.card}>
              <img src={pickup} className={classes.img} alt="pickup" />
              <h5 className={classes.steps}>
                3.
                <br />
                pickup boys will arrive at your home
              </h5>
            </div>
          </div>
        </div>
        {/* My Order Details */}
        <div>
          {/* <h2>Your Orders</h2> */}
          {renderOrders()}
        </div>

        {/*waste pickup details*/}
        <div className={classes.scrapdetails}>
          <div className={classes.scrap}>
            <h1 style={{ fontWeight: "bold" }}>{props.totalGarbageWeight}+</h1>
            <h4 style={{ fontWeight: "bold" }}>lb waste picked</h4>
          </div>
          <div className={classes.scrap}>
            <h1 style={{ fontWeight: "bold" }}>{props.totalUser}+</h1>
            <h4 style={{ fontWeight: "bold" }}>customer</h4>
          </div>
          <div className={classes.scrap}>
            <h1 style={{ fontWeight: "bold" }}>500+</h1>
            <h4 style={{ fontWeight: "bold" }}>monthly pickup</h4>
          </div>
        </div>
        {/* earn more by selling more*/}
        <div className={classes.details}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className={classes.info1}>
              <div className={classes.blocks}>
                <img
                  src={scrapitems}
                  className={classes.img1}
                  alt="scarpitems"
                />
                <br />
                <span>
                  <b>
                    we collect 40+
                    <br />
                    waste items
                    <br />
                  </b>
                  <small className={classes.small}>
                    WasteDeal collects 40+ waste items that can be recycled like
                    Paper, Plastic, Cartons, Metal, E-waste etc.
                  </small>
                </span>
              </div>
              <div className={classes.blocks}>
                <img src={weight} className={classes.img1} alt="weight" />
                <br />
                <span>
                  <b>
                    Electronic waste
                    <br />
                    weighing
                    <br />
                  </b>
                  <small className={classes.small}>
                    For accurate weight measurement we use Electronic Weighing
                    machine.
                  </small>
                </span>
              </div>
            </div>
            <div className={classes.info2}>
              <img src={price} className={classes.img1} alt="price" />
              <br />
              <span>
                <b>
                  High waste
                  <br />
                  prices
                  <br />
                </b>
                <small className={classes.small}>
                  We make sure to offer attractive prices for waste items by
                  accurately weighing the waste using Electronic weighing
                  machine. You can also avail different offers we provide
                  throughout the year.
                </small>
              </span>
            </div>
          </div>
          <div className={classes.info3}>
            <h1 style={{ fontWeight: "bold" }}>
              Earn more by
              <br /> Selling more
            </h1>
          </div>
        </div>
        {/*save our earth*/}
        <div className={classes.savemain}>
          <div className={classes.savetitle}>
            <h1 className={classes.heading}>
              2388 ton of waste collected,
              <br />
              saves our earth by
            </h1>
          </div>
          <div className={classes.savedetails}>
            <div className={classes.save}>
              <img src={waterdrop} alt="waterdrop" />
              <br />
              <h1 className={classes.number}>13.8</h1>
              <br />
              <small className={classes.unit}>crore litres water</small>
            </div>
            <div className={classes.save}>
              <img src={tree} alt="tree" />
              <br />
              <h1 className={classes.number}>10,243</h1>
              <br />
              <small className={classes.unit}>trees</small>
            </div>
            <div className={classes.save}>
              <img src={energy} alt="energy" />
              <br />
              <h1 className={classes.number}>565,536</h1>
              <br />
              <small className={classes.unit}>Kwh of energy</small>
            </div>
            <div className={classes.save}>
              <img src={oildrop} alt="oildrop" />
              <br />
              <h1 className={classes.number}>2.5</h1>
              <br />
              <small className={classes.unit}>lakh litres of oil</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    totalGarbageWeight: state.Admin.totalGarbageWeight,
    totalUser: state.Admin.totalUser,
    orders: state.Order.orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getdata: () => dispatch(actions.getdata()),
    getorders: () => dispatch(orderActions.getorders()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
