/*ATTENTION LE PROGRAMME NE MARCHE PASD AVEC INTERNET EXPLOERER (LA GRILLE NE SE TRACE PAS ()probleme avec element document et child)*/
/**
<ligne 34 a 125>
partie 1 : gestion 
	-fonction securit� (permet de faire la verification avec la combinaison secrete) ==> fonction qui gere les fonction qui s'occupe du resultat)
	-tirage (determine un tirage aleatoire)

<ligne 160 a 302>
partie 2 : fonction consacrer au test final (resultat)
	-statistique (augmente les barres de stats qui faut...
	-test (defini le type de victoire (perdu, bof , pas mal , jackpot , joli)
	-recompense (dit que type de victoire)

<ligne 334 a 474>
partie 3 : fonction qui agisse sur l'affichage
	-num_perso (permet la select ou deslect des cases de la grille (bien sur aussi sauvegarde les valeur select)
	-init (permet de deselecvtionner toute les cases de la grille)
	-flash (permet de faire une selection des X chiffre choisit aleatoirement (pour joueur press� :)   )
	
<ligne 503 a 547>	
parti 4 : fonction de tri 


**/


//--------------------------------------------------------------------------------------------------------
//------------------------focntion gestion--------------------------------------------------
//--------------------------------------------------------------------------------------------------------

/**
          BUT: permet de s'avoir si le joueur a jouer les X cases a jouer puis effectu les fonction pour avoir la combinaison gagante
          E: toute les variables utilis�es dans la page javascript
		  APP : page html quand on clique sur le bouton tirage
		  COM :
        */
/* proc securit� c'est tout fixe */
//------------------------------------------------amelioration direct mis dans le tp vu que ca sert a rien de voir le tireage sans avoir //jou� autrement il n'y a pa d'itilit� a jouer...
function securite(numero_joueur, compteur_boule, nombre_cases, t_compt_statis) {
  if (numero_joueur.length == (compteur_boule))// si le joueur ne jou pas tout les boule on ne peut pas avoir acc�s au tirage !
  {

    var numero_gagant = tirage(nombre_cases, compteur_boule); //creation du tableau avec les chiffres gagnants
    create(compteur_boule, numero_gagant);// fonction qui permet de creer la grille comprennant les valeurs du tableau gagnant
    //affiche(numero_gagant);
    var compteur_win = test(numero_joueur, numero_gagant, compteur_boule);//fonction qui verifi combien de chiffre sont bon
    //recompense(compteur_win,compteur_boule); //fonction qui permet d'afficher le message de recompense et retourne une valeur pour les statistique (1,2,3,4,5 pour 1= perdu et 5=jackpot
    message('TIRAGE FAIT', compteur_win);
  }
  else if (!document.getElementById('laMise').value)
  {
    message('MISE NULLE'); //, compteur_boule);//affichage du mesage dans la bulle
  }
  else {
    //alert('veuillez jouer les '+compteur_boule+' chiffres demandes');
    message('PAS ASSEZ'); //, compteur_boule);//affichage du mesage dans la bulle
  };//si les x chiffre pas jouer alors message
}
//-------------------------------------------------------------------------------------------------------------------------------

// This JavaScript function always returns a random number between min and max (both included):
function getRndInteger(min, max) {
  // return Math.floor(Math.random() * (max - min + 1)) + min;
  return Math.floor(Math.random() * max) + 1;
}
// 

/* 	
	BUT: determiner une combianaison de 6 chiffres different et aleatoirement 
	E : nombre_cases : type primitif : entier ; correspond au nombre de cases que le joueur a choisi
	E : boule_max : type primitif : entier ;correspond au nombre de boule que le joueur a choisi
	S : t_chiffre : type structur� : tableau d'netier ; correspond a la combinaison aleatoire
	COM: pas de 0 possible en chiffre
	APP: bonton voir tirage dans le PP
	/* function tirage c'est fix (entier, nombre_cases et boules_max)  result(tableau, t_chiffre)*/

