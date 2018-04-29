// Fonction principale du programme
var init = function () {

	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext('2d');
	var engine = new Engine();
	var level = new Level();
	var vue = new Vue(engine, ctx);
	var paused = false;

	// appel de la fonction qui charge les éléments du niveau
	level.load_level(engine, ctx);

	// fonction qui appelle les fonctions chargées de dessiner les objets du niveau
	// avec plus ou moins 60 fps
 	function full_refresh_draw() {
		vue.refresh_draw();
    	raf = window.requestAnimationFrame(full_refresh_draw);
 	}
 	raf = window.requestAnimationFrame(full_refresh_draw);

 	var main_force = new Vector(0, 0);
 	var main_velocity = new Vector(0, 0);
 	var v_p = document.getElementById("vertical_power");
 	var h_p = document.getElementById("horizontal_power");
 	// Création du controller qui va permettre l'interaction au sein du programme
 	var controller = new Controller(engine, main_force, main_velocity, v_p, h_p, paused, ctx, full_refresh_draw);

 	document.addEventListener("keydown", function(e) {
 		// appel de la fonction principale du controller
 		controller.callback(e);
 	});
 		
};

// Lancement de la fonction principale "init" lors du chargement de la page
window.addEventListener("load", init);