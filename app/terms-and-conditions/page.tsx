import { LegalLayout } from "@/components/LegalLayout";
import Schema from "@/components/Schema";

const TermsAndConditions = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.texavor.com/terms-and-conditions",
    url: "https://www.texavor.com/terms-and-conditions",
    name: "Terms and Conditions - Texavor",
    description:
      "Read Texavor's Terms and Conditions covering service usage, user accounts, intellectual property, subscriptions, acceptable use policy, and liability.",
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
      <LegalLayout title="Terms and Conditions" lastUpdated="January 31, 2026">
        <section>
          <h2>1. Introduction</h2>
          <p>
            Welcome to <strong>Texavor</strong>. These Terms and Conditions
            govern your use of our website and AI-powered content creation
            platform. By accessing or using our service, you agree to be bound
            by these terms. If you disagree with any part of the terms, you may
            not access the service.
          </p>
        </section>

        <section>
          <h2>2. Services Description</h2>
          <p>
            Texavor provides AI-powered tools for developers and content
            creators to generate article ideas, outlines, and full content
            drafts. We use advanced language models to assist in the creative
            process. While we strive for accuracy, users are responsible for
            reviewing and verifying all AI-generated content before publication.
          </p>
        </section>

        <section>
          <h2>3. User Accounts & Security</h2>
          <p>
            To access full features, you must create a verified account. You are
            responsible for maintaining the confidentiality of your login
            credentials and for all activities that occur under your account.
            Texavor reserves the right to terminate accounts that violate these
            terms or engage in suspicious activity.
          </p>
        </section>

        <section>
          <h2>4. Intellectual Property & Content Ownership</h2>
          <p>
            <strong>Your Content:</strong> You retain full ownership of all
            content you generate using Texavor. We do not claim rights to your
            output.
          </p>
          <p className="mt-2">
            <strong>Our IP:</strong> The Texavor platform, branding, logo, and
            underlying code are the exclusive property of Texavor Solutions.
          </p>
        </section>

        <section>
          <h2>5. Subscription & Billing</h2>
          <ul>
            <li>
              <strong>Free Trial:</strong> We currently offer a 14-day free
              trial for new users to experience our Pro features.
            </li>
            <li>
              <strong>Billing:</strong> Subscriptions are billed on a monthly or
              annual basis. You can cancel your subscription at any time, and
              access will continue until the end of the current billing cycle.
            </li>
            <li>
              <strong>Refunds:</strong> Refund requests are handled on a
              case-by-case basis. Please contact support if you believe you were
              billed incorrectly.
            </li>
          </ul>
        </section>

        <section>
          <h2>6. Acceptable Use Policy</h2>
          <p>
            You agree not to use Texavor to generate content that is illegal,
            hateful, harassing, or infringing on intellectual property rights.
            We strictly prohibit the use of our API or platform for spam
            generation or malicious automation.
          </p>
        </section>

        <section>
          <h2>7. Limitation of Liability</h2>
          <p>
            Texavor is provided "as is" without warranties of any kind. We are
            not liable for any direct, indirect, incidental, or consequential
            damages resulting from your use of the service or reliance on
            AI-generated content.
          </p>
        </section>

        <section>
          <h2>8. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at{" "}
            <a href="mailto:hello@texavor.com">hello@texavor.com</a>.
          </p>
        </section>
      </LegalLayout>
    </>
  );
};
export const metadata = {
  title: "Terms and Conditions | Texavor",
  description:
    "Read Texavor's Terms and Conditions covering service usage, user accounts, intellectual property, subscriptions, acceptable use policy, and liability.",
  openGraph: {
    title: "Terms and Conditions | Texavor",
    description:
      "Read Texavor's Terms and Conditions covering service usage, user accounts, intellectual property, subscriptions, acceptable use policy, and liability.",
  },
  alternates: {
    canonical: "/terms-and-conditions",
  },
};

export default TermsAndConditions;
