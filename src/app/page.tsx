import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">🔐 Password Vault</h1>
      <p className="text-lg text-gray-600 mb-6">Your private, encrypted vault for storing credentials securely.</p>

      <div className="flex gap-4">
        <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded">
          Register
        </Link>
        <Link href="/login" className="bg-gray-800 text-white px-4 py-2 rounded">
          Login
        </Link>
      </div>
    </main>
  );
}
