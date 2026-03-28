"use client"

import { useState } from "react"
import Link from "next/link"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"
import Header from "@/components/orinket/Header"
import Footer from "@/components/orinket/Footer"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md mx-auto px-4">
          {/* Back Link */}
          <Link 
            href="/account" 
            className="inline-flex items-center gap-2 text-sm font-[family-name:var(--font-nunito)] text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>

          {!isSubmitted ? (
            <>
              <h1 className="text-2xl md:text-3xl font-semibold font-[family-name:var(--font-nunito)] text-foreground mb-4">
                Forgot Password?
              </h1>
              <p className="text-muted-foreground font-[family-name:var(--font-nunito)] mb-8">
                No worries! Enter your email address and we'll send you a link to reset your password.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-[family-name:var(--font-nunito)] text-foreground mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-12 pr-4 py-3 border border-border bg-white font-[family-name:var(--font-nunito)] text-sm focus:outline-none focus:border-gold"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-foreground text-white font-[family-name:var(--font-nunito)] tracking-wider hover:bg-gold-dark transition-colors"
                >
                  SEND RESET LINK
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-2xl md:text-3xl font-semibold font-[family-name:var(--font-nunito)] text-foreground mb-4">
                Check Your Email
              </h1>
              <p className="text-muted-foreground font-[family-name:var(--font-nunito)] mb-8">
                We've sent a password reset link to <strong>{email}</strong>. Please check your inbox and follow the instructions.
              </p>
              <Link
                href="/account"
                className="inline-flex px-8 py-4 bg-foreground text-white font-[family-name:var(--font-nunito)] tracking-wider hover:bg-gold-dark transition-colors"
              >
                BACK TO LOGIN
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

