import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, Zap, Shield, Smartphone, Check } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LandingPage = () => {
    const [email, setEmail] = useState('');

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateEmail(email)) {
            const response = await fetch('http://localhost:5000/api/subscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            if (!response.ok) {
                toast.error('An error occurred. Please try again later.');
                return;
            }
            setEmail('');
            toast.success('Thanks for Subscribing. You will receive future updates!');
        } else {
            toast.error('Please enter a valid email address');
        }
    }

    const learnMore = () => {
        const featureSection = document.getElementById('features')
        if (featureSection) {
            featureSection.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <div className="flex flex-col min-h-screen">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-2">
                <div className="container flex h-14 items-center">
                    <a className="flex items-center justify-center" href="#">
                        <MessageCircle className="h-6 w-6" />
                        <span className="sr-only">HelloHub</span>
                    </a>
                    <nav className="ml-auto flex gap-4 sm:gap-6">
                        <a className="text-sm font-medium hover:underline underline-offset-4" href="#features">
                            Features
                        </a>
                        <a className="text-sm font-medium hover:underline underline-offset-4" href="#pricing">
                            Pricing
                        </a>
                        <a className="text-sm font-medium hover:underline underline-offset-4" href="#about">
                            About
                        </a>
                    </nav>
                </div>
            </header>
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                    Connect Instantly with HelloHub
                                </h1>
                                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                                    Experience seamless communication with our intuitive chat app. Stay connected with friends, family, and colleagues anytime, anywhere.
                                </p>
                            </div>
                            <div className="space-x-4">
                                <a href='/register' style={{ textDecoration: 'none' }}>
                                    <Button>Get Started</Button>
                                </a>
                                <Button variant="outline" onClick={learnMore}>Learn More</Button>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Features</h2>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                                <Zap className="h-12 w-12 text-primary" />
                                <h3 className="text-xl font-bold">Lightning Fast</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-center">Experience instant messaging with our optimized infrastructure.</p>
                            </div>
                            <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                                <Shield className="h-12 w-12 text-primary" />
                                <h3 className="text-xl font-bold">Secure Chats</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-center">Your conversations are protected with end-to-end encryption.</p>
                            </div>
                            <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                                <Smartphone className="h-12 w-12 text-primary" />
                                <h3 className="text-xl font-bold">Cross-Platform</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-center">Chat seamlessly across all your devices.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Simple Pricing</h2>
                        <div className="grid gap-8 md:grid-cols-2 lg:max-w-3xl lg:mx-auto">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Free Plan</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-4xl font-bold">$0</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">per month</p>
                                    <ul className="mt-4 space-y-2">
                                        <li className="flex items-center">
                                            <Check className="mr-2 h-4 w-4 text-green-500" />
                                            <span>Unlimited messages</span>
                                        </li>
                                        <li className="flex items-center">
                                            <Check className="mr-2 h-4 w-4 text-green-500" />
                                            <span>Up to 2 group chats</span>
                                        </li>
                                        <li className="flex items-center">
                                            <Check className="mr-2 h-4 w-4 text-green-500" />
                                            <span>Image sharing only</span>
                                        </li>
                                    </ul>
                                    <Button className="mt-6 w-full">Get Started</Button>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Pro Plan</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-4xl font-bold">Coming Soon</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Stay tuned for more features!</p>
                                    <ul className="mt-4 space-y-2">
                                        <li className="flex items-center">
                                            <Check className="mr-2 h-4 w-4 text-green-500" />
                                            <span>All Free Plan features</span>
                                        </li>
                                        <li className="flex items-center">
                                            <Check className="mr-2 h-4 w-4 text-green-500" />
                                            <span>Unlimited group chats</span>
                                        </li>
                                        <li className="flex items-center">
                                            <Check className="mr-2 h-4 w-4 text-green-500" />
                                            <span>Advanced file sharing</span>
                                        </li>
                                        <li className="flex items-center">
                                            <Check className="mr-2 h-4 w-4 text-green-500" />
                                            <span>Priority support</span>
                                        </li>
                                    </ul>
                                    <Button className="mt-6 w-full" disabled>Coming Soon</Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
                <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">About HelloHub</h2>
                            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                HelloHub is a passion project built by an Vedant Mahajan who believes in the power of seamless communication.
                                With a focus on simplicity, security, and user experience, HelloHub aims to provide a chat platform that feels personal and efficient.
                            </p>
                            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                As a solo developer, every feature is crafted with care, and your feedback is invaluable in shaping the future of HelloHub.
                                Join us on this journey to create a chat app that truly understands your needs.
                            </p>
                        </div>
                    </div>
                </section>
                <section id="cta" className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Join HelloHub Today</h2>
                                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                    Start chatting with your friends and family. Sign up now!
                                </p>
                            </div>
                            <div className="w-full max-w-sm space-y-2">
                                <form className="flex space-x-2" onSubmit={handleUpdate}>
                                    <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    {/* //TODO" Store Emails in Database */}
                                    <Button type="submit">Get Updates</Button>
                                </form>
                                <ToastContainer position="top-right" autoClose={3000} />
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    By signing up, you agree to our <a className="underline underline-offset-2" href="/terms">Terms & Conditions</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 HelloHub. All rights reserved.</p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <a className="text-xs hover:underline underline-offset-4" href="/terms">
                        Terms of Service
                    </a>
                    <a className="text-xs hover:underline underline-offset-4" href="/privacy">
                        Privacy
                    </a>
                </nav>
            </footer>
        </div>
    )
}

export default LandingPage