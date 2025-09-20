import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Loader2 } from "lucide-react";

const eventCategories = [
  { id: "", label: "All Events" },
  { id: "worship", label: "Worship" },
  { id: "fellowship", label: "Fellowship" },
  { id: "community", label: "Community" },
  { id: "youth", label: "Youth" }
];

export default function UpcomingEvents() {
  const [activeCategory, setActiveCategory] = useState("");

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["/api/events"],
  });

  const filteredEvents = events
    .filter(event => event.isApproved)
    .filter(event => !activeCategory || event.category === activeCategory)
    .slice(0, 6);

  return (
    <section id="events" className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">Upcoming Events</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Stay connected with our community through worship services, special events, and fellowship opportunities.
          </p>
        </div>

        {/* Event Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {eventCategories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className="font-medium"
              data-testid={`filter-${category.id || 'all'}`}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Events Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="calendar-event p-4 text-center text-white">
                  <div className="w-8 h-8 bg-white/20 rounded mx-auto mb-2"></div>
                  <div className="w-16 h-4 bg-white/20 rounded mx-auto"></div>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-full"></div>
                    <div className="h-3 bg-muted rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-12" data-testid="no-events">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No upcoming events</h3>
            <p className="text-muted-foreground">
              {activeCategory ? "Try selecting a different category." : "Check back soon for new events."}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="card-hover" data-testid={`event-card-${event.id}`}>
                <div className="calendar-event p-4 text-center text-white">
                  <div className="text-2xl font-bold">
                    {new Date(event.date).getDate()}
                  </div>
                  <div className="text-sm opacity-90">
                    {new Date(event.date).toLocaleDateString("en-US", { month: "long" })}
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                    <i className="fas fa-tag"></i>
                    <span className="capitalize">{event.category}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2" data-testid={`event-title-${event.id}`}>
                    {event.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {event.description}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center">
          <Link href="/events">
            <Button 
              size="lg"
              data-testid="button-view-all-events"
            >
              <Calendar className="mr-2 h-5 w-5" />
              View Full Calendar
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
