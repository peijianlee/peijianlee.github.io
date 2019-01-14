import './stylus/index.styl'
import {lpj} from './data/data.js'

import Swiper from 'swiper'


var app = new Vue({
	el: '#app',
	data() {
		return {
			page: {},
			pageIndex: 0,
			userinfo: lpj['Me'],
			arrowShow: false,
			logo: "<span>i</span>csscn",
			load: "Loading..."
		}
	},
	mounted(){
		var self = this
		setTimeout(function(){
			self.page = lpj
		},2000)
		setTimeout(function(){
			self.swiperJs(self)
			self.arrowShow = true
		},5000)

	},
	methods: {
		swiperJs(that) {
			var mySwiper = new Swiper ('.swiper-container', {
				direction: 'vertical',
				autoplay: false,
				on: {
					slideChangeTransitionEnd: function() {
						that.pageIndex = this.activeIndex
					}
				}
			})
		}

	}
})