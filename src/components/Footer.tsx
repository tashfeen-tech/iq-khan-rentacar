"use client";

// Footer uses inline styles

const Footer = () => {
    return (
        <footer style={{ background: '#080808', borderTop: '1px solid var(--border)', padding: '80px 24px 40px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '60px' }}>
                <div>
                    <h3 style={{ marginBottom: '20px', letterSpacing: '2px', fontWeight: 800 }}>IQ Khan Rent A Car</h3>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                        The most trusted car rental service in Pakistan. Travel anywhere with comfort, safety, and peace of mind.
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '20px' }}>
                        <a href="https://www.facebook.com/iqkhanrentacar" target="_blank" rel="noreferrer" style={{ color: 'var(--text-main)', fontWeight: 600 }}>Facebook</a>
                    </div>
                </div>
                <div>
                    <h4 style={{ marginBottom: '20px', color: '#2ecc71', fontWeight: 700 }}>Quick Links</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <li><a href="/" style={{ color: 'var(--text-muted)', transition: 'color 0.3s' }}>Home</a></li>
                        <li><a href="/fleet" style={{ color: 'var(--text-muted)', transition: 'color 0.3s' }}>Our Fleet</a></li>
                        <li><a href="/partner" style={{ color: 'var(--text-muted)', transition: 'color 0.3s' }}>List Your Car</a></li>
                        <li><a href="/about" style={{ color: 'var(--text-muted)', transition: 'color 0.3s' }}>About Us</a></li>
                    </ul>
                </div>
                <div>
                    <h4 style={{ marginBottom: '20px', color: '#2ecc71', fontWeight: 700 }}>Contact info</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-muted)' }}>
                        <li>Al Hafeez Shopping Mall, Main Blvd Gulberg, Block D 1 Block D1 Gulberg III, Lahore, 54660</li>
                        <li>+92 334 0002910</li>
                        <li>iqkhanrentacar@gmail.com</li>
                        <li><a href="https://www.facebook.com/iqkhanrentacar" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline', fontWeight: 600 }}>Facebook Page</a></li>
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
