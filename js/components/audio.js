document.addEventListener('DOMContentLoaded', () => {
  const masterToggle = document.getElementById('masterToggle');
  const wavesToggle = document.getElementById('wavesToggle');
  const coquiToggle = document.getElementById('coquiToggle');

  const wavesAudio = document.getElementById('wavesAudio');
  const coquiAudio = document.getElementById('coquiAudio');

  // Set initial volumes
  wavesAudio.volume = 0.3;
  coquiAudio.volume = 0.2;

  let isMasterMuted = true;
  let isWavesMuted = true;
  let isCoquiMuted = true;

  // Initialize with everything muted
  masterToggle.classList.add('muted');
  wavesToggle.classList.add('muted');
  coquiToggle.classList.add('muted');

  // Function to update master toggle state
  function updateMasterToggle() {
      if (isWavesMuted && isCoquiMuted) {
          masterToggle.classList.add('muted');
          isMasterMuted = true;
      } else {
          masterToggle.classList.remove('muted');
          isMasterMuted = false;
      }
  }

  // Master toggle click handler
  masterToggle.addEventListener('click', () => {
      if (isMasterMuted) {
          // Unmute all
          wavesAudio.play();
          coquiAudio.play();
          isWavesMuted = false;
          isCoquiMuted = false;
          wavesToggle.classList.remove('muted');
          coquiToggle.classList.remove('muted');
      } else {
          // Mute all
          wavesAudio.pause();
          coquiAudio.pause();
          isWavesMuted = true;
          isCoquiMuted = true;
          wavesToggle.classList.add('muted');
          coquiToggle.classList.add('muted');
      }
      isMasterMuted = !isMasterMuted;
      masterToggle.classList.toggle('muted');
  });

  // Waves toggle click handler
  wavesToggle.addEventListener('click', () => {
      if (isWavesMuted) {
          wavesAudio.play();
          wavesToggle.classList.remove('muted');
      } else {
          wavesAudio.pause();
          wavesToggle.classList.add('muted');
      }
      isWavesMuted = !isWavesMuted;
      updateMasterToggle();
  });

  // Coqui toggle click handler
  coquiToggle.addEventListener('click', () => {
      if (isCoquiMuted) {
          coquiAudio.play();
          coquiToggle.classList.remove('muted');
      } else {
          coquiAudio.pause();
          coquiToggle.classList.add('muted');
      }
      isCoquiMuted = !isCoquiMuted;
      updateMasterToggle();
  });

  // Handle page visibility change
  document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
          // Pause all audio when page is hidden
          wavesAudio.pause();
          coquiAudio.pause();
      } else {
          // Resume audio if it was playing before
          if (!isWavesMuted) wavesAudio.play();
          if (!isCoquiMuted) coquiAudio.play();
      }
  });
});
