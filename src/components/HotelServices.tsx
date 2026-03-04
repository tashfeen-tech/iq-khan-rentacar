"use client";

import { motion } from "framer-motion";
import { Coffee, Plane, MapPin, Star, Clock, UserCheck } from "lucide-react";
import styles from "./HotelServices.module.css";

const HOTEL_FEATURES = [
    {
        icon: UserCheck,
        title: "Professional Protocol",
        desc: "Specialized chauffeurs trained in hospitality etiquette and guest protocol."
    },
    {
        icon: Plane,
        title: "Seamless Transfers",
        desc: "Door-to-door airport transfers for domestic and international guests."
    },
    {
        icon: Clock,
        title: "24/7 Availability",
        desc: "Round-the-clock service to accommodate early arrivals and late departures."
    },
    {
        icon: MapPin,
        title: "City Wide Coverage",
        desc: "Efficient transportation between hotels, business districts, and landmarks."
    },
    {
        icon: Coffee,
        title: "Guest Comfort",
        desc: "Immaculately maintained vehicles equipped for premium guest comfort."
    },
    {
        icon: Star,
        title: "VIP Experience",
        desc: "A first-class experience tailored to the needs of luxury hotel residents."
    }
];

const HotelServices = () => {
    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className={styles.badge}
                >
                    Hospitality Excellence
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={styles.title}
                >
                    Transportation for <span className="gradient-text">Hotels & Guests</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true }}
                    className={styles.subtitle}
                >
                    We provide specialized transportation solutions for the hospitality sector,
                    ensuring every guest receives the same level of care and luxury outside
                    the hotel as they do inside.
                </motion.p>
            </div>

            <div className={styles.grid}>
                {HOTEL_FEATURES.map((feature, i) => (
                    <motion.div
                        key={i}
                        className={styles.featureCard}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.08 }}
                        viewport={{ once: true }}
                    >
                        <div className={styles.iconWrapper}>
                            <feature.icon size={28} />
                        </div>
                        <div className={styles.content}>
                            <h3>{feature.title}</h3>
                            <p>{feature.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default HotelServices;
