import React, {Component} from 'react';
import Signin from './components/Signin';
import AuctionPage from './components/AuctionPage';
import './App.css';


const intialState = {
    route: 'signin',
	username: '',
	password: ''

};

class App extends Component {
	constructor() {
		super();
		this.state = intialState;
	};


	loadUser = (data) => {
        this.setState({
			username: data.username,
			password: ''

        })
    };
	
	onRouteChange = (route) => {
        this.setState({ route: route });
	};

	onInputChange = (event) => {
        this.setState({ input: event.target.value });
	};
	

	render() {
		const { route } = this.state;
		return (
			<div className="App">
				{
					route === 'signin' ? 

					<Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
					: 
					<AuctionPage user={this.state.username} onRouteChange={this.onRouteChange}/>
				}
			</div>
		);
	}
}

export default App;
