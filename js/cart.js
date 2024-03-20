// Function to get cart data from localStorage
function getCart() {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
}

// Function to remove item from cart
function removeItem(productId) {
    let cart = getCart();
    const index = cart.findIndex(item => item.product.id === productId);
    if (index !== -1) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartBadge();
        const cartBody = document.getElementById('cart-body');
        displayCartItems(cartBody);
    }
}


// Function to display cart items
// function displayCartItems(cartBody) {
//     let cart = [];
//     const savedCart = localStorage.getItem('cart');
//     if (savedCart) {
//         cart = JSON.parse(savedCart);
//     }

//     cartBody.innerHTML = ''; // Clear existing rows

//     if (cart.length === 0) {
//         const cartEmpty = document.querySelector(".empty-cart");
//         cartEmpty.style.display = "block";
//         // const emptyCartRow = document.createElement('tr');
//         // emptyCartRow.innerHTML = `
//         //     <td colspan="5">Cart is empty. <a href="product.html">Shop Now</a></td>
//         // `;
//         cartBody.appendChild(cartEmpty);
//     } else {
//         cart.forEach(item => {
//             const row = document.createElement('tr');
//             const productName = item.product.title;
//             const productQuantity = item.quantity;
//             const productPrice = item.product.price;
//             const totalPrice = productQuantity * productPrice;

//             row.innerHTML = `
//                 <td>${productName}</td>
//                 <td>
//                     <button onclick="decrementQuantity(${item.product.id})">-</button>
//                     <span>${productQuantity}</span>
//                     <button onclick="incrementQuantity(${item.product.id})">+</button>
//                 </td>
//                 <td>${productPrice}</td>
//                 <td>${totalPrice}</td>
//                 <td><button onclick="removeItem(${item.product.id})">Remove</button></td>
//             `;
//             cartBody.appendChild(row);
//         });

//         // Display total price
//         const total = cart.reduce((sum, item) => sum + (item.quantity * item.product.price), 0);
//         const totalRow = document.createElement('tr');
//         totalRow.innerHTML = `
//             <td colspan="3"><strong>Total</strong></td>
//             <td>${total}</td>
//             <td></td>
//         `;
//         cartBody.appendChild(totalRow);

//         // Add Proceed to Pay button
//         const payButtonRow = document.createElement('tr');
//         const payButtonCell = document.createElement('td');
//         payButtonCell.setAttribute('colspan', '5');
//         const payButton = document.createElement('button');
//         payButton.textContent = 'Proceed to Pay';
//         payButton.onclick = () => {
//             // Implement your payment logic here
//             alert('Redirecting to payment page...');
//         };
//         payButtonCell.appendChild(payButton);
//         payButtonRow.appendChild(payButtonCell);
//         cartBody.appendChild(payButtonRow);
//     }
// }
// function displayCartItems(cartBody) {
    
//     let cart = getCart();
//     cartBody.innerHTML = ''; // Clear existing rows

//     if (cart.length === 0) {
//         const cartEmpty = document.querySelector(".empty-cart");
//         cartEmpty.style.display = "block";
//         return; // Exit the function if cart is empty
//     }

//     cart.forEach(item => {
//         const row = document.createElement('tr');
//         const productName = item.product.title;
//         const productQuantity = item.quantity;
//         const productPrice = item.product.price;
//         const totalPrice = productQuantity * productPrice;

//         row.innerHTML = `
//             <td>${productName}</td>
//             <td>
//                 <button onclick="decrementQuantity(${item.product.id})">-</button>
//                 <span>${productQuantity}</span>
//                 <button onclick="incrementQuantity(${item.product.id})">+</button>
//             </td>
//             <td>${productPrice}</td>
//             <td>${totalPrice}</td>
//             <td><button onclick="removeItem(${item.product.id})">Remove</button></td>
//         `;
//         cartBody.appendChild(row);
//     });

