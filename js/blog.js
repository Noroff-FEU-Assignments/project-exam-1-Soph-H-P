const postsContainer = document.querySelector(".posts_container");
const postsUrl = "https://soph-web-dev.eu/bug-blog/wp-json/wp/v2/posts?_embed&per_page=6";
const viewMoreButton = document.querySelector(".view_more_button");
let totalNumberOfPosts;
let order = "&order=desc";
renderBlogPosts(fetchPosts(postsUrl + order));

//Filter categories buttons

const allCategoriesButton = document.querySelector("#all-categories");
allCategoriesButton.style.border = "solid 4px var(--color-1)";
const bugsWithBugsButton = document.querySelector("#bugs-with-bugs");
const bugsAreCodeButton = document.querySelector("#bugs-that-are-code");
const typesOfBugButton = document.querySelector("#types-of-bug");
const bugHistoryButton = document.querySelector("#bug-history");
let currentCategory = null;
let categoryUrl;

allCategoriesButton.addEventListener("click", () => {
  bugsWithBugsButton.style.border = "none";
  bugsAreCodeButton.style.border = "none";
  typesOfBugButton.style.border = "none";
  bugHistoryButton.style.border = "none";
  allCategoriesButton.style.border = "solid 4px var(--color-1)";
  allCategoriesButton.style.textDecoration = "underline";
  renderBlogPosts(fetchPosts(postsUrl + order));
  currentCategory = null;
  offsetPosts = 0;
  postsToView = 6;
});

let postsToView = 6;
let offsetPosts = 0;
let viewMoreButtonUrl;

const categoryFilterButtons = document.querySelectorAll(".category_filter");
categoryFilterButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    allCategoriesButton.style.border = "none";
    allCategoriesButton.style.textDecoration = "none";
    bugsWithBugsButton.style.border = "none";
    bugsWithBugsButton.style.textDecoration = "none";
    bugsAreCodeButton.style.border = "none";
    bugsAreCodeButton.style.textDecoration = "none";
    typesOfBugButton.style.border = "none";
    typesOfBugButton.style.textDecoration = "none";
    bugHistoryButton.style.border = "none";
    bugHistoryButton.style.textDecoration = "none";
    postsToView = 6;
    offsetPosts = 0;
    const categoryId = event.target.dataset.category;
    currentCategory = categoryId;
    categoryUrl = `https://soph-web-dev.eu/bug-blog/wp-json/wp/v2/posts?_embed&categories=${categoryId}&per_page=6`;
    renderBlogPosts(fetchPosts(categoryUrl + order));
    switch (button.id) {
      case "bugs-that-are-code":
        button.style.border = "solid 5px var(--color-3)";
        button.style.textDecoration = "underline";
        break;
      case "bug-history":
        button.style.border = "solid 5px var(--color-6)";
        button.style.textDecoration = "underline";
        break;
      case "bugs-with-bugs":
        button.style.border = "solid 5px var(--color-2)";
        button.style.textDecoration = "underline";
        break;
      case "types-of-bug":
        button.style.border = "solid 5px var(--color-5)";
        button.style.textDecoration = "underline";
        break;
      default:
        button.style.border = "solid 5px var(--color-5)";
        button.style.textDecoration = "underline";
        break;
    }
  });
});

viewMoreButton.disabled = false;

viewMoreButton.addEventListener("click", fetchMorePosts);

//sortby functions----

const select = document.querySelector("#sort-by");

select.addEventListener("change", (e) => {
  const value = e.target.value;
  value === "oldest"
    ? (order = "&order=asc")
    : value === "alphabetical"
    ? (order = "&order=asc&orderby=title")
    : (order = "&order=desc");
  currentCategory
    ? renderBlogPosts(fetchPosts(categoryUrl + order))
    : renderBlogPosts(fetchPosts(postsUrl + order));

  offsetPosts = 0;
  postsToView = 6;
});
