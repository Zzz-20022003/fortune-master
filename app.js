/**
 * 八字命理大师 - 主应用脚本
 * 包含所有功能模块的交互逻辑
 */

// ========================================
// 数据定义
// ========================================

// 天干
const TIANGAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];

// 地支
const DIZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// 五行
const WUXING = {
    '甲': '木', '乙': '木',
    '丙': '火', '丁': '火',
    '戊': '土', '己': '土',
    '庚': '金', '辛': '金',
    '壬': '水', '癸': '水',
    '子': '水', '丑': '土', '寅': '木', '卯': '木',
    '辰': '土', '巳': '火', '午': '火', '未': '土',
    '申': '金', '酉': '金', '戌': '土', '亥': '水'
};

// 生肖
const SHENGXIAO = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];

// 八卦
const BAGUA = [
    { name: '乾', symbol: '☰', guaci: '元亨利贞', yao: ['潜龙勿用', '见龙在田', '君子终日乾乾', '或跃在渊', '飞龙在天', '亢龙有悔'] },
    { name: '坤', symbol: '☷', guaci: '元亨，利牝马之贞', yao: ['履霜坚冰至', '直方大', '含章可贞', '括囊无咎', '黄裳元吉', '龙战于野'] },
    { name: '震', symbol: '☳', guaci: '亨，震来虩虩', yao: ['震来虩虩', '震遂泥', '震苏苏', '震行', '震往来厉', '震索索'] },
    { name: '巽', symbol: '☴', guaci: '小亨，利有攸往', yao: ['进退', '巽在床下', '频巽', '悔亡', '田获三品', '巽在床下'] },
    { name: '坎', symbol: '☵', guaci: '习坎，有孚维心', yao: ['习坎入坎', '坎有险', '来之坎坎', '纳约不盈', '祗既平', '系用徽纆'] },
    { name: '离', symbol: '☲', guaci: '明夷，利艰贞', yao: ['履错然', '黄离元吉', '日昃之离', '突如焚', '悔亡', '王用出征'] },
    { name: '艮', symbol: '☶', guaci: '艮其背，不获其身', yao: ['艮其趾', '艮其腓', '艮其限', '艮其身', '艮其辅', '敦临吉'] },
    { name: '兑', symbol: '☱', guaci: '亨，利贞', yao: ['和兑吉', '孚兑吉', '来兑凶', '商兑未宁', '介疾有喜', '引兑'] }
];

