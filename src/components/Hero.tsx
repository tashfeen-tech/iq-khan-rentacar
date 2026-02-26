"use client";

import { motion } from "framer-motion";
import { ChevronRight, Calendar, MapPin, Search } from "lucide-react";
import styles from "./Hero.module.css";

const Hero = ({ onBookService }: { onBookService?: (serviceName: string) => void }) => {
    return (
        <section className={styles.hero}>
            <div className={styles.overlay}></div>

            <div className={styles.container}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', paddingTop: '100px', paddingBottom: '150px' }}>

                    {/* One-Way Service Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="premium-card"
                        style={{ padding: '40px', background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', border: '1px solid var(--border)' }}
                    >
                        <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '20px', color: '#fff' }}>
                            <span className="gradient-text">All Pakistan</span> <br /> One-Way Service
                        </h2>
                        <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '18px', marginBottom: '25px', lineHeight: 1.6 }}>
                            Drop off anywhere in Punjab, KPK, or Sindh with our flexible one-way service. Available with or without driver.
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '30px' }}>
                            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '8px', textAlign: 'center', color: '#fff' }}>Suzuki Alto</div>
                            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '8px', textAlign: 'center', color: '#fff' }}>Suzuki Cultus</div>
                            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '8px', textAlign: 'center', color: '#fff' }}>Toyota Yaris</div>
                            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '8px', textAlign: 'center', color: '#fff' }}>Honda Civic</div>
                        </div>
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
                        style={{ padding: '40px', background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', border: '1px solid var(--border)' }}
                    >
                        <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '20px', color: '#fff' }}>
                            <span className="gradient-text">Airport Pick & Drop</span> <br /> Service
                        </h2>
                        <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '18px', marginBottom: '30px', lineHeight: 1.6 }}>
                            Skip the taxi queues at Allama Iqbal Airport. Book our reliable airport transfer service with professional drivers.
                        </p>
                        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '30px', color: '#fff' }}>
                            <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>✅ Punctual & Reliable</li>
                            <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>✅ Luxury Vehicles Available</li>
                            <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>✅ Meet & Greet Service</li>
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
