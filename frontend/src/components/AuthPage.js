import React, { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import supabase from "../lib/supabase";

export default function AuthPage({ initialView = "sign_in" }) {
    const navigate = useNavigate();

    // 1️⃣ Listen for SIGNED_IN event and redirect
    useEffect(() => {
        const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === "SIGNED_IN") {
                // once we have a session, kick them over to their profile
                navigate("/profile");
            }
        });
        return () => {
            listener.subscription.unsubscribe();
        };
    }, [navigate]);

    return (
        <div className="auth-page">
            <h2>{initialView === "sign_up" ? "Register for HELP." : "Log in to HELP."}</h2>

            <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                providers={[]} // no OAuth
                theme="dark"
                view={initialView} // "sign_in" or "sign_up"
            />
        </div>
    );
}
