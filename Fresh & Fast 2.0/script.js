// Global Variables
let cart = [];
let menuItems = [];
let currentFilter = 'all';
let currentUser = null;
let reviews = [];
let userAddresses = [];
let userOrders = [];

// Menu Data with INR prices
const menuData = [
    {
        id: 1,
        name: "Margherita Pizza",
        category: "pizza",
        price: 399,
        description: "Fresh mozzarella, basil, and our signature tomato sauce on crispy crust",
        rating: 4.8,
        emoji: "🍕"
    },
    {
        id: 2,
        name: "Pepperoni Supreme",
        category: "pizza",
        price: 499,
        description: "Premium pepperoni with extra cheese and Italian herbs",
        rating: 4.9,
        emoji: "🍕"
    },
    {
        id: 3,
        name: "Classic Cheeseburger",
        category: "burger",
        price: 299,
        description: "Juicy beef patty with cheese, lettuce, tomato, and our special sauce",
        rating: 4.7,
        emoji: "🍔"
    },
    {
        id: 4,
        name: "BBQ Bacon Burger",
        category: "burger",
        price: 349,
        description: "Smoky BBQ sauce, crispy bacon, and caramelized onions",
        rating: 4.8,
        emoji: "🍔"
    },
    {
        id: 5,
        name: "Spaghetti Carbonara",
        category: "pasta",
        price: 279,
        description: "Creamy pasta with pancetta, eggs, and parmesan cheese",
        rating: 4.6,
        emoji: "🍝"
    },
    {
        id: 6,
        name: "Penne Arrabbiata",
        category: "pasta",
        price: 249,
        description: "Spicy tomato sauce with garlic, chili, and fresh herbs",
        rating: 4.5,
        emoji: "🍝"
    },
    {
        id: 7,
        name: "Caesar Salad",
        category: "salad",
        price: 199,
        description: "Crisp romaine lettuce with parmesan, croutons, and Caesar dressing",
        rating: 4.4,
        emoji: "🥗"
    },
    {
        id: 8,
        name: "Greek Salad",
        category: "salad",
        price: 229,
        description: "Fresh vegetables with feta cheese, olives, and olive oil dressing",
        rating: 4.6,
        emoji: "🥗"
    }
];

// Sample reviews data
const sampleReviews = [
    {
        id: 1,
        name: "Priya Sharma",
        rating: 5,
        text: "Amazing food quality and super fast delivery! The pizza was still hot when it arrived.",
        date: "2024-01-15"
    },
    {
        id: 2,
        name: "Rahul Kumar",
        rating: 4,
        text: "Great taste and reasonable prices. The burger was delicious and well-prepared.",
        date: "2024-01-14"
    },
    {
        id: 3,
        name: "Anita Patel",
        rating: 5,
        text: "Excellent service! The pasta was perfectly cooked and the delivery was on time.",
        date: "2024-01-13"
    }
];

// DOM Elements
const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const orderModal = document.getElementById('orderModal');
const successModal = document.getElementById('successModal');
const authModal = document.getElementById('authModal');
const closeCartBtn = document.getElementById('closeCartBtn');
const closeOrderBtn = document.getElementById('closeOrderBtn');
const closeSuccessBtn = document.getElementById('closeSuccessBtn');
const closeAuthBtn = document.getElementById('closeAuthBtn');
const themeToggle = document.getElementById('themeToggle');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const menuGrid = document.getElementById('menuGrid');
const cartItems = document.getElementById('cartItems');
const subtotal = document.getElementById('subtotal');
const total = document.getElementById('total');
const clearCartBtn = document.getElementById('clearCartBtn');
const checkoutBtn = document.getElementById('checkoutBtn');
const placeOrderBtn = document.getElementById('placeOrderBtn');
const cancelOrderBtn = document.getElementById('cancelOrderBtn');
const orderNowBtn = document.getElementById('orderNowBtn');
const contactForm = document.getElementById('contactForm');
const orderForm = document.getElementById('orderForm');
const newsletterForm = document.getElementById('newsletterForm');
const feedbackForm = document.getElementById('feedbackForm');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const profileForm = document.getElementById('profileForm');

// User menu elements
const userBtn = document.getElementById('userBtn');
const userDropdown = document.getElementById('userDropdown');
const userNameDisplay = document.getElementById('userNameDisplay');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const profileBtn = document.getElementById('profileBtn');
const ordersBtn = document.getElementById('ordersBtn');

