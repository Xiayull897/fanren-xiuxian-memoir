/**
 * 主控制器 — 阶段调度
 * 阶段: LOADING → INTRO → COSMIC
 */
window.App = (function() {
  var PHASE = { LOADING: 'loading', INTRO: 'intro', COSMIC: 'cosmic' };
  var currentPhase;

  function boot() {
    currentPhase = PHASE.LOADING;

    // 阶段1：加载页（等待Three.js加载完成 + 最小加载时间）
    var minLoadTime = 1200;
    var startTime = Date.now();

    function checkReady() {
      if (typeof THREE !== 'undefined') {
        var elapsed = Date.now() - startTime;
        var delay = Math.max(0, minLoadTime - elapsed);
        setTimeout(function() {
          transitionTo(PHASE.INTRO);
        }, delay);
      } else {
        setTimeout(checkReady, 100);
      }
    }
    checkReady();
  }

  function transitionTo(phase) {
    currentPhase = phase;

    switch (phase) {
      case PHASE.INTRO:
        hideLoading();
        startIntro();
        break;
      case PHASE.COSMIC:
        startCosmic();
        break;
    }
  }

  function hideLoading() {
    var el = document.getElementById('loading-screen');
    if (el) {
      el.classList.add('hidden');
      setTimeout(function() { el.style.display = 'none'; }, 600);
    }
  }

  function startIntro() {
    window.IntroAnimation.init();

    // 点击跳过
    var overlay = document.getElementById('intro-overlay');
    overlay.addEventListener('click', function handler() {
      overlay.removeEventListener('click', handler);
      window.IntroAnimation.fadeOut(function() {
        transitionTo(PHASE.COSMIC);
      });
    });

    // 4.5秒后自动过渡
    setTimeout(function() {
      if (currentPhase === PHASE.INTRO) {
        window.IntroAnimation.fadeOut(function() {
          transitionTo(PHASE.COSMIC);
        });
      }
    }, 5000);
  }

  function startCosmic() {
    // 隐藏入口
    var overlay = document.getElementById('intro-overlay');
    overlay.style.display = 'none';

    // 初始化3D宇宙
    window.CosmicScene.init();
    window.Starfield.init();
    window.CameraControls.init();
    window.CharacterOrbs.init();
    window.MouseTrails.init();
    window.CharacterModal.init();
  }

  return {
    boot: boot,
    PHASE: PHASE
  };
})();

// 启动
document.addEventListener('DOMContentLoaded', function() {
  window.App.boot();
});
