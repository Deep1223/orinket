"use client"

import { useState } from "react"
import Link from "next/link"
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react"
import Header from "@/components/orinket/Header"
import Footer from "@/components/orinket/Footer"
import { font, fonts } from "@/lib/fonts"

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
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  const inputClass =
    `w-full rounded-xl border border-border/70 bg-white/90 py-3.5 pl-12 pr-4 text-sm text-foreground shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] outline-none transition-all placeholder:text-muted-foreground/70 focus:border-gold/60 focus:bg-white focus:shadow-[0_0_0_3px_rgba(180,140,60,0.12)] ${font('body')}`

  const inputClassNoIcon =
    `w-full rounded-xl border border-border/70 bg-white/90 px-4 py-3.5 text-sm text-foreground shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] outline-none transition-all placeholder:text-muted-foreground/70 focus:border-gold/60 focus:bg-white focus:shadow-[0_0_0_3px_rgba(180,140,60,0.12)] ${font('body')}`

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="relative flex flex-1 flex-col overflow-hidden">
        {/* Ambient background */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cream/90 via-background to-cream-dark/25"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-1/4 top-0 h-[min(70vh,520px)] w-[min(90vw,640px)] rounded-full opacity-[0.35] blur-3xl"
          style={{
            background: "radial-gradient(ellipse at center, color-mix(in oklab, var(--gold) 22%, transparent), transparent 65%)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-1/4 bottom-0 h-[min(50vh,400px)] w-[min(80vw,480px)] rounded-full opacity-25 blur-3xl"
          style={{
            background: "radial-gradient(ellipse at center, rgba(120,90,40,0.2), transparent 60%)",
          }}
          aria-hidden
        />

        <div className="relative z-[1] flex flex-1 items-center justify-center px-4 py-14 sm:py-20">
          <div className="w-full max-w-[440px]">
            {/* Card */}
            <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-b from-card via-card to-cream/30 shadow-[0_28px_64px_-24px_rgba(28,22,16,0.22),0_0_0_1px_rgba(255,255,255,0.6)_inset] ring-1 ring-black/[0.04]">
              <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gold/5 blur-2xl" aria-hidden />
              <div className="absolute -left-12 bottom-0 h-32 w-32 rounded-full bg-gold-dark/5 blur-2xl" aria-hidden />

              <div className="relative px-6 pb-10 pt-9 sm:px-10 sm:pt-11">
                <div className="mb-8 text-center">
                  <div className={`mb-4 inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gradient-to-r from-gold/10 to-cream/40 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-dark shadow-sm ${font('labels')}`}>
                    <Sparkles className="h-3 w-3 text-gold" strokeWidth={2} />
                    Orinket members
                  </div>
                  <h1 className="font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    {isLogin ? "Welcome back" : "Create your account"}
                  </h1>
                  <p className={`mt-2 text-sm leading-relaxed text-muted-foreground ${font('body')}`}>
                    {isLogin
                      ? "Sign in to track orders, wishlists, and exclusive offers."
                      : "Join for early access to drops and member-only benefits."}
                  </p>
                </div>

                {/* Tabs */}
                <div className="mb-8 flex rounded-full border border-border/60 bg-cream/50 p-1 shadow-inner">
                  <button
                    type="button"
                    onClick={() => setIsLogin(true)}
                    className={`relative flex-1 rounded-full py-3 text-center text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${font('buttons')} ${
                      isLogin
                        ? "bg-white text-foreground shadow-[0_4px_14px_-4px_rgba(40,32,24,0.2)] ring-1 ring-black/[0.06]"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsLogin(false)}
                    className={`relative flex-1 rounded-full py-3 text-center text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${font('buttons')} ${
                      !isLogin
                        ? "bg-white text-foreground shadow-[0_4px_14px_-4px_rgba(40,32,24,0.2)] ring-1 ring-black/[0.06]"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Register
                  </button>
                </div>

                {isLogin ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className={`mb-2 block text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/80 ${fonts.labels}`}>
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground/80" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className={inputClass}
                          placeholder="your@email.com"
                          autoComplete="email"
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`mb-2 block text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/80 ${fonts.labels}`}>
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground/80" />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          className={`${inputClass} pr-12`}
                          placeholder="Enter your password"
                          autoComplete="current-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-cream/80 hover:text-foreground"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                      <label className="flex cursor-pointer items-center gap-2.5">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-border text-gold focus:ring-gold/30"
                        />
                        <span className={`text-sm text-foreground/90 ${font('body')}`}>
                          Remember me
                        </span>
                      </label>
                      <Link
                        href="/account/forgot-password"
                        className={`text-sm font-medium text-gold-dark underline-offset-4 transition-colors hover:text-foreground hover:underline ${font('body')}`}
                      >
                        Forgot password?
                      </Link>
                    </div>

                    <button
                      type="submit"
                      className={`group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-foreground via-stone-800 to-stone-900 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-[0_12px_28px_-8px_rgba(25,18,14,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-8px_rgba(25,18,14,0.55)] active:translate-y-0 ${font('buttons')}`}
                    >
                      Sign in
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={`mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/80 ${font('labels')}`}>
                          First name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className={inputClassNoIcon}
                          autoComplete="given-name"
                        />
                      </div>
                      <div>
                        <label className={`mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/80 ${font('labels')}`}>
                          Last name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className={inputClassNoIcon}
                          autoComplete="family-name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`mb-2 block text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/80 ${fonts.labels}`}>
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground/80" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className={inputClass}
                          placeholder="your@email.com"
                          autoComplete="email"
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`mb-2 block text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/80 ${fonts.labels}`}>
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground/80" />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          className={`${inputClass} pr-12`}
                          placeholder="Create a password"
                          autoComplete="new-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-cream/80 hover:text-foreground"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className={`mb-2 block text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/80 ${fonts.labels}`}>
                        Confirm password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground/80" />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required
                          className={inputClass}
                          placeholder="Confirm your password"
                          autoComplete="new-password"
                        />
                      </div>
                    </div>

                    <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed">
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 shrink-0 rounded border-border text-gold focus:ring-gold/30"
                        required
                      />
                      <span className={`text-muted-foreground ${font('body')}`}>
                        I agree to the{" "}
                        <Link href="/terms" className="font-medium text-gold-dark underline-offset-4 hover:underline">
                          Terms
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="font-medium text-gold-dark underline-offset-4 hover:underline">
                          Privacy Policy
                        </Link>
                        .
                      </span>
                    </label>

                    <button
                      type="submit"
                      className={`group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold via-gold to-gold-dark py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-[0_12px_28px_-8px_rgba(140,100,40,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-8px_rgba(120,85,35,0.5)] active:translate-y-0 ${font('buttons')}`}
                    >
                      Create account
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </form>
                )}

                {isLogin && (
                  <p className={`mt-8 text-center text-xs text-muted-foreground ${font('body')}`}>
                    New here?{" "}
                    <button
                      type="button"
                      onClick={() => setIsLogin(false)}
                      className="font-semibold text-foreground underline-offset-4 hover:underline"
                    >
                      Create an account
                    </button>
                  </p>
                )}
                {!isLogin && (
                  <p className={`mt-8 text-center text-xs text-muted-foreground ${font('body')}`}>
                    Already a member?{" "}
                    <button
                      type="button"
                      onClick={() => setIsLogin(true)}
                      className="font-semibold text-foreground underline-offset-4 hover:underline"
                    >
                      Sign in
                    </button>
                  </p>
                )}

                {/* Divider */}
                <div className="relative mt-10">
                  <div className="absolute inset-0 flex items-center" aria-hidden>
                    <div className="w-full border-t border-border/60" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className={`bg-gradient-to-r from-transparent via-card to-transparent px-4 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground ${font('labels')}`}>
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className={`flex items-center justify-center gap-2 rounded-xl border border-border/60 bg-white/70 py-3.5 text-sm shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold/35 hover:bg-white hover:shadow-md ${font('buttons')}`}
                  >
                    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden>
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </button>
                  <button
                    type="button"
                    className={`flex items-center justify-center gap-2 rounded-xl border border-border/60 bg-white/70 py-3.5 text-sm shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold/35 hover:bg-white hover:shadow-md ${font('buttons')}`}
                  >
                    <svg className="h-5 w-5 shrink-0 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                    Facebook
                  </button>
                </div>
              </div>
            </div>

            <p className={`mt-8 text-center text-[11px] leading-relaxed text-muted-foreground/90 ${font('body')}`}>
              Secure checkout · Encrypted connection · Orinket never shares your data
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