function tirage(nombre_cases, boules_max) {
  var boucle = 1; // variable de  condition d'arret qui permet d'arreter la boucle qui creer la combinaison aleatoire 
  var i = 0;// compteur du nombre de chiffre deja choisi
  var pa_doubl = 0; //variable pour indiquer que c'est un double ou non
  var t_chiffre = new Array(); // tableau a remplir des valeur de la combinaison trouv�

  while (boucle)//debut boucle remplissage
  {
    if (i < boules_max) // si le compteur de boule(i) et inferieur au nombre de boule qui faut jou� (boule_max) alors :
    {
      chiffre = getRndInteger(1, nombre_cases);
      {

        for (var y = 0; y < i; y++)//boucle pour tester toute les valeur du tableau
        {
          if (chiffre == t_chiffre[y]) // voir si le chiffe choisit n'est pas deja dans le tableau
          {
            pa_doubl = 1; // si double alors on met la varaible a 1
          }
        }

        if (pa_doubl != 1)	 //et si la varaible des double est different de 1 alors :
        {
          t_chiffre[i] = parseInt(chiffre); //on rentre la valeur dans le tableau
          i++; // et on incremente la valeur du nombre de boule choisi
        }
        else {
          pa_doubl = 0; //autrement on met la varaible des doublez a 0 (valeur initiale
        }
      }
    }
    else {
      //alert('sorti boucle');
      boucle = 0; //premet de mettre la varaible d'arrete a la valeur de fin ici 0 ! d'ou sorti de boucle
    }
  }

  tri(t_chiffre); //appel de la fonctio tri, ordonne le tableau
  return t_chiffre; // renvoit le tableau de la combinaison
}
//--------------------------------------------------------------------------------------------------------
//------------------------FIN       focntion gestion--------------------------------------------------
//--------------------------------------------------------------------------------------------------------	


//--------------------------------------------------------------------------------------------------------
//------------------------focntion pour le resultat (affichage,stat...)--------------------------------------------------
//--------------------------------------------------------------------------------------------------------


/* 	
	BUT: determiner si la combinaison est egal a la combinaison tirer
	E: t_play  ==>type structur� :tableau d'entier ; chiffres jou�s
	E: c_max ==>type entier : valeur max de cases a jouer permet de definir la borne de la boucle de test
	E: t_win==> type structur� :tableau d'entier ; chiffres gagnant
	S: num_bon ==> type primitif : entier ; correspond au nombre de chiffre juste
	APP: function voir tirage
	*/

/* function text c'est fixe (tableau, c_max et c_play) et (entier,c_max) */
function test(t_play, t_win, c_max) {
  var num_bon = 0; // compteur de bon numero
  for (var i = 0; i < t_play.length; i++) // boucle qui va de 0 a la fin du tableau pour tester toutes les valeurs
  {
    for (var j = 0; j < c_max; j++) {
      if (t_play[i] == t_win[j]) // condition avec la double boucle permet de tester toute les valeurs
      {
        num_bon = (num_bon + 1); // compteur bon numero + 1 
        //alert(num_bon);
      }
    }
  }
  //alert('vous avez '+num_bon+' chiffres corrects !!!');
  return num_bon; // renvoit la valeur des bon numero
}



//--------------------------------------------------------------------------------------------------------
//----------------------FIN--fonction pour resultat--------------------------------------------
//--------------------------------------------------------------------------------------------------------



//--------------------------------------------------------------------------------------------------------
//------------------------focntion avec action sur la grille--------------------------------------------------
//--------------------------------------------------------------------------------------------------------


