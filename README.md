# 管材库存管理 - MPP/PE 管材库存工具

## 功能
- MPP、PE 管材分类管理
- 入库、出库、库存盘点
- 搜索、筛选、按规格分组
- 支持多设备实时同步

## 部署到云端

### 1. 部署到 GitHub

```bash
git add .
git commit -m "init"
git remote add origin https://github.com/YOUR_USERNAME/pipe-inventory.git
git push -u origin main
```

### 2. 部署到 Koyeb

1. 注册 [Koyeb](https://www.koyeb.com)（免费，不用绑卡）
2. 点击 **Create App**
3. 选择 **GitHub**，关联你的仓库
4. 选择 `pipe-inventory` 仓库，分支 `main`
5. Builder 选 **Dockerfile**，然后点 **Advanced**：
   - 在 **Environment variables** 添加 `PORT=3000`
6. 点击 **Create App**
7. 部署完成后会得到一个 `https://xxx.koyeb.app` 地址

### 3. 使用

所有设备浏览器打开 Koyeb 地址即可同步使用。

### 4. 生成 APK

1. 修改 `android/app/src/main/java/com/pipeinventory/MainActivity.kt` 中的 `SERVER_URL` 为你的 Koyeb 地址
2. 推送到 GitHub
3. 进入 GitHub 仓库 → **Actions** → **Build APK** → 下载构建好的 APK
4. 安装到手机即可

## 本地运行

```bash
node server.js
```

浏览器打开 http://localhost:3000

## 数据文件

数据存储在 `data.json` 中，备份这个文件即可。
