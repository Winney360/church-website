import NavigationHeader from "@/components/navigationHeader";
import HeroSection from "@/components/heroSection";
import UpcomingEvents from "@/components/upcomingEvents";
import SermonSection from "@/components/sermonSection";
import CommunityGroups from "@/components/communityGroups";
import GallerySection from "@/components/gallerySection";
import ContactSection from "@/components/contactSection";
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
