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

  document.querySelector('.date').innerHTML = datelocale + ' ' +addZero(date.getHours()) + ':' + addZero(date.getMinutes());
}
function addZero(number){
    return number < 10 ? '0' + number : number
}
window.onload = () => {setInterval('dayAndHour()',5000);
};

/*****************************************************************************/
/*********************************NEW WINDOW**********************************/
/*****************************************************************************/

const buttonDiv = document.querySelector(".testclick");
const buttonDiv2 = document.querySelector(".testclick2");
let X;
let Y;
let mouse_down = false;
let topDiv = null;
let exist=false;



function createWindow(title,text) {
  
    const mainWindow = document.createElement('div');
    mainWindow.classList.add('body-window');
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
    content.classList.add('content');
    mainWindow.appendChild(content);
    content.innerHTML = text;
    // Permet de mettre en avant une div avec le click
    mainWindow.addEventListener('click', bringToFront);
  
    function bringToFront() {
      if (topDiv) {
        topDiv.style.zIndex = '0'; // Mettre la div précédente à une valeur inférieure
      }
    
      this.style.zIndex = '9999';
      topDiv = this; // Mettre à jour la div actuellement en premier plan
    }
  
  
    headerWindow.onmousedown = function(event) {
  
      let shiftX = event.clientX - headerWindow.getBoundingClientRect().left;
      let shiftY = event.clientY - headerWindow.getBoundingClientRect().top;
  
      moveAt(event.pageX, event.pageY);
  
      function moveAt(pageX, pageY) {
          // Obtenir la largeur et la hauteur de la fenêtre
          const windowWidth = document.documentElement.clientWidth;
          const windowHeight = document.documentElement.clientHeight;
  
          // Obtenir la largeur et la hauteur de la boîte
          const boxWidth = mainWindow.offsetWidth;
          const boxHeight = mainWindow.offsetHeight;
  
          // Calculer les limites de la boîte
          const minX = 0;
          const minY = 0;
          const maxX = windowWidth - boxWidth;
          const maxY = windowHeight - boxHeight;
  
          // Restreindre les coordonnées X et Y pour qu'elles ne dépassent pas les limites de la fenêtre
          const restrictedX = Math.min(Math.max(minX, pageX - shiftX), maxX);
          const restrictedY = Math.min(Math.max(minY, pageY - shiftY), maxY);
  
          // Appliquer les coordonnées restreintes à la boîte
          mainWindow.style.left = restrictedX + 'px';
          mainWindow.style.top = restrictedY + 'px';
      }
  
      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
      }
  
      document.addEventListener('mousemove', onMouseMove);
  
      document.onmouseup = function() {
        headerWindow.onmouseup = null;
        document.removeEventListener('mousemove', onMouseMove);
      };
    };
  
    closeButton.addEventListener('click', function() {
      mainWindow.parentNode.removeChild(mainWindow);
      exist = false;
      
    });
  
    function fullscreen(currentWidth,currentHeight,currentTop,currentLeft){
  
      if(mainWindow.classList.contains('fullscreen')){
        mainWindow.style.left =  '0px';
        mainWindow.style.top = '0px';
        mainWindow.style.width =  '100%';
        mainWindow.style.height = '100%';
      }else {
        mainWindow.style.left =  currentLeft;
        mainWindow.style.top = currentTop;
        mainWindow.style.width =  currentWidth;
        mainWindow.style.height = currentHeight;
      }
    }
    const paramStyles = window.getComputedStyle(mainWindow);
    let currentWidth = paramStyles.getPropertyValue('width');
    let currentHeight = paramStyles.getPropertyValue('height');
    let currentTop = paramStyles.getPropertyValue('top');
    let currentLeft = paramStyles.getPropertyValue('left');
    
  
    upscaleButton.addEventListener('click', function(){
      
      if(!mainWindow.classList.contains('fullscreen')){
        currentHeight = paramStyles.getPropertyValue('height');
        currentWidth = paramStyles.getPropertyValue('width');
        currentTop = paramStyles.getPropertyValue('top');
        currentLeft = paramStyles.getPropertyValue('left');
      }
  
      mainWindow.classList.toggle('fullscreen');
      fullscreen(currentWidth,currentHeight,currentTop,currentLeft)
    
      
    });
    exist = true;
  }

buttonDiv.addEventListener('dblclick',()=>{
    title = 'Description.txt';
    text = '<p> Passionné d\'informatique, j\'ai décidé de faire une reconversion professionnelle en tant que développeur web. Je suis à la recherche d\'un stage du 26 juin jusqu\’au 28 août 2023. <br>Je suis également à la recherche d\'une opportunité d\'alternance pour poursuivre mes études et obtenir un diplôme de développeur FullStack. Le rythme de l\'alternance sera d\'une semaine en formation pour trois semaines en entreprise.</p>';
    exist ? "" : createWindow(title,text);
});
buttonDiv2.addEventListener('dblclick',()=>{
    title = 'Résumé-de-carrière.txt';  
    text = '<h3> Sidérurgie</h3><ul><li>Ouvrier sidérurgique, pontier cabine, pontier sol, cariste - ARCELOR MITTAL -Juin 2015 à Mars 2022  </li></ul><h3>Automobile</h3><ul><li> Agent de fabrication - SOVAB, Batilly - Décembre 2014 à Avril 2015 </li></ul><h3>Informatique</h3><ul><li>Assistant technicien informatique - VANKSEN, Luxembourg - Novembre 2014</li></ul><h3> Restauration</h3><ul><li>Aide cuisinier - SERVIOR, Dudelange - Décembre 2013 à Septembre 2014</li><li>Fabrication et vente de pâtes fraiches - PASTA FRESCA, Luxembourg - 2013</li></ul>';

    exist ? "" : createWindow(title,text);
});