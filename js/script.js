//GLOBAL
//Footer
const footer = document.querySelector("footer");

const socialMediaContainer = `
    <div class="social_media_container">
        <a href="https://www.facebook.com/" ><img src="../icons/facebook.svg" alt="facebook icon"></a>
        <a href="https://www.instagram.com/" ><img src="../icons/instagram.svg" alt="instagram icon"></a>
        <a href="https://www.snapchat.com/" ><img src="../icons/snapchat.svg" alt="snapchat icon"></a>
        <a href="https://www.twitter.com/" ><img src="../icons/twitter.svg" alt="twitter icon"></a>
    </div>
`;

const footerLinks = `
    <ul class="footer_links">
        <a class="footer_link" href="about.html">
            <li>About</li>
        </a>
        <a class="footer_link" href="blog.html">
            <li>Blog</li>
        </a>
        <a class="footer_link" href="contact.html">
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
    <a href="index.html" class="logo_container">
        <img src="icons/bug.svg" alt="bug icon">
        <p class="logo_text">Bugs</p>
    </a>
`;

const headerNavDesktop = `
    <nav class="desktop_nav">
        <ul>
            <a class="header_link_desktop" href="about.html">
                <li>About</li>
            </a>
            <a class="header_link_desktop" href="blog.html">
                <li>Blog</li>
            </a>
            <a class="header_link_desktop" href="contact.html">
                <li>Contact</li>
            </a>
            <div class="search_container">
            <button class="search_button" aria-label="search button" ></button>
            
            <div class="search_input_overlay overlay hide">
                <div class="input_container">
                    <input class="overlay" type="text" />
                    <label class="overlay" for="search">Search...</label>
                </div> 
          </div>
        </div>
        </ul>
    </nav>
`;

const headerNavMobile = `
<div class="nav_container">
    <button class="menu_button">
        <span class="hamburger_menu_bars" id="top-bun"></span>
        <span class="hamburger_menu_bars" id="burger"></span>
        <span class="hamburger_menu_bars" id="bottom-bun"></span>
    </button>
    <nav class="mobile_nav menu_overlay">
        <ul>
            <a class="header_link_mobile menu_overlay" href="index.html">
            <li>Home</li>
            </a>
            <a class="header_link_mobile menu_overlay" href="about.html">
            <li>About</li>
            </a>
            <a class="header_link_mobile menu_overlay" href="blog.html">
            <li>Blog</li>
            </a>
            <a class="header_link_mobile menu_overlay" href="contact.html">
            <li>Contact</li>
            </a>
        </ul>
        <div class="search_container menu_overlay">
            <button class="search_button" aria-label="search button"></button>
            <div class="search_input_overlay overlay hide">
                <div class="input_container">
                    <input class="overlay" type="text" />
                    <label class="overlay" for="search">Search...</label>
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
    if (navContainer.classList.contains("menu_open")) {
      navContainer.classList.remove("menu_open");
    } else {
      navContainer.classList.add("menu_open");
    }
  });
};

const addSearchFunction = () => {
  const searchButton = document.querySelector(".search_button");

  searchButton.addEventListener("click", (e) => {
    const overlay = e.explicitOriginalTarget.nextElementSibling;
    if (overlay.classList.contains("hide")) {
      overlay.classList.remove("hide");
    } else {
      overlay.classList.add("hide");
    }
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
