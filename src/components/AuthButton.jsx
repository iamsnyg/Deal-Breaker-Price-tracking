"use client";

import React from "react";
import { Button } from "./ui/button";
import { LogIn, LogOut } from "lucide-react";
import { AuthModel } from "./AuthModel";
import { signOut } from "@/app/action";
// import { signOut } from '@/app/action';

const AuthButton = ({ user }) => {
    const [showAuthModal, setShowAuthModal] = React.useState(false);

    if (user) {
        return (
            <form action={signOut}>
                <Button
                    type="submit"
                    className="bg-linear-to-r from-red-600 to-yellow-600 hover:shadow-lg hover:shadow-red-500/50 transition-all"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                </Button>
            </form>
        );
    }
    return (
        <div>
            <Button
                onClick={() => setShowAuthModal(true)}
                className="bg-linear-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-blue-500/50 transition-all"
            >
                <LogIn className="mr-2 h-4 w-4" />
                Login
            </Button>
            <AuthModel
                isOpen={showAuthModal}
                isClose={() => setShowAuthModal(false)}
            />
        </div>
    );
};

export default AuthButton;
