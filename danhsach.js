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
  let isPlaying = false;

  function getEmbedUrl(url) {
    const videoIdMatch = url.match(/(?:v=)([^&]+)/) || url.match(/youtu\.be\/([^?]+)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}?enablejsapi=1` : null;
  }

  function resetPlayer() {
    if (currentPlayer) {
      currentPlayer.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', "*");
    }
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    currentPlayer = null;
    currentIndex = -1;
    isPlaying = false;
    iframe.src = "about:blank";
    currentVideoTitle.textContent = "";
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
        iframe.src = embedUrl + "&autoplay=1";
        currentPlayer = iframe;
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

  playPauseBtn.addEventListener("click", () => {
    if (!currentPlayer || currentIndex === -1) return;
    if (isPlaying) {
      currentPlayer.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*");
      playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
      isPlaying = false;
    } else {
      currentPlayer.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*");
      playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
      isPlaying = true;
    }
  });

  stopBtn.addEventListener("click", () => {
    if (currentPlayer) {
      resetPlayer();
    }
  });

  iframe.addEventListener("load", () => {
    if (currentPlayer && currentIndex !== -1 && isPlaying) {
      setTimeout(() => {
        try {
          currentPlayer.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*");
        } catch (e) {
          console.log(`Lỗi phát video: ${currentVideoTitle.textContent}`);
        }
      }, 1000);
    }
  });
});