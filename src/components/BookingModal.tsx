"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, User, Phone, Mail, LogIn, MessageCircle, MapPin, Shield, Users, Clock } from "lucide-react";
import styles from "./BookingModal.module.css";
import { Car, FLEET_DATA } from "@/data/fleet";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/lib/AuthContext";
import Link from "next/link";
import Image from "next/image";

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
        message: "",
        fromCity: "",
        toCity: "",
        airport: "",
        time: "",
        selectedFleetCar: "",
        protectionLevel: "B6",
        companyName: "",
        duration: "Monthly"
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
                name: formData.name,
                email: formData.email.toLowerCase(),
                phone: formData.phone,
                pickupDate: formData.pickupDate,
                returnDate: formData.returnDate,
                withDriver: formData.withDriver,
                message: formData.message,
                fromCity: formData.fromCity,
                toCity: formData.toCity,
                airport: formData.airport,
                time: formData.time,
                selectedFleetCar: formData.selectedFleetCar,
                protectionLevel: formData.protectionLevel,
                companyName: formData.companyName,
                duration: formData.duration,
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
                returnDate: "",
                fromCity: "",
                toCity: "",
                airport: "",
                time: "",
                selectedFleetCar: ""
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

    const isOneWay = car.id === 'service-all-pakistan-one-way-service';
    const isAirport = car.id === 'service-airport-pick-&-drop-service';
    const isArmored = car.id === 'service-bulletproof-armored-vehicle';
    const isCorporate = car.id === 'service-corporate-rental-solution';
    const isSpecial = isOneWay || isAirport || isArmored || isCorporate;

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
                                    <Image
                                        src={car.image}
                                        alt={car.name}
                                        fill
                                        priority
                                        style={{
                                            objectFit: car.image.includes('logo') ? 'contain' : 'cover',
                                            borderRadius: '16px',
                                            padding: car.image.includes('logo') ? '20px' : '0'
                                        }}
                                    />
                                </div>
                                <h3>{car.name}</h3>
                                <p className={styles.carType}>{car.type}</p>

                                <ul className={styles.featureList}>
                                    {car.features.map((f, i) => <li key={i}>{f}</li>)}
                                </ul>
                            </div>

                            <div className={styles.formContainer}>
                                {isSpecial && (
                                    <div className={styles.mobileLogo}>
                                        <Image
                                            src={car.image}
                                            alt={car.name}
                                            width={150}
                                            height={60}
                                            style={{ objectFit: 'contain' }}
                                        />
                                    </div>
                                )}
                                <h2>{isSpecial ? car.name : "Book This Vehicle"}</h2>

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

                                    {isSpecial ? (
                                        <>
                                            <div className={styles.inputGroup} style={{ marginBottom: '15px' }}>
                                                <label>Select Car</label>
                                                <select
                                                    required
                                                    value={formData.selectedFleetCar}
                                                    onChange={e => setFormData({ ...formData, selectedFleetCar: e.target.value })}
                                                    style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-main)' }}
                                                >
                                                    <option value="" disabled>Choose a vehicle...</option>
                                                    {FLEET_DATA.map(c => (
                                                        <option key={c.id} value={c.name}>{c.name}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            {isOneWay && (
                                                <div className={styles.inputRow}>
                                                    <div className={styles.inputGroup}>
                                                        <label><MapPin size={16} /> From City</label>
                                                        <input
                                                            type="text"
                                                            required
                                                            placeholder="City name"
                                                            value={formData.fromCity}
                                                            onChange={e => setFormData({ ...formData, fromCity: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className={styles.inputGroup}>
                                                        <label><MapPin size={16} /> To City</label>
                                                        <input
                                                            type="text"
                                                            required
                                                            placeholder="City in Punjab, KPK, Sindh"
                                                            value={formData.toCity}
                                                            onChange={e => setFormData({ ...formData, toCity: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            {isAirport && (
                                                <div className={styles.inputGroup} style={{ marginBottom: '15px' }}>
                                                    <label><MapPin size={16} /> Airport</label>
                                                    <select
                                                        required
                                                        value={formData.airport}
                                                        onChange={e => setFormData({ ...formData, airport: e.target.value })}
                                                        style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-main)' }}
                                                    >
                                                        <option value="" disabled>Select Airport</option>
                                                        <option value="Allama Iqbal International Airport, Lahore">Allama Iqbal International Airport, Lahore</option>
                                                        <option value="Jinnah International Airport, Karachi">Jinnah International Airport, Karachi</option>
                                                        <option value="Islamabad International Airport">Islamabad International Airport</option>
                                                    </select>
                                                </div>
                                            )}

                                            <div className={styles.inputGroup} style={{ marginBottom: '15px' }}>
                                                <label><Calendar size={16} /> Date & Time</label>
                                                <input
                                                    type="datetime-local"
                                                    required
                                                    value={formData.pickupDate}
                                                    onChange={e => setFormData({ ...formData, pickupDate: e.target.value })}
                                                />
                                            </div>

                                            {isArmored && (
                                                <div className={styles.inputGroup} style={{ marginBottom: '15px' }}>
                                                    <label><Shield size={16} /> Protection Level Required</label>
                                                    <select
                                                        value={formData.protectionLevel}
                                                        onChange={e => setFormData({ ...formData, protectionLevel: e.target.value })}
                                                        style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-main)' }}
                                                    >
                                                        <option value="B6">B6 Level Protection (High)</option>
                                                        <option value="B7">B7 Level Protection (Maximum)</option>
                                                        <option value="Unarmored">Unarmored / VIP Only</option>
                                                    </select>
                                                </div>
                                            )}

                                            {isCorporate && (
                                                <div className={styles.inputRow}>
                                                    <div className={styles.inputGroup}>
                                                        <label><Users size={16} /> Company Name</label>
                                                        <input
                                                            type="text"
                                                            required
                                                            placeholder="Company / NGO Name"
                                                            value={formData.companyName}
                                                            onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className={styles.inputGroup}>
                                                        <label><Clock size={16} /> Duration</label>
                                                        <select
                                                            value={formData.duration}
                                                            onChange={e => setFormData({ ...formData, duration: e.target.value })}
                                                            style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-main)' }}
                                                        >
                                                            <option value="Monthly">Monthly Basis</option>
                                                            <option value="Yearly">Yearly Contract</option>
                                                            <option value="Project">Short Project Basis</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <>
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
                                        </>
                                    )}

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

                                    <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                                        <button
                                            type="submit"
                                            className={styles.submitBtn}
                                            disabled={loading}
                                            style={{ flex: 1 }}
                                        >
                                            {loading ? "Sending..." : `Send Inquiry`}
                                        </button>

                                        <a
                                            href={`https://wa.me/923046257123?text=Hi! I am interested in renting the ${car.name}.`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.submitBtn}
                                            style={{
                                                flex: 1,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '8px',
                                                background: '#25D366',
                                                textDecoration: 'none',
                                                color: 'white'
                                            }}
                                        >
                                            <MessageCircle size={20} />
                                            WhatsApp
                                        </a>
                                    </div>
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
