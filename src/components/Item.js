import React, {Component} from 'react';
import './Item.css'
import { io } from 'socket.io-client';
 
const socket = io('https://serene-spire-38055.herokuapp.com');



class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.user,
            bidValue: '',
            bidId: props.id,
            bidWinner: ''
        }
    }


    componentDidMount() {

        this.checkBidStatus();

        socket.on('winner name', data => {
            if(data.bid === this.state.bidId) {
                this.setState({bidWinner: data.name})
            }
        })

        socket.on('bids have been reset', () => {
            this.setState({bidWinner:''})
        })
    }

    checkBidStatus = () => {
        fetch('https://serene-spire-38055.herokuapp.com/checkBidStatus', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username: this.state.username,
                    bidId: this.state.bidId
                })
            })
            .then(response => response.json())
            .then(data => {
            if (data === 'User1') {
                this.setState({bidWinner: 'User1'})

            } else if (data === 'User2') { 
                this.setState({bidWinner: 'User2'})
                    
            }
        })
    }
    

    onBidChange = (event) => {
        this.setState({bidValue: event.target.value});
    }

    onSubmitBid = () => {
        fetch('https://serene-spire-38055.herokuapp.com/placeBid', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: this.state.username,
                bidValue: this.state.bidValue,
                bidId: this.state.bidId
            })
        })
    }

    onCloseBid = () => {
        const bidNumber = this.state.bidId;
        socket.emit('close this bid!', bidNumber);
    }


    
    render () {
        return (
            <div id="item">
                <img src={this.props.img} alt=""/>
                <h3>{this.props.title}</h3>
                <p>{this.props.description}</p>

                {
                    
                    this.state.username === 'Admin' ?
                    <button onClick={this.onCloseBid}>{this.props.action}</button>

                    : 

                    this.state.username !== 'Admin' && this.state.bidWinner === '' ? 
                    <div>
                        <input 
                            type="number"
                            onChange={this.onBidChange}
                        />
                        <button onClick={this.onSubmitBid}>{this.props.action}</button>
                    </div>

                    :

                    this.state.username === this.state.bidWinner ? 
                    <h2>You won this bid!</h2> : <h2>You lost this bid!</h2>
                    
                }

            </div>
        )
    }
};


export default Item;