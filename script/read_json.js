// var req = new XMLHttpRequest();

// req.open("GET", "./level.json", true); 
// req.onreadystatechange = monCode;   // la fonction de prise en charge
// req.send(null); 

// function monCode() 
// { 
//    if (req.readyState == 4) 
//    { 
//         var doc = eval('(' + req.responseText + ')'); 
//    }
// }

var level = [];

function exec_request () {

	var xhr = new XMLHttpRequest();

	xhr.addEventListener("readystatechange", function() {
		console.log(xhr.readyState);
		console.log(xhr.status);

		if(xhr.readyState == 4) {

			level = JSON.parse(this.responseText);
		}
	});

	xhr.open("GET", "level.json", true);
	xhr.send();
}

exec_request();





// var monObstacle = {};
// monObstacle.v_x = doc.vector.v_x;
// monObstacle.v_y = doc.vector.v_y;
// monObstacle.width = doc.width;
// monObstacle.height = doc.heigth;
// monObstacle.masse = doc.masse;

// console.log(monObstacle);

// var monObstacle = {};
// monObstacle.v_x = obstacle.v_x;
// monObstacle.v_y = obstacle.v_y;