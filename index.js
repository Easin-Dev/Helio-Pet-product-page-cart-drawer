// Quantity and Price Handling
const countElement = document.getElementById("count");
const oldPriceElement = document.getElementById("old-price");
const newPriceElement = document.getElementById("new-price");

const decreaseButton = document.getElementById("decrease");
const increaseButton = document.getElementById("increase");

let count = 1;
const unitPrice = 249;
const oldPrice = 369;

function updatePrice() {
  countElement.textContent = count;
  newPriceElement.textContent = `$${(unitPrice * count).toFixed(2)}`;
  oldPriceElement.textContent = `$${(oldPrice * count).toFixed(2)}`;
}

increaseButton.addEventListener("click", () => {
  if (count < 10) {
    count++;
    updatePrice();
  }
});

decreaseButton.addEventListener("click", () => {
  if (count > 1) {
    count--;
    updatePrice();
  }
});

updatePrice();
// -------------------------------------------------------------------------------- end quantity and price handling ----------------------------------------------------
// Gallery Click Logic
const galleryImages = document.querySelectorAll(".gallery img");
const mainImage = document.querySelector(".main-image");

galleryImages.forEach((img) => {
  img.addEventListener("click", () => {
    mainImage.src = img.src;
  });
});

// Cart Drawer Animation
const cartButton = document.querySelector(".cart-button");
cartButton.addEventListener("click", () => {
  cartButton.classList.add("clicked");
  setTimeout(() => cartButton.classList.remove("clicked"), 300);
});
// ---------------------------------------------------------------------------------- end gallery click logic ----------------------------------------------------

// Cart Functionality
const cartButton2 = document.querySelector('.cart-button');
const closeDrawer = document.getElementById('closeDrawer');
const cartDrawer = document.getElementById('cartDrawer');
const cartItemsContainer = document.getElementById('cartItems');
const totalPriceElement = document.getElementById('totalPrice');
const cartOverlay = document.getElementById('cartOverlay'); // 

// Dummy Product
const product = {
  id: '1',
  name: 'Helio Pet Device',
  price: 249,
  image: 'https://www.rongbaz.com.au/cdn/shop/files/Pepsi_adult_black.webp?v=1743120507&width=1680'
};

let cart = JSON.parse(localStorage.getItem('cart')) || {};

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
  const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
  const cartCount = document.querySelector('.cart-count');
  
  cartCount.textContent = totalItems;
  
  cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
  
  localStorage.setItem('cart', JSON.stringify(cart));
}

function renderCart() {
  cartItemsContainer.innerHTML = '';

  const productKeys = Object.keys(cart);

  if (productKeys.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        <p>Your cart is empty</p>
      </div>
    `;
    totalPriceElement.textContent = "$0.00";
  } else {
    let total = 0;

   
  for (const id of productKeys) {
    const item = cart[id];
    total += item.price * item.quantity;

    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';

    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-image">
      <div>
        <p>${item.name}</p>
        <p>$${(item.price * item.quantity).toFixed(2)}</p>
        <div class="quantity-buttons">
          <button class="decrease" data-id="${item.id}" ${item.quantity === 1 ? 'disabled' : ''}>−</button>
          <span>${item.quantity}</span>
          <button class="increase" data-id="${item.id}">+</button>
          <button class="remove" data-id="${item.id}">✖️</button>
        </div>
      </div>
    `;

    cartItemsContainer.appendChild(itemDiv);
  }

    totalPriceElement.textContent = `$${total.toFixed(2)}`;

    // Increase Quantity
    document.querySelectorAll('.increase').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        if (cart[id].quantity < 10) {
          cart[id].quantity++;
          saveCart();
          renderCart();
        }
      });
    });
  
    // Decrease Quantity
    document.querySelectorAll('.decrease').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        if (cart[id].quantity > 1) {
          cart[id].quantity--;
          saveCart();
          renderCart();
        }
      });
    });
  
    // Remove Product
    document.querySelectorAll('.remove').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        delete cart[id];
        saveCart();
        renderCart(); 
      });
    });
  }

   updateCartCount();
}

// Add to Cart button
cartButton2.addEventListener('click', () => {
  if (cart[product.id]) {
    cart[product.id].quantity += count;
  } else {
    cart[product.id] = { ...product, quantity: count };
  }

  count = 1;
  updatePrice();

  saveCart();
  renderCart();

  // Drawer open and overlay visible
  cartDrawer.classList.add('open');
  cartOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
});

// Drawer close
closeDrawer.addEventListener('click', () => {
  cartDrawer.classList.remove('open');
  cartOverlay.classList.remove('open');
  document.body.style.overflow = '';
});

// Overlay click = close drawer
cartOverlay.addEventListener('click', () => {
  cartDrawer.classList.remove('open');
  cartOverlay.classList.remove('open');
  document.body.style.overflow = '';
});

window.addEventListener('DOMContentLoaded', renderCart);
// ------------------------------------------------------------------------- end cart functionality ----------------------------------------------------

// Cart icon in navbar
const navbarCartIcon = document.querySelector('.cart-icon');
navbarCartIcon.addEventListener('click', () => {
  renderCart();
  cartDrawer.classList.add('open');
  cartOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
});

// ----------------------------------------------------------------------------------- end cart icon in navbar ----------------------------------------------------