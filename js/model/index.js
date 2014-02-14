define(function(require) {
	require("../lib/base/jquery");
	var tool = require("../lib/base/util")
	var pager = require("../lib/util/pager/page");
	var pop = require("../lib/util/dialog/dialog");
	var item = require("../lib/util/item/item");
	var suggest = require("../lib/util/suggest/suggester");
	require.async("../lib/util/pieChart/chart", function() {
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
	});
	tool.copy("h2","h1",function(){alert()});
	/*pager.init({
		parent: ".pager",
		current: 1,
		item: 100,
		total: 270,
		display_num:4,
		selectChange: function() {
			console.log(this.current);
		}
	});*/
	suggest.init({
		target:"#inputDate",
		suggest:["","@163.com","@gmail.com","@qq.com","@111.com","@tetequ.com"]
	});
	item.init({
		parent:".table",
		item:{"ider":"ddd","ddd":"weqwe"},
		data:[{"ider":"12","ddd":"dasd"},{"ider":"1222","ddd":"da3sd"},{"ider":"1tt2","ddd":"dasd"},{"ider":"1tt2","ddd":"dasd"},{"ider":"122t2","ddd":"da3sd"},{"ider":"12","ddd":"dasd"},{"ider":"12","ddd":"dasd"},{"ider":"1222","ddd":"da3sd"},{"ider":"12","ddd":"dasd"},{"ider":"12","ddd":"dasd"},{"ider":"1222","ddd":"da3sd"},{"ider":"12","ddd":"dasd"},{"ider":"1222","ddd":"da3sd"},{"ider":"12","ddd":"dasd"},{"ider":"1222","ddd":"da3sd"}],
		pager:true,
		per_item:3,
		display_num:3
	});
})