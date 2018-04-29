// class Rect : défini la nature de base de nos objets (propriété pour faire des rectangles)
class Rect {
	constructor(v, w, h) {
		this.origin = v;
	    Object.defineProperty ( this, "width", { writable: false, value : w });
	    Object.defineProperty ( this, "height", { writable: false, value : h });
	}

	// fonction qui va modifier le vecteur de position pour déplacer les objets
	move(v) {
		this.origin = this.origin.add(v);	
	}

	// fonction qui calcul la soustraction de Minkowski entre le rectangle courant et "r"
	mDiff(r) {
		var orig = new Vector (r.origin.x - this.origin.x - this.width,
		r.origin.y - this.origin.y - this.height);
    	return new Rect(orig, this.width + r.width, this.height + r.height);
	}

	// fonction qui renvoie "true" si le point (0,0) est contenu dans le rectangle courant
	hasOrigin() {
		return (this.origin.x < 0 && this.origin.x + this.width > 0)
		&& (this.origin.y < 0 && this.origin.y + this.height > 0);
	}
}
