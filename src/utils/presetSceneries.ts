import { PresetScenery } from "../types/landscape";

export const PRESET_SCENERIES: PresetScenery[] = [
  {
    id: "zen-garden",
    title: "京都苔庭枯山水",
    location: "京都 · 大德寺瑞峯院",
    tag: "日式禪意庭園",
    imageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
    analysis: {
      overallScore: 94,
      landscapeStyle: "日式侘寂枯山水庭園",
      styleVibeEnglish: "Wabi-Sabi Zen Sanctuary",
      vibeKeywords: ["借景入室", "白砂如波", "松石共生", "靜謐深遠"],
      compositionTier: "國寶級名園意境 · 典範",
      colorPalette: [
        { hex: "#2E3D30", name: "幽篁墨綠", percentage: 42 },
        { hex: "#8A9484", name: "蒼苔石青", percentage: 28 },
        { hex: "#D6D1C4", name: "清溪暖白砂", percentage: 18 },
        { hex: "#5C4A3E", name: "老檜栗褐", percentage: 12 },
      ],
      dimensions: {
        compositionDepth: {
          score: 96,
          comment: "白砂為海、景石為島，前中後景層次如畫卷緩緩舒展，縱深感極其洗鍊。",
        },
        floraHarmony: {
          score: 92,
          comment: "古松姿態遒勁與地面厚實苔蘚相互映襯，修剪得宜，展現四季枯榮韻致。",
        },
        lightAndShadow: {
          score: 95,
          comment: "林蔭間灑落的光斑在白砂紋理上留下流動影子，光影節奏寧靜致遠。",
        },
        hardscapeStructure: {
          score: 97,
          comment: "三尊立石位置嚴謹遵循三才之道，收邊竹籬隔絕外界喧囂，形成封閉的冥想結界。",
        },
        seasonalAtmosphere: {
          score: 90,
          comment: "深青苔毯與白砂純度對比分明，秋有落葉點綴，冬有殘雪凝霜，季節感含蓄深厚。",
        },
        spatialBreathing: {
          score: 98,
          comment: "留白面積高達畫面四成以上，以虛代實，予人無限馳騁之意境。",
        },
      },
      sceneryElementsBreakdown: {
        foreground: {
          item: "梳理整齊的同心圓水波紋白砂地",
          assessment: "水紋梳理細緻無瑕，引導觀者視線由近及遠向主石推進。",
        },
        middleground: {
          item: "核心三尊景石與鋪底厚苔蘚坪",
          assessment: "石組高低倚伏，如仙島峙立於波濤之中，具有極強的視覺聚焦點。",
        },
        background: {
          item: "修剪整齊的黑松與木構回廊簷角",
          assessment: "以青松為屏障借天光，建築簷柱成為天然畫框，借景巧妙。",
        },
        lightingCondition: {
          condition: "斜射柔和晨光（明暗對比適度）",
          assessment: "漫射光線穿透樹冠，砂紋陰影立體而不生硬，襯托出青石溫潤質感。",
        },
        materialsAndPlants: {
          summary: "天然白川砂、古青石、日本黑松、杉苔",
          assessment: "材質純粹天然，杜絕人工塑料與生硬接縫，散發歲月沉澱之美。",
        },
      },
      keyHighlights: [
        "白砂波紋與青苔基座的乾濕、虛實對比達到極高審美境界",
        "石組聚散比例精準，視覺焦點集中且富有向心力",
        "以木構屋簷作為取景邊框，形成宛如壁畫般的框景效果",
      ],
      landscapeRedesignTips: [
        "可在右側中景竹籬下方暗藏一具低角度地底暖光燈，點亮夜間石影輪廓",
        "邊緣轉角可增設一座小巧的石燈籠或手水缽（蹲踞），強化動線轉折儀式感",
        "部分枯枝可維持極簡修剪，避免夏季枝葉過密遮擋天際線的留白通廊",
      ],
      recommendedPlantsAndElements: [
        {
          name: "織部石燈籠",
          category: "硬質景觀",
          placement: "中景側邊竹籬轉角處",
          benefit: "引導夜間視線，添增禪林幽玄之雅趣",
        },
        {
          name: "羽扇槭（紫葉楓）",
          category: "焦點喬木",
          placement: "後景借光處",
          benefit: "秋季引入一抹嫣紅，破除滿園長青的單一色彩",
        },
        {
          name: "自然碎石汀步",
          category: "動線鋪裝",
          placement: "緣側走廊接引處",
          benefit: "營造步移景異的沉浸漫步體驗",
        },
      ],
      quickDosAndDonts: {
        dos: [
          "每日清晨維持砂紋的梳理秩序，保持極致潔淨",
          "定期為苔蘚噴灑水霧，維繫其翠綠濕潤光澤",
          "保護周邊樹冠高度，維繫天空視野的通透留白",
        ],
        donts: [
          "避免在枯山水腹地堆放現代雜物或色彩雜亂的花卉盆栽",
          "不可使用直射高眩光強燈，破壞幽暗柔和的陰翳美學",
          "切忌過度修剪成幾何球狀灌木，應保留植物自然原生姿態",
        ],
      },
      hotspots: [
        {
          xPercent: 48,
          yPercent: 45,
          part: "核心主石組",
          title: "三尊仙島主石",
          comment: "景觀的靈魂重心，比例沉穩如岳，氣韻貫通中庭",
          type: "positive",
        },
        {
          xPercent: 30,
          yPercent: 78,
          part: "近景白砂波紋",
          title: "水意漣漪鋪面",
          comment: "砂紋規律舒展，成功營造出微風拂過水面的靈動意境",
          type: "positive",
        },
        {
          xPercent: 78,
          yPercent: 38,
          part: "右側借景側屏",
          title: "視覺過渡邊界",
          comment: "此處可增設低矮石燈籠或修剪微調，讓借景天際線更加開闊",
          type: "suggestion",
        },
        {
          xPercent: 55,
          yPercent: 22,
          part: "黑松樹冠輪廓",
          title: "綠意天幕借景",
          comment: "姿態蒼勁，枝條向中景俯身呼應，構成絕妙的遮頂平衡",
          type: "positive",
        },
      ],
      speechCritique:
        "這幅庭院的意境極其高雅，白砂波紋與蒼苔奇石達到了近乎完美的虛實對比。光影在砂石間流轉得寧靜悠遠。若在右側微轉角點綴一座低矮石燈籠，夜色降臨後的景深與空間呼吸感將更臻極致！",
    },
  },
  {
    id: "alpine-lake",
    title: "阿爾卑斯高山湖泊與針葉林",
    location: "瑞士 · 茵特拉肯布里恩茨湖",
    tag: "自然壯麗地景",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    analysis: {
      overallScore: 96,
      landscapeStyle: "壯闊高山湖泊自然地景",
      styleVibeEnglish: "Sublime Alpine Wilderness",
      vibeKeywords: ["水天一色", "針林倒影", "遠山重疊", "壯麗開朗"],
      compositionTier: "世界遺產級地景 · 壯闊大器",
      colorPalette: [
        { hex: "#1C3F4D", name: "冰磧翠湖藍", percentage: 45 },
        { hex: "#223B28", name: "冷杉松針綠", percentage: 28 },
        { hex: "#8DA5B2", name: "雲嶺嵐灰", percentage: 17 },
        { hex: "#DFE7EC", name: "冰川殘雪白", percentage: 10 },
      ],
      dimensions: {
        compositionDepth: {
          score: 98,
          comment: "從岸邊微波、挺拔落葉松中景，到巍峨雪山遠景，三段式空間透視無懈可擊。",
        },
        floraHarmony: {
          score: 94,
          comment: "原生冷杉與落葉松自然群落錯落有致，展現耐寒針葉林特有的挺拔節奏。",
        },
        lightAndShadow: {
          score: 97,
          comment: "清晨低角度陽光側切林冠，湖面反射如鏡，山巒倒影層次豐富清晰。",
        },
        hardscapeStructure: {
          score: 89,
          comment: "純天然未經人工斧鑿的冰川岩床與湖岸線，天然野趣與結構張力極強。",
        },
        seasonalAtmosphere: {
          score: 96,
          comment: "初秋冷暖交替，綠針中微透金黃，雪山冷調與晨光暖意形成醉人共鳴。",
        },
        spatialBreathing: {
          score: 99,
          comment: "遼闊湖面與天空提供了無垠的開放視野，完全沒有任何視覺壓迫感。",
        },
      },
      sceneryElementsBreakdown: {
        foreground: {
          item: "平靜如明鏡的碧綠湖面水波",
          assessment: "水質清澈透亮，前景倒映著天光與山體微影，極具沉靜吸睛效果。",
        },
        middleground: {
          item: "岸畔挺立的原生冷杉與松林岬角",
          assessment: "岬角由右側向中心斜向延伸，打破了水平地平線的呆板感。",
        },
        background: {
          item: "白雪覆頂的鋸齒狀阿爾卑斯連峰",
          assessment: "雄渾的山脊線構成了無可替代的宏大背景，震撼人心。",
        },
        lightingCondition: {
          condition: "清晨側逆光（高通透度）",
          assessment: "大氣透明度極高，水面蒸騰起淡淡晨嵐，增添如夢似幻的神聖感。",
        },
        materialsAndPlants: {
          summary: "天然湖水、冷杉群、冰磧花崗岩、高山草甸",
          assessment: "極致原生生態，各元素自成系統，展現大自然的磅礡造化。",
        },
      },
      keyHighlights: [
        "倒影與實景的對稱之美，呈現宛如油畫般的純粹質地",
        "右側松林岬角的三角構圖，完美引導視線通向遠方主峰",
        "湖水高純度的藍綠漸層，在視覺上帶來強烈的心靈撫慰感",
      ],
      landscapeRedesignTips: [
        "若作為景觀園區規劃，可於左下角近景設立木質觀景親水平台，增加人景互動",
        "岸邊可點綴低矮本地野花植被（如雪絨花或高山杜鵑），豐富地面的微觀色彩",
        "拍照取景時可稍微放低機位，讓水面漣漪在前景佔據更大比例，增強沉浸感",
      ],
      recommendedPlantsAndElements: [
        {
          name: "落葉松（金秋季相）",
          category: "焦點喬木",
          placement: "岬角前沿",
          benefit: "深秋金黃針葉將為純藍綠湖景注入戲劇性的溫暖色彩",
        },
        {
          name: "防腐原木觀景棧台",
          category: "生態設施",
          placement: "岸邊平緩處",
          benefit: "提供極佳的停留歇息點與倒影冥想視角",
        },
        {
          name: "本地高山禾草收邊",
          category: "地被修補",
          placement: "水陸交界處",
          benefit: "柔化碎石岸線，營造微風搖曳的動態韻律",
        },
      ],
      quickDosAndDonts: {
        dos: [
          "善用清晨風平浪靜的時刻捕捉無瑕倒影",
          "保持水平線的平直基準，呈現宏大平穩氣勢",
          "保留原生落葉松林的自然疏密，切勿整齊劃一栽植",
        ],
        donts: [
          "切忌沿岸興建突兀的金屬護欄或水泥硬質堤防",
          "避免在水域周圍投射高色溫刺眼冷光照明",
          "嚴禁引進外來強勢植物破壞高山脆弱水岸生態",
        ],
      },
      hotspots: [
        {
          xPercent: 50,
          yPercent: 32,
          part: "雪山遠景天際線",
          title: "主峰雪嶺借景",
          comment: "整幅構圖的視覺終點，輪廓如刀削斧刻，雄渾宏偉",
          type: "positive",
        },
        {
          xPercent: 78,
          yPercent: 55,
          part: "右側松林岬角",
          title: "綠意導引岬角",
          comment: "從右向左切入湖面，打破水平線單調，引導目光縱深移動",
          type: "positive",
        },
        {
          xPercent: 40,
          yPercent: 82,
          part: "湖面前景倒影",
          title: "澄澈如鏡倒影",
          comment: "水質透明度極高，倒影與天光交織出極佳的立體反射感",
          type: "positive",
        },
        {
          xPercent: 20,
          yPercent: 75,
          part: "左側湖岸邊界",
          title: "岸線過渡節點",
          comment: "可適度引入木質棧道或原生岩塊，增添近景立足點的豐富度",
          type: "suggestion",
        },
      ],
      speechCritique:
        "這處高山湖泊的大氣感令人心曠神怡！中景挺拔的針葉林岬角與遠方積雪連峰形成了雄渾的立體縱深。水面宛如一面澄澈的明鏡。如果在岸邊適度增添原生木質觀景視角，人與大自然的共鳴將更具詩意！",
    },
  },
  {
    id: "urban-balcony",
    title: "都會空中綠洲露台",
    location: "台北 · 信義區當代空中私園",
    tag: "現代都會庭園",
    imageUrl: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80",
    analysis: {
      overallScore: 88,
      landscapeStyle: "現代都會生機綠洲露台",
      styleVibeEnglish: "Modern Urban Biophilic Balcony",
      vibeKeywords: ["垂直綠化", "暖木地坪", "都市隱逸", "層次豐富"],
      compositionTier: "優雅精緻級 · 都會典範",
      colorPalette: [
        { hex: "#3A5A40", name: "龜背深翠", percentage: 40 },
        { hex: "#A3B18A", name: "橄欖初芽綠", percentage: 25 },
        { hex: "#B07D62", name: "暖陶焦糖褐", percentage: 20 },
        { hex: "#343A40", name: "鐵灰炭黑框架", percentage: 15 },
      ],
      dimensions: {
        compositionDepth: {
          score: 87,
          comment: "利用高低花架與垂吊植物拉開前後縱深，克服了都會露台空間受限的缺點。",
        },
        floraHarmony: {
          score: 91,
          comment: "闊葉龜背竹、虎尾蘭與垂蔓蕨類葉型豐富對比，綠意覆蓋率極佳。",
        },
        lightAndShadow: {
          score: 86,
          comment: "斜陽透過格柵打下條紋陰影，植物葉片透光感強烈，帶來溫馨的渡假感。",
        },
        hardscapeStructure: {
          score: 90,
          comment: "防腐溫潤木地拼與鐵灰色植栽槽交接細緻，家具選品風格統一俐落。",
        },
        seasonalAtmosphere: {
          score: 83,
          comment: "以常綠觀葉植物為主，四季穩定，但若能增添少量隨季開花的小品會更鮮活。",
        },
        spatialBreathing: {
          score: 85,
          comment: "留有舒適的雙人座椅活動動線，植物雖密但不顯逼仄雜亂。",
        },
      },
      sceneryElementsBreakdown: {
        foreground: {
          item: "暖木條紋拼板與低矮陶盆植栽",
          assessment: "地坪木質帶來腳底溫潤觸感，將室內客廳氛圍無縫延伸至戶外。",
        },
        middleground: {
          item: "舒適編織休閒椅與大葉片天堂鳥盆景",
          assessment: "主座位區與主景觀植物形成放鬆的私密綠色庇護所。",
        },
        background: {
          item: "玻璃欄杆外的城市天際線與藍天",
          assessment: "通透玻璃圍欄借城市天際線入景，綠葉與鋼筋水泥形成強烈美感對比。",
        },
        lightingCondition: {
          condition: "午後漫射暖光（附暖黃氛圍串燈）",
          assessment: "暖光烘托下綠葉顯得油亮健康，夜間串燈更能營造浪漫放鬆氣氛。",
        },
        materialsAndPlants: {
          summary: "柚木地坪、粗陶花器、耐候藤編椅、熱帶觀葉群",
          assessment: "材質親和耐候，兼顧都會美感與日常養護便利性。",
        },
      },
      keyHighlights: [
        "垂直立體綠化巧思，最大化利用了寸土寸金的都會陽台空間",
        "大葉與細葉植物的高低錯落，創造出宛如置身雨林般的沉浸感",
        "通透玻璃護欄無遮擋借景，讓都市景觀成為露台的動態背景牆",
      ],
      landscapeRedesignTips: [
        "可在花架頂部懸掛一盆波士頓蕨，進一步豐滿上方空間的垂墜感",
        "地坪轉角處可加入小型太陽能流水竹管（水景），引入潺潺水聲隔絕車流噪音",
        "增添 1-2 盆開花香草（如迷迭香、薰衣草），從視覺、嗅覺多感官提升體驗",
      ],
      recommendedPlantsAndElements: [
        {
          name: "小型循環流水缽",
          category: "微水景",
          placement: "露台東南角落",
          benefit: "水聲掩蓋城市喧囂，活化空間氣場與濕度",
        },
        {
          name: "垂葉榕 / 琴葉榕",
          category: "立體喬木",
          placement: "鄰舍隔斷側",
          benefit: "增強側向隱私遮蔽，強化垂直綠化天幕",
        },
        {
          name: "暖光防水磁吸軌道壁燈",
          category: "夜間氛圍照明",
          placement: "牆面格柵中段",
          benefit: "打亮葉脈陰影，打造夜間微醺酒吧質感",
        },
      ],
      quickDosAndDonts: {
        dos: [
          "選用排水透氣佳的輕量化陶粒與泥炭土，減輕陽台載重",
          "定期旋轉盆栽朝向，確保向陽面植物均衡生長",
          "設置隱藏式接水盤，維持地面乾燥整潔不生青苔水漬",
        ],
        donts: [
          "切忌全部使用同等高度的花盆，會顯得呆板無層次",
          "避免選用容易枯萎落葉且難以清理的大型落葉樹種",
          "嚴禁阻擋陽台緊急逃生動線與排水孔閘口",
        ],
      },
      hotspots: [
        {
          xPercent: 28,
          yPercent: 42,
          part: "大型天堂鳥葉叢",
          title: "綠洲核心主樹",
          comment: "葉形挺拔舒展，為露台注入濃厚的熱帶渡假私密感",
          type: "positive",
        },
        {
          xPercent: 70,
          yPercent: 55,
          part: "戶外休閒座椅區",
          title: "人本休憩焦點",
          comment: "位置配置妥善，與四周綠植形成舒適的被包圍感",
          type: "positive",
        },
        {
          xPercent: 85,
          yPercent: 28,
          part: "玻璃護欄天際線",
          title: "借景城市通廊",
          comment: "通透欄杆借景得宜，若上方增設垂懸植物可柔化建築硬角",
          type: "suggestion",
        },
        {
          xPercent: 45,
          yPercent: 88,
          part: "暖木地板地坪",
          title: "自然鋪裝材質",
          comment: "木紋條理細緻，巧妙消除戶外水泥地面的冰冷感",
          type: "positive",
        },
      ],
      speechCritique:
        "這座露台花園將都會空間轉化為令人驚豔的綠色庇護所！植物的高低層次錯落有致，木質地坪營造出滿滿的放鬆度假感。若在角落引入一處微型流水缽增添水聲律動，視覺與聽覺的享受將達到滿分！",
    },
  },
  {
    id: "english-cottage",
    title: "英倫自然鄉村庭院",
    location: "英國 · 科茲窩自然花園",
    tag: "歐式浪漫庭園",
    imageUrl: "https://images.unsplash.com/photo-1584467741663-1930c62b2704?auto=format&fit=crop&w=1200&q=80",
    analysis: {
      overallScore: 92,
      landscapeStyle: "英倫自然主義鄉村庭園",
      styleVibeEnglish: "English Romantic Cottage Garden",
      vibeKeywords: ["繁花漫野", "石徑蜿蜒", "色彩繽紛", "野趣盎然"],
      compositionTier: "傳奇典雅級 · 芬芳如詩",
      colorPalette: [
        { hex: "#4A6B48", name: "草甸碧草綠", percentage: 38 },
        { hex: "#C77D98", name: "古典洋薔薇粉", percentage: 26 },
        { hex: "#8E7DBE", name: "薰衣草暮紫", percentage: 20 },
        { hex: "#D4B483", name: "科茲窩蜜石金", percentage: 16 },
      ],
      dimensions: {
        compositionDepth: {
          score: 93,
          comment: "蜿蜒石徑由前景引領視線沒入花海深處，動線極富捉迷藏般的探索驚喜。",
        },
        floraHarmony: {
          score: 96,
          comment: "多年生宿根草本與攀緣薔薇自然穿插，高低交織，花期互補，生態豐富度滿分。",
        },
        lightAndShadow: {
          score: 91,
          comment: "斑駁碎石小徑上投射出花瓣與枝葉的細碎影子，隨風搖曳極具生命力。",
        },
        hardscapeStructure: {
          score: 88,
          comment: "老石板鋪地與鐵藝拱門經年歷練，天然石材與有機植物融為一體。",
        },
        seasonalAtmosphere: {
          score: 95,
          comment: "粉、紫、白、黃等自然花色如同調色盤融化於綠茵之中，浪漫氣息濃郁。",
        },
        spatialBreathing: {
          score: 87,
          comment: "花草茂密蓬勃，但石徑本身提供了恰當的透氣走廊，不至於令人窒息。",
        },
      },
      sceneryElementsBreakdown: {
        foreground: {
          item: "兩側溢出石徑邊緣的羽衣草與薰衣草",
          assessment: "柔化了步道生硬的水泥邊緣，給人親近採摘的親切感。",
        },
        middleground: {
          item: "高聳的毛地黃、飛燕草與英倫老玫瑰花灌木",
          assessment: "高度達到人體腰部至胸口，構築了豐富的立體色彩圍護牆。",
        },
        background: {
          item: "攀附著鐵線蓮的蜂蜜色石砌老農舍",
          assessment: "鄉村石屋作為天然背景，沈澱了整個花園的歷史歲月感。",
        },
        lightingCondition: {
          condition: "午後燦爛微風日光",
          assessment: "明媚的光線透射花瓣薄膜，展現出花卉天然晶瑩的色彩飽和度。",
        },
        materialsAndPlants: {
          summary: "老科茲窩石板、大馬士革玫瑰、飛燕草、貓薄荷、毛地黃",
          assessment: "純粹英式經典植物混植，層次豐富，野趣中見真章。",
        },
      },
      keyHighlights: [
        "花境的梯次配置堪稱教科書等級，由低到高自然過渡毫無人工刻意感",
        "蜿蜒的弧形步道創造出「曲徑通幽」的空間神秘感",
        "柔和的粉紫色系與蜜色石牆形成了極富溫度的英倫浪漫主調",
      ],
      landscapeRedesignTips: [
        "可在石徑轉彎處增設一張做舊鐵藝長椅，提供停留品味花香的儀式感坐標",
        "花境中段可穿插少許銀灰色葉植物（如綿毛水蘇），柔和鮮豔花色的對比",
        "設置一座天然石製鳥浴盆，為花園引入清脆鳥鳴與動態生機",
      ],
      recommendedPlantsAndElements: [
        {
          name: "鑄鐵拱門攀緣藤架",
          category: "立體構築物",
          placement: "步道中段交界處",
          benefit: "營造穿行花海隧道般的儀式感",
        },
        {
          name: "石雕鳥浴水缽",
          category: "微生態焦點",
          placement: "花叢核心開闊處",
          benefit: "吸引蜜蜂與鳴禽，為靜態花境注入蓬勃生機",
        },
        {
          name: "羽毛草（細莖針茅）",
          category: "觀賞草質感",
          placement: "花叢外圍邊界",
          benefit: "隨風起舞的輕盈絨羽質感，打破厚重花團",
        },
      ],
      quickDosAndDonts: {
        dos: [
          "鼓勵花草自然溢出路緣，營造漫溢鬆弛的野性浪漫",
          "定期摘除殘花（Deadheading），延長開花盛期",
          "選用蜜源植物，構築健康的授粉生態微氣候",
        ],
        donts: [
          "切忌以刀切般的筆直線條修剪花叢，破壞自然浪漫氣韻",
          "避免大面積使用生硬的塑膠花盆或幾何磁磚鋪面",
          "不可單一品種過度密集，應維持多物種共生混植",
        ],
      },
      hotspots: [
        {
          xPercent: 52,
          yPercent: 70,
          part: "蜿蜒石板小徑",
          title: "曲徑通幽石徑",
          comment: "路徑微曲向深處延伸，成功創造出步移景異的深邃空間感",
          type: "positive",
        },
        {
          xPercent: 26,
          yPercent: 50,
          part: "羽狀飛燕草花境",
          title: "垂直立體花塔",
          comment: "藍紫色高聳花穗如琴鍵般起伏，賦予花境極具節奏感的垂直張力",
          type: "positive",
        },
        {
          xPercent: 78,
          yPercent: 45,
          part: "中景轉折花叢",
          title: "景觀視線轉角",
          comment: "此處為視線關鍵轉折點，配置一張古典鐵藝長椅將大大提升停留體驗",
          type: "suggestion",
        },
        {
          xPercent: 60,
          yPercent: 22,
          part: "背景石牆老舍",
          title: "暖蜜石牆借景",
          comment: "古石質感厚重溫暖，作為繁花背景具有絕佳的收斂與襯托效果",
          type: "positive",
        },
      ],
      speechCritique:
        "這座英式鄉村庭園的色彩調和極富詩意！高低起伏的多年生花境與蜿蜒石徑自然交融，宛如一幅生機盎然的古典油畫。若在步道轉彎處安置一座雅緻的做舊長椅，駐足賞景的沉浸體驗將無可挑剔！",
    },
  },
];
