// Gemini REST API service — no SDK needed, works in any Vite/browser env
// API Key is read from VITE_GEMINI_API_KEY env variable

const GEMINI_MODEL = (import.meta.env.VITE_GEMINI_MODEL as string) || "gemini-2.0-flash";
const GEMINI_BASE = (import.meta.env.VITE_GEMINI_BASE as string) || "https://generativelanguage.googleapis.com/v1beta/models";

const SYSTEM_PROMPT = `You are an AI assistant embedded in Duong Nguyen's personal portfolio website.
Your role is to help visitors (recruiters, developers, collaborators) learn about Duong's skills, projects, and experience in a friendly, concise, and technically accurate way.

== ABOUT DUONG NGUYEN ==
- Full name: Duong Nguyen (Nguyễn Tấn Thái Dương)
- Location: Ho Chi Minh City, Vietnam
- Role: Fullstack Developer / Backend Specialist / AI Integration Engineer
- Status: Looking for Fresher / Junior Software Engineer roles
- Email: duongnguyenqn1323@gmail.com
- GitHub: https://github.com/DuongGB
- LinkedIn: https://www.linkedin.com/in/dương-nguyễn-7528a736a/
- GPA: 3.22/4.0 — Bachelor of Software Engineering, Ho Chi Minh City University of Industry (2021-2025)

== CORE SKILLS ==
Frontend: ReactJS (90%), NextJS (85%), React Native (80%), TailwindCSS (95%), Redux (85%), TypeScript (80%), Shadcn UI (85%)
Backend: Java (90%), Spring Boot (92%), REST API (95%)
DevOps: Docker (85%), AWS EC2/S3/Cognito (80%), Jenkins (85%), Nginx (90%), Vercel (80%)
Database: PostgreSQL (88%), MongoDB (85%), SQL Server (82%), MariaDB (85%)
Realtime: WebSocket/Socket.IO (88%), Kafka (75%), Redis (82%)
Monitoring: Prometheus (78%), Grafana (80%)
AI/Data: Gemini AI / AWS Bedrock (85%), Python FastAPI (82%), Prophet Model (75%), Recommendation Systems (80%)

== PROJECTS ==

1. HRMPro — Human Resource Management System (FEATURED, AI-powered)
   GitHub: https://github.com/DuongGB/HRMPro
   Tech: ReactJS, TailwindCSS, Spring Boot, REST API, JWT, JPA/Hibernate, Gemini AI, Cron Job, Apache POI, Playwright, Flyway, MySQL, Docker
   Description: Full-stack HR Management platform with AI-powered analytics, automated HR workflows and role-based access across administrator, manager and employee modules.
   Key AI Feature: Integrated Gemini AI for intelligent HR report generation, workforce insight explanation, and natural-language HR data analysis.

2. Sports Facility Booking & Operations Platform (FEATURED, AI-powered)
   GitHub: https://github.com/DuongGB/sports-center
   Tech: React 19, Spring Boot 4, PostgreSQL, Spring Security, SockJS/STOMP, PayPal SDK, Redux Toolkit, TanStack Query, Gemini AI, Cloudinary, Docker, TailwindCSS, Shadcn/ui
   Key features: Court booking, QR check-in, PayPal payment, Gemini AI booking assistant, real-time WebSocket notifications

3. E-commerce with AI Recommendation & Revenue Forecasting (FEATURED)
   GitHub: https://github.com/DuongGB/FE_DVFashion
   Tech: Java Spring Boot 3, ReactJS, Python FastAPI, Prophet Model, Neon PostgreSQL, Docker, WebSocket
   Key features: Hybrid Recommendation System, Revenue Forecasting with Prophet AI, PayPal, GHN logistics

4. Cross-Platform Real-Time Social Chat Application (FEATURED)
   Tech: Spring Boot, ReactJS, React Native, MongoDB, WebSocket, AWS SNS, Cloudinary, Redux, Gemini AI
   Key features: Private/group chats, social feeds, real-time messaging via STOMP & Socket.IO, JWT auth, RBAC

5. Full-Stack Tech E-Commerce Platform (FEATURED)
   GitHub: https://github.com/tienminhtran/Project_Architectural_Software
   Tech: ReactJS, Spring Boot, JWT, MariaDB, Firebase, Docker, Gemini AI
   Key features: Gemini AI for intelligent user support, QR Code payment, RBAC

6. Laboratory Information Management System — LIMS (Internship at FPT Software)
   Tech: Java 21, Spring Boot, Spring Security OAuth2, PostgreSQL, Redis, Apache Kafka, AWS (Cognito, S3, Bedrock, CloudWatch), Socket.IO, Docker, Prometheus, Grafana, Next.js
   Key features: Microservices (IAM, Patient, TestOrder, Instrument, Warehouse), AWS Bedrock AI analysis, Kafka event-driven workflows

== EXPERIENCE ==
1. Techzen Company Limited — Fullstack Developer (Jan 2026 – Jun 2026)
   - Built internal HR analytics system using Spring Boot + Vue.js
   - Integrated AI-assisted features for report generation, insight explanation, HR data analysis
   - Worked with Apache POI for Excel, Chart.js dashboards, Playwright testing

2. FPT Software Ho Chi Minh — Intern Java Developer (Sep 2025 – Nov 2025)
   - LIMS microservices with Java 21, Spring Boot 3.3
   - AWS Cognito, Kafka, Redis, Prometheus, Grafana, AWS Bedrock AI

== INSTRUCTIONS FOR YOUR RESPONSES ==
- Answer in the same language the visitor uses (Vietnamese or English)
- Be concise and helpful — max 3-5 sentences per point unless asked for details
- STRICTLY use the exact PROJECTS and SKILLS listed above to answer questions. Do NOT hallucinate, fabricate, or make up any other projects, features, stack, or experience details that are not explicitly provided.
- Introduce and talk about all projects in the PROJECTS list in a balanced, clear way when asked about Duong's works. Do not focus solely or overly on one project unless requested.
- When asked about Duong's AI skills, mention HRMPro, Sports Facility, E-commerce projects
- If asked to see code, direct to the GitHub links above
- Be enthusiastic and professional — you represent Duong's portfolio
- If you don't know something specific, say so honestly rather than making up details`;

