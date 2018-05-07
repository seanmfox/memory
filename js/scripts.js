const grid = document.querySelector('.grid');
let firstChoice = "";
let secondChoice = "";
let firstChoiceClasses = "";
let secondChoiceClasses = "";
let shapes = ['<i class="far fa-bell icon"></i>','<i class="fas fa-arrows-alt"></i>','<i class="fas fa-battery-full"></i>','<i class="far fa-calendar"></i>','<i class="fas fa-bicycle"></i>','<i class="fas fa-camera"></i>','<i class="fas fa-clock"></i>','<i class="fas fa-football-ball"></i>','<i class="far fa-bell icon"></i>','<i class="fas fa-arrows-alt"></i>','<i class="fas fa-battery-full"></i>','<i class="far fa-calendar"></i>','<i class="fas fa-bicycle"></i>','<i class="fas fa-camera"></i>','<i class="fas fa-clock"></i>','<i class="fas fa-football-ball"></i>'];

function loadGame() {
    const fragment = document.createDocumentFragment();
    for(let i = 0; i < 16; i++) {
        const block = document.createElement('div');
        block.className = 'card';
        let shapeChoice = Math.round(Math.random() * shapes.length-1);
        shapeChoice < 0 ? shapeChoice = 0 : shapeChoice = shapeChoice;
        console.log(shapeChoice + " " + shapes[shapeChoice]);
        block.innerHTML= shapes[shapeChoice];
        shapes.splice(shapeChoice, 1);
        fragment.appendChild(block);
    }
    
    grid.appendChild(fragment);
}

let choiceCount = 0;

let attempts = 0;

let attemptCount = document.querySelector('.counter');

grid.addEventListener("click", function(e){
    if(e.target.firstElementChild.classList[0] !== "card") {
        choiceCount += 1;
        if(choiceCount === 1){
            firstChoice = e.target.firstElementChild;
            firstChoiceClasses = firstChoice.classList;
            firstChoiceClasses.add('chosen');
            console.log(e.target.firstElementChild);
        }
        if(choiceCount === 2) {
            secondChoice = e.target.firstElementChild;
            secondChoiceClasses = secondChoice.classList;
            secondChoiceClasses.add('chosen');
            console.log(firstChoice);
            console.log(secondChoice);
            attempts += 1;
            attemptCount.textContent = attempts;
            if(firstChoiceClasses[1] === secondChoiceClasses[1]) {
                console.log("Congrats!");
                choiceCount = 0;
            } else {
                firstChoiceClasses.add('wrong');
                secondChoiceClasses.add('wrong');                
                window.setTimeout(function() {
                    firstChoiceClasses.remove('chosen', 'wrong');
                    secondChoiceClasses.remove('chosen', 'wrong');
                    }, 1000);
                choiceCount = 0;
            }
        }
    }
});


loadGame();

