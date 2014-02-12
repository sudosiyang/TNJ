define(function(require) {
	require("../lib/base/jquery");
	var tool=require("../lib/base/util")
	var pager=require("../lib/util/pager/page");
	pager.init({
		parent:".pager",
		current:11,
		item:10,
		total:270
	});
})