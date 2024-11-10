const PrivacyPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="px-4 lg:px-6 h-14 flex items-center">
                <a className="flex items-center justify-center" href="/">
                    <span className="font-bold">ChatterBox</span>
                </a>
            </header>
            <main className="flex-1 container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
                <div className="prose dark:prose-invert">
                    <h2>1. Information We Collect</h2>
                    <p>We collect information you provide directly to us when you use our services.</p>

                    <h2>2. How We Use Your Information</h2>
                    <p>We use the information we collect to provide, maintain, and improve our services.</p>

                    <h2>3. Information Sharing and Disclosure</h2>
                    <p>We do not share, sell, rent, or trade your personal information with third parties for their commercial purposes.</p>

                    <h2>4. Data Security</h2>
                    <p>We use reasonable measures to help protect information about you from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.</p>

                    <h2>5. Your Rights</h2>
                    <p>You have the right to access, correct, or delete your personal information at any time.</p>

                    <h2>6. Changes to This Privacy Policy</h2>
                    <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page.</p>

                    <h2>7. Contact Us</h2>
                    <p>If you have any questions about this Privacy Policy, please contact us.</p>
                </div>
            </main>
            <footer className="py-6 w-full shrink-0 px-4 md:px-6 border-t">
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">© 2024 ChatterBox. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default PrivacyPage