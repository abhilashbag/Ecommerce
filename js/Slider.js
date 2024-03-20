const filterContainer = document.querySelector("#filtered-products");

async function fetchData() {
  const url = "https://dummyjson.com/products";
  const response = await fetch(url);
  const data = await response.json();
  return data.products;
}

fetchData().then(products => {
 
  const filteredProducts = products.filter(product => parseFloat(product.rating) > 4.6);
  // console.log(filteredProducts);
  
  displayFilteredImages(filteredProducts);
  initSlider();
});

function displayFilteredImages(products) {
  products.forEach(product => {
    const div = document.createElement('div');
    const img = document.createElement('img');
    img.src = product.thumbnail;
    img.alt = product.title;
    div.classList.add("swiper-slide");
    div.classList.add("slide");
    div.appendChild(img);
    filterContainer.appendChild(div);

    // Add click event listener to each swiper-slide
    div.addEventListener('click', () => {
      // window.location.replace = `./pages/product.html?id=${product.id}`; // Redirect to product page with product ID
      let pathname = '/Pages/product.html'
      window.location.pathname = pathname;
      // console.log(window.location.pathname);
    });
  });
}


function initSlider() {
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 'auto',
    spaceBetween: 20,
    loop: true,
    autoplay:{
      delay:2500,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      
      // when window width is >= 640px
      640: {
        slidesPerView: 1,
      },
      // When window width is <= 768px (mobile screens), display only one slide
      768: {
        slidesPerView: 2,
      },
      // When window width is > 768px (larger screens), display 3 slides
      1024: {
        slidesPerView: 3,
      },
    },
  });
}