// Profile page elements
const profilePage = document.getElementById('profilePage');
const mainContent = document.getElementById('mainContent');

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    menuItems = [...menuData];
    reviews = [...sampleReviews];
    renderMenu();
    renderReviews();
    setupEventListeners();
    updateCartUI();
    loadUserData();
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Load saved cart
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
    
    // Load saved user
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUserUI();
    }
}

function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
    
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // User menu
    userBtn.addEventListener('click', toggleUserDropdown);
    loginBtn.addEventListener('click', () => openModal(authModal));
    logoutBtn.addEventListener('click', logout);
    profileBtn.addEventListener('click', showProfilePage);
    ordersBtn.addEventListener('click', showOrdersTab);
    
    // Auth modal
    closeAuthBtn.addEventListener('click', () => closeModal(authModal));
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.addEventListener('click', switchAuthTab);
    });
    document.getElementById('showSignup').addEventListener('click', () => switchAuthTab({ target: { dataset: { tab: 'signup' } } }));
    document.getElementById('showLogin').addEventListener('click', () => switchAuthTab({ target: { dataset: { tab: 'login' } } }));
    
    // Cart modal
    cartBtn.addEventListener('click', () => openModal(cartModal));
    closeCartBtn.addEventListener('click', () => closeModal(cartModal));
    
    // Order modal
    closeOrderBtn.addEventListener('click', () => closeModal(orderModal));
    cancelOrderBtn.addEventListener('click', () => closeModal(orderModal));
    
    // Success modal
    closeSuccessBtn.addEventListener('click', () => closeModal(successModal));
    
    // Menu filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', handleFilter);
    });
    
    // Cart actions
    clearCartBtn.addEventListener('click', clearCart);
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            showNotification('Your cart is empty!', 'error');
            return;
        }
        closeModal(cartModal);
        openModal(orderModal);
    });
    
    // Order actions
    placeOrderBtn.addEventListener('click', placeOrder);
    orderNowBtn.addEventListener('click', () => scrollToSection('menu'));
    
    // Forms
    contactForm.addEventListener('submit', handleContactForm);
    orderForm.addEventListener('submit', handleOrderForm);
    newsletterForm.addEventListener('submit', handleNewsletterForm);
    feedbackForm.addEventListener('submit', handleFeedbackForm);
    loginForm.addEventListener('submit', handleLogin);
    signupForm.addEventListener('submit', handleSignup);
    profileForm.addEventListener('submit', handleProfileUpdate);
    
    // Star rating
    document.querySelectorAll('#starRating i').forEach(star => {
        star.addEventListener('click', handleStarRating);
        star.addEventListener('mouseover', handleStarHover);
    });
    
    document.getElementById('starRating').addEventListener('mouseleave', resetStarRating);
    
    // Profile tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', switchProfileTab);
    });
    
    // Mobile menu
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Close modals on outside click
    [cartModal, orderModal, successModal, authModal].forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
    
    // Close user dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!userBtn.contains(e.target) && !userDropdown.contains(e.target)) {
            userDropdown.classList.remove('active');
        }
    });
}

// User Authentication
function handleLogin(e) {
    e.preventDefault();
    
    const formData = new FormData(loginForm);
    const email = formData.get('email');
    const password = formData.get('password');
    
    // Simulate login (in real app, validate with server)
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateUserUI();
        closeModal(authModal);
        showNotification('Login successful!', 'success');
        loginForm.reset();
    } else {
        showNotification('Invalid email or password!', 'error');
    }
}

function handleSignup(e) {
    e.preventDefault();
    
    const formData = new FormData(signupForm);
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match!', 'error');
        return;
    }
    
    const newUser = {
        id: Date.now(),
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        password: password,
        joinDate: new Date().toISOString(),
        orders: [],
        addresses: [],
        preferences: {
            dietary: [],
            notifications: ['email', 'sms']
        }
    };
    
    // Save user (in real app, send to server)
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if email already exists
    if (users.find(u => u.email === newUser.email)) {
        showNotification('Email already registered!', 'error');
        return;
    }
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateUserUI();
    closeModal(authModal);
    showNotification('Account created successfully!', 'success');
    signupForm.reset();
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateUserUI();
    showMainContent();
    showNotification('Logged out successfully!', 'success');
}

