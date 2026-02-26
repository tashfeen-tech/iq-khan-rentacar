"use client";

import { Car } from "@/data/fleet";
import { Users, Fuel, Gauge, CheckCircle2, Star } from "lucide-react";
import styles from "./CarCard.module.css";
import Image from "next/image";
interface CarCardProps {
    car: Car;
    priority?: boolean;
}

export default function CarCard({ car, priority }: CarCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={styles.image}
                    priority={priority}
                    style={{ objectFit: 'cover' }}
                />
                <div className={styles.typeBadge}>{car.type}</div>
                {car.id.includes('civic') || car.id.includes('grande') || car.id.includes('v8') ? (
                    <div className={styles.featuredBadge}>
                        <Star size={14} fill="currentColor" /> Featured
                    </div>
                ) : null}
            </div>

            <div className={styles.content}>
                <div className={styles.header}>
                    <h3 className={styles.name}>{car.name}</h3>
                </div>

                <div className={styles.specs}>
                    <div className={styles.specItem}>
                        <Users size={16} />
                        <span>{car.seats} Seats</span>
                    </div>
                    <div className={styles.specItem}>
                        <Gauge size={16} />
                        <span>{car.transmission}</span>
                    </div>
                    <div className={styles.specItem}>
                        <Fuel size={16} />
                        <span>High Efficiency</span>
                    </div>
                </div>

                <div className={styles.features}>
                    {car.features.slice(0, 3).map((feature, i) => (
                        <div key={i} className={styles.featureTag}>
                            <CheckCircle2 size={12} color="var(--success)" />
                            {feature}
                        </div>
                    ))}
                </div>

                <div className={styles.footer}>
                    <div className={styles.status}>
                        <div className={car.available ? styles.dotActive : styles.dotInactive}></div>
                        {car.available ? "Ready to Rent" : "Booked Today"}
                    </div>
                    <button className={styles.bookBtn}>
                        Check Availability
                    </button>
                </div>
            </div>
        </div>
    );
}
