document.addEventListener("DOMContentLoaded", function() {
    var addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var item = button.getAttribute('data-item');
            var price = button.getAttribute('data-price');
            addToCart(item, price);
        });
    });

    function addToCart(item, price) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push({ item, price });
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(item + " added to cart!");
    }
});
