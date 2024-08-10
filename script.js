let resetBtn = document.getElementById("reset");
let scorePlayer = document.getElementById("score-player");
let scoreOrdi = document.getElementById("score-computer");
let btnPlayer = [... document.getElementsByClassName("btn-player")];
let oPierreBtn = document.getElementById("oPierre");
let oFeuilleBtn = document.getElementById("oFeuille");
let oCiseauxBtn = document.getElementById("oCiseaux");
let message = document.getElementById("message");
let nextBtn = document.getElementById("next");

//fonction de jeu
const play = (e) => {
    let choix = e.target.closest(".btn-player");
    //pour chaque bouton, le "désactivé" en CSS et les rendre non clickable
    btnPlayer.forEach((btn) => {
        btn.classList.add("desactivates");
        btn.removeEventListener('click', play);

    });
    //on enlève le "désactive" le bouton choisi par le joueur
    choix.classList.remove("desactivated");
    //on ajoute le "active"
    choix.classList.add("active");
    //on récupère l'ID de ce que le joueur à choisi (pierre,feuille,ciseaux)
    let choixPlayer = choix.id;
    //on récupère le coup de l'ordinateur
    let choixComputer = playComputer();
    //on compare les deux coups
    verifierGagnant(choixPlayer, choixComputer);
    //rendre le bouton "tour suivant" visible
    nextBtn.style.visibility = "visible";
};

//les constante des coups possibles
const PIERRE = "pierre";
const FEUILLE = "feuille";
const CISEAUX = "ciseaux";

//fonction pour choisir un coup à l'ordinateur
const playComputer = () =>{
    //initialisation d'un nombre entre 0, 1 ou 2
    let nbAleat = Math.floor(Math.random() * 3);

    switch(nbAleat){
        case 0 :
            //on ajoute "active au CSS de #oPierreBtn"
            oPierreBtn.classList.add("active");
            return PIERRE;
        case 1 :
            //on ajoute "active au CSS de #oFeuilleBtn"
            oFeuilleBtn.classList.add("active");
            return FEUILLE;
        case 2 :
            //on ajoute "active au CSS de #oCiseauxBtn"
            oCiseauxBtn.classList.add("active");
            return CISEAUX;

    }
}

//fonction pour comparé le coup du joueur et celui de l'ordinateur
const verifierGagnant = (choixPlayer, choixComputer) => {
    //si égales, marquer égalité
    if(choixPlayer == choixComputer) {
        message.textContent = "Egalité !";
        return;
    }

    //si le joueur choisis pierre
    if (choixPlayer == PIERRE){
        //et que l'ordinateur à choisi feuille
        if (choixComputer == FEUILLE){
            //lancer fonction winComputer
            return winComputer();
        //si l'ordinateur a choisi ciseaux
        } else if (choixComputer == CISEAUX){
            //lancer fonction winPlayer
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

//fonction dans le cas ou l'ordinateur à gagner
const winComputer = () => {
    //afficher le message
    message.textContent = "l'ordinateur gagne ...";
    //incrémenté le score de l'ordinateur de 1
    scoreOrdi.textContent++;
}

const winPlayer = () => {
    message.textContent = "Vous avez gagné !";
    scorePlayer.textContent++;
}

//fonction nouveau jeu
const newPlay = () => {
    //pour chaque bouton, en enlève le CSS "désactivé" et "activé", on ajoute l'évènement ("click",play)
    btnPlayer.forEach((btn) => {
      btn.classList.remove("desactivated");
      btn.classList.remove("active");
  
      btn.addEventListener("click", play);
    });
    //on cache le bouton "next"
    nextBtn.style.visibility = "hidden";
    //les bouton de l'ordinateur perdent le CSS "actif"
    oPierreBtn.classList.remove("active");
    oFeuilleBtn.classList.remove("active");
    oCiseauxBtn.classList.remove("active");
    //on lance un message
    message.textContent = "A vous de jouer !";
  };
  //faire la fonction newPlay quand on clique sur le bouton next
  nextBtn.addEventListener("click", newPlay);
  //pour chaque bouton joueur, ajouter l'évènement "quand on clique, lancer la fonction play"
  btnPlayer.forEach((btn) => btn.addEventListener("click", play));
//quand on clique sur le bouton reset, remettre le score à 0 et lancer la fonction newplay
resetBtn.addEventListener("click", () => {
    scorePlayer.textContent = 0;
    scoreOrdi.textContent = 0;
  
    newPlay();
  });