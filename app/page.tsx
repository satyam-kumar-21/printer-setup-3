import Link from "next/link";
import React from "react";

function Page() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">
                Home Page
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                    href="/printer-setup"
                    className="rounded-lg bg-blue-600 px-6 py-3 text-white font-medium transition hover:bg-blue-700"
                >
                    Setup Theme 1
                </Link>

                <Link
                    href="/printer-setup2"
                    className="rounded-lg bg-blue-600 px-6 py-3 text-white font-medium transition hover:bg-green-700"
                >
                    Setup Theme 2
                </Link>

                <Link
                    href="/printer-setup3"
                    className="rounded-lg bg-blue-600 px-6 py-3 text-white font-medium transition hover:bg-purple-700"
                >
                    Setup Theme 3
                </Link>
            </div>
        </main>
    );
}

export default Page;