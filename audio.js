var audio = document.getElementById("myAudio");

// 在页面离开时保存音频状态
window.addEventListener("beforeunload", function() {
localStorage.setItem("audioPosition", audio.currentTime);
localStorage.setItem("audioVolume", audio.volume);
localStorage.setItem("audioPaused", audio.paused);
});

// 在页面加载时恢复音频状态
window.addEventListener("load", function() {
var savedPosition = localStorage.getItem("audioPosition");
var savedVolume = localStorage.getItem("audioVolume");
var isPaused = localStorage.getItem("audioPaused");

if (savedPosition !== null) {
    audio.currentTime = savedPosition;
}
if (savedVolume !== null) {
    audio.volume = savedVolume;
}
if (isPaused !== null && isPaused === "false") {
    audio.play();
}
});

function toggleAudio() {
if (audio.paused) {
    audio.play();
} else {
    audio.pause();
}
}