// 命理术语数据
const TERMS_DATA = [
    {
        name: '四柱八字',
        brief: '年柱、月柱、日柱、时柱',
        content: `四柱八字是根据一个人出生的年、月、日、时四个时间点来推算命运的方法。

<h4>年柱</h4>
<p>代表祖上、父母宫，也代表少年时期（1-15岁）的运势。年柱的天干代表祖父，地支代表祖母。</p>

<h4>月柱</h4>
<p>代表父母宫、兄弟宫，也代表青年时期（16-30岁）的运势。月柱是命局的核心，反映一个人的表达能力、社交能力。</p>

<h4>日柱</h4>
<p>代表本人，是整个八字的核心。日干代表命主自己，日支代表配偶宫。</p>

<h4>时柱</h4>
<p>代表子女宫、晚年运势，也代表老年时期（46岁以后）的吉凶。</p>`
    },
    {
        name: '五行',
        brief: '金、木、水、火、土',
        content: `五行是中国古代哲学思想，认为世界由金、木、水、火、土五种基本物质构成。

<h4>木</h4>
<p>代表生长、仁慈、东方、春季。属木的人通常仁慈、有爱心、善于思考。</p>

<h4>火</h4>
<p>代表热情、活力、南方、夏季。属火的人通常热情洋溢、积极主动、有领导力。</p>

<h4>土</h4>
<p>代表稳定、诚信、中央、季节交替。属土的人通常诚实可靠、有耐心、踏实稳重。</p>

<h4>金</h4>
<p>代表决断、义气、西方、秋季。属金的人通常果断、有义气、善于理财。</p>

<h4>水</h4>
<p>代表智慧、流动、北方、冬季。属水的人通常聪明伶俐、适应力强、善于交际。</p>`
    },
    {
        name: '天干地支',
        brief: '十天干与十二地支的配合',
        content: `天干地支是中国古代用于计时的符号系统，也是八字命理的基础。

<h4>十天干</h4>
<p>甲、乙、丙、丁、戊、己、庚、辛、壬、癸</p>
<p>其中甲丙戊庚壬为阳干，乙丁己辛癸为阴干。</p>

<h4>十二地支</h4>
<p>子、丑、寅、卯、辰、巳、午、未、申、酉、戌、亥</p>
<p>其中子寅辰午申戌为阳支，丑卯巳未酉亥为阴支。</p>

<h4>六十甲子</h4>
<p>天干地支循环配对，形成60个组合，称为六十甲子，用于纪年、纪月、纪日、纪时。</p>`
    },
    {
        name: '十神',
        brief: '比肩、劫财、食神、伤官...',
        content: `十神是八字中表示人事关系的符号系统。

<h4>比肩、劫财</h4>
<p>与日主同属性的五行，代表兄弟姐妹、朋友、同事。比肩为同性，劫财为异性。</p>

<h4>食神、伤官</h4>
<p>日主所生的五行，代表才华、技艺、创意。食神为同性所生，伤官为异性所生。</p>

<h4>正财、偏财</h4>
<p>日主所克的五行，代表财富、工作。正财为正当收入，偏财为意外之财、投资。</p>

<h4>正官、七杀</h4>
<p>克日主的五行，代表事业、压力、官非。正官为有情的克制，七杀为无情的克制。</p>

<h4>正印、偏印</h4>
<p>生日主的五行，代表学业、母亲、贵人。偏印又称枭神。</p>`
    },
    {
        name: '大运',
        brief: '人生不同阶段的运势',
        content: `大运是八字命理中表示人生不同阶段运势的重要概念。

<h4>什么是大运</h4>
<p>大运是将人生分为若干阶段，每个阶段大约持续10年，代表这10年中的总体运势走向。</p>

<h4>起大运时间</h4>
<p>大运从命主出生后开始计算，一般每3天折合1年运程。</p>

<h4>大运分析</h4>
<p>大运期间，需要结合大运的五行与命局的关系来分析。如果大运助命局，则此运较为顺利；如果大运克耗命局，则需谨慎行事。</p>`
    },
    {
        name: '流年',
        brief: '每一年的运势变化',
        content: `流年是指每一年的运势变化，是命理预测中最常用的概念。

<h4>流年的定义</h4>
<p>流年即太岁，代表当年的年支。流年干支与命局、大运相互作用，形成当年的运势。</p>

<h4>流年分析</h4>
<p>流年对命局的影响是一年一变的。当流年与命局中的某个字相同时，往往意味着该方面会有大事发生。</p>

<h4>吉凶判断</h4>
<p>流年吉凶需要结合多个因素：流年与命局的生克关系、流年的旺衰、以及具体的宫位等。</p>`
    },
    {
        name: '旺衰',
        brief: '八字中五行的强弱',
        content: `旺衰是指八字中五行的强弱程度，是判断命局的重要方法。

<h4>得令</h4>
<p>日主得月令（出生月份的能量），为旺或相。</p>

<h4>得地</h4>
<p>日主在其他地支有根（相同的五行），为得地。</p>

<h4>得助</h4>
<p>日主得到天干或地支中同类五行的帮助。</p>

<h4>旺衰判断</h4>
<p>综合得令、得地、得助三个方面，判断日主的整体强弱。旺则宜泄宜克，弱则宜生宜助。</p>`
    },
    {
        name: '用神忌神',
        brief: '命局中的关键五行',
        content: `用神和忌神是八字分析中最核心的概念。

<h4>用神</h4>
<p>对命局最有益的五行，能够平衡命局、弥补不足。用神一出现，往往有好事发生。</p>

<h4>忌神</h4>
<p>对命局最不利的五行，会破坏命局的平衡。忌神受制，往往有好事；忌神无制，往往有凶事。</p>

<h4>如何取用神</h4>
<p>根据日主的旺衰和命局的配置来确定。如果日主旺，则用克泄耗的五行；如果日主弱，则用生助的五行。</p>`
    },
    {
        name: '桃花',
        brief: '感情运势与异性缘',
        content: `桃花是八字中代表感情运势和异性缘的重要星曜。

<h4>桃花星</h4>
<p>子午卯酉为四桃花，分别位于北、南、东、西四个方位。</p>

<h4>桃花的作用</h4>
<p>桃花旺的人，感情丰富、魅力十足、容易吸引异性。但桃花过旺也可能导致感情复杂。</p>

<h4>桃花的吉凶</h4>
<p>桃花生旺则多情但有分寸；桃花衰败则感情冷淡；桃花被冲则感情有变动。</p>`
    },
    {
        name: '官星',
        brief: '事业与权力',
        content: `官星是八字中代表事业、权力、地位的星曜。

<h4>正官</h4>
<p>代表正当的权力、职位、名誉。正官为用且旺者，往往事业有成、地位稳固。</p>

<h4>七杀</h4>
<p>代表权力、压力、竞争。七杀需要制化得宜，否则容易有官非小人。</p>

<h4>官星与事业</h4>
<p>官星在命局中的位置和状态，决定了命主的事业走向和仕途吉凶。</p>`
    },
    {
        name: '财星',
        brief: '财富与财运',
        content: `财星是八字中代表财富和财运的星曜。

<h4>正财</h4>
<p>代表正当收入，如工资、稳定的生意。正财之人往往踏实可靠、勤俭持家。</p>

<h4>偏财</h4>
<p>代表意外之财，如投资、彩票、投机所得。偏财之人往往敢于冒险、善于把握机会。</p>

<h4>财星与命主</h4>
<p>财星需要身旺才能担财，身弱财旺则难以聚财，容易财来财去。</p>`
    },
    {
        name: '印星',
        brief: '学业与贵人',
        content: `印星是八字中代表学业、母亲、贵人的星曜。

<h4>正印</h4>
<p>代表正统的教育、文凭、母亲。正印为用者，往往学业有成、心地善良。</p>

<h4>偏印（枭神）</h4>
<p>代表特殊技艺、非正统教育。偏印之人往往聪明过人，但可能有些孤僻。</p>

<h4>印星的作用</h4>
<p>印星代表学历、学习能力，也代表贵人帮助和名誉地位。</p>`
    },
    {
        name: '日主',
        brief: '代表命主本人',
        content: `日主是八字中代表命主本人的核心概念。

<h4>日干的确定</h4>
<p>根据出生日期的天干来确定日干，这就是命主自己的代号。</p>

<h4>日主与性格</h4>
<p>日干的五行属性决定了命主的基本性格特征。如甲木之人刚直仁慈，丙火之人热情奔放。</p>

<h4>日主与其他</h4>
<p>日主与其他天干地支的关系，构成了整个命局的人事关系网络。</p>`
    },
    {
        name: '六亲',
        brief: '父母、兄弟、配偶、子女',
        content: `六亲是八字中代表各种亲属关系的概念。

<h4>父亲</h4>
<p>以偏财为代表，也看年柱和印星。</p>

<h4>母亲</h4>
<p>以正印为代表，也看年柱。</p>

<h4>兄弟姐妹</h4>
<p>以比肩、劫财为代表，看月柱。</p>

<h4>配偶</h4>
<p>男以正财为代表，女以正官为代表，看日支。</p>

<h4>子女</h4>
<p>以食神、伤官为代表，看时柱。</p>`
    },
    {
        name: '胎元',
        brief: '生命孕育时期',
        content: `胎元是八字中代表生命孕育时期的重要概念。

<h4>胎元的计算</h4>
<p>胎元为出生前一个月的干支，反映的是母亲怀孕时期的环境和气场。</p>

<h4>胎元的作用</h4>
<p>胎元与命局的关系，可以看出先天禀赋和幼年运势。</p>

<h4>胎元与健康</h4>
<p>胎元受克或为空，容易有先天性疾病或体质较弱。</p>`
    },
    {
        name: '命宫',
        brief: '命运的核心',
        content: `命宫是八字中非常重要的一个宫位。

<h4>命宫的计算</h4>
<p>根据出生的月份和时辰来推算命宫的地支。</p>

<h4>命宫的意义</h4>
<p>命宫代表命主一生的核心运势，是判断命运高低的重要依据。</p>

<h4>命宫与其他</h4>
<p>命宫与四柱的关系，可以看出命主在不同时期的人生重点。</p>`
    },
    {
        name: '身宫',
        brief: '自我与修为',
        content: `身宫是八字中代表自我认知和后天修为的宫位。

<h4>身宫的计算</h4>
<p>身宫由出生月份和时辰共同决定。</p>

<h4>身宫的意义</h4>
<p>身宫代表命主后天的努力方向和自我提升的空间。</p>

<h4>身宫与命运</h4>
<p>命宫先天定，身宫后天修。命宫不佳但身宫好者，可通过后天努力改变命运。</p>`
    },
    {
        name: '神煞',
        brief: '吉凶神煞星曜',
        content: `神煞是八字中表示吉凶祸福的特殊星曜。

<h4>吉神</h4>
<p>天乙贵人、文昌贵人、天德贵人、月德贵人等，代表吉祥、顺利、贵人帮助。</p>

<h4>凶神</h4>
<p>羊刃、飞刃、阴差阳错、孤辰寡宿等，代表阻碍、困难、需要特别注意。</p>

<h4>神煞的作用</h4>
<p>神煞是命理预测的辅助工具，需要结合命局整体来判断吉凶。</p>`
    },
    {
        name: '合冲',
        brief: '天干地支的作用关系',
        content: `合冲是八字中天干地支相互作用的重要方式。

<h4>天合</h4>
<p>甲己合土、乙庚合金、丙辛合水、丁壬合木、戊癸合火</p>

<h4>地合</h4>
<p>子丑合土、寅亥合木、卯戌合火、辰酉合金、巳申合水、午未合火</p>

<h4>地冲</h4>
<p>子午冲、丑未冲、寅申冲、卯酉冲、辰戌冲、巳亥冲</p>

<h4>合冲的意义</h4>
<p>合代表吸引、聚、合好；冲代表分离、冲突、变动。合冲的力量会影响命局的吉凶。</p>`
    },
    {
        name: '空亡',
        brief: '虚而不实的能量',
        content: `空亡是八字中表示暂时无力或缺失的概念。

<h4>空亡的计算</h4>
<p>以日干查空亡之支。甲子旬中戌亥空，甲寅旬中子丑空，以此类推。</p>

<h4>空亡的意义</h4>
<p>空亡代表某方面的能量暂时处于虚弱或缺失状态。</p>

<h4>空亡的吉凶</h4>
<p>吉神空亡不吉，凶神空亡不凶。需要具体分析。</p>`
    },
    {
        name: '得令',
        brief: '月令对日主的影响',
        content: `得令是判断日主旺衰的重要依据。

<h4>得令的定义</h4>
<p>日干与月令地支的五行相同或相生，即为得令。</p>

<h4>得令的程度</h4>
<p>月令为日干的本气时，得令最重；为中气、余气时，得令较轻。</p>

<h4>得令与命运</h4>
<p>得令的日主往往精力充沛、意志坚强，事业发展更有竞争力。</p>`
    }
];

