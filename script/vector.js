class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(v) {
        return new Vector(this.x + v.x, this.y + v.y );
    }

    sub(v) {
        return new Vector(this.x - v.x, this.y - v.y );
    }

    mult(k) {
        return new Vector(this.x * k, this.y * k );
    }

    dot(v) {
        return this.x * v.x + this.y * v.y;
    }

    norm() {
        return Math.sqrt(this.dot(this));
    }

    normalize() {
        return this.mult(1/this.norm ());
    }
}

Vector.ZERO = new Vector (0,0);