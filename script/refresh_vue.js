// class Vue : se charge de dessiner et faire le rendu de tous les éléments dans le canvas
class Vue {
	constructor(engine, ctx) {
		this.engine = engine;
		this.ctx = ctx;
	}

	// Modification du canvas pour afficher la victoire
	draw_finish() {
		this.ctx.font = "40px Calibri,Geneva,Arial";
		this.ctx.fillStyle = "green";
		this.ctx.fillText("Victoire", 400, 300);
	}

	// fonction principale de dessin qui dessine chacun des objets
	// et vérifie la victoire de l'utilisateur
	refresh_draw() {

		// si pas de victoire on continue de dessiner et de mettre à jour
		if(!this.engine.getEndGame()) {
			this.engine.update(1000/60);
		 	this.ctx.fillStyle = 'rgba(255,255,255,0.3)';
			this.ctx.fillRect(0, 0, 1000, 600);
			this.engine.bodies.forEach(function (b) {
				b.draw();
			});
		}
		// on appelle la fonction de dessin victoire
		else {
			this.draw_finish();
		}
	}
}