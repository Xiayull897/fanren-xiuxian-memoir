/**
 * 鼠标驱动相机控制
 * — 鼠标位置→lerp平滑相机偏移 + 滚轮缩放 + 移动端触摸
 */
window.CameraControls = (function() {
  var camera;
  var mouseX = 0, mouseY = 0;
  var targetX = 0, targetY = 0;
  var basePosition, zoom;
  var MIN_ZOOM = 6, MAX_ZOOM = 35, DEFAULT_ZOOM = 18;
  var zoomTarget;
  var enabled = false;

  function init() {
    camera = window.CosmicScene.getCamera();
    basePosition = camera.position.clone();
    zoom = DEFAULT_ZOOM;
    zoomTarget = DEFAULT_ZOOM;

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    window.CosmicScene.onUpdate(function(detail) {
      update(detail.dt);
    });

    enabled = true;
  }

  function onMouseMove(e) {
    targetX = (e.clientX / window.innerWidth) * 2 - 1;   // [-1, 1]
    targetY = -(e.clientY / window.innerHeight) * 2 + 1; // [-1, 1]
  }

  function onTouchMove(e) {
    if (e.touches.length === 1) {
      targetX = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
      targetY = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
    }
  }

  function onWheel(e) {
    e.preventDefault();
    zoomTarget -= e.deltaY * 0.02;
    zoomTarget = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoomTarget));
  }

  function update(dt) {
    if (!enabled) return;

    // 平滑鼠标
    mouseX += (targetX - mouseX) * 4 * dt;
    mouseY += (targetY - mouseY) * 4 * dt;

    // 平滑缩放
    zoom += (zoomTarget - zoom) * 5 * dt;

    // 更新相机位置
    camera.position.x = basePosition.x + mouseX * 4;
    camera.position.y = basePosition.y + mouseY * 2.5;
    camera.position.z = zoom;

    camera.lookAt(mouseX * 2, mouseY * 1.5, 0);
  }

  function setEnabled(val) {
    enabled = val;
  }

  return {
    init: init,
    setEnabled: setEnabled
  };
})();
