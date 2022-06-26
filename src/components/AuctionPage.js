import React, {Component} from 'react';
import Item from './Item';
import '../App.css';
import banana from '../assets/banana.jpg';
import guitar from '../assets/guitar.jpg';
import lambo from '../assets/lambo.jpg';
import watch from '../assets/watch.jpg';
import westminster from '../assets/westminster.jpg';
import ps5 from '../assets/ps5.jpg';

import {io} from 'socket.io-client';

const socket = io('https://serene-spire-38055.herokuapp.com');


class AuctionPage extends Component {
	constructor(props) {
		super(props);
	}
 
	onResetBids = () => {
		socket.emit('reset bids');
	}

		
	render() {
		return (
			<div className="App">
				<header>
					<h1>{`Welcome, ${this.props.user}`}</h1>
					<input
						onClick={()=>this.props.onRouteChange('signin')} 
						className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
						type="submit" 
						value="Sign Out"
					/>

					{
					  this.props.user === 'Admin' ? 
					  <button 
					  onClick={this.onResetBids}
					  id='reset'
					  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
					  >Reset all bids</button> : null
				  	}	
				</header>

				{
					this.props.user === 'Admin' ? 
					<div className="auction-items">
						<Item 
							user={this.props.user} 
							action='CLOSE BIDS'
							id='0' 
							img={banana} 
							title='A banana'
							description='The most delicious banana, ever.'
						/>
						<Item 
							user={this.props.user} 
							action='CLOSE BIDS'
							id='1' 
							img={watch} 
							title="Hero's Watch"
							description='Lets you control time and space'
						/>
						<Item 
							user={this.props.user} 
							action='CLOSE BIDS'
							id='2' 
							img={ps5} 
							title='Playstation 5'
							description='Succulent escapism'
						/>
						<Item 
							user={this.props.user} 
							action='CLOSE BIDS'
							id='3' 
							img={westminster} 
							title='Westminter'
							description='Yes, you can buy it!'
						/>
						<Item 
							user={this.props.user} 
							action='CLOSE BIDS'
							id='4' 
							img={guitar} 
							title="Van Halen's guitar"
							description='Used and abused, the real deal!'
						/>
						<Item 
							user={this.props.user} 
							action='CLOSE BIDS'
							id='5' 
							img={lambo} 
							title='A lambo'
							description='Only a click away..'
						/>
					</div>

					: 

					<div className="auction-items">
						<Item 
							user={this.props.user} 
							action='SUBMIT BID'
							id='0' 
							img={banana} 
							title='A banana'
							description='The most delicious banana, ever.'
						/>
						<Item 
							user={this.props.user} 
							action='SUBMIT BID'
							id='1' 
							img={watch} 
							title="Hero's Watch"
							description='Lets you control time and space'
						/>
						<Item 
							user={this.props.user} 
							action='SUBMIT BID'
							id='2' 
							img={ps5} 
							title='Playstation 5'
							description='Succulent escapism'
						/>
						<Item 
							user={this.props.user} 
							action='SUBMIT BID'
							id='3' 
							img={westminster} 
							title='Westminter'
							description='Yes, you can buy it!'
						/>
						<Item 
							user={this.props.user} 
							action='SUBMIT BID'
							id='4' 
							img={guitar} 
							title="Van Halen's guitar"
							description='Used and abused, the real deal!'
						/>
						<Item 
							user={this.props.user} 
							action='SUBMIT BID'
							id='5' 
							img={lambo} 
							title='A lambo'
							description='Only a click away..'
						/>
					</div>
				}  
				
			</div>
		);
	}
}

export default AuctionPage;