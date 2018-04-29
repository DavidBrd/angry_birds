class Body extends Rect {
	constructor(v, w, h, m, isTarget, isMissile, dom) {
		super(v, w, h);
	    this.mass = m || 0;
	    this.invMass = 1/this.mass;
	    this.velocity = Vector.ZERO;
	    this.force = Vector.ZERO;
	    this.hasCollision = false;
	    this.isTarget = isTarget;
	    this.isMissile = isMissile;
	    this.ctx = dom;
	    this.isTouched = false;
	    this.hysteresis = 0.02;
	}

	setCollision(b) {
		this.hasCollision = b;	
	}

	draw() {
		var color = 'blue';
	    if(this.isTarget) color = 'red';
	    if(this.isMissile) color = 'green';

	    this.ctx.beginPath();
	    this.ctx.rect(this.origin.x, this.origin.y, this.width, this.height);
	    this.ctx.closePath();
	    this.ctx.fillStyle = color;
	    this.ctx.fill();

	    if (this.hasCollision) {
			this.setCollision(false);
		}
	}

	collision(b) {
		var mdiff = this.mDiff(b);
    	if (mdiff.hasOrigin()) {

			var vectors = [ new Vector (0,mdiff.origin.y),
					new Vector (0,mdiff.origin.y+mdiff.height),
					new Vector (mdiff.origin.x, 0),
					new Vector (mdiff.origin.x + mdiff.width, 0) ];

			var n = vectors[0];

			for (var i = 1; i < vectors.length; i++) {
			    if (vectors[i].norm() < n.norm())
				n = vectors[i];
			};

			var norm_v = this.velocity.norm();
			var norm_vb = b.velocity.norm();
			var kv = norm_v / (norm_v + norm_vb);
			var kvb = norm_vb / (norm_v + norm_vb);

			if (norm_v == 0 && norm_vb == 0) {
			    if (this.invMass == 0 && this.invMass == 0)
				return null;
			    else {
				if (this.mass <= b.mass)
				    kv = 1;
				else
				    kvb = 1
			    }

			};

			this.move(n.mult(kv));
			b.move(n.mult(-kvb));

			n = n.normalize();

	        // On calcule l'impulsion j :
	        var v = this.velocity.sub(b.velocity);
	        var e = Constants.elasticity; // pour les étudiants, juste faire var e = 1;

	        var j = -(1 + e) * v.dot(n) / (this.invMass + b.invMass);

	        // On calcule les nouvelles vitesses:
	        var new_v = this.velocity.add(n.mult(j  * this.invMass));
	        var new_bv = b.velocity.sub(n.mult(j * b.invMass));

			b.setCollision(true);
			this.setCollision(true);

			// Ajout hysteresis
			if(Math.abs(new_bv.x) < this.hysteresis && Math.abs(new_bv.y) < this.hysteresis) {
				new_bv = new Vector(0, 0);
			}

		    return { velocity1 : new_v, velocity2 : new_bv };

    	} else {
        	return null;
    	}
	}
}