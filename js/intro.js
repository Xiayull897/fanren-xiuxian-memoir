/**
 * Canvas 2D 流体粒子入口动画
 * — metaball流体 + 流动粒子 + 鼠标交互
 */
window.IntroAnimation = (function() {
  var canvas, ctx, rafId;
  var particles = [];
  var metaballs = [];
  var mouse = { x: -999, y: -999, tx: 0, ty: 0 };
  var mouseTrail = [];
  var time = 0;
  var width, height;

  var COLORS = ['#c9a84c', '#8b5cf6', '#2d8a56', '#4a6fa5', '#d4e5f7'];
  var PARTICLE_COUNT = 80;
  var METABALL_COUNT = 6;
  var TRAIL_LENGTH = 40;

  function init() {
    canvas = document.getElementById('intro-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    resize();
    window.addEventListener('resize', resize);
    canvas.parentElement.addEventListener('mousemove', onMouseMove);
    canvas.parentElement.addEventListener('touchmove', onTouchMove, { passive: true });

    // 创建metaballs
    for (var i = 0; i < METABALL_COUNT; i++) {
      metaballs.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 60 + Math.random() * 120,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        color: COLORS[Math.floor(Math.random() * COLORS.length)]
      });
    }

    // 创建流动粒子
    for (var j = 0; j < PARTICLE_COUNT; j++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 1 + Math.random() * 2.5,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        life: Math.random(),
        decay: 0.002 + Math.random() * 0.003
      });
    }

    animate();
  }

  function resize() {
    var overlay = document.getElementById('intro-overlay');
    width = overlay.clientWidth;
    height = overlay.clientHeight;
    canvas.width = width;
    canvas.height = height;
  }

  function onMouseMove(e) {
    mouse.tx = e.clientX;
    mouse.ty = e.clientY;
  }

  function onTouchMove(e) {
    if (e.touches.length > 0) {
      mouse.tx = e.touches[0].clientX;
      mouse.ty = e.touches[0].clientY;
    }
  }

  function animate() {
    rafId = requestAnimationFrame(animate);
    time += 0.016;

    // 平滑鼠标
    mouse.x += (mouse.tx - mouse.x) * 0.08;
    mouse.y += (mouse.ty - mouse.y) * 0.08;

    // 更新鼠标拖尾
    if (mouse.x > 0 && mouse.y > 0) {
      mouseTrail.push({ x: mouse.x, y: mouse.y, age: 0 });
      if (mouseTrail.length > TRAIL_LENGTH) mouseTrail.shift();
    }

    ctx.clearRect(0, 0, width, height);

    // 绘制metaballs
    ctx.globalCompositeOperation = 'lighter';
    for (var i = 0; i < METABALL_COUNT; i++) {
      var mb = metaballs[i];
      mb.x += mb.vx;
      mb.y += mb.vy + Math.sin(time * 0.7 + i) * 0.15;
      if (mb.x < -mb.r) mb.x = width + mb.r;
      if (mb.x > width + mb.r) mb.x = -mb.r;
      if (mb.y < -mb.r) mb.y = height + mb.r;
      if (mb.y > height + mb.r) mb.y = -mb.r;

      var grad = ctx.createRadialGradient(mb.x, mb.y, 0, mb.x, mb.y, mb.r);
      grad.addColorStop(0, mb.color);
      grad.addColorStop(0.5, mb.color + '88');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(mb.x, mb.y, mb.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // 绘制流动粒子
    for (var j = 0; j < PARTICLE_COUNT; j++) {
      var p = particles[j];
      p.life -= p.decay;
      if (p.life <= 0) {
        p.x = Math.random() * width;
        p.y = Math.random() * height;
        p.life = 1;
      }

      // 被metaballs吸引
      var fx = 0, fy = 0;
      for (var k = 0; k < METABALL_COUNT; k++) {
        var mb2 = metaballs[k];
        var dx = mb2.x - p.x;
        var dy = mb2.y - p.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          var force = 0.001 * (1 - dist / 200);
          fx += dx * force;
          fy += dy * force;
        }
      }
      // 鼠标吸引
      if (mouse.x > 0) {
        var mdx = mouse.x - p.x;
        var mdy = mouse.y - p.y;
        var mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 180) {
          var mforce = 0.004 * (1 - mdist / 180);
          fx += mdx * mforce;
          fy += mdy * mforce;
        }
      }

      p.vx += fx;
      p.vy += fy;
      p.vx *= 0.96;
      p.vy *= 0.96;
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.fillStyle = COLORS[j % COLORS.length];
      ctx.globalAlpha = p.life * 0.7;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // 绘制鼠标拖尾
    ctx.globalCompositeOperation = 'lighter';
    for (var t = 0; t < mouseTrail.length; t++) {
      var tr = mouseTrail[t];
      tr.age += 0.02;
      var alpha = Math.max(0, 1 - tr.age);
      var size = 3 + (1 - alpha) * 6;
      var grad2 = ctx.createRadialGradient(tr.x, tr.y, 0, tr.x, tr.y, size);
      grad2.addColorStop(0, 'rgba(201, 168, 76, ' + alpha + ')');
      grad2.addColorStop(1, 'transparent');
      ctx.fillStyle = grad2;
      ctx.beginPath();
      ctx.arc(tr.x, tr.y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalCompositeOperation = 'source-over';
  }

  function fadeOut(callback) {
    var overlay = document.getElementById('intro-overlay');
    overlay.classList.add('fading');
    setTimeout(function() {
      cancelAnimationFrame(rafId);
      overlay.classList.add('hidden');
      if (callback) callback();
    }, 800);
  }

  function getCanvas() { return canvas; }

  return {
    init: init,
    fadeOut: fadeOut,
    getCanvas: getCanvas
  };
})();
