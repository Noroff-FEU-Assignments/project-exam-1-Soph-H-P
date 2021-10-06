const randomPostUrl = `https://soph-web-dev.eu/bug-blog/wp-json/wp/v2/posts/?orderby=rand&per_page=1`;

const getRandomPost = async () => {
  try {
    const response = await fetch(randomPostUrl);
    const result = await response.json();
    const randomPostId = result[0].id;
    window.location.href = `blog-post.html?id=${randomPostId}`;
    return randomPostId;
  } catch (error) {
    console.log(error);
    window.location.href = "blog-post.html?id=20";
  }
};

const randomButton = document.querySelector(".random_post_button");

randomButton.addEventListener("click", getRandomPost);
