import Header from "@/components/orinket/Header"
import HeroSlider from "@/components/orinket/HeroSlider"
import DemifineSection from "@/components/orinket/DemifineSection"
import TopStyles from "@/components/orinket/TopStyles"
import DiscountBanner from "@/components/orinket/DiscountBanner"
import ShopByRecipient from "@/components/orinket/ShopByRecipient"
import ForEveryYou from "@/components/orinket/ForEveryYou"
import FineGold from "@/components/orinket/FineGold"
import DeserveToShine from "@/components/orinket/DeserveToShine"
import FounderMessage from "@/components/orinket/FounderMessage"
import BlogSection from "@/components/orinket/BlogSection"
import ShopWithConfidence from "@/components/orinket/ShopWithConfidence"
import VisitStores from "@/components/orinket/VisitStores"
import BrandStory from "@/components/orinket/BrandStory"
import Reviews from "@/components/orinket/Reviews"
import CTABanner from "@/components/orinket/CTABanner"
import Footer from "@/components/orinket/Footer"
import AnimatedSection from "@/components/orinket/AnimatedSection"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <Header />

      {/* 1. Hero Slider */}
      <HeroSlider />

      {/* 2. Everyday Demi-Fine Jewellery */}
      <AnimatedSection animation="slideUp" delay={50}>
        <DemifineSection />
      </AnimatedSection>

      {/* 3. Orinket Top Styles */}
      <AnimatedSection animation="slideInLeft" delay={100}>
        <TopStyles />
      </AnimatedSection>

      {/* 4. Discount Banner */}
      <AnimatedSection animation="scaleIn" delay={150}>
        <DiscountBanner />
      </AnimatedSection>

      {/* 5. Shop By Recipient */}
      <AnimatedSection animation="slideInRight" delay={200}>
        <ShopByRecipient />
      </AnimatedSection>

      {/* 6. For Every You */}
      <AnimatedSection animation="slideUp" delay={250}>
        <ForEveryYou />
      </AnimatedSection>

      {/* 7. 9KT Fine Gold */}
      <AnimatedSection animation="fadeIn" delay={300}>
        <FineGold />
      </AnimatedSection>

      {/* 8. Because You Deserve To Shine */}
      <AnimatedSection animation="slideInLeft" delay={350}>
        <DeserveToShine />
      </AnimatedSection>

      {/* 9. From Founder, For You */}
      <AnimatedSection animation="fadeIn" delay={400}>
        <FounderMessage />
      </AnimatedSection>

      {/* 10. Blogs */}
      <AnimatedSection animation="slideInRight" delay={450}>
        <BlogSection />
      </AnimatedSection>

      {/* 11. Shop With Confidence */}
      <AnimatedSection animation="slideUp" delay={500}>
        <ShopWithConfidence />
      </AnimatedSection>

      {/* 12. Visit Our Stores */}
      <AnimatedSection animation="scaleIn" delay={550}>
        <VisitStores />
      </AnimatedSection>

      {/* 13. The Orinket Story */}
      <AnimatedSection animation="fadeIn" delay={600}>
        <BrandStory />
      </AnimatedSection>

      {/* 14. Trusted by Our Community (Reviews) */}
      <AnimatedSection animation="slideInLeft" delay={650}>
        <Reviews />
      </AnimatedSection>

      {/* 15. Buy Everyday Demi-Fine Jewellery CTA */}
      <AnimatedSection animation="scaleIn" delay={700}>
        <CTABanner />
      </AnimatedSection>

      {/* Footer */}
      <AnimatedSection animation="fadeIn" delay={750}>
        <Footer />
      </AnimatedSection>
    </main>
  )
}

