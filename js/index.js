//Carousel-----------------
const postsUrl = "https://soph-web-dev.eu/bug-blog/wp-json/wp/v2/posts?_embed&per_page=8";

renderCarousel(fetchPosts(postsUrl), "Latest Posts");


