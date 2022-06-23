window.addEventListener("load", function (): void[]);

/* Objekt, in dem die verschiedenen Aufgaben als Arrays eingespeichert sind */
const LEVEL: { [key: string]: Aufgabe[]; } = {
    LEICHT: [
        new Aufgabe("Hallo, ich heiße Gabriel.", ["Hola", "Me llamo", "Gabriel"]),
        new Aufgabe("Ich bin aus Deutschland.", ["Soy", "de", "Alemania"]),
        new Aufgabe("Ich bin 20 Jahre alt." , ["Tengo", "20", "años"]),
        new Aufgabe("Wie heißt du?", ["¿", "Cómo", "te", "llamas", "?"]),
        new Aufgabe("Woher kommst du?", ["¿", "De", "dónde", "eres", "?"])
    ],
    MITTEL: [
        new Aufgabe("Ich möchte Spanisch lernen.", ["Quiero", "aprender", "español"]),
        new Aufgabe("Spanien ist ein interessantes Land.", ["España", "es", "un", "pais", "interessante"]),
        new Aufgabe("Spanien hat 47 Millionen Einwohner.", ["España", "tiene", "47 millones", "de", "habitantes"]),
        new Aufgabe("Die Hauptstadt Spaniens ist Madrid.", ["La", "capital", "de", "España", "es", "Madrid" ]),
        new Aufgabe("Spanien hat 17 Regionen.", ["España", "tiene", "17", "regiones"]),
        new Aufgabe("Wo sind die Toiletten?", ["¿", "Dónde", "está", "el", "baño", "?"]),
        new Aufgabe("Wie spät ist es?", ["¿", "Qué", "hora", "es", "?"]),
        new Aufgabe("Wie viel kostet das?", ["¿", "Cuánto", "cuesta", "eso", "?"]),
        new Aufgabe("Ein Tisch für 4 Personen, bitte.", ["Una", "mesa", "para", "4", "por", "favor"]),
        new Aufgabe("Die Rechnung bitte.", ["La", "cuenta", "por", "favor"])
    ],
    SCHWER: [
        new Aufgabe("Ich bin hier für 6 Tage.", ["Voy", "a", "estar", "aquí", "por", "6", "días"]),
        new Aufgabe("Können sie mir ein Restaurant empfehlen?", ["¿" , "Me", "puede", "recomendar", "algún", "restaurante", "?"]),
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

/* Klicken von spanischem Wort, Check ob dies das richtige Wort in der Reihenfolge ist, wenn ja Counter +1, wenn nein Counter -1 und Auslösen des Alerts */
click(element: HTMLElement, phrase: string): void {
    const richtigeAntwort: string = this.aufgabe.phrasen[this.schritt];
    if (phrase == richtigeAntwort) {
        this.schritt++;
        this.app.addScore(1);
    } else {
        this.app.addScore(-1);
        alert("Falsch! Probiers nochmal!");
    }
    /* Wenn die Anzahl der korrekt angeklickten Phrasen der Anzahl der zur Verfügung stehenden Phrasen entspricht, springt die App zur nächsten Aufgabe*/
    this.spanischerSatzElement.innerText = this.aufgabe.phrasen.slice(0, this.schritt).join(" ");
    if (this.schritt == this.aufgabe.phrasen.length) {
        this.app.naechsteAufgabe();
    }
}

/* Starten der Übungen auf der ausgewählten Schwierigkeit, Auslösen der Zufallssortierungsfunktion, Anzeigen der Aufgaben */
start(schwierigkeit: string): void {
    this.aufgaben = zufallsSortierung(LEVEL[schwierigkeit]);
    this.aufgabenAnzeige.setAufgabe(this.aufgaben[0]);
    this.aufgabenAnzeige.anzeigen();
}

/* Bei Klick auf Neustart Button wird der Score auf 0 gesetzt und der Startbildschirm wieder angezeigt*/
neustart(): void {
    this.setScore(0);
    this.ergebnisAnzeige.verbergen();
    this.hauptmenü.anzeigen();
}

/* Sprung zur nächsten Aufgabe wenn es noch Aufgaben im Array gibt, ansonsten Sprung zum Endscreen und zum Ergebnis*/
naechsteAufgabe(): void {
    this.aktuelleAufgabe++;
    if (this.aktuelleAufgabe < this.aufgaben.length) {
        this.aufgabenAnzeige.setAufgabe(this.aufgaben[this.aktuelleAufgabe]);
    } else {
        this.aufgabenAnzeige.verbergen();
        this.ergebnisAnzeige.setEndScore(this.score);
        this.ergebnisAnzeige.anzeigen();
    }
}

/* Abgreifen des Scores, keine negativen Zahlen möglich, Output im HTML bei erfolgreichen Beenden eines Levels */
getScore(): number {
    return this.score;
}
setScore(score: number): void {
    score = Math.max(0, score);
    this.score = score;
    this.scoreElement.innerText = "Score: " + this.score;
}
addScore(points: number): void {
    this.setScore(this.score + points);
}