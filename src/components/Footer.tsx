"use client";

// Footer uses inline styles

const Footer = () => {
    return (
        <footer style={{ background: '#080808', borderTop: '1px solid var(--border)', padding: '80px 24px 40px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '60px' }}>
                <div>
                    <h3 style={{ marginBottom: '20px', letterSpacing: '2px', fontWeight: 800 }}>IQ Khan Rent A Car</h3>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                        The most trusted car rental service in Pakistan. All vehicles are chauffeur-driven with professional drivers. Travel anywhere with comfort, safety, and peace of mind.
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '20px' }}>
                        <a href="https://share.google/HkvTPbco2qxQ5fwPz" target="_blank" rel="noreferrer" style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '13px', background: 'rgba(255,255,255,0.05)', padding: '6px 14px', borderRadius: '50px', border: '1px solid var(--border)', transition: 'all 0.3s' }}>Google</a>
                        <a href="https://www.facebook.com/iqkhanrentacar" target="_blank" rel="noreferrer" style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '13px', background: 'rgba(255,255,255,0.05)', padding: '6px 14px', borderRadius: '50px', border: '1px solid var(--border)', transition: 'all 0.3s' }}>Facebook HQ</a>
                        <a href="https://www.facebook.com/profile.php?id=61583779704854" target="_blank" rel="noreferrer" style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '13px', background: 'rgba(255,255,255,0.05)', padding: '6px 14px', borderRadius: '50px', border: '1px solid var(--border)', transition: 'all 0.3s' }}>Facebook Branch</a>
                        <a href="https://www.instagram.com/iqkhan.carrentals/" target="_blank" rel="noreferrer" style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '13px', background: 'rgba(255,255,255,0.05)', padding: '6px 14px', borderRadius: '50px', border: '1px solid var(--border)', transition: 'all 0.3s' }}>Instagram</a>
                        <a href="https://www.youtube.com/@IQKhanRentACar-t4v" target="_blank" rel="noreferrer" style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '13px', background: 'rgba(255,255,255,0.05)', padding: '6px 14px', borderRadius: '50px', border: '1px solid var(--border)', transition: 'all 0.3s' }}>YouTube</a>
                        <a href="https://www.tiktok.com/@iqkhan_rentacar" target="_blank" rel="noreferrer" style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '13px', background: 'rgba(255,255,255,0.05)', padding: '6px 14px', borderRadius: '50px', border: '1px solid var(--border)', transition: 'all 0.3s' }}>TikTok</a>
                    </div>
                </div>
                <div>
                    <h4 style={{ marginBottom: '20px', color: '#2ecc71', fontWeight: 700 }}>Our Services</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <li><a href="/fleet" style={{ color: 'var(--text-muted)', transition: 'color 0.3s' }}>Car Rental Fleet</a></li>
                        <li><a href="/" style={{ color: 'var(--text-muted)', transition: 'color 0.3s' }}>One Side Drop Service</a></li>
                        <li><a href="/" style={{ color: 'var(--text-muted)', transition: 'color 0.3s' }}>Airport Pick & Drop</a></li>
                        <li><a href="/" style={{ color: 'var(--text-muted)', transition: 'color 0.3s' }}>Wedding & Event Cars</a></li>
                        <li><a href="/" style={{ color: 'var(--text-muted)', transition: 'color 0.3s' }}>Corporate Rentals</a></li>
                        <li><a href="/partner" style={{ color: 'var(--text-muted)', transition: 'color 0.3s' }}>List Your Car</a></li>
                    </ul>
                </div>
                <div>
                    <h4 style={{ marginBottom: '20px', color: '#2ecc71', fontWeight: 700 }}>Contact Info</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-muted)' }}>
                        <li>Al Hafeez Shopping Mall, Main Blvd Gulberg, Block D 1 Block D1 Gulberg III, Lahore, 54660</li>
                        <li>
                            <a href="tel:+923340002910" style={{ color: 'var(--text-main)', fontWeight: 600 }}>
                                📞 +92 334 0002910
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://wa.me/923340002910?text=Hi! I'd like to inquire about your car rental services."
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    background: '#25D366',
                                    color: '#000000',
                                    padding: '10px 20px',
                                    borderRadius: '10px',
                                    textDecoration: 'none',
                                    fontWeight: 700,
                                    fontSize: '14px',
                                    marginTop: '4px'
                                }}
                            >
                                💬 Chat on WhatsApp
                            </a>
                        </li>
                        <li>iqkhanrentacar@gmail.com</li>
                        <li><a href="https://share.google/HkvTPbco2qxQ5fwPz" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline', fontWeight: 600 }}>Google Business Profile</a></li>
                    </ul>
                </div>
            </div>
            <div style={{ maxWidth: '1200px', margin: '60px auto 0', paddingTop: '30px', borderTop: '1px solid var(--border)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px' }}>
                © {new Date().getFullYear()} IQ Khan Rent A Car. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
