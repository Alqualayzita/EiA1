var titleElement = document.getElementsByTagName("title")[0];

var landEu:string="EU";
var einwohnerEu:number=447;
var einwohnerEuW:number=502;

var landDeutschland:string="Deutschland";
var einwohnerDe:number= 83.2;
var einwohnerDeW:number=80.3;

var landItalien:string="Italien";
var einwohnerIt:number=59.26;
var einwohnerItW:number=59.96;

var landFrankreich:string="Frankreich";
var einwohnerFr:number=67.44;
var einwohnerFrW:number=63.07;

var landSpanien:string="Spanien";
var einwohnerSp:number=47.39;
var einwohnerSpW:number=46.74;


function zahlen (land:string, einwohner2021:number, einwohner2011:number) {
    document.querySelector(".landName").innerHTML = land;
    document.querySelector(".einwohnerzahl").innerHTML = einwohner2021 +" Mio";
    document.querySelector(".land").innerHTML = land;
    document.querySelector(".relativEU").innerHTML = Math.round(einwohner2021 / einwohnerEu * 100)+ "%";
    document.querySelector(".wachstum").innerHTML = Math.round(einwohner2021 / einwohner2011 * 100 - 100) + "%";
    document.querySelector(".wachstumZahl").innerHTML= Math.round(einwohner2021-einwohner2011) +" Mio";
    document.querySelector(".chart").setAttribute("style", "height:" + einwohner2021 / einwohnerEu * 100 + "%");
};
window.addEventListener("load", function () {
    document.querySelector(".germany").addEventListener("click", function () { zahlen(landDeutschland, einwohnerDe, einwohnerDeW); });
    document.querySelector(".italy").addEventListener("click", function () { zahlen(landItalien, einwohnerIt, einwohnerItW); });
    document.querySelector(".france").addEventListener("click", function () { zahlen(landFrankreich, einwohnerFr, einwohnerFrW); });
    document.querySelector(".spain").addEventListener("click", function () { zahlen(landSpanien, einwohnerSp, einwohnerSpW); });
    document.querySelector(".stars").addEventListener("click", function () { zahlen(landEu, einwohnerEu, einwohnerEuW); });
});