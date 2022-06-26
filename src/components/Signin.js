import React, {Component} from 'react';



class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    onUsernameChange = (event) => {
        this.setState({username: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    onSubmitSigning = () => {
        fetch('https://serene-spire-38055.herokuapp.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.username) {
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        })
    }


    render() {
        return (  
            <div>
                <main className="pa4 black-80">
                    <div className="measure center">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" >Username</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="text" 
                                    name="username"  
                                    id="username" 
                                    onChange={this.onUsernameChange}
                                />
                            </div> 
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6">Password</label>
                                <input 
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" 
                                    name="password"  
                                    id="password"
                                    onChange={this.onPasswordChange}
                                />
                            </div>
                            <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/>Remember me</label>
                        </fieldset>
                        <div className="">
                            <input
                                onClick={this.onSubmitSigning} 
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit" 
                                value="Sign in"
                            />
                        </div>
                    </div>
                </main>
            </div>
        ) 
    }
};


export default Signin;