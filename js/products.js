const productsGrid = document.getElementById("productsGrid");
const productsSection = document.getElementById("productsSection");
const productsTitle = document.getElementById("productsTitle");
const productsDescription = document.getElementById("productsDescription");
const brandFilter = document.getElementById("brandFilter");
const sortProducts = document.getElementById("sortProducts");
const noProducts = document.getElementById("noProducts");

let selectedProducts = [...beautyProducts];
let selectedBrand = "All";

function formatPrice(price) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(price);
}

function calculateDiscount(price, oldPrice) {
    return Math.round(((oldPrice - price) / oldPrice) * 100);
}

function getStars(rating) {
    return "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
}

function renderBrandFilters(products) {
    const brands = [...new Set(products.map(product => product.brand))];

    brandFilter.innerHTML = "";

    const allButton = document.createElement("button");
    allButton.textContent = "All Brands";
    allButton.className = selectedBrand === "All" ? "active" : "";

    allButton.addEventListener("click", () => {
        selectedBrand = "All";
        renderBrandFilters(selectedProducts);
        renderProducts();
    });

    brandFilter.appendChild(allButton);

    brands.forEach(brand => {
        const button = document.createElement("button");

        button.textContent = brand;
        button.className = selectedBrand === brand ? "active" : "";

        button.addEventListener("click", () => {
            selectedBrand = brand;
            renderBrandFilters(selectedProducts);
            renderProducts();
        });

        brandFilter.appendChild(button);
    });
}

function renderProducts() {
    let productsToShow = [...selectedProducts];

    if (selectedBrand !== "All") {
        productsToShow = productsToShow.filter(
            product => product.brand === selectedBrand
        );
    }

    const sortValue = sortProducts.value;

    if (sortValue === "low") {
        productsToShow.sort((a, b) => a.price - b.price);
    }

    if (sortValue === "high") {
        productsToShow.sort((a, b) => b.price - a.price);
    }

    if (sortValue === "rating") {
        productsToShow.sort((a, b) => b.rating - a.rating);
    }

    productsGrid.innerHTML = "";

    if (productsToShow.length === 0) {
        noProducts.style.display = "block";
        return;
    }

    noProducts.style.display = "none";

    productsToShow.forEach(product => {
        const card = document.createElement("article");

        card.className = "product-card";

        card.innerHTML = `
            <div class="product-image">
                ${product.image}
            </div>

            <div class="product-info">

                <div class="product-brand">
                    ${product.brand}
                </div>

                <h3 class="product-name">
                    ${product.name}
                </h3>

                <div class="product-type">
                    ${product.type}
                </div>

                <div class="product-rating">
                    ${getStars(product.rating)} ${product.rating}
                </div>

                <div class="product-price">
                    ${formatPrice(product.price)}
                    <span class="old-price">
                        ${formatPrice(product.oldPrice)}
                    </span>
                    <span class="discount">
                        ${calculateDiscount(product.price, product.oldPrice)}% OFF
                    </span>
                </div>

                <div class="product-actions">

                    <button class="add-cart" data-id="${product.id}">
                        Add to Cart
                    </button>

                    <button
                        class="add-wishlist"
                        data-id="${product.id}"
                        aria-label="Add to wishlist">
                        ♡
                    </button>

                </div>

            </div>
        `;

        productsGrid.appendChild(card);
    });
}

function showProducts(category, subcategory = null, type = null) {

    selectedBrand = "All";

    selectedProducts = beautyProducts.filter(product => {

        if (category && product.category !== category) {
            return false;
        }

        if (subcategory && product.subcategory !== subcategory) {
            return false;
        }

        if (type && product.type !== type) {
            return false;
        }

        return true;
    });

    let title = category || "Beauty Products";

    if (subcategory) {
        title += ` → ${subcategory}`;
    }

    if (type) {
        title += ` → ${type}`;
    }

    productsTitle.textContent = title;

    productsDescription.textContent =
        `${selectedProducts.length} products available`;

    renderBrandFilters(selectedProducts);
    renderProducts();

    productsSection.scrollIntoView({
        behavior: "smooth"
    });
}
sortProducts.addEventListener("change", renderProducts);

window.showProducts = showProducts;
document.addEventListener("click", function (event) {

    const cartButton = event.target.closest(".add-cart");

    if (cartButton) {
        const productId = Number(cartButton.dataset.id);
        addToCart(productId);
        return;
    }

    const wishlistButton = event.target.closest(".add-wishlist");

    if (wishlistButton) {
        const productId = Number(wishlistButton.dataset.id);

        if (isInWishlist(productId)) {
            removeFromWishlist(productId);
            wishlistButton.classList.remove("active");
            wishlistButton.textContent = "♡";
            showToast("Removed from wishlist");
        } else {
            addToWishlist(productId);
            wishlistButton.classList.add("active");
            wishlistButton.textContent = "♥";
        }

        updateWishlistCount();
        return;
    }
});