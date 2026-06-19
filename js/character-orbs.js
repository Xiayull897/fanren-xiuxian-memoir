/**
 * 角色3D光球系统
 * — 按境界高低排列光球 + 彩色光晕环 + 名字标签 + Raycaster交互
 */
window.CharacterOrbs = (function() {
  var scene, camera, renderer;
  var orbGroup, labelGroup;
  var orbs = [];
  var raycaster, mouse;
  var hoveredOrb = null;
  var enabled = false;

  function init() {
    scene = window.CosmicScene.getScene();
    camera = window.CosmicScene.getCamera();
    renderer = window.CosmicScene.getRenderer();

    orbGroup = new THREE.Group();
    labelGroup = new THREE.Group();
    scene.add(orbGroup);
    scene.add(labelGroup);

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    createOrbs();

    window.addEventListener('click', onClick);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchstart', onTouchStart, { passive: false });

    window.CosmicScene.onUpdate(function(detail) {
      update(detail.dt, detail.time);
    });

    enabled = true;
  }

  function createOrbs() {
    var chars = window.CHARACTER_INDEX;

    for (var i = 0; i < chars.length; i++) {
      var ch = chars[i];
      var pos = ch.position;

      // 核心球体
      var sphereGeo = new THREE.SphereGeometry(0.3, 32, 32);
      var sphereMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(ch.color),
        emissive: new THREE.Color(ch.color),
        emissiveIntensity: 0.4,
        roughness: 0.25,
        metalness: 0.1
      });
      var sphere = new THREE.Mesh(sphereGeo, sphereMat);
      sphere.position.set(pos.x, pos.y, pos.z);
      sphere.userData = { characterId: ch.id, baseEmissive: 0.4, baseScale: 1 };
      orbGroup.add(sphere);

      // 光晕
      var haloGeo = new THREE.SphereGeometry(0.48, 32, 32);
      var haloMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(ch.color),
        transparent: true,
        opacity: 0.15,
        depthWrite: false
      });
      var halo = new THREE.Mesh(haloGeo, haloMat);
      sphere.add(halo);

      // 光环
      var torusGeo = new THREE.TorusGeometry(0.55, 0.025, 16, 48);
      var torusMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(ch.color),
        transparent: true,
        opacity: 0.5,
        depthWrite: false
      });
      var torus = new THREE.Mesh(torusGeo, torusMat);
      torus.rotation.x = Math.PI / 3;
      sphere.add(torus);

      // 名字标签
      var labelSprite = createLabelSprite(ch.name, ch.color);
      labelSprite.position.set(pos.x, pos.y + 0.9, pos.z);
      labelSprite.userData.characterId = ch.id;
      labelGroup.add(labelSprite);

      // 粒子轨迹环
      var particlesGeo = new THREE.BufferGeometry();
      var particleCount = 40;
      var pPositions = new Float32Array(particleCount * 3);
      for (var p = 0; p < particleCount; p++) {
        var angle = (p / particleCount) * Math.PI * 2;
        var r = 0.65;
        pPositions[p * 3] = Math.cos(angle) * r;
        pPositions[p * 3 + 1] = Math.sin(angle) * r * 0.3;
        pPositions[p * 3 + 2] = 0;
      }
      particlesGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
      var particlesMat = new THREE.PointsMaterial({
        color: new THREE.Color(ch.color),
        size: 0.03,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        transparent: true,
        opacity: 0.6
      });
      var particlesRing = new THREE.Points(particlesGeo, particlesMat);
      sphere.add(particlesRing);

      orbs.push({
        id: ch.id,
        mesh: sphere,
        halo: halo,
        torus: torus,
        label: labelSprite,
        particlesRing: particlesRing,
        baseY: pos.y,
        baseEmissive: 0.4
      });
    }
  }

  function createLabelSprite(text, color) {
    var canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 64;
    var ctx = canvas.getContext('2d');
    ctx.font = 'bold 28px "Noto Serif SC", serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = color;
    ctx.shadowBlur = 12;
    ctx.fillText(text, 128, 36);
    ctx.shadowBlur = 0;

    var texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    var material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthWrite: false,
      depthTest: false
    });
    var sprite = new THREE.Sprite(material);
    sprite.scale.set(2, 0.5, 1);
    sprite.userData = {};
    return sprite;
  }

  function onMouseMove(e) {
    if (!enabled) return;
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    checkHover();
  }

  function onTouchStart(e) {
    if (!enabled || e.touches.length !== 1) return;
    mouse.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
    checkClick();
  }

  function checkHover() {
    raycaster.setFromCamera(mouse, camera);
    var meshes = orbs.map(function(o) { return o.mesh; });
    var intersects = raycaster.intersectObjects(meshes);

    if (intersects.length > 0) {
      var obj = intersects[0].object;
      var id = obj.userData.characterId;
      if (hoveredOrb !== id) {
        setHover(id, true);
        if (hoveredOrb) setHover(hoveredOrb, false);
        hoveredOrb = id;
      }
    } else {
      if (hoveredOrb) {
        setHover(hoveredOrb, false);
        hoveredOrb = null;
      }
    }
  }

  function checkClick() {
    raycaster.setFromCamera(mouse, camera);
    var meshes = orbs.map(function(o) { return o.mesh; });
    var intersects = raycaster.intersectObjects(meshes);

    if (intersects.length > 0) {
      var id = intersects[0].object.userData.characterId;
      window.dispatchEvent(new CustomEvent('orb-click', { detail: { id: id } }));
    }
  }

  function onClick(e) {
    if (!enabled) return;
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    checkClick();
  }

  function setHover(id, isHover) {
    var orb = null;
    for (var i = 0; i < orbs.length; i++) {
      if (orbs[i].id === id) { orb = orbs[i]; break; }
    }
    if (!orb) return;

    var targetScale = isHover ? 1.35 : 1;
    var targetEmissive = isHover ? 1.2 : orb.baseEmissive;
    var targetOpacity = isHover ? 1 : 0.5;

    // 直接设置
    orb.mesh.scale.setScalar(targetScale);
    orb.mesh.material.emissiveIntensity = targetEmissive;
    orb.torus.material.opacity = targetOpacity;
    document.body.style.cursor = isHover ? 'pointer' : 'default';
  }

  function update(dt, time) {
    // 浮动动画 + 光环旋转
    for (var i = 0; i < orbs.length; i++) {
      var orb = orbs[i];
      var floatY = Math.sin(time * 1.2 + i * 1.5) * 0.3;
      orb.mesh.position.y = orb.baseY + floatY;
      orb.torus.rotation.z += dt * 0.4;
      orb.particlesRing.rotation.z += dt * 0.6;
      orb.particlesRing.rotation.x += dt * 0.3;

      // 让标签始终面向相机（Sprite自动处理，但位置跟随）
      var chData = window.CHARACTER_INDEX.find(function(c) { return c.id === orb.id; });
      if (chData && orb.label) {
        orb.label.position.set(
          orb.mesh.position.x,
          orb.mesh.position.y + 0.9,
          orb.mesh.position.z
        );
      }
    }

    // 缓慢旋转整体
    orbGroup.rotation.y += dt * 0.04;
    labelGroup.rotation.y += dt * 0.04;
  }

  function setEnabled(val) {
    enabled = val;
  }

  return {
    init: init,
    setEnabled: setEnabled
  };
})();
