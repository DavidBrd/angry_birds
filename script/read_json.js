var level;

function exec_request () {

	var xhr = new XMLHttpRequest();

	xhr.addEventListener("readystatechange", function() {

		if(xhr.readyState == 4) {

			level = JSON.parse(xhr.responseText);
		}
	});

	xhr.open("GET", "level.json", true);
	xhr.send();
	return level;
}

exec_request();
