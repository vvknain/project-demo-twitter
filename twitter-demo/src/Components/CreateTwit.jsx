import React from 'react'
import {connect} from 'react-redux'
import {addTweet} from '../action/main_action'


class CreateTwit extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            message: ""
        }
    }

    createTweet() {
        this.props.add_tweet({message: this.state.message, user_id: this.props.user._id, parent_id: this.props.parent_id})
        this.props.hide(true)
        this.setState({message: ""})
    }

    handleChange(event) {
        this.setState({message: event.target.value})
    }

    render() {
        return (
            <div className="row twit-row-mar">
                <div className="col-md-12 b-a h-md box-shadow-lg">
                    <div className="row pad-v">
                        <div className="col-md-2">
                            <img src="/twitter_profile.png" className="rounded-circle prf-pic" alt="profile"/>
                        </div>
                        <div className="col-md-9">
                            <form>
                                <textarea className="form-control no-b" name="tweet_msg" id="" cols="30" rows="3" 
                                placeholder="Whats going on in your mind?" value={this.state.message} onChange={(event) => this.handleChange(event)}></textarea>
                            </form>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-11 text-right v-center" style={{height: "90px"}}>
                            <button type="button" className="btn btn-primary btn-lg" style={{marginTop: "20px"}} onClick={() => this.createTweet()}>Tweet</button>
                        </div>
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
        add_tweet: (data) => {
            dispatch(addTweet(data))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateTwit)