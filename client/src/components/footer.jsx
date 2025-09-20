import { Link } from "wouter";
import { Church } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Church Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Church className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-serif font-semibold text-lg">Grace Community Church</h3>
              </div>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              A welcoming community where faith, hope, and love come together. 
              Join us as we worship, learn, and serve together in Christ's name.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="footer-link-facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="footer-link-instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="footer-link-youtube"
              >
                <i className="fab fa-youtube"></i>
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="footer-link-podcast"
              >
                <i className="fas fa-podcast"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors" data-testid="footer-link-home">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-primary transition-colors" data-testid="footer-link-events">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/sermons" className="hover:text-primary transition-colors" data-testid="footer-link-sermons">
                  Sermons
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-primary transition-colors" data-testid="footer-link-community">
                  Community Groups
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors" data-testid="footer-link-contact">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/sermons" className="hover:text-primary transition-colors" data-testid="footer-link-sermon-archive">
                  Sermon Archive
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors" data-testid="footer-link-bible-study">
                  Bible Study
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors" data-testid="footer-link-prayer-requests">
                  Prayer Requests
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors" data-testid="footer-link-newsletter">
                  Newsletter
                </a>
              </li>
              <li>
                <Link href="/auth" className="hover:text-primary transition-colors" data-testid="footer-link-member-portal">
                  Member Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center">
          <p className="text-muted-foreground">
            © 2024 Grace Community Church. All rights reserved. | 
            <a href="#" className="hover:text-primary transition-colors ml-1" data-testid="footer-link-privacy">
              Privacy Policy
            </a> | 
            <a href="#" className="hover:text-primary transition-colors ml-1" data-testid="footer-link-terms">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
