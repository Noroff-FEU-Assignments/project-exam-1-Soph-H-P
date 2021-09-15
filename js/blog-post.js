const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const postId = params.get("id");
const singleBlogPostUrl = `https://soph-web-dev.eu/bug-blog/wp-json/wp/v2/posts/${postId}?_embed`;
const blogPostTitle = document.querySelector(".blog_post_title");
const blogPostImage = document.querySelector(".blog_post_featured_image_container");
const blogPostCategory = document.querySelector(".blog_post_category");
const blogPostDate = document.querySelector(".blog_post_date");
const blogPostContent = document.querySelector(".blog_post_content");
const blogPostAuthor = document.querySelector(".author_info");

const renderBlogPost = async () => {
  const results = await fetchPosts(singleBlogPostUrl);
  const blogPost = results.results;
  const title = blogPost.title.rendered;
  blogPostTitle.innerHTML = title;
  const imgSrc = blogPost._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;
  const imgAlt = blogPost._embedded["wp:featuredmedia"][0].alt_text;
  blogPostImage.innerHTML = `<img src="${imgSrc}" alt="${imgAlt}">`;
  const category = blogPost._embedded["wp:term"][0][0];
  blogPostCategory.innerHTML = category.name;
  const postDate = new Date(blogPost.date);
  const date = postDate.toDateString();
  blogPostDate.innerHTML = date;
  const content = blogPost.content.rendered;
  blogPostContent.innerHTML = content;
  const author = blogPost._embedded.author[0].name;
  const authorImg = blogPost._embedded.author[0].avatar_urls[96];
  const authorHtml = `
      <div class="author_img" >
        <img src="${authorImg}" alt="Picture of me the author">
      </div>
      <p>By ${author}</p>
  `;
  blogPostAuthor.innerHTML = authorHtml;

  //Picture modal-----------------

  const images = [
    ...document.querySelectorAll("figure"),
    document.querySelector(".blog_post_featured_image_container"),
  ];

  images.forEach((image) => {
    image.addEventListener("click", (e) => {
      const element = e.target.tagName;

      image.classList.contains("full_screen_view") && element !== "IMG"
        ? image.classList.remove("full_screen_view")
        : (image.classList.add("full_screen_view"),
          image.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" }),
          (e.target.style.cursor = `default`));
    });
    //     image.addEventListener("keypress", (e) => {
    // if()
    //    {   const element = e.target.tagName;

    //       image.classList.contains("full_screen_view") && element !== "IMG"
    //         ? image.classList.remove("full_screen_view")
    //         : (image.classList.add("full_screen_view"),
    //           image.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" }),
    //           (e.target.style.cursor = `default`));}
    //     });
    image.addEventListener("mouseover", (e) => {
      const element = e.target.tagName;
      image.classList.contains("full_screen_view") && element !== "IMG"
        ? (image.style.cursor = `url("../icons/minimise.svg") 30 30, pointer`)
        : image.classList.contains("full_screen_view") && element === "IMG"
        ? (e.target.style.cursor = `default`)
        : !image.classList.contains("full_screen_view") && element === "IMG"
        ? (e.target.style.cursor = `url("../icons/maximise.svg") 30 30, pointer`)
        : (e.target.style.cursor = `default`);
    });
  });

  //render the carousel of related posts
  const categoryUrl = `https://soph-web-dev.eu/bug-blog/wp-json/wp/v2/posts?_embed&categories=${category.id}`;

  document.title = `${title} | Bug Blog`;

  const postsByCategory = await fetchPosts(categoryUrl);
  renderCarousel(postsByCategory, "Posts in this category");
};

renderBlogPost();

//Carousel-----------------

const slidingArea = document.querySelector(".sliding_area");
const titleOfCarousel = document.querySelector(".carousel_title");
const leftArrow = document.querySelector(".left_arrow");
const rightArrow = document.querySelector(".right_arrow");
const arrows = document.querySelectorAll(".arrow");

leftArrow.addEventListener("click", () => {
  slidingArea.scrollLeft -= 200;
});

rightArrow.addEventListener("click", () => {
  slidingArea.scrollLeft += 200;
});
