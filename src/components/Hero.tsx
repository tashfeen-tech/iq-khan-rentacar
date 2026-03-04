"use client";

import { motion } from "framer-motion";
import { ChevronRight, Calendar, MapPin, Search } from "lucide-react";
import styles from "./Hero.module.css";

const Hero = ({ onBookService }: { onBookService?: (serviceName: string) => void }) => {
    return (
        <section className={styles.hero}>
            <div className={styles.overlay}></div>

            <div className={styles.container}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', paddingTop: '80px', paddingBottom: '60px' }}>

                    {/* One-Way Service Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="premium-card"
                        style={{ padding: '40px', background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(46, 204, 113, 0.27)' }}
                    >
                        <h2 style={{ fontSize: '30px', fontWeight: 900, marginBottom: '20px', color: '#fff' }}>
                            <span style={{ color: '#2ecc71' }}>All Pakistan</span> <br /> One-Way Service
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
                            <li>✓ Inter-City Travel Across Punjab, KPK & Sindh</li>
                            <li>✓ Flat Rates for Major City Drops (LHE-ISB-KHI)</li>
                            <li>✓ Self-Drive or Chauffeur Driven Options</li>
                            <li>✓ Fuel & Toll Inclusive Packages Available</li>
                            <li>✓ Comprehensive Insurance & 24/7 Support</li>
                            <li>✓ Wide Selection of Sedans, SUVs & MPVs</li>
                            <li>✓ Door-to-Door Pickup & Delivery Service</li>
                            <li>✓ Guaranteed Clean & Sanitized Vehicles</li>
                        </ul>

                        <button onClick={() => onBookService?.("All Pakistan One-Way Service")} className="btn-primary" style={{ width: '100%', textAlign: 'center', border: 'none', cursor: 'pointer' }}>
                            Book One-Way Trip
                        </button>
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
                            <span style={{ color: '#2ecc71' }}>Airport Pick & Drop</span> <br /> Service
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
                            <li>✓ Seamless Transfers from Allama Iqbal Airport</li>
                            <li>✓ Flight Tracking & Guaranteed Pickup</li>
                            <li>✓ Professional Meet & Greet at Terminal</li>
                            <li>✓ Assistance with Luggage & Coordination</li>
                            <li>✓ Premium Sedans for VIP Guests</li>
                            <li>✓ Fixed Pricing - No Hidden Surcharges</li>
                            <li>✓ Round-the-clock Availability for All Flights</li>
                            <li>✓ Safe & Sanitized Premium Experience</li>
                        </ul>

                        <button onClick={() => onBookService?.("Airport Pick & Drop Service")} className="btn-primary" style={{ width: '100%', textAlign: 'center', border: 'none', cursor: 'pointer' }}>
                            Book Airport Transfer
                        </button>
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
