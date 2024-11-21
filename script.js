// Data Produk
const products = [
    { id: 1, name: "payung", price: 10000 },
    { id: 2, name: "jas hujan", price: 20000 },
    { id: 3, name: "Aqua", price: 3000 },
    { id: 4, name: "monitor", price: 1000000},
    { id: 5, name: "beras", price: 80000 },
    { id: 6, name: "minyak", price: 30000 },
    { id: 7, name: "garam", price: 5000 },
    { id: 8, name: "merica", price: 10000 },
    { id: 9, name: "bumbu siap saji", price: 5000 },
    { id: 10, name: "monitor", price: 1000000},
    { id: 11, name: "sambel siap saji", price: 11000 },
    { id: 12, name: "kabel listrik", price: 35000 },
  ];
  
  // Data Keranjang
  let cart = [];
  
  // Menampilkan Halaman
  function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page => {
      page.classList.add("hidden");
    });
    document.getElementById(pageId).classList.remove("hidden");
  }
  
  // Memuat Produk
  function loadProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; // Pastikan elemen kosong sebelum menambahkan
    products.forEach(product => {
      const productElement = document.createElement("div");
      productElement.className = "product";
      productElement.innerHTML = `
        <h3>${product.name}</h3>
        <p>Harga: ${product.price}</p>
        <button onclick="addToCart(${product.id})">Tambah ke Keranjang</button>
      `;
      productList.appendChild(productElement);
    });
  }
  
  // Menambahkan Produk ke Keranjang
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) {
      console.error("Produk tidak ditemukan");
      return;
    }
    
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
      cartItem.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    alert(`Produk "${product.name}" telah ditambahkan ke keranjang.`);
    updateCart();
  }
  
  // Memperbarui Keranjang
  function updateCart() {
    const cartList = document.getElementById("cart-list");
    const cartTotal = document.getElementById("cart-total");
    cartList.innerHTML = ""; // Reset daftar keranjang
    let total = 0;
  
    cart.forEach(item => {
      total += item.price * item.quantity;
      const cartItemElement = document.createElement("div");
      cartItemElement.className = "cart-item";
      cartItemElement.innerHTML = `
        <h4>${item.name}</h4>
        <p>Harga: ${item.price}</p>
        <p>Jumlah: ${item.quantity}</p>
        <button onclick="removeFromCart(${item.id})">Hapus</button>
      `;
      cartList.appendChild(cartItemElement);
    });
  
    cartTotal.textContent = total;
  }
  
  // Menghapus Produk dari Keranjang
  function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
      cart.splice(index, 1);
    }
    updateCart();
  }
  
  // Proses Checkout
  document.getElementById("checkout-form").addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Pembayaran berhasil! Terima kasih atas pembelian Anda.");
    cart = [];
    updateCart();
    showPage("products");
  });
  
  // Memuat Data Awal
  document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
  });
  
