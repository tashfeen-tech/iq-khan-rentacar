"use client";

import Image from "next/image";

import { useEffect, useState } from "react";
import { auth, db, storage } from "@/lib/firebase";
import {
    collection, query, orderBy, onSnapshot, doc, updateDoc, addDoc, deleteDoc,
    serverTimestamp, getCountFromServer, setDoc
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { FLEET_DATA } from "@/data/fleet";
import {
    Car,
    LayoutDashboard,
    CalendarCheck,
    MessageSquare,
    LogOut,
    Clock,
    CheckCircle,
    XCircle,
    TrendingUp,
    Plus,
    Trash2,
    Eye,
    Settings,
    Users,
    Menu,
    X as CloseIcon
} from "lucide-react";
import styles from "./Dashboard.module.css";

interface Booking {
    id: string;
    name: string;
    email: string;
    phone: string;
    carName: string;
    carId: string;
    pickupDate: string;
    returnDate: string;
    totalPrice: number;
    userId: string;
    status: "pending" | "confirmed" | "cancelled";
    createdAt: any;
    withDriver: boolean;
    days: number;
    label?: string;
    fromCity?: string;
    toCity?: string;
    airport?: string;
    selectedFleetCar?: string;
    message?: string;
    time?: string;
}

interface ContactMessage {
    id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    createdAt: any;
    read: boolean;
}

interface PartnerSubmission {
    id: string;
    name: string;
    phone: string;
    carModel: string;
    city: string;
    homeOwnership: string;
    referencePhone1: string;
    referencePhone2: string;
    message: string;
    status: string;
    createdAt: any;
}

type Tab = "dashboard" | "bookings" | "messages" | "fleet" | "partners";

export default function AdminDashboard() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [partners, setPartners] = useState<PartnerSubmission[]>([]);
    const [cars, setCars] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<Tab>("dashboard");
    const [bookingFilter, setBookingFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Car Modal State
    const [isCarModalOpen, setIsCarModalOpen] = useState(false);
    const [editingCar, setEditingCar] = useState<any>(null);
    const [carForm, setCarForm] = useState({
        name: "", type: "Sedan", transmission: "Automatic", seats: 4, image: "", features: "", price: ""
    });
    const [imageFile, setImageFile] = useState<File | null>(null);

    const compressImage = (file: File): Promise<Blob> => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new window.Image();
                img.src = event.target?.result as string;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 1200;
                    const MAX_HEIGHT = 1200;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx?.drawImage(img, 0, 0, width, height);
                    canvas.toBlob((blob) => {
                        resolve(blob || file);
                    }, 'image/jpeg', 0.8);
                };
            };
        });
    };

    const { user, profile, loading: authLoading, logout: authLogout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!authLoading) {
            if (!user) {
                router.push("/admin/login");
            } else if (profile?.role !== "admin") {
                router.push("/"); // Redirect non-admins to home
            }
        }
    }, [user, profile, authLoading, router]);

    // Bookings listener
    useEffect(() => {
        if (!user || profile?.role !== "admin") return;

        const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const bookingData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Booking[];
            setBookings(bookingData);
            setLoading(false);
        }, (error) => {
            console.error("Bookings listener error:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user, profile]);

    // Messages listener
    useEffect(() => {
        if (!user || profile?.role !== "admin") return;

        const q = query(collection(db, "contactMessages"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as ContactMessage[];
            setMessages(msgData);
            setLoading(false);
        }, (error) => {
            console.error("Messages listener error:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user, profile]);

    // Partners listener
    useEffect(() => {
        if (!user || profile?.role !== "admin") return;

        const q = query(collection(db, "partners"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const partnerData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as PartnerSubmission[];
            setPartners(partnerData);
        }, (error) => {
            console.error("Partners listener error:", error);
        });

        return () => unsubscribe();
    }, [user, profile]);

    // Cars listener
    useEffect(() => {
        if (!user || profile?.role !== "admin") return;

        const unsubscribe = onSnapshot(collection(db, "cars"), (snapshot) => {
            const carData = snapshot.docs.map(doc => ({
                docId: doc.id,
                ...doc.data()
            }));
            setCars(carData);
        });

        return () => unsubscribe();
    }, [user, profile]);

    const displayCars = cars.length > 0 ? cars : FLEET_DATA.map(c => ({ ...c, docId: c.id }));

    const seedCars = async () => {
        const { FLEET_DATA } = await import("@/data/fleet");
        setLoading(true);
        try {
            for (const car of FLEET_DATA) {
                await setDoc(doc(db, "cars", car.id), car);
            }
            alert("Fleet successfully seeded into Firestore!");
        } catch (err) {
            console.error(err);
            alert("Error seeding fleet");
        } finally {
            setLoading(false);
        }
    };

    const openCreateCar = () => {
        setEditingCar(null);
        setCarForm({ name: "", type: "Sedan", transmission: "Automatic", seats: 4, image: "", features: "", price: "" });
        setImageFile(null);
        setIsCarModalOpen(true);
    };

    const openEditCar = (car: any) => {
        setEditingCar(car);
        setCarForm({
            name: car.name,
            type: car.type,
            transmission: car.transmission,
            seats: car.seats,
            image: car.image,
            features: car.features?.join(", ") || "",
            price: car.price || ""
        });
        setImageFile(null);
        setIsCarModalOpen(true);
    };

    const handleSaveCar = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            let imgUrl = carForm.image;
            if (imageFile) {
                const storageRef = ref(storage, `fleet/${Date.now()}_${imageFile.name}`);
                const compressedBlob = await compressImage(imageFile);
                const snap = await uploadBytes(storageRef, compressedBlob);
                imgUrl = await getDownloadURL(snap.ref);
            }

            const carPayload = {
                name: carForm.name,
                type: carForm.type,
                transmission: carForm.transmission,
                seats: Number(carForm.seats),
                image: imgUrl,
                features: carForm.features.split(",").map(f => f.trim()).filter(Boolean),
                available: true,
                price: carForm.price
            };

            if (editingCar) {
                await updateDoc(doc(db, "cars", editingCar.docId), carPayload);
            } else {
                const newId = carForm.name.toLowerCase().replace(/[^a-z0-9]/g, "-");
                await setDoc(doc(db, "cars", newId), carPayload);
            }
            setIsCarModalOpen(false);
        } catch (err) {
            console.error(err);
            alert("Error saving car: " + (err instanceof Error ? err.message : String(err)));
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteCar = async (docId: string) => {
        if (!window.confirm("Delete this vehicle?")) return;
        try {
            await deleteDoc(doc(db, "cars", docId));
        } catch (e) {
            console.error(e);
            alert("Error deleting car: " + (e instanceof Error ? e.message : String(e)));
        }
    };

    const updateStatus = async (id: string, status: string) => {
        try {
            await updateDoc(doc(db, "bookings", id), { status });
        } catch (err) {
            console.error("Error updating status:", err);
        }
    };

    const updateBookingField = async (id: string, field: string, value: any) => {
        try {
            await updateDoc(doc(db, "bookings", id), { [field]: value });
        } catch (err) {
            console.error(`Error updating ${field}:`, err);
        }
    };

    const markMessageRead = async (id: string) => {
        try {
            await updateDoc(doc(db, "contactMessages", id), { read: true });
        } catch (err) {
            console.error("Error marking message read:", err);
        }
    };

    const deleteMessage = async (id: string) => {
        if (!window.confirm("Delete this message?")) return;
        try {
            await deleteDoc(doc(db, "contactMessages", id));
        } catch (err) {
            console.error("Error deleting message:", err);
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        router.push("/admin/login");
    };

    if (loading) return <div className={styles.loader}>Initializing Secure Admin Dashboard...</div>;

    const stats = {
        total: bookings.length,
        pending: bookings.filter(b => b.status === "pending").length,
        confirmed: bookings.filter(b => b.status === "confirmed").length,
        revenue: bookings.filter(b => b.status === "confirmed").reduce((acc, b) => acc + (b.totalPrice || 0), 0),
        unreadMessages: messages.filter(m => !m.read).length
    };

    const formatTimestamp = (ts: any) => {
        if (!ts?.toDate) return "—";
        return ts.toDate().toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
    };

    return (
        <div className={`${styles.dashboard} ${isSidebarOpen ? styles.sidebarActive : ""}`}>
            {/* Mobile Header */}
            <div className={styles.mobileHeader}>
                <div className={styles.mobileBrand}>
                    <Image src="/logo.png" alt="IQ Khan" width={120} height={40} style={{ objectFit: 'contain' }} />
                </div>
                <button className={styles.menuToggle} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    {isSidebarOpen ? <CloseIcon size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar Overlay */}
            {isSidebarOpen && <div className={styles.overlay} onClick={() => setIsSidebarOpen(false)} />}

            {/* Sidebar */}
            <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}>
                <div className={styles.sidebarClose} onClick={() => setIsSidebarOpen(false)}>
                    <CloseIcon size={24} />
                </div>
                <div className={styles.brand} style={{ marginBottom: '32px' }}>
                    <Image
                        src="/logo.png"
                        alt="IQ Khan Rent A Car"
                        width={180}
                        height={60}
                        style={{ objectFit: 'contain' }}
                        priority
                    />
                </div>

                <nav className={styles.nav}>
                    <div
                        className={`${styles.navItem} ${activeTab === "dashboard" ? styles.active : ""}`}
                        onClick={() => { setActiveTab("dashboard"); setIsSidebarOpen(false); }}
                    >
                        <LayoutDashboard size={20} />
                        Dashboard
                    </div>
                    <div
                        className={`${styles.navItem} ${activeTab === "bookings" ? styles.active : ""}`}
                        onClick={() => { setActiveTab("bookings"); setIsSidebarOpen(false); }}
                    >
                        <CalendarCheck size={20} />
                        Bookings
                        {stats.pending > 0 && (
                            <span className={styles.badge}>{stats.pending}</span>
                        )}
                    </div>
                    <div
                        className={`${styles.navItem} ${activeTab === "fleet" ? styles.active : ""}`}
                        onClick={() => { setActiveTab("fleet"); setIsSidebarOpen(false); }}
                    >
                        <Car size={20} />
                        Fleet
                    </div>
                    <div
                        className={`${styles.navItem} ${activeTab === "messages" ? styles.active : ""}`}
                        onClick={() => { setActiveTab("messages"); setIsSidebarOpen(false); }}
                    >
                        <MessageSquare size={20} />
                        Inquiries & Contact
                        {stats.unreadMessages > 0 && (
                            <span className={styles.badge}>{stats.unreadMessages}</span>
                        )}
                    </div>
                    <div
                        className={`${styles.navItem} ${activeTab === "partners" ? styles.active : ""}`}
                        onClick={() => { setActiveTab("partners"); setIsSidebarOpen(false); }}
                    >
                        <Users size={20} />
                        Partners
                    </div>
                </nav>

                <button onClick={handleLogout} className={styles.logoutBtn}>
                    <LogOut size={20} />
                    Sign Out
                </button>
            </aside>

            {/* Main Content */}
            <main className={styles.content}>
                <header className={styles.header}>
                    <h1>
                        {activeTab === "dashboard" && "Dashboard Overview"}
                        {activeTab === "bookings" && "All Bookings"}
                        {activeTab === "messages" && "Contact Messages"}
                        {activeTab === "fleet" && "Manage Fleet"}
                    </h1>
                    <div className={styles.userProfile}>
                        <span>Welcome, Admin</span>
                        <div className={styles.avatar}>A</div>
                    </div>
                </header>

                {/* ========== DASHBOARD TAB ========== */}
                {activeTab === "dashboard" && (
                    <>
                        {/* Stats Grid */}
                        <div className={styles.statsGrid}>
                            <div className={styles.statCard} onClick={() => setActiveTab("bookings")} style={{ cursor: "pointer" }}>
                                <div className={styles.statInfo}>
                                    <p>Total Bookings</p>
                                    <h3>{stats.total}</h3>
                                </div>
                                <div className={styles.statIcon} style={{ background: "rgba(46, 204, 113, 0.1)", color: "var(--primary)" }}>
                                    <CalendarCheck size={24} />
                                </div>
                            </div>
                            <div className={styles.statCard} onClick={() => setActiveTab("bookings")} style={{ cursor: "pointer" }}>
                                <div className={styles.statInfo}>
                                    <p>Pending Requests</p>
                                    <h3>{stats.pending}</h3>
                                </div>
                                <div className={styles.statIcon} style={{ background: "rgba(255, 193, 7, 0.1)", color: "#ffc107" }}>
                                    <Clock size={24} />
                                </div>
                            </div>
                            <div className={styles.statCard}>
                                <div className={styles.statInfo}>
                                    <p>Confirmed Rides</p>
                                    <h3>{stats.confirmed}</h3>
                                </div>
                                <div className={styles.statIcon} style={{ background: "rgba(40, 167, 69, 0.1)", color: "#28a745" }}>
                                    <CheckCircle size={24} />
                                </div>
                            </div>
                            <div className={styles.statCard}>
                                <div className={styles.statInfo}>
                                    <p>Estimated Revenue</p>
                                    <h3>Rs. {stats.revenue.toLocaleString()}</h3>
                                </div>
                                <div className={styles.statIcon} style={{ background: "rgba(0, 123, 255, 0.1)", color: "#007bff" }}>
                                    <TrendingUp size={24} />
                                </div>
                            </div>
                        </div>

                        {/* Recent Bookings Preview */}
                        <div className={styles.tableContainer}>
                            <div className={styles.tableHeader}>
                                <h2>Recent Booking Requests</h2>
                                <button className={styles.viewAllBtn} onClick={() => setActiveTab("bookings")}>
                                    View All →
                                </button>
                            </div>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Customer</th>
                                        <th>Service / Car</th>
                                        <th>Duration</th>
                                        <th>Total Price</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.filter(b => b.status === "pending").slice(0, 5).map((booking) => (
                                        <tr key={booking.id}>
                                            <td>
                                                <div className={styles.customerInfo}>
                                                    <span className={styles.customerName}>{booking.name}</span>
                                                    <span className={styles.customerPhone}>{booking.phone}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.carInfo}>
                                                    <span className={styles.carName}>
                                                        {booking.selectedFleetCar ? `${booking.selectedFleetCar} (${booking.carName})` : booking.carName}
                                                    </span>
                                                    {booking.fromCity && booking.toCity && (
                                                        <span style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: 600 }}>
                                                            {booking.fromCity} → {booking.toCity}
                                                        </span>
                                                    )}
                                                    {booking.airport && (
                                                        <span style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: 600 }}>
                                                            {booking.airport}
                                                        </span>
                                                    )}
                                                    {!booking.selectedFleetCar && (
                                                        <span className={styles.driverTag}>
                                                            {booking.withDriver ? "With Driver" : "Self Drive"}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.duration}>
                                                    <span>{booking.pickupDate}</span>
                                                    <span className={styles.separator}>→</span>
                                                    <span>{booking.returnDate}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className={styles.price}>Rs. {booking.totalPrice?.toLocaleString()}</span>
                                            </td>
                                            <td>
                                                <span className={`${styles.status} ${styles[booking.status]}`}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div className={styles.actions}>
                                                    {booking.status === "pending" && (
                                                        <>
                                                            <button
                                                                onClick={() => updateStatus(booking.id, "confirmed")}
                                                                className={styles.approveBtn}
                                                                title="Approve"
                                                            >
                                                                <CheckCircle size={18} />
                                                            </button>
                                                            <button
                                                                onClick={() => updateStatus(booking.id, "cancelled")}
                                                                className={styles.rejectBtn}
                                                                title="Reject"
                                                            >
                                                                <XCircle size={18} />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {bookings.length === 0 && (
                                <div className={styles.emptyTable}>
                                    No bookings yet. They will appear here in real-time.
                                </div>
                            )}
                        </div>
                    </>
                )}

                {/* ========== BOOKINGS TAB ========== */}
                {activeTab === "bookings" && (
                    <div className={styles.tableContainer}>
                        <div className={styles.tableHeader} style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '16px' }}>
                            <h2>Bookings Console</h2>
                            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', width: '100%', paddingBottom: '4px' }}>
                                {['all', 'pending', 'confirmed', 'cancelled'].map(f => (
                                    <button
                                        key={f}
                                        onClick={() => setBookingFilter(f as any)}
                                        style={{
                                            padding: '8px 16px', borderRadius: '100px',
                                            border: '1px solid var(--border)',
                                            background: bookingFilter === f ? 'var(--primary)' : 'var(--surface-hover)',
                                            color: bookingFilter === f ? '#fff' : 'var(--text-main)',
                                            fontWeight: bookingFilter === f ? 700 : 500,
                                            cursor: 'pointer', textTransform: 'capitalize', whiteSpace: 'nowrap'
                                        }}
                                    >
                                        {f} ({f === 'all' ? bookings.length : bookings.filter(b => b.status === f).length})
                                    </button>
                                ))}
                            </div>
                        </div>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Customer</th>
                                    <th>Car Details</th>
                                    <th>Duration</th>
                                    <th>Total Price</th>
                                    <th>Status / Label</th>
                                    <th>Booked At</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.filter(b => bookingFilter === 'all' || b.status === bookingFilter).map((booking) => (
                                    <tr key={booking.id}>
                                        <td>
                                            <div className={styles.customerInfo}>
                                                <span className={styles.customerName}>{booking.name}</span>
                                                <span className={styles.customerPhone}>{booking.phone}</span>
                                                <span className={styles.customerEmail}>{booking.email}</span>
                                                {booking.message && (
                                                    <div className={styles.bookingMessage}>
                                                        <strong>Message:</strong> "{booking.message}"
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            <div className={styles.carInfo}>
                                                <span className={styles.carName}>
                                                    {booking.selectedFleetCar ? `${booking.selectedFleetCar} (${booking.carName})` : booking.carName}
                                                </span>
                                                {booking.fromCity && booking.toCity && (
                                                    <span style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 600, marginTop: '2px' }}>
                                                        {booking.fromCity} → {booking.toCity}
                                                    </span>
                                                )}
                                                {booking.airport && (
                                                    <span style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 600, marginTop: '2px' }}>
                                                        {booking.airport}
                                                    </span>
                                                )}
                                                {!booking.selectedFleetCar && (
                                                    <span className={styles.driverTag}>
                                                        {booking.withDriver ? "With Driver" : "Self Drive"}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            <div className={styles.duration}>
                                                {booking.returnDate ? (
                                                    <>
                                                        <span>{booking.pickupDate}</span>
                                                        <span className={styles.separator}>→</span>
                                                        <span>{booking.returnDate}</span>
                                                    </>
                                                ) : (
                                                    <span>{booking.pickupDate?.replace('T', ' ')}</span>
                                                )}
                                                {booking.time && (
                                                    <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', fontWeight: 600 }}>
                                                        Time: {booking.time}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <span style={{ fontWeight: 'bold' }}>Rs.</span>
                                                <input
                                                    type="number"
                                                    defaultValue={booking.totalPrice || 0}
                                                    onBlur={(e) => {
                                                        const newVal = Number(e.target.value);
                                                        if (!isNaN(newVal) && newVal !== booking.totalPrice) {
                                                            updateBookingField(booking.id, "totalPrice", newVal);
                                                        }
                                                    }}
                                                    style={{ width: '80px', padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--border)', background: 'var(--surface-hover)', outline: 'none' }}
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                <span className={`${styles.status} ${styles[booking.status]}`}>
                                                    {booking.status}
                                                </span>
                                                <input
                                                    type="text"
                                                    placeholder="Add label (VIP)"
                                                    defaultValue={booking.label || ""}
                                                    onBlur={(e) => {
                                                        if (e.target.value !== booking.label) updateBookingField(booking.id, "label", e.target.value);
                                                    }}
                                                    style={{ width: '100px', fontSize: '12px', padding: '4px', borderRadius: '4px', border: '1px solid var(--border)' }}
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <span className={styles.timestamp}>{formatTimestamp(booking.createdAt)}</span>
                                        </td>
                                        <td>
                                            <div className={styles.actions}>
                                                {booking.status === "pending" && (
                                                    <>
                                                        <button
                                                            onClick={() => updateStatus(booking.id, "confirmed")}
                                                            className={styles.approveBtn}
                                                            title="Approve"
                                                        >
                                                            <CheckCircle size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => updateStatus(booking.id, "cancelled")}
                                                            className={styles.rejectBtn}
                                                            title="Reject"
                                                        >
                                                            <XCircle size={18} />
                                                        </button>
                                                    </>
                                                )}
                                                {booking.status === "confirmed" && (
                                                    <button
                                                        onClick={() => updateStatus(booking.id, "cancelled")}
                                                        className={styles.rejectBtn}
                                                        title="Cancel"
                                                    >
                                                        <XCircle size={18} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {bookings.length === 0 && (
                            <div className={styles.emptyTable}>
                                No bookings yet. They will appear here in real-time as customers book.
                            </div>
                        )}
                    </div>
                )}

                {/* ========== MESSAGES TAB ========== */}
                {activeTab === "messages" && (
                    <div className={styles.messagesContainer}>
                        {messages.length === 0 ? (
                            <div className={styles.emptyTable} style={{ padding: '60px', textAlign: 'center' }}>
                                No contact messages yet.
                            </div>
                        ) : (
                            <div className={styles.messagesList}>
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`${styles.messageCard} ${!msg.read ? styles.unread : ""}`}
                                        onClick={() => !msg.read && markMessageRead(msg.id)}
                                    >
                                        <div className={styles.messageTop}>
                                            <div className={styles.messageSender}>
                                                <div className={styles.senderAvatar}>
                                                    {msg.name?.[0]?.toUpperCase() || "?"}
                                                </div>
                                                <div>
                                                    <div className={styles.senderName}>
                                                        {msg.name}
                                                        {!msg.read && <span className={styles.newBadge}>New</span>}
                                                    </div>
                                                    <div className={styles.senderContact}>
                                                        {msg.email} · {msg.phone}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.messageActions}>
                                                <span className={styles.messageTime}>{formatTimestamp(msg.createdAt)}</span>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); deleteMessage(msg.id); }}
                                                    className={styles.deleteBtn}
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                        <p className={styles.messageBody}>{msg.message}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* ========== PARTNERS TAB ========== */}
                {activeTab === "partners" && (
                    <div className={styles.tableContainer} style={{ overflowX: 'auto' }}>
                        <div className={styles.tableHeader}>
                            <h2>Partner / Car Submissions ({partners.length})</h2>
                        </div>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Partner Name & Phone</th>
                                    <th>Car Details & City</th>
                                    <th>Ownership/Refs</th>
                                    <th>Message</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {partners.map((p) => (
                                    <tr key={p.id}>
                                        <td>
                                            <div className={styles.customerInfo}>
                                                <span className={styles.customerName}>{p.name}</span>
                                                <span className={styles.customerPhone}>{p.phone}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={styles.carInfo}>
                                                <span className={styles.carName}>{p.carModel}</span>
                                                <span className={styles.driverTag}>{p.city}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                                                {p.homeOwnership}<br />
                                                Ref 1: {p.referencePhone1}<br />
                                                Ref 2: {p.referencePhone2}
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ maxWidth: '200px', fontSize: '13px', opacity: 0.8 }}>
                                                {p.message || "—"}
                                            </div>
                                        </td>
                                        <td>
                                            <span className={styles.timestamp}>{formatTimestamp(p.createdAt)}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {partners.length === 0 && (
                            <div className={styles.emptyTable}>
                                No partner submissions yet.
                            </div>
                        )}
                    </div>
                )}

                {/* ========== FLEET TAB ========== */}
                {activeTab === "fleet" && (
                    <div className={styles.tableContainer}>
                        <div className={styles.tableHeader}>
                            <h2>Fleet Details ({displayCars.length})</h2>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button className={styles.submitBtn} style={{ padding: "8px 16px", background: "var(--primary)", color: "#000", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", display: 'flex', alignItems: 'center', gap: '8px' }} onClick={openCreateCar}>
                                    <Plus size={16} /> Add Car
                                </button>
                                {cars.length === 0 && (
                                    <button className={styles.submitBtn} style={{ padding: "8px 16px", background: "#f5f5f5", color: "#000", border: "1px solid var(--border)", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }} onClick={seedCars}>
                                        Seed Demo Cars
                                    </button>
                                )}
                            </div>
                        </div>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Vehicle</th>
                                    <th>Type</th>
                                    <th>Transmission</th>
                                    <th>Features</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayCars.map((car) => (
                                    <tr key={car.docId}>
                                        <td>
                                            <div style={{ width: '80px', height: '40px', background: '#f5f5f5', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
                                                <Image
                                                    src={car.image}
                                                    alt={car.name}
                                                    fill
                                                    sizes="80px"
                                                    style={{ objectFit: 'contain' }}
                                                />
                                            </div>
                                        </td>
                                        <td><span className={styles.customerName}>{car.name}</span><br /><span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Rs. {car.price}/day</span></td>
                                        <td>{car.type}</td>
                                        <td>{car.transmission}</td>
                                        <td>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', maxWidth: '200px' }}>
                                                {car.features?.map((f: string, i: number) => (
                                                    <span key={i} style={{ fontSize: '10px', background: 'var(--surface-hover)', padding: '2px 6px', borderRadius: '4px' }}>{f}</span>
                                                ))}
                                            </div>
                                        </td>
                                        <td>
                                            <div className={styles.actions}>
                                                <button onClick={() => openEditCar(car)} className={styles.approveBtn} title="Edit">
                                                    <Settings size={18} />
                                                </button>
                                                <button onClick={() => handleDeleteCar(car.docId)} className={styles.rejectBtn} title="Delete">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {cars.length === 0 && (
                            <div className={styles.emptyTable}>
                                No cars in the fleet database. Click "Seed Demo Cars" to import them.
                            </div>
                        )}
                    </div>
                )}
            </main>

            {/* Car Modal UI right inside the DOM */}
            {isCarModalOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(5px)', zIndex: 3000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }} onClick={() => setIsCarModalOpen(false)}>
                    <div style={{ background: 'var(--surface)', padding: '40px', borderRadius: '24px', width: '100%', maxWidth: '600px', border: '1px solid var(--border)', position: 'relative' }} onClick={e => e.stopPropagation()}>
                        <button onClick={() => setIsCarModalOpen(false)} style={{ position: 'absolute', top: '24px', right: '24px', background: 'transparent', border: 'none', color: 'var(--text-main)', cursor: 'pointer' }}>
                            <XCircle size={24} />
                        </button>
                        <h2 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: 700, color: 'var(--text-main)' }}>
                            {editingCar ? 'Edit Vehicle' : 'Add New Vehicle'}
                        </h2>

                        <form onSubmit={handleSaveCar} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)' }}>Name / Model</label>
                                    <input required value={carForm.name} onChange={e => setCarForm({ ...carForm, name: e.target.value })} style={{ padding: '12px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--background)' }} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)' }}>Type</label>
                                    <select required value={carForm.type} onChange={e => setCarForm({ ...carForm, type: e.target.value })} style={{ padding: '12px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--background)' }}>
                                        <option>Sedan</option>
                                        <option>Premium Sedan</option>
                                        <option>SUV</option>
                                        <option>Premium SUV</option>
                                        <option>Van</option>
                                        <option>Luxury Van</option>
                                        <option>Pickup / 4x4</option>
                                        <option>Luxury Sedan</option>
                                    </select>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)' }}>Daily Price (Rs.)</label>
                                    <input required type="text" placeholder="e.g. 15,000" value={carForm.price} onChange={e => setCarForm({ ...carForm, price: e.target.value })} style={{ padding: '12px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--background)' }} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)' }}>Seats</label>
                                    <input type="number" required value={carForm.seats} onChange={e => setCarForm({ ...carForm, seats: Number(e.target.value) })} style={{ padding: '12px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--background)' }} />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)' }}>Transmission</label>
                                    <select required value={carForm.transmission} onChange={e => setCarForm({ ...carForm, transmission: e.target.value })} style={{ padding: '12px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--background)' }}>
                                        <option>Automatic</option>
                                        <option>Manual</option>
                                    </select>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)' }}>Features (comma separated)</label>
                                <input placeholder="AC, GPS, Bluetooth..." value={carForm.features} onChange={e => setCarForm({ ...carForm, features: e.target.value })} style={{ padding: '12px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--background)' }} />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)' }}>Car Image</label>
                                {carForm.image && !imageFile && (
                                    <img src={carForm.image} alt="Preview" style={{ height: '100px', objectFit: 'contain', background: '#f5f5f5', borderRadius: '8px', marginBottom: '8px' }} />
                                )}
                                <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} style={{ padding: '12px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--background)' }} />
                            </div>

                            <button type="submit" disabled={loading} style={{ padding: '16px', borderRadius: '12px', background: 'var(--primary)', color: '#000', fontWeight: 'bold', border: 'none', cursor: 'pointer', marginTop: '10px' }}>
                                {loading ? "Saving..." : "Save Vehicle"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
