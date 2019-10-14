<script>
	var ga = require("@/util/ga.js")
	 
	var GoogleAnalytics = ga.GoogleAnalytics;
	
	export default {
		globalData: {  
			tracker : null,
			getTracker: function () {
				if (!this.tracker) {
					// 初始化GoogleAnalytics Tracker
					this.tracker = GoogleAnalytics.getInstance(this)
									.setAppName('小程序名称')
									.setAppVersion('小程序版本号')
									.newTracker('UA-XXXXXX-X'); //用你的 Tracking ID 代替
				
					//使用自己的合法域名做跟踪数据转发
					this.tracker.setTrackerServer("https://ga-proxy.example.com"); 
				}
				return this.tracker;
			},
        }, 
		onLaunch: function() {
			console.log('11111')
		
			
		},
		onLoad(){
			
			
		},
		onShow: function() {
			// this.$scope.tracker = null
			// this.$scope.getTracker= function () {
			// if (!this.tracker) {
			// 		// 初始化GoogleAnalytics Tracker
			// 		this.tracker = GoogleAnalytics.getInstance(this)
			// 						.setAppName('小程序名称')
			// 						.setAppVersion('小程序版本号')
			// 						.newTracker('UA-XXXXXX-X'); 

			// 		//使用自己的合法域名做跟踪数据转发
			// 		this.tracker.setTrackerServer("https://ga-proxy.example.com")
			// 	}
			// 	return this.tracker;
			// },
		
		},
		onHide: function() {
			console.log('App Hide')
		}
		
	}
</script>

<style lang="scss">
	@import './static/css/common';
	/*每个页面公共css */
	*{
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	image{will-change: transform;height: auto;}
</style>
