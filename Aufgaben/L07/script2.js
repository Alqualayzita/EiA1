var landEu = "EU";
var einwohnerEu = 447;
var einwohnerEuW = 502;
var landDeutschland = "Deutschland";
var einwohnerDe = 83.2;
var einwohnerDeW = 80.3;
var landItalien = "Italien";
var einwohnerIt = 59.26;
var einwohnerItW = 59.96;
var landFrankreich = "Frankreich";
var einwohnerFr = 67.44;
var einwohnerFrW = 63.07;
var landSpanien = "Spanien";
var einwohnerSp = 47.39;
var einwohnerSpW = 46.74;
function zahlen(land, einwohner2021, einwohner2011) {
    document.querySelector(".landName").innerHTML = land;
    document.querySelector(".einwohnerzahl").innerHTML = einwohner2021 + " Mio";
    document.querySelector(".land").innerHTML = land;
    document.querySelector(".relativEU").innerHTML = Math.round(einwohner2021 / einwohnerEu * 100) + "%";
    document.querySelector(".wachstum").innerHTML = Math.round(einwohner2021 / einwohner2011 * 100 - 100) + "%";
    document.querySelector(".wachstumZahl").innerHTML = Math.round(einwohner2021 - einwohner2011) + " Mio";
    document.querySelector(".chart").setAttribute("style", "height:" + einwohner2021 / einwohnerEu * 100 + "%");
}
;
window.addEventListener("load", function () {
    document.querySelector(".germany").addEventListener("click", function () { zahlen(landDeutschland, einwohnerDe, einwohnerDeW); });
    document.querySelector(".italy").addEventListener("click", function () { zahlen(landItalien, einwohnerIt, einwohnerItW); });
    document.querySelector(".france").addEventListener("click", function () { zahlen(landFrankreich, einwohnerFr, einwohnerFrW); });
    document.querySelector(".spain").addEventListener("click", function () { zahlen(landSpanien, einwohnerSp, einwohnerSpW); });
    document.querySelector(".stars").addEventListener("click", function () { zahlen(landEu, einwohnerEu, einwohnerEuW); });
});
//# sourceMappingURL=script2.js.map