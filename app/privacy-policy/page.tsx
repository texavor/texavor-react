import PageTransition from "@/components/PageTransition";
import Schema from "@/components/Schema";

const PrivacyPolicy = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.texavor.com/privacy-policy",
    url: "https://www.texavor.com/privacy-policy",
    name: "Privacy Policy - Texavor",
    description:
      "Learn how Texavor collects, uses, and protects your personal data. Our privacy policy explains data collection, usage, security measures, and your rights.",
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
    <PageTransition>
      <Schema script={schema} />
      <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-32 w-full md:max-w-[1200px] mx-auto">
        <div className="w-full">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 font-poppins text-gray-900 tracking-tight">
            Privacy Policy
          </h1>
          <div className="space-y-8 font-inter text-gray-600 leading-relaxed max-w-4xl mx-auto">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-poppins">
                1. Introduction
              </h2>
              <p>
                This Privacy Policy describes how <strong>Texavor</strong>{" "}
                ("we", "us", or "our") collects, uses, and discloses your
                information when you use the Texavor platform. We are committed
                to protecting your personal data and ensuring transparency in
                how we handle your information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-poppins">
                2. Information We Collect
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Account Information:</strong> When you sign up, we
                  collect your email address, name, and password (hashed).
                </li>
                <li>
                  <strong>Usage Data:</strong> We collect data on how you
                  interact with our platform, such as the features you use,
                  article generation frequency, and session duration. This helps
                  us improve our AI models and user experience.
                </li>
                <li>
                  <strong>Generated Content:</strong> We process the text inputs
                  and outputs solely to provide the service. We do{" "}
                  <strong>not</strong> use your private workspace content to
                  train our general public AI models without your explicit
                  consent.
                </li>
                <li>
                  <strong>Payment Data:</strong> Payment processing is handled
                  securely by Stripe. We do not store your full credit card
                  information on our servers.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-poppins">
                3. How We Use Your Information
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>To provide, maintain, and improve the Texavor platform.</li>
                <li>To process transactions and manage your subscription.</li>
                <li>
                  To communicate with you about updates, security alerts, and
                  support messages.
                </li>
                <li>
                  To personalize your experience and provide tailored content
                  recommendations.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-poppins">
                4. Data Sharing & Third Parties
              </h2>
              <p>
                We do not sell your personal data. We may share information with
                trusted third-party service providers who assist us in operating
                our website, conducting our business, or serving our users
                (e.g., cloud hosting, payment processors, email services), so
                long as those parties agree to keep this information
                confidential.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-poppins">
                5. Data Security
              </h2>
              <p>
                We implement industry-standard security measures to protect your
                data, including encryption in transit and at rest. However, no
                method of transmission over the Internet is 100% secure, and we
                cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-poppins">
                6. Your Rights
              </h2>
              <p>
                You have the right to access, correct, or delete your personal
                data. You can manage your account settings directly within the
                application or contact us to request full data deletion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-poppins">
                7. Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy, please
                contact us at{" "}
                <a
                  href="mailto:hello@texavor.com"
                  className="text-primary hover:underline font-medium"
                >
                  hello@texavor.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
    </PageTransition>
  );
};

export const metadata = {
  title: "Privacy Policy | Texavor",
  description:
    "Learn how Texavor collects, uses, and protects your personal data. Our privacy policy explains data collection, usage, security measures, and your rights.",
  openGraph: {
    title: "Privacy Policy | Texavor",
    description:
      "Learn how Texavor collects, uses, and protects your personal data. Our privacy policy explains data collection, usage, security measures, and your rights.",
  },
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default PrivacyPolicy;
