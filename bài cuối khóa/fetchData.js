import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { ref, onValue, getDatabase } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";

// Cấu hình Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDoS0DAwJ0a4gFX5JOCZ22L3gFF1i5XBEs",
    authDomain: "sell-web-1bce8.firebaseapp.com",
    projectId: "sell-web-1bce8",
    storageBucket: "sell-web-1bce8.appspot.com",
    messagingSenderId: "838886606647",
    appId: "1:838886606647:web:611b586cbb7d6fc5643cb2",
    databaseURL: "https://sell-web-1bce8-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const productsRef = ref(database, '/');

onValue(productsRef, (snapshot) => {
    const data = snapshot.val();
    console.log("Dữ liệu nhận được từ Firebase:", data);
    if (data) {
        displayProducts(data);
    } else {
        console.error("Không có dữ liệu từ Firebase.");
    }
});

function displayProducts(data) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Xóa nội dung hiện tại

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const product = data[key];
            const productDiv = document.createElement('div');
            productDiv.classList.add('product-container');

            productDiv.innerHTML = `
                <div>
                    <img src="${product.imageUrl}" alt="${product.name}" class="edited-image">
                    <div id="product-container">
                        <h2>${product.name}</h2>
                        <p>Khối lượng: ${product.size}</p>
                        <p>Giá: ${product.price}</p>
                        <button class="details-button" data-key="${key}">Chi tiết</button>
                        <button id="buy-button">Mua hàng</button>
                    </div>
                </div>
            `;

            productList.appendChild(productDiv);
        }
    }

    const detailsButtons = document.querySelectorAll('.details-button');
    detailsButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productKey = event.target.getAttribute('data-key');
            const product = data[productKey];
            localStorage.setItem('productData', JSON.stringify({
                title: product.name,
                price: product.price,
                imageSrc: product.imageUrl,
                description: product.description
            }));
            window.location.href = 'product.html'; 
        });
    });
}
let cartCount = 0;

document.querySelector('.navbar-cart i').addEventListener('click', () => {
    alert('Giỏ hàng của bạn hiện đang trống.');
});

function addToCart() {
    cartCount++;
    document.querySelector('.cart-count').textContent = cartCount;
}
document.getElementById('search-button').addEventListener('click', function() {
const searchQuery = document.getElementById('search-input').value.toLowerCase();
const productContainers = document.querySelectorAll('.product-container');

productContainers.forEach(container => {
    const productName = container.querySelector('.product-name').textContent.toLowerCase();
    if (productName.includes(searchQuery)) {
        container.style.display = 'flex';
    } else {
        container.style.display = 'none';
    }
});
});