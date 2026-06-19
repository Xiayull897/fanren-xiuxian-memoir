/**
 * Three.js 宇宙场景核心
 * — 场景/相机/渲染器/光照/动画循环/响应式
 */
window.CosmicScene = (function() {
  var scene, camera, renderer;
  var clock;
  var rafId;
  var listeners = [];

  function init() {
    var container = document.getElementById('cosmic-container');

    // 场景
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x06060e);
    scene.fog = new THREE.FogExp2(0x06060e, 0.00006);

    // 相机
    var aspect = container.clientWidth / container.clientHeight;
    camera = new THREE.PerspectiveCamera(60, aspect, 0.5, 500);
    camera.position.set(0, 3, 18);
    camera.lookAt(0, -1, 0);

    // 渲染器
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 灯光
    var ambient = new THREE.AmbientLight(0x1a1a3a, 0.8);
    scene.add(ambient);
    var pointLight = new THREE.PointLight(0xc9a84c, 30, 50);
    pointLight.position.set(5, 8, 5);
    scene.add(pointLight);

    clock = new THREE.Clock();

    // 响应式
    window.addEventListener('resize', onResize);

    // 动画循环
    function loop() {
      rafId = requestAnimationFrame(loop);
      var dt = Math.min(clock.getDelta(), 0.1);
      var time = clock.elapsedTime;

      // 广播更新事件
      var evt = new CustomEvent('cosmic-update', { detail: { dt: dt, time: time } });
      for (var i = 0; i < listeners.length; i++) {
        listeners[i](evt.detail);
      }

      renderer.render(scene, camera);
    }
    loop();
  }

  function onResize() {
    var container = document.getElementById('cosmic-container');
    var w = container.clientWidth;
    var h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  function onUpdate(fn) {
    listeners.push(fn);
  }

  function dispose() {
    cancelAnimationFrame(rafId);
    window.removeEventListener('resize', onResize);
    listeners.length = 0;
    var container = document.getElementById('cosmic-container');
    if (container && renderer.domElement) {
      container.removeChild(renderer.domElement);
    }
    renderer.dispose();
  }

  return {
    init: init,
    dispose: dispose,
    getScene: function() { return scene; },
    getCamera: function() { return camera; },
    getRenderer: function() { return renderer; },
    onUpdate: onUpdate
  };
})();
