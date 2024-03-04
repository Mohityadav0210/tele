document.addEventListener('DOMContentLoaded', function () {
    // Retrieve JSON data from local storage
    var storedData = localStorage.getItem('phoneData');
    
    // Check if data exists in local storage
    if (storedData) {
        // Parse the stringified JSON data into a JavaScript object
        var products = JSON.parse(storedData);
        
        // Reference the container where you want to display the products
        var productsContainer = document.querySelector('.products');

        // Check if products is an array
        if (Array.isArray(products)) {
            // Iterate over each product in the array
            products.forEach(function(product) {
                // Create a new div element for each product
                var productCard = document.createElement('div');
                productCard.classList.add('product-card');

                // Set the inner HTML of the product card
                productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>Model: ${product.model}</p>
                    <p>Specification: ${product.specification}</p>
                    <p>$${product.price}</p>
                    <button>Add to Cart</button>
                `;

                // Append the product card to the products container
                productsContainer.appendChild(productCard);
            });
        } else {
            // Create a single product card for the non-array data
            var productCard = document.createElement('div');
            productCard.classList.add('product-card');

            // Set the inner HTML of the product card
            productCard.innerHTML = `
            <img src="${products.image}" alt="${products.name}">
                <h3>${products.name}</h3>
                <p>Model: ${products.model}</p>
                <p>Specification: ${products.specification}</p>
                <p>$${products.price}</p>
                <button class="add-to-cart" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>            `;

            // Append the product card to the products container
            productsContainer.appendChild(productCard);
        }
    } else {
        console.error('No phone data found in local storage.');
    }
});

var addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        // Retrieve product details from the button's data attributes
        var productName = button.getAttribute('data-name');
        var productPrice = parseFloat(button.getAttribute('data-price'));

        // Create or retrieve the cart object from local storage
        var cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};

        // Check if the product is already in the cart
        if (cart[productName]) {
            cart[productName].quantity++;
        } else {
            cart[productName] = {
                price: productPrice,
                quantity: 1
            };
        }

        // Update the cart in local storage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Notify the user that the item has been added to the cart (you can replace this with your preferred method)
        alert('Added ' + productName + ' to cart.');

        // Optional: Redirect the user to the cart page or update the cart display
    });
});
