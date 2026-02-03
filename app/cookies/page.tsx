import PageTransition from "@/components/PageTransition";
import Schema from "@/components/Schema";

const CookiePolicy = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.texavor.com/cookies",
    url: "https://www.texavor.com/cookies",
    name: "Cookie Policy - Texavor",
    description:
      "Learn about how Texavor uses cookies to improve your experience and provide better service. Information about essential, performance, and functionality cookies.",
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
            Cookie Policy
          </h1>
          <div className="space-y-8 font-inter text-gray-600 leading-relaxed max-w-4xl mx-auto">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-poppins">
                1. What Are Cookies?
              </h2>
              <p>
                Cookies are small text files that are placed on your computer or
                mobile device when you visit a website. They are widely used to
                make websites work more efficiently and to provide information
                to the owners of the site. Texavor uses cookies to distinguish
                you from other users, which helps us provide a good experience
                and improve our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-poppins">
                2. How We Use Cookies
              </h2>
              <p className="mb-4">
                We use cookies for several reasons, detailed below:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Essential Cookies:</strong> These are necessary for
                  the website to function. They include cookies that enable you
                  to log into secure areas of our site (e.g., authentication
                  tokens).
                </li>
                <li>
                  <strong>Performance & Analytics Cookies:</strong> These allow
                  us to recognize and count the number of visitors and see how
                  visitors move around our website. We use this information to
                  improve the way our website works (e.g., measuring page load
                  speeds).
                </li>
                <li>
                  <strong>Functionality Cookies:</strong> These are used to
                  recognize you when you return to our website. This enables us
                  to personalize our content for you and remember your
                  preferences (e.g., your choice of language or region).
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-poppins">
                3. Third-Party Cookies
              </h2>
              <p>
                In some cases, we use trusted third-party services that may also
                set cookies on your device. These include:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>
                  <strong>Stripe:</strong> For secure payment processing and
                  fraud detection.
                </li>
                <li>
                  <strong>Analytics Providers:</strong> To help us understand
                  usage patterns (e.g., Google Analytics, PostHog).
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-poppins">
                4. Managing Cookies
              </h2>
              <p>
                Most web browsers allow some control of most cookies through the
                browser settings. To find out more about cookies, including how
                to see what cookies have been set and how to manage and delete
                them, visit{" "}
                <a
                  href="https://www.aboutcookies.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  www.aboutcookies.org
                </a>{" "}
                or{" "}
                <a
                  href="https://www.allaboutcookies.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  www.allaboutcookies.org
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-poppins">
                5. Updates to This Policy
              </h2>
              <p>
                We may update this Cookie Policy from time to time in order to
                reflect changes to the cookies we use or for other operational,
                legal, or regulatory reasons. Please re-visit this Cookie Policy
                regularly to stay informed about our use of cookies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-poppins">
                6. Contact Us
              </h2>
              <p>
                If you have questions about our use of cookies, please email us
                at{" "}
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
  title: "Cookie Policy | Texavor",
  description:
    "Learn about how Texavor uses cookies to improve your experience and provide better service. Information about essential, performance, and functionality cookies.",
  openGraph: {
    title: "Cookie Policy | Texavor",
    description:
      "Learn about how Texavor uses cookies to improve your experience and provide better service. Information about essential, performance, and functionality cookies.",
  },
  alternates: {
    canonical: "/cookies",
  },
};

export default CookiePolicy;
