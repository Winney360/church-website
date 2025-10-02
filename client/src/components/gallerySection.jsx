import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Images, Play } from "lucide-react";

const galleryItems = [
  {
    id: "1",
    title: "Christmas Service Preparation",
    category: "recent",
    imageUrl: "https://images.unsplash.com/photo-1544531587-bdd4242c46c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    isVideo: false
  },
  {
    id: "2",
    title: "Community Service Event",
    category: "service",
    imageUrl: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    isVideo: false
  },
  {
    id: "3",
    title: "Youth Group Activities",
    category: "youth",
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    isVideo: false
  },
  {
    id: "4",
    title: "Sunday Service Highlights",
    category: "worship",
    imageUrl: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    isVideo: true
  },
  {
    id: "5",
    title: "Fellowship Meal",
    category: "fellowship",
    imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    isVideo: false
  },
  {
    id: "6",
    title: "Children's Ministry",
    category: "youth",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    isVideo: false
  }
];

const galleryTabs = [
  { id: "recent", label: "Recent Events" },
  { id: "worship", label: "Worship" },
  { id: "service", label: "Community Service" },
  { id: "youth", label: "Youth Activities" }
];

export default function GallerySection() {
  const [activeTab, setActiveTab] = useState("recent");

  const filteredItems = activeTab === "recent" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeTab);

  return (
    <section className="py-16 my-5 border border-green-500 dark:border-zinc-100 rounded-lg bg-orange-acccent text-zinc-800 dark:bg-zinc-900 dark:text-zinc-100" >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
           <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4 text-green-500 dark:text">
             <span 
               className="inline-block animate-bounce" 
               style={{ animationDuration: '1.2s', animationTimingFunction: 'ease' }}
              >
                Community Gallery
             </span>
           </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Memories from our services, events, and fellowship activities that bring our community together.
          </p>
        </div>

        {/* Gallery Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <Button
            variant={activeTab === "recent" ? "default" : "outline"}
            onClick={() => setActiveTab("recent")}
            className={`
                font-medium border-2 
                ${activeTab === "recent" 
                ? " text-zinc-100 dark:bg-zinc-800 bg-green-700 dark:text-zinc-100 "   
                : "bg-green-600 text-zinc-100 border-amber-400 hover:bg-green-700 dark:bg-zinc-800 dark:border dark:hover:bg-zinc-900"} 
               `}
            data-testid="tab-recent"
          >
            Recent Events
          </Button>
          {galleryTabs.slice(1).map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              onClick={() => setActiveTab(tab.id)}
               className={`
                font-medium border-2 
                ${activeTab === tab.id 
                ? " text-zinc-100 dark:bg-zinc-800 bg-green-700 dark:text-zinc-100 "   
                : "bg-green-600 text-zinc-100 border-amber-400 hover:bg-green-700 dark:bg-zinc-800 dark:border dark:hover:bg-zinc-900"} 
               `}
              data-testid={`tab-${tab.id}`}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className={`relative bg-muted rounded-xl overflow-hidden group cursor-pointer ${
                index === 3 ? "col-span-2" : "aspect-square"
              }`}
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
                <Badge className="absolute top-4 left-4 bg-red-600 text-zinc-800">
                  VIDEO
                </Badge>
              )}
              
              {index === 3 && (
                <div className="absolute bottom-4 left-4 text-zinc-800">
                  <p className="font-medium">{item.title}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-8 text-amber-600 dark:text-emerald-200 bg-green-500/15 hover:bg-green-500/25">
          <Link href="/gallery">
            <Button 
              size="lg"
              data-testid="button-view-full-gallery"
            >
              <Images className="mr-2 h-5 w-5" />
             <span>View Full Gallery</span> 
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
