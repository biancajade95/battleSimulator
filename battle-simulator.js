// Import Basic Shared Values
class Being {
    constructor(name, maxHitPoint, attackDiceValue, attackDiceQuantity) {
        this.name = name;
        this.maxHitPoint = maxHitPoint;
        this.attackDiceValue = attackDiceValue;
        this.attackDiceQuantity= attackDiceQuantity;
    }
    attack() {
        let attackTotal = [];
        for (let i = 0; i < this.attackDiceQuantity; i++) {
            const roll = Math.floor(Math.random() * this.attackDiceValue) + 1;
            attackTotal.push(roll);
        }
        console.log("The rolls are: " + attackTotal);
        attackTotal = attackTotal.reduce((partialSum, a) => partialSum + a, 0);
        console.log(`${this.name} attacks and does ` + attackTotal + ` damage!`);
    }
}



// Import Player Character Stats



// Import Monster Stats




// Battle Arena
const playerCharacter1 = new Being("Nasavi", 28, 12, 3);
playerCharacter1.attack();


// Produce Results