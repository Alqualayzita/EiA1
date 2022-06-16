class Aufgabe {
    satz;
    phrasen;
    constructor(satz, phrasen) {
        this.satz = satz;
        this.phrasen = phrasen;
    }
}
const LEVEL = {
    LEICHT: [
        new Aufgabe("Hallo, ich heiße Gabriel.", ["Hola", "Me llamo", "Gabriel"]),
        new Aufgabe("Ich bin aus Deutschland.", ["Soy", "de", "Alemania"]),
        new Aufgabe("Ich möchte Spanisch lernen.", ["Quiero", "aprender", "espanol"]),
        new Aufgabe("Spanien ist ein interessantes Land.", ["Espana", "es", "un", "pais", "interessante"]),
        new Aufgabe("Spanisch ist eine wichtige Sprache.", ["El", "espanol", "es", "un", "idioma", "importante"])
    ],
    MITTEL: [],
    SCHWER: []
};
function zufallsSortierung(orig) {
    let origKopie = [...orig];
    const neu = [];
    while (origKopie.length > 0) {
        const n = Math.floor(Math.random() * origKopie.length);
        const e = origKopie[n];
        neu.push(e);
        origKopie = origKopie.filter((_, i) => i != n);
    }
    return neu;
}
class SchwierigkeitsAuswahlAnzeige {
    element;
    constructor(app) {
        this.element = document.getElementById("schwierigkeitsanzeige");
        document.getElementById("leicht").addEventListener("click", () => {
            this.verbergen();
            app.start("LEICHT");
        });
        document.getElementById("mittel").addEventListener("click", () => {
            this.verbergen();
            app.start("MITTEL");
        });
        document.getElementById("schwer").addEventListener("click", () => {
            this.verbergen();
            app.start("SCHWER");
        });
    }
    anzeigen() {
        this.element.classList.remove("hidden");
    }
    verbergen() {
        this.element.classList.add("hidden");
    }
}
class AufgabenAnzeige {
    app;
    element;
    aufgabe;
    satzElement;
    spanischerSatzElement;
    phrasenElement;
    schritt = 0;
    constructor(app) {
        this.app = app;
        this.element = document.getElementById("aufgabenanzeige");
        this.satzElement = document.getElementById("satz");
        this.spanischerSatzElement = document.getElementById("spanischer-satz");
        this.phrasenElement = document.getElementById("phrasen");
    }
    setAufgabe(aufgabe) {
        this.aufgabe = aufgabe;
        while (this.phrasenElement.firstChild)
            this.phrasenElement.firstChild.remove();
        this.schritt = 0;
        this.satzElement.innerText = aufgabe.satz;
        this.spanischerSatzElement.innerText = "";
        zufallsSortierung(aufgabe.phrasen).forEach(phrase => {
            const phraseElement = document.createElement("div");
            phraseElement.innerText = phrase;
            phraseElement.className = "phrase";
            phraseElement.addEventListener("click", () => this.click(phraseElement, phrase));
            this.phrasenElement.appendChild(phraseElement);
        });
    }
    click(element, phrase) {
        const richtigeAntwort = this.aufgabe.phrasen[this.schritt];
        if (phrase == richtigeAntwort) {
            element.classList.add("richtig");
            this.schritt++;
            this.app.addScore(1);
        }
        else {
            element.classList.add("falsch");
            this.app.addScore(-1);
            alert("Falsch! Probiers nochmal!");
            element.classList.remove("falsch");
        }
        this.spanischerSatzElement.innerText = this.aufgabe.phrasen.slice(0, this.schritt).join(" ");
        if (this.schritt == this.aufgabe.phrasen.length) {
            this.app.naechsteAufgabe();
        }
    }
    anzeigen() {
        this.element.classList.remove("hidden");
    }
    verbergen() {
        this.element.classList.add("hidden");
    }
}
class ErgebnisAnzeige {
    element;
    neustartButton;
    endScoreElement;
    constructor(app) {
        this.element = document.getElementById("ergebnis");
        this.endScoreElement = document.getElementById("endscore");
        this.neustartButton = document.getElementById("neustart");
        this.neustartButton.addEventListener("click", () => app.neustart());
    }
    setEndScore(score) {
        this.endScoreElement.innerText = score + " Punkte";
    }
    anzeigen() {
        this.element.classList.remove("hidden");
    }
    verbergen() {
        this.element.classList.add("hidden");
    }
}
class SprachApp {
    aufgabenAnzeige;
    schwierigkeitsAnzeige;
    ergebnisAnzeige;
    scoreElement;
    aufgaben;
    aktuelleAufgabe = 0;
    score = 0;
    constructor() {
        this.scoreElement = document.getElementById("score");
        this.setScore(0);
        this.aufgabenAnzeige = new AufgabenAnzeige(this);
        this.schwierigkeitsAnzeige = new SchwierigkeitsAuswahlAnzeige(this);
        this.ergebnisAnzeige = new ErgebnisAnzeige(this);
    }
    start(schwierigkeit) {
        this.aufgaben = zufallsSortierung(LEVEL[schwierigkeit]);
        this.aufgabenAnzeige.setAufgabe(this.aufgaben[0]);
        this.aufgabenAnzeige.anzeigen();
    }
    neustart() {
        this.setScore(0);
        this.ergebnisAnzeige.verbergen();
        this.schwierigkeitsAnzeige.anzeigen();
    }
    naechsteAufgabe() {
        this.aktuelleAufgabe++;
        if (this.aktuelleAufgabe < this.aufgaben.length) {
            this.aufgabenAnzeige.setAufgabe(this.aufgaben[this.aktuelleAufgabe]);
        }
        else {
            this.aufgabenAnzeige.verbergen();
            this.ergebnisAnzeige.setEndScore(this.score);
            this.ergebnisAnzeige.anzeigen();
        }
    }
    getScore() {
        return this.score;
    }
    setScore(score) {
        score = Math.max(0, score);
        this.score = score;
        this.scoreElement.innerText = this.score + " Punkte";
    }
    addScore(points) {
        this.setScore(this.score + points);
    }
}
window.addEventListener("load", () => {
    const app = new SprachApp();
});
//# sourceMappingURL=SprachApp.js.map