/* PRICE FUNCTIONS */
function formatPrice(num) {
	var v = num;
	return v.toLocaleString('ru');
}
function unformatPrice(str) {
	var v = str;
	return (+v.toString().replace(/[^+\d\.]/g, ''));
}