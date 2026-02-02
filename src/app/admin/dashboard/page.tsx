import Link from "next/link";

export default function Dashboard() {
    return (
        <div className="min-h-screen p-10 bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-bold text-emerald-900 drop-shadow-sm">Welcome, Shijin P.S.</h1>
                <Link href="/admin" className="text-gray-500 hover:text-red-600 font-medium transition-colors">Logout</Link>
            </div>
            <p className="mt-4 text-emerald-800/80 font-medium text-lg">This is your Admin Dashboard Hub.</p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl">
                <Link href="/admin/cars" className="group">
                    <div className="bg-emerald-600/90 hover:bg-emerald-700 backdrop-blur-md p-6 md:p-8 rounded-[2rem] shadow-xl transition-all active:scale-95 text-white min-h-[160px] flex flex-col justify-center border border-emerald-400/30">
                        <h2 className="text-2xl font-bold mb-2">Manage Vehicles</h2>
                        <p className="text-emerald-50 opacity-90 text-sm">Add, edit, or remove vehicles from your catalog.</p>
                    </div>
                </Link>

                <Link href="/admin/bookings" className="group">
                    <div className="bg-white/40 hover:bg-white/60 backdrop-blur-md p-6 md:p-8 rounded-[2rem] shadow-lg transition-all active:scale-95 text-emerald-900 border border-white/50 min-h-[160px] flex flex-col justify-center">
                        <h2 className="text-2xl font-bold mb-2">View Bookings</h2>
                        <p className="text-emerald-800/70 text-sm">Check customer booking requests and statuses.</p>
                    </div>
                </Link>

                <Link href="/admin/packages" className="group">
                    <div className="bg-white/40 hover:bg-white/60 backdrop-blur-md p-6 md:p-8 rounded-[2rem] shadow-lg transition-all active:scale-95 text-emerald-900 border border-white/50 min-h-[160px] flex flex-col justify-center">
                        <h2 className="text-2xl font-bold mb-2">Manage Packages</h2>
                        <p className="text-emerald-800/70 text-sm">Design tour packages and pilgrimage experiences.</p>
                    </div>
                </Link>

                <Link href="/admin/gallery" className="group">
                    <div className="bg-white/40 hover:bg-white/60 backdrop-blur-md p-6 md:p-8 rounded-[2rem] shadow-lg transition-all active:scale-95 text-emerald-900 border border-white/50 min-h-[160px] flex flex-col justify-center">
                        <h2 className="text-2xl font-bold mb-2">Manage Gallery</h2>
                        <p className="text-emerald-800/70 text-sm">Upload Past Trip Photo & Gallery Images.</p>
                    </div>
                </Link>

                <Link href="/admin/reviews" className="group">
                    <div className="bg-white/40 hover:bg-white/60 backdrop-blur-md p-6 md:p-8 rounded-[2rem] shadow-lg transition-all active:scale-95 text-emerald-900 border border-white/50 min-h-[160px] flex flex-col justify-center">
                        <h2 className="text-2xl font-bold mb-2">Manage Reviews</h2>
                        <p className="text-emerald-800/70 text-sm">Handle customer testimonials and ratings.</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}
