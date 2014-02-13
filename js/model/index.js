define(function(require) {
	require("../lib/base/jquery");
	var tool = require("../lib/base/util")
	var pager = require("../lib/util/pager/page");
	var pop = require("../lib/util/dialog/dialog");
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
	pager.init({
		parent: ".pager",
		current: 1,
		item: 10,
		total: 270,
		selectChange: function() {
			this.current
		}
	});
	pop.dialog({
		title:"sdsads",
		content:$("h2"),
		copy:function(){
			alert();
		},
		copy_target:"h2"
	});
})