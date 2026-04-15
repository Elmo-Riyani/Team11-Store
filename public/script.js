const productList = document.getElementById('product-list');

const productImages = {
  'Phone 17 Pro': 'images/iphone17pro.jpg',
  'iPhone 17 Pro': 'images/iphone17pro.jpg',

  'Ipad Pro M4': 'images/ipadprom4.jpg',
  'iPad Pro M4': 'images/ipadprom4.jpg',

  'Apple Airpods Max': 'images/airpodsmax.jpg',
  'Apple AirPods Max': 'images/airpodsmax.jpg',

  'ASUS ROG Swift 27 OLED Gaming Monitor (PG27AQWP-W)': 'images/asusrogmonitor.jpg',
  'ASUS ROG Falchion Ace 65 RGB Compact Gaming Mechanical Keyboard': 'images/asusrogkeyboard.jpg',
  'Open Box Apple MacBook Air 15.3 2025 M4 16GB 256GB French': 'images/macbookairm4.jpg'
};

async function loadProducts() {
  try {
    const response = await fetch('/api/products');
    const products = await response.json();

    if (!products.length) {
      productList.innerHTML = '<p class="no-products">No products available right now.</p>';
      return;
    }

    productList.innerHTML = '';

    products.forEach(product => {
      const imagePath = productImages[product.productName] || 'images/default.jpg';

      const card = document.createElement('div');
      card.className = 'product-card';

      card.innerHTML = `
        <img src="${imagePath}" alt="${product.productName}" class="product-image">
        <div class="product-info">
          <h3>${product.productName}</h3>
          <p><strong>Store ID:</strong> ${product.storeId}</p>
          <p><strong>Store Name:</strong> ${product.storeName}</p>
          <p><strong>Product ID:</strong> ${product.productId}</p>
          <p class="price">$${product.price}</p>
        </div>
      `;

      productList.appendChild(card);
    });
  } catch (error) {
    productList.innerHTML = '<p class="error-text">Unable to load products at this time.</p>';
    console.error('Error loading products:', error);
  }
}

loadProducts();