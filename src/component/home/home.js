
// 首页组件
import React, { Component } from 'react'
import { TabBar } from 'antd-mobile';
import './home.css'

import Main from "../main/main.js";
import News from "../news/news";
import Chat from "../chat/chat.js";
import Mine from "../mine/mine";

import tabbarformjson from './tabbardata.json'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'main',
      hidden: false,
      // fullScreen: true,
    }
  }

  // 调用一个方法
  renderContent = () => {

    // console.log(222);  为什么会触发四次
    // console.log(this.state.selectedTab);

    const selectedTab = this.state.selectedTab

    switch (selectedTab) {
      case 'main':
        return <Main />

        break;
      case 'news':
        return <News />

        break;
      case 'chat':
        return <Chat />

        break;
      case 'mine':
        return <Mine />

        break;

    }
  }


  render() {

    // 封装tabbar里面的tab
    const TabBarItemsTemplate = tabbarformjson.TabBarItemsData.map(
      (item, i) => {
        return (
          <TabBar.Item
            title={item.title}
            key={item.key}
            icon={<div style={{
              width: '22px',
              height: '22px',
              background: `${item.icon_bg_url}`
            }}
            />
            }
            selectedIcon={<div style={{
              width: '22px',
              height: '22px',
              background: `${item.sele_bg_url}`
            }}
            />
            }
            selected={this.state.selectedTab === item.selectedPath}

            onPress={() => {
              this.setState({
                selectedTab: `${item.selectedPath}`,
              });
            }}
            data-seed="logId"
          >
            {this.renderContent()}
          </TabBar.Item>
        )
      })

    return (
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
        hidden={this.state.hidden}
        tabBarPosition="bottom"
      >
        {TabBarItemsTemplate}

      </TabBar>
    );
  }
}

export default Home
