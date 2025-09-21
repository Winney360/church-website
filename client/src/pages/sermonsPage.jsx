import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import NavigationHeader from "@/components/navigationHeader";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Play, Pause, Download, Search, Plus, Mic } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertSermonSchema } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/useToast";

export default function SermonsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  const { data: sermons = [], isLoading } = useQuery({
    queryKey: ["/api/sermons"],
  });

  const form = useForm({
    resolver: zodResolver(insertSermonSchema),
    defaultValues: {
      title: "",
      description: "",
      pastor: "",
      date: "",
      duration: "",
      audioUrl: "",
      thumbnailUrl: "",
    },
  });

  const createSermonMutation = useMutation({
    mutationFn: async (data) => {
      const res = await apiRequest("POST", "/api/sermons", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sermons"] });
      setShowCreateDialog(false);
      form.reset();
      toast({
        title: "Sermon created",
        description: "Your sermon has been submitted for approval.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const filteredSermons = sermons.filter((sermon) => {
    const searchLower = searchTerm.toLowerCase();
    return sermon.isApproved && (
      sermon.title.toLowerCase().includes(searchLower) ||
      sermon.pastor.toLowerCase().includes(searchLower) ||
      sermon.description.toLowerCase().includes(searchLower)
    );
  });

  const canCreateSermons = user?.role === "admin" || user?.role === "coordinator";

  const onSubmit = (data) => {
    createSermonMutation.mutate(data);
  };

  const togglePlay = (sermonId) => {
    setCurrentlyPlaying(currentlyPlaying === sermonId ? null : sermonId);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold mb-2">Sermon Library</h1>
            <p className="text-muted-foreground">Listen to our latest messages and grow in faith</p>
          </div>
          
          {canCreateSermons && (
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button data-testid="button-create-sermon">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Sermon
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Add New Sermon</DialogTitle>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Sermon Title</Label>
                    <Input
                      id="title"
                      data-testid="input-sermon-title"
                      {...form.register("title")}
                      className="mt-1"
                    />
                    {form.formState.errors.title && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.title.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      data-testid="input-sermon-description"
                      {...form.register("description")}
                      className="mt-1"
                      rows={3}
                    />
                    {form.formState.errors.description && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.description.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="pastor">Pastor</Label>
                      <Input
                        id="pastor"
                        data-testid="input-sermon-pastor"
                        {...form.register("pastor")}
                        className="mt-1"
                      />
                      {form.formState.errors.pastor && (
                        <p className="text-sm text-destructive mt-1">
                          {form.formState.errors.pastor.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        data-testid="input-sermon-date"
                        type="date"
                        {...form.register("date")}
                        className="mt-1"
                      />
                      {form.formState.errors.date && (
                        <p className="text-sm text-destructive mt-1">
                          {form.formState.errors.date.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      data-testid="input-sermon-duration"
                      {...form.register("duration")}
                      placeholder="e.g., 45 minutes"
                      className="mt-1"
                    />
                    {form.formState.errors.duration && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.duration.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="audioUrl">Audio URL</Label>
                    <Input
                      id="audioUrl"
                      data-testid="input-sermon-audio-url"
                      {...form.register("audioUrl")}
                      placeholder="https://..."
                      className="mt-1"
                    />
                    {form.formState.errors.audioUrl && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.audioUrl.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="thumbnailUrl">Thumbnail URL (Optional)</Label>
                    <Input
                      id="thumbnailUrl"
                      data-testid="input-sermon-thumbnail-url"
                      {...form.register("thumbnailUrl")}
                      placeholder="https://..."
                      className="mt-1"
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowCreateDialog(false)}
                      data-testid="button-cancel-sermon"
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit"
                      disabled={createSermonMutation.isPending}
                      data-testid="button-submit-sermon"
                    >
                      {createSermonMutation.isPending ? "Adding..." : "Add Sermon"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search sermons by title, pastor, or topic..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-testid="input-search-sermons"
          />
        </div>

        {/* Featured Sermon */}
        {filteredSermons.length > 0 && (
          <Card className="mb-8">
            <div className="grid lg:grid-cols-2 gap-6 p-6">
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg overflow-hidden">
                  {filteredSermons[0].thumbnailUrl ? (
                    <img 
                      src={filteredSermons[0].thumbnailUrl} 
                      alt={filteredSermons[0].title}
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
                      onClick={() => togglePlay(filteredSermons[0].id)}
                      data-testid={`button-play-featured-${filteredSermons[0].id}`}
                    >
                      {currentlyPlaying === filteredSermons[0].id ? (
                        <Pause className="h-6 w-6" />
                      ) : (
                        <Play className="h-6 w-6 ml-1" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                  <span>{new Date(filteredSermons[0].date).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{filteredSermons[0].duration}</span>
                  <span>•</span>
                  <span>{filteredSermons[0].pastor}</span>
                </div>
                <h2 className="font-serif text-2xl font-semibold mb-3" data-testid={`featured-sermon-title`}>
                  {filteredSermons[0].title}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {filteredSermons[0].description}
                </p>

                {/* Audio Player */}
                {filteredSermons[0].audioUrl && (
                  <div className="audio-player border border-border rounded-lg p-4">
                    <div className="flex items-center space-x-4">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => togglePlay(filteredSermons[0].id)}
                        data-testid={`button-play-audio-${filteredSermons[0].id}`}
                      >
                        {currentlyPlaying === filteredSermons[0].id ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                      <div className="flex-1">
                        <div className="h-2 bg-muted rounded-full">
                          <div className="h-2 bg-primary rounded-full w-1/3"></div>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">0:00 / {filteredSermons[0].duration}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        data-testid={`button-download-${filteredSermons[0].id}`}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* Sermon List */}
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-muted rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                      <div className="h-3 bg-muted rounded w-full"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredSermons.length === 0 ? (
          <div className="text-center py-12" data-testid="no-sermons">
            <Mic className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No sermons found</h3>
            <p className="text-muted-foreground">
              {searchTerm ? "Try adjusting your search terms." : "Check back soon for new sermons."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-semibold mb-4">All Sermons</h3>
            {filteredSermons.slice(1).map((sermon) => (
              <Card key={sermon.id} className="hover:bg-accent transition-colors" data-testid={`sermon-card-${sermon.id}`}>
                <CardContent className="p-6">
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
                      data-testid={`button-download-sermon-${sermon.id}`}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
