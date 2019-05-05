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
			load: "Loading...",
			projectItem: {
				info: false,
				left: 0,
				top: 0,
				status: {},
				showInfo: false,
				circle: {}
			}
		}
	},
	mounted(){
		this.page = lpj
		setTimeout(()=>{
			this.page = lpj
		},0)
		setTimeout(()=>{
			this.swiperJs(this)
			this.arrowShow = true
		},0)
	},
	methods: {
		swiperJs(that, lock) {
			var mySwiper = new Swiper ('.swiper-container', {
				direction: 'vertical',
				autoplay: false,
				on: {
					slideChangeTransitionEnd: function() {
						that.pageIndex = this.activeIndex
					}
				}
			})
		},
		showProject(event) {
			
			var BASE_WIDTH = 414,
				BASE_HEIGHT = 736,
				WINDOW_WIDTH = document.body.offsetWidth,
				WINDOW_HEIGHT = document.body.offsetHeight,
				ELM = event.target,
				PARENT_ELM = ELM.parentElement,
				PARENT_ELM_LOCATION = PARENT_ELM.getClientRects()[0],
				LEFT = WINDOW_WIDTH > BASE_WIDTH ? PARENT_ELM_LOCATION.x - (WINDOW_WIDTH - BASE_WIDTH) / 2 : PARENT_ELM_LOCATION.x,
				TOP = WINDOW_HEIGHT > BASE_HEIGHT ? PARENT_ELM_LOCATION.y - (WINDOW_HEIGHT - BASE_HEIGHT) / 2 : PARENT_ELM_LOCATION.y,
				HEIGHT = PARENT_ELM_LOCATION.height,
				WIDTH = PARENT_ELM_LOCATION.width

			// console.log(WINDOW_WIDTH)
			// console.log(WINDOW_HEIGHT)

			if(PARENT_ELM.getAttribute('class') === 'project-item'){
				var ITEM = PARENT_ELM.getAttribute('data-item')
				this.projectItem.info = lpj['Projects'][ITEM]
				this.projectItem.left = LEFT + 'px'
				this.projectItem.status.left = LEFT + 'px'
				this.projectItem.top = TOP + 'px'
				this.projectItem.status.top = TOP + 'px'
				this.projectItem.width = WIDTH + 'px'
				this.projectItem.status.width = WIDTH + 'px'
				this.projectItem.height = HEIGHT + 'px'
				// this.projectItem.imgFilter = 'blur(8px)'
				this.projectItem.status.height = HEIGHT + 'px'

				// 获取背景圆圈位置
				console.log(event.clientX - ((WINDOW_WIDTH - BASE_WIDTH) / 2))
				// console.log()
				this.projectItem.circle.x = WINDOW_WIDTH > BASE_WIDTH ? event.clientX - (WINDOW_WIDTH - BASE_WIDTH) / 2 : event.clientX
				this.projectItem.circle.y = WINDOW_HEIGHT > BASE_HEIGHT ? event.clientY - (WINDOW_HEIGHT - BASE_HEIGHT) / 2 : event.clientY

				setTimeout(()=>{
					this.projectItem.showInfo = true
				}, 10)
			}
		},
		hideProject(event) {
			var STATUS = this.projectItem.status
			this.projectItem.left = STATUS.left
			this.projectItem.top = STATUS.top
			this.projectItem.width = STATUS.width
			this.projectItem.height = STATUS.height
			// filter: blur(8px)
			this.projectItem.showInfo = false

			// 获取背景圆圈位置
			this.projectItem.circle.y = event.clientY
			this.projectItem.circle.x = event.clientX
			setTimeout(()=>{
				this.projectItem.info = false
			},400)
		}

	},
	computed: {
		getProjectItemInfo() {
			return this.projectItem.info
		}
	},
	watch: {
		getProjectItemInfo(info){
			if(!!info){
				setTimeout(()=>{
					this.projectItem.left = 0
					this.projectItem.top = 0
					this.projectItem.width = '100%'
					this.projectItem.height = '100%'
				},100)
			}
		}
	}
})