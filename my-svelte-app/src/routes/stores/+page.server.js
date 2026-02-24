import prisma from '$lib/prisma.server.js'

// 服务端load函数，只会在服务端执行
export async function load() {
  // 并行查询总数和前100个店铺
  const [totalCount, stores] = await Promise.all([
    // 查询总数（只返回数量，性能更好）
    prisma.store.count(),
    // 查询最新的100个店铺（按创建时间倒序）
    prisma.store.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100
    })
  ])

  // 返回数据给前端页面
  return {
    totalCount,  // 总数
    stores       // 前100个店铺
  }
}