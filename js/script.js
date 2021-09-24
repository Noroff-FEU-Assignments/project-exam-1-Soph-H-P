//GLOBAL
//Footer
const footer = document.querySelector("footer");

const socialMediaContainer = `
    <div class="social_media_container">
        <a tabindex=0 class="social_media_icon" href="https://www.facebook.com/" target=”_blank”><img src="../icons/facebook.svg" alt="facebook icon"></a>
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
    <a tabindex="0" href="index.html" aria-label="home" class="logo_container">
        <img src="icons/bug.svg" alt="bug icon">Bugs
        
    </a>
`;

const headerNavDesktop = `
    <nav class="desktop_nav">
        <ul>
            <a  class="header_link_desktop home" href="index.html">
                <li tabindex="0">Home</li>
            </a> 
            <a class="header_link_desktop about" href="about.html">
                <li tabindex="0">About</li>
            </a>
            <a class="header_link_desktop blog" href="blog.html">
                <li tabindex="0">Blog</li>
            </a>
            <a class="header_link_desktop contact" href="contact.html">
                <li tabindex="0">Contact</li>
            </a>
            <div class="search_container">
            <button class="search_button" aria-label="search" ></button>
            
            <div class="search_input_overlay overlay hide">
                <div class="input_container">
                    <input class="overlay search_input" id="search" type="text" />
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
            <a class="header_link_mobile menu_overlay home" href="index.html">
            <li tabindex="0">Home</li>
            </a>
            <a class="header_link_mobile menu_overlay about" href="about.html">
            <li tabindex="0">About</li>
            </a>
            <a class="header_link_mobile menu_overlay blog" href="blog.html">
            <li tabindex="0">Blog</li>
            </a>
            <a class="header_link_mobile menu_overlay contact" href="contact.html">
            <li tabindex="0">Contact</li>
            </a>
        </ul>
        <div class="search_container menu_overlay">
            <button class="search_button" aria-label="search"></button>
            <div class="search_input_overlay overlay hide">
                <div class="input_container">
                    <input class="overlay search_input" id="search" type="text"/>
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

const moveBug = (bug) => {
  const randVerticalPosition = Math.floor(Math.random() * 101);
  const randHorizontalPosition = Math.floor(Math.random() * 101);
  const randRotate = Math.floor(Math.random() * 361);
  if (
    bug.style.background !==
    `rgba(0, 0, 0, 0) url("../icons/bugsplat.svg") no-repeat scroll center center / 20px 20px`
  ) {
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
      moveBug(e.target);
    });
  }
  bug.addEventListener("click", (e) => {
    squashBug(e.target);
  });
});
