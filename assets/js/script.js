/*****************************************************************************/
/************************************DATE*************************************/
/*****************************************************************************/
const date = document.createElement('div');
date.classList.add('date');
header.appendChild(date);

function dayAndHour(){

  const date = new Date();
  let datelocale = date.toLocaleString('fr-FR',{
    day: 'numeric',
    month: 'long',
  });

  document.querySelector('.date').innerHTML = 'Tristan Brasseur - '+ datelocale + ' ' +addZero(date.getHours()) + ':' + addZero(date.getMinutes());
}
function addZero(number){
    return number < 10 ? '0' + number : number
}
window.onload = () => {setInterval('dayAndHour()',1000);
};

/*****************************************************************************/
/*********************************NEW WINDOW**********************************/
/*****************************************************************************/
const descButton = document.getElementById('description');
const resButton = document.getElementById('resume');
const skillButton = document.getElementById('skill');
const languageSkillButton = document.getElementById('languageSkill');
const studyButton = document.getElementById('formation');
const hobbyButton = document.getElementById('hobby');
const pictureButton = document.getElementById('image');
const aboutButton = document.getElementById('about');
const headerHeight = document.getElementById("header").offsetHeight;
let X;
let Y;
let mouse_down = false;
let topDiv = null;
let isFullscreen = false;
let zIndexCounter = 20;

function createWindow(title,text,button, contentclass) {

  const mainWindow = document.createElement('div');
  mainWindow.classList.add('body-window','desktop-setup');
  document.body.appendChild(mainWindow);
  const headerWindow = document.createElement('div');
  headerWindow.classList.add('header-window');
  mainWindow.appendChild(headerWindow);
  const titleWindow = document.createElement('h3');
  titleWindow.classList.add('title');
  titleWindow.innerHTML = title;
  headerWindow.appendChild(titleWindow);
  const reduceButton = document.createElement('div');
  reduceButton.classList.add('button','reduce');
  headerWindow.appendChild(reduceButton);
  const upscaleButton = document.createElement('div');
  upscaleButton.classList.add('button','upscale');
  headerWindow.appendChild(upscaleButton);
  const closeButton = document.createElement('div');
  closeButton.classList.add('button','close');
  headerWindow.appendChild(closeButton);
  const content = document.createElement('div');
  content.classList.add('content', contentclass);
  mainWindow.appendChild(content);
  content.innerHTML = text;
  mainWindow.style.zIndex = zIndexCounter;
  zIndexCounter++;


    headerWindow.onmousedown = function(event) {
      if(isFullscreen){
        return
      }
    // Calculer la différence entre la position du clic de souris et le coin supérieur gauche de headerWindow
    let shiftX = event.clientX - headerWindow.getBoundingClientRect().left;
    let shiftY = event.clientY - headerWindow.getBoundingClientRect().top;
    // Définir la fonction de rappel pour l'événement mousemove sur tout le document
    document.onmousemove = function(event) {
      // Obtenir la largeur et la hauteur de la fenêtre
      const windowWidth = document.documentElement.clientWidth;
      const windowHeight = document.documentElement.clientHeight;
      // Obtenir la largeur et la hauteur de la boîte principale
      const boxWidth = mainWindow.offsetWidth;
      const boxHeight = mainWindow.offsetHeight;
      // Définir les limites de déplacement de la boîte principale
      const minX = 0;
      const minY = document.getElementById("header").offsetHeight; // Utiliser la hauteur de la balise avec l'ID "header"
      const maxX = windowWidth - boxWidth;
      const maxY = windowHeight - boxHeight;
      // Calculer les coordonnées restreintes de la boîte principale en fonction de la position de la souris
      const restrictedX = Math.min(Math.max(minX, event.pageX - shiftX), maxX);
      const restrictedY = Math.min(Math.max(minY, event.pageY - shiftY), maxY);
      // Appliquer les coordonnées restreintes à la boîte principale pour la déplacer
      mainWindow.style.left = restrictedX + 'px';
      mainWindow.style.top = restrictedY + 'px';
    };

    // Définir la fonction de rappel pour l'événement mouseup sur tout le document
    document.onmouseup = function() {
      // Supprimer la fonction de rappel pour l'événement mousemove
      document.onmousemove = null;
      // Supprimer la fonction de rappel pour l'événement mouseup
      document.onmouseup = null;
    };
  };





  const paramStyles = window.getComputedStyle(mainWindow);
  let currentWidth = paramStyles.getPropertyValue('width');
  let currentHeight = paramStyles.getPropertyValue('height');
  let currentTop = paramStyles.getPropertyValue('top');
  let currentLeft = paramStyles.getPropertyValue('left');

  function fullscreen(currentWidth,currentHeight,currentTop,currentLeft){

    if(mainWindow.classList.contains('fullscreen')){
      mainWindow.style.left =  '0px';
      mainWindow.style.top =  headerHeight + 'px';
      mainWindow.style.width =  '100%';
      mainWindow.style.height = '100%';
      isFullscreen = true;
    }else {
      mainWindow.style.left =  currentLeft;
      mainWindow.style.top = currentTop;
      mainWindow.style.width =  currentWidth;
      mainWindow.style.height = currentHeight;
      isFullscreen = false;
    }
  }


  upscaleButton.addEventListener('click', function(){

    if(!mainWindow.classList.contains('fullscreen')){
      currentHeight = paramStyles.getPropertyValue('height');
      currentWidth = paramStyles.getPropertyValue('width');
      currentTop = paramStyles.getPropertyValue('top');
      currentLeft = paramStyles.getPropertyValue('left');
      mainWindow.classList.add('fullscreen');
    }else{
      mainWindow.classList.remove('fullscreen');

    }
    fullscreen(currentWidth,currentHeight,currentTop,currentLeft);
  });

  mainWindow.addEventListener('click', bringToFront);

  function bringToFront() {
    const currentZIndex = parseInt(this.style.zIndex);
    if (currentZIndex === zIndexCounter ) {
      return; // Ne rien faire si la fenêtre est déjà en premier plan
    }
    if (topDiv) {
      topDiv.style.zIndex = '0'; // Mettre la div précédente à une valeur inférieure
    }
    this.style.zIndex = '9999';
    topDiv = this; // Mettre à jour la div actuellement en premier plan
  }

  closeButton.addEventListener('click', function() {
    mainWindow.parentNode.removeChild(mainWindow);
    enableButton(button);    

  });

}

