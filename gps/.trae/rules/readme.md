后端接受一个post请求、把经纬度和电压存储到数据库中。前端展示数据库中的数据，用列表按时间递减展示。
技术栈：React前端、Express后端、Prisma数据库模型（SQLite配置）、SQLite数据库文件（自动生成）
样式：移动端优先


数据结构
webapp-sqlite/
├── client/                    # React前端
│   ├── src/
│   │   ├── App.js
│   │   ├── api.js
│   │   └── App.css
│   └── package.json
├── server/                    # Express后端
│   ├── prisma/
│   │   ├── schema.prisma     # Prisma数据模型（SQLite配置）
│   │   └── dev.db            # SQLite数据库文件（自动生成）
│   ├── index.js
│   ├── package.json
│   └── .env
└── package.json              # 根目录配置


json格式：
{
  "longitude": 116.3974,
  "latitude": 39.9093,
  "voltage": 220.5
}

