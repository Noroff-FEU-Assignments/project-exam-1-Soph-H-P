//GLOBAL
//Footer
const footer = document.querySelector("footer");

const socialMediaContainer = `
    <div class="social_media_container">
        <a class="social_media_icon" href="https://www.facebook.com/" target=”_blank”><img src="../icons/facebook.svg" alt="facebook icon"></a>
        <a class="social_media_icon" href="https://www.instagram.com/" target=”_blank”><img src="../icons/instagram.svg" alt="instagram icon"></a>
        <a class="social_media_icon" href="https://www.snapchat.com/" target=”_blank”><img src="../icons/snapchat.svg" alt="snapchat icon"></a>
        <a class="social_media_icon" href="https://www.twitter.com/" target=”_blank”><img src="../icons/twitter.svg" alt="twitter icon"></a>
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
            <button class="search_button" aria-label="search" ></button>
            
            <div class="search_input_overlay overlay hide">
                <div class="input_container">
                    <input class="overlay search_input" type="text" />
                    <label class="overlay" for="search">Search...</label>
                </div> 
          </div>
        </div>
        </ul>
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
            <button class="search_button" aria-label="search"></button>
            <div class="search_input_overlay overlay hide">
                <div class="input_container">
                    <input class="overlay search_input" type="text"/>
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
    navContainer.classList.contains("menu_open")
      ? navContainer.classList.remove("menu_open")
      : navContainer.classList.add("menu_open");
  });
};

const addSearchFunction = () => {
  const searchButton = document.querySelector(".search_button");
  const searchInput = document.querySelector(".search_input");

  searchButton.addEventListener("click", (e) => {
    const overlay = e.target.nextElementSibling;
    overlay.classList.contains("hide")
      ? (overlay.classList.remove("hide"), searchInput.focus())
      : overlay.classList.add("hide");
  });

  searchInput.addEventListener("keyup", (e) => {
    const searchInput = e.target.value;
    const key = e.key;
    if (key === "Enter") window.location.href = `/search-results.html?search=${searchInput}`;
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
