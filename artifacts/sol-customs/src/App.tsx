import React from "react";
import { Link } from "wouter";
import { QuoteForm } from "@/components/QuoteForm";
import heroImg from "@assets/hero_generated.png";
import logoImg from "@assets/logo_transparent.png";
import detailImg from "@assets/detail_generated.png";
import gallery1 from "@assets/703570652_2220955232006862_7364107803220806714_n_1779909513209.jpg";
import gallery2 from "@assets/703860614_982088887535500_431897983960216145_n_1779909513209.jpg";
import gallery3 from "@assets/704055660_1668985524407045_7846469435312387687_n_1779909513209.jpg";
import gallery4 from "@assets/704226449_996381562937453_2606862708781349012_n_1779909513209.jpg";
import gallery5 from "@assets/704366477_1523950889333741_2747285597907563302_n_1779909513209.jpg";
import gallery6 from "@assets/705450327_974051568564811_1106820588851195020_n_1779909513209.jpg";
import gallery7 from "@assets/705967333_973125332195081_1389349046506016320_n_1779909513209.jpg";
import gallery8 from "@assets/706873775_896180256846272_203189804566728745_n_1779909513209.jpg";
import gallery9 from "@assets/707397044_27406256158958011_5476898148741391745_n_1779909513209.jpg";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, Phone, Mail, Clock, MapPin, Paintbrush, Shield, Truck, Lightbulb, Gem, Star, Sparkles, Wind, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Services", id: "services" },
    { name: "Gallery", id: "gallery" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5 transition-all duration-300">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20 overflow-hidden">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-4 group">
            <img
              src={logoImg}
              alt="Sol Customs"
              className="w-auto object-contain transition-all duration-300 group-hover:scale-105"
              style={{ height: "90px", filter: "invert(1) drop-shadow(0 0 10px rgba(198,161,91,0.65))" }}
            />
            <div className="flex items-center gap-4">
              <div className="w-px h-10 bg-primary/40" />
              <span className="text-[22px] font-black tracking-[0.25em] uppercase text-primary drop-shadow-[0_0_8px_rgba(198,161,91,0.5)] group-hover:drop-shadow-[0_0_14px_rgba(198,161,91,0.8)] transition-all duration-300">Sol Customs</span>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-wide"
              >
                {link.name}
              </button>
            ))}
            <Button
              onClick={() => scrollTo("quote")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_15px_rgba(198,161,91,0.3)] transition-all"
            >
              Free Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-b border-border overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-left text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
                >
                  {link.name}
                </button>
              ))}
              <Button
                onClick={() => scrollTo("quote")}
                className="w-full bg-primary text-primary-foreground mt-4"
              >
                Get a Free Quote
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Hero() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background z-10" />
        <img
          src={heroImg}
          alt="Luxury automotive customization"
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="container mx-auto px-6 relative z-20 text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="w-16 h-[2px] bg-primary mb-8 mx-auto md:mx-0" />
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 leading-tight">
            Luxury Automotive <br /> Customization, <br /> Built to <span className="text-primary italic">Stand Out</span>.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
            Sol Customs designs and installs premium vehicle wraps, colored PPF, custom lighting, engravings, aero parts, and aftermarket upgrades for private and commercial vehicles across Ruskin and the Tampa Bay area.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <Button
              size="lg"
              onClick={() => scrollTo("quote")}
              className="w-full sm:w-auto text-lg px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(198,161,91,0.4)] transition-all"
            >
              Get a Free Quote
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollTo("services")}
              className="w-full sm:w-auto text-lg px-8 py-6 border-border hover:bg-white/5 hover:text-primary transition-colors"
            >
              View Services
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-24 bg-background relative border-t border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-6 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-primary"></span>
              The Brand
            </h2>
            <div className="space-y-8 text-xl md:text-3xl font-light leading-relaxed text-foreground/90">
              <p>
                Sol Customs is a premium automotive customization brand serving Ruskin and the Tampa Bay area.
              </p>
              <p className="text-muted-foreground">
                From color-changing wraps and colored PPF to lighting upgrades, engravings, aero installs, and aftermarket parts, every project is designed to give vehicles a bold, clean, and unforgettable finish.
              </p>
              <p>
                The owner personally designs and installs vehicle wraps, giving each project a custom approach from concept to completion.
              </p>
              <p className="text-muted-foreground">
                Whether it is a private vehicle, commercial wrap, fleet upgrade, or personal showpiece, Sol Customs focuses on precision, style, and detail from every angle.
              </p>
              <p className="font-medium text-white italic pt-4">
                This is more than customization. This is identity on wheels.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const servicesList = [
  { title: "Vehicle Wraps", desc: "Custom full and partial wraps designed to transform cars, trucks, vans, and specialty vehicles.", icon: Paintbrush },
  { title: "Colored PPF", desc: "Colored paint protection film that gives vehicles a premium finish while helping protect the paint.", icon: Shield },
  { title: "Commercial Wraps", desc: "Professional wraps for business vehicles, work trucks, vans, fleets, and mobile branding.", icon: Truck },
  { title: "Tail Light Engravings", desc: "Custom tail light engraving for a unique, detailed, and personalized finish.", icon: Lightbulb },
  { title: "Glass Engravings", desc: "Custom glass engraving for automotive windows, panels, or specialty details.", icon: Gem },
  { title: "Star Lights", desc: "Luxury star light headliner installs that create a premium interior atmosphere.", icon: Star },
  { title: "Ambient Lighting", desc: "Custom interior ambient lighting for a modern, high-end driving experience.", icon: Sparkles },
  { title: "Aero Install", desc: "Installation of front lips, splitters, diffusers, spoilers, side skirts, and aero upgrades.", icon: Wind },
  { title: "Aftermarket Part Install", desc: "Installation of select aftermarket parts to enhance the look and personality of the vehicle.", icon: Wrench },
];

