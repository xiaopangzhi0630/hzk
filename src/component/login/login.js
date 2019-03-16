// 登录组件
import React, { Component } from 'react'
// 引入antd-mobile相关插件
import { Toast, WingBlank, List, InputItem, Button, Flex, WhiteSpace, NavBar, Icon } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';

import axios from "../../http.js";
import './login.css'


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uname: '',
            pwd: ''
        }
    }
    // 修改state的值
    changeValue = (k, v) => {
        // console.log(k, v)
        this.setState({
            [k]: v
        })
    }
    // 发送请求
    handleLogin = async (e) => {

        // console.log(this.props);

        const { history } = this.props

        // console.log(this.state)  //
        const body = this.state    //在constructor中声明的数据

        const res = await axios.post(`users/login`, body)
        // console.log(res)
        const { meta, data } = res
        if (meta.status === 200) {
            // 登录成功之后,保存token
            localStorage.setItem('token', data.token)
            // 去 / home
            history.push('/')
            // console.log(this.props)
        } else {
            // 提示
            Toast.fail(meta.msg, 1)
        }
    }

    render() {
        return <div>
            <Flex direction="column" justify="center">
                {/* 标题 */}
                <Flex.Item>
                    <WingBlank size="sm">
                        <NavBar mode="dark">登录</NavBar>
                    </WingBlank>
                    <WhiteSpace size="lg" />
                </Flex.Item>


                {/* 表单 */}
                <Flex.Item>
                    <List>
                        <WingBlank size="sm">
                            <InputItem
                                value={this.state.uname}
                                onChange={v => {
                                    this.changeValue('uname', v)
                                }}
                            > 姓名</InputItem>
                            <InputItem
                                value={this.state.pwd}
                                onChange={v => {
                                    this.changeValue('pwd', v)
                                }}
                            >密码</InputItem>
                        </WingBlank>

                    </List>
                    <WhiteSpace size="lg" />
                    {/* 提交按钮 */}
                    <WingBlank size="sm">
                        <Button onClick={this.handleLogin} type="primary" size="large"> 登录 </Button>
                    </WingBlank>
                    <WhiteSpace size="lg" />

                </Flex.Item>
            </Flex>
        </div>
    }
}

export default Login