class Car {
    #brand;
    #model;
    speed = 0;
    topSpeed = 200;
    acceleration = 5; // This should be always 5
    isTrunkOpen = false;

    constructor(brand, model) {
        this.#brand = brand;
        this.#model = model;
    }

    displayInfo() {
        console.log(`${this.#brand} ${this.#model}, Speed : ${this.speed} km/h, The trunk is ${this.isTrunkOpen ? 'open' : 'closed'}.`);
    }

    go() {
        if (this.isTrunkOpen) {
            return 'Cannot move: The trunk is open.'
        };

        if (this.speed + this.acceleration > this.topSpeed)  {
            return `Speed cannot be more than ${this.topSpeed}`;
        };

        this.speed += this.acceleration;

        this.displayInfo();
    }

    brake() {
        if (this.speed - 5 < 0) {
            return 'Speed cannot be lower than 0';
        };
        this.speed -= 5;
        this.displayInfo();

    }

    openTrunk() {
        if (!this.isTrunkOpen && this.speed === 0) {
            this.isTrunkOpen = true;
            this.displayInfo();
        } else {
            return 'Cannot open the trunk.'
        };
    }

    closeTrunk() {
        if (this.isTrunkOpen) {
            this.isTrunkOpen = false;
            this.displayInfo();
        } else {
            return 'Cannot close the trunk.'
        }
    }

};

class RaceCar extends Car {
    topSpeed = 300;
    acceleration = 10;

    constructor(brand, model, acceleration) {
        super(brand, model);
        this.acceleration = acceleration;
    }

    openTrunk() {
        return 'A race car does not have a trunk.'
    };

    closeTrunk() {
        return 'A race car does not have a trunk.'
    };
};


const car1 = new Car('Toyota', 'Corolla');
const car2 = new Car('Tesla', 'Model 3');

car1.displayInfo();
car2.displayInfo();

for (let i = 0; i < 201; i++) {
    console.log(car1.go());
};

console.log(car2.brake());
car2.openTrunk();
car2.go();
car2.closeTrunk();



const raceCar = new RaceCar('Mclaren', 'F1', 20);

for (let i = 0; i < 5; i++) {
    raceCar.go();
}