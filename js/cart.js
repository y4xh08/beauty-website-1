const CART_KEY = "yashMartCart";
const WISHLIST_KEY = "yashMartWishlist";

function getCart() {
    try {
        return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function getWishlist() {
    try {
        return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
    } catch {
        return [];
    }
}

function saveWishlist(wishlist) {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
}

function showToast(message) {
    const toast = document.getElementById("toast");

    if (!toast) {
        return;
    }

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}

function addToCart(productId) {
    const product = beautyProducts.find(
        item => Number(item.id) === Number(productId)
    );

    if (!product) {
        showToast("Product not found");
        return;
    }

    const cart = getCart();

    const existingProduct = cart.find(
        item => Number(item.id) === Number(productId)
    );

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart(cart);
    updateCartCount();

    showToast(`${product.name} added to cart`);
}

function removeFromCart(productId) {
    const cart = getCart().filter(
        item => Number(item.id) !== Number(productId)
    );

    saveCart(cart);
    updateCartCount();

    if (typeof renderCart === "function") {
        renderCart();
    }

    showToast("Product removed from cart");
}

function updateQuantity(productId, change) {
    const cart = getCart();

    const product = cart.find(
        item => Number(item.id) === Number(productId)
    );

    if (!product) {
        return;
    }

    product.quantity += change;

    if (product.quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    saveCart(cart);
    updateCartCount();

    if (typeof renderCart === "function") {
        renderCart();
    }
}

function getCartTotal() {
    return getCart().reduce(
        (total, item) =>
            total + Number(item.price) * Number(item.quantity),
        0
    );
}

function getCartItemsCount() {
    return getCart().reduce(
        (total, item) =>
            total + Number(item.quantity),
        0
    );
}

function addToWishlist(productId) {
    const product = beautyProducts.find(
        item => Number(item.id) === Number(productId)
    );

    if (!product) {
        showToast("Product not found");
        return;
    }

    const wishlist = getWishlist();

    const exists = wishlist.some(
        item => Number(item.id) === Number(productId)
    );

    if (exists) {
        showToast("Already in wishlist");
        return;
    }

    wishlist.push(product);

    saveWishlist(wishlist);
    updateWishlistCount();
    updateWishlistButtons();

    showToast(`${product.name} added to wishlist`);
}

function removeFromWishlist(productId) {
    const wishlist = getWishlist().filter(
        item => Number(item.id) !== Number(productId)
    );

    saveWishlist(wishlist);

    updateWishlistCount();
    updateWishlistButtons();

    if (typeof renderWishlist === "function") {
        renderWishlist();
    }
}

function isInWishlist(productId) {
    return getWishlist().some(
        item => Number(item.id) === Number(productId)
    );
}

function updateCartCount() {
    const cartCount =
        document.getElementById("cartCount");

    if (cartCount) {
        cartCount.textContent =
            getCartItemsCount();
    }
}

function updateWishlistCount() {
    const wishlistCount =
        document.getElementById("wishlistCount");

    if (wishlistCount) {
        wishlistCount.textContent =
            getWishlist().length;
    }
}

function updateWishlistButtons() {
    document
        .querySelectorAll(".add-wishlist")
        .forEach(button => {

            const productId =
                Number(button.dataset.id);

            if (isInWishlist(productId)) {
                button.classList.add("active");
                button.textContent = "♥";
            } else {
                button.classList.remove("active");
                button.textContent = "♡";
            }
        });
}

function formatCartPrice(price) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(price);
}

document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    updateWishlistCount();
    updateWishlistButtons();
});