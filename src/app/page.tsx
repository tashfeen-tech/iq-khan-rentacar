"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CarCard from "@/components/CarCard";
import BookingModal from "@/components/BookingModal";
import { Car, FLEET_DATA } from "@/data/fleet";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import { motion } from "framer-motion";

export default function Home() {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fleetData, setFleetData] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "cars"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const cars = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Car[];
      setFleetData(cars);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const displayFleet = fleetData.length > 0 ? fleetData : FLEET_DATA;

  const handleBookClick = (car: Car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  return (
    <>
      <Navbar />
      <Hero />

      <section id="fleet" style={{ padding: '100px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 42px)', marginBottom: '16px', textAlign: 'center', fontWeight: 800 }}>
            Our <span className="gradient-text">Premium Fleet</span>
          </h2>

          <p style={{ color: 'var(--text-muted)', textAlign: 'center', maxWidth: '600px', margin: '0 auto 60px', fontSize: '18px' }}>
            {loading ? "Loading available vehicles..." : "Choose from our diverse range of well-maintained vehicles for any occasion, from daily commutes to grand celebrations."}
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '32px'
        }}>
          {displayFleet.slice(0, 9).map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => handleBookClick(car)}
              style={{ cursor: 'pointer' }}
            >
              <CarCard car={car} priority={index < 3} />
            </motion.div>
          ))}
        </div>
      </section>

      <BookingModal
        car={selectedCar}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Special Offer Banner */}
      <section style={{ background: 'var(--primary)', color: 'white', padding: '40px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '10px' }}>Weekend Special! 🚗</h2>
        <p style={{ fontSize: '18px' }}>Rent a car for 3 days (Fri-Sat-Sun) for just <strong>Rs. 12,500!</strong></p>
      </section>

      {/* One-Way Service Section */}
      <section style={{ padding: '100px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 42px)', fontWeight: 800 }}>
            All Pakistan <span className="gradient-text">One-Way Service</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '18px', maxWidth: '600px', margin: '16px auto 0' }}>
            Traveling across cities? Drop off the car at your destination anywhere in Punjab, KPK, or Sindh with our flexible one-way service. Available with or without driver.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', textAlign: 'center' }}>
          <div className="premium-card" style={{ padding: '24px' }}><h3>Alto</h3></div>
          <div className="premium-card" style={{ padding: '24px' }}><h3>Cultus</h3></div>
          <div className="premium-card" style={{ padding: '24px' }}><h3>Yaris</h3></div>
          <div className="premium-card" style={{ padding: '24px' }}><h3>Civic</h3></div>
        </div>
      </section>

      {/* Partner Section */}
      <section id="partner" style={{ background: 'var(--surface-hover)', padding: '100px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 42px)', fontWeight: 800 }}>List Your <span className="gradient-text">Car With Us</span></h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '18px', margin: '16px 0 40px' }}>
            Want to rent out your car monthly? Partner with Popular Rent A Car. We ensure strict reference checks and verified clients.
          </p>
          <a href="/partner" className="btn-primary" style={{ padding: '16px 32px', fontSize: '18px' }}>Become a Partner</a>
        </div>
      </section>

      {/* Services Section */}
      <section style={{ background: 'var(--surface)', padding: '100px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 42px)', marginBottom: '60px', textAlign: 'center', fontWeight: 800 }}>
            Why Choose <span className="gradient-text">Popular Rent A Car</span>?
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px'
          }}>
            {[
              { title: "24/7 Support", desc: "Always here to help you on the road." },
              { title: "Best Rates", desc: "Competitive pricing with no hidden costs." },
              { title: "Clean Vehicles", desc: "Sanitized and well-maintained cars every time." },
              { title: "Pro Drivers", desc: "Experienced and verified professional chauffeurs." }
            ].map((service, i) => (
              <div key={i} className="premium-card" style={{ padding: '32px', textAlign: 'center' }}>
                <h3 style={{ color: 'var(--primary)', marginBottom: '12px', fontSize: '20px' }}>{service.title}</h3>
                <p style={{ color: 'var(--text-muted)' }}>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Airport Service & Reviews Section */}
      <section style={{ background: 'var(--surface-hover)', padding: '100px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px' }}>

          <div className="premium-card" style={{ padding: '40px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '20px' }}>
              <span className="gradient-text">Airport Pick & Drop</span> Service
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '18px', marginBottom: '30px' }}>
              Skip the taxi queues at Allama Iqbal International Airport. Book our reliable airport transfer service. Our professional drivers will be waiting for you upon arrival.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '30px' }}>
              <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>✅ Punctual & Reliable</li>
              <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>✅ Luxury Vehicles Available</li>
              <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>✅ Meet & Greet Service</li>
            </ul>
            <a href="https://wa.me/923041111111?text=Hi! I need an airport transfer." target="_blank" rel="noopener noreferrer" className="btn-primary">Book Airport Transfer</a>
          </div>

          <div className="premium-card" style={{ padding: '40px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '20px' }}>
              What Our <span className="gradient-text">Clients Say</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '18px', marginBottom: '30px' }}>
              Trusted by thousands of travelers. Read our latest Google Reviews.
            </p>

            <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: '16px', marginBottom: '20px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', gap: '4px', color: '#FFD700', marginBottom: '10px' }}>
                ★★★★★
              </div>
              <p style={{ color: 'var(--text-main)', fontStyle: 'italic', marginBottom: '10px' }}>
                "Excellent service! The car was in perfect condition and the driver was very professional. Highly recommended for one-way travel to Islamabad."
              </p>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>- Google User</p>
            </div>

            <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', gap: '4px', color: '#FFD700', marginBottom: '10px' }}>
                ★★★★★
              </div>
              <p style={{ color: 'var(--text-main)', fontStyle: 'italic', marginBottom: '10px' }}>
                "Booked an Audi for a wedding event. Seamless process and top-notch vehicle quality. Popular Rent A Car is indeed the best in Lahore."
              </p>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>- Local Guide</p>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '80px 24px 40px', borderTop: '1px solid var(--border)', background: 'var(--background)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
          <div>
            <h3 style={{ marginBottom: '20px', letterSpacing: '2px', fontWeight: 800 }}>Popular Rent A Car</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
              The most trusted car rental service in Pakistan. Travel anywhere with comfort, safety, and peace of mind.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '20px' }}>
              <a href="https://www.facebook.com/popularrentcars" target="_blank" rel="noreferrer" style={{ color: 'var(--text-main)', fontWeight: 600 }}>Facebook</a>
              <a href="https://www.instagram.com/popularrentacars" target="_blank" rel="noreferrer" style={{ color: 'var(--text-main)', fontWeight: 600 }}>Instagram</a>
              <a href="https://www.linkedin.com/company/popular-rent-car" target="_blank" rel="noreferrer" style={{ color: 'var(--text-main)', fontWeight: 600 }}>LinkedIn</a>
              <a href="https://www.pinterest.com/popularrentacars" target="_blank" rel="noreferrer" style={{ color: 'var(--text-main)', fontWeight: 600 }}>Pinterest</a>
              <a href="https://www.youtube.com/@popularrentacar_pk" target="_blank" rel="noreferrer" style={{ color: 'var(--text-main)', fontWeight: 600 }}>YouTube</a>
              <a href="https://www.tiktok.com/@muhammadimran.777" target="_blank" rel="noreferrer" style={{ color: 'var(--text-main)', fontWeight: 600 }}>TikTok</a>
            </div>
          </div>
          <div>
            <h4 style={{ marginBottom: '20px', color: 'var(--accent)', fontWeight: 700 }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><a href="#" style={{ color: 'var(--text-muted)' }}>Home</a></li>
              <li><a href="/fleet" style={{ color: 'var(--text-muted)' }}>Our Fleet</a></li>
              <li><a href="/partner" style={{ color: 'var(--text-muted)' }}>List Your Car</a></li>
              <li><a href="/about" style={{ color: 'var(--text-muted)' }}>About Us</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: '20px', color: 'var(--accent)', fontWeight: 700 }}>Contact</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-muted)' }}>
              <li>Mian Plaza, Civic Centre Block D-2, Phase 1, Johar Town, Lahore</li>
              <li>+92 304 9991234 (WhatsApp 24/7)</li>
              <li>info@popularrentacar.com</li>
              <li><a href="https://share.google/GWVrBltkF4hrlyH4m" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline', fontWeight: 600 }}>Google Business Profile</a></li>
            </ul>
          </div>
        </div>
        <div style={{ maxWidth: '1200px', margin: '60px auto 0', paddingTop: '30px', borderTop: '1px solid var(--border)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px' }}>
          © 2025 Popular Rent A Car. All rights reserved.
        </div>
      </footer>
    </>
  );
}
