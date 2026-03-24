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

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <Header />

      {/* 1. Hero Slider */}
      <HeroSlider />

      {/* 2. Everyday Demi-Fine Jewellery */}
      <DemifineSection />

      {/* 3. Orinket Top Styles */}
      <TopStyles />

      {/* 4. Discount Banner */}
      <DiscountBanner />

      {/* 5. Shop By Recipient */}
      <ShopByRecipient />

      {/* 6. For Every You */}
      <ForEveryYou />

      {/* 7. 9KT Fine Gold */}
      <FineGold />

      {/* 8. Because You Deserve To Shine */}
      <DeserveToShine />

      {/* 9. From Founder, For You */}
      <FounderMessage />

      {/* 10. Blogs */}
      <BlogSection />

      {/* 11. Shop With Confidence */}
      <ShopWithConfidence />

      {/* 12. Visit Our Stores */}
      <VisitStores />

      {/* 13. The Orinket Story */}
      <BrandStory />

      {/* 14. Trusted by Our Community (Reviews) */}
      <Reviews />

      {/* 15. Buy Everyday Demi-Fine Jewellery CTA */}
      <CTABanner />

      {/* Footer */}
      <Footer />
    </main>
  )
}
