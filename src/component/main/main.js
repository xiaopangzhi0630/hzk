// 主页

import React, { Component } from 'react'
import {
  Badge,
  Card,
  NoticeBar,
  Grid,
  Carousel,
  SearchBar,
  WhiteSpace,
  WingBlank
} from 'antd-mobile';
import axios from '../../http'
import './main.css'


const badgeStyle = {
  marginLeft: 12,
  padding: '0 3px',
  backgroundColor: '#fff',
  borderRadius: 2,
  color: '#f19736',
  border: '1px solid #f19736'
}


const thumbStyle = {
  width: '125px',
  height: '95.5px'
}

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imagesData: [],
      imgHeight: 176,
      data: Array.from(new Array(8)).map((_val, i) => ({
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
        text: `name${i}`,
      })),
      menuData: [],
      infoData: [],
      faqData: [],
      houseData: [],
      houseDataChange: []
    }
  }
  // 封装发送请求的方法
  getHomeData = async path => {
    const res = await axios.post(`${path}`)
    const { meta, data } = res
    if (meta.status === 200) {
      return data.list
    }
  }

  // 封装获取新数组
  fn = (arr, ...rest) => {
    let resArr = []
    for (let i = 0; i < rest.length; i++) {
      resArr.push(arr.splice(0, rest[i]))
    }
    return resArr
  }




  componentDidMount = async () => {
    // 获取轮播图的数据
    let imagesData = this.getHomeData(`homes/swipe`)
    // 获取列表数据  最外层{} 解决了作用域的问题 ES6的新特性
    let menuData = this.getHomeData(`homes/menu`)
    let infoData = this.getHomeData(`homes/info`)
    let faqData = this.getHomeData(`homes/faq`)
    let houseData = this.getHomeData(`homes/house`)


    // 修改数据
    const datalist = await Promise.all([imagesData, menuData, infoData, faqData, houseData])
    console.log(datalist);

    this.setState(
      {
        imagesData: datalist[0],
        menuData: datalist[1],
        infoData: datalist[2],
        faqData: datalist[3],
        houseData: datalist[4]

      },
      () => {
        // 把menudata->data
        let data = this.state.menuData.map((item, i) => {
          return {
            icon: `http://127.0.0.1:8086/public/0${i + 1}.png`,
            text: item.menu_name
          }
        })


        let temp = this.state.houseData
        let houseDataChange = this.fn(temp, 2, 2, 3)
        // console.log(houseDataChange)

        this.setState({
          data,
          houseDataChange
        })
      })

  }

  render() {

    // 轮播
    const carouselTemplate = this.state.imagesData.map((item, i) => {
      return (
        <a
          key={i}
          href="/"
          style={{
            display: 'inline-block',
            width: '100%',
            height: this.state.imgHeight
          }}
        >
          <img
            src={item.original}
            alt="图片加载中"
            style={{ width: '100%', verticalAlign: 'top' }}
            onLoad={() => {
              window.dispatchEvent(new Event('resize'))
              this.setState({ imgHeight: 'auto' })
            }}
          />
        </a>
      )
    })

    // 咨询
    const infoTemplate = this.state.infoData.map((item, i) => {
      return (
        <NoticeBar
          key={i}
          action={<span>去看看</span>}
          mode="link"
          marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}
        >
          {item.info_title}
        </NoticeBar>
      )
    })

    // 好客问答
    const faqTemplate = this.state.faqData.map((item, i) => {
      return (
        <Card key={i}>
          <Card.Header
            title={item.question_name}
            thumb={<Badge text="HOT" hot style={{ marginLeft: 0 }} />}
          />
          <Card.Body>
            <div>
              <Badge text={item.question_tag} style={badgeStyle} />
              <Badge text={item.answer_content} style={badgeStyle} />
              <Badge text={item.atime} style={badgeStyle} />
              <Badge text={item.qnum} style={badgeStyle} />
            </div>
          </Card.Body>
        </Card>
      )
    })


    // 房屋列表
    const houseTemplate = this.state.houseDataChange.map((item1, i) => {
      const houseTemplateItems = item1.map((item2, j) => {
        return (
          <Card key={j}>
            <Card.Header
              thumb="http://127.0.0.1:8086/public/home.png"
              thumbStyle={thumbStyle}
              extra={
                <div>
                  <Badge text={item2.home_name} style={badgeStyle} />
                  <Badge text={item2.home_price} style={badgeStyle} />
                  <Badge text={item2.home_desc} style={badgeStyle} />
                  <Badge text={item2.home_tags} style={badgeStyle} />
                </div>
              }
            />
          </Card>
        )
      })
      let titles = ['最新开盘', '二手精选', '租个家']
      return (
        <div key={i}>
          {/* 不要带样式,加粗 */}
          <b>{titles[i]}</b>
          {houseTemplateItems}
        </div>
      )
    })


    return <div>
      {/* 搜索 */}
      <SearchBar placeholder="请输入搜索关键字" />
      {/* 两翼留白 */}
      <WingBlank size="md">
        {/* 轮播 */}
        <Carousel infinite >{carouselTemplate}</Carousel>

        {/* 菜单 */}
        <Grid data={this.state.data} isCarousel onClick={_el => console.log(_el)} />

        {/* 好客资讯 */}
        {infoTemplate}
        <WhiteSpace></WhiteSpace>
        {/* 好客问答 */}

        {faqTemplate}

        {/* 房屋列表 */}

        {houseTemplate}
        <div style={{ height: '50px' }} />

      </WingBlank>



    </div>
  }
}

export default Main
