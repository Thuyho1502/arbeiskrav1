
  /* //Del 1:
//1. Opprett en karakter
const nameCharacter = document.getElementById("character-name");
const hpCharacter = document.getElementById("character-hp");
const attackDamage = document.getElementById("attack-damage");
//Velg et profilbilde
const profileImages = document.querySelectorAll(".profile-img");
let selectedImage ="";
profileImages.forEach(img => {
    img.addEventListener("click",()=>{
        selectedImage = img.src;
        highlightSelectedImage(selectedImage);

    });
});
 function highlightSelectedImage(imageSrc){
    profileImages.forEach(img =>{
        img.style.border = img.src === imageSrc ? "3px solid red" : "3px solid yellow";
       });
}   
 
//Lagre karakteren
function createCharacter(name, hp, attack, image) {
    return {
        name: name.trim() || "Ukjent helt",
        hp: parseInt(hp) || 100,
        attack: parseInt(attack) || 10,
        image: image || "assets/dragon.jpg"
    };
}
module.exports = {createCharacter} ;


 const createButton = document.getElementById("create-character");
createButton.addEventListener("click",()=>{
        if(!nameCharacter.value.trim()){
        alert("Skriv et navn for din karakter!");
        return;    
    }  
    const character = createCharacter(
        nameCharacter.value,
        hpCharacter.value,
        attackDamage.value,
        selectedImage
    );
    localStorage.setItem("character", JSON.stringify(character));

    console.log("Karakter opprettet:", character);
    alert(`Karakter ${character.name}er opprettet med ${character.hp} HP og ${character.attack} angrep!`);
}); 
  
 
//Del 2
// Funksjon for å generere en tilfeldig fiende
function generateEnemy() {
    const enemies = [
        {
            name: "Goblin", image: src="assets/monster.jpg"
        },
        {
            name:"Drage", image: src="assets/dragon.jpg"
        },
        {
            name:"Ork",image: src="assets/swamp-monster.jpg"
        }
    ];

    //velg en tilfeldig fiende fra listen
    const randomEnemy = enemies[Math.floor(Math.random()*enemies.length)];

    //Generer tilfeldig Hp og angrepsstyre innenfor angitte verdier
    const randomHP = Math.floor(Math.random()*(150 -50 +1))+50;
    const randomAttack = Math.floor(Math.random()*(40-10 +1)) +10;

    //Opprett et objekt for fienden
    const enemy ={
        name: randomEnemy.name,
        image: randomEnemy.image,
        hp:randomHP,
        attack: randomAttack
    };
    //Large file i localStorage
    localStorage.setItem("enemy",JSON.stringify(enemy));

    //Oppdater HTML for å vise fiende
    document.getElementById("enemy-img").src = enemy.image;
    document.getElementById("enemy-name").textContent = `Navn:${enemy.name}`;
    document.getElementById("enemy-hp").textContent= `HP:${enemy.hp}`;
    document.getElementById("enemy-attack").textContent = `Angrep: ${enemy.attack}`;
   
}

//document.getElementById("generate-enemy").addEventListener("click",generateEnemy);
module.exports = {generateEnemy};
*/
//Del 3
document.getElementById("start-fight").addEventListener("click", function(){

    const character = JSON.parse(localStorage.getItem("character"));
    const enemy = JSON.parse(localStorage.getItem("enemy"));
    if(!character||!enemy){
        alert("Du må lage en karakter og generer en fiende før du kan starte kampen!")
        return;
    }

     // Simulate battle

    let newCharHP = character.hp -enemy.attack;
    let newEnemyHP = enemy.hp -character.attack;

    let battleResult = "";
    if(newCharHP > newEnemyHP){
        battleResult = "Du vant!";
    }else if (newCharHP < newEnemyHP){
        battleResult = "Du tape!";
    }else{
        battleResult ="Uavgjort!"
    }
    document.getElementById("battle-result").textContent= battleResult;
    
    // Show character and enemy profile
    
    // clear previous battle elements if they exist
    const previousCharDisplay = document.getElementById("character-display");
    const previousEnemyDisplay= document.getElementById("enemy-fight-display");
    if(previousCharDisplay) previousCharDisplay.remove();
    if(previousEnemyDisplay) previousEnemyDisplay.remove();

    // character display
    let charDisplay = document.createElement("div");
    charDisplay.id ="character-display";
    charDisplay.className = "profile-card";
    charDisplay.innerHTML =`
    <h2>Helten</h2>
          <img id="char-img" src="${character.image}" alt="Profilbilde" />
          <p id="char-name">Navn:${character.name}</p>
          <p id="char-hp">HP:${character.hp}</p>
          <p id="char-attack">Angrep:${character.attack}</p>
          ` ;
    document.getElementById("battle-area").appendChild(charDisplay);

    // enemy display
    let enemyDisplay = document.createElement("div");
    enemyDisplay.id ="enemy-fight-display";
    enemyDisplay.className ="profile-card";
    enemyDisplay.innerHTML = `
     <h2>Fiende</h2>
          <img id="enemy-fight-img" src="${enemy.image}"alt="Fiendens profilbilde" />
          <p id="enemy-fight-name">Navn: "${enemy.name}"</p>
          <p id="enemy-fight-hp">HP:"${enemy.hp}"</p>
          <p id="enemy-fight-attack">"${enemy.attack}"</p>
    `;
    document.getElementById("battle-area").appendChild(enemyDisplay);

    module.exports = { startFight, getCharacter, getEnemy };

});    
  