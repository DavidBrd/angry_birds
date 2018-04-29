// class Level : qui va permettre de charger les éléments du niveau via lecture d'un
// fichier JSON
class Level {
	constructor() {}

	// Fonction principale de la classe Level
	// effectue la requête AJAX pour lire le fichier JSON
	load_level(engine, ctx) {

		var xhr = new XMLHttpRequest();

		xhr.addEventListener("readystatechange", function() {

			if(xhr.readyState == 4 && xhr.status == 200) {

				var level = JSON.parse(xhr.responseText);
				// Chargement des éléments correspondant aux murs
				for (let i = 0; i < level[0].walls.length; i++) {
					engine.addBody(new Body(new Vector(level[0].walls[i].v_x, level[0].walls[i].v_y),
										  level[0].walls[i].width, level[0].walls[i].height, Infinity,
	                              		  false, false, ctx));
				}

				// Chargement des éléments correspondant aux obstacles
				for (let i = 0; i < level[0].obstacles.length; i++) {
					engine.addBody(new Body(new Vector(level[0].obstacles[i].v_x, level[0].obstacles[i].v_y),
												  level[0].obstacles[i].width, level[0].obstacles[i].height, Infinity,
			                              		  false, false, ctx));
				}

				// Chargement des éléments correspondant aux cibles
				for (let i = 0; i < level[0].cibles.length; i++) {
					engine.addBody(new Body(new Vector(level[0].cibles[i].v_x, level[0].cibles[i].v_y),
												  level[0].cibles[i].width, level[0].cibles[i].height, Infinity,
			                              		  true, false, ctx));
				}

				// Chargement du projectile (position initiale)
				engine.addBody(new Body(new Vector(level[0].projectile.v_x, level[0].projectile.v_y),
											  level[0].projectile.width, level[0].projectile.height, Infinity,
		                              		  false, true, ctx));
			}
		});

		xhr.open("GET", "level.json", true);
		xhr.send();
	}
}