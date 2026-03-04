"use client";

import { Car } from "@/data/fleet";
import { Users, Fuel, Gauge, CheckCircle2, Star, User } from "lucide-react";
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
                {/* With Driver Badge */}
                <div style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '10px',
                    background: 'rgba(46, 204, 113, 0.9)',
                    color: '#000000',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    backdropFilter: 'blur(4px)'
                }}>
                    <User size={12} /> With Driver
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.header}>
                    <h3 className={styles.name}>{car.name}</h3>
                    {/* Show price if set */}
                    {car.priceFleet && (
                        <div style={{
                            color: '#2ecc71',
                            fontWeight: 800,
                            fontSize: '16px',
                            marginTop: '4px'
                        }}>
                            Rs. {car.priceFleet}<span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-muted)' }}>/day</span>
                        </div>
                    )}
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
                        {car.available ? "Ready" : "Booked"}
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button className={styles.bookBtn}>
                            Book Now
                        </button>
                        <a
                            href={`https://wa.me/923340002910?text=Hi! I am interested in renting the ${car.name}.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                background: '#25D366',
                                borderRadius: '50px',
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#000000',
                                flexShrink: 0
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
