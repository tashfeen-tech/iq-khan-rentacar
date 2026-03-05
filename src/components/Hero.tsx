"use client";

import { motion } from "framer-motion";
import { ChevronRight, Calendar, MapPin, Search, MessageCircle } from "lucide-react";
import styles from "./Hero.module.css";

const Hero = ({ onBookService }: { onBookService?: (serviceName: string) => void }) => {
    return (
        <section className={styles.hero}>
            <div className={styles.overlay}></div>

            <div className={styles.container}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', paddingTop: '80px', paddingBottom: '60px' }}>

                    {/* One Side Drop Service Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="premium-card"
                        style={{ padding: '40px', background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(46, 204, 113, 0.27)' }}
                    >
                        <h2 style={{ fontSize: '30px', fontWeight: 900, marginBottom: '20px', color: '#fff' }}>
                            🗺️ <span style={{ color: '#2ecc71' }}>One Side</span> <br /> Drop Service
                        </h2>

                        <ul style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: '0 0 25px 0',
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontSize: '14px',
                            display: 'grid',
                            gridTemplateColumns: '1fr',
                            gap: '8px'
                        }}>
                            <li>✓ Lahore ↔ Islamabad / Rawalpindi</li>
                            <li>✓ Lahore ↔ Multan</li>
                            <li>✓ Islamabad / Rawalpindi ↔ Multan</li>
                            <li>✓ Professional Chauffeur-Driven Service</li>
                            <li>✓ Comfortable & Clean Vehicles</li>
                            <li>✓ Door-to-Door Pickup & Drop</li>
                            <li>✓ Fixed Rates - No Hidden Charges</li>
                            <li>✓ 24/7 Booking Availability</li>
                        </ul>

                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button onClick={() => onBookService?.("One Side Drop Service")} className="btn-primary" style={{ flex: 1, textAlign: 'center', border: 'none', cursor: 'pointer', fontSize: '14px' }}>
                                Book Form
                            </button>
                            <a href="https://wa.me/923340002910?text=Hi! I want to book the One Side Drop Service." target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ flex: 1, background: '#25D366', color: '#000', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', textDecoration: 'none', fontSize: '14px' }}>
                                <MessageCircle size={16} /> WhatsApp
                            </a>
                        </div>
                    </motion.div>

                    {/* Airport Pick & Drop Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="premium-card"
                        style={{ padding: '40px', background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(46, 204, 113, 0.27)' }}
                    >
                        <h2 style={{ fontSize: '30px', fontWeight: 900, marginBottom: '20px', color: '#fff' }}>
                            ✈️ <span style={{ color: '#2ecc71' }}>Airport Pick & Drop</span> <br /> Service
                        </h2>

                        <ul style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: '0 0 25px 0',
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontSize: '14px',
                            display: 'grid',
                            gridTemplateColumns: '1fr',
                            gap: '8px'
                        }}>
                            <li>✓ Allama Iqbal International Airport, Lahore</li>
                            <li>✓ Islamabad International Airport</li>
                            <li>✓ Flight Tracking & Guaranteed Pickup</li>
                            <li>✓ Professional Meet & Greet at Terminal</li>
                            <li>✓ Assistance with Luggage & Coordination</li>
                            <li>✓ Premium Chauffeur-Driven Sedans & SUVs</li>
                            <li>✓ Fixed Pricing - No Hidden Surcharges</li>
                            <li>✓ Round-the-clock Availability for All Flights</li>
                        </ul>

                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button onClick={() => onBookService?.("Airport Pick & Drop Service")} className="btn-primary" style={{ flex: 1, textAlign: 'center', border: 'none', cursor: 'pointer', fontSize: '14px' }}>
                                Book Form
                            </button>
                            <a href="https://wa.me/923340002910?text=Hi! I need an Airport Transfer Service." target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ flex: 1, background: '#25D366', color: '#000', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', textDecoration: 'none', fontSize: '14px' }}>
                                <MessageCircle size={16} /> WhatsApp
                            </a>
                        </div>
                    </motion.div>

                </div>
            </div>

            <div className={styles.scrollIndicator}>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className={styles.mouse}
                >
                    <div className={styles.wheel}></div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
