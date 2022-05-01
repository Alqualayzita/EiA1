var einwohnerEu:number=447;
var prozent:number=100;
var italien:number=-1;

var einwohnerDe:number= 83.2;
var einwohnerIt:number=59.26;
var einwohnerFr:number=67.44;
var einwohnerSp:number=47.39;

var einwohnerDeW:number=80.3;
var einwohnerItW:number=59.96;
var einwohnerFrW:number=63.07;
var einwohnerSpW:number=46.74;

var deProzent:number=einwohnerDe/einwohnerEu*prozent;
var itProzent:number=einwohnerIt/einwohnerEu*prozent;
var frProzent:number=einwohnerFr/einwohnerEu*prozent;
var spProzent:number=einwohnerSp/einwohnerEu*prozent;

var deDazu:number=einwohnerDe/einwohnerDeW*prozent-prozent;
var itDazu:number=(einwohnerIt/einwohnerItW*prozent-prozent)*italien;
var frDazu:number=einwohnerFr/einwohnerFrW*prozent-prozent;
var spDazu:number=einwohnerSp/einwohnerSpW*prozent-prozent;

var deDazuN:number=einwohnerDe-einwohnerDeW;
var itDazuN:number=(einwohnerIt-einwohnerItW)*italien;
var frDazuN:number=einwohnerFr-einwohnerFrW;
var spDazuN:number=einwohnerSp-einwohnerSpW;


console.log ("Deutschland hat "+einwohnerDe+" Mio. Einwohner.");
console.log ("Italien hat "+einwohnerIt+" Mio. Einwohner.");
console.log ("Frankreich hat "+einwohnerFr+" Mio. Einwohner.");
console.log ("Spanien hat "+einwohnerSp+" Mio. Einwohner.");

console.log ("In Deutschland wohnen "+deProzent+"% der Einwohner der EU.");
console.log ("In Italien wohnen "+itProzent+"% der Einwohner der EU.");
console.log ("In Frankreich wohnen "+frProzent+"% der Einwohner der EU.");
console.log ("In Spanien wohnen "+spProzent+"% der Einwohner der EU.");

console.log ("Deutschland ist seit 2011 um "+deDazu+"% gewachsen.");
console.log ("Italien ist seit 2011 um "+itDazu+"% geschrumpft.");
console.log ("Frankreich ist seit 2011 um "+frDazu+"% gewachsen.");
console.log ("Spanien ist seit 2011 um "+spDazu+"% gewachsen.");

console.log ("Deutschland hat seit 2011 "+deDazuN+" Mio. Einwohner dazugewonnen.");
console.log ("Italien hat seit 2011 "+itDazuN+" Mio. Einwohner verloren.");
console.log ("Frankreich hat seit 2011 "+frDazuN+" Mio. Einwohner dazugewonnen.");
console.log ("Spanien hat seit 2011 "+spDazuN+" Mio. Einwohner dazugewonnen.");