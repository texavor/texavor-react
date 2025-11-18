import PageTransition from "@/components/PageTransition";

const PrivacyPolicy = () => {
  return (
    <PageTransition>
      <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-10 w-full md:max-w-[1200px] mx-auto">
        <div className="w-full">
          <h1 className="text-4xl font-bold text-center mb-8 font-poppins text-[#0A2918]">
            Privacy Policy
          </h1>
          <div className="space-y-6 font-inter">
            <section>
              <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
              <p>
                This Privacy Policy describes how Texavor.dev ("we", "us", or
                "our") collects, uses, and discloses your information. By using
                our service, you agree to the collection and use of information
                in accordance with this policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">
                2. Information We Collect
              </h2>
              <p>
                We collect the following information to provide and improve our
                service:
              </p>
              <ul className="list-disc list-inside ml-4">
                <li>
                  <strong>Email Address:</strong> We collect your email address
                  when you sign up for our service. We use it to create your
                  account, communicate with you, and send you marketing emails
                  (you can opt-out at any time).
                </li>
                <li>
                  <strong>Country:</strong> We may collect your country of
                  residence to personalize your experience and for analytical
                  purposes.
                </li>
                <li>
                  <strong>Payment Information:</strong> Our payment processing
                  is handled by Stripe. We do not store your credit card details
                  on our servers.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">
                3. How We Use Your Information
              </h2>
              <p>
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc list-inside ml-4">
                <li>To provide and maintain our service.</li>
                <li>To notify you about changes to our service.</li>
                <li>To provide customer support.</li>
                <li>
                  To gather analysis or valuable information so that we can
                  improve our service.
                </li>
                <li>
                  To send you news, special offers, and general information
                  about our goods, services, and events which we offer that are
                  similar to those that you have already purchased or enquired
                  about unless you have opted not to receive such information.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">
                4. Data Retention and Deletion
              </h2>
              <p>
                We will retain your personal data only for as long as is
                necessary for the purposes set out in this Privacy Policy. You
                can request the deletion of your account and associated data by
                contacting us at [your contact email].
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">
                5. Third-Party Services
              </h2>
              <p>
                We may employ third-party companies and individuals to
                facilitate our Service ("Service Providers"), to provide the
                Service on our behalf, to perform Service-related services or to
                assist us in analyzing how our Service is used. These third
                parties have access to your Personal Data only to perform these
                tasks on our behalf and are obligated not to disclose or use it
                for any other purpose.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">6. Cookies</h2>
              <p>
                We use cookies and similar tracking technologies to track the
                activity on our Service and we hold certain information. You can
                instruct your browser to refuse all cookies or to indicate when
                a cookie is being sent. However, if you do not accept cookies,
                you may not be able to use some portions of our Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">
                7. Changes to This Privacy Policy
              </h2>
              <p>
                We may update our Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page. You are advised to review this Privacy Policy
                periodically for any changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">8. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please
                contact us at [your contact email].
              </p>
            </section>
          </div>
        </div>
      </main>
    </PageTransition>
  );
};

export default PrivacyPolicy;
