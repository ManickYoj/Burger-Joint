$('.complete-order').click( function(event) {
	event.preventDefault();
	console.log($(this).val());

	$.post('kitchen', {
		id: $(this).val()
	})

	.done(function (data, status) {
		$('#'+data.id).remove();
	});
});