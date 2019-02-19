import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: undefined,
      length: undefined,
      width: undefined,
      height: undefined,
      weight: undefined,
      battery: false,
      clothing: false,
      fulfillmentFee: 0,
      storageFee: 0,
      referralFee: 0
    };
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleCheckbox = (e) => {
    let type = e.target.name;
    let cost = {
      battery: 0.11,
      clothing: 0.40
    }
    this.setState({
      [type]: !this.state[type]
    }, () => {
      if (this.state[type]) {
        this.setState({
          fulfillmentFee: this.state.fulfillmentFee + cost[type]
        });
      } else {
        this.setState({
          fulfillmentFee: this.state.fulfillmentFee - cost[type]
        });
      }
    });


  }

  render() {
    return (
      <div className="App">
        <header className="App-calc">
          <h2>
            Amazon Seller Fee Calculator
          </h2>

          <div className="App-entry">
            <p>Target Product Selling Price: $</p>
            <input type="number" className="App-input" name="price" onChange={this.handleInput}></input>
          </div>

          <div className="App-entry">
            <p>Product Dimensions:</p>
            <input type="number" className="App-input" name="length" onChange={this.handleInput}></input><p>L(in) x</p><input className="App-input" name="width" onChange={this.handleInput}></input><p>W(in) x</p><input className="App-input" name="height" onChange={this.handleInput}></input><p>H(in)</p>
          </div>

          <div className="App-entry">
            <p>Product Weight:</p>
            <input type="number" className="App-input" name="weight" onChange={this.handleInput}></input><p>lb</p>
          </div>


          <div className="App-entry">
            <p>Select Product Category:</p>
            <select className="App-select">
              <option value="0">Select Category:</option>
              <option value="1">Amazon Device Accessories</option>
              <option value="2">Baby Products</option>
              <option value="3">Books</option>
              <option value="4">Camera and Photo</option>
              <option value="5">Cell Phone Devices</option>
              <option value="6">Consumer Electronics</option>
              <option value="7">DVD & Video</option>
              <option value="8">Electronic Accessories</option>
              <option value="9">Furniture and Decor</option>
              <option value="10">Home and Garden</option>
              <option value="11">Music</option>
              <option value="12">Musical Instruments</option>
              <option value="13">Office Products</option>
              <option value="14">Outdoors</option>
              <option value="15">Personal Computers</option>
              <option value="16">Software & Computer/Video Games</option>
              <option value="17">Sports</option>
              <option value="18">Tools & Home Improvement</option>
              <option value="19">Toys & Games</option>
              <option value="20">Unlocked Cell Phones</option>
              <option value="21">Video & DVD</option>
              <option value="22">Video Game Consoles</option>
              <option value="23">Everything Else</option>
            </select>
          </div>

          <div className="App-entry">
            <p>Contains Lithium Batteries: </p>
            <input className="App-check" name="battery" type="checkbox" onChange={this.handleCheckbox} />
          </div>

          <div className="App-entry">
            <p>Clothing Item: </p>
            <input className="App-check" name="clothing" type="checkbox" onChange={this.handleCheckbox} />
          </div>

          <div>
            <p>Total price: {this.state.price}</p>
            <p>Total l: {this.state.length}</p>
            <p>Total w: {this.state.width}</p>
            <p>Total h: {this.state.height}</p>
            <p>Total weight: {this.state.weight}</p>
            <p>Total bat: {this.state.battery ? 'true' : 'false'}</p>
            <p>Total clothing: {this.state.clothing ? 'true' : 'false'}</p>
            <p>Total Fulfillment Fee: {this.state.fulfillmentFee}</p>
          </div>

        </header>
      </div>
    );
  }
}

export default App;
