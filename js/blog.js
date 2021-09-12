const postsContainer = document.querySelector(".posts_container");
const postsUrl = "https://soph-web-dev.eu/bug-blog/wp-json/wp/v2/posts?_embed&per_page=9";

const renderBlogPosts = async (fetchResults) => {
  const postsArray = await fetchResults;
  let postsHtml = "";
  postsArray.map((post) => {
    const id = post.id;
    const category = post._embedded["wp:term"][0][0].name;
    const categoryId = post.categories[0];
    const imgSrc = post._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;
    const imgAlt = post._embedded["wp:featuredmedia"][0].alt_text;
    const postDate = new Date(post.date);
    const date = postDate.toDateString();
    const title = post.title.rendered;
    const excerpt = post.excerpt.rendered;
    postsHtml += renderPost(id, category, categoryId, imgSrc, imgAlt, date, title, excerpt);
  });
  // titleOfCarousel.innerHTML = blogsTitle;
  postsContainer.innerHTML = postsHtml;
};

renderBlogPosts(fetchPosts(postsUrl));

//Filter categories buttons

const allCategoriesButton = document.querySelector("#all-categories");

allCategoriesButton.addEventListener("click", () => {
  renderBlogPosts(fetchPosts(postsUrl));
});

const typesOfBugButton = document.querySelector("#types-of-bug");
const bugTypeUrl = "https://soph-web-dev.eu/bug-blog/wp-json/wp/v2/posts?_embed&categories=17";
typesOfBugButton.addEventListener("click", () => {
  renderBlogPosts(fetchPosts(bugTypeUrl));
});

const bugsWithBugsButton = document.querySelector("#bugs-with-bugs");
const bugsWithBugsUrl = "https://soph-web-dev.eu/bug-blog/wp-json/wp/v2/posts?_embed&categories=7";
bugsWithBugsButton.addEventListener("click", () => {
  renderBlogPosts(fetchPosts(bugsWithBugsUrl));
});

const bugHistoryButton = document.querySelector("#bug-history");
const bugHistoryUrl = "https://soph-web-dev.eu/bug-blog/wp-json/wp/v2/posts?_embed&categories=2";

bugHistoryButton.addEventListener("click", () => {
  renderBlogPosts(fetchPosts(bugHistoryUrl));
});

const bugsThatAreCodeButton = document.querySelector("#bugs-that-are-code");
const bugsThatAreCodeUrl =
  "https://soph-web-dev.eu/bug-blog/wp-json/wp/v2/posts?_embed&categories=12";
bugsThatAreCodeButton.addEventListener("click", () => {
  renderBlogPosts(fetchPosts(bugsThatAreCodeUrl));
});
