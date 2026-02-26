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

  const handleBookService = (serviceName: string) => {
    setSelectedCar({
      id: "service-" + serviceName.toLowerCase().replace(/ /g, '-'),
      name: serviceName,
      type: "Premium Service",
      transmission: "Automatic",
      seats: 4,
      image: "/logo.png",
      available: true,
      features: ["VIP Treatment", "Chauffeur Included", "Flexible Timing"]
    });
    setIsModalOpen(true);
  };

  return (
    <>
      <Navbar />
      <Hero onBookService={handleBookService} />

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

      {/* Reviews Section */}
      <section style={{ background: 'var(--surface-hover)', padding: '100px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '20px', textAlign: 'center' }}>
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '18px', marginBottom: '50px', textAlign: 'center' }}>
            Trusted by thousands of travelers. Read our latest Google Reviews.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', gap: '4px', color: '#FFD700', marginBottom: '10px' }}>★★★★★</div>
              <p style={{ color: 'var(--text-main)', fontStyle: 'italic', marginBottom: '10px' }}>
                "Excellent service! The car was in perfect condition and the driver was very professional. Highly recommended for one-way travel to Islamabad."
              </p>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 'bold' }}>- Google User</p>
            </div>

            <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', gap: '4px', color: '#FFD700', marginBottom: '10px' }}>★★★★★</div>
              <p style={{ color: 'var(--text-main)', fontStyle: 'italic', marginBottom: '10px' }}>
                "Booked an Audi for a wedding event. Seamless process and top-notch vehicle quality. Popular Rent A Car is indeed the best in Lahore."
              </p>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 'bold' }}>- Local Guide</p>
            </div>

            <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', gap: '4px', color: '#FFD700', marginBottom: '10px' }}>★★★★★</div>
              <p style={{ color: 'var(--text-main)', fontStyle: 'italic', marginBottom: '10px' }}>
                "I used their airport pick and drop service. The driver was waiting at the terminal right on time. Highly prompt and extremely reliable."
              </p>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 'bold' }}>- Sarah K.</p>
            </div>

            <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', gap: '4px', color: '#FFD700', marginBottom: '10px' }}>★★★★★</div>
              <p style={{ color: 'var(--text-main)', fontStyle: 'italic', marginBottom: '10px' }}>
                "Best car rental in Lahore. I rented a Yaris for 3 days and the entire process from booking to returning was fully smooth with zero hidden charges."
              </p>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 'bold' }}>- Ali R.</p>
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
              <li>popularrentacar938@gmail.com</li>
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
