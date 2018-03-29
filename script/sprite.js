var Sprite = function (v, w, h, m, dom) {
    console.log(m);
    Body.call(this,v, w, h, m);
    this.ctx = dom.getContext("2d");

};

Sprite.prototype = Object.create (Body.prototype);
Sprite.prototype.constructor = Sprite;

Sprite.prototype.draw = function () {

    this.ctx.rect(this.origin.x, this.origin.y, this.width, this.height);
    //this.ctx.stroke();
    this.ctx.fill();
    // this.ctx.style.left = this.origin.x + "px";
    // this.ctx.style.top = this.origin.y + "px";
    // this.ctx.style.width = this.width + "px";
    // this.ctx.style.height = this.height + "px";


    if (this.hasCollision) {
	this.ctx.style.backgroundColor = "red";
	this.setCollision(false);
    } else {
	this.ctx.style.backgroundColor = "";
    };

};
