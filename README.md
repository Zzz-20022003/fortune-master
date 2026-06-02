# 八字命理大师 - 手机版

一款基于中国传统命理学的手机Web应用，支持八字命理、八字合婚、卦象占卜、号码吉凶、周公解梦和术语解释六大功能模块。

## 在线访问

📱 扫描二维码访问：

```
https://[你的GitHub用户名].github.io/fortune-master/
```

## 功能模块

### 1. 八字命理
- 输入出生年月日时，计算四柱八字
- 分析五行分布、八字强弱
- 事业、感情、财运、健康详细分析
- 桃花、官运、婚姻、身体健康专项分析
- 流年运势分析
- 开运转运建议（穿衣颜色、方位、风水等）
- 近期行动建议（按月划分）

### 2. 八字合婚
- 输入双方出生信息，分析婚姻匹配度
- 生肖配对详细分析
- 五行互补分析
- 日主关系解读
- 可能矛盾与优势分析
- 流年分析（今年+明年）
- 合婚建议

### 3. 卦象占卜
- 随机起卦或三枚硬币法起卦
- 四种动画风格（经典旋转、铜钱翻转、星空闪烁、简约渐显）
- 六十四卦卦象展示
- 卦辞与六爻详解
- 针对所问之事的解读

### 4. 号码吉凶
- 手机号码深度分析
- 81数理吉凶判断
- 数字能量分析
- 五行分布
- 事业/感情/财运评分
- 改运建议

### 5. 周公解梦
- 输入梦境描述
- 50+梦境关键词匹配
- 传统解梦+心理学解读
- 吉凶判断
- 近期运势提示

### 6. 术语解释
- 20+命理术语查询
- 详细解释与示例

## 技术栈

- HTML5
- CSS3（响应式设计）
- JavaScript（原生，无框架依赖）

## 本地运行

```bash
# 克隆仓库
git clone https://github.com/[你的GitHub用户名]/fortune-master.git

# 进入目录
cd fortune-master

# 使用任意HTTP服务器运行
# Python 3
python -m http.server 8000

# 或 Node.js
npx serve

# 然后访问 http://localhost:8000
```

## GitHub Pages 部署

1. 在GitHub创建仓库 `fortune-master`
2. 上传所有文件到仓库
3. 进入 Settings → Pages
4. Source 选择 Deploy from a branch
5. Branch 选择 main，文件夹选择 / (root)
6. 点击 Save，等待部署完成
7. 访问 `https://[你的GitHub用户名].github.io/fortune-master/`

## 文件结构

```
fortune-master/
├── index.html      # 主页面
├── styles.css      # 样式文件
├── app.js          # 应用逻辑
├── README.md       # 项目说明
└── .nojekyll       # GitHub Pages 配置文件
```

## 浏览器兼容性

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- 微信内置浏览器
- 手机浏览器（iOS Safari、Android Chrome）

## 设计特点

- 移动端优先设计，适配320px-768px屏幕
- 中国传统风格配色（米色背景#f5f0e8、深棕色文字#5c4a2a）
- 底部Tab导航，单手操作友好
- 平滑的页面切换动画
- 触摸友好的大按钮设计

## 免责声明

本应用仅供娱乐和文化研究使用，命理分析结果仅供参考。人生吉凶祸福，终究取决于自身的努力和选择。

## 许可证

MIT License

---

传承千年智慧 · 解读人生密码