/* 	
	BUT: recuperer valeur choisi par utilisateur et les stocke dans un tableau mais aussi change le style de la case au l'utilisateur a cliqu� (soit de rouge si cliqu� soit redevient gris si deselectionner)
	E: cases ==> correspond a l'objet (la case) selectionner c'est grace a ca que l'on change la couleur de la case (dom) et que l'on recuper la valeur contenu dans la case
	E: t_joueur ==> type structur� : tableau d'entier ; tableau ou sont stoker les valeur du joueur (les endoit ou il clique sur la grille)
	E: c_max==> type primitif : entier ; valeur correspondant au nombre de boule maximum permet d'avoir la borne de la limite realiser grace au compteur.
	S : compte : type primitif : entier ; chiffre permettant de compter le nombre de fois que l'utilisateur clique et ainsi donc limiter le nombre de clique
	COM:
	APP: programme principal (dans les cases du tableau ou l'on clique dessus
	*/

/* function/procedure num_perso c'est fix (entier, cases et c_max) c'est mod(tableau, t_joueur) result(entier, compteur)*/
function num_perso(cases, compte, t_joueur, c_max) {
  var indice = 0; // varaible qui prend pour valeur le numero d'indice pour lequel le chiffre a �t� deselectionner pour par la suite //l'enlever du tbaleau du joueur
  if (cases.className == "vide")// cas ou la cases a pas �t� activ� (cliqu�e)
  {
    //alert(cases.className);
    if (compte < c_max) //parce que compte=0 au depart alors le tableau va se remplir de t_joueur[1] a  t_joueur[6]
    {
      cases.className = "select";// change le style en activ�
      //alert(cases.innerHTML);
      t_joueur[compte] = cases.innerHTML; // on stoque la valeur du texte de la texte donc le numero dans le tableau joueur
      compte = (compte + 1);// incrementation du compteur de nombre de coup
    }
    if (compte >= c_max)    //test de limitation du nombre de cases a cocher
    {
      message('NB BOULES OK'); //, c_max);//affichage du mesage dans la bulle
      compte = c_max;
    }
    return compte; // revoi la valeur du compteur de valeur dans le tableau joueur
  }

  if (cases.className == "select")//cas ou la cases a deja �t� selectionner (cliqu�e)
  {
    //alert(t_joueur[cases.innerHTML]);
    for (var i = 0; i < t_joueur.length; i++)//boucle pour faire toute les valeurs du tableau joueur
    {
      //alert(i);
      //alert(cases.innerHTML);
      //alert(t_joueur[i]);
      if (t_joueur[i] == cases.innerHTML)// et ainsi test� pour que valeur du tableau la case selectionner a avoir
      {
        //alert('indice'+i);
        indice = i;	//sauvegarde de l'indice pour effacer la valeur correspond a cette indice par la suite
      }

    }

    t_joueur.splice(indice, 1); // fonction qui permet d'enlever un valeur (on peu aussi rajouter des valeur en 3 parametre (1 parametre //d'ou on commence le rajoute ou la suppression puis le 2ieme parametre correspond sur combien de valeur on ecraser

    cases.className = "vide"; //change le style de la cases et remet la	 valeur par default
    compte = (compte - 1); // decremente le comteur general
    return compte;	//renvoi le compteur
  }

}



/**
        BUT: permet de remettre toute les valeur a zero et la grille entierement deselectionner
        E:t_joueur :type structur� :tableau d'entier ; correspond au valeur que le joueur a deja jou� 
        E : nombre_cases : type primitif : entier ; correspond au nombre de cases que le joueur a choisi (permet d effacer le bon nombre de case (les mettre a class="name"
    E : boule_max : type primitif : entier ;correspond au nombre de boule que le joueur a choisi
        S: conteur_gene : correspond au compteur de boule deja jouer
   
      */
/* function init c'est fix (entier, nombr_c et c_max) c'est mod(tableau, t_joueur) result(entier, conteur_gene)*/
function init(t_joueur, c_max, conteur_gene, nombr_c) {
  //alert(conteur_gene);
  conteur_gene = 0; //compteur du nombre de boule jou� egal a 0
  for (var i = 0; i <= c_max; i++) //boucle qui fait toute les valeur du tableau et :
  {

    t_joueur[i] = 0; // les met egal a 0

  }

  for (var j = 1; j <= nombr_c; j++) //pour tout les cases du tableau faite
  {
    // varaible qui correspond a nom des cases : aX avec 1<X< nombre de case
    document.getElementById('a' + j).className = 'vide';	//met la valeur vide en nom de classe
  }

  return conteur_gene;//renvoi la valuer du compteur de boule deja choisi (a 0)
}



