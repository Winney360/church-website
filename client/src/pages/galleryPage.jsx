import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import NavigationHeader from "@/components/navigationHeader";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Images, Play, X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryCategories = [
  { id: "all", label: "All Photos", count: 24 },
  { id: "recent", label: "Recent Events", count: 8 },
  { id: "worship", label: "Worship Services", count: 6 },
  { id: "service", label: "Community Service", count: 5 },
  { id: "youth", label: "Youth Activities", count: 5 }
];

// Mock gallery data - in real app this would come from the API
const mockGalleryItems = [
  {
    id: "1",
    title: "Christmas Service Preparation",
    category: "recent",
    imageUrl: "https://images.unsplash.com/photo-1544531587-bdd4242c46c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isVideo: false,
    date: "2024-12-10"
  },
  {
    id: "2",
    title: "Community Food Drive",
    category: "service",
    imageUrl: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isVideo: false,
    date: "2024-12-05"
  },
  {
    id: "3",
    title: "Youth Group Activities",
    category: "youth",
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isVideo: false,
    date: "2024-12-03"
  },
  {
    id: "4",
    title: "Sunday Service Highlights",
    category: "worship",
    imageUrl: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isVideo: true,
    date: "2024-12-01"
  },
  {
    id: "5",
    title: "Baptism Ceremony",
    category: "worship",
    imageUrl: "https://images.unsplash.com/photo-1507692049790-de58290a4334?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isVideo: false,
    date: "2024-11-28"
  },
  {
    id: "6",
    title: "Fellowship Meal",
    category: "recent",
    imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isVideo: false,
    date: "2024-11-25"
  },
  {
    id: "7",
    title: "Children's Ministry",
    category: "youth",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isVideo: false,
    date: "2024-11-20"
  },
  {
    id: "8",
    title: "Thanksgiving Service",
    category: "worship",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    isVideo: false,
    date: "2024-11-22"
  }
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // In a real app, this would fetch from the API
  const { data: galleryItems = mockGalleryItems, isLoading } = useQuery({
    queryKey: ["/api/gallery"],
    queryFn: () => Promise.resolve(mockGalleryItems),
  });

  const filteredItems = selectedCategory === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const openLightbox = (item, index) => {
    setSelectedImage(item);
    setCurrentImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setCurrentImageIndex(0);
  };

  const navigateImage = (direction) => {
    const newIndex = direction === "next" 
      ? (currentImageIndex + 1) % filteredItems.length
      : (currentImageIndex - 1 + filteredItems.length) % filteredItems.length;
    
    setCurrentImageIndex(newIndex);
    setSelectedImage(filteredItems[newIndex]);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Images className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-6">
            Community Gallery
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Memories from our services, events, and fellowship activities that bring our community together. 
            Witness the joy, faith, and love that defines our church family.
          </p>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-8 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {galleryCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center space-x-2"
                data-testid={`filter-${category.id}`}
              >
                <span>{category.label}</span>
                <Badge variant="secondary" className="ml-2">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-square bg-muted rounded-xl animate-pulse"></div>
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-12" data-testid="no-gallery-items">
              <Images className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No photos found</h3>
              <p className="text-muted-foreground">
                Try selecting a different category to view more photos.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  className="relative aspect-square bg-muted rounded-xl overflow-hidden group cursor-pointer"
                  onClick={() => openLightbox(item, index)}
                  data-testid={`gallery-item-${item.id}`}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    {item.isVideo ? (
                      <Play className="text-zinc-800 text-3xl" />
                    ) : (
                      <Images className="text-zinc-800 text-2xl" />
                    )}
                  </div>
                  
                  {item.isVideo && (
                    <Badge className="absolute top-2 left-2 bg-red-600 text-zinc-800">
                      VIDEO
                    </Badge>
                  )}
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <p className="text-zinc-800 font-medium text-sm">{item.title}</p>
                    <p className="text-zinc-800/80 text-xs">
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <Dialog open={!!selectedImage} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-4xl w-full p-0 bg-black/95">
          <div className="relative">
            {selectedImage && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 z-10 text-zinc-800 hover:bg-white/20"
                  onClick={closeLightbox}
                  data-testid="button-close-lightbox"
                >
                  <X className="h-6 w-6" />
                </Button>
                
                <div className="relative">
                  <img
                    src={selectedImage.imageUrl}
                    alt={selectedImage.title}
                    className="w-full h-auto max-h-[80vh] object-contain"
                    data-testid="lightbox-image"
                  />
                  
                  {filteredItems.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-800 hover:bg-white/20"
                        onClick={() => navigateImage("prev")}
                        data-testid="button-prev-image"
                      >
                        <ChevronLeft className="h-8 w-8" />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-800 hover:bg-white/20"
                        onClick={() => navigateImage("next")}
                        data-testid="button-next-image"
                      >
                        <ChevronRight className="h-8 w-8" />
                      </Button>
                    </>
                  )}
                </div>
                
                <div className="p-6 text-zinc-800">
                  <h3 className="text-xl font-semibold mb-2" data-testid="lightbox-title">
                    {selectedImage.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-zinc-800/80">
                    <span>{new Date(selectedImage.date).toLocaleDateString()}</span>
                    <Badge variant="outline" className="text-zinc-800 border-white/30">
                      {selectedImage.category}
                    </Badge>
                    <span>
                      {currentImageIndex + 1} of {filteredItems.length}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
