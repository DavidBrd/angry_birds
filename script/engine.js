var Engine = function () {
    this.bodies = [];
	this.estFini = false;
};


Engine.prototype.addBody = function (b) {
    this.bodies.push(b);
};


Engine.prototype.getEstFini = function() {
	return this.estFini;
};


Engine.prototype.removeBody = function (b) {
    var i = this.bodies.findIndex (function (e) { return e == b; });
    if (i >= 0)
	this.bodies.splice(i, 1);
};

Engine.prototype.getMissile = function() {
    console.log(this.bodies.length);
    for(let i = 0; i < this.bodies.length; i++) {
        console.log(i);
        if(this.bodies[i].isMissile)
            return this.bodies[i];
        else{
            return null;
        }
    }
}

Engine.prototype.update = function (dt) {

    for (var i = 0; i < this.bodies.length; i ++) {

        var body = this.bodies[i];
        
        // On regarde si avec une telle vitesse il peut y avoir collision avec les autres objets.
        for (var j = i+1; j < this.bodies.length; j++) {

            var otherBody = this.bodies[j];
			
            var res = body.collision(otherBody);

            if (res != null) {
				
				// condition de victoire
				if ((body.isTarget && otherBody.isMissile) || (body.isMissile && otherBody.isTarget)) {
					console.log("Victoire");
					this.estFini = true;
				}
				
                // mise à jour des vitesses
                body.velocity = res.velocity1;
                otherBody.velocity = res.velocity2;

            }
        };


        if (Number.isFinite(body.mass))
			body.force = body.force.add(Constants.gravity.mult(body.mass));


        // On calcule la nouvelle accéleration :
        var a = body.force.mult(body.invMass);
        body.force = Vector.ZERO;
        var delta_v = a.mult(dt);
        body.velocity = body.velocity.add(delta_v);


        // On met à jour la position.
        body.move(body.velocity.mult(dt));
		

    };

};

