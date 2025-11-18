import PageTransition from "@/components/PageTransition";

const TermsAndConditions = () => {
  return (
    <PageTransition>
      <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-10 w-full md:max-w-[1200px] mx-auto">
        <div className="w-full">
          <h1 className="text-4xl font-bold text-center mb-8 font-poppins text-[#0A2918]">
            Terms and Conditions
          </h1>
          <div className="space-y-6 font-inter">
            <section>
              <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
              <p>
                Welcome to Texavor.dev! These Terms and Conditions govern your
                use of our website and services. By accessing or using our
                service, you agree to be bound by these terms. If you disagree
                with any part of the terms, you may not access the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">2. Services</h2>
              <p>
                Texavor.dev is an AI content strategist for developers. We
                provide tools to help you generate high-impact article ideas,
                create strategic outlines, and analyze your content for
                performance and gaps. Our goal is to help you create technical
                content that gets discovered.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">3. User Accounts</h2>
              <p>
                To access certain features of our service, you may be required
                to create an account. You are responsible for safeguarding your
                account information and for all activities that occur under your
                account. You agree to notify us immediately of any unauthorized
                use of your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">4. User Content</h2>
              <p>
                You retain ownership of all content you create using our
                services, including article ideas, outlines, and any other
                generated text. We do not claim any ownership rights to your
                content. You grant us a license solely to the extent necessary
                to provide and improve our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">
                5. Payments and Subscriptions
              </h2>
              <p>
                [Details about pricing, billing, and refund policy will be added
                here. We plan to offer various subscription plans to meet your
                needs.]
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">
                6. Prohibited Activities
              </h2>
              <p>
                You agree not to use the service for any unlawful purpose or to
                engage in any activity that would disrupt or harm the service.
                This includes, but is not limited to, attempting to gain
                unauthorized access to our systems, transmitting any malware, or
                using the service to generate spam or low-quality content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">7. Termination</h2>
              <p>
                We may terminate or suspend your account at our sole discretion,
                without prior notice or liability, for any reason, including if
                you breach these Terms and Conditions. Upon termination, your
                right to use the service will immediately cease.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">
                8. Disclaimers and Limitation of Liability
              </h2>
              <p>
                Our service is provided "as is" and "as available" without any
                warranties. We do not guarantee that the service will be
                error-free or that the results of using the service will meet
                your requirements. In no event shall Texavor.dev be liable for
                any indirect, incidental, special, consequential or punitive
                damages.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">9. Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with
                the laws of [Your Country/State], without regard to its conflict
                of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">
                10. Changes to Terms
              </h2>
              <p>
                We reserve the right to modify these terms at any time. We will
                notify you of any changes by posting the new Terms and
                Conditions on this page. You are advised to review these Terms
                periodically for any changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">11. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us
                at [your contact email].
              </p>
            </section>
          </div>
        </div>
      </main>
    </PageTransition>
  );
};

export default TermsAndConditions;
