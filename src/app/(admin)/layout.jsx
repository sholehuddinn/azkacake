'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const linkClass = (path) =>
    `px-4 py-2 rounded hover:bg-blue-100 ${
      pathname.startsWith(path) ? 'bg-blue-500 text-white' : 'text-gray-700'
    }`;

  return (
    <nav className="bg-white shadow px-6 py-3 flex justify-between items-center">
      <h1 className="text-lg font-bold text-blue-600">MyApp</h1>
      <div className="flex gap-4">
        <Link href="/products" className={linkClass('/products')}>
          Product
        </Link>
        <Link href="/orders" className={linkClass('/orders')}>
          Order
        </Link>
      </div>
    </nav>
  );
}
