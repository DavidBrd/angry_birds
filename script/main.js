function exec_request (engine, ctx) {

	var xhr = new XMLHttpRequest();

	xhr.addEventListener("readystatechange", function() {

		if(xhr.readyState == 4) {

			level = JSON.parse(xhr.responseText);
			for (let i = 0; i < level[0].walls.length; i++) {
				engine.addBody(new Sprite(new Vector(level[0].walls[i].v_x, level[0].walls[i].v_y),
									  level[0].walls[i].width, level[0].walls[i].height, Infinity,
                              		  false, ctx));
			}

			for (let i = 0; i < level[0].obstacles.length; i++) {
				engine.addBody(new Sprite(new Vector(level[0].obstacles[i].v_x, level[0].obstacles[i].v_y),
											  level[0].obstacles[i].width, level[0].obstacles[i].height, Infinity,
		                              		  false, ctx));
			}

			for (let i = 0; i < level[0].cibles.length; i++) {
				engine.addBody(new Sprite(new Vector(level[0].cibles[i].v_x, level[0].cibles[i].v_y),
											  level[0].cibles[i].width, level[0].cibles[i].height, Infinity,
		                              		  true, ctx));
			}
		}
	});

	xhr.open("GET", "level.json", true);
	xhr.send();
}

var init = function () {

	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext('2d');
	var engine = new Engine();

	exec_request(engine, ctx);

 	function full_draw() {
 		engine.update(1000/60);
 		ctx.fillStyle = 'rgba(255,255,255,0.3)';
 		ctx.fillRect(0, 0, 1000, 600);
    	engine.bodies.forEach(function (b) {
        	b.draw();
    	});
    	raf = window.requestAnimationFrame(full_draw);
 	}

 	raf = window.requestAnimationFrame(full_draw);

 	var main_force = new Vector(0, 0);
 	var v_p = document.getElementById("vertical_power");
 	var h_p = document.getElementById("horizontal_power");
 	document.addEventListener("keydown", function(e) {

 		if(e.key == 'v' && Math.abs(main_force.y).toFixed(3) < 0.05) {
 			main_force.y -= 0.001;
 			v_p.innerHTML = Math.round(-(100*main_force.y/0.05)) + "%";
 		}
 		else if(e.key == 'h' && main_force.x.toFixed(3) < 0.05) {
 			main_force.x += 0.001;
 			h_p.innerHTML = Math.round(100*main_force.x/0.05) + "%";
 		}
 		else if(e.keyCode == 32) {
	 		var x = 75;
			var y = 500;
			var mass = 1;
			var sprite = new Sprite(new Vector(x,y), 30, 30, mass, false, ctx);

			sprite.force = main_force;
			engine.addBody(sprite);	
 		}
  	});

	// canvas.addEventListener("click", function (ev) {
	// 	if (this != ev.target) return;

	// 	var x = 75;
	// 	var y = 500;
	// 	var mass = 1;
	// 	var sprite = new Sprite(new Vector(x,y), 30, 30, mass, false, ctx);

	// 	sprite.force = main_force;
	// 	engine.addBody(sprite);	
	// });
	
};

window.addEventListener("load", init);


    //var renderer = new Renderer(engine);
 //    var interval;
 //    interval = setInterval(function () {
	// try {
 //            renderer.update(1000/60, ctx);
	// } catch (e) {
	//     clearInterval(interval);
	//     throw (e);
	// }
 //    }, 1000/60);