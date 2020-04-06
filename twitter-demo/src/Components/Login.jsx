import React from 'react'
import {connect} from 'react-redux'
import {login_user} from '../action/main_action'


class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: "",
            signup: false,
            login: true
        }
    }

    componentDidMount(){
        fetch('http://localhost:4000/user', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            if(res.status === 200) {
                this.props.history.push('/app/home')
            }
        })
    }

    login() {
        fetch('http://localhost:4000/login', {
            method: 'POST',
            body: JSON.stringify({email: this.state.email, password: this.state.password}),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            if(res.status === 200) {
                return res.json()
            } else {
                const error = new Error(res.error)
                throw error
            }
        })
        .then((res) => {
            this.props.loginUser(res)
            this.props.history.push('/app/home')
        })
    }

    signup() {
        fetch('http://localhost:4000/signup', {
            method: 'POST',
            body: JSON.stringify({email: this.state.email, password: this.state.password}),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            if(res.status === 200) {
                return res.json()
            } else {
                const error = new Error(res.error)
                throw error
            }
        })
        .then((res) => {
            this.props.loginUser(res)
            this.props.history.push('/app/home')
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 h-full v-center login-div">
                        <img src="/twitter_PNG9.png" className="login-logo" alt="logo"/>
                    </div>
                    <div className="col-md-6 h-full pad-h-login">
                        <div className="m-b-login">
                            <h1 className="txt-color">Twitter</h1>
                        </div>
                        <div className="m-b-login">
                            <h2>{this.state.login ? "Login To Twitter" : "SignUp To Twitter"}</h2>
                        </div>
                        {this.state.login && 
                            <form action="">
                                <div className="form-group text-left">
                                    <label htmlFor="">Email Address</label>
                                    <input type="email" className="form-control" placeholder="Enter email" onChange={(e) => this.setState({email: e.target.value})} />
                                </div>
                                <div className="form-group text-left m-b-login">
                                    <label htmlFor="">Password</label>
                                    <input type="password" className="form-control" placeholder="Password" onChange={(e) => this.setState({password: e.target.value})}/>
                                </div>
                                <button type="button" className="btn btn-primary btn-lg m-b-login" onClick={() => this.login()}>Login</button>
                                <div className="row twit-row-mar text-right">
                                    <div className="col-md-9"></div>
                                    <div className="col-md-3">
                                        <p className="cursor txt-color" onClick={() => this.setState({signup: true, login: false})}>SignUp</p>
                                    </div>
                                </div>
                            </form>
                        }
                        {this.state.signup && 
                            <form action="">
                                <div className="form-group text-left">
                                    <label htmlFor="">Email Address</label>
                                    <input type="email" className="form-control" placeholder="Enter email" onChange={(e) => this.setState({email: e.target.value})} />
                                </div>
                                <div className="form-group text-left m-b-login">
                                    <label htmlFor="">Password</label>
                                    <input type="password" className="form-control" placeholder="Password" onChange={(e) => this.setState({password: e.target.value})}/>
                                </div>
                                <button type="button" className="btn btn-primary btn-lg m-b-login" onClick={() => this.signup()}>SignUp</button>
                                <div className="row twit-row-mar text-right">
                                    <div className="col-md-9"></div>
                                    <div className="col-md-3">
                                        <p className="cursor txt-color" onClick={() => this.setState({signup: false, login: true})}>Login</p>
                                    </div>
                                </div>
                            </form>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loginUser: (data) => {
            dispatch(login_user(data))
        }
    }
}

export default connect(
    null,
    mapDispatchToProps
)(Login)