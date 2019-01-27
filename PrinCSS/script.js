//class Fighter, the objects are hero and dragon
class Fighter {
    constructor(name, lifeEnergy) { //constructor of class Fighter = Muster für den Aufbau with the parameters name and lifeEnergy
        this.name = name;
        this.life = lifeEnergy;
    }
    getAttack() { //method to get a random number
        return Math.floor(Math.random() * 6 + 2);
    }
}

//function to find the winner of the round, returns it with the values -1, 1 or 0
function getTurnWinner(attackHero, attackDragon) {
    if (attackHero > attackDragon) {
        return -1;
    } else if (attackDragon > attackHero) {
        return 1;
    } else {
        return 0;
    }
}

//function to log the content to the console and the html-page
function htmlConsoleLog(text) {
    console.log(text);
    $("#htmlconsole").append("<p>" + text + "</p>");
}

//function to clear the html-page to start a new fight
function clearHtmlPage() {
    $("#clear").click(
        function () {
            $("#htmlconsole").empty();
            console.clear();
        }
    );
}

$(
    function () {
        $("#start").click(function () { //function to start the fight per click
            $("#htmlconsole").empty(); //html-page leeren vor nächsten click
            console.clear();
            var hero = new Fighter("hero", 10); //create object from constructor from class Fighter
            var dragon = new Fighter("dragon", 10); //create object from constructor from class Fighter
            var numberOfRound = 0; //var which counts the round

            while (hero.life > 0 && dragon.life > 0) {
                var pointsHero = 0; //var which sets the points of hero per round
                var pointsDragon = 0; //var which sets the points of dragon per round
                var numberOfTurn = 1; //var which counts the turns per round
                numberOfRound++; //per round, the value is increased by one

                //Loop, which sets 3 turns per round
                for (var i = 1; i < 4; i++) {
                    var fightResult = getTurnWinner(hero.getAttack(), dragon.getAttack()); //Function wird aufgerufen, der Kampf erfolgt und der Wert -1, 1, 0 wird zurückgegeben (je nach Ausgang des Kampfes)

                    //the result of the fight is used to determine the winner and the recent score, the points are added to the account of the winner.
                    switch (fightResult) {
                        case -1:
                            pointsHero += 3;
                            htmlConsoleLog("The hero wins turn " + numberOfTurn + ". The hero has " + pointsHero + " point(s) and the dragon has " + pointsDragon + " point(s) now.");
                            numberOfTurn++;
                            break;

                        case 1:
                            pointsDragon += 3;
                            htmlConsoleLog("The dragon wins turn " + numberOfTurn + ". The hero has " + pointsHero + " point(s) and the dragon has " + pointsDragon + " point(s) now.");
                            numberOfTurn++;
                            break;

                        case 0:
                            pointsHero += 1;
                            pointsDragon += 1;
                            htmlConsoleLog("The hero and the dragon have been equally strong in turn " + numberOfTurn + ". The hero has " + pointsHero + " point(s) and the dragon has " + pointsDragon + " point(s).");
                            numberOfTurn++;
                            break;

                        default:
                            htmlConsoleLog("There must be a mistake. We can not determine the winner of this turn.");
                    }
                }

                //the collected points per round are compared and (depending on the difference) the lives get reduced
                if ((pointsHero - pointsDragon) > 0 && (pointsHero - pointsDragon) < 6) {
                    dragon.life -= 1;
                    if (dragon.life <= 0) { //lives can never be negative
                        dragon.life = 0;
                    }
                    htmlConsoleLog("The dragon loses one life in round " + numberOfRound + ". The dragon has " + dragon.life + " lives left.");
                } else if ((pointsHero - pointsDragon) >= 6) {
                    dragon.life -= 3;
                    if (dragon.life <= 0) {
                        dragon.life = 0;
                    }
                    htmlConsoleLog("The dragon loses three lives in round " + numberOfRound + ". The dragon has " + dragon.life + " lives left. Great job!");
                } else if ((pointsDragon - pointsHero) > 0 && (pointsDragon - pointsHero) < 6) {
                    hero.life -= 1;
                    if (hero.life <= 0) {
                        hero.life = 0;
                    }
                    htmlConsoleLog("The hero loses one life in round " + numberOfRound + ". The hero has " + hero.life + " lives left. Stay strong!");
                } else if ((pointsDragon - pointsHero) >= 6) {
                    hero.life -= 3;
                    if (hero.life <= 0) {
                        hero.life = 0;
                    }
                    htmlConsoleLog("The hero loses three lives in round " + numberOfRound + ". The hero has " + hero.life + " lives left. Oh no!");
                } else {
                    htmlConsoleLog("The hero and the dragon have reached the same amount of points in round " + numberOfRound + ". No one loses a life.");
                }
            }

            //if hero or dragon reach 0 lives, the lives are compared to each other to determine the winner of the whole fight.
            if ((hero.life - dragon.life) > 0) {
                htmlConsoleLog("The fight is over. The hero wins this fight - the prinCSS is saved. He has " + hero.life + " life/lives left and the dragon has " + dragon.life + " lives.");
            } else if ((dragon.life - hero.life) > 0) {
                htmlConsoleLog("The fight is over. The dragon wins this fight - the pinCSS belongs to him. He has " + dragon.life + " life/lives left and the hero has " + hero.life + " lives.");
            } else {
                htmlConsoleLog("It has been a hard battle. Both, the hero and the dragon had to die.");
            }
        }
        )
        clearHtmlPage(); //call of the function to clear the html-page
    }
)