function Services() {
  return (
    <section id="services" className="py-24 bg-card border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Our Services</h2>
          <div className="w-24 h-[2px] bg-primary" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {servicesList.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-8 bg-background border border-border rounded-xl hover:border-primary/50 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-primary/50 transition-all duration-300">
                  <service.icon size={20} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const galleryImages = [
  { src: gallery1, alt: "Lexus, Mercedes AMG GT, and Audi TT custom wraps — overhead view", label: "Wraps" },
  { src: gallery2, alt: "Deep burgundy Lexus IS wrap with blacked-out Mercedes AMG", label: "Wraps" },
  { src: gallery3, alt: "Genesis G70 color-shift wrap — copper to purple", label: "PPF" },
  { src: gallery4, alt: "Wrapped Toyotas at sunset — pink, teal, and blue builds", label: "Wraps" },
  { src: gallery5, alt: "Matte green BMW wrap with amber custom headlight detail", label: "Lighting" },
  { src: gallery6, alt: "Matte black Mercedes AMG GT with rose gold wheels", label: "Aero" },
  { src: gallery7, alt: "Custom blue full wrap with detailed engraving pattern", label: "Engravings" },
  { src: gallery8, alt: "Satin pink Toyota GR86 wrap with wide body aero kit", label: "Wraps" },
  { src: gallery9, alt: "Sol Customs branded wrap — black and white design", label: "Commercial" },
];

function Gallery() {
  const [selectedImg, setSelectedImg] = React.useState<string | null>(null);

  return (
    <section id="gallery" className="py-24 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">The Gallery</h2>
            <div className="w-24 h-[2px] bg-primary" />
          </div>
          <p className="text-muted-foreground max-w-md">
            A curated look at our recent builds, showcasing premium finishes, precision installs, and bespoke details.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer border border-white/5"
              onClick={() => setSelectedImg(img.src)}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                <span className="px-4 py-2 border border-primary/50 text-primary font-medium tracking-wide rounded-md transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  {img.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            <button
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
              onClick={() => setSelectedImg(null)}
            >
              <X size={32} />
            </button>
            <img
              src={selectedImg}
              alt="Expanded gallery view"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function WhyChooseUs() {
  return (
    <section className="py-24 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground leading-tight">
              Built for Drivers Who Care About the Details
            </h2>
            <div className="w-16 h-[2px] bg-primary mb-8" />
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Every Sol Customs project is treated like a rolling piece of design. The goal is not only to change how a vehicle looks, but to create a finished build that feels intentional, sharp, and unforgettable.
            </p>
            
            <ul className="space-y-4">
              {[
                "Owner-designed and installed projects",
                "Premium automotive styling",
                "Clean precise installation",
                "Private and commercial vehicle services",
                "Custom look for every build",
                "Attention to edges, details, materials, and presentation",
                "Serving Ruskin and the Tampa Bay area"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <ChevronRight className="text-primary mt-1 shrink-0" size={20} />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden relative border border-border">
              <img src={detailImg} alt="Premium wrap details" className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700" />
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border-l-2 border-b-2 border-primary/50 -z-10"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 border-r-2 border-t-2 border-primary/50 -z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="contact" className="py-24 bg-card border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-6 text-foreground">Contact Us</h2>
          <div className="w-16 h-[2px] bg-primary mx-auto mb-12" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="p-8 bg-background border border-border rounded-xl flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-card rounded-full flex items-center justify-center mb-4 text-primary border border-border">
                <Phone size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Call or Text</h3>
              <p className="text-muted-foreground mb-4">770-0377-9390</p>
              <div className="flex gap-4 mt-auto">
                <Button variant="outline" className="border-border hover:bg-white/5" asChild>
                  <a href="tel:770-0377-9390">Call Now</a>
                </Button>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                  <a href="sms:770-0377-9390">Text Us</a>
                </Button>
              </div>
            </div>

            <div className="p-8 bg-background border border-border rounded-xl flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-card rounded-full flex items-center justify-center mb-4 text-primary border border-border">
                <Mail size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p className="text-muted-foreground mb-4">inquire@solcustoms.com</p>
              <div className="flex gap-4 mt-auto w-full flex-col sm:flex-row">
                <Button variant="outline" className="flex-1 border-border hover:bg-white/5" asChild>
                  <a href="mailto:inquire@solcustoms.com">Email Us</a>
                </Button>
                <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => scrollTo("quote")}>
                  Online Quote
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16 text-muted-foreground">
            <div className="flex items-center gap-3 justify-center">
              <Clock className="text-primary" size={20} />
              <span>Everyday, 10:00 AM - 8:00 PM</span>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <MapPin className="text-primary" size={20} />
              <span>Serving Ruskin & Tampa Bay</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-background py-12 border-t border-border">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-2xl font-bold tracking-[0.3em] text-foreground mb-4">SOL CUSTOMS</h2>
        <p className="text-primary italic mb-8">Identity on wheels.</p>
        <p className="text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} Sol Customs. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground font-sans">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Gallery />
        <WhyChooseUs />
        <QuoteForm />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}