const TermsPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="px-4 lg:px-6 h-14 flex items-center">
                <a className="flex items-center justify-center" href="/">
                    <span className="font-bold">HelloHub</span>
                </a>
            </header>
            <main className="flex-1 container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
                <div className="prose dark:prose-invert">
                    <h2>1. Acceptance of Terms</h2>
                    <p>By accessing or using HelloHub, you agree to be bound by these Terms of Service.</p>

                    <h2>2. Description of Service</h2>
                    <p>HelloHub provides a platform for instant messaging and communication.</p>

                    <h2>3. User Conduct</h2>
                    <p>You agree to use HelloHub only for lawful purposes and in accordance with these Terms of Service.</p>

                    <h2>4. Intellectual Property Rights</h2>
                    <p>All content and materials available on HelloHub are protected by applicable copyright and trademark law.</p>

                    <h2>5. Termination</h2>
                    <p>We may terminate or suspend your account and access to HelloHub immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever.</p>

                    <h2>6. Limitation of Liability</h2>
                    <p>In no event shall HelloHub, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages.</p>

                    <h2>7. Changes to Terms</h2>
                    <p>We reserve the right to modify or replace these Terms at any time. It is your responsibility to check these Terms periodically for changes.</p>
                </div>
            </main>
            <footer className="py-6 w-full shrink-0 px-4 md:px-6 border-t">
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">© 2024 HelloHub. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default TermsPage