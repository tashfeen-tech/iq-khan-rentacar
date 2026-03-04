"use client";

import { motion } from "framer-motion";
import { Heart, Car, Camera, Clock, Star, Users, MapPin, Calendar, Sparkles } from "lucide-react";
import styles from "./ArmoredServices.module.css";

const WEDDING_SERVICES = [
    {
        icon: Heart,
        title: "Wedding Car Decoration",
        desc: "Beautifully decorated bridal cars with fresh flowers and ribbons for your special day."
    },
    {
        icon: Car,
        title: "Luxury Fleet for Weddings",
        desc: "Premium sedans, SUVs, and luxury vehicles for the bride, groom, and family."
    },
    {
        icon: Users,
        title: "Baraat & Guest Transport",
        desc: "Full fleet arrangements for baraat processions and guest transportation needs."
    },
    {
        icon: Camera,
        title: "Photo-Ready Vehicles",
        desc: "Spotless, polished, and camera-ready vehicles for your wedding photography."
    },
    {
        icon: Calendar,
        title: "Multi-Day Event Packages",
        desc: "Flexible packages covering mehndi, baraat, walima, and all wedding functions."
    },
    {
        icon: Clock,
        title: "On-Time Coordination",
        desc: "Punctual and reliable service with dedicated coordinators for seamless event flow."
    },
    {
        icon: MapPin,
        title: "Venue-to-Venue Transfers",
        desc: "Smooth transfers between wedding halls, marquees, and event venues across Lahore."
    },
    {
        icon: Star,
        title: "VIP Guest Experience",
        desc: "Premium hospitality for your VIP guests with professional chauffeur-driven service."
    },
    {
        icon: Sparkles,
        title: "Corporate Events & Celebrations",
        desc: "Elegant transportation for corporate galas, anniversaries, and private celebrations."
    }
];

const WeddingServices = () => {
    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className={styles.badge}
                >
                    Celebrations & Events
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={styles.title}
                >
                    Wedding & <span className="gradient-text">Event Cars</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true }}
                    className={styles.subtitle}
                >
                    At IQ Khan Rent A Car, we make your celebrations unforgettable with our premium
                    chauffeur-driven vehicles. From wedding processions to corporate events,
                    we provide elegant and reliable transportation.
                </motion.p>
            </div>

            <div className={styles.grid}>
                {WEDDING_SERVICES.map((service, i) => (
                    <motion.div
                        key={i}
                        className={styles.serviceCard}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        viewport={{ once: true }}
                    >
                        <div className={styles.iconBox}>
                            <service.icon size={24} />
                        </div>
                        <h3>{service.title}</h3>
                        <p>{service.desc}</p>
                    </motion.div>
                ))}
            </div>

            <div className={styles.vehicleHighlight}>
                <div className={styles.highlightContent}>
                    <h3>Popular Wedding Cars</h3>
                    <p>Our most requested vehicles for weddings and events include:</p>
                    <ul>
                        <li>Honda Civic 2023 (Decorated)</li>
                        <li>Toyota Fortuner (Baraat Fleet)</li>
                        <li>Toyota Land Cruiser Prado (VIP)</li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default WeddingServices;
