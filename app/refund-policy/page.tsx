import { LegalLayout } from "@/components/LegalLayout";
import Schema from "@/components/Schema";
import Link from "next/link";

const RefundPolicy = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.texavor.com/refund-policy",
    url: "https://www.texavor.com/refund-policy",
    name: "Refund Policy - Texavor",
    description:
      "Learn about Texavor's refund policy including eligibility, money-back guarantees (3-day for monthly, 14-day for yearly), and how to request a refund.",
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      "@id": "https://www.texavor.com",
      url: "https://www.texavor.com",
      name: "Texavor",
    },
    author: {
      "@type": "Person",
      name: "Suraj Vishwakarma",
      url: "https://www.texavor.com",
    },
    datePublished: "2026-01-31",
    dateModified: "2026-01-31",
  };

  return (
    <>
      <Schema script={schema} />
      <LegalLayout title="Refund Policy" lastUpdated="January 31, 2026">
        <section>
          <h2>1. Overview</h2>
          <p>
            At <strong>Texavor</strong>, we strive to provide the best
            AI-powered content and SEO tools. However, we understand that
            sometimes things don't work out. This Refund Policy outlines the
            circumstances under which we may issue a refund.
          </p>
        </section>

        <section>
          <h2>2. Eligibility for Refunds</h2>
          <p className="mb-4">
            We generally offer refunds under the following conditions:
          </p>
          <ul>
            <li>
              <strong>Technical Issues:</strong> If the software malfunctions or
              fails to perform its core functions as described, and our support
              team is unable to resolve the issue within a reasonable timeframe.
            </li>
            <li>
              <strong>Accidental Charges:</strong> If you were charged due to a
              billing error or double charge on our end.
            </li>
            <li>
              <strong>Money-Back Guarantee:</strong> We offer a refund for new
              subscriptions if requested within the applicable window, provided
              you have not excessively used the generation credits or violated
              our Terms of Service:
              <ul className="mt-2">
                <li>
                  <strong>Monthly Plans:</strong> 3-day money-back guarantee.
                </li>
                <li>
                  <strong>Yearly Plans:</strong> 14-day money-back guarantee.
                </li>
              </ul>
            </li>
          </ul>
        </section>

        <section>
          <h2>3. Non-Refundable Circumstances</h2>
          <p className="mb-4">
            Refunds are generally <strong>not</strong> granted for:
          </p>
          <ul>
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
          <h2>4. How to Request a Refund</h2>
          <p>
            To request a refund, please contact our support team at{" "}
            <Link href="mailto:hello@texavor.com">hello@texavor.com</Link> with
            your account email and the reason for the request. We aim to review
            all requests within 3 business days.
          </p>
        </section>

        <section>
          <h2>5. Processing Time</h2>
          <p>
            If your refund is approved, it will be processed immediately.
            Depending on your bank or credit card issuer, it may take 5-10
            business days for the funds to appear in your account.
          </p>
        </section>

        <section>
          <h2>6. Contact Us</h2>
          <p>
            If you have any questions about this Refund Policy, please contact
            us at <Link href="mailto:hello@texavor.com">hello@texavor.com</Link>
            .
          </p>
        </section>
      </LegalLayout>
    </>
  );
};

export const metadata = {
  title: "Refund Policy | Texavor",
  description:
    "Learn about Texavor's refund policy including eligibility, money-back guarantees (3-day for monthly, 14-day for yearly), and how to request a refund.",
  openGraph: {
    title: "Refund Policy | Texavor",
    description:
      "Learn about Texavor's refund policy including eligibility, money-back guarantees (3-day for monthly, 14-day for yearly), and how to request a refund.",
  },
  alternates: {
    canonical: "/refund-policy",
  },
};

export default RefundPolicy;
