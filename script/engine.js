// Classe Engine qui gère tous les corps physique de l'environnement
class Engine {
    constructor() {
        this.bodies = [];
        this.endGame = false;
    }

    // Méthode permettant d'ajouter un "corps" au modèle
    addBody(b) {
        this.bodies.push(b);
    }

    // Retourne la valeur de l'attribut endGame qui gère la victoire
    getEndGame() {
        return this.endGame;
    }

    // Sensée renvoyer l'élément correpondant au projectile
    getMissile() {
        for(let i = 0; i < this.bodies.length; i++) {
            if(this.bodies[i].isMissile) return this.bodies[i];
        }
    }

    // Permet de supprimer un "corps" du modèle
    removeBody(b) {
        var i = this.bodies.findIndex (function (e) { return e == b; });
        if (i >= 0) this.bodies.splice(i, 1);
    }

    // Fonction update : qui se charge de mettre à jours les positions des "corps" du
    // modèle en prenant en compte les éventuelles collisions
    update(dt) {
        for (var i = 0; i < this.bodies.length; i ++) {

            var body = this.bodies[i];
            
            // On regarde si avec une telle vitesse il peut y avoir collision avec les autres objets.
            for (var j = i+1; j < this.bodies.length; j++) {

                var otherBody = this.bodies[j];

                var res = body.collision(otherBody);

                if (res != null) {
                    // mise à jour des vitesses
                    body.velocity = res.velocity1;
                    otherBody.velocity = res.velocity2;

                    // on regarde si le projectile touche la cible
                    if(body.isTarget) {
                        this.removeBody(body);
                        this.endGame = true;
                    }
                }
            };

            if (Number.isFinite(body.mass))
            body.force = body.force.add(Constants.gravity.mult(body.mass));

            // On calcule la nouvelle accéleration :
            var a = body.force.mult(body.invMass);
            body.force = Vector.ZERO;
            var delta_v = a.mult(dt);
            body.velocity = body.velocity.add(delta_v);

            // mise à jour de la position du body
            body.move(body.velocity.mult(dt));
        }
    }
}
