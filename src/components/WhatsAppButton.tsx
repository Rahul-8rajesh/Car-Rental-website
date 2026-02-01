import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
    return (
        <Link
            href="https://wa.me/919562244888"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed z-50 flex items-center gap-2 rounded-full bg-green-500 px-4 py-3 text-white shadow-lg transition-transform hover:scale-105 hover:bg-green-600"
            style={{ bottom: "24px", right: "24px" }}
        >
            <FaWhatsapp className="h-6 w-6" />
            <span className="font-semibold">Chat with Us</span>
        </Link>
    );
}
