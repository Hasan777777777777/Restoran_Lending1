let cart = [];
let totalAmount = 0;

const cartBtn = document.querySelector('.cart-btn');
const cartCount = document.querySelector('.cart-count');
const cartModal = document.getElementById('cartModal');
const closeBtn = document.querySelector('.close');
const cartItems = document.querySelector('.cart-items');
const totalAmountEl = document.getElementById('totalAmount');
const checkoutBtn = document.querySelector('.checkout-btn');

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const item = this.getAttribute('data-item');
        const price = parseInt(this.getAttribute('data-price'));
        
        addToCart(item, price);
        updateCartUI();
    });
});

function addToCart(item, price) {
    const existingItem = cart.find(cartItem => cartItem.name === item);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: item,
            price: price,
            quantity: 1
        });
    }
    
    showNotification(`${item} savatga qo'shildi!`);
}

function updateCartUI() {

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    cartItems.innerHTML = '';
    totalAmount = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalAmount += itemTotal;
        
        const cartItemEl = document.createElement('div');
        cartItemEl.className = 'cart-item';
        cartItemEl.innerHTML = `
            <div class="item-info">
                <h4>${item.name}</h4>
                <p>${item.price} so'm x ${item.quantity}</p>
            </div>
            <div class="item-total">
                ${itemTotal} so'm
            </div>
        `;
        cartItems.appendChild(cartItemEl);
    });
    
    totalAmountEl.textContent = totalAmount.toLocaleString();
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 3000;
        animation: slideInRight 0.3s;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

cartBtn.addEventListener('click', () => {
    cartModal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Savat bo\'sh!');
        return;
    }
    
    alert(`Buyurtma qabul qilindi! Jami: ${totalAmount.toLocaleString()} so'm`);
    cart = [];
    updateCartUI();
    cartModal.style.display = 'none';
});

document.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});