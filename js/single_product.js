
const productDiv = document.getElementById("product-details");
const countBadge1 = document.querySelector(".badge")


let cartValue = localStorage.getItem('cartValue') || 0;

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
if (productId) {
fetchProduct(productId);
}

async function fetchProduct(productId) {
try {
const url = `https://dummyjson.com/products/${productId}`;
const response = await fetch(url);
const data = await response.json();
displaySingleProduct(data);
} catch (error) {
console.log(`Error fetching product data: ${error}`);
}
}

function displaySingleProduct(product) {
const containerLeft = document.createElement('div');
const containerRight = document.createElement('div');
const container = document.createElement('div');
const imageBox = document.createElement('div');
const imageContain = document.createElement('div');
const details = document.createElement('div');

container.classList.add('product-details');
containerLeft.classList.add('product-left');
containerRight.classList.add('product-right');
imageBox.classList.add('img-container');
imageContain.classList.add('big-img');

const buttonContainer = document.createElement('div');
buttonContainer.classList.add("btn-wrap");
const addToCartButton = document.createElement('button');
addToCartButton.textContent = "Add to Cart";
const goToCartButton = document.createElement('button');
goToCartButton.classList.add('.go-to-cart-button')
goToCartButton.textContent = "Go to Cart";
const countBadge = document.createElement('span');
const decrementButton = document.createElement('button');
const incrementButton = document.createElement('button');
decrementButton.classList.add('plusminus');
incrementButton.classList.add('plusminus');

addToCartButton.classList.add("button");
goToCartButton.classList.add("button");
decrementButton.textContent = '-';
incrementButton.textContent = '+';

const countBadge1 = document.querySelector(".badge");
countBadge1.textContent = cartValue;
// const addToCartButton = document.createElement('button');
addToCartButton.textContent = "Add to Cart";
addToCartButton.addEventListener('click', () => {
    addToCart(product);
});

// const goToCartButton = document.createElement('button');
goToCartButton.textContent = "Go to Cart";
goToCartButton.addEventListener('click', () => {
    // Open a new page to display the cart
    window.open('cart.html', '_blank');
});
decrementButton.addEventListener('click', () => {
    if (cartValue > 0) {
        cartValue--;
        countBadge.textContent = cartValue;
        countBadge1.textContent = cartValue;
        localStorage.setItem('cartValue', cartValue);
        updateButtonVisibility();
    }
});

incrementButton.addEventListener('click', () => {
    cartValue++;
    countBadge.textContent = cartValue;
    countBadge1.textContent = cartValue;
    localStorage.setItem('cartValue', cartValue);
    updateButtonVisibility();
});

function updateButtonVisibility() {
    addToCartButton.style.display = cartValue === 0 ? 'block' : 'none';
    decrementButton.style.display = cartValue === 0 ? 'none' : 'inline-block';
    incrementButton.style.display = cartValue === 0 ? 'none' : 'inline-block';
    countBadge.style.display = cartValue === 0 ? 'none' : 'inline-block';
    countBadge1.textContent = cartValue; // Update the badge count
}

updateButtonVisibility();

const title = document.createElement('h1');
title.textContent = product.title;

const price = document.createElement('h2');
price.innerHTML = `Price: <span>$${product.price}</span>`;

const description = document.createElement('p');
description.innerHTML = `<h5>Description : <span> ${product.description}</span> </h5>`;

const brand = document.createElement('h4');
brand.innerHTML = `Brand: <span>${product.brand}</span>`;

const rating = document.createElement('h4');
rating.innerHTML = `Rating: <span>${product.rating}</span>`;

const category = document.createElement('h4');
category.innerHTML = `Category: <span>${product.category}</span>`;

const discount = document.createElement('h4');
discount.innerHTML = `Discount : <span>${product.discountPercentage}</span>`;

const stock = document.createElement('h4');
stock.innerHTML = `Stock : <span>${product.stock}</span>`;

const image = document.createElement('img');
image.src = product.thumbnail;
image.alt = product.title;

const imgArray = product.images;
imgArray.forEach(imgSrc => {
const imgElement = document.createElement('img');
imgElement.src = imgSrc;
imgElement.alt = product.title;
imageBox.appendChild(imgElement);
});

imageBox.addEventListener('click', showImage);

function showImage(e) {
const clickedImgSrc = e.target.src;
const imgElement = document.createElement('img');
imgElement.src = clickedImgSrc;
imageContain.innerHTML = "";
imageContain.appendChild(imgElement);
}

buttonContainer.appendChild(decrementButton);
buttonContainer.appendChild(addToCartButton);
buttonContainer.appendChild(countBadge);
buttonContainer.appendChild(incrementButton);
buttonContainer.appendChild(goToCartButton);

details.append(title, price, description, rating, category, brand, discount, stock);

imageContain.appendChild(image);
containerLeft.append(imageContain, imageBox);
containerRight.append(details, buttonContainer);
container.append(containerLeft, containerRight);

productDiv.appendChild(container);
}
function goBack() {
    window.history.back(); // Use the browser's history to go back
}

const cartContainer = document.getElementById("cart-container");
const goToCartButton = document.querySelector(".go-to-cart-button");

goToCartButton.addEventListener("click", () => {
    cartContainer.style.right = "0"; // Slide in the cart from the right
});

// Add functionality to close the cart when clicking outside of it
window.addEventListener("click", (e) => {
    if (e.target === cartContainer) {
        cartContainer.style.right = "-30%"; // Slide out the cart to the right
    }
});