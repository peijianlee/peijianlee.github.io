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
				showInfo: false
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
				autoplay: true,
				on: {
					slideChangeTransitionEnd: function() {
						that.pageIndex = this.activeIndex
					}
				}
			})
		},
		showProject(event) {
			// console.log(event)parent  
			// var PARENT_ELM = event.target.getAttribute("id")
			var ELM = event.target,
				PARENT_ELM = ELM.parentElement,
				PARENT_ELM_LOCATION = PARENT_ELM.getClientRects()[0],
				LEFT = PARENT_ELM_LOCATION.x,
				TOP = PARENT_ELM_LOCATION.y,
				HEIGHT = PARENT_ELM_LOCATION.height,
				WIDTH = PARENT_ELM_LOCATION.width

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

				setTimeout(()=>{
					console.log('1111')
					this.projectItem.showInfo = true
				}, 4000)
			}
		},
		hideProject() {
			var STATUS = this.projectItem.status
			this.projectItem.left = STATUS.left
			this.projectItem.top = STATUS.top
			this.projectItem.width = STATUS.width
			this.projectItem.height = STATUS.height
			// filter: blur(8px)
			this.projectItem.showInfo = false
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
					this.projectItem.bgColor = '#fff'
				},100)
			}
		}
	}
})