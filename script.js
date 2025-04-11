document.addEventListener("DOMContentLoaded", () => {
    const reloadBtn = document.getElementById("reload-btn");
    const iframe = document.getElementById("htv-frame");
    const htvBtn = document.getElementById("htv-btn");
    const vtvBtn = document.getElementById("vtv-btn");
    const thvlBtn = document.getElementById("thvl-btn");
	const tiviplusBtn = document.getElementById("tiviplus-btn");
	const phimBtn = document.getElementById("phim-btn");
	const cayphimBtn = document.getElementById("cayphim-btn");
	const fmBtn = document.getElementById("fm-btn");

    // Sự kiện khi nhấn nút "Tải lại"
    reloadBtn.addEventListener("click", () => {
        iframe.src = iframe.src; // Làm mới iframe bằng cách gán lại URL
        reloadBtn.textContent = "Đang tải...";
        setTimeout(() => {
            reloadBtn.textContent = "Tải lại";
        }, 1000);
    });

    // Sự kiện khi nhấn nút "HTV"
    htvBtn.addEventListener("click", () => {
        window.location.href = "index.html"; // Dẫn đến trang htv.html
    });

    // Sự kiện khi nhấn nút "VTV"
    vtvBtn.addEventListener("click", () => {
        window.location.href = "indexvtv.html"; // Dẫn đến trang vtv.html
    });

    // Sự kiện khi nhấn nút "THVL"
    thvlBtn.addEventListener("click", () => {
        window.location.href = "indexvl.html"; // Dẫn đến trang thvl.html
    });
	
	// Sự kiện khi nhấn nút "THVL"
    tiviplusBtn.addEventListener("click", () => {
        window.location.href = "indextiviplus.html"; // Dẫn đến trang tiviplus.html
    });
	
	// Sự kiện khi nhấn nút "Xem Phim"
    phimBtn.addEventListener("click", () => {
        window.location.href = "indexphim.html"; // Dẫn đến trang phim.html
    });
	
	// Sự kiện khi nhấn nút "Xem Phim"
    cayphimBtn.addEventListener("click", () => {
        window.location.href = "indexcayphim.html"; // Dẫn đến trang cayphim.html
    });
	
	// Sự kiện khi nhấn nút "Radio"
    fmBtn.addEventListener("click", () => {
        window.location.href = "indexfm.html"; // Dẫn đến trang radio.html
    });

    // Kiểm tra khi iframe tải xong
    iframe.addEventListener("load", () => {
        console.log("Iframe đã tải xong!");
    });
});
