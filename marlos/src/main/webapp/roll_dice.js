const dice = {
    "blank" : "blank.jpg",
    "success" : "success.jpg",
    "success_opportunity" : "success_opportunity.jpg",
    "success_strife" : "success_strife.jpg",
    "explosive_success" : "explosive_success.jpg",
    "explosive_strife" : "explosive_strife.jpg",
    "opportunity" : "opportunity.jpg",
    "opportunity_strife" : "opportunity_strife.jpg"
};

const whiteVals = [
    dice.blank,
    dice.blank,
    dice.success,
    dice.success,
    dice.success_opportunity,
    dice.success_strife,
    dice.success_strife,
    dice.explosive_success,
    dice.explosive_strife,
    dice.opportunity,
    dice.opportunity,
    dice.opportunity
];

const blackVals = [
    dice.blank,
    dice.success,
    dice.success_strife,
    dice.explosive_strife,
    dice.opportunity,
    dice.opportunity_strife
];

const diceZone = document.getElementById("put_da_dice_here");

function roll() {
    while (diceZone.firstChild) {
        diceZone.removeChild(diceZone.firstChild);
    }

    const whiteNum = document.getElementById("white").value;
    addDice("white", whiteNum);
    const blackNum = document.getElementById("black").value;
    addDice("black", blackNum);
}

function addDice(diceType, numDice) {
    if (diceType === "white") {
        for (let i = 0; i < numDice; i++) {
            addElement(whiteVals, 12);
        }
        document.getElementById("put_da_dice_here").appendChild(document.createElement("br"));
    } else if (diceType === "black") {
        for (let i = 0; i < numDice; i++) {
            addElement(blackVals, 6);
        }
    } else {
        console.log("WHAT DID YOU DO");
    }
}

function addElement(diceObj, max, explosion) {
    const exploded = explosion || false;
    const index = Math.floor(Math.random() * max);
    const diceImage = diceObj[index];
    const diceContainer = document.createElement("div");
    const diceImageElement = document.createElement("img");
    diceImageElement.setAttribute("src", "images/" + diceImage);
    diceImageElement.setAttribute("height", "250px");
    diceImageElement.setAttribute("width", "250px");

    if (diceObj === whiteVals) {
        diceImageElement.setAttribute("style", "border-style: solid; border-color: white; border-width: 30px;");
    } else {
        diceImageElement.setAttribute("style", "border-style: solid; border-color: black; border-width: 30px;");
    }

    diceContainer.appendChild(diceImageElement);
    if (diceImage === dice.explosive_strife || diceImage === dice.explosive_success) {
        const subDiceElement = document.createElement("button");
        subDiceElement.setAttribute("id", (Math.random() + 1).toString(36).substring(7));
        if (diceObj == whiteVals) {
            subDiceElement.setAttribute("onclick", "rollExplosionWhite(this.id)");
        } else {
            subDiceElement.setAttribute("onclick", "rollExplosionBlack(this.id)");
        }
        subDiceElement.textContent = "Roll explosion!";
        diceContainer.appendChild(subDiceElement);
    }
    if (exploded === false) {
        document.getElementById("put_da_dice_here").appendChild(diceContainer);
    } else {
        diceContainer.setAttribute("style", "display: inline-block;");
        document.getElementById(explosion).parentNode.appendChild(diceContainer);
        document.getElementById(explosion).parentNode.removeChild(document.getElementById(explosion));
    }
}

function rollExplosionWhite(id) {
    addElement(whiteVals, 12, id);
}

function rollExplosionBlack(id) {
    addElement(blackVals, 6, id);
}