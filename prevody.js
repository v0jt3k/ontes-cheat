    /**
     * ONTES-CHEAT
     * © Tomáš Vojtek 2022
     * https://github.com/czvojtektomas/ontes-cheat
    */


    function consoleOut(message) {
        console.log("[ONTES-CHEAT] " + message);
    }
                                            
    let element, number;
    document.querySelectorAll(".otazka").forEach(function (e, i) {
        const question = e.children[0];
        const type = question.attributes.typ.nodeValue;
        const id = parseInt(question.id.replace("otazka", ""));
        const answers = document.querySelectorAll('[otazka="' + id + '"]');
        question.style.cursor = "pointer";
        question.addEventListener("click", () => {
            if (type == "single") {
                if (question.innerText.includes("dvojkové")) {
                    number = question.innerText.split(" ");
                    number = (parseInt(number[number.length - 2]).toString(2)).padStart(8, "0");
                    answers.forEach((element) => {
                        if (element.textContent.replace(" ", "") == number) {
                            element.children[0].children[0].click();
                            consoleOut("Dvojková otázka " + (i+1) + " byla vyplněna!");
                        }
                    });
                } else if (question.innerText.includes("desítkové")) {
                    number = question.innerText.split(" ");
                    number = parseInt(number[number.length - 2], 2);
                    answers.forEach((element) => {
                        if (element.textContent.replace(" ", "") == number) {
                            element.children[0].children[0].click();
                            consoleOut("Desítková otázka " + (i+1) + " byla vyplněna!");
                        }
                    });                
                } else if (question.innerText.includes("hexadecimální")) {
                    answers.forEach((element) => {
                        if (element.textContent.replace(" ", "").split('').every(c => '0123456789ABCDEFabcdef'.indexOf(c) !== -1)) {
                            element.children[0].children[0].click();
                            consoleOut("Hexadecimální otázka " + (i+1) + " byla vyplněna!");
                        }
                    });
                } else {
                    consoleOut("Otázku se nepodařilo doplnit!");
                }
            } else {
                consoleOut("Otázku se nepodařilo doplnit, protože její datový typ neodpovídá žádné z odpovědí.")
            }
        });
    });
    consoleOut("Funkce automatického doplňování byly úspěšně načteny! Nyní stačí poklepat na danou odpověď a správný výsledek se automaticky doplní.");
    consoleOut("Pokud chcete přiřadit všem otázkám správné odpovědi, použijte klávesovou zkratku Ctrl + Space (mezera).");

    document.addEventListener("keydown", function(e) {
        if (e.ctrlKey && e.key == " ") {
            document.querySelectorAll(".otazka").forEach(function (e) {
                e.children[0].click();
            });
            consoleOut("Otázky byly úspěšně doplněny!");
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
