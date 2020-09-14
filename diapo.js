// Objet diaporama
var Diaporama = {
    items : document.getElementsByClassName("item"), // Attribut de sélection des figures
    boutonGauche : document.getElementById("bouttonGauche"),
    boutonDroit : document.getElementById("bouttonDroit"),
    boutonPause : document.getElementById("pause"),
    imageNum : 0, // Attribut qui permet de parcourir les images
    play : true,
    
    
    init : function(){
        
        this.eventListener();//Changer d'images grâce aux flèche
        this.eventClickD();//Image suivante
        this.eventClickG();//Image précèdente
        this.eventTime();//Défilement automatique des images toutes les 5 secondes
        this.eventStop();// Bouton pause play
     
    },

    // Méthode qui récupére les touches du clavier et actionne le diaporama en fonction de la touche
    eventListener : function() {
        var that = this;
       
        document.addEventListener("keydown", function(e){
        
            if(e.keyCode === 39) {
                that.suivant(); // Appui sur la touche =>
            }
            else if(e.keyCode === 37) {
                that.precedent(); // Appui sur la touche <=
            }
            
        });
    },
      //Clique vers l'image suivante
    eventClickD : function() {
        var that = this;  
        this.boutonDroit.addEventListener("click", function(){
             that.suivant();   
        });    
    },
    
    //Clique vers l'image précèdente
    eventClickG : function() {
        var that = this;
        this.boutonGauche.addEventListener("click", function(){
            that.precedent() 
        });  
    },
 
    eventTime: function(){
        var that = this;
          this.timer = setInterval(function() {
            that.suivant()
        },5000);
    },
    
    eventStop: function(){
      var that = this;  
          this.boutonPause.addEventListener("click", function(){
            if(that.play) { //Si le diaporama est actif
                window.clearInterval(that.timer); //Stop le defilement automatique
                  that.boutonPause.innerHTML = '<i class="fas fa-play"></i>';
                  that.play=false;                    
                }
            else if (that.play==false) {
                  that.eventTime();
                  that.boutonPause.innerHTML = '<i class="fas fa-pause"></i>';
                  that.play=true;
               }        
         });  
},
       

    
    
    // Méthode qui fait fonctionner le diaporama en avant
    suivant : function() {
        this.items[this.imageNum].style.opacity = "0"; // Fait disparaître l'image active 
        if(this.imageNum === 4) { // Si le diaporama est à la dernière image
            this.imageNum = 0; // On repasse l'attribut à 0 pour faire réapparaître la première image
        }
        else { // Sinon on passe à l'image suivante
            this.imageNum++; // En augmentant de 1 l'attribut (incrémentation)
        }
        this.items[this.imageNum].style.opacity = "1"; // Fait apparaître l'image suivante
    },
    

    // Méthode qui fait fonctionner le diaporama en arrière
    precedent : function() {
        this.items[this.imageNum].style.opacity = "0"; // Fait disparaître l'image active
        if(this.imageNum === 0) { // Si le diaporama est à la première image
            this.imageNum = 4; // On passe l'attribut à 4 pour faire réapparaître l'image précédente
        } else { // Sinon on passe à l'image précédente
            this.imageNum--; // En diminuant de 1 la valeur de l'attribut
        }
        this.items[this.imageNum].style.opacity = "1"; // Fait apparaître l'image précédente
    }
};

diaporama = Object.create(Diaporama); // crée une instance de l'objet diaporama
diaporama.init();