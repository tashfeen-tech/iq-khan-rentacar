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
import Partners from "@/components/Partners";
import WeddingServices from "@/components/WeddingServices";
import HotelServices from "@/components/HotelServices";
import VideoGallery from "@/components/VideoGallery";
import RentalPlans from "@/components/RentalPlans";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

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

  const displayFleet = fleetData.length > 0
    ? [...fleetData, ...FLEET_DATA.filter(fc => !fleetData.find(dbCar => dbCar.id === fc.id))]
    : FLEET_DATA;

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
      features: ["Chauffeur Driven", "Professional Service", "Flexible Timing"]
    });
    setIsModalOpen(true);
  };

  return (
    <>
      <Navbar />
      <Hero onBookService={handleBookService} />

      {/* Quick Booking CTAs */}
      <section style={{ padding: '60px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '30px'
        }}>
          {/* Wedding / Event Booking Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={() => handleBookService("Wedding & Event Booking")}
            className="premium-card"
            style={{
              padding: '60px 40px',
              textAlign: 'center',
              cursor: 'pointer',
              background: 'linear-gradient(145deg, #051a0f 0%, #050505 100%)',
              border: '1px solid rgba(46, 204, 113, 0.27)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px'
            }}
          >
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              width: '120px',
              height: '120px',
              background: 'radial-gradient(circle, rgba(46, 204, 113, 0.2) 0%, transparent 70%)'
            }} />

            <div style={{ fontSize: '60px', marginBottom: '10px' }}>💍</div>

            <h3 style={{ fontSize: '28px', fontWeight: 900, color: '#fff' }}>
              Book for <span style={{ color: '#2ecc71' }}>Wedding & Events</span>
            </h3>

            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: '0 0 24px 0',
              color: 'var(--text-muted)',
              textAlign: 'left',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              fontSize: '13px'
            }}>
              <li>✓ Decorated Bridal Cars</li>
              <li>✓ Baraat Fleet Arrangements</li>
              <li>✓ Professional Chauffeurs</li>
              <li>✓ Multi-Day Event Packages</li>
              <li>✓ Mehndi, Baraat & Walima</li>
              <li>✓ Photo-Ready Vehicles</li>
              <li>✓ Honda Civic, Fortuner & Prado</li>
              <li>✓ On-Time Guaranteed Service</li>
            </ul>

            <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
              <span className="btn-primary" style={{ padding: '16px', fontSize: '15px', flex: 1, textAlign: 'center', justifyContent: 'center' }}>Book Form</span>
              <a href="https://wa.me/923340002910?text=Hi! I want to book a Wedding Car." target="_blank" rel="noopener noreferrer" className="btn-primary" onClick={(e) => e.stopPropagation()} style={{ padding: '16px', fontSize: '15px', flex: 1, background: '#25D366', color: '#000', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none' }}>
                <span style={{ fontSize: '18px' }}>💬</span> WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Corporate Rental Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            onClick={() => handleBookService("Corporate Rental Solution")}
            className="premium-card"
            style={{
              padding: '60px 40px',
              textAlign: 'center',
              cursor: 'pointer',
              background: 'linear-gradient(145deg, #051a0f 0%, #050505 100%)',
              border: '1px solid rgba(46, 204, 113, 0.27)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px'
            }}
          >
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              width: '120px',
              height: '120px',
              background: 'radial-gradient(circle, rgba(46, 204, 113, 0.13) 0%, transparent 70%)'
            }} />

            <div style={{ fontSize: '60px', marginBottom: '10px' }}>🏢</div>

            <h3 style={{ fontSize: '28px', fontWeight: 900, color: '#fff' }}>
              Book for your <span style={{ color: '#2ecc71' }}>Corporation</span>
            </h3>

            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: '0 0 24px 0',
              color: 'var(--text-muted)',
              textAlign: 'left',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              fontSize: '13px'
            }}>
              <li>✓ 24/7 Priority Ops Support</li>
              <li>✓ Monthly Fleet Contracts</li>
              <li>✓ Executive Protocol Services</li>
              <li>✓ Professional Chauffeurs</li>
              <li>✓ Trusted by Pepsi & Nestle</li>
              <li>✓ Logistics Coordination</li>
              <li>✓ Scalable Business Leasing</li>
              <li>✓ Dedicated Account Managers</li>
            </ul>

            <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
              <span className="btn-primary" style={{ padding: '16px', fontSize: '15px', flex: 1, textAlign: 'center', justifyContent: 'center' }}>Inquiry Form</span>
              <a href="https://wa.me/923340002910?text=Hi! I need Corporate Rental Solutions." target="_blank" rel="noopener noreferrer" className="btn-primary" onClick={(e) => e.stopPropagation()} style={{ padding: '16px', fontSize: '15px', flex: 1, background: '#25D366', color: '#000', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none' }}>
                <span style={{ fontSize: '18px' }}>💬</span> WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <WeddingServices />
      <HotelServices />
      <RentalPlans />
      <VideoGallery />

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

          <p style={{ color: 'var(--text-muted)', textAlign: 'center', maxWidth: '600px', margin: '0 auto 16px', fontSize: '18px' }}>
            {loading ? "Loading available vehicles..." : "Choose from our diverse range of well-maintained vehicles. All rentals include a professional chauffeur."}
          </p>
          <p style={{ color: '#2ecc71', textAlign: 'center', fontSize: '14px', fontWeight: 600, marginBottom: '60px' }}>
            🚗 All vehicles are chauffeur-driven with professional drivers
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

      <Partners title="Affiliated Corporate Partners" />

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
            Want to rent out your car monthly? Partner with IQ Khan Rent A Car. We ensure strict reference checks and verified clients.
          </p>
          <a href="/partner" className="btn-primary" style={{ padding: '16px 32px', fontSize: '18px' }}>Become a Partner</a>
        </div>
      </section>

      {/* Services Section */}
      <section style={{ background: 'var(--surface)', padding: '100px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 42px)', marginBottom: '60px', textAlign: 'center', fontWeight: 800 }}>
            Why Choose <span className="gradient-text">IQ Khan Rent A Car</span>?
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px'
          }}>
            {[
              { icon: "📞", title: "24/7 Support", desc: "Always here to help you on the road." },
              { icon: "💰", title: "Best Rates", desc: "Competitive pricing with no hidden costs." },
              { icon: "✨", title: "Clean Vehicles", desc: "Sanitized and well-maintained cars every time." },
              { icon: "🤝", title: "Pro Drivers", desc: "Experienced and verified professional chauffeurs." }
            ].map((service, i) => (
              <div key={i} className="premium-card" style={{ padding: '32px', textAlign: 'center' }}>
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>{service.icon}</div>
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
                &quot;Excellent service! The car was in perfect condition and the driver was very professional. Highly recommended for one-way travel to Islamabad.&quot;
              </p>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 'bold' }}>- Google User</p>
            </div>

            <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', gap: '4px', color: '#FFD700', marginBottom: '10px' }}>★★★★★</div>
              <p style={{ color: 'var(--text-main)', fontStyle: 'italic', marginBottom: '10px' }}>
                &quot;Booked a decorated car for our wedding. Seamless process and the vehicle looked stunning. IQ Khan Rent A Car is the best in Lahore.&quot;
              </p>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 'bold' }}>- Local Guide</p>
            </div>

            <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', gap: '4px', color: '#FFD700', marginBottom: '10px' }}>★★★★★</div>
              <p style={{ color: 'var(--text-main)', fontStyle: 'italic', marginBottom: '10px' }}>
                &quot;I used their airport pick and drop service. The driver was waiting at the terminal right on time. Highly prompt and extremely reliable.&quot;
              </p>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 'bold' }}>- Sarah K.</p>
            </div>

            <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', gap: '4px', color: '#FFD700', marginBottom: '10px' }}>★★★★★</div>
              <p style={{ color: 'var(--text-main)', fontStyle: 'italic', marginBottom: '10px' }}>
                &quot;Best car rental in Lahore. I rented a Yaris for 3 days and the entire process from booking to returning was fully smooth with zero hidden charges.&quot;
              </p>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 'bold' }}>- Ali R.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
