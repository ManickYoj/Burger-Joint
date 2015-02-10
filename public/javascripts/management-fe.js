$("#ingredient-rows").on('click', '.delete-button', function (event) {
	event.preventDefault();
	var button = $(this);

	$.post("ingredients/delete", {
		name: button.val()
	}).done( function (data, status) {
		button.closest('.ingredient-row').remove();
	});
});

$("#ingredient-rows").on('click', '.oos-button', function (event) {
	event.preventDefault();
	var button = $(this);

	$.post("ingredients/outOfStock", {
		name: button.val()
	}).done( function (data, status) {
		button.parent().siblings('.quantity').html('0');
		button.prop("disabled", true);
		$('.alert').remove();
	});
});

$("#add-form").submit(function (event) {
	event.preventDefault();
	var $form = $(this);

	$.post("ingredients/add", {
		qty: $form.find("[name='qty']").val(),
		price: $form.find("[name='price']").val(),
		name: $form.find("[name='name']").val()

	}).done(function (data, status) {
		// Create new element with a fading success background
		$(data).prependTo('#ingredient-rows')
			   .addClass('bg-success')
			   .removeClass('bg-success', 1000, 'easeInOutQuart');
		$('.alert').remove();

	}).error( function (data, status) {

		// Post alert on failure
		$('#alert-box').html(data.responseText);
	});
});

$('.ingredient-edit-row').submit( function (event) {
	event.preventDefault();
	var $form = $(this);
	var $dispParent = $form.siblings('.row');

	$.post("ingredients/edit", {
		previous_name: $dispParent.find(".name").html(),
		qty: $form.find("[name='qty']").val(),
		price: $form.find("[name='price']").val(),
		name: $form.find("[name='name']").val()

	}).done(function (data, status) {
		// Update display values
		$dispParent.find('.quantity').html(data.quantity);
		$dispParent.find('.price').html('$' + data.price);
		$dispParent.find('.name').html(data.name);
		$dispParent.find('.oos-button').prop("disabled", (data.quantity<=0));

		// Hide edit form and modify it's values
		$form.find('.collapse').collapse('hide');
		$form.find('.quantity').val(data.quantity);
		$form.find('.price').val(data.price);
		$form.find('.name').val(data.name);

		$('.alert').remove();

	}).error( function (data, status) {
		// Post alert on failure
		$('#alert-box').html(data.responseText);
	});
});
