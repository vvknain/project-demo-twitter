import React from 'react'
import ListTwit from './ListTwit'
import CreateTwit from './CreateTwit'
import {connect} from 'react-redux'
import {fetchUser, requestChildTweets} from '../action/main_action'


class ClickTwit extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            id: "",
            clicked: false
        }
    }

    list_twits() {
        return (
            <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-11"  style={{overflowY: 'scroll', height: '570px'}}>
                    {this.props.child_tweets.map((tweet, i) => {
                        return [
                            <div key={i}>
                                <ListTwit 
                                    tweet = {tweet}
                                    enable_reply = {(id, clicked) => this.setState({id: id, clicked: clicked})}
                                />
                            </div>,
                            <div>
                                {this.state.id == tweet.id && this.state.clicked &&
                                    <CreateTwit 
                                        parent_id = {tweet.id}
                                        hide = {() => this.setState({clicked: false})}
                                    />
                                }
                            </div>
                        ]
                    })}
                </div>
            </div>
        )
    }

    render() {
        this.props.fetchUser(this.props.match.params.user_id)
        this.props.requestChildTweets(this.props.match.params.tweet_id)
        return (
            <div className="col-md-6">
                <div className="row pad-h">
                    <div className="container-fluid">
                        {Object.keys(this.props.tweet).length &&
                            <ListTwit 
                            tweet = {this.props.tweet}
                            enable_reply = {(id, clicked) => this.setState({id: id, clicked: clicked})}
                            />
                        }
                        {this.state.id == this.props.tweet.id && this.state.clicked &&
                            <CreateTwit 
                                parent_id = {this.props.tweet.id}
                                hide = {() => this.setState({clicked: false})}
                            />
                        }
                    </div>
                    {this.props.child_tweets.length !=0 &&
                        <div className="container-fluid">
                            {this.list_twits()}
                        </div>
                    }               
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        child_tweets: state.child_tweets,
        tweet: state.tweet
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchUser: (data) => {
            dispatch(fetchUser(data))
        },
        requestChildTweets: (data) => {
            dispatch(requestChildTweets(data))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClickTwit)