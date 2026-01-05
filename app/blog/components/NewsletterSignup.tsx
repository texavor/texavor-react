"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowRight } from "lucide-react";

export default function NewsletterSignup() {
  return (
    <section className="w-full py-24 bg-white border-t border-gray-100">
      <div className="container px-4 mx-auto max-w-4xl text-center">
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden group hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />

          <div className="relative z-10 space-y-8">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-gray-100 group-hover:scale-110 transition-transform duration-300">
              <Mail className="w-8 h-8 text-primary" />
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-bold font-poppins text-gray-900 tracking-tight">
                Subscribe to our newsletter
              </h2>
              <p className="text-gray-600 font-inter max-w-lg mx-auto text-lg">
                Get the latest insights on AI content strategy and development
                delivered straight to your inbox. No spam, ever.
              </p>
            </div>

            {/* <form
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-12 bg-white border-gray-200 rounded-xl focus:border-primary focus:ring-primary/20 transition-all font-inter"
              />
              <Button
                type="submit"
                className="h-12 px-8 rounded-xl font-semibold font-poppins bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                Subscribe <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form> */}
            <div className="pt-4">
              <span className="inline-block px-4 py-2 bg-gray-100 text-gray-500 rounded-full text-sm font-medium font-inter">
                Newsletter subscription coming soon
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
