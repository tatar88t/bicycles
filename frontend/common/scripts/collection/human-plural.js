function humanPlural(val, formWords) {
	var v = val;
	var arrWords = [formWords[0], formWords[1], formWords[2], formWords[2], formWords[2], formWords[0], formWords[0], formWords[0], formWords[0], formWords[0]];
	return (v > 10 && v < 20) ? arrWords[0] : arrWords[v%10];
}