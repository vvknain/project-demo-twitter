import React from 'react'
import {connect} from 'react-redux'
import {updateUser} from '../action/main_action'


class ProfilePage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            first_name: "",
            last_name: ""
        }
    }

    componentDidMount() {
        this.setState({
            first_name: this.props.user.first_name,
            last_name: this.props.user.last_name
        })
    }

    updateUser() {
        this.props.updateUser({
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            full_name: this.state.first_name + " " + this.state.last_name,
            id: this.props.user._id
        })
        this.props.history.push('/app/home')
    }

    is_disabled() {
        if (this.state.first_name === this.props.user.first_name && this.state.last_name === this.props.user.last_name) {
            return true
        } else {
            return false
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6 h-full pad-h-profile">
                        <div className="m-b-login">
                            <h1 className="txt-color">Profile Details</h1>
                        </div>
                        <div className="m-b-login">
                            <h3>View or edit profile details</h3>
                        </div>
                    
                        <form action="">
                            <div className="form-group text-left">
                                <label htmlFor="">First Name</label>
                                <input type="text" className="form-control" placeholder="First name" 
                                    value={this.state.first_name} onChange={(e) => this.setState({first_name: e.target.value})} />
                            </div>
                            <div className="form-group text-left m-b-login">
                                <label htmlFor="">Last Name</label>
                                <input type="text" className="form-control" placeholder="Last name" 
                                    value={this.state.last_name} onChange={(e) => this.setState({last_name: e.target.value})}/>
                            </div>
                            <button type="button" className="btn btn-primary btn-lg m-b-login" 
                                onClick={() => this.updateUser()} disabled={this.is_disabled()}>Update</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateUser: (data) => {
            dispatch(updateUser(data))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePage)