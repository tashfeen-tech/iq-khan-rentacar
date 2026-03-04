"use client";

import { motion } from "framer-motion";
import styles from "./Partners.module.css";

const PARTNERS = [
    "PEPSI",
    "Coca-Cola",
    "Nestlé",
    "PCB",
    "Tetra Pak",
    "USAID",
    "British Crafted",
    "World Bank Group"
];

const Partners = ({ title = "Our Affiliated Partners" }) => {
    return (
        <section className={styles.container}>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={styles.title}
            >
                {title.split(' ').map((word, i) => (
                    word === "Partners" || word === "Affiliated" ?
                        <span key={i} className="gradient-text">{word} </span> :
                        word + " "
                ))}
            </motion.h2>

            <div className={styles.logoGrid}>
                {PARTNERS.map((partner, i) => (
                    <motion.div
                        key={i}
                        className={styles.partnerCard}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        viewport={{ once: true }}
                    >
                        <span className={styles.partnerName}>{partner}</span>
                    </motion.div>
                ))}
            </div>

            {/* Infinite Scroll for Home page (simplified visual) */}
            <div className={styles.ticker}>
                <div className={styles.tickerContent}>
                    {[...PARTNERS, ...PARTNERS].map((partner, i) => (
                        <span key={i} className={styles.tickerItem}>{partner}</span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Partners;
