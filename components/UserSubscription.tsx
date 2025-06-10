"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import Link from "next/link";

// 订阅状态类型
type SubscriptionStatus = "free" | "basic" | "premium" | "loading" | "error";

export default function UserSubscription() {
  const { user, isAuthenticated } = useUser();
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus>("loading");
  
  // 获取用户订阅状态
  useEffect(() => {
    if (!isAuthenticated || !user?.email) {
      setSubscriptionStatus("free");
      return;
    }
    
    // 这里应该根据用户ID或邮箱从后端API获取订阅状态
    // 示例: /api/lemon-squeezy/subscription-status
    fetch(`/api/lemon-squeezy/subscription-status?email=${encodeURIComponent(user.email)}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch subscription");
        return res.json();
      })
      .then(data => {
        setSubscriptionStatus(data.status);
      })
      .catch(err => {
        console.error("Error fetching subscription:", err);
        setSubscriptionStatus("error");
      });
  }, [isAuthenticated, user?.email]);
  
  if (!isAuthenticated || subscriptionStatus === "loading") {
    return null;
  }
  
  // 订阅信息显示
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mt-4 shadow-sm">
      <h3 className="text-lg font-semibold mb-2">您的订阅</h3>
      
      {subscriptionStatus === "error" ? (
        <p className="text-red-500">无法加载订阅信息</p>
      ) : subscriptionStatus === "free" ? (
        <>
          <p className="text-gray-600 mb-3">您当前使用的是免费版本</p>
          <Link 
            href="/pricing" 
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors text-sm"
          >
            升级订阅
          </Link>
        </>
      ) : (
        <>
          <div className="flex items-center">
            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full mr-2 ${
              subscriptionStatus === "premium" ? "bg-purple-100 text-purple-600" : "bg-green-100 text-green-600"
            }`}>
              {subscriptionStatus === "premium" ? "P" : "B"}
            </span>
            <div>
              <p className="font-medium">
                {subscriptionStatus === "premium" ? "高级会员" : "基本会员"}
              </p>
              <p className="text-xs text-gray-500">
                {subscriptionStatus === "premium" 
                  ? "包含全部功能，无限使用" 
                  : "包含基本功能，每月有使用限制"}
              </p>
            </div>
          </div>
          <div className="mt-3 text-sm">
            <Link 
              href="/account/billing" 
              className="text-blue-500 hover:text-blue-700 transition-colors mr-4"
            >
              管理订阅
            </Link>
            {subscriptionStatus === "basic" && (
              <Link 
                href="/pricing" 
                className="text-purple-500 hover:text-purple-700 transition-colors"
              >
                升级到高级版
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
}
