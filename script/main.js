function exec_request (engine, ctx) {

	var xhr = new XMLHttpRequest();
	var proj;

	xhr.addEventListener("readystatechange", function() {

		if(xhr.readyState == 4) {

			level = JSON.parse(xhr.responseText);
			for (let i = 0; i < level[0].walls.length; i++) {
				engine.addBody(new Sprite(new Vector(level[0].walls[i].v_x, level[0].walls[i].v_y),
									  level[0].walls[i].width, level[0].walls[i].height, Infinity,
                              		  false, false, ctx));
			}

			for (let i = 0; i < level[0].obstacles.length; i++) {
				engine.addBody(new Sprite(new Vector(level[0].obstacles[i].v_x, level[0].obstacles[i].v_y),
											  level[0].obstacles[i].width, level[0].obstacles[i].height, Infinity,
		                              		  false, false, ctx));
			}

			for (let i = 0; i < level[0].cibles.length; i++) {
				engine.addBody(new Sprite(new Vector(level[0].cibles[i].v_x, level[0].cibles[i].v_y),
											  level[0].cibles[i].width, level[0].cibles[i].height, Infinity,
		                              		  true, false, ctx));
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
	var paused = false;

	exec_request(engine, ctx);
	// var missile = new Sprite(new Vector(75, 500), 30, 30, Infinity, false, true, ctx);
	// engine.addBody(missile);

	// console.log(engine.bodies);
	// mis = engine.getMissile();
	// console.log(mis);

 	function full_refresh_draw() {
		if (engine.getEstFini() == true) {
			//ctx.clearRect(0, 0, 1000, 600);
			ctx.font = "40px Calibri,Geneva,Arial";
			ctx.fillStyle = "black";
			ctx.fillText("Victoire", 400, 300);
		} else {
			engine.update(1000/60);
			ctx.fillStyle = 'rgba(255,255,255,0.3)';
			ctx.fillRect(0, 0, 1000, 600);
			engine.bodies.forEach(function (b) {
				b.draw();
			});
			raf = window.requestAnimationFrame(full_refresh_draw);
		}
 		
 	}

 	raf = window.requestAnimationFrame(full_refresh_draw);

 	var main_force = new Vector(0, 0);
 	var main_velocity = new Vector(0, 0);
 	var v_p = document.getElementById("vertical_power");
 	var h_p = document.getElementById("horizontal_power");
 	document.addEventListener("keydown", function(e) {

 		if(e.key == 'v' && Math.abs(main_force.y).toFixed(3) < 0.05) {
 			main_force.y -= 0.001;
 			main_velocity.y -= 0.01;
 			v_p.innerHTML = Math.round(-(100*main_force.y/0.05)) + "%";
 		}
 		else if(e.key == 'h' && main_force.x.toFixed(3) < 0.05) {
 			main_force.x += 0.001;
 			main_velocity.x += 0.01;
 			h_p.innerHTML = Math.round(100*main_force.x/0.05) + "%";
 		}
 		else if(e.keyCode == 32) {
	 		var x = 75;
			var y = 500;
			var mass = 1;
			var sprite = new Sprite(new Vector(x,y), 30, 30, mass, false, true, ctx);

			sprite.force = main_force;
			sprite.velocity = main_velocity;
			engine.addBody(sprite);	
 		}
 		else if(e.key == 'p') {
 			paused = !paused;
 			if(paused == true) window.cancelAnimationFrame(raf);
 			else window.requestAnimationFrame(full_refresh_draw);
 		}
  	});	
};

window.addEventListener("load", init);