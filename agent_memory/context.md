# 项目上下文

## 项目概述
<!-- 简要描述项目目标、技术栈、核心功能 -->

## 目录结构
<!-- 记录关键目录和文件的用途 -->

## 关键约定
<!-- 命名规范、编码风格、架构模式等 -->

## 依赖与环境
<!-- 主要依赖、运行环境、构建工具等 -->

## 备注
<!-- 其他需要持续关注的上下文信息 -->

# 项目上下文

## 项目名称
管材库存管理系统

## 项目目标
为 MPP/PE 塑料管材（不同型号、不同壁厚）提供多人盘点、入库/出库管理、搜索、统计功能

## 技术选型
- 原型阶段：纯 HTML + CSS + JavaScript，单页应用
- 数据存储：localStorage（原型阶段）
- 后期目标：打包为 APK，多手机实时同步（需加后端）

## 数据模型
- Product: id, type(MPP/PE), model(DN200等), thickness(mm), price, note, createdAt
- StockRecord: id, productId, type(in/out), qty, note, date
