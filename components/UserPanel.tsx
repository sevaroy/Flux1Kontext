"use client";

import React, { useState } from "react";
import { useUser } from "@/context/UserContext";
import { signOut } from "next-auth/react";
import Image from "next/image";

const UserPanel = () => {
  const { user, isAuthenticated, isLoading } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2 p-2">
        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center space-x-2 focus:outline-none"
        aria-label="用戶選項"
      >
        {user?.image ? (
          <Image
            src={user.image}
            alt={user.name || "用戶"}
            width={32}
            height={32}
            className="rounded-full border-2 border-white"
          />
        ) : (
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
            {user?.name?.charAt(0) || "U"}
          </div>
        )}
        <span className="hidden md:inline text-sm font-medium">{user?.name}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
          <div className="px-4 py-2 border-b border-gray-200">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
          
          <a
            href="/account"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            個人檔案
          </a>
          <a
            href="/my-images"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            我的圖片
          </a>
          <a
            href="/settings"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            設定
          </a>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            登出
          </button>
        </div>
      )}
    </div>
  );
};

export default UserPanel;
