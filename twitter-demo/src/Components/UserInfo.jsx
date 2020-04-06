import React from 'react'
import {connect} from 'react-redux'


class UserInfo extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let user = window.location.href.split("/").pop() === "home" ? this.props.user : this.props.selected_user
        return (
            <div>
                <div className="">
                    <img src="/twitter_profile.png" className="rounded profile-pic box-shadow-lg" alt="Profile Pic" />
                </div>
                <br/>
                <div className="text-center">
                    <span className="f-md txt-color">{user.full_name}</span>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-4">
                        Tweets
                        <p className="txt-color">{user.tweets}</p>
                    </div>
                    <div className="col-md-4">
                        Following
                        <p className="txt-color">{user.following}</p>
                    </div>
                    <div className="col-md-4">
                        Followers
                        <p className="txt-color">{user.followers}</p>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        selected_user: state.selected_user,
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserInfo)