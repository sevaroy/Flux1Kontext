import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// 从数据库或Lemon Squeezy API获取用户订阅状态
// 这是一个示例实现，实际应用中应该从数据库查询或调用Lemon Squeezy API
async function getUserSubscription(email: string) {
  // 实现示例：根据邮箱从数据库获取用户订阅信息
  // 实际应用中，你需要实现正确的数据库查询或API调用
  try {
    // 这里应该是从数据库或Lemon Squeezy API获取数据的代码
    // 示例: const subscription = await db.subscriptions.findOne({ email });
    
    // 模拟返回结果 - 在实际应用中替换为真实数据
    const mockSubscriptions: Record<string, { status: string }> = {};
    
    return mockSubscriptions[email] || { status: "free" };
  } catch (error) {
    console.error("Error fetching subscription:", error);
    return { status: "error" };
  }
}

export async function GET(request: NextRequest) {
  // 获取查询参数
  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get("email");
  
  // 验证用户身份
  const token = await getToken({ req: request as any });
  
  // 如果没有提供邮箱或未认证，返回错误
  if (!email) {
    return NextResponse.json(
      { error: "Email is required" },
      { status: 400 }
    );
  }
  
  // 检查是否有权限（用户只能查询自己的订阅信息）
  if (token?.email !== email) {
    // 如果是管理员，可以查看任何用户的信息
    const isAdmin = token?.role === "admin";
    
    if (!isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }
  }
  
  // 获取订阅信息
  const subscription = await getUserSubscription(email);
  
  return NextResponse.json(subscription);
}
