"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CarCard from "@/components/CarCard";
import BookingModal from "@/components/BookingModal";
import { Car, FLEET_DATA } from "@/data/fleet";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, setDoc, doc } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Clock,
  MapPin,
  Users,
  Sparkles,
  Zap,
  CheckCircle2,
  Trophy,
  PhoneCall,
  ArrowRight,
  Star
} from "lucide-react";

export default function Home() {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fleetData, setFleetData] = useState<Car[]>([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const categories = ["All", "Sedan", "SUV", "Hatchback", "Luxury"];

  useEffect(() => {
    // Sync local FLEET_DATA to Firestore initially if empty (Self-healing fleet)
    const q = query(collection(db, "cars"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        // Seed database if empty
        FLEET_DATA.forEach(async (car) => {
          await setDoc(doc(db, "cars", car.id), car);
        });
      }
      const cars = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Car[];
      setFleetData(cars);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredFleet = filter === "All"
    ? fleetData
    : fleetData.filter(car => car.type.includes(filter) || (filter === "Luxury" && car.type.includes("Luxury")));

  return (
    <div style={{ background: 'var(--background)' }}>
      <Navbar />
      <Hero />

      {/* Stats Section */}
      <section style={{ padding: '60px 24px', background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px' }}>
          {[
            { label: 'Verified Cars', val: '150+', icon: <ShieldCheck className="gold-text" /> },
            { label: 'Happy Clients', val: '12k+', icon: <Users className="gold-text" /> },
            { label: 'Cities Covered', val: 'Pakistan-wide', icon: <MapPin className="gold-text" /> },
            { label: 'Years of Trust', val: '15+', icon: <Trophy className="gold-text" /> }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center' }}
            >
              <div style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px' }}>{stat.val}</div>
              <div style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                {stat.icon} {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* One-Way Service - Highlithed */}
      <section id="one-way" style={{ padding: '100px 24px', background: 'linear-gradient(180deg, var(--surface) 0%, var(--surface-hover) 100%)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px', alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div style={{ color: 'var(--primary)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Zap size={20} /> Exclusive Service
              </div>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '30px' }}>
                All Pakistan <br /><span className="gradient-text">One-Way Rentals</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '18px', lineHeight: '1.8', marginBottom: '32px' }}>
                Don&apos;t worry about returning the car back to Lahore. Our unique <strong style={{ color: 'var(--text-main)' }}>One-Way Service</strong> allows you to drop off your vehicle in any major city across <strong className="gold-text">Punjab</strong>, <strong className="gold-text">KPK</strong>, or <strong className="gold-text">Sindh</strong>.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
                {['Verified Drivers', 'Doorstep Pickup', '24/7 Roadside', 'Lowest Drop Rates'].map((f) => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '16px', fontWeight: 500 }}>
                    <CheckCircle2 size={18} color="var(--success)" /> {f}
                  </div>
                ))}
              </div>
              <button onClick={() => { document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' }) }} className="btn-primary" style={{ padding: '16px 40px' }}>
                View One-Way Fleet <ArrowRight size={20} />
              </button>
            </motion.div>

            <motion.div
              className="premium-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              style={{ position: 'relative', overflow: 'hidden' }}
            >
              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200"
                alt="Pakistan Travel"
                style={{ width: '100%', height: '500px', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', color: '#fff' }}>
                <div style={{ fontSize: '24px', fontWeight: 800 }}>Reliable & Secure</div>
                <p style={{ opacity: 0.8 }}>Strict reference checks on all long-route rentals.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section id="fleet" style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 className="section-title">Explore Our <span className="gradient-text">Elite Fleet</span></h2>

          {/* Category Filter */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '50px', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={filter === cat ? 'btn-primary' : 'btn-outline'}
                style={{ borderRadius: '12px', padding: '10px 24px' }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '32px'
          }}>
            <AnimatePresence mode="popLayout">
              {filteredFleet.map((car, index) => (
                <motion.div
                  key={car.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => { setSelectedCar(car); setIsModalOpen(true); }}
                  style={{ cursor: 'pointer' }}
                >
                  <CarCard car={car} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Special Offer Section */}
      <section style={{ padding: '80px 24px', position: 'relative', overflow: 'hidden' }}>
        <div className="glass-card pulse-primary" style={{ maxWidth: '1000px', margin: '0 auto', background: 'var(--primary)', color: 'white', padding: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px', flexWrap: 'wrap', borderRadius: '40px' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 900, marginBottom: '16px' }}>Weekend Luxury Special! 🏎️</h2>
            <p style={{ fontSize: '20px', opacity: 0.9, maxWidth: '500px' }}>
              Book any premium sedan for Friday to Sunday and get a massive discount.
              Only <strong style={{ fontSize: '24px' }}>Rs. 12,500</strong> for 3 full days!
            </p>
          </div>
          <button onClick={() => window.open('https://wa.me/923059991234', '_blank')} className="btn-outline" style={{ background: '#fff', color: 'var(--primary)', border: 'none', padding: '20px 40px', fontSize: '18px', fontWeight: 800 }}>
            Claim Offer Now
          </button>
        </div>
      </section>

      {/* Why Us / Services Section */}
      <section style={{ padding: '100px 24px', background: 'var(--surface-hover)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 className="section-title">Premium <span className="gradient-text">Travel Experience</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {[
              { title: "24/7 Roadside Support", icon: <PhoneCall />, desc: "Mechanical issue or a flat tire? Our team is available 24 hours to assist you nationwide." },
              { title: "Chauffeur Service", icon: <Users />, desc: "Highly professional, verified, and uniformed drivers for your safety and comfort." },
              { title: "Airport Transfers", icon: <Clock />, desc: "Reliable pick and drop from Lahore, Islamabad, and Karachi airports with flight tracking." },
              { title: "Inter-City Tours", icon: <MapPin />, desc: "Explore the beauty of Pakistan with our specialized long-distance travel packages." }
            ].map((s, i) => (
              <div key={i} className="premium-card" style={{ padding: '40px', textAlign: 'center' }}>
                <div style={{ color: 'var(--primary)', background: 'var(--primary-glow)', width: '64px', height: '64px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                  {s.icon}
                </div>
                <h3 style={{ marginBottom: '16px', fontSize: '22px' }}>{s.title}</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 className="section-title">Client <span className="gradient-text">Voices</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {[
              { name: 'Sameer Khan', role: 'Business Traveler', text: 'Best service in Lahore. Their Honda Civic RS was brand new and the driver was extremely professional.' },
              { name: 'Dr. Maria', role: 'Medical Consultant', text: 'Regularly use their one-way service to Islamabad. Truly reliable and seamless process every time.' },
              { name: 'Ahmed Sheikh', role: 'Wedding Group', text: 'Rented 3 Prados for a family wedding. The cars were spotless and the coordination was perfect.' }
            ].map((t, i) => (
              <div key={i} className="glass-card" style={{ padding: '40px' }}>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill="var(--accent)" color="var(--accent)" />)}
                </div>
                <p style={{ fontStyle: 'italic', color: 'var(--text-main)', marginBottom: '24px', fontSize: '17px' }}>&quot;{t.text}&quot;</p>
                <div style={{ fontWeight: 800 }}>{t.name}</div>
                <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner CTA */}
      <section id="partner" style={{ padding: '100px 24px', background: 'var(--text-main)', color: '#fff' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <Sparkles size={48} className="gold-text" style={{ marginBottom: '30px' }} />
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 42px)', fontWeight: 800, marginBottom: '24px' }}>Partner with <span className="gold-text">Popular Rent A Car</span></h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '20px', marginBottom: '40px', lineHeight: 1.6 }}>
            Have a car sitting idle? Turn it into a revenue machine. We handle the clients, the references, and the monthly payments. You just enjoy the returns.
          </p>
          <a href="/partner" className="btn-primary" style={{ background: '#fff', color: 'var(--text-main)', padding: '18px 48px', fontSize: '18px' }}>
            List Your Car Today
          </a>
        </div>
      </section>

      <BookingModal
        car={selectedCar}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Footer */}
      <footer style={{ padding: '100px 24px 40px', background: '#fafafa', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '60px', marginBottom: '80px' }}>
            <div style={{ flex: 1.5 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div style={{ background: 'var(--primary)', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Zap color="#fff" fill="#fff" size={24} />
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 900 }}>POPULAR RENT A CAR</h3>
              </div>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '32px' }}>
                Providing premium transportation solutions since 2010. Our commitment to safety, reliability, and luxury has made us Pakistan&apos;s leading car rental choice.
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                {['FB', 'IG', 'TW', 'LI', 'YT'].map(s => (
                  <div key={s} className="premium-card" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '12px' }}>{s}</div>
                ))}
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '24px' }}>Quick Travel</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Our Fleet', 'One-Way Drop', 'Wedding Decor', 'Intercity Tours', 'Monthly Rentals'].map(l => (
                  <li key={l}><a href="#" style={{ color: 'var(--text-muted)' }}>{l}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '24px' }}>Corporate</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['About Agency', 'Partner Program', 'Terms of Service', 'Privacy Policy', 'Contact Support'].map(l => (
                  <li key={l}><a href="#" style={{ color: 'var(--text-muted)' }}>{l}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '24px' }}>Visit Us</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <MapPin size={24} style={{ flexShrink: 0 }} />
                  <span>Mian Plaza, Near MCB Bank, Civic Centre Block D-2, Phase 1, Johar Town, Lahore</span>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <PhoneCall size={20} style={{ flexShrink: 0 }} />
                  <span>+92 305 9991234</span>
                </div>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', paddingTop: '40px', borderTop: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '14px' }}>
            © 2025 Popular Rent A Car Lahore. Engineered for Excellence.
          </div>
        </div>
      </footer>
    </div>
  );
}
