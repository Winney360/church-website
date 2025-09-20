import NavigationHeader from "@/components/navigation-header";
import HeroSection from "@/components/hero-section";
import UpcomingEvents from "@/components/upcoming-events";
import SermonSection from "@/components/sermon-section";
import CommunityGroups from "@/components/community-groups";
import GallerySection from "@/components/gallery-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <HeroSection />
      <UpcomingEvents />
      <SermonSection />
      <CommunityGroups />
      <GallerySection />
      <ContactSection />
      <Footer />
    </div>
  );
}
