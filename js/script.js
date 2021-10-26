//GLOBAL
//Footer
const footer = document.querySelector("footer");

const socialMediaContainer = `
    <div class="social_media_container">
        <a tabindex=0 class="social_media_icon" href="https://www.facebook.com/sharer/sharer.php?u=https%3A//portfolio-updates--where-bugs-unite.netlify.app/" target=”_blank”><img src="../icons/facebook.svg" alt="facebook icon"></a>
        <a class="social_media_icon" href="https://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fportfolio-updates--where-bugs-unite.netlify.app%2F" target=”_blank”><img src="../icons/linkedin.svg" alt="linkedin icon"></a>
        <a class="social_media_icon" href="https://pinterest.com/pin/create/button/?description=&media=&url=https%3A%2F%2Fportfolio-updates--where-bugs-unite.netlify.app%2F" target=”_blank”><img src="../icons/pinterest.svg" alt="pinterest icon"></a>
        <a class="social_media_icon" href="https://twitter.com/intent/tweet?text=https%3A//portfolio-updates--where-bugs-unite.netlify.app/" target=”_blank”><img src="../icons/twitter.svg" alt="twitter icon"></a>
    </div>
`;

const footerLinks = `
    <ul class="footer_links">
        <a class="footer_link" id="about-link" href="about.html">
            <li>About</li>
        </a>
        <a class="footer_link" id="blog-link" href="blog.html">
            <li>Blog</li>
        </a>
        <a class="footer_link" id="contact-link" href="contact.html">
            <li>Contact</li>
        </a>
    </ul>
`;

footer.innerHTML = socialMediaContainer + footerLinks;

//Header
let viewportWidth = window.innerWidth;
let isDesktop = viewportWidth >= 800 ? true : false;

const header = document.querySelector("header");

const logo = `
    <a tabindex="0" href="index.html" aria-label="home" class="logo_container">
        <img src="icons/bug.svg" alt="bug icon">Bugs
        
    </a>
`;

const headerNavDesktop = `
    <nav class="desktop_nav">
        <ul>
          <li tabindex="0">
            <a  class="header_link_desktop home" href="index.html">Home</a>
          </li>
          <li tabindex="0">
            <a class="header_link_desktop about" href="about.html">About</a>
          </li>
          <li tabindex="0">
            <a class="header_link_desktop blog" href="blog.html">Blog</a>
          </li>
          <li tabindex="0">
            <a class="header_link_desktop contact" href="contact.html">Contact</a>
          </li>  
        </ul>
          <div class="search_container">
          <button class="search_button" aria-label="search" ></button>
            
            <div class="search_input_overlay overlay hide">
                <div class="input_container">
                    <label class="overlay" for="search">Search...</label>
                    <input class="overlay search_input" id="search" type="text" />
                </div> 
          </div>
        </div>
        
    </nav>
`;

const headerNavMobile = `
<div class="nav_container">
    <button class="menu_button" aria-label="menu">
        <span class="hamburger_menu_bars" id="top-bun"></span>
        <span class="hamburger_menu_bars" id="burger"></span>
        <span class="hamburger_menu_bars" id="bottom-bun"></span>
    </button>
    <nav class="mobile_nav menu_overlay">
        <ul>
            <li tabindex="0">
              <a class="header_link_mobile menu_overlay home" href="index.html">Home</a>
            </li>
            <li tabindex="0">
              <a class="header_link_mobile menu_overlay about" href="about.html">About</a>
            </li>
            <li tabindex="0">
              <a class="header_link_mobile menu_overlay blog" href="blog.html">Blog</a>
            </li>
            <li tabindex="0">
              <a class="header_link_mobile menu_overlay contact" href="contact.html">Contact</a>
            </li>
            
        </ul>
        <div class="search_container menu_overlay">
            <button class="search_button" aria-label="search"></button>
            <div class="search_input_overlay overlay hide">
                <div class="input_container">
                  <label class="overlay" for="search">Search...</label>
                  <input class="overlay search_input" id="search" type="text"/>
                </div> 
            </div>
        </div>
    </nav>
</div>
`;

window.addEventListener("resize", () => {
  const newViewportWidth = window.innerWidth;
  if (newViewportWidth >= 800 && viewportWidth < 800) {
    header.innerHTML = logo + headerNavDesktop;
    isDesktop = true;
    viewportWidth = newViewportWidth;
    addSearchFunction();
  } else if (newViewportWidth < 800 && viewportWidth >= 800) {
    header.innerHTML = logo + headerNavMobile;
    isDesktop = false;
    viewportWidth = newViewportWidth;
    addBurgerFunctions();
    addSearchFunction();
  }
});

let menuOpen = false;

const addBurgerFunctions = () => {
  //Show hide menu on click
  const hamburgerMenuButton = document.querySelector(".menu_button");
  const navContainer = document.querySelector(".nav_container");

  hamburgerMenuButton.addEventListener("click", () => {
    navContainer.classList.contains("menu_open")
      ? navContainer.classList.remove("menu_open")
      : navContainer.classList.add("menu_open");
  });
};

