//Carousel-----------------
const postsUrl = `https://soph-web-dev.eu/bug-blog/wp-json/wp/v2/posts?_embed&search="network"`;

renderCarousel(fetchPosts(postsUrl), "Perhaps check out this:");
