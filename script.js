const cards = document.querySelectorAll('.memory-card');

  let hasFlippedCard = false;
  let firstCard, secondCard;
  let currentScore=0;
//set a variable to prevent clicking 4 cards at the same time  
  let lockBoard = false;
//flip card
  function flipCard() {
    if(lockBoard)return;
    this.classList.add('flip');

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }
//check if first card match second card    
      secondCard = this;
      hasFlippedCard = false; 
      checkForMatch();
 }
//assign each card a dataframework and make them comparable
//compare cards to decide if run function disablecards or unflipcards
 function checkForMatch() {
   if (firstCard.dataset.framework === secondCard.dataset.framework) {
     disableCards();
     return;
 }else{
    unflipCards();
  }
 
 }
 
 //make matched cards unflipable
 function disableCards() {
  currentScore+=1;
  document.getElementById("current-score").innerText = "Current Score: "+currentScore;
   firstCard.removeEventListener('click', flipCard);
   secondCard.removeEventListener('click', flipCard);
 }
 
 //set a timer
 function unflipCards() {
    lockBoard=true;
    currentScore+=1;
     document.getElementById("current-score").innerText = "Current Score: "+currentScore;
   setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
    lockBoard=false;
   }, 1500);
  }
  

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }
//shuffle the card IIFE function
  (function shuffle() {
  cards.forEach(card => {
    let randomPosition = Math.floor(Math.random() * 12);
    card.style.order = randomPosition;
  });
})();

  cards.forEach(card => card.addEventListener('click', flipCard));
