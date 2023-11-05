import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import * as action from '../../redux-store/Actions/orderAction'

import classes from './addDetails.css'
const d = new Date()
const nd = new Date(d.getTime() + (24 * 60 * 60 * 1000))
const nnd = new Date(nd.getTime() + (24 * 60 * 60 * 1000))
class AddDetail extends Component {
    state = {
        name: this.props.name,
        mobile: this.props.mobile,
        garbage: this.props.garbage,
        address: "",
        weight: "",
        pickupslot: "",
        error: {}
    }

    componentDidMount=async()=> {
        window.scrollTo(0, 0);        
        await this.props.getPickUpSlot(this.props.user.city)
        console.info(this.props.pickupslot)
    }

    

    validate = () => {
        let error = {}
        let isvalid = true
        let name = this.state.name
        let mobile = this.state.mobile
        let address = this.state.address
        let weight = this.state.weight
        let pickupslot = this.state.pickupslot
        if (name === "") {
            error.name = "Name must be required"
            isvalid = false
        }
        if (mobile === "" || mobile.toString().length < 10 || mobile.toString().length > 10) {
            error.mobile = "Mobile number must be 10 digit long"
            isvalid = false
        }
        if (address === "" || address.length < 30) {
            error.address = "Enter valid address"
            isvalid = false
        }
        if (weight === "select weight" || weight === "") {
            error.weight = "Please select aprox weight of garbage"
            isvalid = false
        }
        if (pickupslot === "select pickup slot" || pickupslot === "") {
            error.pickupslot = "please select pickup slot"
            isvalid = false
        }

        this.setState({ error })
        return isvalid


    }
    onsubmit = async () => {
        const isvalid = this.validate()
        if (isvalid) {
            const order = {
                name: this.state.name,
                mobile: this.state.mobile,
                garbage: this.state.garbage,
                address: this.state.address,
                weight: this.state.weight,
                pickupslot: this.state.pickupslot,
            }

            await this.props.sendorder(order)
            this.setState({ error: {} })
            this.props.history.push('/')
        }
    }

    render() {
        console.info(this.props.pickupslot)
        return (
            <div className={classes.main}>
                <h3 className={classes.title}>Add Your Details</h3>
                <div className={classes.container}>
                    <label><b>Name</b></label><span style={{ color: "red", marginLeft: "20px" }}>{this.state.error.name ? this.state.error.name : null}</span>
                    <input type="text" placeholder="Enter First name" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} required />

                    <label><b>Mobile Number</b></label><span style={{ color: "red", marginLeft: "20px" }}>{this.state.error.mobile ? this.state.error.mobile : null}</span>
                    <input type="number" placeholder="Enter Mobile number" value={this.state.mobile} onChange={(e) => this.setState({ mobile: e.target.value })} required />

                    <label><b>Address</b></label><span style={{ color: "red", marginLeft: "20px" }}>{this.state.error.address ? this.state.error.address : null}</span>
                    <textarea placeholder="Enter Address" value={this.state.address} onChange={(e) => this.setState({ address: e.target.value })} required />

                    <label><b>Approx Weight of Garbage</b></label><span style={{ color: "red", marginLeft: "20px" }}>{this.state.error.weight ? this.state.error.weight : null}</span>
                    <select className={classes.weight} value={this.state.weight} onChange={(e) => this.setState({ weight: e.target.value })} >
                        <option value="select weight">select Weight</option>
                        <option value="20lb to 50lb">20lb to 50lb</option>
                        <option value="50lb to 100lb">50lb to 100lb</option>
                        <option value="100lb to 200lb">100lb to 200lb</option>
                        <option value="200lb to 500lb">200lb to 500lb</option>
                        <option value="500lb Up">500 lb Up</option>
                    </select>

                    <label><b>Pickup Slot</b></label><span style={{ color: "red", marginLeft: "20px" }}>{this.state.error.pickupslot ? this.state.error.pickupslot : null}</span>
                    <select className={classes.weight} value={this.state.pickupslot} onChange={(e) => this.setState({ pickupslot: e.target.value })}>
                        <option>select pickup slot</option>
                        {this.props?.pickupslot.map(slot=>(
                            <>
                            <option>{slot}</option>
                            </>
                        ))}
                    </select>

                    <Link to="/"><button className={classes.btncancel}>Cancel</button></Link>
                    <button className={classes.btnsuccess} onClick={(e) => this.onsubmit(e)}>Submit</button>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        user: state.User.user,
        pickupslot:state.Order.pickUpSlot
    }
}

const mapdispatchtoprops = (dispatch) => {
    return {
        sendorder: (order) => dispatch(action.sendorder(order)),
        getPickUpSlot:(city)=>dispatch(action.getPickUpSlot(city))
    }
}


export default withRouter(connect(mapStateToProps, mapdispatchtoprops)(AddDetail))