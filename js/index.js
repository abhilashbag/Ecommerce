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
      window.location.pathname = `/pages/product.html`;
    });
  });

  categoryContainer.appendChild(productGrid);
  container.appendChild(categoryContainer);
}
