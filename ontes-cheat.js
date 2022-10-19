    /**
     * ONTES-CHEAT
     * © Tomáš Vojtek 2022
     * https://github.com/czvojtektomas/ontes-cheat
    */


    function consoleOut(message) {
        console.log("[ONTES-CHEAT] " + message);
    }

    $.ajax({ 
        type: "POST", 
        url: "kontrola.php",
        data: { 
            data: data_kontrola,
            id_predmet: id_predmet,
            nazev_predmet: nazev_predmet
        },                                                
        success: function(response) {       
            hodnoceni = JSON.parse(response);
            let element;
            document.querySelectorAll(".otazka").forEach(function (e, i) {
                const question = e.children[0];
                const type = question.attributes.typ.nodeValue;
                const id = parseInt(question.id.replace("otazka", ""));
                question.style.cursor = "pointer";
                question.addEventListener("click", () => {
                    for (let index = 0; index < hodnoceni.data[i].length; index++) {
                        if (type == "multi"  || type == "single") {
                            element = document.querySelectorAll('[otazka="' + id + '"]')[index].children[0].children[0];
                            element.checked = false;
                        }
                        if (hodnoceni.data[i][index][1] == "1") {
                            if (type == "case" || type == "open") {
                                element = document.querySelector('[name="' + id + '"]');
                                element.value = hodnoceni.data[i][0][2];
                                element.dispatchEvent(new Event("input"));
                            } else {
                                element.click();
                            }
                            consoleOut("Otázka: " + (i + 1) + " | Typ: " + type + " | Odpověď: " + (index + 1) + " (" + hodnoceni.data[i][index][2] + ")");
                        }
                    }
                });
            });
            consoleOut("Databáze výsledků byla úspěšně načtena! Nyní stačí poklepat na danou odpověď a správný výsledek se automaticky doplní.");
            consoleOut("Pokud chcete přiřadit všem otázkám správné odpovědi, použijte klávesovou zkratku Ctrl + Space (mezera).");
        },
        error: function() {
            consoleOut("Nepodařilo se načíst databázi výsledků!");
        }                                       
    });

    document.addEventListener("keydown", function(e) {
        if (e.ctrlKey && e.key == " ") {
            document.querySelectorAll(".otazka").forEach(function (e) {
                e.children[0].click();
            });
            consoleOut("Všechny otázky byly úspěšně doplněny!");
        }
    });

    console.log(`
     ____  __   _ _______ ______  _____ 
    / __  || | | |__   __|  ____|/ ____|
    | |  | |  ||  | | |  | |__  | (___  
    | |  | | .  | | | |  |  __|  |___ | 
    | |__| | || | | | |  | |____ ____) |
    |____/ |_| |__|_|_|__|______|_____/ 
     / ____| |  | |  ____|   /||__   __|
    | |    | |__| | |__     /  |  | |   
    | |    |  __  |  __|   / /| | | |   
    | |____| |  | | |____ / ____ || |   
     |_____|_|  |_|______/_/    |_|_|     

    //////  ONTES-CHEAT
    ////    © Tomáš Vojtek ${new Date().getFullYear()} 
    ///     ******************************************
    //      Web: https://tomasvojtek.cz 
    /       GitHub: https://github.com/czvojtektomas
    `);
    consoleOut("ONTES-CHEAT byl úspěšně načten!");