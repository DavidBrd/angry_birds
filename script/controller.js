// Classe Controller : charger de controler toutes les intéractions de l'utilisateur
class Controller {
	constructor(engine, force, velocity, dom_vp, dom_hp, paused, ctx, full_refresh_draw) {
		this.engine = engine;
		this.main_force = force;
		this.main_velocity = velocity;
		this.dom_vp = dom_vp;
		this.dom_hp = dom_hp;
		this.paused = paused;
		this.ctx = ctx;
		this.full_refresh_draw = full_refresh_draw;
	}

	// Fonction principale du controller : écoute les événements attendu de l'utilisateur
	callback(event) {

		// si la touche "v" est pressée on augmente la force verticale
		if(event.key == 'v') {
 			if(Math.abs(this.main_force.y).toFixed(3) < 0.05) {
 				this.main_force.y -= 0.001;
 				this.main_velocity.y -= 0.01;
 			}
 			// remise à zéro lorsqu'on dépasse les 100% de puissance verticale
 			else {
 				this.main_force.y = 0;
 				this.main_velocity.y = 0;
 			}
 			// affichage du pourcentage de force verticale
 			this.dom_vp.innerHTML = Math.round(-(100*this.main_force.y/0.05)) + "%";
 		}
 		// si la touche "h" est pressée on augmente la force horizontale
 		else if(event.key == 'h') {
 			if(this.main_force.x.toFixed(3) < 0.05) {
 				this.main_force.x += 0.001;
 				this.main_velocity.x += 0.01;
 			}
 			// remise à zéro lorsqu'on dépasse les 100% de puissance horizontale
 			else {
 				this.main_force.x = 0;
 				this.main_velocity.x = 0;
 			}
 			// affichage du pourcentage de force horizontale
 			this.dom_hp.innerHTML = Math.round(100*this.main_force.x/0.05) + "%";
 		}
 		// si la touche "espace" est enfoncée
 		else if(event.keyCode == 32) {

 			// on récupère le "corps" correspondant au projectile
 			var missile = this.engine.getMissile();
 			var posX1 = missile.origin.x;
 			var posY1 = missile.origin.y;
 			// on déclenche le lancé si le corps est à la position initiale
 			if(posX1 == 75 && posY1 == 560) {
 				missile.mass = 1;
	 			missile.invMass = 1/missile.mass;
	 			missile.force = this.main_force;
	 			missile.velocity = this.main_velocity;
 			}
 			// si l'utilisateur appuie et qu'un projectile est déjà lancé,
 			// on l'annule, on supprime le projectile lancé, et on réinitialise la position
 			// pour un nouveau lancé
 			else {
 				this.engine.removeBody(missile);
 				missile = new Body(new Vector(75, 560), 30, 30, Infinity, false, true, this.ctx);
 				this.engine.addBody(missile);
 			}
 		}
 		// si la touche "p" est pressée on gère la pause du jeu
 		else if(event.key == 'p') {
 			this.paused = !this.paused;
 			if(this.paused == true) window.cancelAnimationFrame(raf);
 			else window.requestAnimationFrame(this.full_refresh_draw);
 		}
	}
}