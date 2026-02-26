"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function AutoLogin() {
    const [status, setStatus] = useState("Logging in...");

    useEffect(() => {
        const login = async () => {
            try {
                let cred;
                try {
                    cred = await signInWithEmailAndPassword(auth, "testadmin@popularrentacar.com", "password123");
                } catch {
                    cred = await createUserWithEmailAndPassword(auth, "testadmin@popularrentacar.com", "password123");
                }

                await setDoc(doc(db, "users", cred.user.uid), {
                    role: "admin",
                    email: "testadmin@popularrentacar.com",
                    name: "Test Admin",
                    phone: "03001234567"
                }, { merge: true });

                setStatus("Success! You are now admin.");
                window.location.href = "/admin/dashboard";
            } catch (err: any) {
                setStatus("Error: " + err.message);
                console.error(err);
            }
        };
        login();
    }, []);

    return <div style={{ padding: 50 }}>{status}</div>;
}