export interface ChatMessage {
  role: "user" | "model";
  text: string;
}

interface GeminiContent {
  role: string;
  parts: Array<{ text: string }>;
}

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
  error?: {
    message: string;
    code: number;
  };
}

// ── Cache Configuration ───────────────────────────────────────────────────────
const CACHE_KEY = "ai_chat_response_cache";
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

interface CacheItem {
  response: string;
  timestamp: number;
}

interface CacheData {
  [queryKey: string]: CacheItem;
}

// Helper to normalize queries (ignores lowercase, tones, spacing, and punctuation)
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Bỏ dấu tiếng Việt
    .replace(/[.,?/#!$%^&* text;:{}=\-_`~()]/g, "") // Bỏ ký tự đặc biệt
    .replace(/\s+/g, ""); // Bỏ khoảng trắng
}

// Levenshtein Distance for similarity comparison
function getSimilarity(s1: string, s2: string): number {
  const len1 = s1.length;
  const len2 = s2.length;
  const maxLen = Math.max(len1, len2);
  if (maxLen === 0) return 1.0;

  const track = Array(len2 + 1).fill(null).map(() => Array(len1 + 1).fill(null));
  for (let i = 0; i <= len1; i += 1) track[0][i] = i;
  for (let j = 0; j <= len2; j += 1) track[j][0] = j;

  for (let j = 1; j <= len2; j += 1) {
    for (let i = 1; i <= len1; i += 1) {
      const indicator = s1[i - 1] === s2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1, // deletion
        track[j - 1][i] + 1, // insertion
        track[j - 1][i - 1] + indicator // substitution
      );
    }
  }
  return (maxLen - track[len2][len1]) / maxLen;
}

// Cleans up cache items older than 24 hours
function cleanExpiredCache(cache: CacheData): CacheData {
  const now = Date.now();
  const cleaned: CacheData = {};
  let changed = false;

  for (const key in cache) {
    if (now - cache[key].timestamp < ONE_DAY_MS) {
      cleaned[key] = cache[key];
    } else {
      cleaned[key] = null as any;
      delete cleaned[key];
      changed = true;
    }
  }

  if (cleaned) {
    // filter nulls
    Object.keys(cleaned).forEach(k => cleaned[k] === null && delete cleaned[k]);
  }

  if (changed) {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cleaned));
  }
  return cleaned;
}

// Finds a similar cached query
function findSimilarCache(query: string, lng: string): string | null {
  try {
    const rawCache = localStorage.getItem(CACHE_KEY);
    if (!rawCache) return null;

    let cache: CacheData = JSON.parse(rawCache);
    cache = cleanExpiredCache(cache);

    const normQuery = normalizeText(query);
    const queryKeyPrefix = `${lng}:`;

    for (const cacheKey in cache) {
      if (cacheKey.startsWith(queryKeyPrefix)) {
        const cachedNormQuery = cacheKey.substring(queryKeyPrefix.length);
        const similarity = getSimilarity(normQuery, cachedNormQuery);
        
        // Match if similarity is 82% or higher
        if (similarity >= 0.82) {
          return cache[cacheKey].response;
        }
      }
    }
  } catch (e) {
    console.error("Cache read error:", e);
  }
  return null;
}

