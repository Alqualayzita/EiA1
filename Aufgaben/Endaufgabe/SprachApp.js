/*Unter Mithilfe von Jan Bebendorf erstellt*/
/*Vorladen der Seite und aller Funktionen zusammengefasst in Constante*/
window.addEventListener("load", function () {
    const app = new SprachApp();
});
/*Deklarierung von verschiedenen Parametern der Aufgaben*/
class Aufgabe {
    satz;
    phrasen;
    constructor(satz, phrasen) {
        this.satz = satz;
        this.phrasen = phrasen;
    }
}
/* Objekt, in dem die verschiedenen Aufgaben als Arrays eingespeichert sind */
const LEVEL = {
    LEICHT: [
        new Aufgabe("Hallo, ich heiße Gabriel.", ["Hola", "Me llamo", "Gabriel"]),
        new Aufgabe("Ich bin aus Deutschland.", ["Soy", "de", "Alemania"]),
        new Aufgabe("Ich bin 20 Jahre alt.", ["Tengo", "20", "años"]),
        new Aufgabe("Wie heißt du?", ["¿", "Cómo", "te", "llamas", "?"]),
        new Aufgabe("Woher kommst du?", ["¿", "De", "dónde", "eres", "?"])
    ],
    MITTEL: [
        new Aufgabe("Ich möchte Spanisch lernen.", ["Quiero", "aprender", "español"]),
        new Aufgabe("Spanien ist ein interessantes Land.", ["España", "es", "un", "pais", "interessante"]),
        new Aufgabe("Spanien hat 47 Millionen Einwohner.", ["España", "tiene", "47 millones", "de", "habitantes"]),
        new Aufgabe("Die Hauptstadt Spaniens ist Madrid.", ["La", "capital", "de", "España", "es", "Madrid"]),
        new Aufgabe("Spanien hat 17 Regionen.", ["España", "tiene", "17", "regiones"]),
        new Aufgabe("Wo sind die Toiletten?", ["¿", "Dónde", "está", "el", "baño", "?"]),
        new Aufgabe("Wie spät ist es?", ["¿", "Qué", "hora", "es", "?"]),
        new Aufgabe("Wie viel kostet das?", ["¿", "Cuánto", "cuesta", "eso", "?"]),
        new Aufgabe("Ein Tisch für 4 Personen, bitte.", ["Una", "mesa", "para", "4", "por", "favor"]),
        new Aufgabe("Die Rechnung bitte.", ["La", "cuenta", "por", "favor"])
    ],
    SCHWER: [
        new Aufgabe("Ich bin hier für 6 Tage.", ["Voy", "a", "estar", "aquí", "por", "6", "días"]),
        new Aufgabe("Können sie mir ein Restaurant empfehlen?", ["¿", "Me", "puede", "recomendar", "algún", "restaurante", "?"]),
        new Aufgabe("Spanisch ist eine wichtige Sprache.", ["El", "español", "es", "un", "idioma", "importante"]),
        new Aufgabe("Spanisch wird in vielen Ländern gesprochen.", ["El", "español", "se", "habla", "en", "muchos", "países"]),
        new Aufgabe("In Südamerika wird ebenfalls Spanisch gesprochen.", ["El", "español", "tambien", "se", "habla", "en", "América", "del", "Sur"]),
        new Aufgabe("463 Millionen Menschen auf der Welt sprechen Spanisch.", ["463 millones", "de", "personas", "en", "el", "mundo", "hablan", "español"]),
        new Aufgabe("Ich interessiere mich für die spanische Kultur.", ["Me", "interesa", "la", "cultura", "española"]),
        new Aufgabe("Gestern war ich am Strand.", ["Yo", "estaba", "en", "la", "playa", "ayer"]),
        new Aufgabe("Ich werde im Sommer nach Spanien fliegen.", ["Volaré", "a", "España", "el", "verano"]),
        new Aufgabe("Die Sehenswürdigkeiten in Spanien sind interessant.", ["Los", "lugares", "interés", "en", "España", "son", "interesantes"]),
        new Aufgabe("Letztes Jahr war ich im Urlaub in Spanien.", ["El", "año", "pasado", "estuve", "de", "vacaciones", "en", "España"]),
        new Aufgabe("Ich esse gerne spanische Tapas.", ["Me", "gusta", "comer", "tapas", "españolas"]),
        new Aufgabe("Mallorca ist ein beliebtes Urlausbziel.", ["Mallorca", "es", "un", "popular", "destino", "de", "vacaciones"]),
        new Aufgabe("Wo warst du letztes Jahr im Urlaub?", ["¿", "Dónde", "fuiste", "de", "vacaciones", "el", "año", "pasado", "?"]),
        new Aufgabe("Gefällt dir spanisches Essen?", ["¿", "Te", "gusta", "la", "comida", "española", "?"])
    ]
};
/* Funktion, mit der die Sätze und Wörter zufällig gemischt und angezeigt werden, solange die Länge (Inhalt des Arrays) größer als 0 ist*/
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
/* Verschwinden des Startbildschirms bei Click auf eine der Schwierigkeitsstufen, sowie Start der Aufgaben der entsprechenden Schwierigkeitstufe mithilfe von Abrufen des entsprechenden Arrays*/
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
/*Deklaration von Klassen und Properties für die Anzeige der Aufgaben*/
class AufgabenAnzeige {
    app;
    element;
    aufgabe;
    satzElement;
    spanischerSatzElement;
    phrasenElement;
    schritt = 0;
    /* Deklaration von verschiedenen Funktionen, die im späteren Verlauf benötigt werden, Abgreifen von deutschen Sätzen, spanischer Lösung, spanischen Wörtern aus dem Array*/
    constructor(app) {
        this.app = app;
        this.element = document.getElementById("aufgabenanzeige");
        this.satzElement = document.getElementById("satz");
        this.spanischerSatzElement = document.getElementById("spanischer-satz");
        this.phrasenElement = document.getElementById("phrasen");
    }
    /* Anzeige der Aufgabe */
    setAufgabe(aufgabe) {
        this.aufgabe = aufgabe;
        while (this.phrasenElement.firstChild)
            this.phrasenElement.firstChild.remove();
        this.schritt = 0;
        this.satzElement.innerText = aufgabe.satz;
        this.spanischerSatzElement.innerText = "";
        /* Zufallssortierung für spanische Wörter, Erstellung von Divs mit spanischen Wörtern, Klickbarkeit */
        zufallsSortierung(aufgabe.phrasen).forEach(phrase => {
            const phraseElement = document.createElement("div");
            phraseElement.innerText = phrase;
            phraseElement.className = "phrase";
            phraseElement.addEventListener("click", () => this.click(phraseElement, phrase));
            this.phrasenElement.appendChild(phraseElement);
        });
    }
    /* Klicken von spanischem Wort, Check ob dies das richtige Wort in der Reihenfolge ist, wenn ja Counter +1, wenn nein Counter -1 und Auslösen des Alerts */
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
        /* Wenn die Anzahl der korrekt angeklickten Phrasen der Anzahl der zur Verfügung stehenden Phrasen entspricht, springt die App zur nächsten Aufgabe*/
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
/* Anzeige des Ergebnis, Deklaration von entsprechenden Klassen und Properties*/
class ErgebnisAnzeige {
    element;
    neustartButton;
    endScoreElement;
    /* Deklaration verschiedener Elemente, die im späteren Verlauf benötigt werden, wie Abgreifen des Ergebnis, Endscore, Neustart Button Funktion */
    constructor(app) {
        this.element = document.getElementById("ergebnis");
        this.endScoreElement = document.getElementById("endscore");
        this.neustartButton = document.getElementById("neustart");
        this.neustartButton.addEventListener("click", () => app.neustart());
    }
    /* Abgreifen und Anzeigen des Endscores */
    setEndScore(score) {
        this.endScoreElement.innerText = "Score: " + score;
    }
    anzeigen() {
        this.element.classList.remove("hidden");
    }
    verbergen() {
        this.element.classList.add("hidden");
    }
}
/* Ablauf der Aufgaben, Deklaration von entsprechenden Klassen und Properties */
class SprachApp {
    aufgabenAnzeige;
    hauptmenü;
    ergebnisAnzeige;
    scoreElement;
    aufgaben;
    aktuelleAufgabe = 0;
    score = 0;
    /* Deklaration verschiedener Elemente, die im späteren Verlauf benötigt werden wie Abgreifen des Scores, Score auf 0 setzen, Aufgaben, Hauptmenü oder Ergebnis anzeigen */
    constructor() {
        this.scoreElement = document.getElementById("score");
        this.setScore(0);
        this.aufgabenAnzeige = new AufgabenAnzeige(this);
        this.hauptmenü = new SchwierigkeitsAuswahlAnzeige(this);
        this.ergebnisAnzeige = new ErgebnisAnzeige(this);
    }
    /* Starten der Übungen auf der ausgewählten Schwierigkeit, Auslösen der Zufallssortierungsfunktion, Anzeigen der Aufgaben */
    start(schwierigkeit) {
        this.aufgaben = zufallsSortierung(LEVEL[schwierigkeit]);
        this.aufgabenAnzeige.setAufgabe(this.aufgaben[0]);
        this.aufgabenAnzeige.anzeigen();
    }
    /* Bei Klick auf Neustart Button wird der Score auf 0 gesetzt und der Startbildschirm wieder angezeigt*/
    neustart() {
        this.setScore(0);
        this.ergebnisAnzeige.verbergen();
        this.hauptmenü.anzeigen();
    }
    /* Sprung zur nächsten Aufgabe wenn es noch Aufgaben im Array gibt, ansonsten Sprung zum Endscreen und zum Ergebnis*/
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
    /* Abgreifen des Scores, keine negativen Zahlen möglich, Output im HTML bei erfolgreichen Beenden eines Levels */
    getScore() {
        return this.score;
    }
    setScore(score) {
        score = Math.max(0, score);
        this.score = score;
        this.scoreElement.innerText = "Score: " + this.score;
    }
    addScore(points) {
        this.setScore(this.score + points);
    }
}
//# sourceMappingURL=SprachApp.js.map