/**
 * 主形象的 appearanceIndex 值。
 * 所有判断主/子形象的逻辑必须引用此常量，禁止硬编码数字。
 * 子形象的 appearanceIndex 从 PRIMARY_APPEARANCE_INDEX + 1 开始递增。
 */
export const PRIMARY_APPEARANCE_INDEX = 0

// 比例配置（nanobanana 支持的所有比例，按常用程度排序）
export const ASPECT_RATIO_CONFIGS: Record<string, { label: string; isVertical: boolean }> = {
  '16:9': { label: '16:9', isVertical: false },
  '9:16': { label: '9:16', isVertical: true },
  '1:1': { label: '1:1', isVertical: false },
  '3:2': { label: '3:2', isVertical: false },
  '2:3': { label: '2:3', isVertical: true },
  '4:3': { label: '4:3', isVertical: false },
  '3:4': { label: '3:4', isVertical: true },
  '5:4': { label: '5:4', isVertical: false },
  '4:5': { label: '4:5', isVertical: true },
  '21:9': { label: '21:9', isVertical: false },
}

// 配置页面使用的选项列表（从 ASPECT_RATIO_CONFIGS 派生）
export const VIDEO_RATIOS = Object.entries(ASPECT_RATIO_CONFIGS).map(([value, config]) => ({
  value,
  label: config.label
}))

// 获取比例配置
export function getAspectRatioConfig(ratio: string) {
  return ASPECT_RATIO_CONFIGS[ratio] || ASPECT_RATIO_CONFIGS['16:9']
}

export const ANALYSIS_MODELS = [
  { value: 'google/gemini-3-pro-preview', label: 'Gemini 3 Pro', labelZh: 'Gemini 3 Pro', labelEn: 'Gemini 3 Pro', labelVi: 'Gemini 3 Pro' },
  { value: 'google/gemini-3-flash-preview', label: 'Gemini 3 Flash', labelZh: 'Gemini 3 Flash', labelEn: 'Gemini 3 Flash', labelVi: 'Gemini 3 Flash' },
  { value: 'anthropic/claude-sonnet-4.5', label: 'Claude Sonnet 4.5', labelZh: 'Claude Sonnet 4.5', labelEn: 'Claude Sonnet 4.5', labelVi: 'Claude Sonnet 4.5' },
  { value: 'anthropic/claude-sonnet-4', label: 'Claude Sonnet 4', labelZh: 'Claude Sonnet 4', labelEn: 'Claude Sonnet 4', labelVi: 'Claude Sonnet 4' }
]

export const IMAGE_MODELS = [
  { value: 'doubao-seedream-4-5-251128', label: 'Seedream 4.5', labelZh: 'Seedream 4.5', labelEn: 'Seedream 4.5', labelVi: 'Seedream 4.5' },
  { value: 'doubao-seedream-4-0-250828', label: 'Seedream 4.0', labelZh: 'Seedream 4.0', labelEn: 'Seedream 4.0', labelVi: 'Seedream 4.0' }
]

// 图像模型选项（ 生成完整图片）
export const IMAGE_MODEL_OPTIONS = [
  { value: 'banana', labelZh: 'Banana Pro (FAL)', labelEn: 'Banana Pro (FAL)', labelVi: 'Banana Pro (FAL)' },
  { value: 'banana-2', labelZh: 'Banana 2 (FAL)', labelEn: 'Banana 2 (FAL)', labelVi: 'Banana 2 (FAL)' },
  { value: 'gemini-3-pro-image-preview', labelZh: 'Banana (Google)', labelEn: 'Banana (Google)', labelVi: 'Banana (Google)' },
  { value: 'gemini-3-pro-image-preview-batch', labelZh: 'Banana (Google Batch) 省50%', labelEn: 'Banana (Google Batch) Save 50%', labelVi: 'Banana (Google Batch) Tiết kiệm 50%' },
  { value: 'doubao-seedream-4-0-250828', labelZh: 'Seedream 4.0', labelEn: 'Seedream 4.0', labelVi: 'Seedream 4.0' },
  { value: 'doubao-seedream-4-5-251128', labelZh: 'Seedream 4.5', labelEn: 'Seedream 4.5', labelVi: 'Seedream 4.5' },
  { value: 'imagen-4.0-generate-001', labelZh: 'Imagen 4.0 (Google)', labelEn: 'Imagen 4.0 (Google)', labelVi: 'Imagen 4.0 (Google)' },
  { value: 'imagen-4.0-ultra-generate-001', labelZh: 'Imagen 4.0 Ultra', labelEn: 'Imagen 4.0 Ultra', labelVi: 'Imagen 4.0 Ultra' },
  { value: 'imagen-4.0-fast-generate-001', labelZh: 'Imagen 4.0 Fast', labelEn: 'Imagen 4.0 Fast', labelVi: 'Imagen 4.0 Fast' }
]

