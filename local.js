jQuery(function($){ //Pour vérifier que Jquery est bien chargé
    //Système qui nous permet de sauvegarder automatiquement les information
    $.fn.formBackup = function(){
        if(!localStorage){ //on vérifie si l'objet est dispo
            return false;
        }
        var forms = this; //Stockage du formulaire
        var datas = {}; //Va permttre la Sauvegarde des données
        var ls = false;
        datas.href = window.location.href; //Si on est sur un url différent, on vide le localStorage
        
        //Récupérations des infos du localStorage et affichage
        if(localStorage['formBackup']){
            ls = JSON.parse(localStorage['formBackup']); //On donne à ls le contenu du localStorage
            if(ls.href == datas.href){ //Test si on se trouve sur la même page
                for(var id in ls){
                    if(id != 'href'){
                        $('#'+id).val(ls[id]); //Attribution de la valeur aux champs, valeur récup dans le localStorage
                        datas[id] = ls[id];
                    }
                }
            }
        }
        //Fonction qui permet de remplir le localStorage
        forms.find('input').keyup(function(e){          //Si on se trouve dans un champs, et que l'on appui sur une touche, alors on rempli le localStorage
            datas[$(this).attr('id')] = $(this).val(); //Attribution de la valeur du champ à datas
            localStorage.setItem('formBackup', JSON.stringify(datas));  
        });
        
        forms.submit(function(e){
            localStorage.removeItem('formBackup'); //Fonction qui vide le localStorage lors de la validation du formulaire
        })
    }
    
    
    $('form').formBackup(); //Lancement de la fonction formBackup();
        
});