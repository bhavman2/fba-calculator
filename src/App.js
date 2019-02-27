import React, { Component } from 'react';
import { Textbox, Checkbox, Select } from 'react-inputs-validation';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
import './App.css';

var numeral = require('numeral');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: '',
      cost: '',
      length: '',
      width: '',
      height: '',
      weight: '',
      weightType: '',
      boxWeight: 0,
      totalWeight: 0,
      fbaSizeTier: '',
      select: '',
      battery: false,
      clothing: false,
      fulfillmentFee: 0,
      storageFeeJanSept: 0,
      storageFeeOctDec: 0,
      referralFee: 0,
      addedReferral: { status: false, amount: 0 },
      validate: false,
      showFees: false,
      calculated: false,
      totalFeesJanSept: 0,
      totalProfitJanSept: 0,
      totalFeesOctDec: 0,
      totalProfitOctDec: 0,
      profitMarginJanSept: 0,
      profitMarginOctDec: 0
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
      cost: '',
      length: '',
      width: '',
      height: '',
      weight: '',
      boxWeight: 0,
      totalWeight: 0,
      fbaSizeTier: '',
      select: '',
      battery: false,
      clothing: false,
      fulfillmentFee: 0,
      storageFeeJanSept: 0,
      storageFeeOctDec: 0,
      referralFee: 0,
      addedReferral: { status: false, amount: 0 },
      validate: false,
      showFees: false,
      calculated: false,
      totalFeesJanSept: 0,
      totalProfitJanSept: 0,
      totalFeesOctDec: 0,
      totalProfitOctDec: 0,
      profitMarginJanSept: 0,
      profitMarginOctDec: 0
    });
  }

  calculateTotal = () => {
    if (this.state.clothing) {
      this.setState({
        fulfillmentFee: this.state.fulfillmentFee + 0.40
      }, () => {
        this.setState({
          totalFeesJanSept: this.state.referralFee + this.state.fulfillmentFee + this.state.storageFeeJanSept,
          totalProfitJanSept: this.state.price - this.state.referralFee - this.state.fulfillmentFee - this.state.storageFeeJanSept - this.state.cost,
          totalFeesOctDec: this.state.referralFee + this.state.fulfillmentFee + this.state.storageFeeOctDec,
          totalProfitOctDec: this.state.price - this.state.referralFee - this.state.fulfillmentFee - this.state.storageFeeOctDec - this.state.cost,
        }, () => {
          this.setState({
            profitMarginJanSept: ((this.state.price - this.state.totalFeesJanSept - this.state.cost) * 100 / this.state.price).toFixed(2),
            profitMarginOctDec: ((this.state.price - this.state.totalFeesOctDec - this.state.cost) * 100 / this.state.price).toFixed(2),
          }, () => {
            this.setState({
              showFees: true
            });
          });
        });
      });
    } else if (this.state.battery) {
      this.setState({
        fulfillmentFee: this.state.fulfillmentFee + 0.11
      }, () => {
        this.setState({
          totalFeesJanSept: this.state.referralFee + this.state.fulfillmentFee + this.state.storageFeeJanSept,
          totalProfitJanSept: this.state.price - this.state.referralFee - this.state.fulfillmentFee - this.state.storageFeeJanSept - this.state.cost,
          totalFeesOctDec: this.state.referralFee + this.state.fulfillmentFee + this.state.storageFeeOctDec,
          totalProfitOctDec: this.state.price - this.state.referralFee - this.state.fulfillmentFee - this.state.storageFeeOctDec - this.state.cost,
        }, () => {
          this.setState({
            profitMarginJanSept: ((this.state.price - this.state.totalFeesJanSept - this.state.cost) * 100 / this.state.price).toFixed(2),
            profitMarginOctDec: ((this.state.price - this.state.totalFeesOctDec - this.state.cost) * 100 / this.state.price).toFixed(2),
          }, () => {
            this.setState({
              showFees: true
            });
          });
        });
      });
    } else {
      this.setState({
        totalFeesJanSept: this.state.referralFee + this.state.fulfillmentFee + this.state.storageFeeJanSept,
        totalProfitJanSept: this.state.price - this.state.referralFee - this.state.fulfillmentFee - this.state.storageFeeJanSept - this.state.cost,
        totalFeesOctDec: this.state.referralFee + this.state.fulfillmentFee + this.state.storageFeeOctDec,
        totalProfitOctDec: this.state.price - this.state.referralFee - this.state.fulfillmentFee - this.state.storageFeeOctDec - this.state.cost,
      }, () => {
        this.setState({
          profitMarginJanSept: ((this.state.price - this.state.totalFeesJanSept - this.state.cost) * 100 / this.state.price).toFixed(2),
          profitMarginOctDec: ((this.state.price - this.state.totalFeesOctDec - this.state.cost) * 100 / this.state.price).toFixed(2),
        }, () => {
          this.setState({
            showFees: true
          });
        });
      });
    }


  }

  calculateStorageFee = () => {
    if (this.state.fbaSizeTier.split(' ')[1] === "Standard") {
      this.setState({
        storageFeeJanSept: 0.69 * this.state.volume,
        storageFeeOctDec: 2.40 * this.state.volume
      }, this.calculateTotal);
    } else {
      this.setState({
        storageFeeJanSept: 0.48 * this.state.volume,
        storageFeeOctDec: 1.20 * this.state.volume
      }, this.calculateTotal);
    }
  }

  calculateWeightFee = () => {
    let shippingWeight = Number(this.state.totalWeight);
    if (this.state.fbaSizeTier === "Small Standard") {
      if (shippingWeight <= 0.625) {
        this.setState({
          fulfillmentFee: 2.41
        }, this.calculateStorageFee)
      } else if (shippingWeight > 0.625 && shippingWeight <= 1) {
        this.setState({
          fulfillmentFee: 2.48
        }, this.calculateStorageFee)
      }
    } else if (this.state.fbaSizeTier === "Large Standard") {
      if (shippingWeight <= 0.625) {
        this.setState({
          fulfillmentFee: 3.19
        }, this.calculateStorageFee)
      } else if (shippingWeight > 0.625 && shippingWeight <= 1) {
        this.setState({
          fulfillmentFee: 3.28
        }, this.calculateStorageFee)
      } else if (shippingWeight > 1 && shippingWeight <= 2) {
        this.setState({
          fulfillmentFee: 4.76
        }, this.calculateStorageFee)
      } else if (shippingWeight > 2 && shippingWeight <= 3) {
        this.setState({
          fulfillmentFee: 5.26
        }, this.calculateStorageFee)
      } else if (shippingWeight > 3 && shippingWeight <= 20) {
        let differenceFee = (shippingWeight - 3) * 0.38 + 5.26;
        this.setState({
          fulfillmentFee: differenceFee
        }, this.calculateStorageFee)
      } else if (shippingWeight > 20 && shippingWeight < 70) {
        console.log(`Your product missed the Large Standard Tier by ${shippingWeight - 20}lbs`)
        let differenceFee = (shippingWeight - 2) * 0.38 + 8.26;
        this.setState({
          fbaSizeTier: 'Small Oversize',
          fulfillmentFee: differenceFee
        }, this.calculateStorageFee)
      }
    } else if (this.state.fbaSizeTier === "Small Oversize") {
      if (shippingWeight <= 70) {
        let differenceFee = (shippingWeight - 2) * 0.38 + 8.26;
        this.setState({
          fulfillmentFee: differenceFee
        }, this.calculateStorageFee)
      } else if (shippingWeight > 70) {
        console.log(`Your product missed the Small Oversize Tier by ${shippingWeight - 70}lbs`)
        let differenceFee = (shippingWeight - 2) * 0.39 + 9.79;
        this.setState({
          fbaSizeTier: 'Medium Oversize',
          fulfillmentFee: differenceFee
        }, this.calculateStorageFee)
      }
    } else if (this.state.fbaSizeTier === "Medium Oversize") {
      if (shippingWeight <= 150) {
        let differenceFee = (shippingWeight - 2) * 0.39 + 9.79;
        this.setState({
          fulfillmentFee: differenceFee
        }, this.calculateStorageFee)
      } else if (shippingWeight > 150) {
        console.log(`Your product missed the Medium Oversize Tier by ${shippingWeight - 150}lbs`)
        let differenceFee = (shippingWeight - 90) * 0.91 + 137.32;
        this.setState({
          fbaSizeTier: 'Special Oversize',
          fulfillmentFee: differenceFee
        }, this.calculateStorageFee)
      }
    } else if (this.state.fbaSizeTier === "Large Oversize") {
      if (shippingWeight <= 150) {
        let differenceFee = (shippingWeight - 90) * 0.79 + 75.78;
        this.setState({
          fulfillmentFee: differenceFee
        }, this.calculateStorageFee)
      } else if (shippingWeight > 150) {
        console.log(`Your product missed the Large Oversize Tier by ${shippingWeight - 150}lbs`)
        let differenceFee = (shippingWeight - 90) * 0.91 + 137.32;
        this.setState({
          fbaSizeTier: 'Special Oversize',
          fulfillmentFee: differenceFee
        }, this.calculateStorageFee)
      }
    } else if (this.state.fbaSizeTier === "Special Oversize") {
      let differenceFee = (shippingWeight - 90) * 0.91 + 137.32;
      this.setState({
        fulfillmentFee: differenceFee
      }, this.calculateStorageFee)
    }
  }


  calculateFees = () => {
    this.setState({
      validate: !this.state.validate
    });

    if (this.state.totalFeesJanSept > 0) {
      this.setState({
        boxWeight: 0,
        totalWeight: 0,
        fbaSizeTier: '',
        fulfillmentFee: 0,
        storageFeeJanSept: 0,
        storageFeeOctDec: 0,
        calculated: false,
        totalFeesJanSept: 0,
        totalProfitJanSept: 0,
        totalFeesOctDec: 0,
        totalProfitOctDec: 0,
        profitMarginJanSept: 0,
        profitMarginOctDec: 0
      });
    }

    if (this.state.price === '' || this.state.length === '' || this.state.width === '' || this.state.height === '' || this.state.weight === '' || this.state.select === '') {
      return;
    }

    let dimensions = [Number(this.state.length), Number(this.state.width), Number(this.state.height)].sort((a, b) => {
      return b - a;
    });

    let longest = Number(dimensions[0]);
    let median = Number(dimensions[1]);
    let shortest = Number(dimensions[2]);
    let volume = ((longest * median * shortest) / 1728).toFixed(2);
    volume = Number(volume);
    this.setState({ volume });
    let weight;
    if (this.state.weightType === 'oz') {
      weight = Number(this.state.weight / 16).toFixed(2);
      weight = Number(weight);
    } else {
      weight = Number(this.state.weight).toFixed(2);
      weight = Number(weight);
    }


    let dimensionalWeight = ((longest * median * shortest) / 139).toFixed(2);
    dimensionalWeight = Number(dimensionalWeight);
    let girth = ((2 * median) + (2 * shortest)).toFixed(2);
    girth = Number(girth);

    //Small Standard
    if (weight <= 0.75 && longest <= 15 && median <= 12 && shortest <= 0.75) {
      this.setState({
        boxWeight: .25,
        fbaSizeTier: 'Small Standard'
      }, () => {
        this.setState({
          totalWeight: weight + this.state.boxWeight
        }, this.calculateWeightFee);
      });
    }
    //Large Standard
    else if (weight <= 20 && longest <= 18 && median <= 14 && shortest <= 8) {
      this.setState({
        boxWeight: .25,
        fbaSizeTier: 'Large Standard'
      }, () => {
        if (weight <= 1) {
          this.setState({
            totalWeight: weight + this.state.boxWeight
          }, this.calculateWeightFee);
        } else {

          weight > dimensionalWeight ? (this.setState({
            totalWeight: weight + this.state.boxWeight
          }, this.calculateWeightFee)) : (this.setState({
            totalWeight: dimensionalWeight + this.state.boxWeight
          }, this.calculateWeightFee))
        }
      });
    }
    //Small Oversize
    else if (weight <= 70 && longest <= 60 && median <= 30 && girth <= 130) {
      this.setState({
        boxWeight: 1,
        fbaSizeTier: 'Small Oversize'
      }, () => {
        weight > dimensionalWeight ? (this.setState({
          totalWeight: weight + this.state.boxWeight
        }, this.calculateWeightFee)) : (this.setState({
          totalWeight: dimensionalWeight + this.state.boxWeight
        }, this.calculateWeightFee))
      });
    }
    //Medium Oversize
    else if (weight <= 150 && longest <= 108 && girth <= 130) {
      this.setState({
        boxWeight: 1,
        fbaSizeTier: 'Medium Oversize'
      }, () => {
        weight > dimensionalWeight ? (this.setState({
          totalWeight: weight + this.state.boxWeight
        }, this.calculateWeightFee)) : (this.setState({
          totalWeight: dimensionalWeight + this.state.boxWeight
        }, this.calculateWeightFee))
      });
    }
    //Large Oversize
    else if (weight <= 150 && longest <= 108 && girth <= 165) {
      this.setState({
        boxWeight: 1,
        fbaSizeTier: 'Large Oversize'
      }, () => {
        weight > dimensionalWeight ? (this.setState({
          totalWeight: weight + this.state.boxWeight
        }, this.calculateWeightFee)) : (this.setState({
          totalWeight: dimensionalWeight + this.state.boxWeight
        }, this.calculateWeightFee))
      });
    }
    //Special Oversize
    else if (weight > 150 && longest > 108 && girth > 165) {
      this.setState({
        boxWeight: 1,
        fbaSizeTier: 'Special Oversize'
      }, () => {
        this.setState({
          totalWeight: weight + this.state.boxWeight
        }, this.calculateWeightFee);
      });
    }
  }

  handleInput = (val, e) => {
    var temp = Number(val);
    this.setState({
      [e.target.name]: temp
    });
  }

  handleCheckbox = (type, e) => {
    this.setState({
      [type]: !this.state[type]
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

  handleSelect = (cat) => {
    if (cat === "") {
      this.setState({
        select: ""
      });
      return;
    }
    this.setState({
      select: cat
    });
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

  handleWeightSelect = (type) => {
    this.setState({
      weightType: type
    });
  }

  render() {
    return (


      <div className="App">
        <header className="App-calc">
          <h2>
            Amazon FBA Fee Calculator
          </h2>

          <div className="App-entry">
            <p>Target Product Selling Price: $</p>
            <Textbox
              type="number"
              classNameContainer="App-ctn"
              classNameWrapper="App-wrapper"
              name="price"
              tabIndex='1'
              validate={this.state.validate}
              value={this.state.price}
              onChange={(val, e) => {
                this.handleInput(val, e);
              }}
              onBlur={() => { }}
              validationOption={{
                type: 'number',
                msgOnError: 'Required'
              }}
            />
          </div>

          <div className="App-entry">
            <p>Product Cost: $</p>
            <Textbox
              type="number"
              classNameContainer="App-ctn"
              classNameWrapper="App-wrapper"
              name="cost"
              tabIndex='2'
              validate={this.state.validate}
              value={this.state.cost}
              onChange={(val, e) => {
                this.handleInput(val, e);
              }}
              onBlur={() => { }}
              validationOption={{
                type: 'number',
                msgOnError: 'Required'
              }}
            />
          </div>

          <div className="App-entry">
            <p>Product Dimensions:</p>
            <Textbox
              type="number"
              classNameContainer="App-ctn"
              classNameWrapper="App-wrapper"
              name="length"
              tabIndex='3'
              validate={this.state.validate}
              value={this.state.length}
              onChange={(val, e) => {
                this.handleInput(val, e);
              }}
              onBlur={() => { }}
              validationOption={{
                type: 'number',
                msgOnError: 'Required'
              }}
            />
            <p>L(in) x</p>
            <Textbox
              type="number"
              classNameContainer="App-ctn"
              classNameWrapper="App-wrapper"
              name="width"
              tabIndex='4'
              validate={this.state.validate}
              value={this.state.width}
              onChange={(val, e) => {
                this.handleInput(val, e);
              }}
              onBlur={() => { }}
              validationOption={{
                type: 'number',
                msgOnError: 'Required'
              }}
            />
            <p>W(in) x</p>
            <Textbox
              type="number"
              classNameContainer="App-ctn"
              classNameWrapper="App-wrapper"
              name="height"
              tabIndex='5'
              validate={this.state.validate}
              value={this.state.height}
              onChange={(val, e) => {
                this.handleInput(val, e);
              }}
              onBlur={() => { }}
              validationOption={{
                type: 'number',
                msgOnError: 'Required'
              }}
            />
            <p>H(in)</p>
          </div>

          <div className="App-entry">
            <p>Product Weight:</p>
            <Textbox
              type="number"
              classNameContainer="App-ctn"
              classNameWrapper="App-wrapper"
              name="weight"
              tabIndex='6'
              validate={this.state.validate}
              value={this.state.weight}
              onChange={(val, e) => {
                this.handleInput(val, e);
              }}
              onBlur={() => { }}
              validationOption={{
                type: 'number',
                msgOnError: 'Required'
              }}
            />
            <Select
              tabIndex='7'
              classNameContainer="App-weightSelectCtn"
              classNameOptionListContainer="App-selectListCtn"
              classNameOptionListItem="App-selectListItem"
              classNameWrapper="App-wrapper"
              value={this.state.weightType}
              optionList={[
                { id: "", name: 'lb' },
                { id: "oz", name: "oz" },
              ]}
              onChange={(val, e) => {
                this.handleWeightSelect(val);
              }}
            />
          </div>


          <div className="App-entry">
            <p>Select Product Category:</p>
            <Select
              tabIndex='8'
              classNameContainer="App-selectCtn"
              classNameOptionListContainer="App-selectListCtn"
              classNameOptionListItem="App-selectListItem"
              classNameWrapper="App-wrapper"
              value={this.state.select}
              validate={this.state.validate}
              optionList={[
                { id: "", name: 'Please Select a category' },
                { id: "amazon", name: "Amazon Device Accessories" },
                { id: "baby", name: "Baby Products" },
                { id: "books", name: "Books" },
                { id: "camera", name: "Camera and Photo" },
                { id: "cellPhone", name: "Cell Phone Devices" },
                { id: "consumer", name: "Consumer Electronics" },
                { id: "dvd", name: "DVD & Video" },
                { id: "electronicsAcc", name: "Electronic Accessories" },
                { id: "furniture", name: "Furniture and Decor" },
                { id: "mattress", name: "Mattress" },
                { id: "home", name: "Home and Garden" },
                { id: "kitchen", name: "Kitchen" },
                { id: "appliances", name: "Major Appliances" },
                { id: "music", name: "Music" },
                { id: "instrument", name: "Musical Instruments" },
                { id: "office", name: "Office Products" },
                { id: "outdoors", name: "Outdoors" },
                { id: "computers", name: "Personal Computers" },
                { id: "software", name: "Software & Computer/Video Games" },
                { id: "sports", name: "Sports" },
                { id: "tools", name: "Tools & Home Improvement" },
                { id: "toys", name: "Toys & Games" },
                { id: "unlocked", name: "Unlocked Cell Phones" },
                { id: "consoles", name: "Video Game Consoles" },
                { id: "everythingElse", name: "Everything Else" }
              ]}
              onChange={(val, e) => {
                this.handleSelect(val);
              }}
              onBlur={() => { }}
              validationOption={{
                msgOnError: "Required"
              }}
            />
          </div>

          <div className="App-note">
            Contains Lithium Batteries:
            <Checkbox
              classNameInputBox="App-check"
              name="battery"
              value={this.state.battery}
              checked={this.state.battery}
              onChange={(isChecked, e) => {
                this.handleCheckbox('battery', e);
              }}

            />&nbsp;&nbsp;&nbsp;
            Clothing Item:
            <Checkbox
              classNameInputBox="App-check"
              name="clothing"
              value={this.state.clothing}
              checked={this.state.clothing}
              onChange={(isChecked, e) => {
                this.handleCheckbox('clothing', e);
              }}
            />
          </div>
          <div className='App-button-ctn'>
            <button
              className="App-button"
              disabled={this.state.calculated}
              onClick={this.calculateFees}
            >Calculate</button>
            <button
              className="App-button"
              onClick={this.reset}>Reset</button>
          </div>
          {this.state.showFees && <div className="App-feeCtn">
            <div className="App-fee">
              <span>January - September:</span>
              <br />
              <div className="App-FeeLine">
                <div>FBA Tier: </div>
                <div> {this.state.fbaSizeTier}</div>
              </div>
              <div className="App-FeeLine">
                <div>Unit Weight: </div>
                <div>{numeral(this.state.weight).format('0.00')}lb</div>
              </div>
              <div className="App-FeeLine">
                <div>Packaging Weight: </div>
                <div>{numeral(this.state.boxWeight).format('0.00')}lb</div>
              </div>
              <div className="App-FeeLine">
                <div>Shipping Weight: </div>
                <div>{numeral(this.state.totalWeight).format('0.00')}lb</div>
              </div>
              <br />
              <div className="App-FeeLine">
                <div>Target Price: </div>
                <div>${numeral(this.state.price).format('0.00')}</div>
              </div>
              <div className="App-FeeLine">
                <div>Unit Cost: </div>
                <div>${numeral(this.state.cost).format('0.00')}</div>
              </div>
              <div className="App-FeeLine">
                <div>Amazon Referral Fee: </div>
                <div>${numeral(this.state.referralFee).format('0.00')}</div>
              </div>
              <div className="App-FeeLine">
                <div>Fulfillment Fee: </div>
                <div>${numeral(this.state.fulfillmentFee).format('0.00')}</div>
              </div>
              <div className="App-FeeLine">
                <div>Jan to Sept Storage Fees: </div>
                <div>${numeral(this.state.storageFeeJanSept).format('0.00')}</div>
              </div>
              <br />
              <div className="App-FeeLine">
                <div>Total Fees: </div>
                <div>${numeral(this.state.totalFeesJanSept).format('0.00')}</div>
              </div>
              <div className="App-FeeLine">
                <div>Total Profit: </div>
                <div>${numeral(this.state.totalProfitJanSept).format('0.00')}</div>
              </div>
              <div className="App-FeeLine">
                <div>Profit Margin: </div>
                <div>{numeral(this.state.profitMarginJanSept).format('0.00')}%</div>
              </div>
            </div>


            <div className="App-fee">
              <span>October - December:</span>
              <br />
              <div className="App-FeeLine">
                <div>FBA Tier: </div>
                <div> {this.state.fbaSizeTier}</div>
              </div>
              <div className="App-FeeLine">
                <div>Unit Weight: </div>
                <div>{numeral(this.state.weight).format('0.00')}lb</div>
              </div>
              <div className="App-FeeLine">
                <div>Packaging Weight: </div>
                <div>{numeral(this.state.boxWeight).format('0.00')}lb</div>
              </div>
              <div className="App-FeeLine">
                <div>Shipping Weight: </div>
                <div>{numeral(this.state.totalWeight).format('0.00')}lb</div>
              </div>
              <br />
              <div className="App-FeeLine">
                <div>Target price: </div>
                <div>${numeral(this.state.price).format('0.00')}</div>
              </div>
              <div className="App-FeeLine">
                <div>Unit Cost: </div>
                <div>${numeral(this.state.cost).format('0.00')}</div>
              </div>
              <div className="App-FeeLine">
                <div>Amazon Referral Fee: </div>
                <div>${numeral(this.state.referralFee).format('0.00')}</div>
              </div>
              <div className="App-FeeLine">
                <div>Fulfillment Fee: </div>
                <div>${numeral(this.state.fulfillmentFee).format('0.00')}</div>
              </div>
              <div className="App-FeeLine">
                <div>Oct to Dec Storage Fees: </div>
                <div>${numeral(this.state.storageFeeOctDec).format('0.00')}</div>
              </div>
              <br />
              <div className="App-FeeLine">
                <div>Total Fees: </div>
                <div>${numeral(this.state.totalFeesOctDec).format('0.00')}</div>
              </div>
              <div className="App-FeeLine">
                <div>Total Profit: </div>
                <div>${numeral(this.state.totalProfitOctDec).format('0.00')}</div>
              </div>
              <div className="App-FeeLine">
                <div>Profit Margin: </div>
                <div>{numeral(this.state.profitMarginOctDec).format('0.00')}%</div>
              </div>
            </div>


          </div>}

          <div className="App-footer">
            Updated 2/26/2019
            <br />
            <br />
            <a href="mailto:myfbacalculator@gmail.com">Submit Feedback</a>
          </div>
        </header>

      </div>
    );
  }
}


export default App;