function updateUserUI() {
    if (currentUser) {
        userNameDisplay.textContent = currentUser.firstName;
        document.getElementById('dropdownUserName').textContent = `${currentUser.firstName} ${currentUser.lastName}`;
        document.getElementById('dropdownUserEmail').textContent = currentUser.email;
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'block';
        
        // Update profile page
        updateProfilePage();
    } else {
        userNameDisplay.textContent = 'Guest';
        document.getElementById('dropdownUserName').textContent = 'Guest User';
        document.getElementById('dropdownUserEmail').textContent = 'guest@example.com';
        loginBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
    }
}

function toggleUserDropdown() {
    userDropdown.classList.toggle('active');
}

function switchAuthTab(e) {
    const tab = e.target.dataset.tab;
    
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    e.target.classList.add('active');
    
    if (tab === 'login') {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
        document.getElementById('authTitle').textContent = 'Login';
    } else {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
        document.getElementById('authTitle').textContent = 'Sign Up';
    }
}

// Profile Page Functions
function showProfilePage() {
    if (!currentUser) {
        openModal(authModal);
        return;
    }
    
    mainContent.style.display = 'none';
    profilePage.style.display = 'block';
    updateProfilePage();
    userDropdown.classList.remove('active');
}

function showMainContent() {
    mainContent.style.display = 'block';
    profilePage.style.display = 'none';
}

function updateProfilePage() {
    if (!currentUser) return;
    
    // Update profile info
    document.getElementById('profileName').textContent = `${currentUser.firstName} ${currentUser.lastName}`;
    document.getElementById('profileEmail').textContent = currentUser.email;
    document.getElementById('memberSince').textContent = new Date(currentUser.joinDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
    
    // Update form fields
    document.getElementById('firstName').value = currentUser.firstName;
    document.getElementById('lastName').value = currentUser.lastName;
    document.getElementById('profileEmailInput').value = currentUser.email;
    document.getElementById('phone').value = currentUser.phone || '';
    
    // Update stats
    const orders = currentUser.orders || [];
    document.getElementById('totalOrders').textContent = orders.length;
    const totalSpent = orders.reduce((sum, order) => sum + (order.total || 0), 0);
    document.getElementById('totalSpent').textContent = `₹${totalSpent.toFixed(0)}`;
    
    // Load orders
    loadUserOrders();
    loadUserAddresses();
    loadUserPreferences();
}

function switchProfileTab(e) {
    const tab = e.target.dataset.tab;
    
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
    document.getElementById(tab).classList.add('active');
}

function showOrdersTab() {
    showProfilePage();
    // Switch to orders tab
    document.querySelector('[data-tab="orders"]').click();
}

function handleProfileUpdate(e) {
    e.preventDefault();
    
    if (!currentUser) return;
    
    const formData = new FormData(profileForm);
    
    currentUser.firstName = formData.get('firstName');
    currentUser.lastName = formData.get('lastName');
    currentUser.email = formData.get('email');
    currentUser.phone = formData.get('phone');
    currentUser.dateOfBirth = formData.get('dateOfBirth');
    
    // Update in users array
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('users', JSON.stringify(users));
    }
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateUserUI();
    showNotification('Profile updated successfully!', 'success');
}

function loadUserOrders() {
    const ordersList = document.getElementById('ordersList');
    const orders = currentUser?.orders || [];
    
    if (orders.length === 0) {
        ordersList.innerHTML = '<p style="text-align: center; color: var(--text-light); padding: 2rem;">No orders yet</p>';
        return;
    }
    
    ordersList.innerHTML = orders.map(order => `
        <div class="order-item">
            <div class="order-header">
                <span class="order-id">Order #${order.orderId}</span>
                <span class="order-status ${order.status || 'delivered'}">${order.status || 'Delivered'}</span>
            </div>
            <div class="order-items">
                ${order.items.map(item => `
                    <div class="order-item-name">${item.name} x ${item.quantity}</div>
                `).join('')}
            </div>
            <div class="order-footer">
                <span class="order-date">${new Date(order.timestamp).toLocaleDateString('en-IN')}</span>
                <span class="order-total">₹${order.total.toFixed(0)}</span>
            </div>
        </div>
    `).join('');
}

function loadUserAddresses() {
    const addressesList = document.getElementById('addressesList');
    const addresses = currentUser?.addresses || [];
    
    if (addresses.length === 0) {
        addressesList.innerHTML = '<p style="text-align: center; color: var(--text-light); padding: 2rem;">No saved addresses</p>';
        return;
    }
    
    addressesList.innerHTML = addresses.map(address => `
        <div class="address-card">
            <span class="address-type">${address.type}</span>
            <div class="address-details">${address.address}</div>
            <div class="address-actions">
                <button class="btn btn-small btn-secondary">Edit</button>
                <button class="btn btn-small btn-secondary">Delete</button>
            </div>
        </div>
    `).join('');
}

