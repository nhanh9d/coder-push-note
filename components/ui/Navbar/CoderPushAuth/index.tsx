import { supabase } from "@/utils/initSupabase";
import { Auth } from "@supabase/ui";
import { useState, useEffect } from 'react';

declare type ViewType = 'sign_in' | 'sign_up' | 'forgotten_password' | 'magic_link' | 'update_password';
const CoderPushAuth = () => {

    const [authView, setAuthView] = useState('sign_in' as ViewType);
    const [showLoginForm, setShowLoginForm] = useState(false);

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
            if (event === 'PASSWORD_RECOVERY') setAuthView('update_password' as ViewType)
            if (event === 'USER_UPDATED') setTimeout(() => setAuthView('sign_in' as ViewType), 1000)
        })

        return () => {
            authListener?.unsubscribe()
        }
    }, [])
    return (
        <>
            <button type="button" onClick={() => { setShowLoginForm(true) }}>Login</button>
            {showLoginForm && (
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div
                        className="fixed inset-0 w-full h-full bg-black opacity-40"
                        onClick={() => setShowLoginForm(false)}
                    ></div>
                    <div className="flex items-center min-h-screen px-4 py-8">
                        <div className="relative w-full max-w-md p-4 mx-auto bg-white rounded-md shadow-lg">
                            <div className="mt-2 text-center sm:text-left">
                                <Auth className="w-full" supabaseClient={supabase} view={authView} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default CoderPushAuth;