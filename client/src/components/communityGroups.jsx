import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, User, ArrowRight } from "lucide-react";

const communityGroups = [
  {
    id: "sunday-school",
    name: "Sunday School",
    description: "Bible lessons and activities for children ages 4-12 during service time.",
    leader: "Mrs. Emily Davis",
    meetingTime: "Sundays 9:00 AM",
    icon: "fas fa-child",
    color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400"
  },
  {
    id: "youth-fellowship",
    name: "Youth Fellowship",
    description: "Dynamic ministry for teens with games, discussions, and service projects.",
    leader: "Pastor Mike Wilson",
    meetingTime: "Fridays 7:00 PM",
    icon: "fas fa-users",
    color: "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"
  },
  {
    id: "women-fellowship",
    name: "Women Fellowship",
    description: "Bible study, prayer, and fellowship for women of all ages and backgrounds.",
    leader: "Mrs. Linda Thompson",
    meetingTime: "Wednesdays 10:00 AM",
    icon: "fas fa-female",
    color: "bg-pink-100 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400"
  },
  {
    id: "men-fellowship",
    name: "Men Fellowship",
    description: "Brotherhood, accountability, and growth in faith through study and service.",
    leader: "Deacon Robert Brown",
    meetingTime: "Saturdays 7:00 AM",
    icon: "fas fa-male",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
  }
];

export default function CommunityGroups() {
  return (
    <section id="community" className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">Community Groups</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find your place in our community through fellowship groups designed for every age and stage of life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {communityGroups.map((group) => (
            <Card key={group.id} className="text-center card-hover" data-testid={`group-card-${group.id}`}>
              <CardContent className="p-6">
                <div className={`w-16 h-16 ${group.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <i className={`${group.icon} text-2xl`}></i>
                </div>
                <h3 className="font-semibold text-lg mb-2" data-testid={`group-title-${group.id}`}>
                  {group.name}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {group.description}
                </p>
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center justify-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{group.meetingTime}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{group.leader}</span>
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
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/community">
            <Button 
              size="lg"
              data-testid="button-view-all-groups"
            >
              <i className="fas fa-users mr-2"></i>
              Explore All Groups
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
