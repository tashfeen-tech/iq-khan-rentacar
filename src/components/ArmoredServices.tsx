"use client";

import { motion } from "framer-motion";
import { Shield, ShieldAlert, Users, Plane, Calendar, MapPin, Lock, FileCheck, Car } from "lucide-react";
import styles from "./ArmoredServices.module.css";

const ARMORED_SERVICES = [
    {
        icon: Shield,
        title: "VIP & Executive Secure Transportation",
        desc: "Safe and discreet travel for high-profile individuals and executives."
    },
    {
        icon: Users,
        title: "Diplomatic & Government Convoys",
        desc: "Reliable armored vehicles for official movements and state assignments."
    },
    {
        icon: ShieldAlert,
        title: "High-Risk Area Travel Protection",
        desc: "Enhanced security for travel in sensitive or high-threat locations."
    },
    {
        icon: FileCheck,
        title: "Security-Trained Chauffeur Services",
        desc: "Professional drivers trained in defensive and evasive driving techniques."
    },
    {
        icon: Plane,
        title: "Airport & Protocol Escort Services",
        desc: "Secure arrivals and departures with full protocol coordination."
    },
    {
        icon: Car,
        title: "Event & Official Visit Security",
        desc: "Armored transportation for meetings, events, and official engagements."
    },
    {
        icon: MapPin,
        title: "Intercity Secure Travel",
        desc: "Protected long-distance travel between cities with comfort and safety."
    },
    {
        icon: Calendar,
        title: "Short & Long-Term Armored Rentals",
        desc: "Flexible rental options tailored to short stays or extended security needs."
    },
    {
        icon: Lock,
        title: "Discreet & Confidential Transportation",
        desc: "Privacy-focused services ensuring complete client confidentiality."
    }
];

const ArmoredServices = () => {
    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className={styles.badge}
                >
                    Premium Security
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={styles.title}
                >
                    Bulletproof & <span className="gradient-text">Armored Vehicles</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true }}
                    className={styles.subtitle}
                >
                    At Popular Rent A Car, we understand that security is not a luxury—it is a necessity.
                    Our bulletproof and armored vehicle rental services are designed to provide maximum
                    protection, comfort, and discretion.
                </motion.p>
            </div>

            <div className={styles.grid}>
                {ARMORED_SERVICES.map((service, i) => (
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
                    <h3>Specialized Fleet</h3>
                    <p>Our armored fleet primarily features B6/B7 level protection on vehicles like:</p>
                    <ul>
                        <li>Toyota Land Cruiser LC200 / LC300</li>
                        <li>Toyota Fortuner</li>
                        <li>Mercedes-Benz S-Class</li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default ArmoredServices;
