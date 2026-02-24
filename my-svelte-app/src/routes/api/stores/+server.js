import prisma from '$lib/prisma.server.js'
import { json } from '@sveltejs/kit'

export async function POST({ request }) {
  try {
    // 获取前端传来的数据
    const data = await request.json()

    // 检查是否是批量创建
    if (Array.isArray(data)) {
      // 批量创建店铺
      const stores = await prisma.store.createMany({
        data: data
      })

      // 返回成功结果
      return json({ count: stores.count }, { status: 201 })
    } else {
      // 单个创建店铺
      const { name, phone, address } = data
      const store = await prisma.store.create({
        data: {
          name,
          phone,
          address
        }
      })

      // 返回成功结果
      return json(store, { status: 201 })
    }

  } catch (error) {
    return json({ error: '创建失败' }, { status: 400 })
  }
}

export async function GET({ url }) {
  try {
    // 获取查询参数
    const action = url.searchParams.get('action')
    
    if (action === 'random') {
      // 使用原生 SQL 随机选择一个店铺（最高效）
      const randomStore = await prisma.$queryRaw`
        SELECT * FROM Store ORDER BY RANDOM() LIMIT 1
      `
      
      console.log('随机选择的店铺:', randomStore)
      
      if (randomStore && randomStore.length > 0) {
        return json(randomStore[0])
      }
      
      return json({ error: '暂无店铺' }, { status: 404 })
    }
    
    // 默认查询最新的100个店铺（按创建时间倒序）
    const stores = await prisma.store.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100
    })

    // 返回结果
    return json(stores)

  } catch (error) {
    return json({ error: '查询失败' }, { status: 500 })
  }
}