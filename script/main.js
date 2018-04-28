var init = function () {

	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext('2d');
	var engine = new Engine();
	var level = new Level();
	var vue = new Vue(engine, ctx);
	var paused = false;

	level.load_level(engine, ctx);

 	function full_refresh_draw() {
		vue.refresh_draw();
    	raf = window.requestAnimationFrame(full_refresh_draw);
 	}
 	raf = window.requestAnimationFrame(full_refresh_draw);

 	var main_force = new Vector(0, 0);
 	var main_velocity = new Vector(0, 0);
 	var v_p = document.getElementById("vertical_power");
 	var h_p = document.getElementById("horizontal_power");
 	var controller = new Controller(engine, main_force, main_velocity, v_p, h_p, paused, ctx, full_refresh_draw);

 	document.addEventListener("keydown", function(e) {
 		controller.callback(e);
 	});
 		
};

window.addEventListener("load", init);