"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function PartnerPage() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        carModel: "",
        city: "",
        message: "",
        referencePhone1: "",
        referencePhone2: "",
        homeOwnership: "Owned", // From given notes
        expectedPrice: ""
    });
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await addDoc(collection(db, "partners"), {
                ...formData,
                status: "Pending",
                createdAt: serverTimestamp()
            });
            setSuccess(true);
            setFormData({
                name: "", phone: "", carModel: "", city: "", message: "", referencePhone1: "", referencePhone2: "", homeOwnership: "Owned", expectedPrice: ""
            });
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div style={{ background: 'var(--background)', minHeight: '100vh', paddingBottom: '100px' }}>
            <Navbar />
            <div style={{ paddingTop: '120px', maxWidth: '600px', margin: '0 auto', padding: '120px 24px 40px' }}>
                <div className="premium-card" style={{ padding: '40px', background: 'var(--surface)' }}>
                    <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '10px', textAlign: 'center' }}>
                        List Your <span className="gradient-text">Car</span>
                    </h1>
                    <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '30px' }}>
                        Join IQ Khan Rent A Car and earn monthly income. Please provide accurate details.
                    </p>

                    {success ? (
                        <div style={{ padding: '20px', background: 'var(--surface-hover)', color: 'var(--success)', borderRadius: '12px', textAlign: 'center' }}>
                            <h3 style={{ marginBottom: '10px' }}>Submission Successful!</h3>
                            <p>We will verify your details and contact you shortly.</p>
                            <button onClick={() => setSuccess(false)} className="btn-outline" style={{ marginTop: '20px' }}>Submit Another</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Full Name</label>
                                <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }} />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>WhatsApp / Phone Number</label>
                                <input required type="text" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }} />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Car Make & Model</label>
                                    <input required placeholder="e.g. Honda Civic 2022" type="text" value={formData.carModel} onChange={e => setFormData({ ...formData, carModel: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>City</label>
                                    <input required type="text" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }} />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Home Ownership Status</label>
                                <select value={formData.homeOwnership} onChange={e => setFormData({ ...formData, homeOwnership: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'white' }}>
                                    <option value="Owned">Owned</option>
                                    <option value="Rented">Rented</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Expected Price per Month (Rs.)</label>
                                <input required placeholder="e.g. 80000" type="number" value={formData.expectedPrice} onChange={e => setFormData({ ...formData, expectedPrice: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }} />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Reference 1 (Phone)</label>
                                <input required type="text" value={formData.referencePhone1} onChange={e => setFormData({ ...formData, referencePhone1: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }} />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Reference 2 (Phone)</label>
                                <input required type="text" value={formData.referencePhone2} onChange={e => setFormData({ ...formData, referencePhone2: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }} />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Additional Message</label>
                                <textarea rows={4} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }} />
                            </div>

                            <button type="submit" disabled={submitting} className="btn-primary" style={{ justifyContent: 'center', marginTop: '10px' }}>
                                {submitting ? "Submitting..." : "Submit Details"}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
