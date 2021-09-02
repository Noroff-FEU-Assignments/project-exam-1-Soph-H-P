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
// const isDesktop = () => (viewportWidth >= 800 ? true : false);
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
            
        </div>
        </ul>
    </nav>
`;

const headerNavMobile = `
    <button class="menu_button">
        <span class="hamburger_menu_bars" id="top-bun"></span>
        <span class="hamburger_menu_bars" id="burger"></span>
        <span class="hamburger_menu_bars" id="bottom-bun"></span>
    </button>
    <nav class="mobile_nav">
        <ul>
            <a class="header_link_mobile" href="index.html">
                <li>Home</li>
            </a>
            <a class="header_link_mobile" href="about.html">
                <li>About</li>
            </a>
            <a class="header_link_mobile" href="blog.html">
                <li>Blog</li>
            </a>
            <a class="header_link_mobile" href="contact.html">
                <li>Contact</li>
            </a>
        </ul>
        <div class="search_container">
            <button class="search_button" aria-label="search button" ></button>
            
        </div>
        
    </nav>
`;

window.addEventListener("resize", () => {
  //   viewportWidth = window.innerWidth;
  const newViewportWidth = window.innerWidth;
  if (newViewportWidth >= 800 && viewportWidth < 800) {
    header.innerHTML = logo + headerNavDesktop;
    isDesktop = true;
    viewportWidth = newViewportWidth;
  } else if (newViewportWidth < 800 && viewportWidth >= 800) {
    header.innerHTML = logo + headerNavMobile;
    isDesktop = false;
    viewportWidth = newViewportWidth;
    addBurgerFunctions();
  }
});

isDesktop
  ? (header.innerHTML = logo + headerNavDesktop)
  : (header.innerHTML = logo + headerNavMobile);

const addBurgerFunctions = () => {
  //Show hide menu on click
  const hamburgerMenuButton = document.querySelector(".menu_button");
  const mobileMenu = document.querySelector(".mobile_nav");
  const topBun = document.querySelector("#top-bun");
  const burgerBun = document.querySelector("#burger");
  const bottomBun = document.querySelector("#bottom-bun");
  let menuOpen = false;

  hamburgerMenuButton.addEventListener("click", (event) => {
    menuOpen = !menuOpen;
    menuOpen
      ? ((mobileMenu.style.bottom = "10%"),
        (topBun.style.transform = "rotate(45deg)"),
        (topBun.style.top = "15px"),
        (burger.style.transform = "rotate(45deg)"),
        (burger.style.top = "15px"),
        (bottomBun.style.transform = "rotate(-45deg)"),
        (bottomBun.style.top = "15px"))
      : ((mobileMenu.style.bottom = "-100%"),
        (topBun.style.transform = "rotate(0deg)"),
        (topBun.style.top = "6px"),
        (burger.style.transform = "rotate(0deg)"),
        (burger.style.top = "16px"),
        (bottomBun.style.transform = "rotate(0deg)"),
        (bottomBun.style.top = "26px"));
  });
};

//Search button
const searchButton = document.querySelector(".search_button");
