function load_sprites(engine, ctx) {

	var level1 = exec_request();

	for (let i = 0; i < level1.walls.length; i++) {
		engine.addBody(new Sprite(new Vector(level1.walls[i].v_x, level1.walls[i].v_y),
									  level1.walls[i].width, level1.walls[i].height, Infinity,
                              		  false, ctx));
	}

	for (let i = 0; i < level1.obstacles.length; i++) {
		engine.addBody(new Sprite(new Vector(level1.obstacles[i].v_x, level1.obstacles[i].v_y),
									  level1.obstacles[i].width, level1.obstacles[i].height, Infinity,
                              		  false, ctx));
	}

	for (let i = 0; i < level1.cibles.length; i++) {
		engine.addBody(new Sprite(new Vector(level1.cibles[i].v_x, level1.cibles[i].v_y),
									  level1.cibles[i].width, level1.cibles[i].height, Infinity,
                              		  true, ctx));
	}
}

var init = function () {

	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext('2d');
	var engine = new Engine();

	load_sprites(engine, ctx);

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

	canvas.addEventListener("click", function (ev) {
		if (this != ev.target) return;

		var x = 75;
		var y = 500;
		var mass = 1;
		var sprite = new Sprite(new Vector(x,y), 30, 30, mass, false, ctx);

		sprite.force = new Vector(0.01,0.01);
		engine.addBody(sprite);	
	});
	
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