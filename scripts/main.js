// FUNCTION FOR STICKY NAVBAR

// When the user scrolls the page, execute myFunction
window.onscroll = function() {stickyNavbar()};

// Get the header
let navbar = document.getElementsByClassName("navbar");

// Get the offset position of the navbar
let sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function stickyNavbar() {
  if (window.scrollY > sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
} 

// MOBILE MENU OPENER

function menuOpen() {
  mobileMenu = document.getElementById("mobile-menu");
  menuButton = document.getElementById("menu-button");
  if (mobileMenu.style.display === "flex") {
    mobileMenu.style.display = "none";    
    menuButton.className = "fa-solid fa-bars";  
    document.body.style.overflow = "visible"; 
  } else {    
    mobileMenu.style.display = "flex";    
    menuButton.className = "fa-solid fa-x";    
    document.body.style.overflow = "hidden";
    // document.documentElement.style.overflow = "hidden";
  }
}

// FUNCTION FOR VIDEO PLAYER AND MENU

function videoMenuOpen() {
  let videoMenu = document.getElementById("video-menu");   
  let videoPlayer = document.getElementsByClassName("youtube-video");
  if (videoMenu.style.display === "flex") {
    videoMenu.style.display = "none";       
    document.body.style.overflow = "visible";  
    stopVideos();  
  } else {    
    videoMenu.style.display = "flex";    
    document.body.style.overflow = "hidden";
  }
}

/**
 * Stop all iframes or HTML5 <video>'s from playing
 */
function stopVideos() {
	var videos = document.querySelectorAll('iframe, video');
	Array.prototype.forEach.call(videos, function (video) {
		if (video.tagName.toLowerCase() === 'video') {
			video.pause();
		} else {
			var src = video.src;
			video.src = src;
		}
	});
};

// FUNCTION FOR IMG MENU OPENER

function imgMenuOpen(n) {
  let imgMenu = document.getElementById("img-menu");  
  let imgPreview = document.getElementById("img-preview");  
  if (imgMenu.style.display === "flex") {
    imgMenu.style.display = "none";       
    document.body.style.overflow = "visible";         
  } else {    
    imgMenu.style.display = "flex";       
    imgPreview.src = "../assets/img/reviews/"+n+".jpg";    
    document.body.style.overflow = "hidden";    
  }
}

// CARD SLIDER (OLD)

let slideIndex = 1;

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  let i;
  let x = document.getElementsByClassName("card-requirements");
  if (n > x.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = x.length;
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex-1].style.display = "flex";
}



// ACCORDION FUNCTIONALITY

function accordion() {
  let acc = document.getElementsByClassName("accordion");
  let i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      /* Toggle between adding and removing the "active" class,
      to highlight the button that controls the panel */
      //closeAllItems(); //closing all other opened accordions
      this.classList.toggle("active");      
      

      /* Toggle between hiding and showing the active panel */
      let panel = this.getElementsByClassName("panel")[i];      
      if (panel.style.maxHeight == '100vh') {
        panel.style.maxHeight = '0vh';
      } else {               
          panel.style.maxHeight = '100vh';          
      }
      
    });
  }

  function closeAllItems() {
    const accordionItems = document.querySelectorAll('.accordion');
    accordionItems.forEach(item => {
      item.classList.remove('active');
    });
  }

}

function lecturesDates() {
  let lectureDay = document.getElementsByClassName("lecture-date");
  let i;
  for (i = 0; i < 8; i++) {    
    let courseStartDate = new Date("05/26/2024"); // Set start date every new course (mm/dd.yyyy)
    courseStartDate.setDate(courseStartDate.getDate() + i * 7);  
    lectureDay[i].textContent = courseStartDate.toLocaleDateString('ru');
  }
  
}

// COPY MY EMAIL

function copyEmail() {  
  emailButton = document.getElementById("signin-email");  
  if (window.isSecureContext) {  
    navigator.clipboard.writeText('magalmarel@gmail.com');
    emailButton.innerHTML = '<i class="fa-solid fa-check"></i>E-mail скопирован!';      
  }
  else {
    emailButton.innerHTML = '<i class="fa-solid fa-face-sad-tear"></i>Не удалось скопировать :( <br/> Сделайте это вручную!';
  }

}

// ALL ONLOAD FUNCTIONS STARTS HERE

window.onload = function() {
  accordion(), 
  lecturesDates()
};