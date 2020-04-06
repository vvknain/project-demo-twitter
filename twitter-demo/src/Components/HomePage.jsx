import React from 'react'
import UserInfo from './UserInfo'
import Tweets from './Tweets'
import ClickTwit from './ClickTwit'
import {Route} from 'react-router-dom'


export default class HomePage extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 full-h b-r">
                        <Route path="/app/home" component={UserInfo} />
                    </div>
                    <Route path="/app/home" exact component={Tweets} />
                    <Route path="/app/home/user/:user_id/tweet/:tweet_id" component={ClickTwit} />
                    <div className="col-md-3 b-l">
                        {/* <Search /> */}
                    </div>
                </div>
            </div>
        )
    }
}
