
import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink,
    Redirect,
    Switch
} from 'react-router-dom'


import Home from './component/home/home.js'
import Login from './component/login/login'


// 类组件
class RouterComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        return (
            <Router>
                <div>

                    {/* // <NavLink exact to="/"></NavLink> */}

                    {/* // <NavLink to="/login"></NavLink> */}


                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/login" component={Login} />
                        {/* 跳转 */}
                        <Redirect to="/login" />
                    </Switch>
                </div>
            </Router>

        );
    }
}


export default RouterComponent