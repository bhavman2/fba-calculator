import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: '',
      length: '',
      width: '',
      height: '',
      weight: '',
      select: 0,
      battery: false,
      clothing: false,
      fulfillmentFee: 0,
      storageFee: 0,
      referralFee: 0,
      addedReferral: { status: false, amount: 0 }
    };

    this.fees = {
      'amazon': { percentage: 0.45, minimum: 0.30 },
      'books': { percentage: 0.15, minimum: 0 },
      'camera': { percentage: 0.08, minimum: 0.30 },
      'cellPhone': { percentage: 0.08, minimum: 0.30 },
      'consumer': { percentage: 0.08, minimum: 0.30 },
      'dvd': { percentage: 0.15, minimum: 0 },
      'mattress': { percentage: 0.15, minimum: 0 },
      'home': { percentage: 0.15, minimum: 0.30 },
      'kitchen': { percentage: 0.15, minimum: 0.30 },
      'music': { percentage: 0.15, minimum: 0.30 },
      'instrument': { percentage: 0.15, minimum: 0.30 },
      'office': { percentage: 0.15, minimum: 0.30 },
      'outdoors': { percentage: 0.15, minimum: 0.30 },
      'computers': { percentage: 0.06, minimum: 0.30 },
      'software': { percentage: 0.15, minimum: 0 },
      'sports': { percentage: 0.15, minimum: 0.30 },
      'tools': { percentage: 0.15, minimum: 0.30 },
      'toys': { percentage: 0.15, minimum: 0.30 },
      'unlocked': { percentage: 0.08, minimum: 0.30 },
      'consoles': { percentage: 0.08, minimum: 0 },
      'everythingElse': { percentage: 0.15, minimum: 0.30 }
    }
  }

  reset = () => {
    this.setState({
      price: '',
      length: '',
      width: '',
      height: '',
      weight: '',
      select: 0,
      battery: false,
      clothing: false,
      fulfillmentFee: 0,
      storageFee: 0,
      referralFee: 0,
      addedReferral: { status: false, amount: 0 }
    });
  }

  calculate = () => {

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

  calculateReferral = (type) => {
    if (type === 'baby') {
      let amount;
      if (this.state.price >= 10) {
        amount = this.state.price * 0.08;
      } else {
        amount = this.state.price * 0.15;
      }
      if (amount > 0.30) {
        this.setState({
          referralFee: this.state.referralFee + amount
        });
        this.setState({
          addedReferral: {
            status: true,
            amount: amount
          }
        });
      } else {
        this.setState({
          referralFee: this.state.referralFee + 0.30
        });
        this.setState({
          addedReferral: {
            status: true,
            amount: 0.30
          }
        });
      }
    } else if (type === 'electronicsAcc') {
      if (this.state.price <= 2) {
        this.setState({
          referralFee: this.state.referralFee + 0.30
        });
        this.setState({
          addedReferral: {
            status: true,
            amount: 0.30
          }
        });
      } else if (this.state.price <= 100) {
        this.setState({
          referralFee: this.state.referralFee + this.state.price * 0.15
        });
        this.setState({
          addedReferral: {
            status: true,
            amount: this.state.price * 0.15
          }
        });
      } else {
        this.setState({
          referralFee: this.state.referralFee + 15 + (this.state.price - 100) * 0.08
        });
        this.setState({
          addedReferral: {
            status: true,
            amount: 15 + (this.state.price - 100) * 0.08
          }
        });
      }
    } else if (type === 'furniture') {
      if (this.state.price <= 2) {
        this.setState({
          referralFee: this.state.referralFee + 0.30
        });
        this.setState({
          addedReferral: {
            status: true,
            amount: 0.30
          }
        });
      } else if (this.state.price <= 200) {
        this.setState({
          referralFee: this.state.referralFee + this.state.price * 0.15
        });
        this.setState({
          addedReferral: {
            status: true,
            amount: this.state.price * 0.15
          }
        });
      } else {
        this.setState({
          referralFee: this.state.referralFee + 30 + (this.state.price - 200) * 0.10
        });
        this.setState({
          addedReferral: {
            status: true,
            amount: 30 + (this.state.price - 200) * 0.10
          }
        });
      }
    } else if (type === 'appliances') {
      if (this.state.price <= 2) {
        this.setState({
          referralFee: this.state.referralFee + 0.30
        });
        this.setState({
          addedReferral: {
            status: true,
            amount: 0.30
          }
        });
      } else if (this.state.price <= 300) {
        this.setState({
          referralFee: this.state.referralFee + this.state.price * 0.15
        });
        this.setState({
          addedReferral: {
            status: true,
            amount: this.state.price * 0.15
          }
        });
      } else {
        this.setState({
          referralFee: this.state.referralFee + 45 + (this.state.price - 300) * 0.08
        });
        this.setState({
          addedReferral: {
            status: true,
            amount: 45 + (this.state.price - 300) * 0.08
          }
        });
      }
    } else {
      let percentage = this.state.price * this.fees[type].percentage;
      if (percentage > this.fees[type].minimum) {
        this.setState({
          referralFee: this.state.referralFee + percentage
        });
        this.setState({
          addedReferral: {
            status: true,
            amount: percentage
          }
        });
      } else {
        this.setState({
          referralFee: this.state.referralFee + this.fees[type].minimum
        });
        this.setState({
          addedReferral: {
            status: true,
            amount: this.fees[type].minimum
          }
        });
      }
    }
  }

  handleSelect = (e) => {
    let cat = e.target.value;
    this.setState({
      select: cat
    })
    if (this.state.addedReferral.status) {
      let feeDifference = this.state.referralFee - this.state.addedReferral.amount;
      this.setState({
        referralFee: feeDifference
      }, () => {
        this.calculateReferral(cat);
      });
    } else {
      this.calculateReferral(cat);
    }
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
            <input
              type="number"
              className="App-input"
              name="price"
              value={this.state.price}
              onChange={this.handleInput} />
          </div>

          <div className="App-entry">
            <p>Product Dimensions:</p>
            <input
              type="number"
              className="App-input"
              name="length"
              value={this.state.length}
              onChange={this.handleInput} />
            <p>L(in) x</p>
            <input
              className="App-input"
              name="width"
              value={this.state.width}
              onChange={this.handleInput} />
            <p>W(in) x</p>
            <input
              className="App-input"
              name="height"
              value={this.state.height}
              onChange={this.handleInput} />
            <p>H(in)</p>
          </div>

          <div className="App-entry">
            <p>Product Weight:</p>
            <input
              type="number"
              className="App-input"
              name="weight"
              value={this.state.weight}
              onChange={this.handleInput} />
            <p>lb</p>
          </div>


          <div className="App-entry">
            <p>Select Product Category:</p>
            <select className="App-select"
              value={this.state.select}
              onChange={this.handleSelect}>
              <option value="0">Select Category:</option>
              <option value="amazon">Amazon Device Accessories</option>
              <option value="baby">Baby Products</option>
              <option value="books">Books</option>
              <option value="camera">Camera and Photo</option>
              <option value="cellPhone">Cell Phone Devices</option>
              <option value="consumer">Consumer Electronics</option>
              <option value="dvd">DVD & Video</option>
              <option value="electronicsAcc">Electronic Accessories</option>
              <option value="furniture">Furniture and Decor</option>
              <option value="mattress">Mattress</option>
              <option value="home">Home and Garden</option>
              <option value="kitchen">Kitchen</option>
              <option value="appliances">Major Appliances</option>
              <option value="music">Music</option>
              <option value="instrument">Musical Instruments</option>
              <option value="office">Office Products</option>
              <option value="outdoors">Outdoors</option>
              <option value="computers">Personal Computers</option>
              <option value="software">Software & Computer/Video Games</option>
              <option value="sports">Sports</option>
              <option value="tools">Tools & Home Improvement</option>
              <option value="toys">Toys & Games</option>
              <option value="unlocked">Unlocked Cell Phones</option>
              <option value="consoles">Video Game Consoles</option>
              <option value="everythingElse">Everything Else</option>
            </select>
          </div>

          <div className="App-note">
            Contains Lithium Batteries:
            <input
              className="App-check"
              name="battery"
              type="checkbox"
              value={this.state.battery}
              onChange={this.handleCheckbox} />&nbsp;&nbsp;&nbsp;
        Clothing Item:
            <input
              className="App-check"
              name="clothing"
              type="checkbox"
              value={this.state.clothing}
              onChange={this.handleCheckbox} />
          </div>
          <div className='App-button-ctn'>
            <button
              className="App-button"
              onClick={this.calculate}
            >Calculate</button>
            <button
              className="App-button"
              onClick={this.reset}>Reset</button>
          </div>
          <div>
            <p>Total price: {this.state.price}</p>
            <p>Total l: {this.state.length}</p>
            <p>Total w: {this.state.width}</p>
            <p>Total h: {this.state.height}</p>
            <p>Total weight: {this.state.weight}</p>
            <p>Referral Added: {this.state.addedReferral.status}</p>
            <p>Referral Amount: {this.state.addedReferral.amount}</p>
            <p>Total Fulfillment Fee: {this.state.fulfillmentFee}</p>
          </div>
        </header>
      </div>
    );
  }
}


export default App;
