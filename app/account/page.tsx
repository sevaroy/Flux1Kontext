"use client";

import { useUser } from "@/context/UserContext";
import UserSubscription from "@/components/UserSubscription";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

export default function AccountPage() {
  const { user, isAuthenticated, isLoading } = useUser();
  const router = useRouter();
  
  // 如果未登录，重定向到首页
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, isLoading, router]);
  
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-white text-gray-800">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto mt-8">
            <div className="flex flex-col items-center justify-center h-48">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-500">載入中...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">我的帳戶</h1>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
            <div className="flex items-center space-x-4">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "使用者頭像"}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              ) : (
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {user?.name?.charAt(0) || "U"}
                </div>
              )}
              <div>
                <h2 className="text-xl font-semibold">{user?.name}</h2>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h3 className="text-lg font-medium mb-2">帳戶資訊</h3>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Google帳號ID:</span> {user?.id}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">註冊日期:</span> {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
          
          {/* 訂閱信息 */}
          <UserSubscription />
          
          <div className="mt-8 space-y-4">
            <Link 
              href="/pricing" 
              className="block w-full bg-blue-500 hover:bg-blue-600 text-white text-center py-3 rounded-md transition-colors font-medium"
            >
              升級方案
            </Link>
            
            <button 
              onClick={() => signOut({ callbackUrl: "/" })}
              className="block w-full bg-red-100 hover:bg-red-200 text-red-600 text-center py-3 rounded-md transition-colors font-medium"
            >
              登出
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
