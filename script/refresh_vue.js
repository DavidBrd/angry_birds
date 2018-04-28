class Vue {
	constructor(engine, ctx) {
		this.engine = engine;
		this.ctx = ctx;
	}

	draw_finish() {
		this.ctx.font = "40px Calibri,Geneva,Arial";
		this.ctx.fillStyle = "green";
		this.ctx.fillText("Victoire", 400, 300);
	}

	refresh_draw() {

		if(!this.engine.getEndGame()) {
			this.engine.update(1000/60);
		 	this.ctx.fillStyle = 'rgba(255,255,255,0.3)';
			this.ctx.fillRect(0, 0, 1000, 600);
			this.engine.bodies.forEach(function (b) {
				b.draw();
			});
		}
		else {
			this.draw_finish();
		}
	}
}