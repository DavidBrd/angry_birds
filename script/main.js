var init = function () {
	
	// this.type = "mur";
	
	//this.x = 800;
	//this.y = 0;
	//this.width = 50;
	//this.height = 100;
	var level1 = exec_request();

	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext('2d');

	var wall1 = new Sprite(new Vector(level1.walls[0].v_x, level1.walls[0].v_y),
									  level1.walls[0].width, level1.walls[0].height, Infinity,
                              		  ctx);
    var wall2 = new Sprite(new Vector(level1.walls[1].v_x , level1.walls[1].v_y), 
    								  level1.walls[1].width, level1.walls[1].height, Infinity,
                             		  ctx);
    var wall3 = new Sprite(new Vector(level1.walls[2].v_x , level1.walls[2].v_y), 
    								  level1.walls[2].width, level1.walls[2].height, Infinity,
                             		  ctx);
    var wall4 = new Sprite(new Vector(level1.walls[3].v_x , level1.walls[3].v_y), 
    								  level1.walls[3].width, level1.walls[3].height, Infinity,
                             		  ctx);
    var obstacle1 = new Sprite(new Vector(level1.obstacles[0].v_x , level1.obstacles[0].v_y), 
    								  level1.obstacles[0].width, level1.obstacles[0].height, Infinity,
                             		  ctx);
	
	var engine = new Engine();
	engine.addBody(wall1);
    engine.addBody(wall2);
    engine.addBody(wall3);
    engine.addBody(wall4);
	engine.addBody(obstacle1);


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

 	function full_draw() {
 		engine.update(1000/60);
 		ctx.clearRect(0, 0, 1000, 600);
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
		var sprite = new Sprite(new Vector(x,y), 30, 30, mass, ctx);
		sprite.force = new Vector(0.01,0.01);
		engine.addBody(sprite);
	
	});
	
};

window.addEventListener("load", init);
