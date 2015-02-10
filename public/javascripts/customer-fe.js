var ingredients = [];
var customerName;

var $total = $('#total');

function postAlert (data) { console.log(data); $('div#alert-box').html(data); }
function postAlertResponse (data) { console.log(data); $('div#alert-box').html(data.responseText); }

$('.checkbox').click( function () {
	var $checkbox = $(this);

	if ($checkbox.is(':checked')) {
		ingredients.push($(this).val());
		$total.text(parseFloat($total.text()) + parseFloat($checkbox.attr('price')));
	} else {
		var index = ingredients.indexOf($checkbox.val());
		if ( ~index ) ingredients.splice(index, 1);
		$total.text(parseFloat($total.text()) - parseFloat($checkbox.attr('price')));
	}
});

// Disable the submit button if no name is entered
$('#customer-name').focus( function(event) {
	$("#submit-button").prop('disabled', false);
});

$('form').submit( function(event) {
	event.preventDefault();
	var customerName = $('#customer-name').val();
	if (!customerName) return;
	console.log(ingredients);

	$.post('order', {
		customerName: customerName,
		ingredients: JSON.stringify(ingredients)
	})
	.done(postAlert)
	.error(postAlertResponse);
});
