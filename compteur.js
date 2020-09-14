var Compteur = {
    minutes : 20, // Minutes du compte à rebours
    secondes : 00, // Secondes du compte à rebours
    minutesElt : null, // Élément minutes (celui qui sera inséré dans le HTML)
    secondesElt : null, // Éléments secondes (celui qui sera inséré dans le HTML)
    nomStation : document.getElementById("nomStation").innerHTML,// Nom de la station de réservation
    compteARebour : null, // Attribut du compte à rebours
    compteARebourTerminer : null, // Attribut du compte à rebours terminé
    annulationReservation : false, // Demande de confirmation d'annulation de la réservation
    bool : false,
    validation : document.getElementById('boutonReservation'),
    prenom : document.getElementById('prenom'),
    nom : document.getElementById('nom'),

        init : function(){

        this.reserveRefresh();
        this.confirmReservation();
        this.verificationSessionStorage(); 
        this.annuleReserv(); //Déclenche annulation terminer lors du clique sur annuler Reservation
        document.getElementById("containerCanvas").style.display = "none";
        
        var that = this;
       
        
        document.getElementById("boutonValider").addEventListener("click", function() {        //vérifie si l y a une signature
            if(document.getElementById("nomStation").innerHTML != [] && Signature.isSigned == true){ //On vérifie si une station es en train d'être choisi
                sessionStorage.setItem("nomStation", that.nomStation); //on attribue à nomStation le nom de la station
                document.getElementById("sectionLocation").style.display = "block"; 
                this.bool=true;
            }
            else if(Signature.isSigned == false){
                alert("Signature requise");
            }
        });   
    },
        
    reserveRefresh : function(){
        var that = this;/// stockage de l'instance
        this.validation.addEventListener("click", function(){
        if (sessionStorage.getItem("minutes") == null && that.nom.validity.valueMissing == false && that.prenom.validity.valueMissing == false && document.getElementById("nomStation").innerHTML != [] )         //Si les champs sont rempli
        {// alert("Veuillez annuler la réservation en cours avant d'en effectuez une nouvelle");
            document.getElementById("containerCanvas").style.display = "block";
        }
        else if (sessionStorage.getItem("minutes") && that.nom.validity.valueMissing == false && that.prenom.validity.valueMissing == false && document.getElementById("nomStation").innerHTML != [] )
        {
            alert("Veuillez annuler la réservation en cours avant d'effectuez une nouvelle réservation");
        }
        else
        {
            alert("Veuillez remplir tous les champs");
            this.bool=false;
        }
        
    });
},
    
    
    // Méthode lancement d'une réservation
    lancementReservation : function() {
        // Mis en place des sessions storage
        sessionStorage.setItem("minutes", this.minutes);
        sessionStorage.setItem("secondes", this.secondes);
        sessionStorage.setItem("nomStation", this.nomStation); //recup le nom de la station
        this.nomStation = document.getElementById("nomStation").innerHTML; //Attribution du nom de la station
        document.getElementById("messageLocation").querySelector("strong").innerHTML = this.nomStation;
        minutes2 = this.minutes;
        secondes2 = this.secondes;
       // document.getElementById("sectionLocation").style.display = "block";
        this.compteARebour = setInterval("Compteur.initCompteur()", 1000); //1800
    },

    // Méthode ré-initialisation du compte à rebours
    initCompteur : function() {
        if(this.minutes < 10) { // Si il reste moins de 10 minutes
            // Ajoute un 0 devant les minutes
            this.minutesElt = "0" + this.minutes;
        } else {
            // Sinon les minutes s'affichent normalement
            this.minutesElt = this.minutes;
        }

        if(this.secondes < 10) { // Si il reste moins de 10 secondes
            // Ajoute un 0 devant les secondes
            this.secondesElt = "0" + this.secondes;
        } else {
            // Sinon les secondes s'affichent normalement
            this.secondesElt = this.secondes;
        }

        // Insertion du compte à rebours dans le HTML
        document.getElementById("compteur").innerHTML = this.minutesElt + " : " + this.secondesElt;

        // Lance le fonctionnement du compte à rebours
        this.compteurStart();
    },
    // Méthode de fonctionnement du compte à rebours
    compteurStart : function() {
        if((this.minutes >= 0) && (this.secondes > 0)) { // S'il il reste plus de 0 seconde

            // On diminue les secondes
            this.secondes--;
            // Modification de la session storage
            sessionStorage.setItem("secondes", this.secondes);

        } else if((this.minutes > 0) && (this.secondes <= 0)) { // Sinon si les minutes sont Supérieures à 0 et les secondes inférieures ou égale à 0

            // On replace les secondes à 59
            this.secondes = 59;
            // On diminue les minutes
            this.minutes--;

            // Modification des session storage
            sessionStorage.setItem("minutes", this.minutes);
            sessionStorage.setItem("secondes", this.secondes);

        }
        else if((this.minutes == 0) && (this.secondes == 0)) { // Sinon si les minutes et les secondes sont égales à 0 (compte à rebours terminer)
            // Appel de la méthode "reservationTerminer"
            this.compteARebourTerminer = setTimeout("Compteur.reservationTerminer()", 4000);
        }
    },

    // Méthode appelée à la fin de la réservation
    reservationTerminer : function() {
        // Arrêt du compte à rebours
        clearInterval(this.compteARebour);

        // Reset des attributs du compte à rebours
        this.minutes = 20;
        this.secondes = 00;
        this.minutesElt = null;
        this.secondesElt = null;

        // Suppression de la session storage
        sessionStorage.clear();

        // Arrêt de l'appel à la méthode
        clearTimeout(this.compteARebourTerminer);

        // Remets en place l'affichage par défaut des blocs
        document.getElementById("sectionLocation").style.display = "none";
    },
    
    verificationSessionStorage : function() {
        //var that = this;
        //window.addEventListener('load', function () {
        if (sessionStorage.getItem("nomStation")) { // Si une réservation est en cours 
            // Récupération et stockage des sessions storage dans les attributs
            Compteur.minutes = sessionStorage.getItem("minutes"); // Minutes
            Compteur.secondes = sessionStorage.getItem("secondes"); // Secondes
            document.getElementById("sectionLocation").style.display = "block";
            // Insert le nom de la station qui est retenu dans le sessionStorage
            document.getElementById("messageLocation").querySelector("strong").innerHTML = sessionStorage.getItem("nomStation");
            // Relance le compte à rebours
            document.getElementById("compteur").innerHTML = this.minutes + " : " + this.secondes;
            Compteur.compteARebour = setInterval("Compteur.initCompteur()", 1000);//900

            }

        else  
            { // Si aucune réservation est en cours
            // Fait disparaître le cadre de réservation
            document.getElementById("sectionLocation").style.display = "none";
            }
},

    // Méthode qui annule la réservation en cours
    
    resetReservation : function() {
        if(this.nomStation != Station.nom) { // Si le nom de la station de réservation est différent du nom de la station sélectionnée
            // Affiche une demande de confirmation
            this.annulationReservation = window.confirm("Cette nouvelle réservation annulera la réservation sur la station : " + this.nomStation +
            "\net enregistrera une nouvelle réservation");
        }
        else /*(this.nomStation != null)*/
        { // Sinon les deux noms sont identiques
            // Affiche une demande de confirmation
            this.annulationReservation = window.confirm("Cette nouvelle réservation remplacera la réservation déja existante sur la station : \n" + this.nomStation);
            
        }

        if (this.annulationReservation) { // Si l'utilisateur a souhaité supprimer ou remplacer sa réservation en cours
            // Suppression de la session storage
            sessionStorage.clear();
            // Arrêt du compte à rebours
            clearInterval(this.compteARebour);
            // Reset des attributs du compte à rebours
            this.minutes = 20;
            this.secondes = 0;
            this.minutesElt = null;
            this.secondesElt = null;
            // Lance la méthode de lancement d'une réservation
            this.lancementReservation();
        }
    },
    
    
    confirmReservation : function() {
    var that = this;
    document.getElementById("boutonValider").addEventListener("click", function() {
    //sessionStorage.setItem("nomStation",document.getElementById("nomStation").innerHTML);
    sessionStorage.setItem("signature", Signature.canvas.toDataURL());
    console.log(Signature.canvas),
    Signature.clearCanvas(); // Nettoie le canvas
    
               // Vérification d'une réservation existante
                if(sessionStorage.getItem("minutes")&& this.bool==true && Signature.isSigned == true)
                { // Si une réservation existe
                // Suppression de la réservation existante
                Compteur.resetReservation();
                }
                
               else if(document.getElementById("nomStation").innerHTML != [] && Signature.isSigned == true)
                { // Aucune réservation n'existe
                   // Lance la méthode de lancement de la réservation
                Compteur.lancementReservation();
                }
    });   
},

//Event lors de l'annulation
    annuleReserv: function() {
    // Evénement lors du clique sur le bouton d'annulation d'une réservation
    document.getElementById("annulation").addEventListener("click", function() {
        // Lance la méthode d'annulation
        Compteur.reservationTerminer();
       
        
    });
    }
};
compteur = Object.create(Compteur); // crée une instance de l'objet diaporama
compteur.init();