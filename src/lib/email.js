import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASS,
  },
});

export const sendEmail = async (order) => {

  // Buat daftar produk
  const itemsList = order.items.map((item) => {
    return `- ${item.product.name} (Qty: ${item.qty})`;
  }).join("\n");

  const text = `
Halo ${order.name},

Terima kasih telah memesan di Azka Cake!
Berikut detail pesanan Anda:

🧾 Order ID: ${order.id}
📅 Tanggal Acara: ${new Date(order.event).toLocaleDateString("id-ID")}
📍 Alamat: ${order.address}
📦 Produk:
${itemsList}

harap simpan order id tersebut di gunakan untuk mengecek status pesanan
Pesanan Anda sedang kami proses. Terima kasih telah memilih Azka Cake!

Salam hangat,
Azka Cake
`;

  const mailOptions = {
    from: `"Azka Cake" <${process.env.GMAIL_USER}>`,
    to: order.email,
    subject: "Konfirmasi Pesanan di Azka Cake",
    text,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("✅ Email sent to:", order.email, "| Response:", info.response);
};

export const paymentSuccess = async (to, order, payment) => {
  const itemsList = order.items.map((item) => {
    return `- ${item.product.name} (Qty: ${item.product.qty})`;
  }).join("\n");

  // Hitung total
  const grossAmount = order.gross_amount;

  const paymentInfo = `
📅 Tanggal Bayar: ${new Date(payment.transaction_time).toLocaleString("id-ID")}
💳 Metode: ${payment.payment_type.toUpperCase()}
${
  payment.va_numbers
    ? `🏦 Bank: ${payment.va_numbers[0].bank.toUpperCase()}
🔢 VA Number: ${payment.va_numbers[0].va_number}`
    : ""
}
💰 Jumlah: Rp${grossAmount.toLocaleString("id-ID")}
🆔 Transaksi: ${payment.transaction_id}
`;

  const text = `
Halo ${order.name},

Pembayaran Anda telah berhasil!

Berikut detail pesanan dan bukti pembayaran Anda:

🧾 Order ID: ${order.id}
📦 Produk:
${itemsList}

${paymentInfo}

Terima kasih telah berbelanja di Azka Cake!

Salam hangat,
Azka Cake
`;

  const mailOptions = {
    from: `"Azka Cake" <${process.env.GMAIL_USER}>`,
    to,
    subject: "Pembayaran Berhasil - Bukti Pesanan Anda",
    text,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("✅ Email bukti pembayaran terkirim ke:", to, "|", info.response);
};