const addSearchFunction = () => {
  const searchButton = document.querySelector(".search_button");
  const searchInput = document.querySelector(".search_input");

  searchButton.addEventListener("click", (e) => {
    const overlay = document.querySelector(".search_input_overlay");
    // const overlay = e.target.nextElementSibling;
    overlay.classList.contains("hide")
      ? (overlay.classList.remove("hide"), searchInput.focus())
      : overlay.classList.add("hide");
  });

  searchInput.addEventListener("keyup", (e) => {
    const overlay = document.querySelector(".search_input_overlay");
    const searchInput = e.target.value;
    const key = e.key;
    if (key === "Enter" && e.target.value.length > 0) {
      window.location.href = `/search-results.html?search=${searchInput}`;
    }

    if (key === "Escape") overlay.classList.add("hide");
  });
};

window.addEventListener("click", (e) => {
  const target = e.target.classList;
  const searchOverlay = document.querySelector(".search_input_overlay");
  if (!target.contains("overlay") && !target.contains("search_button")) {
    searchOverlay.classList.add("hide");
  }
  if (!isDesktop) {
    const navContainer = document.querySelector(".nav_container");

    if (
      !target.contains("menu_overlay") &&
      !target.contains("hamburger_menu_bars") &&
      !target.contains("menu_button")
    ) {
      navContainer.classList.remove("menu_open");
    }
  }
});

isDesktop
  ? ((header.innerHTML = logo + headerNavDesktop), addSearchFunction())
  : ((header.innerHTML = logo + headerNavMobile), addBurgerFunctions(), addSearchFunction());

//Underline current page
switch (document.title) {
  case "Home | Bug Blog":
    const home = document.querySelector(".home");
    home.style.fontWeight = "bold";
    home.style.borderBottom = "var(--color-2) 4px dotted";
    break;
  case "About | Bug Blog":
    const about = document.querySelector(".about");
    about.style.fontWeight = "bold";
    about.style.borderBottom = "var(--color-2) 4px dotted";
    break;
  case "Contact | Bug Blog":
    const contact = document.querySelector(".contact");
    contact.style.fontWeight = "bold";
    contact.style.borderBottom = "var(--color-2) 4px dotted";
    break;
  case "Blog | Bug Blog":
    const blog = document.querySelector(".blog");
    blog.style.fontWeight = "bold";
    blog.style.borderBottom = "var(--color-2) 4px dotted";
    break;
  case "Blog Post | Bug Blog":
    const blogPost = document.querySelector(".blog");
    blogPost.style.fontWeight = "bold";
    blogPost.style.borderBottom = "var(--color-2) 4px dotted";
    break;
  default:
    break;
}

//---------------title bugs

const titleBugs = document.querySelectorAll(".title_bug");

const moveBug = (bug, background) => {
  const randVerticalPosition = Math.floor(Math.random() * 101);
  const randHorizontalPosition = Math.floor(Math.random() * 101);
  const randRotate = Math.floor(Math.random() * 361);

  if (!background.includes("bugsplat")) {
    bug.style.top = `${randVerticalPosition}%`;
    bug.style.left = `${randHorizontalPosition}%`;
    bug.style.transform = `rotate(${randRotate}deg)`;
  }
};

const squashBug = (bug) => {
  bug.style.background = `url("../icons/bugsplat.svg") center / 20px 20px no-repeat`;
};
titleBugs.forEach((bug) => {
  if (isDesktop) {
    bug.addEventListener("mouseover", (e) => {
      moveBug(e.target, e.target.style.background);
    });
  }
  bug.addEventListener("click", (e) => {
    squashBug(e.target);
  });
});

//carousel
const slidingArea = document.querySelector(".sliding_area");
const titleOfCarousel = document.querySelector(".carousel_title");
const leftArrow = document.querySelector(".left_arrow");
const rightArrow = document.querySelector(".right_arrow");
const arrows = document.querySelectorAll(".arrow");

const getScrollDistance = () => {
  const previewWidth = viewportWidth < 800 ? 190 : 260;
  const scrollAmount = slidingArea.offsetWidth % previewWidth;
  return slidingArea.offsetWidth - scrollAmount;
};

const scrollTo = (direction) => {
  const scrollDistance = getScrollDistance();
  direction === "left"
    ? (slidingArea.scrollLeft -= scrollDistance)
    : (slidingArea.scrollLeft += scrollDistance);
};

if (leftArrow) {
  leftArrow.addEventListener("click", () => {
    scrollTo("left");
  });
  rightArrow.addEventListener("click", () => {
    scrollTo("right");
  });

  //Disable arrows at each end of the scroll area
  slidingArea.addEventListener("scroll", (e) => {
    const distanceScrolled = e.target.scrollLeft;
    const maxScrollArea = slidingArea.scrollWidth;
    const startOfContainer = e.target.offsetWidth;
    const endOfContainer = maxScrollArea - startOfContainer;
    distanceScrolled >= endOfContainer
      ? (rightArrow.disabled = true)
      : (rightArrow.disabled = false);
    distanceScrolled <= 0 ? (leftArrow.disabled = true) : (leftArrow.disabled = false);
  });
}