// Banana 模型分辨率选项（仅用于九宫格分镜图，单张生成固定2K）
export const BANANA_RESOLUTION_OPTIONS = [
  { value: '2K', labelZh: '2K (推荐，快速)', labelEn: '2K (Recommended, Fast)', labelVi: '2K (Khuyên dùng, Nhanh)' },
  { value: '4K', labelZh: '4K (高清，较慢)', labelEn: '4K (HD, Slow)', labelVi: '4K (HD, Chậm)' }
]

// 支持分辨率选择的 Banana 模型
export const BANANA_MODELS = ['banana', 'banana-2', 'gemini-3-pro-image-preview', 'gemini-3-pro-image-preview-batch']

export const VIDEO_MODELS = [
  { value: 'doubao-seedance-1-0-pro-fast-251015', labelZh: 'Seedance 1.0 Pro Fast', labelEn: 'Seedance 1.0 Pro Fast', labelVi: 'Seedance 1.0 Pro Fast' },
  { value: 'doubao-seedance-1-0-pro-fast-251015-batch', labelZh: 'Seedance 1.0 Pro Fast (批量) 省50%', labelEn: 'Seedance 1.0 Pro Fast (Batch) Save 50%', labelVi: 'Seedance 1.0 Pro Fast (Hàng loạt) Tiết kiệm 50%' },
  { value: 'doubao-seedance-1-0-lite-i2v-250428', labelZh: 'Seedance 1.0 Lite', labelEn: 'Seedance 1.0 Lite', labelVi: 'Seedance 1.0 Lite' },
  { value: 'doubao-seedance-1-0-lite-i2v-250428-batch', labelZh: 'Seedance 1.0 Lite (批量) 省50%', labelEn: 'Seedance 1.0 Lite (Batch) Save 50%', labelVi: 'Seedance 1.0 Lite (Hàng loạt) Tiết kiệm 50%' },
  { value: 'doubao-seedance-1-5-pro-251215', labelZh: 'Seedance 1.5 Pro', labelEn: 'Seedance 1.5 Pro', labelVi: 'Seedance 1.5 Pro' },
  { value: 'doubao-seedance-1-5-pro-251215-batch', labelZh: 'Seedance 1.5 Pro (批量) 省50%', labelEn: 'Seedance 1.5 Pro (Batch) Save 50%', labelVi: 'Seedance 1.5 Pro (Hàng loạt) Tiết kiệm 50%' },
  { value: 'doubao-seedance-1-0-pro-250528', labelZh: 'Seedance 1.0 Pro', labelEn: 'Seedance 1.0 Pro', labelVi: 'Seedance 1.0 Pro' },
  { value: 'doubao-seedance-1-0-pro-250528-batch', labelZh: 'Seedance 1.0 Pro (批量) 省50%', labelEn: 'Seedance 1.0 Pro (Batch) Save 50%', labelVi: 'Seedance 1.0 Pro (Hàng loạt) Tiết kiệm 50%' },
  { value: 'fal-wan25', labelZh: 'Wan 2.6', labelEn: 'Wan 2.6', labelVi: 'Wan 2.6' },
  { value: 'fal-veo31', labelZh: 'Veo 3.1 Fast', labelEn: 'Veo 3.1 Fast', labelVi: 'Veo 3.1 Fast' },
  { value: 'fal-sora2', labelZh: 'Sora 2', labelEn: 'Sora 2', labelVi: 'Sora 2' },
  { value: 'fal-ai/kling-video/v2.5-turbo/pro/image-to-video', labelZh: 'Kling 2.5 Turbo Pro', labelEn: 'Kling 2.5 Turbo Pro', labelVi: 'Kling 2.5 Turbo Pro' },
  { value: 'fal-ai/kling-video/v3/standard/image-to-video', labelZh: 'Kling 3 Standard', labelEn: 'Kling 3 Standard', labelVi: 'Kling 3 Standard' },
  { value: 'fal-ai/kling-video/v3/pro/image-to-video', labelZh: 'Kling 3 Pro', labelEn: 'Kling 3 Pro', labelVi: 'Kling 3 Pro' }
]

