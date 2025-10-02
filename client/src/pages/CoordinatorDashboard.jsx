// pages/CoordinatorDashboard.jsx
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import NavigationHeader from "@/components/navigationHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Book, CheckCircle, XCircle, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/useToast";

export default function CoordinatorDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch coordinator’s own events & sermons
  
const { data: myEvents = [], isLoading: eventsLoading, error: eventsError } = useQuery({
  queryKey: ["/api/coordinator/my-events"],
  onError: (error) => {
    toast({ title: "Error loading events", description: error.message, variant: "destructive" });
  },
});

const { data: mySermons = [], isLoading: sermonsLoading, error: sermonsError } = useQuery({
  queryKey: ["/api/coordinator/my-sermons"],
  onError: (error) => {
    toast({ title: "Error loading sermons", description: error.message, variant: "destructive" });
  },
});


  // Create Event
  const createEventMutation = useMutation({
    mutationFn: async (eventData) => {
      const res = await apiRequest("POST", `/api/coordinator/create-event`, eventData);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/coordinator/my-events"] });
      toast({ title: "Event submitted", description: "Your event is pending admin approval." });
    },
    onError: (error) => {
    toast({ title: "Error creating event", description: error.message, variant: "destructive" });
  },
  });

  // Create Sermon
  const createSermonMutation = useMutation({
    mutationFn: async (sermonData) => {
      const res = await apiRequest("POST", `/api/coordinator/create-sermon`, sermonData);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/coordinator/my-sermons"] });
      toast({ title: "Sermon submitted", description: "Your sermon is pending admin approval." });
    },
    onError: (error) => {
    toast({ title: "Error creating Sermon", description: error.message, variant: "destructive" });
  },
  });

  if (user?.role !== "coordinator") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Only coordinators can access this dashboard.</p>
      </div>
    );
    const deleteEventMutation = useMutation({
      mutationFn: async (id) => {
       const res = await apiRequest("DELETE", `/api/coordinator/event/${id}`);
       return res.json();
     },
     onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ["/api/coordinator/my-events"] });
       toast({ title: "Event deleted" });
     },
    onError: (error) => {
       toast({ title: "Error deleting event", description: error.message, variant: "destructive" });
     },
   });
 }

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold mb-2">Coordinator Dashboard</h1>
          <p className="text-muted-foreground">Welcome, {user.username}. Manage your events and sermons here.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">My Events</p>
                  <p className="text-2xl font-bold text-primary">{myEvents.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">My Sermons</p>
                  <p className="text-2xl font-bold text-secondary">{mySermons.length}</p>
                </div>
                <Book className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Approvals</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {myEvents.filter(e => !e.approved).length + mySermons.filter(s => !s.approved).length}
                  </p>
                </div>
                <XCircle className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="events" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="events">My Events</TabsTrigger>
            <TabsTrigger value="sermons">My Sermons</TabsTrigger>
          </TabsList>

          {/* Events */}
          <TabsContent value="events" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>My Events</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                 size="sm"
                 className="mb-4 bg-primary hover:bg-primary/90"
                 onClick={() => {
                   const title = prompt("Event Title:");
                   const description = prompt("Event Description:");
                   if (!title || !description) return;
                   createEventMutation.mutate({
                    title,
                    description,
                    date: new Date().toISOString(),
                    location: "Church Hall",
                  });
                }}
                >
                 <PlusCircle className="h-4 w-4 mr-1" />
                  Create Event
                 </Button>


                {eventsLoading ? (
                 <p className="text-muted-foreground text-center py-8">Loading events...</p>
                ) : myEvents.length === 0 ? (
  <p className="text-muted-foreground text-center py-8">No events created yet</p>
                ) : (
                  <div className="space-y-4">
                    {myEvents.map((event) => (
                      <div key={event.id} className="p-4 border rounded-lg flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{event.title}</h4>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                          <Badge variant="outline" className="mt-2">
                            {event.approved ? "Approved" : "Pending"}
                          </Badge>
                        </div>
                       <div className="flex gap-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                           if (confirm("Are you sure you want to delete this event?")) {
                             deleteEventMutation.mutate(event.id);
                           }
                         }}
                       >
                        Delete
                      </Button>
                      </div>

                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sermons */}
          <TabsContent value="sermons" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>My Sermons</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  size="sm"
                  className="mb-4 bg-secondary hover:bg-secondary/90"
                  onClick={() => {
                    // Example new sermon submission (replace with a proper modal form)
                    createSermonMutation.mutate({
                      title: "New Sermon",
                      description: "Sample sermon created by coordinator",
                      date: new Date().toISOString(),
                      pastor: user.username,
                      duration: "45 min",
                    });
                  }}
                >
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Add Sermon
                </Button>

                {sermonsLoading ? (
                  <p className="text-muted-foreground text-center py-8">Loading sermons...</p>
                ) : mySermons.length === 0 ? ( <p className="text-muted-foreground text-center py-8">No sermons submitted yet</p>
                 ) : (
                  <div className="space-y-4">
                    {mySermons.map((sermon) => (
                      <div key={sermon.id} className="p-4 border rounded-lg flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{sermon.title}</h4>
                          <p className="text-sm text-muted-foreground">{sermon.description}</p>
                          <Badge variant="outline" className="mt-2">
                            {sermon.approved ? "Approved" : "Pending"}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                           if (confirm("Are you sure you want to delete this event?")) {
                             deleteEventMutation.mutate(event.id);
                           }
                         }}
                       >
                        Delete
                      </Button>
                      </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
