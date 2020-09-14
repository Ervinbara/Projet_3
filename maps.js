var Map = {
    map : null,
    api : null,
    markers : null,
    request : null,

    init : function(lat,lng,ville)
    {
        
        this.map = L.map('map').setView([lat, lng], 18);
        this.api = "https://api.jcdecaux.com/vls/v1/stations?contract=" +ville+ "&apiKey=0fd863904084b75b725aacf608cefa4f4787c74a";
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution: 'Map data &copy; <a href="http://www.osm.org">OpenStreetMap</a>' }).addTo(this.map);
        this.sendXml();  
    },
    
    createMarkers : function(data){
         this.markers = new L.featureGroup();
               for (var station of data) { 
                  var currentStation = Object.create(Station);
                  currentStation.init(station);
                  
                  marker = new L.marker([station.position.lat,station.position.lng]).bindPopup(station.name);
                  marker.station = currentStation; //donne la valeur de l'objet currentStation (soit xxx.nom, etat et nbVelo) 
                  this.markers.addLayer(marker);
                  marker.addEventListener("click", function(){
                    document.getElementById("nomStation").innerHTML = this.station.nom;
                    document.getElementById("etatStation").innerHTML = this.station.etat;
                    document.getElementById("veloDispo").innerHTML = this.station.nbVelo;           
                  });   
               }
               
                    this.markers.on('mouseover', function(e){ e.layer.openPopup(); }); //Apparition du popup au survol
                    this.markers.on('mouseout', function(e){ e.layer.closePopup(); }); //Disparition du popup qd on ne survol pas       
                    this.map.addLayer(this.markers);//Affiche les marqueurs
                    this.map.fitBounds(this.markers.getBounds());
    },
    //Requete xml
    sendXml : function(){
         var that = this;
         this.request = new XMLHttpRequest();
         this.request.onreadystatechange = function(){
             if(this.readyState == 4 && this.status ==200){
                var stations = this.response; //var stations récupère les éléments de la requête
                that.createMarkers(stations);//Appel de la fonction createMarker qui permet de créé un marqueur et de récup les info affiché ssur le formu   
             }
         }
         this.request.open("GET",this.api,true);
         this.request.responseType = "json";
         this.request.send();

    }
}


map = Object.create(Map); // crée une instance de l'objet diaporama
map.init(48.856578, 2.351828,"creteil");//Intialisation de la map, la localisation, de la ville
var Station = {
    // Création de variable qui vont prendre les valeurs qui seront affiché dans le formulaire
    nom : null, 
    etat : null, 
    nbVelo : null, 
    
    
    init : function(data){
     this.nom = data.name;
     this.etat = data.status;//Utilisé ça
     this.nbVelo = data.available_bikes;

    },
};

