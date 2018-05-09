//Game load global variables
const grid = document.querySelector('.grid');
const timer = document.querySelector('.timer');
let firstChoice = '';
let secondChoice = '';
let firstChoiceClasses = '';
let secondChoiceClasses = '';
let start = '00:00:00';
let incrementTimer = '';

function loadGame() {
    let shapes = ['<i class="far fa-bell icon"></i>',
        '<i class="fas fa-arrows-alt"></i>',
        '<i class="fas fa-battery-full"></i>',
        '<i class="far fa-calendar"></i>',
        '<i class="fas fa-bicycle"></i>',
        '<i class="fas fa-camera"></i>',
        '<i class="fas fa-clock"></i>',
        '<i class="fas fa-football-ball"></i>',
        '<i class="far fa-bell icon"></i>',
        '<i class="fas fa-arrows-alt"></i>',
        '<i class="fas fa-battery-full"></i>',
        '<i class="far fa-calendar"></i>',
        '<i class="fas fa-bicycle"></i>',
        '<i class="fas fa-camera"></i>',
        '<i class="fas fa-clock"></i>',
        '<i class="fas fa-football-ball"></i>'
    ];
    firstChoice = '';
    secondChoice = '';
    firstChoiceClasses = '';
    secondChoiceClasses = '';
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

//Click event global variables
let attemptCount = document.querySelector('.counter');
let choiceCount = 0;
let attempts = 0;
let correctMatch = 0;

grid.addEventListener("click", function(e){
    if(e.target.firstElementChild !== null && e.target.firstElementChild.classList[0] !== 'card' && 
    (secondChoiceClasses === '' || !secondChoice.parentElement.classList.contains('wrong'))) {
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
            starCount(attempts);
            if(firstChoiceClasses[1] === secondChoiceClasses[1]) {
                firstChoice.parentElement.classList.add('correct');
                secondChoice.parentElement.classList.add('correct');
                correctMatch += 1;
                choiceCount = 0;
                if (correctMatch === 8) {
                    console.log("You won!");
                    gameWin();
                }
            } else {
                firstChoice.parentElement.classList.add('wrong');
                secondChoice.parentElement.classList.add('wrong');
                window.setTimeout(function() {
                    firstChoiceClasses.remove('chosen');
                    secondChoiceClasses.remove('chosen');
                    firstChoice.parentElement.classList.remove('wrong');
                    secondChoice.parentElement.classList.remove('wrong'); 
                    }, 1000);
                choiceCount = 0;
            }
        }
    }
});

// Change star count
const stars = document.querySelector('.stars');
function starCount(moves) {
    switch (moves) {
        case 10:
            stars.innerHTML = '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>';
            break;
        case 15:
            stars.innerHTML = '<i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>';
            break;
        default:

    }
}



//Reset game
function gameReset(){
    console.log('resetting');
    grid.innerHTML = '';
    loadGame();
    attemptCount.textContent = 0;
    stars.innerHTML = '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>';
    congrats.classList.remove('win');
}
const reset = document.querySelector('.reset');
reset.addEventListener('click', gameReset);

//Game win
function gameWin(){
    window.setTimeout(function() {
        congrats.classList.add('win');
    }, 1000);
    window.clearInterval(incrementTimer);
    finalTime.textContent = timer.textContent;
    finalStar.innerHTML = stars.innerHTML;
    moveCount.textContent = attempts;
    
}
const congrats = document.querySelector('.congrats');
const finalTime = document.querySelector('.final-time');
const replay = document.querySelector('.replay');
const finalStar = document.querySelector('.final-star');
const moveCount = document.querySelector('.move-count');
replay.addEventListener('click', gameReset);

loadGame();