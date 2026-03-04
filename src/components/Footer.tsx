"use client";

// Footer uses inline styles

const Footer = () => {
    return (
        <footer style={{ background: '#080808', borderTop: '1px solid var(--border)', padding: '80px 24px 40px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '60px' }}>
                <div>
                    <h3 style={{ marginBottom: '20px', letterSpacing: '2px', fontWeight: 800 }}>Popular Rent A Car</h3>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                        The most trusted car rental service in Pakistan. Travel anywhere with comfort, safety, and peace of mind.
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '20px' }}>
                        <a href="https://www.facebook.com/popularrentcars" target="_blank" rel="noreferrer" style={{ color: 'var(--text-main)', fontWeight: 600 }}>Facebook</a>
                        <a href="https://www.instagram.com/popularrentacars" target="_blank" rel="noreferrer" style={{ color: 'var(--text-main)', fontWeight: 600 }}>Instagram</a>
                        <a href="https://www.pinterest.com/popularrentacars" target="_blank" rel="noreferrer" style={{ color: 'var(--text-main)', fontWeight: 600 }}>Pinterest</a>
                        <a href="https://www.youtube.com/@popularrentacar_pk" target="_blank" rel="noreferrer" style={{ color: 'var(--text-main)', fontWeight: 600 }}>YouTube</a>
                        <a href="https://www.tiktok.com/@muhammadimran.777" target="_blank" rel="noreferrer" style={{ color: 'var(--text-main)', fontWeight: 600 }}>TikTok</a>
                    </div>
                </div>
                <div>
                    <h4 style={{ marginBottom: '20px', color: '#eb212e', fontWeight: 700 }}>Quick Links</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <li><a href="/" style={{ color: 'var(--text-muted)', transition: 'color 0.3s' }}>Home</a></li>
                        <li><a href="/fleet" style={{ color: 'var(--text-muted)', transition: 'color 0.3s' }}>Our Fleet</a></li>
                        <li><a href="/partner" style={{ color: 'var(--text-muted)', transition: 'color 0.3s' }}>List Your Car</a></li>
                        <li><a href="/about" style={{ color: 'var(--text-muted)', transition: 'color 0.3s' }}>About Us</a></li>
                    </ul>
                </div>
                <div>
                    <h4 style={{ marginBottom: '20px', color: '#eb212e', fontWeight: 700 }}>Contact info</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-muted)' }}>
                        <li>Mian Plaza, Civic Centre Block D-2, Phase 1, Johar Town, Lahore</li>
                        <li>+92 304 6257 123</li>
                        <li>popularrentacarofficial@gmail.com</li>
                        <li><a href="https://share.google/GWVrBltkF4hrlyH4m" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline', fontWeight: 600 }}>Google Business Profile</a></li>
                    </ul>
                </div>
            </div>
            <div style={{ maxWidth: '1200px', margin: '60px auto 0', paddingTop: '30px', borderTop: '1px solid var(--border)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px' }}>
                © {new Date().getFullYear()} Popular Rent A Car. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
