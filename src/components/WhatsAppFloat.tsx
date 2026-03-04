"use client";

import { useState } from "react";
import { MessageCircle, X, Phone } from "lucide-react";

const WhatsAppFloat = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const whatsappNumber = "923340002910";

    return (
        <div style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '12px'
        }}>
            {/* Expanded Contact Card */}
            {isExpanded && (
                <div style={{
                    background: '#fff',
                    borderRadius: '20px',
                    boxShadow: '0 8px 40px rgba(0,0,0,0.25)',
                    width: '320px',
                    overflow: 'hidden',
                    animation: 'slideUp 0.3s ease-out'
                }}>
                    {/* Header */}
                    <div style={{
                        background: '#075E54',
                        padding: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                    }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            background: '#25D366',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                        }}>
                            <MessageCircle size={24} color="#fff" />
                        </div>
                        <div>
                            <p style={{ color: '#fff', fontWeight: 700, fontSize: '16px', margin: 0 }}>
                                IQ Khan Rent A Car
                            </p>
                            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', margin: '2px 0 0' }}>
                                Typically replies instantly
                            </p>
                        </div>
                        <button
                            onClick={() => setIsExpanded(false)}
                            style={{
                                marginLeft: 'auto',
                                background: 'none',
                                border: 'none',
                                color: '#fff',
                                cursor: 'pointer',
                                padding: '4px'
                            }}
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Chat Body */}
                    <div style={{
                        padding: '20px',
                        background: '#ECE5DD',
                    }}>
                        <div style={{
                            background: '#fff',
                            padding: '12px 16px',
                            borderRadius: '0 12px 12px 12px',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                            fontSize: '14px',
                            color: '#333',
                            lineHeight: 1.5
                        }}>
                            👋 Assalam o Alaikum! Welcome to IQ Khan Rent A Car, Lahore. How can we help you today?
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <a
                            href={`https://wa.me/${whatsappNumber}?text=Hi! I'd like to inquire about your car rental services.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                                background: '#25D366',
                                color: '#000000',
                                padding: '14px',
                                borderRadius: '12px',
                                textDecoration: 'none',
                                fontWeight: 700,
                                fontSize: '15px',
                                transition: 'transform 0.2s'
                            }}
                        >
                            <MessageCircle size={20} />
                            Chat on WhatsApp
                        </a>
                        <a
                            href="tel:+923340002910"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                                background: '#f0f0f0',
                                color: '#333',
                                padding: '14px',
                                borderRadius: '12px',
                                textDecoration: 'none',
                                fontWeight: 600,
                                fontSize: '15px'
                            }}
                        >
                            <Phone size={18} />
                            Call: 0334-0002910
                        </a>
                    </div>
                </div>
            )}

            {/* Floating Button */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: '#25D366',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    position: 'relative'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.boxShadow = '0 6px 30px rgba(37, 211, 102, 0.6)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(37, 211, 102, 0.4)';
                }}
                aria-label="Contact us on WhatsApp"
            >
                {isExpanded ? (
                    <X size={28} color="#fff" />
                ) : (
                    <MessageCircle size={28} color="#000000" fill="#000000" />
                )}
                {/* Pulse animation */}
                {!isExpanded && (
                    <span style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        background: '#25D366',
                        animation: 'waPulse 2s infinite',
                        opacity: 0.4
                    }} />
                )}
            </button>

            <style>{`
                @keyframes waPulse {
                    0% { transform: scale(1); opacity: 0.4; }
                    70% { transform: scale(1.5); opacity: 0; }
                    100% { transform: scale(1.5); opacity: 0; }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default WhatsAppFloat;