function loadUserPreferences() {
    const preferences = currentUser?.preferences || {};
    
    // Load dietary preferences
    const dietaryCheckboxes = document.querySelectorAll('input[name="dietary"]');
    dietaryCheckboxes.forEach(checkbox => {
        checkbox.checked = preferences.dietary?.includes(checkbox.value) || false;
    });
    
    // Load notification preferences
    const notificationCheckboxes = document.querySelectorAll('input[name="notifications"]');
    notificationCheckboxes.forEach(checkbox => {
        checkbox.checked = preferences.notifications?.includes(checkbox.value) || false;
    });
}

function loadUserData() {
    // Load user orders from localStorage
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
        userOrders = JSON.parse(savedOrders);
    }
}

// Feedback Functions
function handleStarRating(e) {
    const rating = parseInt(e.target.dataset.rating);
    document.getElementById('ratingValue').value = rating;
    updateStarDisplay(rating);
}

function handleStarHover(e) {
    const rating = parseInt(e.target.dataset.rating);
    updateStarDisplay(rating);
}

function resetStarRating() {
    const currentRating = parseInt(document.getElementById('ratingValue').value) || 0;
    updateStarDisplay(currentRating);
}

function updateStarDisplay(rating) {
    document.querySelectorAll('#starRating i').forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

function handleFeedbackForm(e) {
    e.preventDefault();
    
    const formData = new FormData(feedbackForm);
    const rating = parseInt(formData.get('rating'));
    
    if (rating === 0) {
        showNotification('Please select a rating!', 'error');
        return;
    }
    
    const newReview = {
        id: Date.now(),
        name: formData.get('name'),
        rating: rating,
        text: formData.get('review'),
        date: new Date().toISOString().split('T')[0]
    };
    
    reviews.unshift(newReview);
    localStorage.setItem('reviews', JSON.stringify(reviews));
    
    renderReviews();
    updateFeedbackStats();
    feedbackForm.reset();
    document.getElementById('ratingValue').value = '0';
    updateStarDisplay(0);
    
    showNotification('Thank you for your feedback!', 'success');
}

function renderReviews() {
    const reviewsGrid = document.getElementById('reviewsGrid');
    const displayReviews = reviews.slice(0, 6); // Show only first 6 reviews
    
    reviewsGrid.innerHTML = displayReviews.map(review => `
        <div class="review-card">
            <div class="review-header">
                <span class="reviewer-name">${review.name}</span>
                <div class="review-rating">
                    ${Array(5).fill().map((_, i) => `
                        <i class="fas fa-star ${i < review.rating ? '' : 'far'}"></i>
                    `).join('')}
                </div>
            </div>
            <p class="review-text">${review.text}</p>
            <span class="review-date">${new Date(review.date).toLocaleDateString('en-IN')}</span>
        </div>
    `).join('');
}

function updateFeedbackStats() {
    const totalReviews = reviews.length;
    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
    
    document.getElementById('totalReviews').textContent = totalReviews.toLocaleString();
    document.getElementById('averageRating').textContent = averageRating.toFixed(1);
}

// Navigation
function handleNavigation(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    e.target.classList.add('active');
    
    // Scroll to section
    scrollToSection(targetId.substring(1));
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Theme Toggle
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Menu Functions
function renderMenu() {
    const filteredItems = currentFilter === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === currentFilter);
    
    menuGrid.innerHTML = filteredItems.map(item => `
        <div class="menu-item" data-category="${item.category}">
            <div class="menu-item-image">${item.emoji}</div>
            <div class="menu-item-content">
                <div class="menu-item-header">
                    <h3>${item.name}</h3>
                    <span class="menu-item-price">₹${item.price}</span>
                </div>
                <p>${item.description}</p>
                <div class="menu-item-footer">
                    <div class="rating">
                        <i class="fas fa-star"></i>
                        <span>${item.rating}</span>
                    </div>
                    <button class="add-to-cart" onclick="addToCart(${item.id})">
                        <i class="fas fa-plus"></i> Add
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function handleFilter(e) {
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    e.target.classList.add('active');
    
    // Update current filter and render menu
    currentFilter = e.target.getAttribute('data-filter');
    renderMenu();
}

// Cart Functions
function addToCart(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    if (!item) return;
    
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }
    
    updateCartUI();
    saveCart();
    showNotification(`${item.name} added to cart!`, 'success');
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartUI();
    saveCart();
}

function updateQuantity(itemId, change) {
    const item = cart.find(item => item.id === itemId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(itemId);
    } else {
        updateCartUI();
        saveCart();
    }
}

function clearCart() {
    cart = [];
    updateCartUI();
    saveCart();
    showNotification('Cart cleared!', 'success');
}

function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items display
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: var(--text-light); padding: 2rem;">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>₹${item.price} each</p>
                </div>
                <div class="cart-item-controls">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    // Update totals
    const subtotalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = cart.length > 0 ? 50 : 0;
    const totalAmount = subtotalAmount + deliveryFee;
    
    subtotal.textContent = `₹${subtotalAmount}`;
    total.textContent = `₹${totalAmount}`;
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Modal Functions
function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Order Functions
function placeOrder(e) {
    e.preventDefault();
    
    const formData = new FormData(orderForm);
    const orderData = {
        customer: {
            name: formData.get('customerName'),
            phone: formData.get('customerPhone'),
            address: formData.get('customerAddress')
        },
        items: cart,
        paymentMethod: formData.get('paymentMethod'),
        specialInstructions: formData.get('specialInstructions'),
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 50,
        orderId: generateOrderId(),
        timestamp: new Date().toISOString(),
        status: 'pending'
    };
    
    // Validate form
    if (!orderData.customer.name || !orderData.customer.phone || !orderData.customer.address || !orderData.paymentMethod) {
        showNotification('Please fill in all required fields!', 'error');
        return;
    }
    
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    // Simulate order processing
    placeOrderBtn.classList.add('loading');
    placeOrderBtn.disabled = true;
    
    setTimeout(() => {
        // Save order to localStorage
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push(orderData);
        localStorage.setItem('orders', JSON.stringify(orders));
        
        // Add to user's orders if logged in
        if (currentUser) {
            currentUser.orders = currentUser.orders || [];
            currentUser.orders.push(orderData);
            
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const userIndex = users.findIndex(u => u.id === currentUser.id);
            if (userIndex !== -1) {
                users[userIndex] = currentUser;
                localStorage.setItem('users', JSON.stringify(users));
            }
            
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
        
        // Clear cart
        cart = [];
        updateCartUI();
        saveCart();
        
        // Show success
        document.getElementById('orderId').textContent = orderData.orderId;
        closeModal(orderModal);
        openModal(successModal);
        
        // Reset form
        orderForm.reset();
        placeOrderBtn.classList.remove('loading');
        placeOrderBtn.disabled = false;
        
        showNotification('Order placed successfully!', 'success');
    }, 2000);
}

function generateOrderId() {
    return 'FF' + Date.now().toString().slice(-6) + Math.random().toString(36).substr(2, 3).toUpperCase();
}

// Form Handlers
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const contactData = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
        timestamp: new Date().toISOString()
    };
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // Save to localStorage
        const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        messages.push(contactData);
        localStorage.setItem('contactMessages', JSON.stringify(messages));
        
        contactForm.reset();
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
    }, 1500);
}

function handleOrderForm(e) {
    e.preventDefault();
    placeOrder(e);
}

function handleNewsletterForm(e) {
    e.preventDefault();
    
    const formData = new FormData(newsletterForm);
    const email = formData.get('email') || newsletterForm.querySelector('input[type="email"]').value;
    
    if (!email) {
        showNotification('Please enter a valid email address!', 'error');
        return;
    }
    
    // Simulate subscription
    const submitBtn = newsletterForm.querySelector('button[type="submit"]');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // Save to localStorage
        const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
        if (!subscribers.includes(email)) {
            subscribers.push(email);
            localStorage.setItem('subscribers', JSON.stringify(subscribers));
            showNotification('Successfully subscribed to newsletter!', 'success');
        } else {
            showNotification('Email already subscribed!', 'error');
        }
        
        newsletterForm.reset();
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }, 1000);
}

// Mobile Menu
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
}

// Notifications
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Scroll Effects
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'var(--bg-light)';
        header.style.backdropFilter = 'none';
    }
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            closeModal(activeModal);
        }
        
        if (userDropdown.classList.contains('active')) {
            userDropdown.classList.remove('active');
        }
    }
});

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}