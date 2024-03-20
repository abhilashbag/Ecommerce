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

        const discountPriceDiv = document.createElement('span');
        discountPriceDiv.textContent = 'Discount Price: $' + product.discountPrice;

        div.addEventListener('click', () => {
            const productId = product.id;
            const url = `../Pages/single-product.html?id=${productId}`;
            window.open(url, '_blank');
        });

        div.append(thumbnailImg, titleDiv, priceDiv, discountPriceDiv);
        productContainer.appendChild(div);
    });
}
