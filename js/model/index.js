define(function(require) {
	require("../lib/base/jquery");
	var tool = require("../lib/base/util");
	require("../lib/util/calendar/datepicker")
	//var pager = require("../lib/util/pager/page");
	var pop = require("../lib/util/dialog/dialog");
	var item = require("../lib/util/item/item");
	var suggest = require("../lib/util/suggest/suggester");
	var slider = require("../lib/util/slider/slider")
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
	tool.copy(".copy", ".word", function() {
		alert("复制成功！");
	});
	/*pager.init({
		parent: ".pager",
		current: 1,
		item: 100,
		total: 270,
		display_num:4,
		selectChange: function() {
			console.log(this.current);
		}
	});
	pager.render(870);*/
	tool.validate();

	$('.inputDate').DatePicker({
		format: 'Y-m-d',
		date: $('.inputDate').val(),
		current: $('.inputDate').val(),
		starts: 1,
		position: 'bottom',
		onBeforeShow: function() {
			$('.inputDate').DatePickerSetDate($('.inputDate').val(), true);
		},
		onChange: function(formated, dates) {
			$('.inputDate').val(formated);
		}
	});



	/*pop.dialog({
		title: "这是一个测试",
		content: $(".con"),
		ok: function() {
			alert();
		},
		copy: function() {
			this.tip();
		}
	})*/
	suggest.init({
		target: "#inputDate",
		suggest: ["", "@163.com", "@gmail.com", "@qq.com", "@111.com", "@tetequ.com"]
	});
	slider.init({
		parent: ".slider",
		min: 20,
		max: 200,
		onChange: function() {
			console.log(this.value);
		}
	});
	slider.setValue(75);
	/*item.init({
		parent:".table",
		item:{"ider":"ddd","ddd":"weqwe"},
		data:[{"ider":"12","ddd":"dasd"},{"ider":"1222","ddd":"da3sd"},{"ider":"1tt2","ddd":"dasd"},{"ider":"1tt2","ddd":"dasd"},{"ider":"122t2","ddd":"da3sd"},{"ider":"12","ddd":"dasd"},{"ider":"12","ddd":"dasd"},{"ider":"1222","ddd":"da3sd"},{"ider":"12","ddd":"dasd"},{"ider":"12","ddd":"dasd"},{"ider":"1222","ddd":"da3sd"},{"ider":"12","ddd":"dasd"},{"ider":"1222","ddd":"da3sd"},{"ider":"12","ddd":"dasd"},{"ider":"1222","ddd":"da3sd"}],
		pager:true,
		per_item:3,
		display_num:3
	});*/
})