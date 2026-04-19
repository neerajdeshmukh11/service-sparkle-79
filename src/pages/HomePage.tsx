import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Shield, Zap, Star, Clock, Users, MapPin, CheckCircle, ArrowRight,
  Wrench, Paintbrush, Droplets, Sparkles, Plug, Bug, ChevronRight,
  Phone, Mail, MessageCircle, Play, Award, TrendingUp, Heart
} from "lucide-react";
import { useState } from "react";

const services = [
  { icon: Wrench, title: "Plumbing", desc: "Expert plumbing repairs & installations", color: "from-blue-500 to-cyan-500" },
  { icon: Plug, title: "Electrical", desc: "Licensed electricians at your service", color: "from-amber-500 to-orange-500" },
  { icon: Paintbrush, title: "Painting", desc: "Interior & exterior painting pros", color: "from-purple-500 to-pink-500" },
  { icon: Sparkles, title: "Cleaning", desc: "Deep cleaning & sanitization", color: "from-emerald-500 to-teal-500" },
  { icon: Droplets, title: "AC Service", desc: "HVAC maintenance & repair", color: "from-sky-500 to-indigo-500" },
  { icon: Bug, title: "Pest Control", desc: "Safe & effective pest removal", color: "from-red-500 to-rose-500" },
];

const steps = [
  { step: "01", title: "Choose Service", desc: "Browse our wide range of professional home services" },
  { step: "02", title: "Book Online", desc: "Pick a time that works and book instantly" },
  { step: "03", title: "Get It Done", desc: "Verified experts arrive on time and deliver quality" },
];

const testimonials = [
  { name: "Sarah Johnson", role: "Homeowner", rating: 5, text: "HomeGenie transformed my home renovation experience. The plumber arrived on time and did an exceptional job!", avatar: "SJ" },
  { name: "Mike Chen", role: "Business Owner", rating: 5, text: "We use HomeGenie for all our office maintenance. The quality and reliability is unmatched.", avatar: "MC" },
  { name: "Priya Sharma", role: "Apartment Tenant", rating: 5, text: "Booking was seamless and the electrician was incredibly professional. Highly recommend!", avatar: "PS" },
];

const stats = [
  { value: "50K+", label: "Happy Customers", icon: Heart },
  { value: "2K+", label: "Verified Experts", icon: Award },
  { value: "99%", label: "Satisfaction Rate", icon: TrendingUp },
  { value: "100+", label: "Cities Covered", icon: MapPin },
];

const faqs = [
  { q: "How are service providers verified?", a: "All providers undergo thorough background checks, identity verification, and skill assessments before joining our platform." },
  { q: "What if I'm not satisfied with the service?", a: "We offer a 100% satisfaction guarantee. If you're not happy, we'll send another provider or issue a full refund." },
  { q: "How do I pay for services?", a: "We accept all major payment methods including credit cards, debit cards, UPI, and digital wallets. Payment is processed securely after service completion." },
  { q: "Can I reschedule or cancel a booking?", a: "Yes, you can reschedule or cancel up to 2 hours before the scheduled time at no extra charge." },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold gradient-text">HomeGenie</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Services</a>
            <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
            <a href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Reviews</a>
            <a href="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/auth")}>Log In</Button>
            <Button size="sm" className="gradient-primary border-0 text-primary-foreground" onClick={() => navigate("/auth")}>
              Get Started <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 px-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-chart-5/5 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4" /> Trusted by 50,000+ Homeowners
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6 animate-slide-up">
            Home Services,{" "}
            <span className="gradient-text">Simplified.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Book verified professionals for plumbing, electrical, cleaning, and 50+ services — all from one platform. Fast, reliable, guaranteed.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Button size="lg" className="gradient-primary border-0 text-primary-foreground px-8 h-13 text-base shadow-lg shadow-primary/25" onClick={() => navigate("/auth")}>
              Book a Service <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="px-8 h-13 text-base group" onClick={() => navigate("/auth")}>
              <Play className="w-5 h-5 mr-2 group-hover:text-primary transition-colors" /> Become a Provider
            </Button>
          </div>
          {/* Trust bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-14 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            {[
              { icon: Shield, text: "Verified Experts" },
              { icon: Clock, text: "On-Time Guarantee" },
              { icon: Star, text: "5-Star Rated" },
              { icon: CheckCircle, text: "Satisfaction Assured" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-muted-foreground text-sm">
                <Icon className="w-4 h-4 text-primary" /> {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-border/50 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ value, label, icon: Icon }) => (
            <div key={label} className="text-center">
              <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-3xl md:text-4xl font-extrabold gradient-text">{value}</div>
              <div className="text-sm text-muted-foreground mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 md:py-28 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Services</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Everything Your Home Needs</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">Professional services delivered by background-checked, trained experts.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ icon: Icon, title, desc, color }) => (
              <Card key={title} className="group border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer overflow-hidden">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{title}</h3>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground/50 ml-auto mt-1 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 md:py-28 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">How It Works</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Three Simple Steps</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />
            {steps.map(({ step, title, desc }) => (
              <div key={step} className="text-center relative">
                <div className="w-24 h-24 rounded-2xl gradient-primary mx-auto flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
                  <span className="text-3xl font-extrabold text-primary-foreground">{step}</span>
                </div>
                <h3 className="font-bold text-xl mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 md:py-28 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Loved by Thousands</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(({ name, role, rating, text, avatar }) => (
              <Card key={name} className="border-border/50 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">"{text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-sm font-bold text-primary-foreground">{avatar}</div>
                    <div>
                      <div className="font-semibold text-sm">{name}</div>
                      <div className="text-xs text-muted-foreground">{role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* For Providers CTA */}
      <section className="py-20 md:py-28 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <Card className="overflow-hidden border-0 shadow-2xl shadow-primary/10">
            <div className="gradient-primary p-10 md:p-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Grow Your Business With Us</h2>
              <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8 text-lg">
                Join 2,000+ service professionals earning more with flexible schedules, instant payouts, and a steady stream of customers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-card text-foreground hover:bg-card/90 px-8 h-13 text-base" onClick={() => navigate("/auth")}>
                  Register as Provider <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-primary-foreground/70 text-sm">
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4" /> Free to Join</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4" /> Weekly Payouts</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4" /> Set Your Rates</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 md:py-28 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Common Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map(({ q, a }, i) => (
              <Card key={i} className="border-border/50 overflow-hidden cursor-pointer" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <CardContent className="p-0">
                  <div className="flex items-center justify-between p-5">
                    <span className="font-medium">{q}</span>
                    <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform shrink-0 ml-4 ${openFaq === i ? "rotate-90" : ""}`} />
                  </div>
                  {openFaq === i && (
                    <div className="px-5 pb-5 text-sm text-muted-foreground animate-fade-in">{a}</div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground text-lg mb-8">Join thousands of homeowners who trust HomeGenie for all their service needs.</p>
          <Button size="lg" className="gradient-primary border-0 text-primary-foreground px-10 h-13 text-base shadow-lg shadow-primary/25" onClick={() => navigate("/auth")}>
            Book Your First Service <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-muted/30 py-12 px-4">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg gradient-text">HomeGenie</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">Professional home services at your fingertips. Quality guaranteed.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Plumbing</li><li>Electrical</li><li>Cleaning</li><li>Painting</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>About Us</li><li>Careers</li><li>Blog</li><li>Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +1 (800) 123-4567</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> support@homegenie.com</li>
              <li className="flex items-center gap-2"><MessageCircle className="w-4 h-4" /> Live Chat</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-border/50 text-center text-sm text-muted-foreground">
          © 2026 HomeGenie. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
