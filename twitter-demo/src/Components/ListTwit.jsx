import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {increment_like, deleteTweet} from '../action/main_action'


class ListTwit extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            like: 0,
            clicked: false
        }
    }

    componentDidMount() {
        this.setState({like: this.props.tweet.likes})
    }

    increment_like() {
        this.props.increment_like(this.props.tweet.id)
        this.setState({like: this.state.like + 1})
    }

    enable_reply(id){
        this.setState({clicked: this.state.clicked ? false : true}, () => this.props.enable_reply(id, this.state.clicked))
    }

    deleteTweet(tweet_id, user_id) {
        if(user_id.id === this.props.user._id){
            this.props.deleteTweet(tweet_id, user_id)
        } else {
            alert("You cannot delete this tweet")
        }
    }

    render() {
        return (
            <div className="row twit-row-mar">
                <div className="col-md-12 b-a h-sm box-shadow-lg">
                    <div className="row pad-v">
                        <div className="col-md-2">
                            <img src="/twitter_profile.png" className="rounded-circle prf-pic" alt="profile"/>
                        </div>
                        <div className="col-md-10">
                            <div className="text-left">
                                <span className="txt-color">{this.props.tweet ? this.props.tweet.user_id.full_name: "No Name"}</span>&nbsp;&nbsp;
                                <span className="f-xs">{this.props.tweet ? this.props.tweet.created_at : "5 mins"}</span>
                            </div>
                            <div className="text-left">
                                <span className="f-sm dis-in">{this.props.tweet ? this.props.tweet.message : "No mess"}</span>
                            </div>
                            <div className="hbox h-xs">
                                <div className="col txt-grey cursor v-center" onClick={() => this.enable_reply(this.props.tweet.id)}>
                                        <i className="fa fa-reply"></i>
                                        <span className="f-sm"> Reply</span>
                                </div>
                                <div className="col txt-grey cursor v-center">
                                    <Link to={`/app/home/user/${this.props.tweet.user_id.id + "/tweet/" + this.props.tweet.id}`} >
                                        <i className={`fa fa-comment ${this.props.tweet.comments ? "txt-color" : ""}`}></i>&nbsp;
                                        <span className="f-sm">{this.props.tweet.comments}</span>
                                    </Link>
                                </div>
                                <div className="col txt-grey cursor  v-center" onClick={() => this.increment_like()}>
                                    <i className={`fas fa-heart ${this.state.like ? "txt-red" : ""}`}></i>&nbsp;
                                    <span className="f-sm">{this.state.like}</span>
                                </div>
                                <div className="col txt-grey cursor  v-center" onClick={() => this.deleteTweet(this.props.tweet.id, this.props.tweet.user_id)}>
                                    <i className="far fa-trash-alt"></i>
                                    <span className="f-sm"> Delete</span>
                                </div>
                            </div>
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
        increment_like: (data) => {
            dispatch(increment_like(data))
        },
        deleteTweet: (data, user_id) => {
            dispatch(deleteTweet(data, user_id))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListTwit)