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
    return totalNumberOfPosts
  } catch (error) {
    console.log(error);
  }
};
