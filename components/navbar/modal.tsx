"use client";

import React from "react";
import { UserCircle } from "lucide-react";
import TokenModal from "../tokens-modal";
import { useClerk } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import { handleRevalidatePath } from "@/actions/logout";

interface UserProps {
  username: string;
  currentTokens: number;
}

const Modal = ({ username, currentTokens }: UserProps) => {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await Promise.all([
        signOut(),
        handleRevalidatePath(),
    ])
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  const handleSignIn = async () => {
    try {
      router.push("/sign-in");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className=" relative min-w-[16rem] max-lg:hidden">
      <div className="">
        <div className="bg-primary-2 flex items-center p-2 rounded-t-lg ">
          <button>
            <UserCircle size={18} color="#FFFFFF" />
          </button>
        </div>
        <div className="z-1 px-2 py-4 bg-primary-1">
          <div className="flex items-center w-full mb-2">
            <p className="text-xs text-n-2 font-semibold">
              Status:{" "}
              <span className="text-sm text-n-2 font-bold">{username}</span>
            </p>
            <>
              <button
                className="bg-transparent ml-auto"
                onClick={username === "Anonymous" ? handleSignIn : handleLogout}
              >
                <p className="text-xs text-s-1 ml-auto font-medium cursor-pointer">
                  {username === "Anonymous" ? "(log in)" : "(log out)"}
                </p>
              </button>
            </>
          </div>
          <div className="flex items-center w-full">
            <p className="text-xs text-n-2 font-semibold">
              You have:{" "}
              <span className="text-sm text-n-2 font-bold">
                {currentTokens} tokens
              </span>
            </p>
            <TokenModal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
