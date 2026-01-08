// ==========================================
// 1. PRODUCT DATABASE (The Missing Piece!)
// ==========================================
const products = [
    {
        id: 1,
        name: "Brass Puja Thali Set",
        price: 450,
        // Make sure this filename matches exactly what is in your images folder!
        image: "images/Brass Puja Thali.webp", 
        desc: "This handcrafted brass thali includes a diya, incense holder, bell, and kumkum katori. Perfect for daily puja and festivals.",
        details: ["Material: Pure Brass", "Diameter: 12 Inches", "Easy to clean"]
    },
    {
        id: 2,
        name: "Sandalwood Incense",
        price: 50,
        image: "images/Sandalwood Incense.webp",
        desc: "Premium sandalwood sticks with long-lasting fragrance for meditation.",
        details: ["Fragrance: Sandalwood", "Pack: 20 Sticks", "Burn Time: 45 mins"]
    },
    {
        id: 3,
        name: "Pure Ghee Diya",
        price: 200,
        image: "images/pure ghee diya.webp",
        desc: "Ready-to-light ghee diyas made from pure cow ghee.",
        details: ["Pack: 50 Pieces", "Wax-free", "Smokeless"]
    },
    {
        id: 4,
        name: "Eco Ganesh Idol",
        price: 300,
        image: "images/ganesh_idol.webp",
        desc: "Eco-friendly clay idol that dissolves in water.",
        details: ["Material: Clay", "Size: 6 Inches", "100% Eco-friendly"]
    }
];

// ==========================================
// 2. SHOPPING CART LOGIC
// ==========================================

// Initialize Cart from LocalStorage
let cart = JSON.parse(localStorage.getItem('pujaCart')) || [];

// Function to Add Item
function addToCart(id, name, price, image) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, image, quantity: 1 });
    }
    localStorage.setItem('pujaCart', JSON.stringify(cart));
    updateCartCount();
    alert(name + " added to cart!");
}

// Update Cart Count in Navbar
function updateCartCount() {
    const count = cart.reduce((acc, item) => acc + item.quantity, 0);
    const badge = document.getElementById('cart-count');
    if(badge) badge.innerText = count;
}

// Render Cart Items (For Cart Page)
function renderCart() {
    const cartTable = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    if (!cartTable) return;

    cartTable.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        cartTable.innerHTML += `
            <tr>
                <td><img src="${item.image}" width="50"> ${item.name}</td>
                <td>₹${item.price}</td>
                <td>
                    <button class="btn btn-sm btn-light" onclick="changeQty(${index}, -1)">-</button>
                    ${item.quantity}
                    <button class="btn btn-sm btn-light" onclick="changeQty(${index}, 1)">+</button>
                </td>
                <td>₹${itemTotal}</td>
                <td><button class="btn btn-sm btn-danger" onclick="removeItem(${index})"><i class="fas fa-trash"></i></button></td>
            </tr>
        `;
    });
    
    if(totalEl) totalEl.innerText = total;
}

// Change Quantity (+ or -)
function changeQty(index, change) {
    if (cart[index].quantity + change > 0) {
        cart[index].quantity += change;
    } else {
        // If quantity goes to 0, ask to remove
        if(confirm("Remove this item?")) {
            cart.splice(index, 1);
        }
    }
    localStorage.setItem('pujaCart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

// Remove Item
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('pujaCart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

// Search Functionality
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('keyup', function() {
        const filter = searchInput.value.toLowerCase();
        const productCards = document.querySelectorAll('.col-md-3');
        productCards.forEach((card) => {
            const titleElement = card.querySelector('.card-title');
            if (titleElement) {
                const titleText = titleElement.innerText.toLowerCase();
                if (titleText.includes(filter)) {
                    card.style.display = ''; 
                } else {
                    card.style.display = 'none';
                }
            }
        });
    });
}

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    renderCart();
});