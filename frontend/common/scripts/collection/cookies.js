function setCookie(cname, cvalue, days) {
	var d = new Date();
	d.setTime(d.getTime() + (days*24*60*60*1000));
	var expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
	var value = "; " + document.cookie;
	var parts = value.split("; " + cname + "=");
	if (parts.length == 2) return parts.pop().split(";").shift();
}