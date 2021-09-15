const urlBuilder = (categoryId, offset) => {
  let url;
  if (!categoryId) {
    url = `https://soph-web-dev.eu/bug-blog/wp-json/wp/v2/posts?_embed&per_page=6&offset=${offset}`;
  } else if (categoryId === "search") {
    url = `https://soph-web-dev.eu/bug-blog/wp-json/wp/v2/posts?_embed&search="${postSearchTerm}"&per_page=6&offset=${offset}`;
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
      const postsRemaining = totalNumberOfPosts - postsToView;
      const postsHtml = await renderMorePostsHtml(viewMoreButtonUrl);
      postsToView += 6;
      const loadingArea = document.querySelector(".loader_container");
      loadingArea && loadingArea.remove();
      postsContainer.innerHTML += postsHtml;
      postsContainer.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" }, false);
      if (totalNumberOfPosts >= postsToView + 6) {
        viewMoreButton.innerHTML = `View ${postsRemaining} more`;
      }
      if (postsRemaining <= 6) {
        viewMoreButton.innerHTML = `No more posts`;
        viewMoreButton.disabled = true;
      }
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
