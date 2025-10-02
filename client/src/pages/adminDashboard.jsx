import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import NavigationHeader from "@/components/navigationHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Calendar, Clock, CheckCircle, XCircle, Eye } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { ShieldCheck } from "lucide-react";

export default function AdminDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: pendingUsers = [] } = useQuery({
    queryKey: ["/api/admin/pending-users"],
  });

  const promoteUserMutation = useMutation({
  mutationFn: async (userId) => {
    const res = await apiRequest("PATCH", `/api/users/make-admin/${userId}`);
    return res.json();
  },
  onSuccess: (data) => {
    queryClient.invalidateQueries({ queryKey: ["/api/users"] });
    toast({
      title: "User promoted",
      description: data.message,
    });
  },
  onError: (err) => {
    toast({
      title: "Error",
      description: err.message || "Failed to promote user",
      variant: "destructive",
    });
  },
});

  const { data: stats = {} } = useQuery({
    queryKey: ["/api/admin/stats"],
  });

  const { data: pendingEvents = [] } = useQuery({
    queryKey: ["/api/admin/pending-events"],
  });

  const { data: pendingSermons = [] } = useQuery({
    queryKey: ["/api/admin/pending-sermons"],
  });

  const approveUserMutation = useMutation({
    mutationFn: async ({ userId, approved }) => {
      const res = await apiRequest("POST", `/api/admin/approve-user`, { userId, approved });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/pending-users"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      toast({
        title: "User updated",
        description: "User approval status has been updated.",
      });
    },
  });

  const approveEventMutation = useMutation({
    mutationFn: async ({ eventId, approved }) => {
      const res = await apiRequest("POST", `/api/admin/approve-event`, { eventId, approved });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/pending-events"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      toast({
        title: "Event updated",
        description: "Event approval status has been updated.",
      });
    },
  });

  const approveSermonMutation = useMutation({
    mutationFn: async ({ sermonId, approved }) => {
      const res = await apiRequest("POST", `/api/admin/approve-sermon`, { sermonId, approved });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/pending-sermons"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      toast({
        title: "Sermon updated",
        description: "Sermon approval status has been updated.",
      });
    },
  });

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-background">
        <NavigationHeader />
        <div className="flex items-center justify-center pt-32">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-destructive mb-4">Access Denied</h1>
            <p className="text-muted-foreground">You don't have admin privileges.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage users, events, and content for Grace Community Church</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Members</p>
                  <p className="text-2xl font-bold text-primary" data-testid="stat-members">{stats.totalMembers || 0}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Events</p>
                  <p className="text-2xl font-bold text-secondary" data-testid="stat-events">{stats.activeEvents || 0}</p>
                </div>
                <Calendar className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Approvals</p>
                  <p className="text-2xl font-bold text-orange-600" data-testid="stat-pending">{stats.pendingApprovals || 0}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="users" data-testid="tab-users">User Management</TabsTrigger>
            <TabsTrigger value="events" data-testid="tab-events">Event Approvals</TabsTrigger>
            <TabsTrigger value="sermons" data-testid="tab-sermons">Sermon Approvals</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending User Registrations</CardTitle>
              </CardHeader>
              <CardContent>
                {pendingUsers.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8" data-testid="no-pending-users">
                    No pending user registrations
                  </p>
                ) : (
                  <div className="space-y-4">
                    {pendingUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg" data-testid={`user-${user.id}`}>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <div>
                              <p className="font-medium" data-testid={`user-name-${user.id}`}>{user.username}</p>
                              <p className="text-sm text-muted-foreground" data-testid={`user-email-${user.id}`}>{user.email}</p>
                              {user.mobile && (
                                <p className="text-sm text-muted-foreground">{user.mobile}</p>
                              )}
                            </div>
                            <Badge variant="outline" className="ml-4">
                              {user.role}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => approveUserMutation.mutate({ userId: user.id, approved: true })}
                            disabled={approveUserMutation.isPending}
                            data-testid={`button-approve-user-${user.id}`}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => approveUserMutation.mutate({ userId: user.id, approved: false })}
                            disabled={approveUserMutation.isPending}
                            data-testid={`button-reject-user-${user.id}`}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
               <CardTitle>All Users</CardTitle>
                </CardHeader>
                 <CardContent>
                   {allUsers.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      No users found
                    </p>
                    ) : (
                     <div className="space-y-4">
                     {allUsers.map((u) => (
                     <div
                     key={u._id}
                     className="flex items-center justify-between p-4 border rounded-lg"
                     >
                     <div>
                      <p className="font-medium">{u.username}</p>
                      <p className="text-sm text-muted-foreground">{u.email}</p>
                    <Badge variant="outline" className="mt-1">
                      {u.role}
                    </Badge>
                     </div>

                      {u.role !== "admin" ? (
                   <Button
                     size="sm"
                     onClick={() => promoteUserMutation.mutate(u._id)}
                     disabled={promoteUserMutation.isPending}
                     >
                    <ShieldCheck className="h-4 w-4 mr-1" />
                      Promote to Admin
                    </Button>
                       ) : (
                       <span className="text-green-600 font-medium">✅ Admin</span>
                      )}
                    </div>
                    ))}
             </div>
             )}
            </CardContent>
            </Card>

          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Event Approvals</CardTitle>
              </CardHeader>
              <CardContent>
                {pendingEvents.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8" data-testid="no-pending-events">
                    No pending event approvals
                  </p>
                ) : (
                  <div className="space-y-4">
                    {pendingEvents.map((event) => (
                      <div key={event.id} className="p-4 border rounded-lg" data-testid={`event-${event.id}`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold mb-2" data-testid={`event-title-${event.id}`}>{event.title}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>{new Date(event.date).toLocaleDateString()}</span>
                              <span>{event.time}</span>
                              <span>{event.location}</span>
                            </div>
                            <Badge variant="outline" className="mt-2">
                              {event.category}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => approveEventMutation.mutate({ eventId: event.id, approved: true })}
                              disabled={approveEventMutation.isPending}
                              data-testid={`button-approve-event-${event.id}`}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => approveEventMutation.mutate({ eventId: event.id, approved: false })}
                              disabled={approveEventMutation.isPending}
                              data-testid={`button-reject-event-${event.id}`}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sermons" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Sermon Approvals</CardTitle>
              </CardHeader>
              <CardContent>
                {pendingSermons.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8" data-testid="no-pending-sermons">
                    No pending sermon approvals
                  </p>
                ) : (
                  <div className="space-y-4">
                    {pendingSermons.map((sermon) => (
                      <div key={sermon.id} className="p-4 border rounded-lg" data-testid={`sermon-${sermon.id}`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold mb-2" data-testid={`sermon-title-${sermon.id}`}>{sermon.title}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{sermon.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>{sermon.pastor}</span>
                              <span>{new Date(sermon.date).toLocaleDateString()}</span>
                              <span>{sermon.duration}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => approveSermonMutation.mutate({ sermonId: sermon.id, approved: true })}
                              disabled={approveSermonMutation.isPending}
                              data-testid={`button-approve-sermon-${sermon.id}`}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => approveSermonMutation.mutate({ sermonId: sermon.id, approved: false })}
                              disabled={approveSermonMutation.isPending}
                              data-testid={`button-reject-sermon-${sermon.id}`}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </div>
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
