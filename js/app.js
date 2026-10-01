const categoryData = {
    "Makeup": [
        {
            name: "Face Makeup",
            description: "Foundation, concealer & compact",
            icon: "🧴"
        },
        {
            name: "Eye Makeup",
            description: "Mascara, eyeliner & eyeshadow",
            icon: "👁️"
        },
        {
            name: "Lip Products",
            description: "Lipstick, gloss & lip liner",
            icon: "💋"
        },
        {
            name: "Cheek Makeup",
            description: "Blush, bronzer & highlighter",
            icon: "🌸"
        },
        {
            name: "Makeup Tools",
            description: "Brushes, sponges & tools",
            icon: "🖌️"
        },
        {
            name: "Makeup Kits",
            description: "Complete makeup collections",
            icon: "🎁"
        }
    ],

    "Skincare": [
        {
            name: "Face Care",
            description: "Daily face care essentials",
            icon: "✨"
        },
        {
            name: "Cleansers",
            description: "Face wash & cleansing",
            icon: "🫧"
        },
        {
            name: "Moisturizers",
            description: "Hydration for your skin",
            icon: "🧴"
        },
        {
            name: "Serums",
            description: "Targeted skincare solutions",
            icon: "💧"
        },
        {
            name: "Sunscreen",
            description: "Sun protection products",
            icon: "☀️"
        },
        {
            name: "Face Masks",
            description: "Masks & skin treatments",
            icon: "🌿"
        }
    ],

    "Hair Care": [
        {
            name: "Shampoo",
            description: "Shampoos for every hair type",
            icon: "🧴"
        },
        {
            name: "Conditioner",
            description: "Smooth & nourish your hair",
            icon: "💧"
        },
        {
            name: "Hair Oil",
            description: "Hair oils & treatments",
            icon: "🌿"
        },
        {
            name: "Hair Serum",
            description: "Serums & styling care",
            icon: "✨"
        },
        {
            name: "Hair Masks",
            description: "Deep hair nourishment",
            icon: "🥑"
        },
        {
            name: "Hair Styling",
            description: "Styling & finishing products",
            icon: "💇"
        }
    ],

    "Body Care": [
        {
            name: "Body Wash",
            description: "Refreshing body cleansers",
            icon: "🫧"
        },
        {
            name: "Body Lotion",
            description: "Moisturizing body care",
            icon: "🧴"
        },
        {
            name: "Body Scrub",
            description: "Exfoliation & smooth skin",
            icon: "🌸"
        },
        {
            name: "Hand Care",
            description: "Hand creams & care",
            icon: "🤲"
        },
        {
            name: "Foot Care",
            description: "Daily foot care products",
            icon: "🦶"
        },
        {
            name: "Bath Essentials",
            description: "Bath & relaxation products",
            icon: "🛁"
        }
    ],

    "Fragrance": [
        {
            name: "Perfume",
            description: "Fragrances for every occasion",
            icon: "🌹"
        },
        {
            name: "Body Mist",
            description: "Light everyday fragrances",
            icon: "🌸"
        },
        {
            name: "Deodorant",
            description: "Freshness throughout the day",
            icon: "✨"
        },
        {
            name: "Gift Sets",
            description: "Fragrance gift collections",
            icon: "🎁"
        }
    ]
};

const subcategoryGrid = document.getElementById("subcategoryGrid");
const subcategoryTitle = document.querySelector(".subcategory-header h3");
const subcategoryLabel = document.querySelector(".subcategory-header .eyebrow");
const categoryButtons = document.querySelectorAll(".subcategory-item");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const toast = document.getElementById("toast");

function renderSubcategories(category) {
    const data = categoryData[category] || [];

    subcategoryGrid.innerHTML = "";

    subcategoryLabel.textContent = category.toUpperCase();
    subcategoryTitle.textContent = "Choose a subcategory";

    data.forEach(item => {
        const card = document.createElement("button");

        card.className = "subcategory-card";

        card.innerHTML = `
            <div class="sub-icon">${item.icon}</div>
            <h4>${item.name}</h4>
            <p>${item.description}</p>
        `;

       card.addEventListener("click", () => {
       showProducts(category, item.name);
     });

        subcategoryGrid.appendChild(card);
    });
}

categoryButtons.forEach(button => {
    button.addEventListener("click", () => {

        categoryButtons.forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        renderSubcategories(button.dataset.main);

        document.querySelector(".subcategory-section").scrollIntoView({
            behavior: "smooth"
        });
    });
});

document.querySelectorAll(".category-card").forEach(button => {
    button.addEventListener("click", () => {

        const category = button.dataset.category;

        const matchingButton = [...categoryButtons].find(
            item => item.dataset.main === category
        );

        if (matchingButton) {
            matchingButton.click();
        } else {
            showToast(`${category} category selected`);
        }
    });
});

function searchProducts() {
    const query = searchInput.value.trim();

    if (!query) {
        showToast("Please enter a product name");
        return;
    }

    showToast(`Searching for "${query}"`);
}

searchBtn.addEventListener("click", searchProducts);

searchInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        searchProducts();
    }
});

document.getElementById("wishlistBtn").addEventListener("click", () => {
    showToast("Wishlist will be connected in the next part");
});

document.getElementById("cartBtn").addEventListener("click", () => {
    showToast("Cart will be connected in the next part");
});

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}

renderSubcategories("Makeup");