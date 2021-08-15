import $ from "jquery";
$(document).ready(function () {
	var canvas = $("#lofiRain")[0];
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	if (canvas.getContext) {
		var ctx = canvas.getContext("2d");
		var w = canvas.width;
		var h = canvas.height;
		var density = 44200;
		var length = 100;
		var speed = 2;
		var jitter = 3;
		ctx.lineWidth = 12;
		ctx.lineCap = "round";


		var init = [];
		var maxParts = Math.floor(w * h / density);
		console.log(maxParts);
		var xoffset = (w + length) / (maxParts / 2);
		for (var a = 0; a < maxParts; a++) {
			var s = Math.random() * jitter;
			var doublex = (a > maxParts / 2) ? a - (maxParts / 2) : a;
			var doubleOffset = doublex * xoffset;
			init.push({
				x: doubleOffset,
				initx: doubleOffset,
				y: xoffset * Math.round(Math.random() * ((h + length) / xoffset)),
				inity: xoffset * Math.round(Math.random() * ((h + length) / xoffset)),
				l: length,
				xs: s + speed,
				ys: s + speed,
				fadeIn: 0.02,
				opacity: 0
			});
		}

		var particles = [];
		for (var b = 0; b < maxParts; b++) {
			particles[b] = init[b];
		}

		setInterval(draw, 30);

	}
	

	function draw() {
		ctx.clearRect(0, 0, w, h);
		for (var c = 0; c < particles.length; c++) {
			var p = particles[c];
			ctx.beginPath();
			ctx.moveTo(p.x, p.y);
			ctx.lineTo(p.x - p.l, p.y + p.l);
			p.opacity = Math.min(Math.max(p.opacity + p.fadeIn, 0), 1);
			ctx.strokeStyle = "rgb(31, 35, 41, " + p.opacity + ")";
			ctx.stroke();
		}
		move();
	}

	function move() {
		for (var b = 0; b < particles.length; b++) {
			var p = particles[b];
			p.x -= p.xs;
			p.y += p.ys;
			if (p.x < 0) {
				p.x = w + length;
				p.y = p.inity;
			} else if (p.y > h) {
				p.y = -length;
				p.x = p.initx;
			}
		}
	}
});