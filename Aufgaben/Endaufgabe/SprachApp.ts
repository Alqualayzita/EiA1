
class Aufgabe {

    public satz: string;
    public phrasen: string[];

    constructor(satz: string, phrasen: string[]) {
        this.satz = satz;
        this.phrasen = phrasen;
    }

}

const LEVEL: { [key: string]: Aufgabe[]; } = {
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

function zufallsSortierung<T>(orig: T[]): T[] {
    let origKopie: T[] = [...orig];
    const neu: T[] = [];
    while (origKopie.length > 0) {
        const n: number = Math.floor(Math.random() * origKopie.length);
        const e: T = origKopie[n];
        neu.push(e);
        origKopie = origKopie.filter((_, i) => i != n);
    }
    return neu;
}

class SchwierigkeitsAuswahlAnzeige {

    private element: HTMLElement;

    constructor(app: SprachApp) {
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

    public anzeigen(): void {
        this.element.classList.remove("hidden");
    }

    public verbergen(): void {
        this.element.classList.add("hidden");
    }

}

class AufgabenAnzeige {

    private app: SprachApp;
    private element: HTMLElement;
    private aufgabe: Aufgabe;
    private satzElement: HTMLElement;
    private spanischerSatzElement: HTMLElement;
    private phrasenElement: HTMLElement;
    private schritt: number = 0;

    constructor(app: SprachApp) {
        this.app = app;
        this.element = document.getElementById("aufgabenanzeige");
        this.satzElement = document.getElementById("satz");
        this.spanischerSatzElement = document.getElementById("spanischer-satz");
        this.phrasenElement = document.getElementById("phrasen");
    }

    public setAufgabe(aufgabe: Aufgabe): void {
        this.aufgabe = aufgabe;
        while (this.phrasenElement.firstChild)
            this.phrasenElement.firstChild.remove();

        this.schritt = 0;
        this.satzElement.innerText = aufgabe.satz;
        this.spanischerSatzElement.innerText = "";

        zufallsSortierung(aufgabe.phrasen).forEach(phrase => {
            const phraseElement: HTMLElement = document.createElement("div");
            phraseElement.innerText = phrase;
            phraseElement.className = "phrase";
            phraseElement.addEventListener("click", () => this.click(phraseElement, phrase));
            this.phrasenElement.appendChild(phraseElement);
        });
    }

    public click(element: HTMLElement, phrase: string): void {
        const richtigeAntwort: string = this.aufgabe.phrasen[this.schritt];
        if (phrase == richtigeAntwort) {
            element.classList.add("richtig");
            this.schritt++;
            this.app.addScore(1);
        } else {
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

    public anzeigen(): void {
        this.element.classList.remove("hidden");
    }

    public verbergen(): void {
        this.element.classList.add("hidden");
    }

}

class ErgebnisAnzeige {

    private element: HTMLElement;
    private neustartButton: HTMLElement;
    private endScoreElement: HTMLElement;

    constructor(app: SprachApp) {
        this.element = document.getElementById("ergebnis");
        this.endScoreElement = document.getElementById("endscore");
        this.neustartButton = document.getElementById("neustart");
        this.neustartButton.addEventListener("click", () => app.neustart());
    }

    public setEndScore(score: number): void {
        this.endScoreElement.innerText = score + " Punkte";
    }

    public anzeigen(): void {
        this.element.classList.remove("hidden");
    }

    public verbergen(): void {
        this.element.classList.add("hidden");
    }

}


class SprachApp {

    private aufgabenAnzeige: AufgabenAnzeige;
    private schwierigkeitsAnzeige: SchwierigkeitsAuswahlAnzeige;
    private ergebnisAnzeige: ErgebnisAnzeige;
    private scoreElement: HTMLElement;
    private aufgaben: Aufgabe[];
    private aktuelleAufgabe: number = 0;
    private score: number = 0;

    constructor() {
        this.scoreElement = document.getElementById("score");
        this.setScore(0);
        this.aufgabenAnzeige = new AufgabenAnzeige(this);
        this.schwierigkeitsAnzeige = new SchwierigkeitsAuswahlAnzeige(this);
        this.ergebnisAnzeige = new ErgebnisAnzeige(this);
    }

    public start(schwierigkeit: string): void {
        this.aufgaben = zufallsSortierung(LEVEL[schwierigkeit]);
        this.aufgabenAnzeige.setAufgabe(this.aufgaben[0]);
        this.aufgabenAnzeige.anzeigen();
    }

    public neustart(): void {
        this.setScore(0);
        this.ergebnisAnzeige.verbergen();
        this.schwierigkeitsAnzeige.anzeigen();
    }

    public naechsteAufgabe(): void {
        this.aktuelleAufgabe++;
        if (this.aktuelleAufgabe < this.aufgaben.length) {
            this.aufgabenAnzeige.setAufgabe(this.aufgaben[this.aktuelleAufgabe]);
        } else {
            this.aufgabenAnzeige.verbergen();
            this.ergebnisAnzeige.setEndScore(this.score);
            this.ergebnisAnzeige.anzeigen();
        }
    }

    public getScore(): number {
        return this.score;
    }

    public setScore(score: number): void {
        score = Math.max(0, score);
        this.score = score;
        this.scoreElement.innerText = this.score + " Punkte";
    }

    public addScore(points: number): void {
        this.setScore(this.score + points);
    }

}


window.addEventListener("load", () => {

    const app = new SprachApp();

});