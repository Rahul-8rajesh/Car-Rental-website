import Link from "next/link";

export default function Dashboard() {
    return (
        <div className="p-10 bg-white h-screen">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-bold text-blue-900">Welcome, Shijin P.S.</h1>
                <Link href="/admin" className="text-gray-500 hover:text-red-600 font-medium">Logout</Link>
            </div>
            <p className="mt-4 text-gray-600 font-medium">This is your Admin Dashboard Hub.</p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl">
                <Link href="/admin/cars" className="group">
                    <div className="bg-blue-600 hover:bg-blue-700 p-6 md:p-8 rounded-[2rem] shadow-xl transition-all active:scale-95 text-white min-h-[160px] flex flex-col justify-center">
                        <h2 className="text-2xl font-bold mb-2">Manage Cars</h2>
                        <p className="text-blue-100 opacity-80 text-sm">Add, edit, or remove vehicles from your catalog.</p>
                    </div>
                </Link>

                <Link href="/admin/bookings" className="group">
                    <div className="bg-gray-100 hover:bg-gray-200 p-6 md:p-8 rounded-[2rem] shadow-lg transition-all active:scale-95 text-black border border-gray-200 min-h-[160px] flex flex-col justify-center">
                        <h2 className="text-2xl font-bold mb-2">View Bookings</h2>
                        <p className="text-gray-600 opacity-80 text-sm">Check customer booking requests and statuses.</p>
                    </div>
                </Link>

                <Link href="/admin/packages" className="group">
                    <div className="bg-white hover:bg-blue-50 p-6 md:p-8 rounded-[2rem] shadow-lg transition-all active:scale-95 text-blue-900 border-2 border-blue-100 min-h-[160px] flex flex-col justify-center">
                        <h2 className="text-2xl font-bold mb-2">Manage Packages</h2>
                        <p className="text-gray-500 opacity-80 text-sm">Design tour packages and pilgrimage experiences.</p>
                    </div>
                </Link>

                <Link href="/admin/gallery" className="group">
                    <div className="bg-white hover:bg-blue-50 p-6 md:p-8 rounded-[2rem] shadow-lg transition-all active:scale-95 text-blue-900 border-2 border-blue-100 min-h-[160px] flex flex-col justify-center">
                        <h2 className="text-2xl font-bold mb-2">Manage Gallery</h2>
                        <p className="text-gray-500 opacity-80 text-sm">Upload Past Trip Photo & Gallery Images.</p>
                    </div>
                </Link>

                <Link href="/admin/reviews" className="group">
                    <div className="bg-white hover:bg-blue-50 p-6 md:p-8 rounded-[2rem] shadow-lg transition-all active:scale-95 text-blue-900 border-2 border-blue-100 min-h-[160px] flex flex-col justify-center">
                        <h2 className="text-2xl font-bold mb-2">Manage Reviews</h2>
                        <p className="text-gray-500 opacity-80 text-sm">Handle customer testimonials and ratings.</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}
