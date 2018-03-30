import React, { Component, Fragment } from 'react';

import SwiperComp from '../../Components/Swiper';
import SearchIptComp from '../../Components/SearchSelect';
import ShowList from '../../Components/ShowList';
import GoodsItemComp from '../../Components/GoodsItem';
import $http from '../../utils/http';
import './home.scss';

let src = '/src/static/img';
let srcs = [src + '/main1.png', src + '/place1.png', src + '/main3.png', src + '/main4.png', src + '/main5.png'];

class Home extends Component {
    constructor () {
        super();
        this.state = {
            showList: [],
            shopList: [],
            isRequest: true,
            goods_id: 1,
            shopTitle: ''
        }
    }
    // 滚动页面请求数据
    scroller () {
        if (!this.state.isRequest) return;
        let { clientDom, contentDom } = this.refs;
        /**
         * scH: 滚动的高度
         * clH: 视窗的高度
         * coH: 内容的高度
         * */
        let scH = clientDom.scrollTop;
        let clH = clientDom.offsetHeight;
        let coH = contentDom.offsetHeight;
        if (coH - scH < clH/2 ) {
            this.setState({
                isRequest: false,
                goods_id: ++this.state.goods_id
            })
            $http.post('/getGoodsChannel', {
                params: 'shopList',
                goods_id: this.state.goods_id
            })
            .then(res => {
                if (res.code == 0) return;
                this.setState({
                    shopList: [...this.state.shopList, res],
                    isRequest: true
                })
            })
        }
    }
    render () {
        let { showList, shopList } = this.state;
        return (
            <Fragment>
                <header className="header">
                    <span>717</span>
                    <SearchIptComp {...this.props}></SearchIptComp>
                    <span>我的店铺</span>
                </header>
                <section ref='clientDom' className="section" onScroll={this.scroller.bind(this)}>
                    {/* 轮播模块封装组件 */}
                    <SwiperComp srcs={srcs}></SwiperComp>
                    {/* 分类列表模块封装组件 */}
                    <div id="showList">
                        {
                            showList.map((item, index) => {
                                return <ShowList key={index} categoryInfo={item}></ShowList>
                            })
                        }
                    </div>
                    {/* 商品展示列表模块封装组件 */}
                    <div id="shopList" ref='contentDom'>
                        {
                            shopList.map((item, index) => {
                                return <GoodsItemComp {...this.props} key={index} list={item}></GoodsItemComp>
                            })
                        }
                    </div>
                    <div className='baseLine'>我也是有底线滴~~~</div>
                </section>
            </Fragment>
        )
    }
    componentDidMount () {
        // getGoodsChannel接口，获取showList数据
        $http.post('/getGoodsChannel', {
            params: 'showList'
        })
        .then(res => {
            this.setState({
                showList: res.list
            })
        })

        // getGoodsChannel接口，获取shopList数据
        $http.post('/getGoodsChannel', {
            params: 'shopList',
            goods_id: this.state.goods_id
        })
        .then(res => {
            this.state.shopList.push(res);
            this.setState({
                shopList: this.state.shopList
            })
        })
    }
}

export default Home;