// SeeDream 批量模型列表（使用 GPU 空闲时间，成本降低50%）
export const SEEDANCE_BATCH_MODELS = [
  'doubao-seedance-1-5-pro-251215-batch',
  'doubao-seedance-1-0-pro-250528-batch',
  'doubao-seedance-1-0-pro-fast-251015-batch',
  'doubao-seedance-1-0-lite-i2v-250428-batch',
]

// 支持生成音频的模型（仅 Seedance 1.5 Pro 支持，包含批量版本）
export const AUDIO_SUPPORTED_MODELS = ['doubao-seedance-1-5-pro-251215', 'doubao-seedance-1-5-pro-251215-batch']

// 首尾帧视频模型（能力权威来源是 standards/capabilities；此常量仅作静态兜底展示）
export const FIRST_LAST_FRAME_MODELS = [
  { value: 'doubao-seedance-1-5-pro-251215', labelZh: 'Seedance 1.5 Pro (首尾帧)', labelEn: 'Seedance 1.5 Pro (I/O Frames)', labelVi: 'Seedance 1.5 Pro (Khung đầu/cuối)' },
  { value: 'doubao-seedance-1-5-pro-251215-batch', labelZh: 'Seedance 1.5 Pro (首尾帧/批量) 省50%', labelEn: 'Seedance 1.5 Pro (I/O Frames/Batch) Save 50%', labelVi: 'Seedance 1.5 Pro (Khung đầu/cuối/Hàng loạt) Tiết kiệm 50%' },
  { value: 'doubao-seedance-1-0-pro-250528', labelZh: 'Seedance 1.0 Pro (首尾帧)', labelEn: 'Seedance 1.0 Pro (I/O Frames)', labelVi: 'Seedance 1.0 Pro (Khung đầu/cuối)' },
  { value: 'doubao-seedance-1-0-pro-250528-batch', labelZh: 'Seedance 1.0 Pro (首尾帧/批量) 省50%', labelEn: 'Seedance 1.0 Pro (I/O Frames/Batch) Save 50%', labelVi: 'Seedance 1.0 Pro (Khung đầu/cuối/Hàng loạt) Tiết kiệm 50%' },
  { value: 'doubao-seedance-1-0-lite-i2v-250428', labelZh: 'Seedance 1.0 Lite (首尾帧)', labelEn: 'Seedance 1.0 Lite (I/O Frames)', labelVi: 'Seedance 1.0 Lite (Khung đầu/cuối)' },
  { value: 'doubao-seedance-1-0-lite-i2v-250428-batch', labelZh: 'Seedance 1.0 Lite (首尾帧/批量) 省50%', labelEn: 'Seedance 1.0 Lite (I/O Frames/Batch) Save 50%', labelVi: 'Seedance 1.0 Lite (Khung đầu/cuối/Hàng loạt) Tiết kiệm 50%' },
  { value: 'veo-3.1-generate-preview', labelZh: 'Veo 3.1 (首尾帧)', labelEn: 'Veo 3.1 (I/O Frames)', labelVi: 'Veo 3.1 (Khung đầu/cuối)' },
  { value: 'veo-3.1-fast-generate-preview', labelZh: 'Veo 3.1 Fast (首尾帧)', labelEn: 'Veo 3.1 Fast (I/O Frames)', labelVi: 'Veo 3.1 Fast (Khung đầu/cuối)' }
]

export const VIDEO_RESOLUTIONS = [
  { value: '720p', labelZh: '720p', labelEn: '720p', labelVi: '720p' },
  { value: '1080p', labelZh: '1080p', labelEn: '1080p', labelVi: '1080p' }
]

export const TTS_RATES = [
  { value: '+0%', labelZh: '正常速度 (1.0x)', labelEn: 'Normal (1.0x)', labelVi: 'Bình thường (1.0x)' },
  { value: '+20%', labelZh: '轻微加速 (1.2x)', labelEn: 'Slightly Fast (1.2x)', labelVi: 'Hơi nhanh (1.2x)' },
  { value: '+50%', labelZh: '加速 (1.5x)', labelEn: 'Fast (1.5x)', labelVi: 'Nhanh (1.5x)' },
  { value: '+100%', labelZh: '快速 (2.0x)', labelEn: 'Very Fast (2.0x)', labelVi: 'Rất nhanh (2.0x)' }
]

