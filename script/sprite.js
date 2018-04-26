var Sprite = function (v, w, h, m, isTarget, dom) {
    Body.call(this,v, w, h, m, isTarget);
    this.ctx = dom;
};

Sprite.prototype = Object.create (Body.prototype);
Sprite.prototype.constructor = Sprite;

Sprite.prototype.draw = function () {

    var color = 'blue';
    if(this.isTarget) color = 'red';

    this.ctx.beginPath();
    this.ctx.rect(this.origin.x, this.origin.y, this.width, this.height);
    this.ctx.closePath();
    this.ctx.fillStyle = color;
    this.ctx.fill();


 //    if (this.hasCollision) {
	// this.ctx.style.backgroundColor = "red";
	// this.setCollision(false);
 //    } else {
	// this.ctx.style.backgroundColor = "";
 //    };

};
