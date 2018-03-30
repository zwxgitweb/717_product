import Swiper from 'swiper';
import React, { Component } from 'react';
const path = require('path');

import 'swiper/dist/css/swiper.min.css'
import 'swiper/dist/js/swiper.js'

class SwiperComp extends Component {
    render () {
        let { srcs } = this.props;
        return (
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    {
                        srcs.map((item, index) => {
                            return <div key={index} className="swiper-slide"><img src={item}/></div>
                        })
                    }
                </div>
            </div>
        )
    }
    componentDidMount () {
        new Swiper('.swiper-container', {
            autoplay: true,
            loop: true
        })
    }
}

export default SwiperComp;