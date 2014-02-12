define(function(require) {
	require("../lib/jquery");

	require("../lib/tooltip");

	var pop = require("../lib/dialog");
	var tool = require("../lib/tool");

	$(function() {
		tool.validate();
		$(".tip").tooltip();
		$(".r-main").on("click", function() {
			codeToggle();
		});
		$(".ma-roomPic").hover(function() {
			$(this).addClass('edit');
		}, function() {
			$(this).removeClass('edit');
		}).click(function(event) {
			//upload code
		});
		$(".ma-myShare").on('click', function(event) {
			event.preventDefault();
			pop.dialog({
				title: "曹庆森",
				content: "<h2>heheheheheheh<h2>",
				ok: function() {
					this.close();
				},
				cancel: function() {
					this.time(3000);
				},
				copy: 
					[".textarea",
					function() {}
				]
			});
		});
		$(".add").on('click', function(event) {
			event.preventDefault();
			/* 增加子房间 */
			/**
			 *url 包括参数的url
			 *fn成功的回调函数
			 *datatype默认json
			 */
			too.ajax(url, fn)
		});

		//获取代码
		$("table").on('click', '.get', function(event) {
			if ($(this).text() == "申请") {
				codeToggle();
			} else {
				//popup windows
			}
		});

		//抽屉代码
		function codeToggle() {
			var $this = $(".ma-mainT-body-r");
			if (!$this.attr("open")) {
				$this.animate({
					'margin-left': '-350px'
				}, 300, function() {
					$("._copy a").zclip({
						path: "js/lib/ZeroClipboard.swf",
						copy: function() {
							//alert(dddd);
						}
					})
				}).attr("open", true).find('.j-icon').addClass('j-icon-l');

			} else {
				$this.animate({
					'margin-left': '0'
				}, 300).attr("open", false).find('.j-icon').removeClass('j-icon-l');
			}
		}
	})
});