//     // Display total price
//     const total = cart.reduce((sum, item) => sum + (item.quantity * item.product.price), 0);
//     const totalRow = document.createElement('tr');
//     totalRow.innerHTML = `
//         <td colspan="3"><strong>Total</strong></td>
//         <td>${total}</td>
//         <td></td>
//     `;
//     cartBody.appendChild(totalRow);

//     // Add Proceed to Pay button
//     const payButtonRow = document.createElement('tr');
//     const payButtonCell = document.createElement('td');
//     payButtonCell.setAttribute('colspan', '5');
//     const payButton = document.createElement('button');
//     payButton.textContent = 'Proceed to Pay';
//     payButton.onclick = () => {
//         // Implement your payment logic here
//         alert('Redirecting to payment page...');
//     };
//     payButtonCell.appendChild(payButton);
//     payButtonRow.appendChild(payButtonCell);
//     cartBody.appendChild(payButtonRow);
// }
function displayCartItems(cartBody) {
    let cart = getCart();
    cartBody.innerHTML = ''; // Clear existing rows

    const cartEmpty = document.querySelector(".empty-cart");
    cartEmpty.style.display = "none"; // Hide the empty cart message initially

    if (cart.length === 0) {
        cartEmpty.style.display = "block";
        return; // Exit the function if cart is empty
    }

    cart.forEach(item => {
        const row = document.createElement('tr');
        const productName = item.product.title;
        const productQuantity = item.quantity;
        const productPrice = item.product.price;
        const totalPrice = productQuantity * productPrice;

        row.innerHTML = `
            <td>${productName}</td>
            <td>
                <button onclick="decrementQuantity(${item.product.id})">-</button>
                <span>${productQuantity}</span>
                <button onclick="incrementQuantity(${item.product.id})">+</button>
            </td>
            <td>${productPrice}</td>
            <td>${totalPrice}</td>
            <td><button onclick="removeItem(${item.product.id})">Remove</button></td>
        `;
        cartBody.appendChild(row);
    });

    // Display total price
    const total = cart.reduce((sum, item) => sum + (item.quantity * item.product.price), 0);
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
        <td colspan="3"><strong>Total</strong></td>
        <td>${total}</td>
        <td></td>
    `;
    cartBody.appendChild(totalRow);

    // Add Proceed to Pay button
    const payButtonRow = document.createElement('tr');
    const payButtonCell = document.createElement('td');
    payButtonCell.setAttribute('colspan', '5');
    const payButton = document.createElement('button');
    payButton.textContent = 'Proceed to Pay';
    payButton.onclick = () => {
        // Implement your payment logic here
        alert('Redirecting to payment page...');
    };
    payButtonCell.appendChild(payButton);
    payButtonRow.appendChild(payButtonCell);
    cartBody.appendChild(payButtonRow);
}



// Display cart items on page load
document.addEventListener('DOMContentLoaded', () => {
    const cartBody = document.getElementById('cart-body');
    displayCartItems(cartBody);
});

// Function to update cart badge
function updateCartBadge() {
    let cart = getCart();
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    const cartBadge = document.querySelector('.cart-icon .badge');
    cartBadge.textContent = totalQuantity;
}
// Function to increment quantity
function incrementQuantity(productId) {
    let cart = getCart();
    const index = cart.findIndex(item => item.product.id === productId);
    if (index !== -1) {
        cart[index].quantity++;
        cart[index].totalPrice += cart[index].product.price; // Increment total price
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartBadge();
        displayCartItems(document.getElementById('cart-body'));
    }
}
// Function to decrement quantity
function decrementQuantity(productId) {
    let cart = getCart();
    const index = cart.findIndex(item => item.product.id === productId);
    if (index !== -1 && cart[index].quantity > 1) {
        cart[index].quantity--;
        cart[index].totalPrice -= cart[index].product.price; // Decrement total price
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartBadge();
        displayCartItems(document.getElementById('cart-body'));
    }
}
