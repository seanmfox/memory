const grid = document.querySelector('.grid');
let firstChoice = "";
let secondChoice = "";
let firstChoiceClasses = "";
let secondChoiceClasses = "";
let start = "00:00:00";
let incrementTimer = "";

function loadGame() {
    let shapes = ['<i class="far fa-bell icon"></i>','<i class="fas fa-arrows-alt"></i>','<i class="fas fa-battery-full"></i>','<i class="far fa-calendar"></i>','<i class="fas fa-bicycle"></i>','<i class="fas fa-camera"></i>','<i class="fas fa-clock"></i>','<i class="fas fa-football-ball"></i>','<i class="far fa-bell icon"></i>','<i class="fas fa-arrows-alt"></i>','<i class="fas fa-battery-full"></i>','<i class="far fa-calendar"></i>','<i class="fas fa-bicycle"></i>','<i class="fas fa-camera"></i>','<i class="fas fa-clock"></i>','<i class="fas fa-football-ball"></i>'];
    firstChoice = "";
    secondChoice = "";
    firstChoiceClasses = "";
    secondChoiceClasses = "";
    choiceCount = 0;
    attempts = 0;
    correctMatch = 0;
    
    //Create memory board
    const fragment = document.createDocumentFragment();
    for(let i = 0; i < 16; i++) {
        const block = document.createElement('div');
        block.className = 'card';
        let shapeChoice = Math.round(Math.random() * shapes.length-1);
        shapeChoice < 0 ? shapeChoice = 0 : shapeChoice = shapeChoice;
        block.innerHTML= shapes[shapeChoice];
        shapes.splice(shapeChoice, 1);
        fragment.appendChild(block);
    }
    grid.appendChild(fragment);
    
    //Start timer
    const timer = document.querySelector('.timer');
    start = Date.now();
    incrementTimer = window.setInterval(function(){
        let timing = Math.floor((Date.now() - start)/1000); 
        timeFormat(timing);
    }, 1000);
    
    //Update timer display
    function timeFormat(current) {
        let seconds = ((current % 60));
        let minutes = (Math.floor((current / 60)) - (Math.floor((current / 3600)) * 60));
        let hours = Math.floor((current / 3600));
        timer.innerHTML = hours.toString().padStart(2,'0') + ':' + minutes.toString().padStart(2,'0') + ':' + seconds.toString().padStart(2,'0');
    }
}

let choiceCount = 0;
let attempts = 0;
let attemptCount = document.querySelector('.counter');
let correctMatch = 0;

grid.addEventListener("click", function(e){
    if(e.target.firstElementChild.classList[0] !== "card") {
        choiceCount += 1;
        if(choiceCount === 1){
            firstChoice = e.target.firstElementChild;
            firstChoiceClasses = firstChoice.classList;
            firstChoiceClasses.add('chosen');
        }
        else if(choiceCount === 2) {
            secondChoice = e.target.firstElementChild;
            secondChoiceClasses = secondChoice.classList;
            secondChoiceClasses.add('chosen');
            attempts += 1;
            attemptCount.textContent = attempts;
            if(firstChoiceClasses[1] === secondChoiceClasses[1]) {
                firstChoice.parentElement.classList.add('correct');
                secondChoice.parentElement.classList.add('correct');
                correctMatch += 1;
                choiceCount = 0;
                if (correctMatch === 8) {
                    console.log("You won!");
                    window.clearInterval(incrementTimer);
                }
            } else {
                firstChoice.parentElement.classList.add('wrong');
                secondChoice.parentElement.classList.add('wrong');                
                window.setTimeout(function() {
                    firstChoice.parentElement.classList.remove('wrong');
                    secondChoice.parentElement.classList.remove('wrong'); 
                    firstChoiceClasses.remove('chosen', 'wrong');
                    secondChoiceClasses.remove('chosen', 'wrong');
                    }, 1000);
                choiceCount = 0;
            }
        }
    }
});

loadGame();

const reset = document.querySelector('.reset');
reset.addEventListener("click", function(e){
    grid.innerHTML = "";
    loadGame();
    attemptCount.textContent = 0;
})