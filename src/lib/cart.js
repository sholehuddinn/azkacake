const CART_KEY = "cart_items";

// Ambil isi keranjang
export function getCart() {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : [];
}

// Simpan keranjang
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Tambah item (default quantity = 1)
export function addToCart(id) {
  const cart = getCart();
  const index = cart.findIndex((item) => item.id === id);

  if (index !== -1) {
    // sudah ada, opsional: tambahkan quantity
    cart[index].quantity += 1;
  } else {
    // belum ada, tambahkan baru
    cart.push({ id, quantity: 1 });
  }

  saveCart(cart);
}

// Hapus item
export function removeFromCart(id) {
  const cart = getCart().filter((item) => item.id !== id);
  saveCart(cart);
}

// Ubah quantity
export function updateQuantity(id, newQty) {
  const cart = getCart().map((item) =>
    item.id === id ? { ...item, quantity: newQty } : item
  );
  saveCart(cart);
}

// Kosongkan keranjang
export function clearCart() {
  localStorage.removeItem(CART_KEY);
}
