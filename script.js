// ----------------------------
// MOBILE MENU TOGGLE
// ----------------------------

const toggler = document.getElementById("toggler");
const navbar = document.querySelector(".navbar");

if (toggler && navbar) {
  toggler.addEventListener("change", () => {
    navbar.classList.toggle("active", toggler.checked);
  });
}

// Close menu when a link is clicked
document.querySelectorAll("header .navbar a").forEach(link => {
  link.addEventListener("click", function() {
    if (toggler) toggler.checked = false;
    if (navbar) navbar.classList.remove("active");
  });
});


// ----------------------------
// SMOOTH SCROLL
// ----------------------------
document.querySelectorAll("header .navbar a").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({ top: target.offsetTop - 80, behavior: "smooth" });
    }
    if (toggler) toggler.checked = false;
    if (navbar) navbar.classList.remove("active");
  });
});

// ----------------------------
// WISHLIST HEART
// ----------------------------
document.querySelectorAll(".fa-heart").forEach(heart => {
  heart.addEventListener("click", (e) => {
    e.preventDefault();
    heart.classList.toggle("active-heart");
    heart.style.color = heart.classList.contains("active-heart")
      ? "#e84393"
      : "#333";
  });
});

// ----------------------------
// CART SYSTEM
// ----------------------------
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ADD TO CART (Correct for your HTML)
document.querySelectorAll(".box").forEach((productBox, idx) => {

  const btn = productBox.querySelector(".cart-btn");
  if (!btn) return;

  const name = productBox.querySelector(".content h3").innerText.trim();

  const priceText = productBox.querySelector(".price").innerText;
  const price = parseInt(priceText.match(/\d+/)[0]);

  const imgSrc = productBox.querySelector(".image img").getAttribute("src");

  btn.addEventListener("click", (e) => {
    e.preventDefault();

    let existing = cart.find(item => item.name === name);

    if (existing) {
      existing.qty++;
    } else {
      cart.push({ name, price, img: imgSrc, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item added to cart!");
  });
});

// ----------------------------
// LOAD CART POPUP
// ----------------------------
function loadCart() {
  const box = document.getElementById("cartItems");
  box.innerHTML = "";

  let total = 0;

  if (cart.length === 0) {
    box.innerHTML = "<p>Your cart is empty.</p>";
    document.getElementById("cartTotal").innerText = 0;
    return;
  }

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    box.innerHTML += `
      <div class="cart-item">
        <img src="${item.img}" style="width:60px;height:60px;border-radius:5px;margin-right:10px;">
        <span>${item.name} (Rs.${item.price})</span>
        <div>
          <button onclick="updateQty(${index}, -1)">-</button>
          ${item.qty}
          <button onclick="updateQty(${index}, 1)">+</button>
          <button onclick="removeItem(${index})">x</button>
        </div>
      </div>
    `;
  });

  document.getElementById("cartTotal").innerText = total;
}

// ----------------------------
// UPDATE QTY
// ----------------------------
function updateQty(index, change) {
  cart[index].qty += change;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// ----------------------------
// REMOVE ITEM
// ----------------------------
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// ----------------------------
// POPUP OPEN / CLOSE
// ----------------------------
document.addEventListener("DOMContentLoaded", () => {
  const cartPopup = document.getElementById("cartPopup");
  const openCart = document.getElementById("openCart");
  const closeCart = document.getElementById("closeCart");

  openCart.addEventListener("click", (e) => {
    e.preventDefault();
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartPopup.style.display = "flex";
    loadCart();
  });

  closeCart.addEventListener("click", () => {
    cartPopup.style.display = "none";
  });
});

// ----------------------------
// FORM SUBMISSION (AJAX)
// ----------------------------
const contactForm = document.querySelector(".contact .form");

if(contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" }
      });

      if(response.ok) {
        alert("Message sent successfully!");
        contactForm.reset();
      } else {
        alert("Error sending message. Try again later.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Check your connection.");
    }
  });
}
