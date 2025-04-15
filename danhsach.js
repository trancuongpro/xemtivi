// danhsach.js
document.addEventListener("DOMContentLoaded", () => {	
  const videoListContainerTuongco = document.getElementById("video-list-tuongco");
  const videoListContainerTancogiaouyen = document.getElementById("video-list-tancogiaouyen");
  const iframe = document.getElementById("youtube-frame");
  const currentVideoTitle = document.getElementById("current-video-title");
  const playPauseBtn = document.getElementById("play-pause-btn");
  const stopBtn = document.getElementById("stop-btn");
  let currentPlayer = null;
  let currentIndex = -1;
  let currentList = 'tuongco'; // Theo dõi danh sách hiện tại: 'tuongco' hoặc 'tancogiaouyen'
  let isPlaying = false;

  // Load YouTube API
  const tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  function getEmbedUrl(url) {
    const videoIdMatch = url.match(/(?:v=)([^&]+)/) || url.match(/youtu\.be\/([^?]+)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=1` : null;
  }

  function resetPlayer() {
    if (currentPlayer) {
      currentPlayer.stopVideo();
    }
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    currentPlayer = null;
    currentIndex = -1;
    isPlaying = false;
    iframe.src = "about:blank";
    currentVideoTitle.textContent = "";
  }

  function playNextVideo() {
    let nextIndex = currentIndex + 1;
    let videoListToUse = currentList === 'tuongco' ? videoList : videoListTancogiaouyen;

    // Nếu hết danh sách Tuồng Cổ, chuyển sang Tân Cổ Giao Duyên
    if (currentList === 'tuongco' && nextIndex >= videoList.length) {
      currentList = 'tancogiaouyen';
      videoListToUse = videoListTancogiaouyen;
      nextIndex = 0;
    }

    // Nếu hết danh sách Tân Cổ Giao Duyên, quay lại Tuồng Cổ
    if (currentList === 'tancogiaouyen' && nextIndex >= videoListTancogiaouyen.length) {
      currentList = 'tuongco';
      videoListToUse = videoList;
      nextIndex = 0;
    }

    if (videoListToUse[nextIndex]) {
      const video = videoListToUse[nextIndex];
      const embedUrl = getEmbedUrl(video.url);
      if (!embedUrl) {
        console.log(`Link không hợp lệ: ${video.title}`);
        return;
      }
      console.log(`Phát video (${currentList}): ${video.title}, URL: ${embedUrl}`);
      iframe.src = embedUrl;
      currentIndex = nextIndex;
      currentVideoTitle.textContent = video.title;
      isPlaying = true;
      playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function setupVideoList(videoList, container, listName) {
    videoList.forEach((video, index) => {
      const videoItem = document.createElement("div");
      videoItem.className = "video-item";
      videoItem.innerHTML = `<span class="video-title">${video.title}</span>`;
      videoItem.addEventListener("click", () => {
        const embedUrl = getEmbedUrl(video.url);
        if (!embedUrl) {
          console.log(`Link không hợp lệ: ${video.title}`);
          return;
        }
        if (currentPlayer) {
          resetPlayer();
        }
        console.log(`Phát video (${listName}): ${video.title}, URL: ${embedUrl}`);
        iframe.src = embedUrl;
        currentList = listName === "Tuồng Cổ" ? 'tuongco' : 'tancogiaouyen';
        currentIndex = index;
        currentVideoTitle.textContent = video.title;
        isPlaying = true;
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
      container.appendChild(videoItem);
    });
  }

  // Thiết lập danh sách Tuồng Cổ
  setupVideoList(videoList, videoListContainerTuongco, "Tuồng Cổ");

  // Thiết lập danh sách Tân Cổ Giao Duyên
  setupVideoList(videoListTancogiaouyen, videoListContainerTancogiaouyen, "Tân Cổ Giao Duyên");

  // Tự động phát video đầu tiên của list.js khi trang tải
  if (videoList.length > 0) {
    const firstVideo = videoList[0];
    const embedUrl = getEmbedUrl(firstVideo.url);
    if (embedUrl) {
      console.log(`Phát video đầu tiên (Tuồng Cổ): ${firstVideo.title}, URL: ${embedUrl}`);
      iframe.src = embedUrl;
      currentList = 'tuongco';
      currentIndex = 0;
      currentVideoTitle.textContent = firstVideo.title;
      isPlaying = true;
      playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
  }

  playPauseBtn.addEventListener("click", () => {
    if (!currentPlayer || currentIndex === -1) return;
    if (isPlaying) {
      currentPlayer.pauseVideo();
      playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
      isPlaying = false;
    } else {
      currentPlayer.playVideo();
      playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
      isPlaying = true;
    }
  });

  stopBtn.addEventListener("click", () => {
    if (currentPlayer) {
      resetPlayer();
    }
  });

  // YouTube API ready
  window.onYouTubeIframeAPIReady = function() {
    currentPlayer = new YT.Player('youtube-frame', {
      events: {
        'onReady': (event) => {
          if (isPlaying) {
            event.target.playVideo();
          }
        },
        'onStateChange': (event) => {
          if (event.data === YT.PlayerState.ENDED) {
            playNextVideo();
          }
        }
      }
    });
  };
});