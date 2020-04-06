import React from 'react'
import {
    Route,
    Link
  } from 'react-router-dom'

import HomePage from './HomePage'
import ProfilePage from './ProfilePage'
import {login_user} from '../action/main_action'
import {connect} from 'react-redux'


class Navigation extends React.Component {
    constructor(props) {
        super(props)
    }

    changeTab(value) {
        this.props.changeTab(value)
    }

    componentDidMount() {
        fetch('http://localhost:4000/user', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            if(res.status === 200) {
                return res.json()
            } else {
                this.props.history.push('/')
            }
        })
        .then((res) => {
            this.props.setUser(res)
        })
    }

    signout() {
        fetch('http://localhost:4000/signout', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            if(res.status === 200) {
                this.props.history.push('/')
            } else {
                const error = new Error(res.error)
                throw error
            }
        })
    }

    render() {
        let trail = window.location.pathname.split("/").pop()
        return (
            <div>
                <div className="hbox b-b text-md font-bold nav-header">
                    <div className="col v-center"  style={{width: "30px"}}>
                        <img src="/twitter_PNG9.png" className="header-logo" alt="logo" />
                    </div>
                    <div className="col v-center" style={{width: "40px"}}>
                        <h2 className="txt-color">Twitter</h2>
                    </div>
                    <div className="col" style={{width: "300px"}}>
                    </div>
                    <div className={`col v-center cursor ${trail === "home"? "b-b b-blue b-3x txt-color " : ""}`} 
                    style={{width: "50px"}}>
                        <Link to="/app/home">
                            <i className="fa fa-home"></i>
                            <span className="f-heavy"> Home</span>
                        </Link>
                    </div>
                    {console.log(trail, " traillllllll")}
                    <div className={`col v-center cursor ${trail === "profile"? "b-b b-blue b-3x txt-color" : ""}`} 
                    style={{width: "50px"}}>
                        <Link to="/app/profile">
                            <i className="fa fa-user"></i>
                            <span className="f-heavy"> Profile</span>
                        </Link>
                    </div>
                    <div className="col v-center cursor" style={{width: "50px"}}>
                        <span className="f-heavy" onClick={() => this.signout()}>Signout</span>
                    </div>
                </div>
                <Route path="/app/home" component={HomePage}/>
                <Route path="/app/profile" component={ProfilePage}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setUser: (data) => {
            dispatch(login_user(data))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Navigation)
