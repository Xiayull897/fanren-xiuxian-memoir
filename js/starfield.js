/**
 * 星场和星云系统
 * — 6000+粒子星空 + 彩色星云精灵 + 慢速旋转
 */
window.Starfield = (function() {
  var starPoints, nebulaGroup;
  var scene;

  function init() {
    scene = window.CosmicScene.getScene();

    createStars();
    createNebulae();

    window.CosmicScene.onUpdate(function(_) {
      update();
    });
  }

  function createStars() {
    var starCount = window.innerWidth < 768 ? 3000 : 6000;
    var geometry = new THREE.BufferGeometry();
    var positions = new Float32Array(starCount * 3);
    var colors = new Float32Array(starCount * 3);

    for (var i = 0; i < starCount; i++) {
      // 扁平球体分布
      var theta = Math.random() * Math.PI * 2;
      var phi = Math.acos(2 * Math.random() - 1);
      var radius = 25 + Math.random() * 65;
      var x = radius * Math.sin(phi) * Math.cos(theta);
      var y = radius * Math.sin(phi) * Math.sin(theta) * 0.4; // 压扁
      var z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // 颜色：白/金/蓝混合
      var colorType = Math.random();
      if (colorType < 0.6) {
        colors[i * 3] = 0.8 + Math.random() * 0.2;
        colors[i * 3 + 1] = 0.85 + Math.random() * 0.15;
        colors[i * 3 + 2] = 0.9 + Math.random() * 0.1;
      } else if (colorType < 0.85) {
        colors[i * 3] = 0.75 + Math.random() * 0.25;
        colors[i * 3 + 1] = 0.6 + Math.random() * 0.2;
        colors[i * 3 + 2] = 0.2 + Math.random() * 0.3;
      } else {
        colors[i * 3] = 0.2 + Math.random() * 0.2;
        colors[i * 3 + 1] = 0.4 + Math.random() * 0.3;
        colors[i * 3 + 2] = 0.7 + Math.random() * 0.3;
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // 创建发光的星星纹理
    var texCanvas = document.createElement('canvas');
    texCanvas.width = 64;
    texCanvas.height = 64;
    var tctx = texCanvas.getContext('2d');
    var grad = tctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.05, 'rgba(255,255,255,0.9)');
    grad.addColorStop(0.2, 'rgba(255,255,255,0.4)');
    grad.addColorStop(0.5, 'rgba(255,255,255,0.05)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    tctx.fillStyle = grad;
    tctx.fillRect(0, 0, 64, 64);
    var texture = new THREE.CanvasTexture(texCanvas);

    var material = new THREE.PointsMaterial({
      size: 0.25,
      map: texture,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      opacity: 0.9
    });

    starPoints = new THREE.Points(geometry, material);
    scene.add(starPoints);
  }

  function createNebulae() {
    nebulaGroup = new THREE.Group();
    scene.add(nebulaGroup);

    var nebulaColors = [
      { color: '#2a1040', size: 14, pos: [10, 3, -20] },
      { color: '#102040', size: 16, pos: [-15, -2, -18] },
      { color: '#401520', size: 12, pos: [5, -5, -22] },
      { color: '#1a3040', size: 13, pos: [-8, 4, -21] },
      { color: '#302010', size: 11, pos: [12, -3, -24] },
      { color: '#152040', size: 15, pos: [-12, 1, -19] },
      { color: '#201030', size: 10, pos: [0, 6, -23] },
      { color: '#103030', size: 12, pos: [-5, -6, -20] }
    ];

    for (var i = 0; i < nebulaColors.length; i++) {
      var nc = nebulaColors[i];
      var nCanvas = document.createElement('canvas');
      nCanvas.width = 256;
      nCanvas.height = 256;
      var nctx = nCanvas.getContext('2d');
      var ngrad = nctx.createRadialGradient(128, 128, 0, 128, 128, 128);
      ngrad.addColorStop(0, nc.color);
      ngrad.addColorStop(0.3, nc.color + 'cc');
      ngrad.addColorStop(0.7, nc.color + '22');
      ngrad.addColorStop(1, 'transparent');
      nctx.fillStyle = ngrad;
      nctx.fillRect(0, 0, 256, 256);

      var nTexture = new THREE.CanvasTexture(nCanvas);
      var nMaterial = new THREE.SpriteMaterial({
        map: nTexture,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        transparent: true,
        opacity: 0.5
      });
      var sprite = new THREE.Sprite(nMaterial);
      sprite.position.set(nc.pos[0], nc.pos[1], nc.pos[2]);
      sprite.scale.set(nc.size, nc.size, 1);
      nebulaGroup.add(sprite);
    }
  }

  function update() {
    // 慢速旋转
    if (starPoints) {
      starPoints.rotation.y += 0.00012;
      starPoints.rotation.x += 0.00004;
    }
    if (nebulaGroup) {
      nebulaGroup.rotation.y += 0.00008;
    }
  }

  return { init: init };
})();
