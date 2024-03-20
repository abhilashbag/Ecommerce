window.addEventListener('DOMContentLoaded', fetchData, false);
const container = document.querySelector("#product-grid");
async function fetchData() {
  const url = "https://dummyjson.com/products?limit=100";
  const response = await fetch(url);
  const data = await response.json();
  return data.products;
}

fetchData().then(products => {
  const categories = [...new Set(products.map(product => product.category))];
  categories.forEach(category => {
    const categoryProducts = products.filter(product => product.category === category);
    displayCategoryImages(category, categoryProducts);
  });
});

function displayCategoryImages(category, products) {
  const categoryContainer = document.createElement('div');
  categoryContainer.classList.add('category-container');

  const categoryHeader = document.createElement('h2');
  categoryHeader.textContent = category;
  categoryContainer.appendChild(categoryHeader);

  const productGrid = document.createElement('div');
  productGrid.classList.add('product-grid');

  products.forEach(product => {
    const productItem = document.createElement('div');
    productItem.classList.add('product-item');

    const img = document.createElement('img');
    img.src = product.thumbnail;
    img.alt = product.title;

    productItem.appendChild(img);
    productGrid.appendChild(productItem);

    // Add click event listener to each product item
    productItem.addEventListener('click', () => {
<<<<<<< HEAD
      window.location.href = "/pages/product.html";
      console.log(window.location.href);
      // window.location.pathname = pathname;
      // console.log(window.location.pathname);
=======
     // Construct the URL for the product page based on the product ID
     const productPageUrl = `./pages/product.html?id=${product.id}`;
     // Redirect to the product page
     window.location.href = productPageUrl;
>>>>>>> d33941e3627dfe2c451352e7dc00459a80f74ea2
    });
  });

  categoryContainer.appendChild(productGrid);
  container.appendChild(categoryContainer);
}
