const fetchPosts = async (url) => {
  try {
    const response = await fetch(url);
    const results = await response.json();
    return results;
  } catch (error) {
    console.log(error);
  }
};

const renderPost = (id, category, categoryId, imgSrc, imgAlt, date, title, excerpt) => {
  return `
    <a class="post_preview" href="/blog-post.html?id=${id}">
        <p id="color-${categoryId}" class="category">${category}</p>
        <div class="featured_image">
            <img src="${imgSrc}" alt="${imgAlt}" />
        </div>
        <div class="post_text">
            <p class="date">${date}</p>
            <h3 class="post_title">${title}</h3>
            <div class="excerpt">
                ${excerpt}
            </div>
        </div>
    </a>
    `;
};



const renderCarousel = async (fetchResults, carouselTitle) => {
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
  titleOfCarousel.innerHTML = carouselTitle;
  slidingArea.innerHTML = postsHtml;
};

// const postsUrl = "https://soph-web-dev.eu/bug-blog/wp-json/wp/v2/posts?_embed";
// renderCarousel(fetchPosts(postsUrl), "Latest Posts");
