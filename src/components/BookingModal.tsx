"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, User, Phone, Mail, LogIn, MessageCircle, MapPin, Users, Clock, Heart } from "lucide-react";
import styles from "./BookingModal.module.css";
import { Car, FLEET_DATA } from "@/data/fleet";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, onSnapshot, query } from "firebase/firestore";
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
    const [fleetCars, setFleetCars] = useState<Car[]>([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        pickupDate: "",
        returnDate: "",
        message: "",
        fromCity: "",
        toCity: "",
        airport: "",
        time: "",
        selectedFleetCar: "",
        companyName: "",
        duration: "Monthly",
        eventType: "",
        eventDate: "",
        numberOfCars: "1"
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    // Load fleet cars from Firestore for price display
    useEffect(() => {
        const q = query(collection(db, "cars"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const cars = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Car[];
            setFleetCars(cars);
        });
        return () => unsubscribe();
    }, []);

    const displayFleet = fleetCars.length > 0
        ? [...fleetCars, ...FLEET_DATA.filter(fc => !fleetCars.find(dbCar => dbCar.id === fc.id))]
        : FLEET_DATA;

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

    const getCustomOneSidePrice = (carModel: any) => {
        const n = carModel.name.toLowerCase();
        if (n.includes('coaster')) return '35000 Rs Bachat';
        if (n.includes('grand cabin') || n.includes('hiace')) return '20000 Rs Bachat';
        if (n.includes('fortuner') || n.includes('prado') || n.includes('kia') || n.includes('sportage') || n.includes('v8') || n.includes('mg') || n.includes('hyundai')) return 'L<>I 65k | I<>M 70k | L<>M 65k';
        if (n.includes('civic') || n.includes('altis') || n.includes('grande')) return 'L<>I 40k | I<>M 45k | L<>M 40k';
        if (n.includes('changan') || n.includes('karvaan') || n.includes('apv') || n.includes('brv') || carModel.seats >= 7) return 'L<>I 35k | I<>M 35k | L<>M 35k';
        return 'L<>I 35k | I<>M 40k | L<>M 35k';
    };

    // Get price for selected car based on service type
    const getServicePrice = () => {
        if (!formData.selectedFleetCar) return null;
        const selectedCar = displayFleet.find(c => c.name === formData.selectedFleetCar);
        if (!selectedCar) return null;

        if (isOneSideDrop) return getCustomOneSidePrice(selectedCar);
        if (isAirport) {
            if (formData.airport?.includes("Lahore")) return selectedCar.priceAirportLahore;
            if (formData.airport?.includes("Islamabad")) return selectedCar.priceAirportIslamabad;
            return selectedCar.priceAirportLahore || selectedCar.priceAirportIslamabad;
        }
        if (isCorporate) return selectedCar.priceCorporate;
        if (isWedding) return selectedCar.priceWedding;
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!car) return;

        setLoading(true);
        setError("");

        try {
            const start = new Date(formData.pickupDate);
            const end = new Date(formData.returnDate);
            const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24)) || 1;

            let calculatedPrice = 0;
            if (isSpecial) {
                const spPrice = getServicePrice();
                if (isOneSideDrop) {
                    calculatedPrice = 0; // Requires admin to confirm exact route price manually
                } else if (spPrice) {
                    calculatedPrice = Number(spPrice.toString().replace(/,/g, ''));
                }
            } else if (car.priceFleet) {
                const dailyPrice = Number(car.priceFleet.toString().replace(/,/g, ''));
                if (!isNaN(dailyPrice)) {
                    calculatedPrice = dailyPrice * (days > 0 ? days : 1);
                }
            }

            await addDoc(collection(db, "bookings"), {
                name: formData.name,
                email: formData.email.toLowerCase(),
                phone: formData.phone,
                pickupDate: formData.pickupDate,
                returnDate: formData.returnDate,
                withDriver: true, // Always with driver
                message: formData.message,
                fromCity: formData.fromCity,
                toCity: formData.toCity,
                airport: formData.airport,
                time: formData.time,
                selectedFleetCar: formData.selectedFleetCar,
                companyName: formData.companyName,
                duration: formData.duration,
                eventType: formData.eventType,
                eventDate: formData.eventDate,
                numberOfCars: formData.numberOfCars,
                carId: car.id,
                carName: car.name,
                carImage: car.image,
                status: "pending",
                userId: user?.uid || null,
                createdAt: serverTimestamp(),
                days: days > 0 ? days : 1,
                totalPrice: calculatedPrice,
                read: false
            });
            setSuccess(true);
            setFormData(prev => ({
                ...prev,
                message: "",
                pickupDate: "",
                returnDate: "",
                fromCity: "",
                toCity: "",
                airport: "",
                time: "",
                selectedFleetCar: "",
                eventType: "",
                eventDate: "",
                numberOfCars: "1"
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

    const isOneSideDrop = car.id === 'service-one-side-drop-service';
    const isAirport = car.id === 'service-airport-pick-&-drop-service';
    const isWedding = car.id === 'service-wedding-&-event-booking';
    const isCorporate = car.id === 'service-corporate-rental-solution';
    const isSpecial = isOneSideDrop || isAirport || isWedding || isCorporate;

    const servicePrice = getServicePrice();

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



                                <div style={{
                                    background: 'rgba(46, 204, 113, 0.08)',
                                    borderRadius: '10px',
                                    padding: '10px 14px',
                                    margin: '10px 0',
                                    fontSize: '13px',
                                    color: '#2ecc71',
                                    fontWeight: 600,
                                    textAlign: 'center'
                                }}>
                                    🚗 Chauffeur-Driven (With Driver)
                                </div>

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
                                                    {displayFleet.map(c => {
                                                        let price = '';
                                                        if (isOneSideDrop) price = ` - ${getCustomOneSidePrice(c)}`;
                                                        else if (isAirport && c.priceAirportLahore) price = ` - Rs. ${c.priceAirportLahore}`;
                                                        else if (isCorporate && c.priceCorporate) price = ` - Rs. ${c.priceCorporate}`;
                                                        else if (isWedding && c.priceWedding) price = ` - Rs. ${c.priceWedding}`;
                                                        return (
                                                            <option key={c.id} value={c.name}>{c.name}{price}</option>
                                                        );
                                                    })}
                                                </select>
                                            </div>

                                            {/* Show price for selected car */}
                                            {servicePrice && (
                                                <div style={{
                                                    background: 'rgba(46, 204, 113, 0.1)',
                                                    border: '1px solid rgba(46, 204, 113, 0.3)',
                                                    borderRadius: '12px',
                                                    padding: '12px 16px',
                                                    marginBottom: '15px',
                                                    textAlign: 'center'
                                                }}>
                                                    <span style={{ color: '#2ecc71', fontSize: '20px', fontWeight: 800 }}>Rs. {servicePrice}</span>
                                                    <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}> per trip</span>
                                                </div>
                                            )}

                                            {isOneSideDrop && (
                                                <div className={styles.inputRow}>
                                                    <div className={styles.inputGroup}>
                                                        <label><MapPin size={16} /> From City</label>
                                                        <select
                                                            required
                                                            value={formData.fromCity}
                                                            onChange={e => setFormData({ ...formData, fromCity: e.target.value })}
                                                            style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-main)' }}
                                                        >
                                                            <option value="" disabled>Select city...</option>
                                                            <option value="Lahore">Lahore</option>
                                                            <option value="Islamabad / Rawalpindi">Islamabad / Rawalpindi</option>
                                                            <option value="Multan">Multan</option>
                                                        </select>
                                                    </div>
                                                    <div className={styles.inputGroup}>
                                                        <label><MapPin size={16} /> To City</label>
                                                        <select
                                                            required
                                                            value={formData.toCity}
                                                            onChange={e => setFormData({ ...formData, toCity: e.target.value })}
                                                            style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-main)' }}
                                                        >
                                                            <option value="" disabled>Select city...</option>
                                                            <option value="Lahore">Lahore</option>
                                                            <option value="Islamabad / Rawalpindi">Islamabad / Rawalpindi</option>
                                                            <option value="Multan">Multan</option>
                                                        </select>
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
                                                        <option value="Islamabad International Airport">Islamabad International Airport</option>
                                                    </select>
                                                </div>
                                            )}

                                            {isWedding && (
                                                <>
                                                    <div className={styles.inputRow}>
                                                        <div className={styles.inputGroup}>
                                                            <label><Heart size={16} /> Event Type</label>
                                                            <select
                                                                required
                                                                value={formData.eventType}
                                                                onChange={e => setFormData({ ...formData, eventType: e.target.value })}
                                                                style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-main)' }}
                                                            >
                                                                <option value="" disabled>Select event...</option>
                                                                <option value="Wedding - Baraat">Wedding - Baraat</option>
                                                                <option value="Wedding - Walima">Wedding - Walima</option>
                                                                <option value="Wedding - Mehndi">Wedding - Mehndi</option>
                                                                <option value="Wedding - Full Package">Wedding - Full Package (All Events)</option>
                                                                <option value="Corporate Event">Corporate Event</option>
                                                                <option value="Private Celebration">Private Celebration</option>
                                                                <option value="Other Event">Other Event</option>
                                                            </select>
                                                        </div>
                                                        <div className={styles.inputGroup}>
                                                            <label>Number of Cars</label>
                                                            <select
                                                                value={formData.numberOfCars}
                                                                onChange={e => setFormData({ ...formData, numberOfCars: e.target.value })}
                                                                style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-main)' }}
                                                            >
                                                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                                                                    <option key={n} value={String(n)}>{n} {n === 1 ? 'Car' : 'Cars'}</option>
                                                                ))}
                                                                <option value="10+">10+ Cars</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </>
                                            )}

                                            <div className={styles.inputGroup} style={{ marginBottom: '15px' }}>
                                                <label><Calendar size={16} /> {isWedding ? 'Event Date & Time' : 'Date & Time'}</label>
                                                <input
                                                    type="datetime-local"
                                                    required
                                                    value={formData.pickupDate}
                                                    onChange={e => setFormData({ ...formData, pickupDate: e.target.value })}
                                                />
                                            </div>

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

                                            {/* No self-drive toggle - always with driver */}
                                            <div style={{
                                                background: 'rgba(46, 204, 113, 0.08)',
                                                borderRadius: '12px',
                                                padding: '14px',
                                                marginBottom: '15px',
                                                fontSize: '14px',
                                                color: '#2ecc71',
                                                fontWeight: 600,
                                                textAlign: 'center',
                                                border: '1px solid rgba(46, 204, 113, 0.2)'
                                            }}>
                                                🚗 All rentals include a professional chauffeur (with driver)
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
                                            href={`https://wa.me/923340002910?text=Hi! I am interested in renting the ${car.name}. ${isSpecial && formData.selectedFleetCar ? `Car: ${formData.selectedFleetCar}. ` : ''}Please share details.`}
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
                                                color: '#000000'
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
