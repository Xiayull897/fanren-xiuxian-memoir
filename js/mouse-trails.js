/**
 * 鼠标粒子拖尾
 * — 独立Canvas 2D叠加层，金色渐变拖尾粒子
 */
window.MouseTrails = (function() {
  var canvas, ctx, rafId;
  var particles = [];
  var MAX_PARTICLES = 60;
  var enabled = false;
  var width, height;

  function init() {
    canvas = document.getElementById('trails-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    enabled = true;
    animate();
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  function onMouseMove(e) {
    if (!enabled) return;
    spawnParticle(e.clientX, e.clientY);
  }

  function onTouchMove(e) {
    if (!enabled || e.touches.length === 0) return;
    spawnParticle(e.touches[0].clientX, e.touches[0].clientY);
  }

  function spawnParticle(x, y) {
    particles.push({
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8 - 1,
      size: 1.5 + Math.random() * 3,
      life: 1,
      decay: 0.012 + Math.random() * 0.02
    });

    if (particles.length > MAX_PARTICLES) {
      particles.shift();
    }
  }

  function animate() {
    rafId = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, width, height);

    for (var i = particles.length - 1; i >= 0; i--) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;

      if (p.life <= 0) {
        particles.splice(i, 1);
        continue;
      }

      var alpha = p.life * 0.55;
      var size = p.size * p.life;

      var grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size);
      grad.addColorStop(0, 'rgba(232, 212, 139, ' + alpha + ')');
      grad.addColorStop(0.4, 'rgba(201, 168, 76, ' + (alpha * 0.6) + ')');
      grad.addColorStop(1, 'rgba(201, 168, 76, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function setEnabled(val) {
    enabled = val;
  }

  return {
    init: init,
    setEnabled: setEnabled
  };
})();
