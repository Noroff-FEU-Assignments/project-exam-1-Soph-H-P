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
  try {
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
        <img src="${authorImg}" alt="Me the author">
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
      image.addEventListener("mouseover", (e) => {
        const element = e.target.tagName;
        image.classList.contains("full_screen_view") && element !== "IMG"
          ? (image.style.cursor = `pointer`)
          : image.classList.contains("full_screen_view") && element === "IMG"
          ? (e.target.style.cursor = `default`)
          : !image.classList.contains("full_screen_view") && element === "IMG"
          ? (e.target.style.cursor = `pointer`)
          : (e.target.style.cursor = `default`);
      });
    });

    //render the carousel of related posts
    const categoryUrl = `https://soph-web-dev.eu/bug-blog/wp-json/wp/v2/posts?_embed&categories=${category.id}`;

    document.title = `${title} | Bug Blog`;

    //Render Users Comments-----------------
    const comments = blogPost._embedded.replies && blogPost._embedded.replies[0];
    const commentsContainer = document.querySelector(".comments_container");
    const commentsHeading = document.querySelector(".comments_heading");

    if (!comments) {
      commentsHeading.innerHTML = "Be the first to write delightful little comment!";
      commentsContainer.innerHTML = `
    <div class="comment">
    <p>No comments to show</p>
    </div>
    `;
    } else {
      const renderComments = async () => {
        comments.forEach((comment) => {
          const commentAuthor = comment.author_name;
          const commentId = comment.id;
          const commentDate = new Date(comment.date);
          const formattedCommentDate = commentDate.toDateString();
          const commentHours = commentDate.getHours();
          const commentMinutes = commentDate.getMinutes();
          const formatMinutes = () => {
            if (commentMinutes < 10) {
              return `0${commentDate.getMinutes()}`;
            } else {
              return commentDate.getMinutes();
            }
          };
          const commentDateHtml = `
        ${formattedCommentDate} - ${commentHours}:${formatMinutes()}
        `;
          const commentContent = comment.content.rendered;
          const commentAuthorImg = () => {
            let commentAuthorImage;
            if (commentId <= 3) {
              commentAuthorImage = "../icons/greenbug.svg";
            } else if (commentId > 3 && commentId <= 6) {
              commentAuthorImage = "../icons/darkbluebug.svg";
            } else if (commentId > 6 && commentId <= 9) {
              commentAuthorImage = "../icons/lightbluebug.svg";
            } else if (commentId > 9 && commentId <= 12) {
              commentAuthorImage = "../icons/purplebug.svg";
            } else {
              commentAuthorImage = "../icons/blackbug.svg";
            }
            return commentAuthorImage;
          };
          const commentHtml = `
                <div class="comment">
                <div class="author_date">
                <div class="author_img" >
                <img src="${commentAuthorImg()}" alt="author of comment">
              </div>
                <h4>${commentAuthor}</h4>
                  <p>${commentDateHtml}</p>
                </div>
                  ${commentContent}
                </div>

                `;
          commentsContainer.innerHTML += commentHtml;
        });
      };
      renderComments();
    }

    const postsByCategory = await fetchPosts(categoryUrl);
    renderCarousel(postsByCategory, "Posts in this category");
  } catch (error) {
    blogPostTitle.innerHTML = "Very sorry there is a bug in my system... I wonder what kind...";
    document.querySelector(".comments").innerHTML = "";
    console.log(error);
    try {
      const postsByCategory = await fetchPosts(
        "https://soph-web-dev.eu/bug-blog/wp-json/wp/v2/posts?_embed&per_page=8"
      );
      renderCarousel(postsByCategory, "Perhaps try one of these");
    } catch (error) {
      console.log(error);
    }
  }
};

renderBlogPost();

//Allow Users to Comment-----------------
const handleUserComment = async () => {
  const postCommentUrl = `https://soph-web-dev.eu/bug-blog/wp-json/wp/v2/comments`;
  const userComment = JSON.stringify({
    post: postId,
    author_name: fullName.value,
    author_email: email.value,
    content: message.value,
  });
  try {
    const response = await fetch(postCommentUrl, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: userComment,
    });
    response.ok
      ? form.reset()
      : ((sendSuccess.innerHTML = "Commenting not possible at this time"),
        (sendSuccess.style.backgroundColor = "var(--error-color)"));
  } catch (error) {
    sendSuccess.innerHTML =
      "Commenting not possible at this time please try again later or contact me";
    sendSuccess.style.backgroundColor = "var(--error-color)";
    console.log(error);
  }
};

form.addEventListener("submit", handleUserComment);

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

//Disable arrows at each end of the scroll area
slidingArea.addEventListener("scroll", (e) => {
  const distanceScrolled = e.target.scrollLeft;
  const maxScrollArea = slidingArea.scrollWidth;
  const startOfContainer = e.target.offsetWidth;
  const endOfContainer = maxScrollArea - startOfContainer;
  if (distanceScrolled >= endOfContainer) {
    rightArrow.disabled = true;
  } else {
    rightArrow.disabled = false;
  }
  if (distanceScrolled <= 0) {
    leftArrow.disabled = true;
  } else {
    leftArrow.disabled = false;
  }
});
