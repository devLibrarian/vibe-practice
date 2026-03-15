const siteHeader = document.getElementById('siteHeader');
let lastScrollTop = 0;

window.addEventListener('scroll', function() {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop) {
    // Downscroll
    siteHeader.classList.add('header-scrolled');
  } else {
    // Upscroll
    siteHeader.classList.remove('header-scrolled');
  }
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
});