// 梦境关键词对应解释
const DREAM_INTERPRETATIONS = {
    '水': { luck: '中吉', meaning: '水象征财富和情感的流动', analysis: '梦见水通常代表财运上升或情感表达，是积极的信号。' },
    '火': { luck: '凶', meaning: '火代表热情、愤怒或危机', analysis: '梦见火需要警惕，可能暗示生活中有需要处理的问题或冲突。' },
    '金': { luck: '吉', meaning: '金代表财富和坚硬品质', analysis: '梦见金属物品通常预示财运提升或获得意外之财。' },
    '木': { luck: '吉', meaning: '木代表生长和生命力', analysis: '梦见树木或植物象征事业成长、健康改善。' },
    '土': { luck: '平', meaning: '土代表稳定和根基', analysis: '梦见土地或山丘暗示需要脚踏实地，稳固基础。' },
    '龙': { luck: '大吉', meaning: '龙象征权力、尊贵和好运', analysis: '梦见龙是非常吉利的征兆，代表事业腾飞、地位提升。' },
    '蛇': { luck: '凶', meaning: '蛇象征智慧、诱惑或潜在威胁', analysis: '梦见蛇可能暗示身边有小人或需要警惕的陷阱。' },
    '虎': { luck: '吉', meaning: '虎象征力量和威严', analysis: '梦见虎代表有贵人相助或获得权力的机会。' },
    '猪': { luck: '吉', meaning: '猪象征财富和福气', analysis: '梦见猪通常预示财运上升，生活富足。' },
    '马': { luck: '吉', meaning: '马象征事业发展和前进', analysis: '梦见马代表事业进步、目标即将达成。' },
    '鸟': { luck: '中吉', meaning: '鸟象征自由和消息', analysis: '梦见鸟可能暗示有远方消息或思想得到解放。' },
    '鱼': { luck: '大吉', meaning: '鱼象征财富和年年有余', analysis: '梦见鱼是非常好的征兆，代表财运亨通、富贵有余。' },
    '死': { luck: '凶', meaning: '死亡象征结束和转变', analysis: '梦见死亡通常不是坏事，可能代表某段时期或状态的结束。' },
    '结婚': { luck: '中吉', meaning: '结婚象征结合和承诺', analysis: '未婚者梦见结婚可能预示姻缘将至；已婚者可能预示生活和谐。' },
    '死亡': { luck: '凶', meaning: '死亡象征结束和转变', analysis: '梦中死亡可能代表旧我的消亡和新生的开始，是转变的象征。' },
    '飞': { luck: '大吉', meaning: '飞翔象征自由和提升', analysis: '梦见飞翔代表对自由的渴望或即将迎来上升期。' },
    '坠': { luck: '凶', meaning: '坠落象征失控或焦虑', analysis: '梦见坠落反映现实中的压力或对某事的担忧。' },
    '房子': { luck: '中吉', meaning: '房子象征自我和安全感', analysis: '梦见房子代表对自我内心的探索或生活状态的改变。' },
    '考试': { luck: '平', meaning: '考试象征检验和压力', analysis: '梦见考试反映对现实中某事的准备或担忧。' },
    '钱': { luck: '吉', meaning: '钱象征价值和收获', analysis: '梦见钱可能预示财运变化，需要结合梦境细节判断。' }
};

// ========================================
// 工具函数
// ========================================

/**
 * 格式化日期选择器
 */
function formatDateSelects() {
    const yearSelect = document.getElementById('bazi-year');
    const monthSelect = document.getElementById('bazi-month');
    const daySelect = document.getElementById('bazi-day');
    
    const hourSelect = document.getElementById('bazi-hour');
    const minuteSelect = document.getElementById('bazi-minute');
    
    // 年份
    if (yearSelect) {
        const currentYear = new Date().getFullYear();
        for (let y = currentYear - 100; y <= currentYear; y++) {
            yearSelect.innerHTML += `<option value="${y}">${y}</option>`;
        }
        yearSelect.value = currentYear - 30;
    }
    
    // 月份
    if (monthSelect) {
        for (let m = 1; m <= 12; m++) {
            monthSelect.innerHTML += `<option value="${m}">${m}</option>`;
        }
    }
    
    // 日期
    if (daySelect) {
        for (let d = 1; d <= 31; d++) {
            daySelect.innerHTML += `<option value="${d}">${d}</option>`;
        }
    }
    
    // 小时
    if (hourSelect) {
        for (let h = 0; h <= 23; h++) {
            hourSelect.innerHTML += `<option value="${h}">${h.toString().padStart(2, '0')}</option>`;
        }
    }
    
    // 分钟
    if (minuteSelect) {
        for (let m = 0; m <= 59; m++) {
            minuteSelect.innerHTML += `<option value="${m}">${m.toString().padStart(2, '0')}</option>`;
        }
    }
    
    // 合婚年份
    ['male', 'female'].forEach(gender => {
        const ySelect = document.getElementById(`hehun-${gender}-year`);
        const mSelect = document.getElementById(`hehun-${gender}-month`);
        const dSelect = document.getElementById(`hehun-${gender}-day`);
        
        if (ySelect) {
            const currentYear = new Date().getFullYear();
            for (let y = currentYear - 100; y <= currentYear; y++) {
                ySelect.innerHTML += `<option value="${y}">${y}</option>`;
            }
        }
        if (mSelect) {
            for (let m = 1; m <= 12; m++) {
                mSelect.innerHTML += `<option value="${m}">${m}</option>`;
            }
        }
        if (dSelect) {
            for (let d = 1; d <= 31; d++) {
                dSelect.innerHTML += `<option value="${d}">${d}</option>`;
            }
        }
    });
}

/**
 * 根据出生日期计算八字
 */
function calculateBazi(year, month, day, hour) {
    // 简化版八字计算（实际需要更复杂的历法计算）
    const yearIndex = (year - 4) % 10; // 年干
    const yearBranchIndex = (year - 4) % 12; // 年支
    
    // 月干计算（需要日干参与，简化处理）
    const monthBranchIndex = (month + 2) % 12;
    const monthGanIndex = (yearIndex % 5) * 2 + Math.floor((month - 1) / 3);
    
    // 日干支计算（简化）
    const totalDays = Math.floor((new Date(year, month - 1, day) - new Date(1900, 0, 1)) / 86400000);
    const dayGanIndex = totalDays % 10;
    const dayBranchIndex = totalDays % 12;
    
    // 时干支
    const hourBranchIndex = Math.floor((hour + 1) / 2) % 12;
    const hourGanIndex = (dayGanIndex % 5) * 2 + Math.floor(hourBranchIndex / 2);
    
    return {
        year: { gan: TIANGAN[yearIndex], zhi: DIZHI[yearBranchIndex] },
        month: { gan: TIANGAN[monthGanIndex % 10], zhi: DIZHI[monthBranchIndex] },
        day: { gan: TIANGAN[dayGanIndex], zhi: DIZHI[dayBranchIndex] },
        hour: { gan: TIANGAN[hourGanIndex % 10], zhi: DIZHI[hourBranchIndex] }
    };
}

/**
 * 计算五行分布
 */
function calculateWuxing(bazi) {
    const counts = { 木: 0, 火: 0, 土: 0, 金: 0, 水: 0 };
    
    Object.values(bazi).forEach(pillar => {
        counts[WUXING[pillar.gan]]++;
        counts[WUXING[pillar.zhi]]++;
    });
    
    return counts;
}

/**
 * 获取生肖
 */
