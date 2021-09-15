const postsContainer = document.querySelector(".posts_container");
const postsUrl = "https://soph-web-dev.eu/bug-blog/wp-json/wp/v2/posts?_embed&per_page=6";
const viewMoreButton = document.querySelector(".view-more-button");
let totalNumberOfPosts;
const loadingHtml = `<div class="loading_featured_image loader_container">
<p>Loading...</p>
<img class="lil_bug loading" src="icons/bug.svg" alt="" />
<img class="magnifying_glass loading" src="icons/search.svg" alt="" />
</div>`;

const renderBlogPosts = async (fetchResults) => {
  try {
    postsContainer.innerHTML = loadingHtml;
    const results = await fetchResults;
    const postsArray = results.results;
    totalNumberOfPosts = results.totalNumberOfPosts;
    totalNumberOfPosts > 6 &&
      ((viewMoreButton.innerHTML = "View more"), (viewMoreButton.disabled = false));
    totalNumberOfPosts < 6 &&
      ((viewMoreButton.innerHTML = "No more posts"), (viewMoreButton.disabled = true));

    const postsHtml = renderPreview(postsArray);
    const loadingArea = document.querySelector(".loader_container");
    loadingArea && loadingArea.remove();
    postsContainer.innerHTML = postsHtml;
  } catch (error) {
    console.log(error);
  }
};

renderBlogPosts(fetchPosts(postsUrl));

//Filter categories buttons

const allCategoriesButton = document.querySelector("#all-categories");
let currentCategory;

allCategoriesButton.addEventListener("click", () => {
  renderBlogPosts(fetchPosts(postsUrl));
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
    postsToView = 6;
    offsetPosts = 0;
    const categoryId = event.target.dataset.category;
    currentCategory = categoryId;
    const categoryUrl = `https://soph-web-dev.eu/bug-blog/wp-json/wp/v2/posts?_embed&categories=${categoryId}&per_page=6`;
    renderBlogPosts(fetchPosts(categoryUrl));
  });
});

viewMoreButton.disabled = false;

const urlBuilder = (categoryId, offset) => {
  let url;
  if (!categoryId) {
    url = `https://soph-web-dev.eu/bug-blog/wp-json/wp/v2/posts?_embed&per_page=6&offset=${offset}`;
  } else {
    let categoriesQuery = `categories=${categoryId}&`;
    url = `https://soph-web-dev.eu/bug-blog/wp-json/wp/v2/posts?_embed&per_page=6&${categoriesQuery}offset=${offset}`;
  }
  return url;
};

const renderMorePostsHtml = async (url) => {
  const results = await fetchPosts(url);
  const postsArray = results.results;
  const postsHtml = renderPreview(postsArray);
  return postsHtml;
};

const fetchMorePosts = async () => {
  try {
    if (totalNumberOfPosts >= postsToView + 6) {
      postsContainer.innerHTML += loadingHtml;
      offsetPosts += postsToView;
      viewMoreButtonUrl = urlBuilder(currentCategory, offsetPosts);
      const postsHtml = await renderMorePostsHtml(viewMoreButtonUrl);
      postsToView += 6;
      const loadingArea = document.querySelector(".loader_container");
      loadingArea && loadingArea.remove();
      postsContainer.innerHTML += postsHtml;
      postsContainer.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" }, false);
      const postsLeft = totalNumberOfPosts - postsToView;
      viewMoreButton.innerHTML = `View ${postsLeft} more`;
    } else if (totalNumberOfPosts < postsToView + 6 && totalNumberOfPosts > postsToView) {
      postsContainer.innerHTML += loadingHtml;
      offsetPosts = postsToView;
      viewMoreButtonUrl = urlBuilder(currentCategory, offsetPosts);
      const postsHtml = await renderMorePostsHtml(viewMoreButtonUrl);
      postsToView += totalNumberOfPosts - postsToView;
      const loadingArea = document.querySelector(".loader_container");
      loadingArea && loadingArea.remove();
      postsContainer.innerHTML += postsHtml;
      postsContainer.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" }, false);
      viewMoreButton.innerHTML = `No more posts`;
      viewMoreButton.disabled = true;
    }
  } catch (error) {
    console.log(error);
  }
};

viewMoreButton.addEventListener("click", fetchMorePosts);
