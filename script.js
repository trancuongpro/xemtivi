document.addEventListener("DOMContentLoaded", () => {
    const reloadBtn = document.getElementById("reload-btn");
    // Thử lấy iframe với id "youtube-frame" (cho indexcl.html) hoặc "htv-frame" (cho các trang khác)
    const iframe = document.getElementById("youtube-frame") || document.getElementById("htv-frame");
    const htvBtn = document.getElementById("htv-btn");
    const vtvBtn = document.getElementById("vtv-btn");
    const thvlBtn = document.getElementById("thvl-btn");
    const tiviplusBtn = document.getElementById("tiviplus-btn");
    const phimBtn = document.getElementById("phim-btn");
    const cayphimBtn = document.getElementById("cayphim-btn");
    const sieuphimBtn = document.getElementById("sieuphim-btn");
    const fmBtn = document.getElementById("fm-btn");
    const cailuongBtn = document.getElementById("cailuong-btn");

    // Sự kiện khi nhấn nút "Tải lại"
    reloadBtn.addEventListener("click", () => {
        if (iframe) {
            iframe.src = iframe.src; // Làm mới iframe nếu tìm thấy
            reloadBtn.textContent = "Đang tải...";
            setTimeout(() => {
                reloadBtn.textContent = "Tải lại";
            }, 1000);
        } else {
            console.log("Không tìm thấy iframe để làm mới");
        }
    });

    // Sự kiện khi nhấn nút "HTV"
    htvBtn.addEventListener("click", () => {
        window.location.href = "index.html";
    });

    // Sự kiện khi nhấn nút "VTV"
    vtvBtn.addEventListener("click", () => {
        window.location.href = "indexvtv.html";
    });

    // Sự kiện khi nhấn nút "THVL"
    thvlBtn.addEventListener("click", () => {
        window.location.href = "indexvl.html";
    });

    // Sự kiện khi nhấn nút "Tivi Plus"
    tiviplusBtn.addEventListener("click", () => {
        window.location.href = "indextiviplus.html";
    });

    // Sự kiện khi nhấn nút "Xem Phim"
    phimBtn.addEventListener("click", () => {
        window.location.href = "indexphim.html";
    });

    // Sự kiện khi nhấn nút "Luyện Phim"
    cayphimBtn.addEventListener("click", () => {
        window.location.href = "indexcayphim.html";
    });

    // Sự kiện khi nhấn nút "Siêu Phim"
    sieuphimBtn.addEventListener("click", () => {
        window.location.href = "indexsieuphim.html";
    });

    // Sự kiện khi nhấn nút "Radio"
    fmBtn.addEventListener("click", () => {
        window.location.href = "indexfm.html";
    });

    // Sự kiện khi nhấn nút "Cải Lương"
    cailuongBtn.addEventListener("click", () => {
        window.location.href = "indexcl.html";
    });

    // Kiểm tra khi iframe tải xong
    if (iframe) {
        iframe.addEventListener("load", () => {
            console.log("Iframe đã tải xong!");
        });
    }
});