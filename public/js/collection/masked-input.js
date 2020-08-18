/* MASKED INPUT */
$('[data-mask]').each(function() {
	var $field = $(this);
	$field.inputmask($field.data('mask'), {
		showMaskOnFocus: $field.data('show-mask-on-focus') || true,
		showMaskOnHover: false
	});
});