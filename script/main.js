var init = function () {
	
	// this.type = "mur";
	
	//this.x = 800;
	//this.y = 0;
	//this.width = 50;
	//this.height = 100;

	var canvas = document.getElementById("canvas");

	var wall1 = new Sprite(new Vector(0,0), 1000, 10, Infinity,
                             canvas);
    var wall2 = new Sprite(new Vector(0,599), 1000, 10, Infinity,
                             canvas);
    var wall3 = new Sprite(new Vector(0,0), 10, 600, Infinity,
                             canvas);
    var wall4 = new Sprite(new Vector(999,0), 10, 600, Infinity,
                             canvas);
	var obj = new Sprite(new Vector(650,350), 100, 250, Infinity,
                             canvas);
	
	var engine = new Engine();
	engine.addBody(wall1);
    engine.addBody(wall2);
    engine.addBody(wall3);
    engine.addBody(wall4);
	engine.addBody(obj);


    var renderer = new Renderer(engine);
    var interval;
    interval = setInterval(function () {
	try {
            renderer.update(1000/60);
	} catch (e) {
	    clearInterval(interval);
	    throw (e);
	}
    }, 1000/60);
    
    
    var canvas = document.getElementById("canvas");

    canvas.addEventListener("click", function (ev) {
	if (this != ev.target) return;


	var x = 75;
	var y = 500;

	var mass = 1;
	var div = document.createElement("div");
	div.className = "object";
	var sprite = new Sprite(new Vector(x,y), 30, 30, mass, div);
	sprite.force = new Vector(0.01,0.01);
	canvas.appendChild(div);
	engine.addBody(sprite);

	
	});
	
};

window.addEventListener("load", init);