function enableButton(button) {
  button.classList.remove('disabled');
}

descButton.addEventListener('dblclick',function(){
  if (!this.classList.contains('disabled')) {
    title = 'Description.txt';
    text = '<p> Passionné d\'informatique, j\'ai décidé de faire une reconversion professionnelle en tant que développeur web. Je suis à la recherche d\'un stage du 26 juin jusqu\’au 28 août 2023. </br></br>Je suis également à la recherche d\'une opportunité d\'alternance pour poursuivre mes études et obtenir un diplôme de développeur FullStack. Le rythme de l\'alternance sera d\'une semaine en formation pour trois semaines en entreprise.</p>';
    createWindow(title,text,this);  
    this.classList.add('disabled');
  }
     
});

resButton.addEventListener('dblclick',function(){
  if (!this.classList.contains('disabled')) {
    title = 'Résumé-de-carrière.txt';  
    text = '<h3> Sidérurgie</h3></br><ul><li>Ouvrier sidérurgique, pontier cabine, pontier sol, cariste - ARCELOR MITTAL -Juin 2015 à Mars 2022  </li></ul></br><h3>Automobile</h3></br><ul><li> Agent de fabrication - SOVAB, Batilly - Décembre 2014 à Avril 2015 </li></ul></br><h3>Informatique</h3></br><ul><li>Assistant technicien informatique - VANKSEN, Luxembourg - Novembre 2014</li></ul></br><h3> Restauration</h3></br><ul><li>Aide cuisinier - SERVIOR, Dudelange - Décembre 2013 à Septembre 2014</li><li>Fabrication et vente de pâtes fraiches - PASTA FRESCA, Luxembourg - 2013</li></ul>';
    createWindow(title,text,this);
    this.classList.add('disabled');
  }
});

