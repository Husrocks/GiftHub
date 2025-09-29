// Product data
const products = [
  {
    id: 1,
    name: "Luxury Gift Box Set with Ribbon",
    price: 34.99,
    image: "./pictures/luxury gift.png",
  },
  {
    id: 2,
    name: "Premium Red Rose Bouquet",
    price: 59.99,
    image: "./pictures/red rose.png",
  },
  {
    id: 3,
    name: "Elegant Pearl Necklace Set",
    price: 129.99,
    image: "./pictures/neklace-set.png",
  },
  {
    id: 4,
    name: "Classic Leather Watch",
    price: 199.99,
    image: "./pictures/watch.png",
  },
  {
    id: 5,
    name: "Aromatic Candle Gift Set",
    price: 44.99,
    image: "./pictures/candel.jpg",
  },
  {
    id: 6,
    name: "Giant Teddy Bear Plush",
    price: 79.99,
    image: "./pictures/bear.png",
  },
  {
    id: 7,
    name: "Luxury Perfume Collection",
    price: 84.99,
    image: "./pictures/perfume.jpg",
  },
  {
    id: 8,
    name: "Belgian Chocolate Gift Box",
    price: 39.99,
    image: "./pictures/choco.png",
  },
  {
    id: 9,
    name: "Premium Wine Gift Set",
    price: 149.99,
    image: "./pictures/wine.png",
  },
  {
    id: 10,
    name: "Personalized Photo Frame Set",
    price: 29.99,
    image: "./pictures/photo.jpg",
  },
  {
    id: 11,
    name: "Luxury Spa & Bath Gift Set",
    price: 64.99,
    image: "./pictures/spa-set.jpg",
  },
  {
    id: 12,
    name: "Indoor Plant Collection",
    price: 54.99,
    image: "./pictures/indoor-plants.png",
  },
];

let cart = [];
let currentProduct = null;

// Price range slider
const priceRange = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");

priceRange.addEventListener("input", function () {
  priceValue.textContent = this.value;
});

// Quick View Modal
function quickView(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
    currentProduct = product;
    document.getElementById("modalImage").src = product.image;
    document.getElementById("modalTitle").textContent = product.name;
    document.getElementById("modalPrice").textContent = `$${product.price}`;
    document.getElementById("quickViewModal").style.display = "block";
  }
}

function closeModal() {
  document.getElementById("quickViewModal").style.display = "none";
}

// Quantity selector
function increaseQuantity() {
  const input = document.getElementById("quantityInput");
  input.value = parseInt(input.value) + 1;
}

function decreaseQuantity() {
  const input = document.getElementById("quantityInput");
  if (parseInt(input.value) > 1) {
    input.value = parseInt(input.value) - 1;
  }
}

// Cart functions
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
    const existingItem = cart.find((item) => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    updateCart();
    showNotification("Product added to cart!");
    createConfetti();
  }
}

function addToCartFromModal() {
  if (currentProduct) {
    const quantity = parseInt(document.getElementById("quantityInput").value);
    const existingItem = cart.find((item) => item.id === currentProduct.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...currentProduct, quantity: quantity });
    }
    updateCart();
    closeModal();
    showNotification("Product added to cart!");
    createConfetti();
  }
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCart();
}

function updateCart() {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById("cartCount").textContent = cartCount;

  const cartItemsContainer = document.getElementById("cartItems");
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      '<p style="text-align: center; color: #999;">Your cart is empty</p>';
  } else {
    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
                        <img src="${item.image}" alt="${item.name}">
                        <div class="cart-item-info">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">$${item.price} x ${item.quantity}</div>
                        </div>
                        <i class="fas fa-trash cart-item-remove" onclick="removeFromCart(${item.id})"></i>
                    `;
      cartItemsContainer.appendChild(cartItem);
    });
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById("cartTotal").textContent = `$${total.toFixed(2)}`;
}

function toggleCart() {
  const cartSidebar = document.getElementById("cartSidebar");
  cartSidebar.classList.toggle("active");
}

// Wishlist
function addToWishlist(productId) {
  showNotification("Added to wishlist!");
}

// Notification
function showNotification(message) {
  const notification = document.createElement("div");
  notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 15px 25px;
                border-radius: 10px;
                box-shadow: 0 5px 20px rgba(0,0,0,0.2);
                z-index: 10000;
                animation: slideInRight 0.5s ease, slideOutRight 0.5s ease 2s forwards;
            `;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 2500);
}

// Confetti effect
function createConfetti() {
  const colors = ["#ff6b6b", "#4ecdc4", "#667eea", "#764ba2", "#ffd700"];

  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement("div");
    confetti.style.cssText = `
                    position: fixed;
                    width: 10px;
                    height: 10px;
                    background: ${
                      colors[Math.floor(Math.random() * colors.length)]
                    };
                    left: ${Math.random() * 100}%;
                    top: -10px;
                    pointer-events: none;
                    z-index: 10000;
                    transform: rotate(${Math.random() * 360}deg);
                    animation: confettiFall ${
                      Math.random() * 2 + 1
                    }s ease-out forwards;
                `;
    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 3000);
  }
}

// Add confetti animation
const style = document.createElement("style");
style.textContent = `
            @keyframes confettiFall {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) rotate(${
                      Math.random() * 720
                    }deg);
                    opacity: 0;
                }
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(style);

// Close modal when clicking outside
window.onclick = function (event) {
  const modal = document.getElementById("quickViewModal");
  if (event.target == modal) {
    closeModal();
  }
};

// Initialize cart
updateCart();
