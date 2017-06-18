import React, {Component} from 'react';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


export default class Home extends Component{
  constructor(props){
    super(props);

    this.state = {
      blocks: []
    }
  }

  componentDidMount(){


    addEventListener('load', () => {

        // Dependencies
        var Web3 = require('web3');
        // Initialize connection
        var web3 = new Web3();

            web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));


        // can be 'latest' or 'pending'
        var filter = web3.eth.filter('latest');

        // watch for changes
        filter.watch((error, result)=>{
          if (!error)

            // console.log(result);

            var block = web3.eth.getBlock(result);

            // console.log(JSON.stringify(block));

            let transactions = [];

            block.transactions.forEach((txId) => {

              transactions.push(web3.eth.getTransaction(txId))

            })

            let _blocks = this.state.blocks;

                //TODO _blocks.push(transactions);
                _blocks.push(JSON.stringify(block));

            this.setState({
              blocks: _blocks
            })

        });

      })

  }

  render(){
    return(
      <div className="container">
        <div className="animation-container">
          <ReactCSSTransitionGroup transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {
            this.state.blocks.reverse().map((key, index)=>{
              return <div key={key} className="item">{key}</div>
            })
          }
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}
