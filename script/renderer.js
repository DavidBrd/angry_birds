var Renderer = function (e) {
    this.engine = e;
};


Renderer.prototype.update = function (dt, ctx) {

    this.engine.update(dt);
    ctx.clearRect(0, 0, 1000, 600);
    this.engine.bodies.forEach(function (b) {
        b.draw();
        raf = window.requestAnimationFrame(this.update);
    });
};
