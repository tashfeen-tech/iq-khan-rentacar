"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, CreditCard, CheckCircle2 } from "lucide-react";
import styles from "./RentalPlans.module.css";

const PLANS = [
    {
        id: "weekly",
        title: "Weekly Rental",
        period: "7+ Days",
        desc: "Ideal for short business trips, family visits, or temporary vehicle needs.",
        features: [
            "Fixed Weekly Pricing",
            "Unlimited Mileage in City",
            "Free Replacement Vehicle",
            "24/7 Roadside Support"
        ],
        badge: "Most Popular",
        gradient: "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)"
    },
    {
        id: "monthly",
        title: "Monthly Subscription",
        period: "30+ Days",
        desc: "Maximum savings for long-term use. No long-term commitments required.",
        features: [
            "Save up to 25% vs Daily",
            "Full Service & Maintenance",
            "Flexible Swap Options",
            "Priority Doorstep Delivery"
        ],
        badge: "Best Value",
        gradient: "linear-gradient(135deg, #2a0a0a 0%, #0a0a0a 100%)",
        accent: "#eb212e"
    },
    {
        id: "corporate",
        title: "Corporate Fleet",
        period: "Annual Plans",
        desc: "High-end fleet solutions for businesses and NGOs. Zero ownership hassle.",
        features: [
            "Dedicated Account Manager",
            "Custom Fleet Branding",
            "Security Details Optional",
            "Consolidated Monthly Billing"
        ],
        badge: "Premium",
        gradient: "linear-gradient(135deg, #111 0%, #000 100%)"
    }
];

const RentalPlans = () => {
    return (
        <section className={styles.section} id="offers">
            <div className={styles.container}>
                <div className={styles.header}>
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={styles.tagline}
                    >
                        Flexible Options
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className={styles.title}
                    >
                        Rental Plans Tailored to <span className="gradient-text">Your Needs</span>
                    </motion.h2>
                    <p className={styles.subtitle}>
                        Choose from our flexible duration-based plans designed for maximum value and convenience.
                        No hidden costs, just pure mobility.
                    </p>
                </div>

                <div className={styles.grid}>
                    {PLANS.map((plan, i) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={styles.card}
                            style={{ background: plan.gradient, border: plan.accent ? `1px solid ${plan.accent}44` : '1px solid var(--border)' }}
                        >
                            {plan.badge && <span className={styles.badge} style={{ background: plan.accent || 'var(--accent)' }}>{plan.badge}</span>}

                            <div className={styles.cardHeader}>
                                <h3 className={styles.planTitle}>{plan.title}</h3>
                                <div className={styles.period}>{plan.period}</div>
                            </div>

                            <p className={styles.description}>{plan.desc}</p>

                            <ul className={styles.features}>
                                {plan.features.map((feature, idx) => (
                                    <li key={idx}>
                                        <CheckCircle2 size={18} className={styles.icon} style={{ color: plan.accent || 'var(--accent)' }} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>


                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RentalPlans;
