import NavigationHeader from "@/components/navigation-header";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, User, ArrowRight, Users, Heart, Calendar, MapPin } from "lucide-react";

const communityGroups = [
  {
    id: "sunday-school",
    name: "Sunday School",
    description: "Bible lessons and activities for children ages 4-12 during service time.",
    leader: "Mrs. Emily Davis",
    meetingTime: "Sundays 9:00 AM",
    location: "Children's Ministry Room",
    category: "sunday_school",
    icon: "fas fa-child",
    color: "bg-yellow-100 text-yellow-600",
    participants: "25+ children",
    ageGroup: "Ages 4-12"
  },
  {
    id: "youth-fellowship",
    name: "Youth Fellowship",
    description: "Dynamic ministry for teens with games, discussions, and service projects.",
    leader: "Pastor Mike Wilson",
    meetingTime: "Fridays 7:00 PM",
    location: "Youth Center",
    category: "youth",
    icon: "fas fa-users",
    color: "bg-green-100 text-green-600",
    participants: "30+ teens",
    ageGroup: "Ages 13-18"
  },
  {
    id: "women-fellowship",
    name: "Women Fellowship",
    description: "Bible study, prayer, and fellowship for women of all ages and backgrounds.",
    leader: "Mrs. Linda Thompson",
    meetingTime: "Wednesdays 10:00 AM",
    location: "Fellowship Hall",
    category: "women",
    icon: "fas fa-female",
    color: "bg-pink-100 text-pink-600",
    participants: "40+ women",
    ageGroup: "All ages"
  },
  {
    id: "men-fellowship",
    name: "Men Fellowship",
    description: "Brotherhood, accountability, and growth in faith through study and service.",
    leader: "Deacon Robert Brown",
    meetingTime: "Saturdays 7:00 AM",
    location: "Conference Room",
    category: "men",
    icon: "fas fa-male",
    color: "bg-blue-100 text-blue-600",
    participants: "20+ men",
    ageGroup: "Ages 18+"
  }
];

const upcomingActivities = [
  {
    id: 1,
    title: "Youth Winter Camp",
    group: "Youth Fellowship",
    date: "December 20-22, 2024",
    location: "Pine Ridge Camp",
    description: "A weekend retreat for spiritual growth and fellowship."
  },
  {
    id: 2,
    title: "Women's Christmas Tea",
    group: "Women Fellowship",
    date: "December 15, 2024",
    location: "Fellowship Hall",
    description: "Join us for an afternoon of fellowship and Christmas celebration."
  },
  {
    id: 3,
    title: "Men's Breakfast",
    group: "Men Fellowship",
    date: "December 14, 2024",
    location: "Church Kitchen",
    description: "Monthly breakfast fellowship with devotional and discussion."
  }
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-6">
            Community Groups
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Find your place in our community through fellowship groups designed for every age and stage of life. 
            Connect with others, grow in faith, and serve together.
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <span>4 Active Groups</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-primary" />
              <span>115+ Members</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>Weekly Meetings</span>
            </div>
          </div>
        </div>
      </section>

      {/* Community Groups Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-4">Our Groups</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Each group offers unique opportunities for fellowship, learning, and service within our church family.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {communityGroups.map((group) => (
              <Card key={group.id} className="card-hover" data-testid={`group-card-${group.id}`}>
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className={`w-16 h-16 ${group.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <i className={`${group.icon} text-2xl`}></i>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-3" data-testid={`group-title-${group.id}`}>
                        {group.name}
                      </h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {group.description}
                      </p>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center space-x-3 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <span>{group.meetingTime}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <span>{group.location}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <span>{group.leader}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <Users className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <span>{group.participants} • {group.ageGroup}</span>
                        </div>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        className="w-full"
                        data-testid={`button-learn-more-${group.id}`}
                      >
                        Learn More
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Activities */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-4">Upcoming Activities</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Join us for special events and activities happening across our community groups.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {upcomingActivities.map((activity) => (
              <Card key={activity.id} className="card-hover" data-testid={`activity-card-${activity.id}`}>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="text-sm text-primary font-medium mb-2">
                      {activity.group}
                    </div>
                    <h3 className="font-semibold text-lg mb-2" data-testid={`activity-title-${activity.id}`}>
                      {activity.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {activity.description}
                    </p>
                  </div>
                  
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{activity.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{activity.location}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mt-4"
                    data-testid={`button-register-${activity.id}`}
                  >
                    Register Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Community CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="gradient-hero rounded-2xl p-12">
            <h2 className="text-3xl font-serif font-bold text-white mb-6">
              Ready to Join a Community Group?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Take the next step in your faith journey. Connect with others who share your values 
              and grow together in a supportive community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-gray-100"
                data-testid="button-get-connected"
              >
                <Users className="h-5 w-5 mr-2" />
                Get Connected
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary"
                data-testid="button-contact-us"
              >
                <Heart className="h-5 w-5 mr-2" />
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
