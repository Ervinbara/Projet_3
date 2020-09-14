 var Reservation = {
       validation : document.getElementById('boutonReservation'),
       prenom : document.getElementById('prenom'),
       nom : document.getElementById('nom'),
       prenom_m : document.getElementById('prenom_manquant'),
       nom_m : document.getElementById('nom_manquant'),
       validCanvas : document.getElementById('boutonValider'),
         
       init : function(){
        this.valid_p();
        this.valid_n();
       },

//Méthode qui permet l'affichage d'un message d'erreur
       valid_p: function(){
        var that = this;
        this.validation.addEventListener('click',function(e){
        if(that.prenom.validity.valueMissing){
        e.preventDefault(); //Bloque l'envoi du formulaire
        that.prenom_m.textContent = 'prenom manquant';
        that.prenom_m.style.color = 'black';
        //document.getElementById("containerCanvas").style.display = "none";
        }
        
        else{
        that.prenom_m.textContent = '';
       }
     });
    },


      valid_n: function (){
        var that = this;
        that.validation.addEventListener('click',function(e){
        if(that.nom.validity.valueMissing){
        e.preventDefault(); //Bloque l'envoi du formulaire
        that.nom_m.textContent = 'nom manquant';
        that.nom_m.style.color = 'black';
        // document.getElementById("containerCanvas").style.display = "none";
        }
        else{
        that.nom_m.textContent = '';
        }
       });
      },
     };

reservation = Object.create(Reservation); // crée une instance de l'objet Reservation
reservation.init();