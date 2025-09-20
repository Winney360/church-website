import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarPlus, Play, Clock } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="gradient-hero py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="font-serif text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Welcome to Our<br />
              <span className="text-yellow-200">Community</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Join us in worship, fellowship, and service as we grow together in faith and love. 
              Everyone is welcome in God's house.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/events">
                <Button 
                  size="lg"
                  className="bg-white text-primary font-semibold hover:bg-gray-100 transition-colors"
                  data-testid="button-join-sunday"
                >
                  <CalendarPlus className="mr-2 h-5 w-5" />
                  Join Us This Sunday
                </Button>
              </Link>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-white font-semibold hover:bg-white hover:text-primary transition-colors"
                data-testid="button-watch-online"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Online
              </Button>
            </div>
          </div>
          
          <div className="relative">
            {/* Church interior image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1507692049790-de58290a4334?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Beautiful church interior with stained glass windows" 
                className="w-full h-auto" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Service Times Card */}
            <Card className="absolute -bottom-6 -left-6 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-semibold text-card-foreground mb-3">Service Times</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Sunday: 9:00 AM & 11:00 AM</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Wednesday: 7:00 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
