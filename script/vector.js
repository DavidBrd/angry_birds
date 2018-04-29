// class Vector : défini des vecteurs de deux coordonnées pour représenté position, vitesse, force....
class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // addition entre deux vecteurs
    add(v) {
        return new Vector(this.x + v.x, this.y + v.y );
    }

    // soustraction entre deux vecteurs
    sub(v) {
        return new Vector(this.x - v.x, this.y - v.y );
    }

    // multiplication de deux vecteurs
    mult(k) {
        return new Vector(this.x * k, this.y * k );
    }

    // produit scalaire
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }

    // calcul de la norme d'un vecteur
    norm() {
        return Math.sqrt(this.dot(this));
    }

    // fonction de normalisation
    normalize() {
        return this.mult(1/this.norm ());
    }
}

// vecteur null
Vector.ZERO = new Vector (0,0);