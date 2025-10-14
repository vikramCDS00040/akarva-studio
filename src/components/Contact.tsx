// "use client";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Mail, Phone, Instagram, Linkedin } from "lucide-react";
// import { FaWhatsapp } from "react-icons/fa";
// import { useToast } from "@/hooks/use-toast";

// const Contact = () => {
//   const { toast } = useToast();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     toast({
//       title: "Message Sent!",
//       description: "We'll get back to you within 24 hours.",
//     });
//     setFormData({ name: "", email: "", message: "" });
//   };

//   return (
//     <section id="contact" className="py-24 bg-background">
//       <div className="container mx-auto px-6">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-6xl font-serif font-bold text-gradient-gold pb-4">
//             Ready to Elevate Your Jewelry Designs?
//           </h2>
//           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//             Let's bring your vision to life with stunning 3D renders
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
//           {/* Contact Form */}
//           <div>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <Input
//                   placeholder="Your Name"
//                   value={formData.name}
//                   onChange={(e) =>
//                     setFormData({ ...formData, name: e.target.value })
//                   }
//                   required
//                   className="bg-secondary/50 border-border"
//                 />
//               </div>
//               <div>
//                 <Input
//                   type="email"
//                   placeholder="Your Email"
//                   value={formData.email}
//                   onChange={(e) =>
//                     setFormData({ ...formData, email: e.target.value })
//                   }
//                   required
//                   className="bg-secondary/50 border-border"
//                 />
//               </div>
//               <div>
//                 <Textarea
//                   placeholder="Tell us about your project..."
//                   value={formData.message}
//                   onChange={(e) =>
//                     setFormData({ ...formData, message: e.target.value })
//                   }
//                   required
//                   rows={6}
//                   className="bg-secondary/50 border-border"
//                 />
//               </div>
//               <Button
//                 type="submit"
//                 size="lg"
//                 className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-11 rounded-md px-8 w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-gold"
//               >
//                 Send Message
//               </Button>
//             </form>
//           </div>

//           {/* Contact Info */}
//           <div className="space-y-8">
//             <div className="p-6 rounded-lg bg-card border border-border">
//               <div className="flex items-center gap-4 mb-4">
//                 <div className="p-3 rounded-full bg-primary/10">
//                   <Mail className="w-6 h-6 text-primary" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-foreground">Email</h3>
//                   <a
//                     href="mailto:info@akarvastudios.com"
//                     className="text-muted-foreground hover:text-primary transition-colors"
//                   >
//                     info@akarvastudios.com
//                   </a>
//                 </div>
//               </div>
//             </div>

//             <div className="p-6 rounded-lg bg-card border border-border">
//               <div className="flex items-center gap-10 mb-4">
//                 {/* Icon group: phone and whatsapp separated */}
//                 <div className="flex items-center gap-3">
//                   {/* Phone icon */}
//                   <a
//                     href="tel:+1234567890"
//                     className="p-3 rounded-full bg-primary/10 inline-flex items-center justify-center hover:shadow-md transition-shadow"
//                     aria-label="Call +1 (234) 567-890"
//                   >
//                     <Phone className="w-6 h-6 text-primary" />
//                   </a>
//                   <div>
//                     <h3 className="font-semibold text-foreground">Phone</h3>
//                     <div className="flex flex-col">
//                       <a
//                         href="tel:+1234567890"
//                         className="text-muted-foreground hover:text-primary transition-colors"
//                       >
//                         +1 (234) 567-890
//                       </a>
//                     </div>
//                   </div>
//                 </div>

//                 {/* WhatsApp icon */}
//                 <div className="flex items-center gap-3">
//                   <a
//                     href="https://wa.me/1234567890"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="p-3 rounded-full bg-primary/10 inline-flex items-center justify-center hover:shadow-md transition-shadow"
//                     aria-label="Chat on WhatsApp"
//                   >
//                     <FaWhatsapp className="w-6 h-6 text-primary" />
//                   </a>
//                   <a
//                     href="https://wa.me/1234567890"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="font-bold hover:text-gradient-gold text-muted-foreground hover:cursor-pointer "
//                   >
//                     Chat on WhatsApp
//                   </a>
//                 </div>
//               </div>
//             </div>

//             <div className="p-6 rounded-lg bg-card border border-border">
//               <h3 className="font-semibold text-foreground mb-4">Follow Us</h3>
//               <div className="flex gap-4">
//                 <a
//                   href="#"
//                   className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
//                 >
//                   <Instagram className="w-6 h-6 text-primary" />
//                 </a>
//                 <a
//                   href="#"
//                   className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
//                 >
//                   <Linkedin className="w-6 h-6 text-primary" />
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Contact;

"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Instagram, Linkedin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "c291251e-2c8a-440d-ad97-6a60a893aa58", // ✅ your Web3Forms key
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast({
          title: "Message Sent!",
          description: "We'll get back to you within 24 hours.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Something went wrong!",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-gradient-gold pb-4">
            Ready to Elevate Your Jewelry Designs?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Let's bring your vision to life with stunning 3D renders
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="bg-secondary/50 border-border"
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="bg-secondary/50 border-border"
              />
              <Textarea
                placeholder="Tell us about your project..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                rows={6}
                className="bg-secondary/50 border-border"
              />
              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-gold"
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="p-6 rounded-lg bg-card border border-border">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Email</h3>
                  <a
                    href="mailto:info@akarvastudios.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    info@akarvastudios.com
                  </a>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-lg bg-card border border-border">
              <div className="flex items-center gap-10 mb-4">
                {/* Phone */}
                <div className="flex items-center gap-3">
                  <a
                    href="tel:+1234567890"
                    className="p-3 rounded-full bg-primary/10 inline-flex items-center justify-center hover:shadow-md transition-shadow"
                    aria-label="Call +1 (234) 567-890"
                  >
                    <Phone className="w-6 h-6 text-primary" />
                  </a>
                  <div>
                    <h3 className="font-semibold text-foreground">Phone</h3>
                    <a
                      href="tel:+1234567890"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-center gap-3">
                  <a
                    href="https://wa.me/1234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-primary/10 inline-flex items-center justify-center hover:shadow-md transition-shadow"
                    aria-label="Chat on WhatsApp"
                  >
                    <FaWhatsapp className="w-6 h-6 text-primary" />
                  </a>
                  <a
                    href="https://wa.me/1234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-muted-foreground hover:text-green-600 transition-colors"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-lg bg-card border border-border">
              <h3 className="font-semibold text-foreground mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/akarva_studio/"
                  className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                >
                  <Instagram className="w-6 h-6 text-primary" />
                </a>
                <a
                  href="#"
                  className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                >
                  <Linkedin className="w-6 h-6 text-primary" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
