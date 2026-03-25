"use client"

import { useState } from "react"
import Link from "next/link"
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react"
import Header from "@/components/orinket/Header"
import Footer from "@/components/orinket/Footer"

export default function AccountPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login/signup
    console.log("Form submitted:", formData)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md mx-auto px-4">
          {/* Tabs */}
          <div className="flex border-b border-border mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-4 text-center font-[family-name:var(--font-nunito)] tracking-wider transition-colors ${
                isLogin 
                  ? "text-foreground border-b-2 border-gold" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              LOGIN
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-4 text-center font-[family-name:var(--font-nunito)] tracking-wider transition-colors ${
                !isLogin 
                  ? "text-foreground border-b-2 border-gold" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              REGISTER
            </button>
          </div>

          {isLogin ? (
            /* Login Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-[family-name:var(--font-nunito)] text-foreground mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-12 pr-4 py-3 border border-border bg-white font-[family-name:var(--font-nunito)] text-sm focus:outline-none focus:border-gold"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-[family-name:var(--font-nunito)] text-foreground mb-2">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-12 pr-12 py-3 border border-border bg-white font-[family-name:var(--font-nunito)] text-sm focus:outline-none focus:border-gold"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <Eye className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-gold" />
                  <span className="text-sm font-[family-name:var(--font-nunito)] text-foreground">
                    Remember me
                  </span>
                </label>
                <Link 
                  href="/account/forgot-password" 
                  className="text-sm font-[family-name:var(--font-nunito)] text-gold-dark hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-foreground text-white font-[family-name:var(--font-nunito)] tracking-wider hover:bg-gold-dark transition-colors flex items-center justify-center gap-2"
              >
                LOGIN
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          ) : (
            /* Register Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-[family-name:var(--font-nunito)] text-foreground mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-border bg-white font-[family-name:var(--font-nunito)] text-sm focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-[family-name:var(--font-nunito)] text-foreground mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-border bg-white font-[family-name:var(--font-nunito)] text-sm focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-[family-name:var(--font-nunito)] text-foreground mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-12 pr-4 py-3 border border-border bg-white font-[family-name:var(--font-nunito)] text-sm focus:outline-none focus:border-gold"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-[family-name:var(--font-nunito)] text-foreground mb-2">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-12 pr-12 py-3 border border-border bg-white font-[family-name:var(--font-nunito)] text-sm focus:outline-none focus:border-gold"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <Eye className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-[family-name:var(--font-nunito)] text-foreground mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-12 pr-4 py-3 border border-border bg-white font-[family-name:var(--font-nunito)] text-sm focus:outline-none focus:border-gold"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>

              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-gold mt-1" required />
                <span className="text-sm font-[family-name:var(--font-nunito)] text-foreground">
                  I agree to the{" "}
                  <Link href="/terms" className="text-gold-dark hover:underline">Terms & Conditions</Link>
                  {" "}and{" "}
                  <Link href="/privacy" className="text-gold-dark hover:underline">Privacy Policy</Link>
                </span>
              </label>

              <button
                type="submit"
                className="w-full py-4 bg-foreground text-white font-[family-name:var(--font-nunito)] tracking-wider hover:bg-gold-dark transition-colors flex items-center justify-center gap-2"
              >
                CREATE ACCOUNT
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          )}

          {/* Social Login */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white font-[family-name:var(--font-nunito)] text-muted-foreground">
                  or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-3 border border-border hover:border-gold transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="font-[family-name:var(--font-nunito)] text-sm">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 py-3 border border-border hover:border-gold transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
                <span className="font-[family-name:var(--font-nunito)] text-sm">Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

