"use client";
import { Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-secondary/30 border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            {/* <img src={logo} alt="Akarva Studios" className="h-40 w-auto mb-4" /> */}
            <h3 className="text-2xl font-serif font-bold text-gradient-gold mb-4">
              Akarva Studios
            </h3>
            <p className="text-muted-foreground">
              Crafting dimensions in jewellery with precision and artistry since
              2020.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <div className="space-y-2">
              {["Home", "Services", "Portfolio", "Process", "Contact"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Connect</h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/akarva_studio/"
                className="p-3 rounded-full bg-card border border-border hover:border-primary transition-colors"
              >
                <Instagram className="w-5 h-5 text-primary" />
              </a>
              <a
                href="#"
                className="p-3 rounded-full bg-card border border-border hover:border-primary transition-colors"
              >
                <Linkedin className="w-5 h-5 text-primary" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-muted-foreground">
          <p>© 2025 Akarva Studios. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
