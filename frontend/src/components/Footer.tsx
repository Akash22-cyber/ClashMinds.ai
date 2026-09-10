// src/components/Footer.tsx
import { NavLink } from 'react-router-dom';
import { Github, Heart } from 'lucide-react';

function Footer() {
  return (
    <footer className="border-t border-border bg-background px-4 py-6 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-start md:justify-between">
        {/* Brand */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">CLASHMIND.ai</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            AI-powered debate practice platform.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-semibold text-foreground">Navigate</h4>
          <NavLink to="/startDebate" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Start Debate
          </NavLink>
          <NavLink to="/leaderboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Leaderboard
          </NavLink>
          <NavLink to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            About
          </NavLink>
          <NavLink to="/support-os" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            Support CLASHMIND.ai <Heart className="h-3 w-3 text-red-500" />
          </NavLink>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-semibold text-foreground">Legal</h4>
          <NavLink to="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Privacy Policy
          </NavLink>
          <NavLink to="/terms-of-service" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Terms of Service
          </NavLink>
        </div>

        {/* Community / Social */}
        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-semibold text-foreground">Community</h4>
          
           <a href="https://github.com/Akash22-cyber/ClashMinds.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            <Github className="h-4 w-4" /> GitHub
          </a>
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-7xl border-t border-border pt-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} CLASHMIND.ai. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;