export const TTS_VOICES = [
  { value: 'zh-CN-YunxiNeural', labelZh: '云希 (男声)', labelEn: 'Yunxi (Male)', labelVi: 'Vân Hy (Nam)', preview: '男' },
  { value: 'zh-CN-XiaoxiaoNeural', labelZh: '晓晓 (女声)', labelEn: 'Xiaoxiao (Female)', labelVi: 'Hiểu Hiểu (Nữ)', preview: '女' },
  { value: 'zh-CN-YunyangNeural', labelZh: '云扬 (男声)', labelEn: 'Yunyang (Male)', labelVi: 'Vân Dương (Nam)', preview: '男' },
  { value: 'zh-CN-XiaoyiNeural', labelZh: '晓伊 (女声)', labelEn: 'Xiaoyi (Female)', labelVi: 'Hiểu Y (Nữ)', preview: '女' }
]

export interface ArtStyle {
  value: string
  labelZh: string
  labelEn: string
  labelVi: string
  preview: string
  promptZh: string
  promptEn: string
  promptVi: string
}

export const ART_STYLES: ArtStyle[] = [
  {
    value: 'american-comic',
    labelZh: '漫画风',
    labelEn: 'American Comic',
    labelVi: 'Phong cách Mỹ',
    preview: '漫',
    promptZh: '日式动漫风格',
    promptEn: 'Japanese anime style',
    promptVi: 'Phong cách anime Nhật Bản'
  },
  {
    value: 'chinese-comic',
    labelZh: '精致国漫',
    labelEn: 'Chinese Comic',
    labelVi: 'Truyện tranh TQ',
    preview: '国',
    promptZh: '现代高质量漫画风格，动漫风格，细节丰富精致，线条锐利干净，质感饱满，超清，干净的画面风格，2D风格，动漫风格。',
    promptEn: 'Modern premium Chinese comic style, rich details, clean sharp line art, full texture, ultra-clear 2D anime aesthetics.',
    promptVi: 'Phong cách truyện tranh Trung Quốc hiện đại cao cấp, chi tiết phong phú, nghệ thuật đường nét sắc sảo sạch sẽ, kết cấu đầy đủ, thẩm mỹ anime 2D siêu rõ nét.'
  },
  {
    value: 'japanese-anime',
    labelZh: '日系动漫风',
    labelEn: 'Japanese Anime',
    labelVi: 'Anime Nhật',
    preview: '日',
    promptZh: '现代日系动漫风格，赛璐璐上色，清晰干净的线条，视觉小说CG感。高质量2D风格',
    promptEn: 'Modern Japanese anime style, cel shading, clean line art, visual-novel CG look, high-quality 2D style.',
    promptVi: 'Phong cách anime Nhật Bản hiện đại, đổ bóng cel, nghệ thuật đường nét sạch sẽ, giao diện CG tiểu thuyết trực quan, phong cách 2D chất lượng cao.'
  },
  {
    value: 'realistic',
    labelZh: '真人风格',
    labelEn: 'Realistic',
    labelVi: 'Ảnh thật',
    preview: '实',
    promptZh: '真实电影级画面质感，真实现实场景，色彩饱满通透，画面干净精致，真实感',
    promptEn: 'Realistic cinematic look, real-world scene fidelity, rich transparent colors, clean and refined image quality.',
    promptVi: 'Giao diện điện ảnh thực tế, độ trung thực của cảnh thế giới thực, màu sắc trong suốt phong phú, chất lượng hình ảnh sạch sẽ và tinh tế.'
  }
]

/**
 * 🔥 实时从 ART_STYLES 常量获取风格 prompt
 * 这是获取风格 prompt 的唯一正确方式，确保始终使用最新的常量定义
 * 
 * @param artStyle - 风格标识符，如 'realistic', 'american-comic' 等
 * @returns 对应的风格 prompt，如果找不到则返回空字符串
 */
export function getArtStylePrompt(
  artStyle: string | null | undefined,
  locale: 'zh' | 'en' | 'vi',
): string {
  if (!artStyle) return ''
  const style = ART_STYLES.find(s => s.value === artStyle)
  if (!style) return ''
  console.log("promptVi", locale, style.promptVi)
  if (locale === 'en') return style.promptEn
  if (locale === 'vi') return style.promptVi || style.promptEn
  return style.promptZh
}

/**
 * 获取风格 label
 */
