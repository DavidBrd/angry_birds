class Level {
	constructor() {}

	load_level(engine, ctx) {

		var xhr = new XMLHttpRequest();

		xhr.addEventListener("readystatechange", function() {

			if(xhr.readyState == 4) {

				var level = JSON.parse(xhr.responseText);
				for (let i = 0; i < level[0].walls.length; i++) {
					engine.addBody(new Body(new Vector(level[0].walls[i].v_x, level[0].walls[i].v_y),
										  level[0].walls[i].width, level[0].walls[i].height, Infinity,
	                              		  false, false, ctx));
				}

				for (let i = 0; i < level[0].obstacles.length; i++) {
					engine.addBody(new Body(new Vector(level[0].obstacles[i].v_x, level[0].obstacles[i].v_y),
												  level[0].obstacles[i].width, level[0].obstacles[i].height, Infinity,
			                              		  false, false, ctx));
				}

				for (let i = 0; i < level[0].cibles.length; i++) {
					engine.addBody(new Body(new Vector(level[0].cibles[i].v_x, level[0].cibles[i].v_y),
												  level[0].cibles[i].width, level[0].cibles[i].height, Infinity,
			                              		  true, false, ctx));
				}
				engine.addBody(new Body(new Vector(level[0].projectiles[0].v_x, level[0].projectiles[0].v_y),
											  level[0].projectiles[0].width, level[0].projectiles[0].height, Infinity,
		                              		  false, true, ctx));
			}
		});

		xhr.open("GET", "level.json", true);
		xhr.send();
	}
}