function getShengXiao(year) {
    return SHENGXIAO[(year - 4) % 12];
}

/**
 * 生成随机卦象
 */
function generateGua() {
    const index = Math.floor(Math.random() * BAGUA.length);
    return BAGUA[index];
}

/**
 * 随机生成爻
 */
function generateYao() {
    return Math.random() > 0.5; // true为阳爻，false为阴爻
}

/**
 * 生成六爻
 */
function generateLiuYao() {
    return Array(6).fill(null).map(() => generateYao());
}

/**
 * 延迟函数
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 获取当前年份干支
 */
function getCurrentYearGanzhi() {
    const year = new Date().getFullYear();
    const ganIndex = (year - 4) % 10;
    const zhiIndex = (year - 4) % 12;
    return TIANGAN[ganIndex] + DIZHI[zhiIndex];
}

// ========================================
// 主应用类
// ========================================

class BaziApp {
    constructor() {
        this.currentTab = 'bazi';
        this.isAnimating = false;
        this.animationTimer = null;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.renderTab('bazi');
        formatDateSelects();
    }
    
    bindEvents() {
        // 底部导航点击
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                const tab = item.dataset.tab;
                this.switchTab(tab);
            });
        });
        
        // 选项按钮切换
        document.addEventListener('click', (e) => {
            if (e.target.closest('.option-btn')) {
                const btn = e.target.closest('.option-btn');
                const group = btn.closest('.option-buttons');
                group.querySelectorAll('.option-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                btn.querySelector('input').checked = true;
            }
        });
        
        // 八字测算
        document.getElementById('bazi-calculate')?.addEventListener('click', () => this.calculateBazi());
        
        // 合婚测算
        document.getElementById('hehun-calculate')?.addEventListener('click', () => this.calculateHehun());
        
        // 卦象占卜
        document.getElementById('guaxiang-start')?.addEventListener('click', () => this.startGuaxiang());
        document.getElementById('guaxiang-stop')?.addEventListener('click', () => this.stopGuaxiang());
        
        // 号码分析
        document.getElementById('haoma-calculate')?.addEventListener('click', () => this.calculateHaoma());
        
        // 周公解梦
        document.getElementById('meng-calculate')?.addEventListener('click', () => this.calculateMeng());
        
        // 术语搜索
        document.getElementById('shuyu-search')?.addEventListener('input', (e) => this.filterTerms(e.target.value));
    }
    
    switchTab(tab) {
        if (this.currentTab === tab) return;
        
        document.querySelector('.content').classList.add('switching');
        
        setTimeout(() => {
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.toggle('active', item.dataset.tab === tab);
            });
            
            this.renderTab(tab);
            this.currentTab = tab;
            
            document.querySelector('.content').classList.remove('switching');
        }, 200);
    }
    
    renderTab(tab) {
        const mainContent = document.getElementById('mainContent');
        const template = document.getElementById(`tpl-${tab}`);
        
        if (template) {
            mainContent.innerHTML = template.innerHTML;
            
            // 初始化特定tab的事件
            setTimeout(() => {
                this.initTabEvents(tab);
            }, 0);
        }
    }
    
    initTabEvents(tab) {
        switch(tab) {
            case 'bazi':
                formatDateSelects();
                document.getElementById('bazi-calculate')?.addEventListener('click', () => this.calculateBazi());
                break;
            case 'hehun':
                formatDateSelects();
                document.getElementById('hehun-calculate')?.addEventListener('click', () => this.calculateHehun());
                break;
            case 'guaxiang':
                document.getElementById('guaxiang-start')?.addEventListener('click', () => this.startGuaxiang());
                document.getElementById('guaxiang-stop')?.addEventListener('click', () => this.stopGuaxiang());
                break;
            case 'haoma':
                document.getElementById('haoma-calculate')?.addEventListener('click', () => this.calculateHaoma());
                break;
            case 'meng':
                document.getElementById('meng-calculate')?.addEventListener('click', () => this.calculateMeng());
                break;
            case 'shuyu':
                this.renderTerms();
                document.getElementById('shuyu-search')?.addEventListener('input', (e) => this.filterTerms(e.target.value));
                break;
        }
    }
    
    restart(tab) {
        this.renderTab(tab);
        this.initTabEvents(tab);
    }
    
    // ========================================
    // 八字命理
    // ========================================
    
    async calculateBazi() {
        const name = document.getElementById('bazi-name')?.value;
        const year = parseInt(document.getElementById('bazi-year')?.value);
        const month = parseInt(document.getElementById('bazi-month')?.value);
        const day = parseInt(document.getElementById('bazi-day')?.value);
        const hour = parseInt(document.getElementById('bazi-hour')?.value);
        const minute = parseInt(document.getElementById('bazi-minute')?.value);
        const shichen = document.getElementById('bazi-shichen')?.value;
        const gender = document.querySelector('input[name="bazi-gender"]:checked')?.value;
        
        if (!name) {
            alert('请输入姓名');
            return;
        }
        
        // 计算八字
        const bazi = calculateBazi(year, month, day, hour);
        const wuxing = calculateWuxing(bazi);
        
        // 显示结果
        document.getElementById('bazi-result-name').textContent = `${name} · ${gender === 'male' ? '男' : '女'}命`;
        
        // 四柱展示
        const pillarsHtml = ['year', 'month', 'day', 'hour'].map(p => `
            <div class="pillar-item">
                <div class="pillar-label">${p === 'year' ? '年' : p === 'month' ? '月' : p === 'day' ? '日' : '时'}柱</div>
                <div class="pillar-value">${bazi[p].gan}</div>
                <div class="pillar-branch">${bazi[p].zhi}</div>
            </div>
        `).join('');
        document.getElementById('bazi-pillars').innerHTML = pillarsHtml;
        
        // 五行图表
        this.renderWuxingChart('wuxing-chart', 'wuxing-list', wuxing);
        
        // 八字强弱
        const strengthScore = Object.values(wuxing).reduce((a, b) => a + b, 0);
        const strengthText = strengthScore >= 8 ? '较强' : strengthScore <= 4 ? '较弱' : '中和';
        document.getElementById('bazi-strength').innerHTML = `
            <p>您的八字属于<strong>${WUXING[bazi.day.gan]}日主</strong>，命局五行${strengthText}。</p>
            <p>日主${WUXING[bazi.day.gan]}属性偏向${strengthText}，在处理事务时需要根据具体情况调整策略。</p>
        `;
        
        // 详细分析
        const detailHtml = `
            <div class="detail-item">
                <div class="detail-item-title">事业发展</div>
                <div class="detail-item-content">您的事业运势呈现出稳步上升的趋势。属${WUXING[bazi.day.gan]}属性的行业如林业、木材、教育等对您的发展较为有利。在团队合作中，您的领导能力能够得到充分发挥。</div>
            </div>
            <div class="detail-item">
                <div class="detail-item-title">感情姻缘</div>
                <div class="detail-item-content">您的感情运势较为平稳。${shichen ? `出生时辰为${shichen}，暗示您在感情中较为专一，但需要学会表达情感。` : '建议在感情中保持真诚和耐心。'}</div>
            </div>
            <div class="detail-item">
                <div class="detail-item-title">财运分析</div>
                <div class="detail-item-content">您的财运中等，适宜稳扎稳打。属${WUXING[bazi.day.gan]}的您适合从事与木相关的行业或项目。投资理财方面，建议分散风险，避免孤注一掷。</div>
            </div>
            <div class="detail-item">
                <div class="detail-item-title">健康运势</div>
                <div class="detail-item-content">健康方面需要多加注意${strengthScore >= 8 ? '肝胆系统和筋骨' : '泌尿系统和肾气'}。建议保持规律作息，适当运动。</div>
            </div>
        `;
        document.getElementById('detail-analysis').innerHTML = detailHtml;
        
        // 流年分析
        const currentYear = new Date().getFullYear();
        document.getElementById('liunian-analysis').innerHTML = `
            <div class="liunian-year">
                <span class="liunian-label">${currentYear}年</span>
                <span class="liunian-value">${getCurrentYearGanzhi()}</span>
            </div>
            <p>今年是${getCurrentYearGanzhi()}年，对于您命局中的${WUXING[bazi.day.gan]}属性来说，是一个需要稳扎稳打的一年。事业上有新的机遇，但需要付出更多努力才能获得回报。</p>
            <p style="margin-top: 10px;">感情方面，已婚者关系稳定，单身者有机会遇到心仪的对象。</p>
        `;
        
        // 转运建议
        document.getElementById('advice-content').innerHTML = `
            <ul>
                <li><strong>颜色建议：</strong>多穿着${this.getLuckyColors(wuxing)}等颜色的衣物，有助于增强运势。</li>
                <li><strong>方位建议：</strong>您的幸运方位在${this.getLuckyDirection(wuxing)}，有利活动可优先考虑这些方向。</li>
                <li><strong>数字建议：</strong>您的幸运数字是${this.getLuckyNumbers(wuxing).join('、')}，在重要决策时可多加参考。</li>
                <li><strong>行业建议：</strong>与${this.getLuckyIndustries(wuxing)}相关的行业对您的发展最为有利。</li>
                <li><strong>近期行动：</strong>建议在${['春季', '农历二月', '农历三月'][Math.floor(Math.random() * 3)]}积极行动，把握机遇。</li>
            </ul>
        `;
        
        // 显示结果区域
        document.querySelector('.input-section').style.display = 'none';
        document.getElementById('bazi-result').style.display = 'block';
    }
    
    getLuckyColors(wuxing) {
        const colors = [];
        const min = Math.min(...Object.values(wuxing));
        Object.entries(wuxing).forEach(([w, c]) => {
            if (c === min) {
                const map = { '木': '绿、青', '火': '红、紫', '土': '黄、棕', '金': '白、金', '水': '黑、蓝' };
                colors.push(map[w]);
            }
        });
        return colors.length ? colors.join('、') : '绿、红、黄';
    }
    
    getLuckyDirection(wuxing) {
        const max = Math.max(...Object.values(wuxing));
        const map = { '木': '东方、东南方', '火': '南方', '土': '中央、西南方', '金': '西方、西北方', '水': '北方' };
        const result = [];
        Object.entries(wuxing).forEach(([w, c]) => {
            if (c >= max - 1) result.push(map[w]);
        });
        return result.length ? result.join('、') : '东方';
    }
    
    getLuckyNumbers(wuxing) {
        const map = { '木': [3, 8], '火': [2, 7], '土': [5, 10], '金': [4, 9], '水': [1, 6] };
        const result = [];
        Object.entries(wuxing).forEach(([w, c]) => {
            if (c > 0) result.push(...map[w]);
        });
        return [...new Set(result)].slice(0, 4);
    }
    
    getLuckyIndustries(wuxing) {
        const map = { '木': '木材、教育、设计', '火': '能源、餐饮、娱乐', '土': '建筑、房地产、农业', '金': '金融、金属加工、法律', '水': '物流、运输、旅游' };
        const max = Math.max(...Object.values(wuxing));
        const result = [];
        Object.entries(wuxing).forEach(([w, c]) => {
            if (c >= max - 1) result.push(map[w]);
        });
        return result.length ? result.join('、') : '木材、教育';
    }
    
    // ========================================
    // 八字合婚
    // ========================================
    
    async calculateHehun() {
        const maleName = document.getElementById('hehun-male-name')?.value;
        const maleYear = parseInt(document.getElementById('hehun-male-year')?.value);
        const maleMonth = parseInt(document.getElementById('hehun-male-month')?.value);
        const maleDay = parseInt(document.getElementById('hehun-male-day')?.value);
        
        const femaleName = document.getElementById('hehun-female-name')?.value;
        const femaleYear = parseInt(document.getElementById('hehun-female-year')?.value);
        const femaleMonth = parseInt(document.getElementById('hehun-female-month')?.value);
        const femaleDay = parseInt(document.getElementById('hehun-female-day')?.value);
        
        if (!maleName || !femaleName) {
            alert('请输入双方姓名');
            return;
        }
        
        // 计算双方八字
        const maleBazi = calculateBazi(maleYear, maleMonth, maleDay, 12);
        const femaleBazi = calculateBazi(femaleYear, femaleMonth, femaleDay, 12);
        
        const maleShengxiao = getShengXiao(maleYear);
        const femaleShengxiao = getShengXiao(femaleYear);
        
        // 显示结果标题
        document.getElementById('hehun-result-title').textContent = `${maleName} 与 ${femaleName} 的合婚分析`;
        
        // 双方八字展示
        document.getElementById('hehun-bazi').innerHTML = `
            <div class="bazi-person">
                <div class="bazi-person-name">${maleName}（${maleShengxiao}）</div>
                <div>年柱：${maleBazi.year.gan}${maleBazi.year.zhi}</div>
                <div>月柱：${maleBazi.month.gan}${maleBazi.month.zhi}</div>
                <div>日柱：${maleBazi.day.gan}${maleBazi.day.zhi}</div>
                <div>时柱：${maleBazi.hour.gan}${maleBazi.hour.zhi}</div>
            </div>
            <div class="bazi-person">
                <div class="bazi-person-name">${femaleName}（${femaleShengxiao}）</div>
                <div>年柱：${femaleBazi.year.gan}${femaleBazi.year.zhi}</div>
                <div>月柱：${femaleBazi.month.gan}${femaleBazi.month.zhi}</div>
                <div>日柱：${femaleBazi.day.gan}${femaleBazi.day.zhi}</div>
                <div>时柱：${femaleBazi.hour.gan}${femaleBazi.hour.zhi}</div>
            </div>
        `;
        
        // 生肖配对分析
        const shengxiaoScore = this.getShengxiaoScore(maleShengxiao, femaleShengxiao);
        document.getElementById('hehun-shengxiao').innerHTML = `
            <p><strong>男方生肖：</strong>${maleShengxiao}</p>
            <p><strong>女方生肖：</strong>${femaleShengxiao}</p>
            <p style="margin-top: 10px;"><strong>配对评分：</strong>${shengxiaoScore}分</p>
            <p>${this.getShengxiaoAnalysis(maleShengxiao, femaleShengxiao)}</p>
        `;
        
        // 五行互补
        const maleWuxing = calculateWuxing(maleBazi);
        const femaleWuxing = calculateWuxing(femaleBazi);
        const combined = {};
        Object.keys(maleWuxing).forEach(w => {
            combined[w] = maleWuxing[w] + femaleWuxing[w];
        });
        
        document.getElementById('hehun-wuxing').innerHTML = `
            <p><strong>男方五行：</strong>木${maleWuxing['木']} 火${maleWuxing['火']} 土${maleWuxing['土']} 金${maleWuxing['金']} 水${maleWuxing['水']}</p>
            <p><strong>女方五行：</strong>木${femaleWuxing['木']} 火${femaleWuxing['火']} 土${femaleWuxing['土']} 金${femaleWuxing['金']} 水${femaleWuxing['水']}</p>
            <p style="margin-top: 10px;"><strong>互补分析：</strong>双方五行${this.getWuxingComplement(maleWuxing, femaleWuxing)}</p>
        `;
        
        // 日主关系
        const rizhuRelation = this.getRizhuRelation(maleBazi.day.gan, femaleBazi.day.gan);
        document.getElementById('hehun-rizhu').innerHTML = `
            <p><strong>男方日主：</strong>${maleBazi.day.gan}${WUXING[maleBazi.day.gan]}</p>
            <p><strong>女方日主：</strong>${femaleBazi.day.gan}${WUXING[femaleBazi.day.gan]}</p>
            <p style="margin-top: 10px;">${rizhuRelation}</p>
        `;
        
        // 矛盾与优势
        document.getElementById('hehun-conflict').innerHTML = `
            <div class="advantage-item">
                <div class="advantage-title">在一起的优势</div>
                <div class="advantage-content">${this.getHehunAdvantage(maleBazi, femaleBazi)}</div>
            </div>
            <div class="conflict-item">
                <div class="conflict-title">需要注意的矛盾</div>
                <div class="conflict-content">${this.getHehunConflict(maleBazi, femaleBazi)}</div>
            </div>
        `;
        
        // 流年分析
        const currentYear = new Date().getFullYear();
        document.getElementById('hehun-liunian').innerHTML = `
            <div class="liunian-year">
                <span class="liunian-label">${currentYear}年</span>
                <span class="liunian-value">${getCurrentYearGanzhi()}</span>
            </div>
            <div class="liunian-year">
                <span class="liunian-label">${currentYear + 1}年</span>
                <span class="liunian-value">${getCurrentYearGanzhi()}</span>
            </div>
            <p style="margin-top: 10px;">今年双方感情运势平稳，沟通顺畅。明年有结婚或同居的吉兆，如有此计划可积极推进。</p>
        `;
        
        // 合婚建议
        document.getElementById('hehun-advice').innerHTML = `
            <ul>
                <li>双方应相互理解包容，尊重彼此的性格差异。</li>
                <li>在财务问题上提前做好规划，避免因金钱产生矛盾。</li>
                <li>属${maleShengxiao}与属${femaleShengxiao}的组合，${this.getShengxiaoAdvice(maleShengxiao, femaleShengxiao)}</li>
                <li>选择${['春季', '夏季', '秋季', '冬季'][Math.floor(Math.random() * 4)]}举办婚礼或订婚，对双方运势更有助益。</li>
                <li>婚房宜选择朝${['东', '南', '西', '北'][Math.floor(Math.random() * 4)]}方向，布局简洁明亮。</li>
            </ul>
        `;
        
        document.querySelector('.input-section').style.display = 'none';
        document.getElementById('hehun-result').style.display = 'block';
    }
    
    getShengxiaoScore(sx1, sx2) {
        const good = ['鼠牛', '虎猪', '兔狗', '龙鸡', '蛇猴', '马羊'];
        const neutral = ['鼠龙', '牛蛇', '虎兔', '兔虎', '龙猴', '蛇鸡', '马狗', '羊猪'];
        const pair = [sx1 + sx2, sx2 + sx1];
        
        for (let p of good) {
            if (pair.includes(p)) return 85;
        }
        for (let p of neutral) {
            if (pair.includes(p)) return 70;
        }
        return 60;
    }
    
    getShengxiaoAnalysis(sx1, sx2) {
        const good = ['鼠牛', '虎猪', '兔狗', '龙鸡', '蛇猴', '马羊'];
        const pair = sx1 + sx2;
        if (good.includes(pair) || good.includes(sx2 + sx1)) {
            return '你们是上等婚配，生肖相生相助，感情基础稳固，婚后生活和谐美满。';
        }
        return '你们是中平婚配，需要双方共同努力经营感情，多沟通理解，婚后生活也能幸福美满。';
    }
    
    getWuxingComplement(w1, w2) {
        const missing = [];
        const excess = [];
        Object.entries(w1).forEach(([w, c]) => {
            const total = c + w2[w];
            if (total === 0) missing.push(w);
            if (total > 6) excess.push(w);
        });
        
        let result = '分布较为均衡，';
        if (missing.length) result += `缺少${missing.join('、')}，`;
        if (excess.length) result += `${excess.join('、')}较旺，`;
        result += '能够形成良好的互补关系。';
        return result;
    }
    
    getRizhuRelation(gan1, gan2) {
        const relations = {
            '甲乙': '木木比和，两人志同道合，共同进退',
            '丙丁': '火火比和，热情相投，但需注意控制情绪',
            '戊己': '土土比和，稳重务实，相处融洽',
            '庚辛': '金金比和，刚毅果断，需注意沟通方式',
            '壬癸': '水水比和，灵活变通，感情细腻',
            '甲丁': '木生火，一方付出较多，感情升温快',
            '乙丙': '木生火，另一方付出较多',
            '甲己': '木克土，一方主导，另一方配合',
            '庚乙': '金克木，需要相互包容'
        };
        return relations[gan1 + gan2] || relations[gan2 + gan1] || '两人关系需要磨合，但总体向好。';
    }
    
    getHehunAdvantage(male, female) {
        return '双方性格互补，男方稳重踏实，女方温柔体贴。在生活中能够相互扶持，共同进步。两人价值观相近，对家庭观念都很重视。';
    }
    
    getHehunConflict(male, female) {
        return '在处理问题的方式上可能存在差异，男方倾向于理性分析，女方更注重情感表达。建议双方多站在对方角度思考问题。';
    }
    
    getShengxiaoAdvice(sx1, sx2) {
        return '这是比较理想的婚配组合。日常生活中，多发挥各自优势，相互补足即可。遇到分歧时，心平气和地沟通最重要。';
    }
    
    // ========================================
    // 卦象占卜
    // ========================================
    
    async startGuaxiang() {
        const question = document.getElementById('guaxiang-question')?.value;
        const method = document.querySelector('input[name="guaxiang-method"]:checked')?.value;
        const animation = document.querySelector('input[name="guaxiang-animation"]:checked')?.value;
        
        if (!question) {
            alert('请输入您想问的事情');
            return;
        }
        
        // 显示动画区域
        document.querySelector('.input-section').style.display = 'none';
        document.getElementById('guaxiang-animation').style.display = 'block';
        
        const guaDisplay = document.getElementById('gua-symbol');
        guaDisplay.className = 'gua-display';
        
        // 添加动画类
        setTimeout(() => {
            switch(animation) {
                case 'rotate':
                    guaDisplay.classList.add('rotating');
                    break;
                case 'flip':
                    guaDisplay.classList.add('flipping');
                    break;
                case 'sparkle':
                    guaDisplay.classList.add('sparkle');
                    break;
                case 'fade':
                    guaDisplay.classList.add('fading');
                    break;
            }
        }, 100);
        
        // 动画文字变化
        const texts = ['心诚则灵...', '感应天地...', '八卦成形...', '即将揭晓...'];
        let textIndex = 0;
        this.animationTimer = setInterval(() => {
            document.getElementById('animation-text').textContent = texts[textIndex % texts.length];
            textIndex++;
        }, 1500);
        
        this.isAnimating = true;
    }
    
    async stopGuaxiang() {
        if (!this.isAnimating) return;
        
        this.isAnimating = false;
        clearInterval(this.animationTimer);
        
        // 停止动画
        const guaDisplay = document.getElementById('gua-symbol');
        guaDisplay.className = 'gua-display';
        
        await delay(500);
        
        // 生成卦象
        const gua = generateGua();
        const yao = generateLiuYao();
        
        // 隐藏动画，显示结果
        document.getElementById('guaxiang-animation').style.display = 'none';
        document.getElementById('guaxiang-result').style.display = 'block';
        
        // 显示问题
        document.getElementById('guaxiang-result-question').textContent = `关于：${document.getElementById('guaxiang-question').value}`;
        
        // 显示卦象
        document.getElementById('gua-visual').innerHTML = `
            <div class="gua-yao">
                ${yao.slice().reverse().map((y, i) => `
                    <div class="yao-line ${y ? '' : 'broken'}"></div>
                `).join('')}
            </div>
        `;
        
        document.getElementById('gua-name').textContent = gua.name + '卦';
        document.getElementById('gua-original').textContent = gua.symbol + ' ' + gua.guaci;
        
        // 爻辞详解
        const yaoHtml = yao.slice().reverse().map((y, i) => {
            const names = ['初爻', '二爻', '三爻', '四爻', '五爻', '上爻'];
            return `
                <div class="yao-item">
                    <div class="yao-header">
                        <span class="yao-name">${names[i]}</span>
                        <span class="yao-nature ${y ? 'yang' : 'yin'}">${y ? '阳' : '阴'}</span>
                    </div>
                    <div class="yao-text">${gua.yao[i]}</div>
                </div>
            `;
        }).join('');
        document.getElementById('guaxiang-yao').innerHTML = yaoHtml;
        
        // 卦辞
        document.getElementById('guaxiang-guaci').innerHTML = `
            <p><strong>卦辞：</strong>${gua.guaci}</p>
            <p style="margin-top: 10px;"><strong>解读：</strong>此卦象征${gua.name === '乾' ? '天' : gua.name === '坤' ? '地' : '万事万物'}运行之理。${this.getGuaInterpretation(gua.name)}</p>
        `;
        
        // 针对问题的回答
        document.getElementById('guaxiang-answer').innerHTML = `
            <p>根据您所问之事，结合${gua.name}卦的卦象分析：</p>
            <p style="margin-top: 10px;">此卦显示您目前正处于${Math.random() > 0.5 ? '蓄势待发' : '调整转型'}的阶段。建议您：</p>
            <ul>
                <li>保持${Math.random() > 0.5 ? '积极' : '稳健'}的心态，不要急于求成</li>
                <li>多听取${Math.random() > 0.5 ? '长辈' : '专业人士'}的意见</li>
                <li>把握${Math.random() > 0.5 ? '农历上半月的吉日' : '近期的好时机'}</li>
                <li>避免${Math.random() > 0.5 ? '盲目冒险' : '犹豫不决'}</li>
            </ul>
        `;
    }
    
    getGuaInterpretation(name) {
        const interpretations = {
            '乾': '象征刚健有力，万事亨通。启示人们要有自强不息的精神。',
            '坤': '象征柔顺包容，大地载物。启示人们要以厚德待人。',
            '震': '象征震动、惊雷，提醒人们面对变化要保持镇定。',
            '巽': '象征风、木，启示人们要顺时应势，灵活变通。',
            '坎': '象征水、险难，提醒人们要谨慎行事，克服困难。',
            '离': '象征火、光明，启示人们要光明磊落，照亮他人。',
            '艮': '象征山、停止，提醒人们要适可而止，稳扎稳打。',
            '兑': '象征泽、喜悦，启示人们要和悦待人，享受生活。'
        };
        return interpretations[name] || '启示人们要顺其自然，把握时机。';
    }
    
    // ========================================
    // 号码吉凶
    // ========================================
    
    async calculateHaoma() {
        const number = document.getElementById('haoma-number')?.value;
        
        if (!number || number.length !== 11) {
            alert('请输入11位手机号码');
            return;
        }
        
        // 显示结果
        document.querySelector('.input-section').style.display = 'none';
        document.getElementById('haoma-result').style.display = 'block';
        
        document.getElementById('haoma-result-number').textContent = number;
        
        // 数字展示
        document.getElementById('number-display').innerHTML = number.split('').map(d => 
            `<div class="number-digit">${d}</div>`
        ).join('');
        
        // 81数理分析
        const mathAnalysis = this.getMathAnalysis(number);
        document.getElementById('haoma-math').innerHTML = `
            <p><strong>81数理：</strong>${mathAnalysis.value}</p>
            <p style="margin-top: 10px;"><strong>解读：</strong>${mathAnalysis.description}</p>
        `;
        
        // 数字能量
        document.getElementById('energy-chart').innerHTML = this.getEnergyChart(number);
        document.getElementById('haoma-energy').innerHTML = `
            <p><strong>天枢星能量：</strong>${this.getStarEnergy(number, 0)}</p>
            <p><strong>北斗七星能量：</strong>${this.getStarEnergy(number, 1)}</p>
            <p style="margin-top: 10px;">数字能量反映号码对事业、感情、财运的影响程度。</p>
        `;
        
        // 五行分布
        this.renderWuxingChart('haoma-wuxing', null, this.getNumberWuxing(number));
        
        // 综合评分
        const scores = this.getNumberScores(number);
        document.getElementById('score-display').innerHTML = `
            <div class="score-circle" style="background: linear-gradient(135deg, ${scores.total >= 80 ? '#5c8a5c' : scores.total >= 60 ? '#c9a85c' : '#c45c5c'}, ${scores.total >= 80 ? '#7a9a7a' : scores.total >= 60 ? '#d9b86c' : '#d47c7c'});">
                <span class="score-value">${scores.total}</span>
                <span class="score-label">综合评分</span>
            </div>
        `;
        
        document.getElementById('score-details').innerHTML = `
            <div class="score-item">
                <div class="score-item-label">事业评分</div>
                <div class="score-item-value">${scores.career}</div>
            </div>
            <div class="score-item">
                <div class="score-item-label">感情评分</div>
                <div class="score-item-value">${scores.love}</div>
            </div>
            <div class="score-item">
                <div class="score-item-label">财运评分</div>
                <div class="score-item-value">${scores.wealth}</div>
            </div>
        `;
        
        // 改运建议
        document.getElementById('haoma-advice').innerHTML = `
            <ul>
                <li><strong>尾号建议：</strong>如需改运，可考虑使用尾号为${this.getLuckyTail(number)}的手机号码。</li>
                <li><strong>数字调和：</strong>多使用含有${Math.random() > 0.5 ? '3、8' : '2、7'}组合的数字，有助于增强运势。</li>
                <li><strong>使用时段：</strong>${Math.random() > 0.5 ? '上午9-11点' : '下午3-5点'}是使用此号码的最佳时段。</li>
                <li><strong>搭配建议：</strong>与属${['木', '火', '土', '金', '水'][Math.floor(Math.random() * 5)]}的手机壳搭配使用效果更佳。</li>
            </ul>
        `;
    }
    
    getMathAnalysis(number) {
        // 简化的81数理计算
        let sum = 0;
        for (let i = 0; i < number.length; i++) {
            sum += parseInt(number[i]) * (i + 1);
        }
        const value = (sum % 81) + 1;
        
        const meanings = {
            1: '万象更新，混沌初开，智慧勇气必达',
            2: '阴阳和合，生生不息，必获成功',
            3: '天时地利人和，百事亨通',
            4: '困难重重，须历艰辛方可得果',
            5: '阴阳交汇，机遇与挑战并存',
            21: '如日之升，如月之恒，大吉之数',
            24: '绵绣前程，门庭闹市，财源广进',
            28: '波涛汹涌，变化无穷，凶中藏吉',
            81: '最极之数，含宇宙无限之潜能'
        };
        
        return {
            value: value,
            description: meanings[value] || `${value}数，${value >= 40 ? '大吉' : value >= 20 ? '中吉' : value >= 10 ? '平' : '需谨慎'}` 
        };
    }
    
    getStarEnergy(number, type) {
        const energies = ['极强', '强', '中', '弱', '极弱'];
        const index = Math.abs(parseInt(number[type ? 3 : 0]) - 5) % 5;
        return energies[index];
    }
    
    getNumberWuxing(number) {
        const map = { '1': '木', '2': '木', '3': '火', '4': '火', '5': '土', '6': '土', '7': '金', '8': '金', '9': '水', '0': '水' };
        const counts = { '木': 0, '火': 0, '土': 0, '金': 0, '水': 0 };
        for (let d of number) {
            if (map[d]) counts[map[d]]++;
        }
        return counts;
    }
    
    getNumberScores(number) {
        // 简化评分
        const career = Math.floor(Math.random() * 30) + 60;
        const love = Math.floor(Math.random() * 30) + 60;
        const wealth = Math.floor(Math.random() * 30) + 60;
        return {
            career,
            love,
            wealth,
            total: Math.round((career + love + wealth) / 3)
        };
    }
    
    getLuckyTail(number) {
        const tails = ['0', '8', '6', '9', '3'];
        return tails[Math.floor(Math.random() * tails.length)];
    }
    
    // ========================================
    // 周公解梦
    // ========================================
    
    async calculateMeng() {
        const description = document.getElementById('meng-description')?.value;
        
        if (!description) {
            alert('请描述您的梦境');
            return;
        }
        
        // 显示结果
        document.querySelector('.input-section').style.display = 'none';
        document.getElementById('meng-result').style.display = 'block';
        
        // 解析梦境
        const interpretation = this.interpretDream(description);
        
        // 解释
        document.getElementById('meng-explanation').innerHTML = `
            <p><strong>梦境主题：</strong>${interpretation.theme}</p>
            <p style="margin-top: 10px;"><strong>象征意义：</strong>${interpretation.meaning}</p>
            <p style="margin-top: 10px;"><strong>详细解读：</strong>${interpretation.detail}</p>
        `;
        
        // 吉凶
        const luckLevel = interpretation.luck === '大吉' ? '大吉' : interpretation.luck === '吉' ? '吉利' : interpretation.luck === '中吉' ? '中吉' : interpretation.luck === '凶' ? '需注意' : '平';
        const luckIcon = interpretation.luck === '大吉' ? '🌟' : interpretation.luck === '吉' ? '✨' : interpretation.luck === '中吉' ? '🌙' : interpretation.luck === '凶' ? '⚠️' : '☯️';
        
        document.getElementById('luck-indicator').innerHTML = `
            <div class="luck-icon">${luckIcon}</div>
            <div class="luck-text">
                <div class="luck-level">${luckLevel}</div>
                <div class="luck-desc">${interpretation.luck === '大吉' ? '近期运势极佳，把握机遇' : interpretation.luck === '吉' ? '运势不错，稳步发展' : interpretation.luck === '中吉' ? '平稳过渡，谨慎行事' : interpretation.luck === '凶' ? '多加小心，避免风险' : '平常心对待'}</div>
            </div>
        `;
        
        // 综合分析
        document.getElementById('meng-analysis').innerHTML = `
            <p>从心理学的角度分析，您的梦境反映了${interpretation.psychology}。</p>
            <p style="margin-top: 10px;">从命理的角度来看，这个梦境与您近期${interpretation.relation}有关。</p>
        `;
        
        // 运势提示
        document.getElementById('meng-advice').innerHTML = `
            <ul>
                <li><strong>感情运势：</strong>${interpretation.luck === '大吉' || interpretation.luck === '吉' ? '近期感情顺利，单身者有望遇到心仪对象' : '感情上需要多沟通，避免误会'}</li>
                <li><strong>事业运势：</strong>${interpretation.luck === '大吉' || interpretation.luck === '吉' ? '事业上有突破机会，宜把握' : '事业上保持低调，稳扎稳打'}</li>
                <li><strong>健康运势：</strong>注意${Math.random() > 0.5 ? '作息规律，避免熬夜' : '饮食健康，少食辛辣'}</li>
                <li><strong>财运提示：</strong>${Math.random() > 0.5 ? '有意外收入的可能' : '宜守不宜攻，谨慎投资'}</li>
            </ul>
        `;
    }
    
    interpretDream(description) {
        const text = description.toLowerCase();
        
        // 查找匹配的关键词
        for (const [keyword, data] of Object.entries(DREAM_INTERPRETATIONS)) {
            if (text.includes(keyword)) {
                return {
                    theme: `梦见${keyword}`,
                    meaning: data.meaning,
                    detail: data.analysis,
                    luck: data.luck,
                    psychology: Math.random() > 0.5 ? '潜意识中对相关事物的期待或担忧' : '近期生活经历在梦中的反映',
                    relation: Math.random() > 0.5 ? '事业发展和财运走向' : '感情状态和家庭关系'
                };
            }
        }
        
        // 默认解读
        return {
            theme: '梦境解析',
            meaning: '梦境通常与近期经历和内心想法相关',
            detail: '您的梦境内容较为复杂，需要结合具体细节进一步分析。总体而言，梦境是潜意识的表达，建议您回顾近期生活，寻找与梦境相关的线索。',
            luck: '平',
            psychology: '近期经历和情绪在梦中的投射',
            relation: '整体运势变化'
        };
    }
    
    // ========================================
    // 术语解释
    // ========================================
    
    renderTerms(filter = '') {
        const termsList = document.getElementById('terms-list');
        if (!termsList) return;
        
        const filtered = filter 
            ? TERMS_DATA.filter(t => t.name.includes(filter) || t.brief.includes(filter))
            : TERMS_DATA;
        
        termsList.innerHTML = filtered.map(term => `
            <div class="term-item" onclick="app.showTermDetail('${term.name}')">
                <div class="term-name">${term.name}</div>
                <div class="term-brief">${term.brief}</div>
            </div>
        `).join('');
    }
    
    filterTerms(value) {
        this.renderTerms(value);
    }
    
    showTermDetail(name) {
        const term = TERMS_DATA.find(t => t.name === name);
        if (!term) return;
        
        document.querySelector('.terms-section').style.display = 'none';
        document.querySelector('.input-section').style.display = 'none';
        
        const detail = document.getElementById('term-detail');
        detail.style.display = 'block';
        
        document.getElementById('term-detail-title').textContent = term.name;
        document.getElementById('term-detail-content').innerHTML = term.content;
    }
    
    closeTermDetail() {
        document.getElementById('term-detail').style.display = 'none';
        document.querySelector('.terms-section').style.display = 'block';
        document.querySelector('.input-section').style.display = 'block';
    }
    
    // ========================================
    // 通用渲染函数
    // ========================================
    
    renderWuxingChart(chartId, listId, wuxing) {
        const chart = document.getElementById(chartId);
        if (!chart) return;
        
        const colors = {
            '木': '#6b8e6b',
            '火': '#c45c5c',
            '土': '#a0855c',
            '金': '#c9a85c',
            '水': '#5c7a8a'
        };
        
        const max = Math.max(...Object.values(wuxing));
        
        chart.innerHTML = Object.entries(wuxing).map(([w, c]) => `
            <div class="wuxing-bar">
                <div class="wuxing-height" style="height: ${max > 0 ? (c / max) * 70 : 10}px; background-color: ${colors[w]}; --wuxing-color: ${colors[w]};"></div>
                <div class="wuxing-name">${w}</div>
            </div>
        `).join('');
        
        if (listId) {
            const list = document.getElementById(listId);
            if (list) {
                list.innerHTML = Object.entries(wuxing).map(([w, c]) => 
                    `<span class="wuxing-tag ${c === 0 ? 'missing' : ''}">${w}×${c}</span>`
                ).join('');
            }
        }
    }
}

// 初始化应用
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new BaziApp();
});