export function getArtStyleLabel(
  artStyle: string | null | undefined,
  locale: 'zh' | 'en' | 'vi',
): string {
  if (!artStyle) return ''
  const style = ART_STYLES.find(s => s.value === artStyle)
  if (!style) return artStyle || ''
  if (locale === 'en') return style.labelEn
  if (locale === 'vi') return style.labelVi || style.labelEn
  return style.labelZh
}

/**
 * 获取通用 label
 */
export function getLocalizedLabel(
  option: any,
  locale: 'zh' | 'en' | 'vi',
): string {
  if (!option) return ''
  if (locale === 'en') return option.labelEn || option.label || ''
  if (locale === 'vi') return option.labelVi || option.labelEn || option.label || ''
  return option.labelZh || option.label || ''
}

// 角色形象生成的系统后缀（始终添加到提示词末尾，不显示给用户）- 左侧面部特写+右侧三视图
export const CHARACTER_PROMPT_SUFFIX = '角色设定图，画面分为左右两个区域：【左侧区域】占约1/3宽度，是角色的正面特写（如果是人类则展示完整正脸，如果是动物/生物则展示最具辨识度的正面形态）；【右侧区域】占约2/3宽度，是角色三视图横向排列（从左到右依次为：正面全身、侧面全身、背面全身），三视图高度一致。纯白色背景，无其他元素。'

// 场景图片生成的系统后缀（已禁用四视图，直接生成单张场景图）
export const LOCATION_PROMPT_SUFFIX = ''

// 角色图片生成比例（16:9横版，左侧面部特写+右侧全身）
export const CHARACTER_IMAGE_RATIO = '16:9'
// 角色图片尺寸（用于Seedream API）
export const CHARACTER_IMAGE_SIZE = '3840x2160'  // 16:9 横版
// 角色图片尺寸（用于Banana API）
export const CHARACTER_IMAGE_BANANA_RATIO = '3:2'

// 场景图片生成比例（1:1 正方形单张场景）
export const LOCATION_IMAGE_RATIO = '1:1'
// 场景图片尺寸（用于Seedream API）- 4K
export const LOCATION_IMAGE_SIZE = '4096x4096'  // 1:1 正方形 4K
// 场景图片尺寸（用于Banana API）
export const LOCATION_IMAGE_BANANA_RATIO = '1:1'

// 从提示词中移除角色系统后缀（用于显示给用户）
export function removeCharacterPromptSuffix(prompt: string): string {
  if (!prompt) return ''
  return prompt.replace(CHARACTER_PROMPT_SUFFIX, '').trim()
}

// 添加角色系统后缀到提示词（用于生成图片）
export function addCharacterPromptSuffix(prompt: string): string {
  if (!prompt) return CHARACTER_PROMPT_SUFFIX
  const cleanPrompt = removeCharacterPromptSuffix(prompt)
  return `${cleanPrompt}${cleanPrompt ? '，' : ''}${CHARACTER_PROMPT_SUFFIX}`
}

// 从提示词中移除场景系统后缀（用于显示给用户）
export function removeLocationPromptSuffix(prompt: string): string {
  if (!prompt) return ''
  return prompt.replace(LOCATION_PROMPT_SUFFIX, '').replace(/，$/, '').trim()
}

// 添加场景系统后缀到提示词（用于生成图片）
export function addLocationPromptSuffix(prompt: string): string {
  // 后缀为空时直接返回原提示词
  if (!LOCATION_PROMPT_SUFFIX) return prompt || ''
  if (!prompt) return LOCATION_PROMPT_SUFFIX
  const cleanPrompt = removeLocationPromptSuffix(prompt)
  return `${cleanPrompt}${cleanPrompt ? '，' : ''}${LOCATION_PROMPT_SUFFIX}`
}

/**
 * 构建角色介绍字符串（用于发送给 AI，帮助理解"我"和称呼对应的角色）
 * @param characters - 角色列表，需要包含 name 和 introduction 字段
 * @returns 格式化的角色介绍字符串
 */
export function buildCharactersIntroduction(characters: Array<{ name: string; introduction?: string | null }>): string {
  if (!characters || characters.length === 0) return '暂无角色介绍'

  const introductions = characters
    .filter(c => c.introduction && c.introduction.trim())
    .map(c => `- ${c.name}：${c.introduction}`)

  if (introductions.length === 0) return '暂无角色介绍'

  return introductions.join('\n')
}
