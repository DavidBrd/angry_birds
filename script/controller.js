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

	callback(event) {
		if(event.key == 'v') {
 			if(Math.abs(this.main_force.y).toFixed(3) < 0.05) {
 				this.main_force.y -= 0.001;
 				this.main_velocity.y -= 0.01;
 			}
 			else {
 				this.main_force.y = 0;
 				this.main_velocity.y = 0;
 			}
 			this.dom_vp.innerHTML = Math.round(-(100*this.main_force.y/0.05)) + "%";
 		}
 		else if(event.key == 'h') {
 			if(this.main_force.x.toFixed(3) < 0.05) {
 				this.main_force.x += 0.001;
 				this.main_velocity.x += 0.01;
 			}
 			else {
 				this.main_force.x = 0;
 				this.main_velocity.x = 0;
 			}
 			this.dom_hp.innerHTML = Math.round(100*this.main_force.x/0.05) + "%";
 		}
 		else if(event.keyCode == 32) {
	 		var x = 75;
			var y = 500;
			var mass = 1;
			var sprite = new Body(new Vector(x,y), 30, 30, mass, false, true, this.ctx);

			sprite.force = this.main_force;
			sprite.velocity = this.main_velocity;
			this.engine.addBody(sprite);	
 		}
 		else if(event.key == 'p') {
 			this.paused = !this.paused;
 			if(this.paused == true) window.cancelAnimationFrame(raf);
 			else window.requestAnimationFrame(this.full_refresh_draw);
 		}
	}
}