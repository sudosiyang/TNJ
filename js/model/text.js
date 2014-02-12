define(function(require) {
	require("../lib/base/jquery");
	var text2 = require("../lib/base/util");
	require("../lib/util/calendar/datepicker");
	text2.copy("#ddd", ".keepme", function() {
		alert()
	});
	$('#inputDate').DatePicker({
		format: 'Y-m-d',
		date: $('#inputDate').val(),
		starts: 1,
		onBeforeShow: function() {
			$('#inputDate').DatePickerSetDate($('#inputDate').val(), true);
		},
		onChange: function(formated, dates) {
			$('#inputDate').val(formated);
			$(this).hide();
		}
	})
})