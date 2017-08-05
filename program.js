class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  plus(point) {
    return new Point(this.x + point.getX(), this.y + point.getY());
  }

  minus(point) {
    return new Point(this.x - point.getX(), this.y - point.getY());
  }
}

class Line {
  constructor(ctx) {
    this.ctx = ctx;
  }

  draw(start, end) {
    this.ctx.beginPath();
    this.ctx.moveTo(start.getX(), start.getY());
    this.ctx.lineTo(end.getX(), end.getY());
    this.ctx.stroke();
  }
}

class DrawablePoint {
  constructor(ctx, centerPoint) {
    this.ctx = ctx;
    this.centerPoint = centerPoint;
  }

  getPoint() {
    return this.centerPoint;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(
      this.centerPoint.getX(),
      this.centerPoint.getY(),
      2,
      0,
      Math.PI * 2,
      true
    );
    this.ctx.stroke();
  }
}

class Angle {
  constructor(angle) {
    this.angle = angle;
    this.radians = this.toRadians(angle);
    this.sin = Math.sin(this.radians);
    this.cos = Math.cos(this.radians);
  }

  getAngle() {
    return this.angle;
  }

  getRadians() {
    return this.radians;
  }

  getSin() {
    return this.sin;
  }

  getCos() {
    return this.cos;
  }

  toRadians (angle) {
    return angle * (Math.PI / 180);
  }

  rotate(point) {
    const x = point.getX() * this.getCos() - point.getY() * this.getSin();
    const y = point.getX() * this.getSin() + point.getY() * this.getCos();

    return new Point(x, y);
  }
}

class Drawer {
  constructor(ctx, delay, center, angle, start, end) {
    this.ctx = ctx;
    this.delay = delay;
    this.angle = new Angle(angle);
    this.centerPoint = new DrawablePoint(ctx, center);
    this.delta = center.minus(this.angle.rotate(center));
    this.line = new Line(ctx);
    this.start = start;
    this.end = end;
  }

  rotate() {
    const s = this.angle.rotate(this.start);
    const e = this.angle.rotate(this.end);

    this.start = this.delta.plus(s);
    this.end = this.delta.plus(e);

    this.draw()
  }

  draw() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.clientWidth, this.ctx.canvas.clientHeight);
    this.centerPoint.draw();
    this.line.draw(this.start, this.end);
  }

  animate() {
    this.rotate();
    const self = this;

    if(this.started) {
      setTimeout(function() { self.animate(); }, self.delay);
    }
  }

  startDraw() {
    this.started = true;
    this.animate()
  }

  stopDraw() {
    this.started = false;
  }
}