/**
        BUT: determiner une combinaison aleatoire pour le joueur et changer le nom de la classe des cases consern�e
        E:t_joueur :type structur� :tableau d'entier ; correspond au tableau a remplir de valeur slectionner aleatoirement
        E : nombre_cases : type primitif : entier ; correspond au nombre de cases que le joueur a choisi (permet de limiter la selection des numero en flash)
    E : boule_max : type primitif : entier ;correspond au nombre de boule que le joueur a choisi
        S: conteur_gene : correspond au compteur de boule deja jouer
    
      */
/* function/procedure flash c'est fix (entier, cases et c_max) c'est mod(tableau, t_joueur) result(entier, compteur)*/
function flash(t_joueur, c_max, conteur_gene, nombr_c) {
  //alert(nombr_c);

  conteur_gene = c_max;
  //alert(t_play);

  for (var j = 1; j <= nombr_c; j++)//pour parcourir toute les cases
  {
    //alert(document.getElementById(compt).innerHTML);
    var compt = 'a' + j; // les identifiant son sous la forme aX avec 1>X> nombre de case ; a1 corespond a la case 1 ...
    //alert(document.getElementById(compt).innerHTML);
    for (var i = 0; i <= c_max; i++) //pour parcourir tout le tableau
    {
      //alert('boucle pour');
      if (document.getElementById(compt).innerHTML == t_joueur[i])// test si la valeur a l'interieur de la case( un chiffre entre 1 et le //nombre de case) est egal a la valeur dans le tableau des valeur du joueur rempli
      {
        //alert(compt);
        document.getElementById(compt).className = 'select'; //si c'est le cas on met la class en selectionner (select)
      }
      else {
        var probleme = 1;//pour verification
      }
    }
  }

  //alert('probleme');
  return conteur_gene;//on renvoi la valeur du compteur au maximum (nombre de boule)
}
//--------------------------------------------------------------------------------------------------------
//----------------------FIN--focntion avec action sur la grille--------------------------------------------------
//--------------------------------------------------------------------------------------------------------



























//-------------------------------------------------fonction tri correction du tp precedent---------------------------------------------
/**
          BUT: faire le tri d'un tableau d'entiers
          E/S: le tableau (tableau) type structur�, tableau d'entiers
        */
/* proc tri c'est mod (tableau) */
function tri(tableau) {
  for (var i = 0; i < tableau.length; i++) {
    var pos_min = posMinimumIndice(tableau, i);
    echange(tableau, i, pos_min);
  }
}

/**
        BUT: calculer la position du minimum dans un tableau d'entiers � partir
            d'une position pos
        E: le tableau (tableau) type structur�, tableau d'entiers
        E: la position de d�part (pos_dep) type primitif, entier
        S: la position du minimum du tableau (pos_min) type primitif, entier
      */
/* proc posMinimumIndice c'est fixe (tableau, pos_min) return (pos_min) */
function posMinimumIndice(tableau, pos_min) {
  var min = tableau[pos_min];
  for (var i = pos_min + 1; i < tableau.length; i++) {
    if (tableau[i] < min) {
      min = tableau[i];
      pos_min = i;
    }
  }
  return pos_min;
}

/**
          BUT: faire l'�change de deux valeurs dans un tableau
          E/S: le tableau (tableau) type structur�, tableau d'entiers
          E: l'indice de la premi�re valeur (pos1) type primitif, entier
          E: l'indice de la deuxi�me valeur (pos2) type primitif, entier
        */
/* proc echange c'est mod (tableau) fixe (pos1, pos2) */
function echange(tableau, pos1, pos2) {
  var temp = tableau[pos1];
  tableau[pos1] = tableau[pos2];
  tableau[pos2] = temp;
}
//---------------------------------------------------------------------------------------------------------------------------------


