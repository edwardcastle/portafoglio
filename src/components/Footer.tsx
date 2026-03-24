import { Mail } from "lucide-react";
import { GithubIcon } from "./icons";
import type { Dictionary } from "@/i18n/types";

export function Footer({ dict }: { dict: Dictionary["footer"] }) {
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} Eduardo Castillo. {dict.rights}
        </p>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/edwardcastle"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href="mailto:sir.edwardcastle@gmail.com"
            className="text-muted hover:text-foreground transition-colors"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
