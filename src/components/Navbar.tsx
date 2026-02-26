"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Car, Menu, X, Phone, UserCircle, Zap } from "lucide-react";
import styles from "./Navbar.module.css";
import { useAuth } from "@/lib/AuthContext";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, profile } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ""}`}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <div className={styles.logoIcon}>
                        <Zap size={24} fill="#fff" color="#fff" />
                    </div>
                    <div className={styles.logoText}>
                        <span className={styles.popular}>POPULAR</span>
                        <span className={styles.rentacar}>RENT A CAR</span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className={styles.desktopMenu}>
                    <Link href="/" className={styles.navLink}>Home</Link>
                    <Link href="/fleet" className={styles.navLink}>Our Fleet</Link>
                    <Link href="/about" className={styles.navLink}>About</Link>
                    <Link href="/contact" className={styles.navLink}>Contact</Link>
                    {user ? (
                        <Link href="/my-bookings" className={styles.navLink} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <UserCircle size={20} />
                            My Inquiries
                        </Link>
                    ) : (
                        <Link href="/auth" className={styles.navLink} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <UserCircle size={20} />
                            Sign In
                        </Link>
                    )}
                    <a href="tel:+923059991234" className={`${styles.cta} pulse-primary`}>
                        <Phone size={18} />
                        <span>0305 9991234</span>
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button
                    className={styles.mobileToggle}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className={styles.mobileMenu}>
                    <div className={styles.mobileNavLinks}>
                        <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                        <Link href="/fleet" onClick={() => setIsMobileMenuOpen(false)}>Our Fleet</Link>
                        <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                        <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
                        <Link href="/partner" onClick={() => setIsMobileMenuOpen(false)}>Partner Program</Link>
                        <div className={styles.mobileDivider}></div>
                        {user ? (
                            <Link href="/my-bookings" onClick={() => setIsMobileMenuOpen(false)}>My Inquiries</Link>
                        ) : (
                            <Link href="/auth" onClick={() => setIsMobileMenuOpen(false)}>Log In / Sign Up</Link>
                        )}
                        <a href="tel:+923059991234" className={styles.mobileCta}>
                            <Phone size={20} /> Call Now
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