// Saves response to local storage cache
function saveToCache(query: string, response: string, lng: string) {
  try {
    const rawCache = localStorage.getItem(CACHE_KEY);
    const cache: CacheData = rawCache ? JSON.parse(rawCache) : {};

    const key = `${lng}:${normalizeText(query)}`;
    cache[key] = {
      response,
      timestamp: Date.now(),
    };

    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (e) {
    console.error("Cache write error:", e);
  }
}

function buildContents(history: ChatMessage[]): GeminiContent[] {
  return history.map((msg) => ({
    role: msg.role,
    parts: [{ text: msg.text }],
  }));
}

export async function sendMessage(
  history: ChatMessage[],
  userMessage: string,
  lng: string = "en",
): Promise<string> {
  // 1. Try to find a similar query in the local cache
  const cachedResponse = findSimilarCache(userMessage, lng);
  if (cachedResponse) {
    return cachedResponse;
  }

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;

  if (!apiKey) {
    // Demo mode — simulate a response
    await new Promise((r) => setTimeout(r, 800));
    const reply = demoResponse(userMessage, lng);
    saveToCache(userMessage, reply, lng);
    return reply;
  }

  const contents: GeminiContent[] = [
    ...buildContents(history),
    { role: "user", parts: [{ text: userMessage }] },
  ];

  const endpoint = `${GEMINI_BASE}/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

  const langInstruction = lng === "vi"
    ? "\n\nCRITICAL: You must answer in Vietnamese. Keep all responses natural and fully translated. Do NOT mix English and Vietnamese. Use proper, natural Vietnamese sentences."
    : "\n\nCRITICAL: You must answer in English. Keep all responses professional and natural.";

  const body = {
    system_instruction: {
      parts: [{ text: SYSTEM_PROMPT + langInstruction }],
    },
    contents,
    generationConfig: {
      temperature: 0.7,
      topP: 0.9,
      maxOutputTokens: 2048,
    },
  };

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data: GeminiResponse = await res.json();

  if (data.error) {
    throw new Error(data.error.message || "Gemini API error");
  }

  const text =
    data.candidates?.[0]?.content?.parts?.[0]?.text ?? "No response received.";

  // 2. Cache successful responses
  if (text && text !== "No response received.") {
    saveToCache(userMessage, text, lng);
  }

  return text;
}

// Demo responses when no API key is configured or quota is exceeded
export function demoResponse(message: string, lng: string = "en"): string {
  const msg = message.toLowerCase();
  const isVi = lng === "vi";

  // Check if asking about projects (general or specific ones)
  if (
    msg.includes("project") ||
    msg.includes("dự án") ||
    msg.includes("xây dựng") ||
    msg.includes("xây") ||
    msg.includes("sản phẩm") ||
    msg.includes("tác phẩm") ||
    msg.includes("hrmpro") ||
    msg.includes("hrm") ||
    msg.includes("hr") ||
    msg.includes("nhân sự") ||
    msg.includes("booking") ||
    msg.includes("sân") ||
    msg.includes("commerce") ||
    msg.includes("bán hàng") ||
    msg.includes("chat") ||
    msg.includes("lims")
  ) {
    if (isVi) {
      return "Dương đã phát triển nhiều dự án chất lượng nổi bật trong phần Projects:\n" +
        "1. **HRMPro**: Hệ thống quản trị nhân sự toàn diện tích hợp Gemini AI phân tích báo cáo & dữ liệu nhân sự.\n" +
        "2. **Sports Facility Platform**: Nền tảng đặt sân thể thao có QR check-in, thanh toán PayPal & trợ lý đặt sân bằng AI.\n" +
        "3. **AI E-Commerce**: Hệ thống bán hàng tích hợp hệ thống gợi ý lai (Recommendation System) & dự báo doanh thu dùng Prophet AI.\n" +
        "4. **Real-time Chat App**: Ứng dụng nhắn tin thời gian thực đa nền tảng (Web & Mobile) sử dụng Socket.IO & MongoDB.\n" +
        "5. **LIMS**: Hệ thống quản lý phòng thí nghiệm dạng Microservices (phát triển khi thực tập tại FPT Software).\n" +
        "Bạn có thể xem mã nguồn chi tiết của các dự án tại GitHub của Dương: https://github.com/DuongGB";
    }
    return "Duong has built several high-quality projects showcased in the Projects section:\n" +
      "1. **HRMPro**: A comprehensive HR Management System integrating Gemini AI for workforce analytics & report generation.\n" +
      "2. **Sports Facility Platform**: A booking system featuring QR check-in, PayPal integration, and a Gemini AI booking assistant.\n" +
      "3. **AI E-Commerce**: An e-commerce platform featuring a hybrid recommendation system and revenue forecasting using Prophet AI.\n" +
      "4. **Real-time Chat App**: A cross-platform real-time chat application using Socket.IO and MongoDB.\n" +
      "5. **LIMS**: A microservices-based Laboratory Information Management System built during his internship at FPT Software.\n" +
      "You can explore all project source code on Duong's GitHub: https://github.com/DuongGB";
  }

  if (msg.includes("ai") || msg.includes("gemini") || msg.includes("trí tuệ")) {
    if (isVi) {
      return "Dương có kinh nghiệm tích hợp AI vào hơn 4 dự án thực tế: HRMPro (dùng Gemini AI để phân tích dữ liệu nhân sự), Sports Facility (trợ lý đặt sân Gemini AI), E-commerce (gợi ý sản phẩm lai kết hợp mô hình Prophet AI dự báo doanh thu), và LIMS (AWS Bedrock phân tích dữ liệu y tế). Kỹ năng AI Integration & Data của Dương đạt mức 85%.";
    }
    return "Duong has integrated AI features into 4+ projects: HRMPro (Gemini AI for HR analytics), Sports Facility (Gemini AI booking assistant), E-commerce (Prophet AI for revenue forecasting and recommendation system), and LIMS (AWS Bedrock AI analysis). He rates his AI Integration skills at 85%.";
  }

  if (msg.includes("skill") || msg.includes("tech") || msg.includes("kỹ năng") || msg.includes("công nghệ")) {
    if (isVi) {
      return "Bộ kỹ năng của Dương: Backend gồm Java/Spring Boot (92%) và REST API (95%). Frontend gồm ReactJS (90%) và TailwindCSS (95%). Cơ sở dữ liệu sử dụng PostgreSQL, MongoDB, MariaDB. Kỹ năng AI gồm Gemini AI, AWS Bedrock, Python FastAPI và Prophet Model. DevOps hỗ trợ Docker, AWS, Jenkins và Nginx.";
    }
    return "Duong's skill set: Backend includes Java/Spring Boot (92%) and REST APIs (95%). Frontend includes ReactJS (90%) and TailwindCSS (95%). Database options include PostgreSQL, MongoDB, and MariaDB. AI tools include Gemini AI, AWS Bedrock, Python FastAPI, and Prophet Model. DevOps includes Docker, AWS, Jenkins, and Nginx.";
  }

  if (msg.includes("experience") || msg.includes("work") || msg.includes("job") || msg.includes("kinh nghiệm") || msg.includes("làm việc")) {
    if (isVi) {
      return "Dương đã có kinh nghiệm làm lập trình viên Fullstack tại Công ty Techzen (Tháng 1 - Tháng 6, 2026) chuyên về hệ thống phân tích nhân sự nội bộ tích hợp AI, và thực tập vị trí Java Developer tại FPT Software (Tháng 9 - Tháng 11, 2025) phát triển ứng dụng y tế LIMS dạng microservices sử dụng Kafka, Redis và AWS Bedrock.";
    }
    return "Duong worked as a Fullstack Developer at Techzen (Jan - Jun 2026) building internal HR analytics with AI features, and as a Java Developer Intern at FPT Software (Sep - Nov 2025) working on a microservices LIMS with Kafka, Redis, and AWS Bedrock.";
  }

  if (msg.includes("contact") || msg.includes("hire") || msg.includes("email") || msg.includes("liên hệ") || msg.includes("tuyển")) {
    if (isVi) {
      return "Bạn có thể liên hệ trực tiếp với Dương qua email duongnguyenqn1323@gmail.com hoặc kết nối qua tài khoản LinkedIn của Dương. Cậu ấy đang tìm kiếm cơ hội cho vị trí Fresher / Junior Software Engineer!";
    }
    return "You can reach Duong directly via email at duongnguyenqn1323@gmail.com or connect with him on LinkedIn. He is currently looking for Fresher / Junior Software Engineer roles!";
  }

  if (isVi) {
    return "Xin chào! Tôi là trợ lý AI của Dương (chế độ demo). Tôi có thể chia sẻ thông tin về các dự án nổi bật, kỹ năng lập trình, kinh nghiệm làm việc hoặc cách thức liên hệ với Dương. Bạn muốn biết thêm về nội dung nào?";
  }
  return "Hi! I'm Duong's AI assistant (running in demo mode). I can tell you about his projects, skills, experience, or how to contact him. What would you like to know?";
}
