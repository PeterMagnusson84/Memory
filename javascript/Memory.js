var Memory = {

    array: [],

    // räknare förpar
    countPair: 0,
    // räknar försök
    countTry: 0,
    //dessa brickor ska blandas
    rows: 4,
    cols: 4,

    init: function () {

        slumpArray = RandomGenerator.getPictureArray(Memory.rows, Memory.cols); //Ser till så att brickorna blandas olika när spelet laddas in

        Memory.createMemoryBoard(); //Anropar funktionen så att spelplanen kan skpas

    },
    createMemoryBoard: function () {

        // Hämta divtaggen "container"
        var divTag = document.getElementById("container");

        // skapa variabeln för att kunna ha en tabell i divtaggen
        var tabellen = document.createElement("table");

        // Tabellen skapas i divtaggen
        divTag.appendChild(tabellen);

        // En variabel för frågetecknet skapas och nollass
        var questionmark = 0;

        //Skapa rader och kolumner
        for (var rad = 0; rad < 4; rad++) {
            var tableRows = document.createElement("tr");
            tabellen.appendChild(tableRows); //Raderna läggs in i tabellen

            for (var col = 0; col < 4; col++) {
                var tableColums = document.createElement("td");
                tableRows.appendChild(tableColums); //Kolumnerna läggs in i raderna

                // skapar bild i html filen
                var bild = document.createElement("img");
                bild.setAttribute("src", "pics/0.png");
                //Ändrar storleken på bilerna
                bild.className = "img";
                bild.setAttribute("height", "50");
                bild.setAttribute("width", "50");

                // Genom att göra dessa tre steg så skapas en länk till bilden
                var bildLink = document.createElement("a");
                bildLink.setAttribute("href", "#"); //Har musen gått sönder? Här är lösningen
                bildLink.appendChild(bild);
                tableRows.appendChild(bildLink); //Lägger bilden i alla rader

                // kallar på funktionen turnQuestionmark 
                Memory.turnQuestionmark(questionmark, bildLink, bild);

                // räknar upp brickan 0 blir 1.....
                questionmark++;
            }
        }
    },

    // vända bilderna
    turnQuestionmark: function (questionmark, bildLink, bild) {
        //a-taggen kopplas till onclick
        bildLink.onclick = function () {
            if (bild.getAttribute("src") === "pics/0.png") {

                //Lägger till ett objekt sist i arrayen.
                Memory.array.push(bildLink);

                if (Memory.array.length === 1 || Memory.array.length === 2) {
                    bildLink.getElementsByTagName("img")[0].setAttribute("src", "pics/" + slumpArray[questionmark] + ".png");

                    //när två bilder är vända visas bilderna i 0.8 sekunder
                    if (Memory.array.length === 2) {
                        setTimeout(function () {
                            Memory.checkBrick(Memory.array);
                        }, 800);
                    }
                }
            }
        };

    },

    // kollar bilderna
    checkBrick: function (slumpArray, bildLink, bild) {


        //Om brickorna är likadana vänds de inte tillbaka.        
        if (slumpArray[0].getElementsByTagName("img")[0].getAttribute("src") === slumpArray[1].getElementsByTagName("img")[0].getAttribute("src")) {
            //Och ett par räknas upp
            Memory.countPair++;

            //Den här kollar om paren och antalet brickor är samma och visar isåfall ett meddelande
            if (Memory.countPair === 8) {
                alert("Du klarade det på " + Memory.countTry + " försök.");

            }
            //Tömmer arrayen
            Memory.array = [];
        }

        //Om brickorna inte är lika vänds de tillbaka och frågetecknet visas.
        else {
            slumpArray[0].getElementsByTagName("img")[0].setAttribute("src", "pics/0.png");
            slumpArray[1].getElementsByTagName("img")[0].setAttribute("src", "pics/0.png");
            Memory.array = [];
        }
        //Och ett försök räknas upp
        ++Memory.countTry;
    }
};

window.onload = Memory.init;//Gör så att programmet körs