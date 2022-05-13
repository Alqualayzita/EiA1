var sound = [
    new Audio("../L08/assets/sound/a.mp3"),
    new Audio("../L08/assets/sound/c.mp3"),
    new Audio("../L08/assets/sound/F.mp3"),
    new Audio("../L08/assets/sound/G.mp3"),
    new Audio("../L08/assets/sound/hihat.mp3"),
    new Audio("../L08/assets/sound/kick.mp3"),
    new Audio("../L08/assets/sound/laugh-1.mp3"),
    new Audio("../L08/assets/sound/laugh-2.mp3"),
    new Audio("../L08/assets/sound/snare.mp3")
];
window.addEventListener("load", function playSample() {
    document.querySelector(".soundA").addEventListener("click", function () { (sound[0]).play(); });
    document.querySelector(".soundC").addEventListener("click", function () { (sound[1]).play(); });
    document.querySelector(".soundF").addEventListener("click", function () { (sound[2]).play(); });
    document.querySelector(".soundG").addEventListener("click", function () { (sound[3]).play(); });
    document.querySelector(".soundHihat").addEventListener("click", function () { (sound[4]).play(); });
    document.querySelector(".soundKick").addEventListener("click", function () { (sound[5]).play(); });
    document.querySelector(".soundLaugh1").addEventListener("click", function () { (sound[6]).play(); });
    document.querySelector(".soundLaugh2").addEventListener("click", function () { (sound[7]).play(); });
    document.querySelector(".soundSnare").addEventListener("click", function () { (sound[8]).play(); });
    document.querySelector(".play").addEventListener("click", function playBeat() {
        setInterval(function () { sound[5].play(); }, 500);
        setInterval(function () { sound[8].play(); }, 1000);
        setInterval(function () { sound[4].play(); }, 1500);
    });
});
//# sourceMappingURL=drumpad.js.map