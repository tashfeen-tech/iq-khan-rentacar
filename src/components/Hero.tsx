"use client";

import { motion } from "framer-motion";
import styles from "./Hero.module.css";
import { Gauge, ShieldCheck, MapPin, ArrowRight, Zap } from "lucide-react";

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.overlay}></div>
            <div className={styles.container}>
                <div className={styles.content}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className={styles.badge}
                    >
                        <Zap size={16} fill="var(--accent)" color="var(--accent)" />
                        <span>PREMIUM CAR RENTAL SERVICE</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className={styles.title}
                    >
                        Your Premium Journey <br />Starts with <span className="gradient-text">Popular</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className={styles.subtitle}
                    >
                        Experience ultimate luxury and reliability with Pakistan&apos;s most trusted car rental.
                        From intercity tours to wedding decors — we drive your dreams.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.6 }}
                        className={styles.actions}
                    >
                        <button className="btn-primary" style={{ padding: '18px 40px', fontSize: '18px' }} onClick={() => document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' })}>
                            Explore Fleet <ArrowRight size={20} />
                        </button>
                        <button className="btn-outline" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', borderColor: 'rgba(255,255,255,0.3)', padding: '18px 40px', fontSize: '18px', backdropFilter: 'blur(10px)' }} onClick={() => document.getElementById('one-way')?.scrollIntoView({ behavior: 'smooth' })}>
                            One-Way Drop
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        className={styles.trust}
                    >
                        <div className={styles.trustItem}>
                            <ShieldCheck size={20} color="var(--success)" />
                            <span>100% Insured Fleet</span>
                        </div>
                        <div className={styles.trustItem}>
                            <MapPin size={20} color="var(--primary)" />
                            <span>Pakistan Wide Support</span>
                        </div>
                        <div className={styles.trustItem}>
                            <Gauge size={20} color="var(--accent)" />
                            <span>24/7 Roadside Help</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Floating Car Decoration (Visual only) */}
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className={styles.heroDecoration}
            >
                {/* We can put a high-res cutout of a luxury car here if needed */}
            </motion.div>
        </section>
    );
}
