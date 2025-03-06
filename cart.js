document.addEventListener("DOMContentLoaded", function() {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartTableBody = document.getElementById("cart-table-body");
    const totalPriceEl = document.getElementById("total-price");
    const clearCartBtn = document.getElementById("clear-cart");
    const emptyCartBanner = document.getElementById("empty-cart-banner");
    const cartContainer = document.getElementById("cart-items");

    function updateCartDisplay() {
        cartTableBody.innerHTML = "";
        let totalPrice = 0;

        if (cartItems.length === 0) {
            emptyCartBanner.style.display = "block";  // Show empty cart banner
            cartContainer.style.display = "none";     // Hide cart items section
        } else {
            emptyCartBanner.style.display = "none";   // Hide empty cart banner
            cartContainer.style.display = "block";    // Show cart items section

            cartItems.forEach((item, index) => {
                let row = document.createElement("tr");
                row.innerHTML = `
                    <td>${item.item}</td>   <!-- Fix: Changed from item.name to item.item -->
                    <td>Rs. ${item.price}</td>
                    <td><button class="remove-item" data-index="${index}">❌ Remove</button></td>
                `;
                cartTableBody.appendChild(row);
                totalPrice += parseFloat(item.price);
            });

            totalPriceEl.textContent = `Total: Rs. ${totalPrice}`;
        }
    }

    // Remove item from cart
    cartTableBody.addEventListener("click", function(event) {
        if (event.target.classList.contains("remove-item")) {
            const index = event.target.getAttribute("data-index");
            cartItems.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cartItems));
            updateCartDisplay();
        }
    });

    // Clear cart
    clearCartBtn.addEventListener("click", function() {
        localStorage.removeItem("cart");
        cartItems = [];
        updateCartDisplay();
    });

    updateCartDisplay(); // Load cart data on page load
});
