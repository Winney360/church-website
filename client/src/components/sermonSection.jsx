import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, Download, Archive, Mic } from "lucide-react";

export default function SermonSection() {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  const { data: sermons = [], isLoading } = useQuery({
    queryKey: ["/api/sermons"],
  });

  const approvedSermons = sermons.filter(sermon => sermon.isApproved);
  const featuredSermon = approvedSermons[0];
  const recentSermons = approvedSermons.slice(1, 4);

  const togglePlay = (sermonId) => {
    setCurrentlyPlaying(currentlyPlaying === sermonId ? null : sermonId);
  };

  if (isLoading) {
    return (
      <section id="sermons" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 bg-muted rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-muted rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-muted rounded-xl animate-pulse h-96"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 bg-muted rounded-lg animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="sermons" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">Recent Sermons</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Listen to our latest messages and grow in your faith journey with teachings from God's Word.
          </p>
        </div>

        {approvedSermons.length === 0 ? (
          <div className="text-center py-12" data-testid="no-sermons">
            <Mic className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No sermons available</h3>
            <p className="text-muted-foreground">Check back soon for new sermon recordings.</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Featured Sermon */}
            {featuredSermon && (
              <Card className="overflow-hidden">
                <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20">
                  {featuredSermon.thumbnailUrl ? (
                    <img 
                      src={featuredSermon.thumbnailUrl} 
                      alt={featuredSermon.title}
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Mic className="h-16 w-16 text-primary/40" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Button
                      size="lg"
                      className="bg-white/90 text-primary hover:bg-white w-16 h-16 rounded-full p-0"
                      onClick={() => togglePlay(featuredSermon.id)}
                      data-testid={`button-play-featured-${featuredSermon.id}`}
                    >
                      {currentlyPlaying === featuredSermon.id ? (
                        <Pause className="h-6 w-6" />
                      ) : (
                        <Play className="h-6 w-6 ml-1" />
                      )}
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                    <span>{new Date(featuredSermon.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{featuredSermon.duration}</span>
                    <span>•</span>
                    <span>{featuredSermon.pastor}</span>
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-3" data-testid="featured-sermon-title">
                    {featuredSermon.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {featuredSermon.description}
                  </p>
                  
                  {/* Audio Player */}
                  {featuredSermon.audioUrl && (
                    <div className="audio-player border border-border rounded-lg p-4">
                      <div className="flex items-center space-x-4">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => togglePlay(featuredSermon.id)}
                          data-testid={`button-play-audio-${featuredSermon.id}`}
                        >
                          {currentlyPlaying === featuredSermon.id ? (
                            <Pause className="h-4 w-4 text-primary" />
                          ) : (
                            <Play className="h-4 w-4 text-primary" />
                          )}
                        </Button>
                        <div className="flex-1">
                          <div className="h-2 bg-muted rounded-full">
                            <div className="h-2 bg-primary rounded-full w-1/3"></div>
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">15:23 / {featuredSermon.duration}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          data-testid={`button-download-${featuredSermon.id}`}
                        >
                          <Download className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Sermon List */}
            <div className="space-y-4">
              {recentSermons.map((sermon) => (
                <Card key={sermon.id} className="hover:bg-accent transition-colors" data-testid={`sermon-card-${sermon.id}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => togglePlay(sermon.id)}
                          data-testid={`button-play-${sermon.id}`}
                        >
                          {currentlyPlaying === sermon.id ? (
                            <Pause className="h-4 w-4 text-primary" />
                          ) : (
                            <Play className="h-4 w-4 text-primary" />
                          )}
                        </Button>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1" data-testid={`sermon-title-${sermon.id}`}>
                          {sermon.title}
                        </h4>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                          <span>{sermon.pastor}</span>
                          <span>•</span>
                          <span>{new Date(sermon.date).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{sermon.duration}</span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {sermon.description}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        data-testid={`button-options-${sermon.id}`}
                      >
                        <i className="fas fa-ellipsis-v text-muted-foreground"></i>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="text-center pt-4">
                <Link href="/sermons">
                  <Button 
                    variant="outline"
                    data-testid="button-browse-archive"
                  >
                    <Archive className="mr-2 h-4 w-4" />
                    Browse Sermon Archive
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
