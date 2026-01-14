"use client";

import PageTransition from "@/components/PageTransition";
import Link from "next/link";

const RefundPolicy = () => {
  return (
    <PageTransition>
      <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-32 w-full md:max-w-[1200px] mx-auto">
        <div className="w-full">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 font-poppins text-gray-900 tracking-tight">
            Refund Policy
          </h1>
          <div className="space-y-8 font-inter text-gray-600 leading-relaxed max-w-4xl mx-auto">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-poppins">
                1. Overview
              </h2>
              <p>
                At <strong>Texavor</strong>, we strive to provide the best
                AI-powered content and SEO tools. However, we understand that
                sometimes things don't work out. This Refund Policy outlines the
                circumstances under which we may issue a refund.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-poppins">
                2. Eligibility for Refunds
              </h2>
              <p className="mb-4">
                We generally offer refunds under the following conditions:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Technical Issues:</strong> If the software
                  malfunctions or fails to perform its core functions as
                  described, and our support team is unable to resolve the issue
                  within a reasonable timeframe.
                </li>
                <li>
                  <strong>Accidental Charges:</strong> If you were charged due
                  to a billing error or double charge on our end.
                </li>
                <li>
                  <strong>Money-Back Guarantee:</strong> We offer a refund for
                  new subscriptions if requested within the applicable window,
                  provided you have not excessively used the generation credits
                  or violated our Terms of Service:
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>
                      <strong>Monthly Plans:</strong> 3-day money-back
                      guarantee.
                    </li>
                    <li>
                      <strong>Yearly Plans:</strong> 14-day money-back
                      guarantee.
                    </li>
                  </ul>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-poppins">
                3. Non-Refundable Circumstances
              </h2>
              <p className="mb-4">
                Refunds are generally <strong>not</strong> granted for:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Change of mind after the applicable refund window (3 days for
                  monthly, 14 days for yearly).
                </li>
                <li>
                  Unused credits or subscription time at the end of a billing
                  period.
                </li>
                <li>
                  Accounts terminated due to violation of our Terms of Service.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-poppins">
                4. How to Request a Refund
              </h2>
              <p>
                To request a refund, please contact our support team at{" "}
                <Link
                  href="mailto:hello@texavor.com"
                  className="text-primary hover:underline font-medium"
                >
                  hello@texavor.com
                </Link>{" "}
                with your account email and the reason for the request. We aim
                to review all requests within 3 business days.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-poppins">
                5. Processing Time
              </h2>
              <p>
                If your refund is approved, it will be processed immediately.
                Depending on your bank or credit card issuer, it may take 5-10
                business days for the funds to appear in your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-poppins">
                6. Contact Us
              </h2>
              <p>
                If you have any questions about this Refund Policy, please
                contact us at{" "}
                <Link
                  href="mailto:hello@texavor.com"
                  className="text-primary hover:underline font-medium"
                >
                  hello@texavor.com
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
    </PageTransition>
  );
};

export default RefundPolicy;
