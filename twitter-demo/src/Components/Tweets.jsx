import React from 'react'
import {connect} from 'react-redux'
import {requestAllTweets} from '../action/main_action'
import CreateTwit from './CreateTwit'
import ListTwit from './ListTwit'


class Tweets extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            id: "",
            clicked: false,
            my_tweets: false
        }
    }

    componentWillMount(){
        this.props.allTweets(this.state.my_tweets, this.props.user._id)
    }

    handle_check(e) {
        this.setState({my_tweets: e.target.checked}, () => this.props.allTweets(this.state.my_tweets, this.props.user._id))
    }

    list_twits() {
        return (
            <div className="container-fluid" style={{overflowY: 'scroll', height: '440px'}}>
                {this.props.tweets.map((tweet, i) => {
                    return [
                        <div key={i}>
                            <ListTwit 
                                tweet = {tweet}
                                enable_reply = {(id, clicked) => this.setState({id: id, clicked: clicked})}
                            />
                        </div>,
                        <div>
                            {this.state.id === tweet.id && this.state.clicked &&
                                <CreateTwit 
                                    parent_id = {tweet.id}
                                    hide = {() => this.setState({clicked: false})}
                                />
                            }
                        </div>
                    ]
                })}
            </div>
        )
    }

    render() {
        return (
            <div className="col-md-6">
                <div className="row pad-h">
                    <div className="container-fluid">
                        <div className="row text-left m-b m-t">
                            <div className="col-md-2"><span className="f-md">Home</span></div>
                            <div className="col-md-10 form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={(e) => this.handle_check(e)}/>
                                <label className="form-check-label" for="exampleCheck1">My Tweets</label>
                            </div>
                        </div>
                        <CreateTwit 
                            parent_id = {null}
                            hide = {() => console.log("helo")}
                        />
                    </div>
                    {this.list_twits()}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        tweets: state.tweets,
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        allTweets: (fetch, id) => {
            dispatch(requestAllTweets(fetch, id))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Tweets)
