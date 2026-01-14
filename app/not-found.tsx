import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen md:mt-8 flex items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-zinc-950 dark:to-zinc-900 px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Image */}
        <div className="relative w-full max-w-md mx-auto aspect-square">
          <Image
            src="/empty-state.png"
            alt="Page not found"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 dark:text-white font-poppins">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 font-poppins">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto font-inter">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Button */}
        <div className="pt-4">
          <Link href="/">
            <Button
              size="lg"
              className="h-12 px-8 bg-[#104127] hover:bg-[#0c311d] text-white font-semibold text-lg rounded-xl transition-all shadow-lg hover:shadow-xl"
            >
              <Home className="w-5 h-5 mr-2" />
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
