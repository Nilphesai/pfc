let resetBtn = document.getElementById("reset");
let scorePlayer = document.getElementById("score-player");
let scoreOrdi = document.getElementById("score-computer");
let btnPlayer = [... document.getElementsByClassName("btn-player")];
let oPierreBtn = document.getElementById("oPierre");
let oFeuilleBtn = document.getElementById("oFeuille");
let oCiseauxBtn = document.getElementById("oCiseaux");
let message = document.getElementById("message");
let nextBtn = document.getElementById("next");

const play = (e) => {
    let choix = e.target.closest(".btn-player");

    btnPlayer.forEach((btn) => {
        btn.classList.add("desactivates");
        btn.removeEventListener('click', play);

    });

    choix.classList.remove("desactivated");
    choix.classList.add("active");

    let choixPlayer = choix.id;

    let choixComputer = playComputer();

    verifierGagnant(choixPlayer, choixComputer);

    nextBtn.style.visibility = "visible";
};

const PIERRE = "pierre";
const FEUILLE = "feuille";
const CISEAUX = "ciseaux";

const playComputer = () =>{
    let nbAleat = Math.floor(Math.random() * 3);

    switch(nbAleat){
        case 0 :
            oPierreBtn.classList.add("active");
            return PIERRE;
        case 1 :
            oFeuilleBtn.classList.add("active");
            return FEUILLE;
        case 2 :
            oCiseauxBtn.classList.add("active");
            return CISEAUX;

    }
}

const verifierGagnant = (choixPlayer, choixComputer) => {
    if(choixPlayer == choixComputer) {
        message.textContent = "Egalité !";
        return;
    }

    if (choixPlayer == PIERRE){
        if (choixComputer == FEUILLE){
            return winComputer();
        } else if (choixComputer == CISEAUX){
            return winPlayer();
        }
    }

    if (choixPlayer == FEUILLE){
        if (choixComputer == CISEAUX){
            return winComputer();
        } else if (choixComputer == PIERRE){
            return winPlayer();
        }
    }

    if (choixPlayer == CISEAUX){
        if (choixComputer == PIERRE){
            return winComputer();
        } else if (choixComputer == FEUILLE){
            return winPlayer();
        }
    }
}

const winComputer = () => {
    message.textContent = "l'ordinateur gagne ...";
    scoreOrdi.textContent++;
}

const winPlayer = () => {
    message.textContent = "Vous avez gagné !";
    scorePlayer.textContent++;
}

const newPlay = () => {
    btnPlayer.forEach((btn) => {
      btn.classList.remove("desactivated");
      btn.classList.remove("active");
  
      btn.addEventListener("click", play);
    });
  
    nextBtn.style.visibility = "hidden";
  
    oPierreBtn.classList.remove("active");
    oFeuilleBtn.classList.remove("active");
    oCiseauxBtn.classList.remove("active");
  
    message.textContent = "A vous de jouer !";
  };
  
  nextBtn.addEventListener("click", newPlay);
  
  btnPlayer.forEach((btn) => btn.addEventListener("click", play));

resetBtn.addEventListener("click", () => {
    scorePlayer.textContent = 0;
    scoreOrdi.textContent = 0;
  
    newPlay();
  });