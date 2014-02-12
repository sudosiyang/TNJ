define(function(require) {
	require("../lib/base/jquery");
	require("../lib/util/pieChart/chart");
	require("../lib/util/tooltip/tip");
	$('.chart').easyPieChart({
		easing: 'easeOutBounce',
		onStep: function(from, to, percent) {
			$(this.el).find('.percent').text(Math.round(percent));
		},
		lineCap: "butt",
		size: 150,
		lineWidth: 20,
		barColor: "#e66e1e",
		scaleColor: false
	});
	$(".help").tooltip();
	//早中晚banner
	var date = new Date;
	var hour = date.getHours();
	var list = [
		["上午好", "每一天，努力让梦想更近一些","morning"],
		["下午好", "喝杯茶吧，让精神抖擞起来","noon"],
		["晚上好", "night"]
	],nowTime;
	if (hour > 6 && hour < 12) {
		nowTime=0;
	} else if ( hour < 18) {
		nowTime=1;
	} else {
		nowTime=2;
	}
	$(".headerF-b").css({"background":"url(images/"+list[nowTime][2]+".jpg) no-repeat center"}).find(".welcome2").text(list[nowTime][1]).prev().find("span").text(list[nowTime][0]);
	//修改
	$(".roomList li").hover(function(){
		$(this).addClass('hover')
	},function(){
		$(this).removeClass('hover')
	});
})