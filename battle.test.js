
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

 */

const{generateEnemy} =  require('./app.js');
describe('generateEnemy',() =>{
    test("should generate an enemy with a random HP and attack",()=>{
        const enemy = generateEnemy();
        
        expect(enemy.name).toBeDefined();
        expect(enemy.image).toBeDefined();
        expect(enemy.hp).toBeGreaterThanOrEqual(50);
        expect(enemy.hp).ToBeLessThanOrEqual(150);
        expect(enemy.attack).toBeGreaterThanOrEqual(10);
        expect(enemy.attack).ToBeLessThanOrEqual(40);
    });
}); 