"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, User, Phone, Mail, LogIn } from "lucide-react";
import styles from "./BookingModal.module.css";
import { Car } from "@/data/fleet";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/lib/AuthContext";
import Link from "next/link";

interface BookingModalProps {
    car: Car | null;
    isOpen: boolean;
    onClose: () => void;
}

const BookingModal = ({ car, isOpen, onClose }: BookingModalProps) => {
    const { user, profile } = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        pickupDate: "",
        returnDate: "",
        withDriver: false,
        message: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    // Auto-fill from logged-in user profile
    useEffect(() => {
        if (user && profile) {
            setFormData(prev => ({
                ...prev,
                name: profile.name || prev.name,
                email: profile.email || user.email || prev.email,
                phone: profile.phone || prev.phone,
            }));
        }
    }, [user, profile]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!car) return;



        setLoading(true);
        setError("");

        try {
            const start = new Date(formData.pickupDate);
            const end = new Date(formData.returnDate);
            const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24)) || 1;

            await addDoc(collection(db, "bookings"), {
                ...formData,
                carId: car.id,
                carName: car.name,
                carImage: car.image,
                status: "pending",
                userId: user?.uid || null,
                createdAt: serverTimestamp(),
                days: days > 0 ? days : 1,
                totalPrice: 0, // Admin updates this
                read: false
            });
            setSuccess(true);
            // Reset form
            setFormData(prev => ({
                ...prev,
                message: "",
                pickupDate: "",
                returnDate: ""
            }));
            setTimeout(() => {
                onClose();
                setSuccess(false);
            }, 3000);
        } catch (err) {
            console.error("Booking error:", err);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };



    if (!isOpen || !car) return null;



    return (
        <AnimatePresence>
            <div className={styles.overlay} onClick={onClose}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className={styles.modal}
                    onClick={e => e.stopPropagation()}
                >
                    <button className={styles.closeBtn} onClick={onClose}><X /></button>

                    {success ? (
                        <div className={styles.successMessage}>
                            <div className={styles.successIcon}>✓</div>
                            <h2>Inquiry Sent!</h2>
                            <p>We will contact you shortly about the {car?.name}.</p>
                            {user ? null : (
                                <Link href="/auth" style={{ display: 'inline-block', marginTop: '16px', color: 'var(--primary)', fontWeight: 600 }}>
                                    <LogIn size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                                    Sign up to track your bookings
                                </Link>
                            )}
                        </div>
                    ) : (
                        <div className={styles.grid}>
                            <div className={styles.carInfo}>
                                <div className={styles.carImagePlaceholder}>
                                    <img src={car.image} alt={car.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
                                </div>
                                <h3>{car.name}</h3>
                                <p className={styles.carType}>{car.type}</p>

                                <ul className={styles.featureList}>
                                    {car.features.map((f, i) => <li key={i}>{f}</li>)}
                                </ul>
                            </div>

                            <div className={styles.formContainer}>
                                <h2>Book This Vehicle</h2>

                                {!user && (
                                    <Link href="/auth" style={{
                                        display: 'flex', alignItems: 'center', gap: '8px',
                                        padding: '12px 16px', background: 'rgba(212,175,55,0.08)',
                                        border: '1px solid rgba(212,175,55,0.2)', borderRadius: '12px',
                                        color: 'var(--primary)', fontSize: '13px', fontWeight: 600,
                                        marginBottom: '20px', textDecoration: 'none'
                                    }}>
                                        <LogIn size={16} /> Sign in to auto-fill & track your bookings
                                    </Link>
                                )}

                                <form onSubmit={handleSubmit} className={styles.form}>
                                    <div className={styles.inputGroup}>
                                        <label><User size={16} /> Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Enter your name"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>

                                    <div className={styles.inputRow}>
                                        <div className={styles.inputGroup}>
                                            <label><Phone size={16} /> Phone</label>
                                            <input
                                                type="tel"
                                                required
                                                placeholder="03xx xxxxxxx"
                                                value={formData.phone}
                                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                            />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label><Mail size={16} /> Email</label>
                                            <input
                                                type="email"
                                                required
                                                placeholder="your@email.com"
                                                value={formData.email}
                                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.inputRow}>
                                        <div className={styles.inputGroup}>
                                            <label><Calendar size={16} /> Pickup Date</label>
                                            <input
                                                type="date"
                                                required
                                                value={formData.pickupDate}
                                                onChange={e => setFormData({ ...formData, pickupDate: e.target.value })}
                                            />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label><Calendar size={16} /> Return Date</label>
                                            <input
                                                type="date"
                                                required
                                                value={formData.returnDate}
                                                onChange={e => setFormData({ ...formData, returnDate: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.toggleGroup}>
                                        <label style={{ fontSize: '14px', fontWeight: 600 }}>Do you need a driver?</label>
                                        <div className={styles.toggle}>
                                            <button
                                                type="button"
                                                className={!formData.withDriver ? styles.active : ""}
                                                onClick={() => setFormData({ ...formData, withDriver: false })}
                                            >
                                                Self Drive
                                            </button>
                                            <button
                                                type="button"
                                                className={formData.withDriver ? styles.active : ""}
                                                onClick={() => setFormData({ ...formData, withDriver: true })}
                                            >
                                                With Driver
                                            </button>
                                        </div>
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label>Message / Requirements</label>
                                        <textarea
                                            required
                                            rows={4}
                                            placeholder={`I am interested in renting the ${car.name}...`}
                                            value={formData.message}
                                            onChange={e => setFormData({ ...formData, message: e.target.value })}
                                            style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-main)', resize: 'vertical' }}
                                        />
                                    </div>

                                    {error && <p className={styles.error}>{error}</p>}

                                    <button
                                        type="submit"
                                        className={styles.submitBtn}
                                        disabled={loading}
                                    >
                                        {loading ? "Sending..." : `Send Inquiry`}
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default BookingModal;
