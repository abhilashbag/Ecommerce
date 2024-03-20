// console.log("this is product page");
const cartBadge = document.querySelector('.cart-icon .badge');
let cart = [];
let totalQuantity = 0; // Total quantity count for all products

const selectCategory = document.getElementById("categories");
const searchButton = document.getElementById("search-btn");
const productContainer = document.getElementById("product-container");
const alphabeticalSort = document.getElementById("sort");

async function fetchCategory() {
    try {
        const URL = "https://dummyjson.com/products/categories";
        const res = await fetch(URL);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Fetching categories failed", error);
        return [];
    }
}

async function fetching() {
    try {
        const url = "https://dummyjson.com/products?limit=100";
        const response = await fetch(url);
        const data = await response.json();
        let products = data.products;
        displayData(products);

        selectCategory.addEventListener("change", function() {
            filterCatPro(products);
        });
        alphabeticalSort.addEventListener("change", function() {
            filterSort(products);
        })
    } catch (error) {
        console.log(`Error fetching data: ${error}`);
    }
}

fetching();

async function filterCatPro(products) {
    const selectedCategory = selectCategory.value;
    if (selectedCategory === "All") {
        displayData(products);
    } else {
        const filteredProducts = products.filter(product => product.category === selectedCategory);
        displayData(filteredProducts);
    }
}

async function filterSort(products) {
    let sortedProducts = [...products].sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        if (titleA < titleB) {
            return -1;
        }
        if (titleA > titleB) {
            return 1;
        }
        return 0;
    });

    const selectedCategory = selectCategory.value;
    if (selectedCategory !== "All") {
        sortedProducts = sortedProducts.filter(product => product.category === selectedCategory);
    }

    displayData(sortedProducts);
}

async function displayData(products) {
    productContainer.innerHTML = "";

    products.forEach(product => {
        const div = document.createElement('div');
        div.classList.add("gridbox");

        const thumbnailImg = document.createElement('img');
        thumbnailImg.classList.add("grid-image")
        thumbnailImg.src = product.thumbnail;
        thumbnailImg.alt = product.title;

        const titleDiv = document.createElement('h3');
        titleDiv.textContent = product.title;

        const priceDiv = document.createElement('span');
        priceDiv.textContent = 'Price: $' + product.price;

        const discountPriceDiv = document.createElement('p');
        discountPriceDiv.innerHTML = `Discount : <span> (${product.discountPercentage}%)</span>`;

        const cartContainer = document.createElement('div');
        cartContainer.id = "cart";

        const cartBtn = document.createElement('button');
        cartBtn.classList.add('cart-btn');
        cartBtn.textContent = "Go to Cart";

        const addCartButton = document.createElement('button');
        addCartButton.classList.add('addCart');
        addCartButton.textContent = 'Add to Cart';

        const quantityContainer = document.createElement('div');
        quantityContainer.id = 'quantity';
        quantityContainer.style.display = 'none';

        const minusButton = document.createElement('button');
        minusButton.id = 'minus';
        minusButton.textContent = '-';
        quantityContainer.appendChild(minusButton);

        const valueSpan = document.createElement('span');
        valueSpan.id = 'value';
        valueSpan.textContent = '1';
        quantityContainer.appendChild(valueSpan);

        const plusButton = document.createElement('button');
        plusButton.id = 'plus';
        plusButton.textContent = '+';
        quantityContainer.appendChild(plusButton);
        quantityContainer.appendChild(cartBtn);

        cartContainer.appendChild(addCartButton);
        cartContainer.appendChild(quantityContainer);

        cartBtn.addEventListener('click',()=>{
            window.location.href = `cart.html?id=${product.id}`;
            // window.location.href
            // console.log();
        })
        // div.addEventListener('click', () => {
        //     const productId = product.id;
        //     const url = `../Pages/single-product.html?id=${productId}`;
        //     window.open(url);
        // });

        div.append(thumbnailImg, titleDiv, priceDiv, discountPriceDiv, cartContainer);
        productContainer.appendChild(div);

        // Event listener for Add to Cart button
        addCartButton.addEventListener('click', (event) => {
            event.stopPropagation();
            let value = parseInt(valueSpan.textContent);
            addProductToCart(product, value); // Add product to cart
            addCartButton.style.display = 'none';
            quantityContainer.style.display = 'flex';
        });

        function addProductToCart(product, quantity) {
            const existingProduct = cart.find(item => item.product.id === product.id);
            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                cart.push({ product, quantity });
            }
            totalQuantity += quantity;
            updateCartBadge(totalQuantity);
            // Save cart to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        function updateCartBadge(quantity) {
            cartBadge.textContent = quantity;
        }

        minusButton.addEventListener('click', (event) => {
            event.stopPropagation();
            let value = parseInt(valueSpan.textContent);
            if (value > 1) {
                value--;
                valueSpan.textContent = value;
                totalQuantity--; // Update total quantity count
                updateCartBadge(totalQuantity);
            } else {
                addCartButton.style.display = 'inline-block';
                quantityContainer.style.display = 'none';
                totalQuantity--; // Update total quantity count
                updateCartBadge(totalQuantity);
            }
        });

        plusButton.addEventListener('click', (event) => {
            event.stopPropagation();
            let value = parseInt(valueSpan.textContent);
            value++;
            valueSpan.textContent = value;
            totalQuantity++; // Update total quantity count
            updateCartBadge(totalQuantity);
        });
    });
}

function updateCartBadge(quantity) {
    cartBadge.textContent = quantity;
}

searchButton.addEventListener("click", async () => {
    const search_term = document.getElementById("search").value;
    try {
        const url = `https://dummyjson.com/products/search?q=${search_term}`;
        const response = await fetch(url);
        const data = await response.json();
        const filterproducts = data.products;
        displayData(filterproducts);
    } catch (error) {
        console.log(`Error fetching data: ${error}`);
    }
});

(async function init() {
    const categoryData = await fetchCategory();
    showCategory(categoryData);
})();

function showCategory(category) {
    category.forEach(cat => {
        const option = document.createElement("option");
        option.textContent = cat;
        selectCategory.appendChild(option);
    });
}
