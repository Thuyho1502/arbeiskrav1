/**
 * @jest-environment jsdom
 */

/* const {createCharacter} = require('./app.js');
describe('createCharacter', () => {
  test('should create a character with provided values', () => {
    const character = createCharacter('Hero', 120, 30, 'assets/hunter.jpg');
    
    expect(character.name).toBe('Hero');
    expect(character.hp).toBe(120);
    expect(character.attack).toBe(30);
    expect(character.image).toBe('assets/hunter.jpg');
  });

  test('should create a character with default values if inputs are empty', () => {
    const character = createCharacter('', '', '', '');
    
    expect(character.name).toBe('Ukjent helt');
    expect(character.hp).toBe(100);
    expect(character.attack).toBe(10);
    expect(character.image).toBe('assets/dragon.jpg');
  });
});


 
 const { generateEnemy } = require("./app.js");

describe("generateEnemy", () => {
    let localStorageMock;
    let domElements;

    beforeEach(() => {
        // Mock localStorage
        localStorageMock = {
            setItem: jest.fn(),
            getItem: jest.fn(),
            clear: jest.fn()
        };
        global.localStorage = localStorageMock;

        // Mock document.getElementById
        domElements = {
            "enemy-img": { src: "" },
            "enemy-name": { textContent: "" },
            "enemy-hp": { textContent: "" },
            "enemy-attack": { textContent: "" }
        };

        document.getElementById = jest.fn((id) => domElements[id]);
    }); 
    test("should generate an enemy with valid properties", () => {
      generateEnemy();
  
      const storedEnemy = JSON.parse(localStorage.getItem("enemy"));
  
      expect(storedEnemy).toBeDefined();
      expect(storedEnemy.name).toMatch(/Goblin|Drage|Ork/);
      expect(storedEnemy.image).toMatch(/assets\/(monster|dragon|swamp-monster)\.jpg/);
      expect(storedEnemy.hp).toBeGreaterThanOrEqual(50);
      expect(storedEnemy.hp).toBeLessThanOrEqual(150);
      expect(storedEnemy.attack).toBeGreaterThanOrEqual(10);
      expect(storedEnemy.attack).toBeLessThanOrEqual(40);
  });
    test("should store enemy in localStorage", () => {
        generateEnemy();

        const storedEnemy = JSON.parse(localStorage.getItem("enemy"));

        expect(storedEnemy).toBeDefined();
        expect(storedEnemy.name).toMatch(/Goblin|Drage|Ork/);
    });


});*/
 



describe("Battle System", () => {
  beforeEach(() => {
      // Set up the required DOM elements
      document.body.innerHTML = `
          <button id="start-fight">Start Fight</button>
          <p id="battle-result"></p>
          <div id="battle-area"></div>
      `;

      // Mock localStorage
      localStorage.clear();
      jest.resetModules(); // Ensure fresh module import

      // Mock startFight function
      global.startFight = jest.fn(() => {
          const character = JSON.parse(localStorage.getItem("character"));
          const enemy = JSON.parse(localStorage.getItem("enemy"));

          if (!character || !enemy) {
              alert("Du må lage en karakter og generer en fiende før du kan starte kampen!");
              return;
          }

          const battleResult = document.getElementById("battle-result");

          if (character.hp > enemy.hp) {
              battleResult.textContent = "Du vant!";
          } else if (character.hp < enemy.hp) {
              battleResult.textContent = "Du tape!";
          } else {
              battleResult.textContent = "Uavgjort!";
          }
      });

      // Attach the mock function to the button click event
      document.getElementById("start-fight").addEventListener("click", startFight);
  });

  test("should show 'Du vant!' if character has more HP left", () => {
      localStorage.setItem("character", JSON.stringify({ name: "Hero", hp: 100, attack: 50 }));
      localStorage.setItem("enemy", JSON.stringify({ name: "Goblin", hp: 80, attack: 20 }));

      document.getElementById("start-fight").click();

      expect(document.getElementById("battle-result").textContent).toBe("Du vant!");
  });

  test("should show 'Du tape!' if enemy has more HP left", () => {
      localStorage.setItem("character", JSON.stringify({ name: "Hero", hp: 80, attack: 20 }));
      localStorage.setItem("enemy", JSON.stringify({ name: "Goblin", hp: 100, attack: 50 }));

      document.getElementById("start-fight").click();

      expect(document.getElementById("battle-result").textContent).toBe("Du tape!");
  });

  test("should show 'Uavgjort!' if both have the same HP left", () => {
      localStorage.setItem("character", JSON.stringify({ name: "Hero", hp: 80, attack: 20 }));
      localStorage.setItem("enemy", JSON.stringify({ name: "Goblin", hp: 80, attack: 20 }));

      document.getElementById("start-fight").click();

      expect(document.getElementById("battle-result").textContent).toBe("Uavgjort!");
  });


});
  