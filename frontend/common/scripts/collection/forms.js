/* FORMS */
$('.site-form').on('submit', function(event) {
	event.preventDefault();

	var $form = $(this);
	var formValid = true;
	var formData = {};
	var $fields = $form.find('input, textarea, button');

	$fields.each(function() {
		var $f = $(this);
		if (!$f.checkValue()) {
			formValid = false;
			$f.setError();
		}
		else {
			$f.removeError();
			formData[$f.attr('name')] = $f.val();
		}
	});

	if (formValid) {
		// $.ajax({
		// 	type: "POST",
		// 	url: $form.attr('action'),
		// 	data: formData,
		// 	dataType: "json",
		// 	success: function(json){
		var $openModals = $('.modal.show');
		if ($openModals.length > 0) HideModal($openModals);
		ShowModal($('#modal-form-success'));
		//$fields.attr("disabled", "disabled").css("cursor","default");
		$form[0].reset();
		// 	},
		// 	error: function(r, s, e){
		// 		ShowModal($('#modal-form-error'));
		// 	}
		// });
	}
});

/* FORM CHECKING */
$.fn.checkValue = function() {
	var $field = $(this);
	var correct = true;
	if ($field.is('[type="checkbox"]') && !$field.is(':checked')) correct = false;
	if ($field.is(':required') && !$field.val()) correct = false;
	if ($field.is(':required') && $field.data('mask') && !$field.inputmask("isComplete")) correct = false;
	return correct;
};
$.fn.setError = function() {
	var $group = $(this).closest('.form-group');
	if (!$group.hasClass('has-error')) {
		$group.addClass('has-error');
	}
	if ($group.find('.error-message').length == 0) {
		$group.append('<span class="error-message">Заполните это поле</span>');
	}
};
$.fn.removeError = function() {
	var $group = $(this).closest('.form-group');
	if ($group.hasClass('has-error')) {
		$group.removeClass('has-error');
	}
	if ($group.find('.error-message').length > 0) {
		$group.find('.error-message').remove();
	}
};