let cart = [];

// Toggle sidebar
document.getElementById("menu-btn").onclick = () => {
    let sidebar = document.getElementById("sidebar");
    sidebar.style.left = sidebar.style.left === "0px" ? "-180px" : "0px";
};

// Toggle cart panel
document.getElementById("cart-btn").onclick = () => {
    let cartPanel = document.getElementById("cart-panel");
    cartPanel.style.right = cartPanel.style.right === "0px" ? "-350px" : "0px";
};

function addToCart(name, price) {
    let item = cart.find(i => i.name === name);
    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
        showQuantityControls(name);
    }
    renderCart();
}

function removeFromDish(name) {
    cart = cart.filter(item => item.name !== name);
    hideQuantityControls(name);
    renderCart();
}

function showQuantityControls(name) {
    let dish = document.querySelector(`#dish-${name}`);
    if (dish) {
        dish.querySelector(".add").style.display = "none";
        dish.querySelector(".cancel-item").style.display = "block";
        if (!dish.querySelector(".quantity-controls")) {
            let controls = document.createElement("div");
            controls.className = "quantity-controls";
            controls.innerHTML = `
                <button onclick="decreaseQty('${name}')">-</button>
                <span id="qty-${name}">1</span>
                <button onclick="increaseQty('${name}')">+</button>
            `;
            dish.appendChild(controls);
        }
    }
}

function hideQuantityControls(name) {
    let dish = document.querySelector(`#dish-${name}`);
    if (dish) {
        dish.querySelector(".add").style.display = "block";
        dish.querySelector(".cancel-item").style.display = "none";
        let controls = dish.querySelector(".quantity-controls");
        if (controls) controls.remove();
    }
}

function increaseQty(name) {
    let item = cart.find(i => i.name === name);
    if (item) {
        item.quantity += 1;
        document.getElementById(`qty-${name}`).innerText = item.quantity;
        renderCart();
    }
}

function decreaseQty(name) {
    let item = cart.find(i => i.name === name);
    if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
            removeFromDish(name);
        } else {
            document.getElementById(`qty-${name}`).innerText = item.quantity;
        }
        renderCart();
    }
}

function renderCart() {
    let container = document.getElementById("cart-items");
    container.innerHTML = "";
    let subtotal = 0;

    cart.forEach(item => {
        let itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        container.innerHTML += `
            <div class="cart-item">
                <p>${item.name} (x${item.quantity}) - ₹${itemTotal}</p>
                <button class="cancel-btn" onclick="removeFromDish('${item.name}')">✖</button>
            </div>
        `;
    });

    let gst = subtotal * 0.18;
    let discount = subtotal * 0.10;
    let total = subtotal + gst - discount;

    document.getElementById("subtotal").innerText = subtotal;
    document.getElementById("gst").innerText = gst.toFixed(2);
    document.getElementById("discount").innerText = discount.toFixed(2);
    document.getElementById("grandtotal").innerText = total.toFixed(2);
    document.getElementById("nav-total").innerText = total.toFixed(2);
}

// Clear entire cart
document.getElementById("clear-cart").onclick = () => {
    cart = [];
    document.querySelectorAll(".quantity-controls").forEach(ctrl => ctrl.remove());
    document.querySelectorAll(".cancel-item").forEach(btn => btn.style.display = "none");
    document.querySelectorAll(".add").forEach(btn => btn.style.display = "block");
    renderCart();
};