skillButton.addEventListener('dblclick',function(){
  if (!this.classList.contains('disabled')) {
    title = 'Compétences.txt';  
    text = '<ul><li>Prise de décision</li><li>Fléxibilité</li><li>Combativité</li><li>Organisation</li><li>Autonomie</li><li>Ecoute</li><li>Persévérance</li></ul>';
    createWindow(title,text,this);
    this.classList.add('disabled');
  }
});

studyButton.addEventListener('dblclick',function(){
  if (!this.classList.contains('disabled')) {
    title = 'Formations.txt';  
    text = '<h3>Développeur Web et Web mobile</h3></br><ul><li><span class="diploma">Titre RNCP de niveau 6 - Développeur FullStack</span> - à partir d\'Octobre 2023</li><li><span class="diploma">Titre RNCP de niveau 5 - Développeur Web</span> - Décembre 2022 - Octobre 2023</li><li><span class="diploma">Remise à niveau des métiers du numérique</span> - Septembre - Décembre 2022</li></br><h3>Technique du froid et du conditionnement de l\'air</h3></br><li><span class="diploma">Baccalauréat professionnel</span> - 2012 </li><li><span class="diploma">Brevet d\'étude professionnel</span> - 2010</li></br><h3>Certification</h3></br><li><span class="diploma">MOOC de l\'ANSSI</span> - Avril 2023</li>';
    createWindow(title,text,this);
    this.classList.add('disabled');
  }
});

hobbyButton.addEventListener('dblclick',function(){
  if (!this.classList.contains('disabled')) {
    title = 'Loisirs.txt';  
    text = '<ul><li>Informatique</li><li>Impression_3D</li><li>Longboard</li><li>Clavier custom</li></ul>';
    createWindow(title,text,this);
    this.classList.add('disabled');
  }
});

languageSkillButton.addEventListener('dblclick',function(){
  if (!this.classList.contains('disabled')) {
    title = 'Skills.txt';  
    text = '<h3>Skills :</h3></br><ul><li>HTML (acquis)</li><li>CSS (acquis)</li><li>Javascript (en cours)</li><li>PHP (en cours)</li><li>REACT (en cours)</li><li>ANGULAR (en cours)</li><li>SYMFONY (en cours)</li><li>SQL (en cours)</li><li>Wordpress (acquis)</li><li>GIT (en cours)</li></ul>';
    createWindow(title,text,this);
    this.classList.add('disabled');
  }
});

pictureButton.addEventListener('dblclick',function(){
  if (!this.classList.contains('disabled')) {
    title = 'Photo.jpg';  
    text = '<img src="./assets/images/Photo_profil.png" id="picture" alt="Photo.png" title="Photo.png">';
    createWindow(title,text,this,'picture-content');
    this.classList.add('disabled');
  }
});

aboutButton.addEventListener('dblclick',function(){
  if (!this.classList.contains('disabled')) {
    title ='Tristan_Brasseur: ~/cv$';  
    text = '<p><span id=\'terminal\'>Tristan BRASSEUR:~/cv$</span> présentation</p></br><ul><li>date_de_naissance: 30_octobre_1992(30ans)</li><li>portable: <a href="tel:+33623503216">06-23-50-32-16</a></li><li>mail: <a href="mailto:brasseur.tristan@gmail.com">brasseur.tristan@gmail.com</a></li><li>adresse: 3_rue_du_souvenir_français 57100_Thionville</li><li>linkedIn: <a href="https://www.linkedin.com/in/tristan-brasseur/" target="_blank">linkedin.com/in/tristan-brasseur/</a></li><li>gitHub: <a href="https://github.com/BrasseurTristan" target="_blank">github.com/BrasseurTristan</a></li><li>français: langue_maternelle</li><li>anglais: B1</li><li>permis_b: véhiculé</li><li>secteur: Luxembourg_Thionville_Metz</li></ul>';
    createWindow(title,text,this,'terminal-content');
    this.classList.add('disabled');
  }
});





    
  