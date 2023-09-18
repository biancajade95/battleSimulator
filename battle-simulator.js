// Basic Shared Values
class Being {
    constructor(name, maxHitPoint, attackDiceValue, attackDiceQuantity) {
        this.name = name;
        this.maxHitPoint = maxHitPoint;
        this.attackDiceValue = attackDiceValue;
        this.attackDiceQuantity= attackDiceQuantity;
    };
    attack() {
        let attackTotal = [];
        for (let i = 0; i < this.attackDiceQuantity; i++) {
            const roll = Math.floor(Math.random() * this.attackDiceValue) + 1;
            attackTotal.push(roll);
        };

        alert("The rolls are: " + attackTotal);
        attackTotal = attackTotal.reduce((partialSum, a) => partialSum + a, 0);
        alert(`${this.name} attacks and does ` + attackTotal + ` damage!`);
        return attackTotal;
    };
};

// Import Player Character & Monster Stats
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("userForm");
    const userFormDataArray = [];

    form.addEventListener("submit", async function(event) {
        event.preventDefault(); 

        const playerCharacterName = form.playerCharacter.value;
        const playerMaxHitPoint = form.maxHitPoint.value;
        const playerDiceFace = form.diceFace.value;
        const playerDiceQty = form.diceQty.value;

        const playerCharacter = new Being(
            playerCharacterName,
            playerMaxHitPoint,
            playerDiceFace,
            playerDiceQty
        );

        const monsterStats = (form.monsterName.value).replace(/ /g, "-");
        
        
        try{
            const monster = await fetchMonster(monsterStats);
            userFormDataArray.push(playerCharacter);
            console.log(userFormDataArray); 

            battle(playerCharacter, monster);

            form.reset();
        } catch (error) {
            console.log(error);
        }
    });
});

async function fetchMonster(monsterURL) {
    try {
        const url = "https://www.dnd5eapi.co/api/monsters/" + monsterURL;
        const response = await fetch(url);
        const monsterData = await response.json();

        if (response.ok) {
            const monsterName = monsterData.name;
            const monsterMaxHitPoint = monsterData.hit_points;

            const firstDamageDice = monsterData.actions[0].damage[0].damage_dice;
            const indexOfD = firstDamageDice.indexOf('d');

            const monsterDiceQty = parseInt(firstDamageDice.slice(0, indexOfD));
            const monsterDiceFace = parseInt(firstDamageDice.slice(indexOfD + 1));

            console.log(monsterData);

            const monster = new Being(
                monsterName,
                monsterMaxHitPoint,
                monsterDiceFace,
                monsterDiceQty
            );

            console.log(monster);
            return monster;
        } else {
            console.error('API request was not successful:', monsterData.message);
        }
    } catch (error) {
        console.error('There was an error!', error);
    };
};

function battle(playerCharacter, monster) {
    let playerHitPoint = playerCharacter.maxHitPoint;
    let monsterHitPoint = monster.maxHitPoint;

    while (playerHitPoint > 0 && monsterHitPoint > 0) {
        const playerDamage = playerCharacter.attack();
        const monsterDamage = monster.attack();

        playerHitPoint -= monsterDamage;
        monsterHitPoint -= playerDamage;

        console.log(`${playerCharacter.name} HP: ${playerHitPoint}`);
        console.log(`${monster.name} HP: ${monsterHitPoint}`);
    };
    if (playerHitPoint <= 0) {
        alert(`${playerCharacter.name} has fallen! The ${monster.name} wins.`);
    } else {
        alert(`The ${monster.name} was defeated! ${playerCharacter.name} wins!`);
    };
};