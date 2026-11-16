type ThemeMode = "light" | "dark";
type Locale = "en" | "th";
type CaseFilter = "all" | "systems" | "security" | "cloud";

const THEME_STORAGE_KEY = "pp_portfolio_theme";
const LANG_STORAGE_KEY = "pp_portfolio_lang";

let currentLocale: Locale = "en";
let visibleCasesCount = 4;
let totalCasesCount = 4;

const TRANSLATIONS: Record<Locale, Record<string, string>> = {
  en: {
    "meta.title": "Peem Phetpimol | Systems Analyst & Full-Stack Software Engineer",
    "a11y.skip": "Skip to main content",
    "nav.architecture": "Architecture",
    "nav.cases": "Case Studies",
    "nav.experience": "Experience",
    "nav.security": "Security",
    "nav.contact": "Contact",
    "nav.downloadCv": "Download CV (PDF)",
    "theme.toDark": "Dark",
    "theme.toLight": "Light",
    "hero.eyebrow": "Systems Analyst & Full-Stack Engineer",
    "hero.title": "Enterprise systems engineered for security.",
    "hero.lead": "Delivering .NET, Angular, and multi-cloud platforms from system analysis through SAST-verified production operations.",
    "hero.ctaCases": "Explore Case Studies",
    "hero.ctaCv": "Download CV",
    "profile.name": "Peem Phetpimol",
    "profile.location": "Bangkok / Samut Prakan, Thailand",
    "profile.tenure": "5+ Years Enterprise Delivery",
    "profile.stackLabel": "Primary Stack",
    "profile.cloudLabel": "Cloud & Delivery",
    "profile.secLabel": "Security Gate",
    "profile.focusLabel": "Engineering Focus",
    "profile.focusVal": "Systems Analysis, API Design & AppSec",
    "cap.tag": "Core Capabilities",
    "cap.title": "Architecture from specification to hardened deployment.",
    "cap.note": "End-to-end technical ownership bridging stakeholder discovery, clean domain architecture, and cloud release governance.",
    "cap.t1.title": "Systems Analysis & Domain Design",
    "cap.t1.desc": "Structuring requirements workshops, fit-gap assessments, sequence models, and UAT acceptance paths across SA, Development, QA, DB, and Infrastructure teams.",
    "svg.s1": "Discovery & SRS",
    "svg.s2": "Domain & API",
    "svg.s3": "SAST & QA Gate",
    "svg.s4": "Cloud Release",
    "cap.t2.title": "Security & Identity Engineering",
    "cap.t2.desc": "Embedding identity federation and static/software composition controls early in every sprint.",
    "cap.t2.k1": "Identity",
    "cap.t2.k2": "Access Control",
    "cap.t2.v2": "Server-side RBAC, rate limiting, idempotency",
    "cap.t2.k3": "Code & SCA",
    "cap.t2.v3": "SonarQube, Coverity, Black Duck remediation",
    "cap.t3.title": "Full-Stack Application Systems",
    "cap.t3.desc": "Maintaining strict typing, relational data integrity, and responsive portals for high-throughput teams.",
    "cap.t4.title": "Cloud Infrastructure & CI/CD Gates",
    "cap.t4.badge": "Zero-Touch Pipelines",
    "cap.t4.desc": "Automating containerized releases, coverage thresholds, and database migrations across AWS and Azure environments.",
    "cap.t4.k1": "AWS Production",
    "cap.t4.k2": "Azure Runtime",
    "cap.t4.k3": "CI/CD Automation",
    "cap.t4.k4": "Test Verification",
    "cases.tag": "Selected Engineering Work",
    "cases.title": "Sanitized enterprise case studies.",
    "cases.note": "Architectural patterns and technical outcomes generalized to uphold corporate confidentiality.",
    "cases.f.all": "All Systems (4)",
    "cases.f.systems": "Full-Stack & SA",
    "cases.f.security": "Security & Compliance",
    "cases.f.cloud": "Cloud & Automation",
    "cases.designLabel": "Design Decisions:",
    "cases.btnShow": "Architecture Notes",
    "cases.btnHide": "Hide Notes",
    "period.2024Present": "2024 - Present",
    "cases.1.domain": "Security & Compliance Portal",
    "cases.1.title": "Enterprise Security Operations & Access Governance Portal",
    "cases.1.summary": "Led functional specification, domain modeling, and full-stack delivery for an enterprise governance portal uniting centralized directory controls, real-time notifications, and audit-ready approval trails.",
    "cases.1.k1": "Identity & Guards",
    "cases.1.v1": "Enforced Microsoft Entra ID OIDC / MSAL authentication, strict server-side RBAC, request rate limiting, and idempotent mutation guards.",
    "cases.1.k2": "Security Verification",
    "cases.1.v2": "Resolved critical findings across SonarQube, Coverity, and Black Duck SAST/SCA gates prior to AWS and Azure container deployment.",
    "cases.1.detail": "Separated query and command services at the application layer with parameterized EF Core migrations, transactional outbox consistency, and Microsoft Graph background synchronization.",
    "cases.2.domain": "Multi-Portal Operations",
    "cases.2.title": "Unified Service Request & Operational Workflow Suite",
    "cases.2.summary": "Architected interconnected internal portals for tracking cross-department requests, SAP OData master data synchronization, and automated PDF/Excel compliance exports.",
    "cases.2.k1": "Integration Layer",
    "cases.2.v1": "Designed resilient REST contracts bridging core ERP SAP OData feeds with low-latency Redis caching and SQL Server reporting views.",
    "cases.2.detail": "Standardized API error envelopes, pagination limits, and automated UAT test scripts so business owners could validate multi-stage routing rules independently.",
    "cases.3.domain": "Cloud & Release Engineering",
    "cases.3.title": "Multi-Cloud Container CI/CD & Automated Coverage Pipelines",
    "cases.3.summary": "Established reproducible Docker build pipelines in GitHub Actions shipping immutable images to AWS ECS/ECR and Azure App Service Containers.",
    "cases.3.k1": "Quality Gates",
    "cases.3.v1": "Integrated automated xUnit integration suites, dotCover coverage checks, and Robot Framework UI verification before promotion.",
    "cases.3.detail": "Enforced least-privilege deployment roles, health-checked ALB rolling updates, and environment isolation between staging UAT and production RDS/S3 targets.",
    "cases.4.domain": "Platform Tooling & Migration",
    "cases.4.title": "Configuration Governance Utility & Legacy Data Seeder",
    "cases.4.summary": "Built developer environment validation tools and Python-driven ETL/seeders to migrate legacy relational datasets cleanly into modernized PostgreSQL schemas.",
    "cases.4.k1": "Cutover Reliability",
    "cases.4.v1": "Eliminated manual schema mismatches during UAT cutovers using repeatable dry-run validation and checksum verification.",
    "cases.4.detail": "Idempotent batch ingestion with explicit foreign-key dependency ordering and dry-run diff summaries before database write commits.",
    "exp.tag": "Career Trajectory",
    "exp.title": "Experience across energy, telecom, and IT consulting.",
    "exp.note": "Combining software implementation rigor with analytical leadership from requirement gathering to production reliability.",
    "edu.label": "Education",
    "edu.degree": "Bachelor of Technology in Information Technology, Faculty of Science",
    "edu.school": "Prince of Songkla University (Hat Yai Campus) · Jun 2021",
    "exp.1.company": "PTT Global Chemical Public Company Limited · Bangkok, Thailand (Hybrid)",
    "exp.1.period": "Oct 2024 - Present",
    "exp.1.b1": "Analyze end-to-end enterprise products, leading impact analysis and implementation planning across SA, Development, QA, Database, and Infrastructure teams.",
    "exp.1.b2": "Architect full-stack systems using ASP.NET Core (.NET), C#, EF Core, Angular, SignalR, Python, Laravel, React, Vue, and PostgreSQL / SQL Server / Redis.",
    "exp.1.b3": "Harden production apps with Microsoft Entra ID (OIDC/MSAL), RBAC, rate limiting, and SonarQube / Coverity / Black Duck SAST/SCA remediation.",
    "exp.1.b4": "Operate Dockerized GitHub Actions CI/CD pipelines to AWS (ECS, ECR, RDS, S3, ALB) and Azure App Service Containers with xUnit/dotCover and Robot Framework gates.",
    "exp.2.company": "Advanced Info Service Public Company Limited (AIS) · Bangkok, Thailand",
    "exp.2.period": "Apr 2024 - Sep 2024",
    "exp.2.b1": "Authored SRS documentation, ER diagrams, API contracts, process flows, and UAT test specifications for engineering and stakeholder reviews.",
    "exp.2.b2": "Facilitated requirements and fit-gap workshops, resolved technical incidents to minimize operational downtime, and analyzed operational datasets.",
    "exp.3.company": "Fujitsu (Thailand) Co., Ltd. · Remote",
    "exp.3.period": "Jan 2024 - Mar 2024",
    "exp.3.b1": "Developed enterprise web applications on the .NET (ASP.NET Core, C#) platform.",
    "exp.3.b2": "Collaborated with SA, QA, Database, and Infrastructure teams to implement technical requirements, support UAT, and deliver post-go-live root-cause fixes.",
    "exp.4.company": "PTT Digital Solutions Company Limited · Remote",
    "exp.4.period": "Mar 2022 - Dec 2023",
    "exp.4.b1": "Led requirement gathering, fit-gap analysis, and functional specifications covering application workflows, business logic, UI screens, reports, and data structures.",
    "exp.4.b2": "Coordinated cross-team impact analysis, controlled requirements, led UAT and end-user training, coached junior team members, and supported post-go-live operations including OneTrust.",
    "exp.5.company": "Prince of Songkla University · Songkhla, Thailand",
    "exp.5.period": "Apr 2021 - Jun 2021",
    "exp.5.b1": "Developed a web application for Prince of Songkla University using the Laravel framework.",
    "exp.6.company": "Prince of Songkla University · Songkhla, Thailand",
    "exp.6.period": "Jan 2021 - Mar 2021",
    "exp.6.b1": "Supported chemical separation research and created 3D models.",
    "exp.7.company": "Prince of Songkla University · Songkhla, Thailand",
    "exp.7.period": "Jan 2020 - Dec 2020",
    "exp.7.b1": "Developed a mobile game using Unity, C#, and Firebase.",
    "sec.tag": "Security By Design",
    "sec.title": "Live client-verifiable security posture.",
    "sec.reverify": "Re-Verify DOM Controls",
    "sec.summaryTitle": "Zero-Trust Static Architecture",
    "sec.summaryBody": "This site serves strictly compiled static assets with zero runtime dependencies, zero external font or analytics requests, strict Content Security Policy rules, Subresource Integrity hashes at deployment, and Safe DOM updates without HTML string injection.",
    "sec.colControl": "Control",
    "sec.colState": "Measured State",
    "sec.colStatus": "Status",
    "contact.tag": "Contact",
    "contact.title": "Open to systems analysis & senior full-stack roles.",
    "contact.note": "For enterprise architecture inquiries or direct interviews, reach out via email or inspect public repositories on GitHub. Direct phone details are provided inside the downloadable PDF CV to prevent automated scraping.",
    "contact.emailLabel": "Email",
    "contact.cvLabel": "Curriculum Vitae",
    "contact.cvVal": "Download Updated PDF (A4)",
    "contact.locLabel": "Location",
    "contact.locVal": "Bangkok / Samut Prakan, Thailand",
    "footer.copy": "© 2026 Peem Phetpimol. All rights reserved.",
    "footer.meta": "Strict CSP · Zero Third-Party CDNs · Self-Hosted OFL Fonts"
  },
  th: {
    "meta.title": "ภีม เพ็ชรพิมล | Systems Analyst & Full-Stack Software Engineer",
    "a11y.skip": "ข้ามไปยังเนื้อหาหลัก",
    "nav.architecture": "สถาปัตยกรรม",
    "nav.cases": "กรณีศึกษา",
    "nav.experience": "ประสบการณ์",
    "nav.security": "ความปลอดภัย",
    "nav.contact": "ติดต่อ",
    "nav.downloadCv": "ดาวน์โหลด CV (PDF)",
    "theme.toDark": "โหมดมืด",
    "theme.toLight": "โหมดสว่าง",
    "hero.eyebrow": "Systems Analyst & Full-Stack Engineer",
    "hero.title": "วิศวกรรมระบบองค์กรที่มั่นคงและปลอดภัย",
    "hero.lead": "ส่งมอบแพลตฟอร์ม .NET, Angular และ Multi-Cloud ตั้งแต่การวิเคราะห์ระบบจนถึง Production ที่ผ่านเกณฑ์ SAST/SCA",
    "hero.ctaCases": "ดูกรณีศึกษา",
    "hero.ctaCv": "ดาวน์โหลด CV",
    "profile.name": "ภีม เพ็ชรพิมล (Peem Phetpimol)",
    "profile.location": "กรุงเทพฯ / สมุทรปราการ, ประเทศไทย",
    "profile.tenure": "ประสบการณ์พัฒนาระบบองค์กร 5+ ปี",
    "profile.stackLabel": "เทคโนโลยีหลัก",
    "profile.cloudLabel": "คลาวด์และการส่งมอบ",
    "profile.secLabel": "มาตรฐานความปลอดภัย",
    "profile.focusLabel": "ความเชี่ยวชาญหลัก",
    "profile.focusVal": "Systems Analysis, ออกแบบ API และ AppSec",
    "cap.tag": "ความเชี่ยวชาญหลัก",
    "cap.title": "ออกแบบสถาปัตยกรรมครบวงจรตั้งแต่เอกสารสเปกจนถึงระบบ Production",
    "cap.note": "เชื่อมโยงการเก็บความต้องการทางธุรกิจ การออกแบบโดเมนที่ชัดเจน และการกำกับดูแลการ Deploy บนคลาวด์",
    "cap.t1.title": "Systems Analysis & Domain Design",
    "cap.t1.desc": "จัดเวิร์กช็อปวิเคราะห์ความต้องการ ทำ Fit-Gap และ Impact Analysis พร้อมเขียนแบบจำลอง UML/ER และวางแผน UAT ร่วมกับทีม SA, Dev, QA, DB และ Infra",
    "svg.s1": "วิเคราะห์ & SRS",
    "svg.s2": "โดเมน & API",
    "svg.s3": "SAST & QA Gate",
    "svg.s4": "Cloud Release",
    "cap.t2.title": "Security & Identity Engineering",
    "cap.t2.desc": "ฝังระบบยืนยันตัวตนและการควบคุมความปลอดภัยตั้งแต่ระดับซอร์สโค้ดในทุก Sprint",
    "cap.t2.k1": "การยืนยันตัวตน",
    "cap.t2.k2": "การควบคุมสิทธิ์",
    "cap.t2.v2": "Server-side RBAC, Rate Limiting และ Idempotency",
    "cap.t2.k3": "การตรวจโค้ดและไลบรารี",
    "cap.t2.v3": "แก้ไขช่องโหว่ผ่าน SonarQube, Coverity และ Black Duck",
    "cap.t3.title": "Full-Stack Application Systems",
    "cap.t3.desc": "พัฒนาเว็บแอปพลิเคชันแบบ Strict Typing รักษาความถูกต้องของฐานข้อมูลเชิงสัมพันธ์และรองรับงานองค์กร",
    "cap.t4.title": "Cloud Infrastructure & CI/CD Gates",
    "cap.t4.badge": "Zero-Touch Pipelines",
    "cap.t4.desc": "จัดทำ Pipeline แบบ Containerized ตรวจสอบ Test Coverage และ Database Migration อัตโนมัติบน AWS และ Azure",
    "cap.t4.k1": "สภาพแวดล้อม AWS",
    "cap.t4.k2": "สภาพแวดล้อม Azure",
    "cap.t4.k3": "CI/CD อัตโนมัติ",
    "cap.t4.k4": "ระบบทดสอบอัตโนมัติ",
    "cases.tag": "ผลงานเชิงวิศวกรรม",
    "cases.title": "กรณีศึกษาระบบองค์กร (Sanitized)",
    "cases.note": "สรุปสถาปัตยกรรมและผลลัพธ์เชิงเทคนิคโดยสงวนรหัสโครงการและข้อมูลลับขององค์กร",
    "cases.f.all": "ทั้งหมด (4)",
    "cases.f.systems": "Full-Stack & SA",
    "cases.f.security": "ความปลอดภัยและสิทธิ์",
    "cases.f.cloud": "คลาวด์และระบบอัตโนมัติ",
    "cases.designLabel": "แนวทางการออกแบบ:",
    "cases.btnShow": "รายละเอียดสถาปัตยกรรม",
    "cases.btnHide": "ซ่อนรายละเอียด",
    "period.2024Present": "2024 - ปัจจุบัน",
    "cases.1.domain": "พอร์ทัลความปลอดภัยและกำกับสิทธิ์",
    "cases.1.title": "ระบบบริหารจัดการความปลอดภัยและควบคุมสิทธิ์การเข้าถึงระดับองค์กร",
    "cases.1.summary": "รับผิดชอบการวิเคราะห์สเปก ออกแบบโดเมน และพัฒนา Full-Stack สำหรับพอร์ทัลกลางที่รวมการควบคุมสิทธิ์ การแจ้งเตือนแบบเรียลไทม์ และบันทึกการอนุมัติที่ตรวจสอบย้อนหลังได้",
    "cases.1.k1": "การยืนยันตัวตนและเกราะป้องกัน",
    "cases.1.v1": "บังคับใช้ Microsoft Entra ID (OIDC / MSAL), ตรวจสิทธิ์ RBAC ฝั่งเซิร์ฟเวอร์, จำกัด Rate Limit และป้องกันการส่งคำขอซ้ำ (Idempotency)",
    "cases.1.k2": "การผ่านเกณฑ์ความปลอดภัย",
    "cases.1.v2": "แก้ไขประเด็นด้านความปลอดภัยครบถ้วนบน SonarQube, Coverity และ Black Duck ก่อน Deploy Container ขึ้น AWS และ Azure",
    "cases.1.detail": "แยกชั้นบริการ Query และ Command อย่างชัดเจน ใช้ EF Core Migration แบบ Parameterized พร้อม Transactional Outbox และซิงก์ข้อมูลกับ Microsoft Graph",
    "cases.2.domain": "ระบบปฏิบัติการหลายพอร์ทัล",
    "cases.2.title": "ชุดระบบคำขอบริการและเวิร์กโฟลว์ปฏิบัติการภายในองค์กร",
    "cases.2.summary": "ออกแบบพอร์ทัลเชื่อมต่อระหว่างหน่วยงานเพื่อติดตามคำขอบริการ ซิงก์ข้อมูลหลักจาก SAP OData และสร้างรายงานเอกสาร PDF/Excel แบบอัตโนมัติ",
    "cases.2.k1": "ชั้นเชื่อมต่อระบบ",
    "cases.2.v1": "ออกแบบ REST API ที่เสถียร เชื่อมต่อ SAP OData ร่วมกับการทำ Redis Caching และมุมมองรายงานบน SQL Server",
    "cases.2.detail": "กำหนดมาตรฐาน Error Envelope, Pagination Limit และสคริปต์ทดสอบ UAT เพื่อให้ผู้ใช้งานหลักตรวจสอบเงื่อนไขเวิร์กโฟลว์หลายขั้นตอนได้แม่นยำ",
    "cases.3.domain": "วิศวกรรมคลาวด์และการส่งมอบ",
    "cases.3.title": "Multi-Cloud Container CI/CD และระบบตรวจวัดคุณภาพอัตโนมัติ",
    "cases.3.summary": "วางมาตรฐาน Docker Pipeline บน GitHub Actions เพื่อส่งมอบ Image ที่ตรวจสอบย้อนกลับได้ไปยัง AWS ECS/ECR และ Azure App Service Containers",
    "cases.3.k1": "เกณฑ์คุณภาพก่อนปล่อยระบบ",
    "cases.3.v1": "ผสานการทดสอบ xUnit Integration Test, ตรวจ Coverage ด้วย dotCover และทดสอบ UI อัตโนมัติด้วย Robot Framework ก่อน Promote ขึ้น Production",
    "cases.3.detail": "ใช้สิทธิ์ Deployment แบบ Least Privilege, ตรวจ Health Check ระหว่างทำ ALB Rolling Update และแยก Environment ระหว่าง UAT กับ Production ชัดเจน",
    "cases.4.domain": "เครื่องมือแพลตฟอร์มและการย้ายข้อมูล",
    "cases.4.title": "เครื่องมือจัดการคอนฟิกและระบบย้ายฐานข้อมูลจากระบบเดิม",
    "cases.4.summary": "พัฒนาเครื่องมือตรวจสอบตัวแปรระบบและสคริปต์ ETL/Seeder ด้วย Python เพื่อย้ายข้อมูลเชิงสัมพันธ์จากระบบเดิมเข้าสู่โครงสร้าง PostgreSQL ยุคใหม่อย่างปลอดภัย",
    "cases.4.k1": "ความเสถียรช่วง Cutover",
    "cases.4.v1": "ลดความผิดพลาดของ Schema ช่วงขึ้นระบบ UAT/Production ด้วยการทดสอบ Dry-Run และตรวจ Checksum ความถูกต้องของข้อมูล",
    "cases.4.detail": "นำเข้าข้อมูลแบบ Idempotent Batch ตามลำดับ Foreign Key พร้อมสรุปความแตกต่างก่อนบันทึกจริงลงฐานข้อมูล",
    "exp.tag": "เส้นทางอาชีพ",
    "exp.title": "ประสบการณ์ในอุตสาหกรรมพลังงาน โทรคมนาคม และที่ปรึกษาด้านไอที",
    "exp.note": "ผสานวินัยด้านวิศวกรรมซอฟต์แวร์เข้ากับการวิเคราะห์ระบบ ตั้งแต่รับโจทย์ธุรกิจจนถึงการดูแลเสถียรภาพบน Production",
    "edu.label": "การศึกษา",
    "edu.degree": "เทคโนโลยีบัณฑิต คณะวิทยาศาสตร์ สาขาเทคโนโลยีสารสนเทศ",
    "edu.school": "มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่ · มิถุนายน 2021",
    "exp.1.company": "บริษัท พีทีที โกลบอล เคมิคอล จำกัด (มหาชน) (PTT GC) · กรุงเทพฯ (Hybrid)",
    "exp.1.period": "ต.ค. 2024 - ปัจจุบัน",
    "exp.1.b1": "วิเคราะห์และออกแบบระบบซอฟต์แวร์องค์กรแบบครบวงจร ทำ Impact Analysis และวางแผนส่งมอบร่วมกับทีม SA, Dev, QA, Database และ Infrastructure",
    "exp.1.b2": "พัฒนาระบบ Full-Stack ด้วย ASP.NET Core (.NET), C#, EF Core, Angular, SignalR, Python, Laravel, React, Vue และ PostgreSQL / SQL Server / Redis",
    "exp.1.b3": "ยกระดับความปลอดภัยแอปด้วย Microsoft Entra ID (OIDC/MSAL), RBAC, Rate Limiting และแก้ไขผลตรวจ SonarQube / Coverity / Black Duck",
    "exp.1.b4": "ดูแล Dockerized GitHub Actions CI/CD ไปยัง AWS (ECS, ECR, RDS, S3, ALB) และ Azure App Service Containers พร้อมเกณฑ์ xUnit/dotCover และ Robot Framework",
    "exp.2.company": "บริษัท แอดวานซ์ อินโฟร์ เซอร์วิส จำกัด (มหาชน) (AIS) · กรุงเทพฯ",
    "exp.2.period": "เม.ย. 2024 - ก.ย. 2024",
    "exp.2.b1": "จัดทำเอกสาร SRS, ER Diagram, API Specification, Process Flow และเอกสารทดสอบ UAT สำหรับทีมพัฒนาและผู้เกี่ยวข้อง",
    "exp.2.b2": "จัดเวิร์กช็อปเก็บความต้องการและทำ Gap Analysis พร้อมช่วยแก้ไขปัญหาเชิงเทคนิคและวิเคราะห์ข้อมูลเพื่อสนับสนุนการดำเนินงาน",
    "exp.3.company": "บริษัท ฟูจิตสึ (ประเทศไทย) จำกัด · Remote",
    "exp.3.period": "ม.ค. 2024 - มี.ค. 2024",
    "exp.3.b1": "พัฒนาเว็บแอปพลิเคชันระดับองค์กรบนแพลตฟอร์ม .NET (ASP.NET Core, C#)",
    "exp.3.b2": "ทำงานร่วมกับทีม SA, QA, Database และ Infrastructure เพื่อพัฒนาตาม Technical Requirements สนับสนุนช่วง UAT และแก้ไขปัญหาเชิงลึกหลัง Go-live",
    "exp.4.company": "บริษัท พีทีที ดิจิตอล โซลูชั่น จำกัด · Remote",
    "exp.4.period": "มี.ค. 2022 - ธ.ค. 2023",
    "exp.4.b1": "เก็บความต้องการจาก Key User และ Business Owner ทำ Fit-Gap Analysis และออกแบบ Functional Spec ครบทั้ง Workflow, Business Logic, UI, รายงาน และข้อมูล",
    "exp.4.b2": "ประสานงานทำ Impact Analysis ข้ามทีม คุม Requirement นำทดสอบ UAT อบรมผู้ใช้งาน ดูแลปัญหาหลัง Go-live สอนงานทีมรุ่นน้อง และสนับสนุนระบบ OneTrust",
    "exp.5.company": "มหาวิทยาลัยสงขลานครินทร์ · สงขลา",
    "exp.5.period": "เม.ย. 2021 - มิ.ย. 2021",
    "exp.5.b1": "พัฒนาเว็บแอปพลิเคชันให้มหาวิทยาลัยสงขลานครินทร์ด้วย Laravel Framework",
    "exp.6.company": "มหาวิทยาลัยสงขลานครินทร์ · สงขลา",
    "exp.6.period": "ม.ค. 2021 - มี.ค. 2021",
    "exp.6.b1": "สนับสนุนงานวิจัยด้านการแยกสารเคมีและออกแบบโมเดล 3 มิติ",
    "exp.7.company": "มหาวิทยาลัยสงขลานครินทร์ · สงขลา",
    "exp.7.period": "ม.ค. 2020 - ธ.ค. 2020",
    "exp.7.b1": "พัฒนาเกมบนมือถือด้วย Unity, C# และ Firebase",
    "sec.tag": "Security By Design",
    "sec.title": "ตรวจสอบมาตรการความปลอดภัยบนเบราว์เซอร์ได้ทันที",
    "sec.reverify": "ตรวจสอบ DOM อีกครั้ง",
    "sec.summaryTitle": "สถาปัตยกรรมสแตติกแบบ Zero-Trust",
    "sec.summaryBody": "เว็บไซต์นี้ให้บริการเฉพาะไฟล์สแตติกที่คอมไพล์ล่วงหน้า ไม่มี dependency รันไทม์ ไม่มีการดึงฟอนต์หรือสคริปต์วิเคราะห์จากภายนอก บังคับใช้ Strict CSP, ตรวจสอบแฮช SHA-384 (SRI) และอัปเดต DOM ด้วย Safe API โดยไม่ฉีด HTML ดิบ",
    "sec.colControl": "มาตรการควบคุม",
    "sec.colState": "ค่าที่ตรวจวัดได้จริง",
    "sec.colStatus": "สถานะ",
    "contact.tag": "ช่องทางติดต่อ",
    "contact.title": "เปิดรับโอกาสในสาย Systems Analyst และ Senior Full-Stack",
    "contact.note": "สำหรับงานสถาปัตยกรรมระบบองค์กรหรือการสัมภาษณ์งาน สามารถติดต่อทางอีเมลหรือดูซอร์สโค้ดสาธารณะบน GitHub ส่วนเบอร์โทรศัพท์ติดต่อโดยตรงระบุไว้ในไฟล์ PDF CV เพื่อป้องกันการเก็บข้อมูลอัตโนมัติ",
    "contact.emailLabel": "อีเมล",
    "contact.cvLabel": "ประวัติการทำงาน (CV)",
    "contact.cvVal": "ดาวน์โหลด PDF ฉบับล่าสุด (A4)",
    "contact.locLabel": "พื้นที่ปฏิบัติงาน",
    "contact.locVal": "กรุงเทพฯ / สมุทรปราการ, ประเทศไทย",
    "footer.copy": "© 2026 Peem Phetpimol. สงวนลิขสิทธิ์",
    "footer.meta": "Strict CSP · ไม่ใช้ CDN ภายนอก · ฟอนต์ OFL โฮสต์ภายใน"
  }
};

function isExternalHttpUrl(rawUrl: string): boolean {
  if (!/^https?:\/\//i.test(rawUrl)) {
    return false;
  }
  try {
    const parsed = new URL(rawUrl, window.location.href);
    return parsed.origin !== window.location.origin;
  } catch {
    return true;
  }
}

function getThemeLabelText(theme: ThemeMode): string {
  const dict = TRANSLATIONS[currentLocale];
  if (theme === "dark") {
    return dict["theme.toLight"] ?? "Light";
  }
  return dict["theme.toDark"] ?? "Dark";
}

function applyTheme(theme: ThemeMode): void {
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");
  const label = document.getElementById("theme-label");

  root.setAttribute("data-theme", theme);
  if (toggle) {
    toggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  }
  if (label) {
    label.textContent = getThemeLabelText(theme);
  }
}

function initTheme(): void {
  let initial: ThemeMode = "light";
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "dark" || stored === "light") {
      initial = stored;
    }
  } catch {
    initial = "light";
  }

  applyTheme(initial);

  const toggle = document.getElementById("theme-toggle");
  if (!toggle) {
    return;
  }

  toggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next: ThemeMode = current === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* Storage unavailable under strict browser policy */
    }
  });
}

function updateFilterStatusText(): void {
  const status = document.getElementById("filter-status");
  if (!status) {
    return;
  }
  if (currentLocale === "th") {
    status.textContent = `แสดง ${visibleCasesCount} จาก ${totalCasesCount} กรณีศึกษา`;
  } else {
    status.textContent = `Showing ${visibleCasesCount} of ${totalCasesCount} case studies`;
  }
}

function updateDetailToggleLabels(): void {
  const dict = TRANSLATIONS[currentLocale];
  const detailButtons = document.querySelectorAll<HTMLButtonElement>(".detail-toggle");
  detailButtons.forEach((button) => {
    const isExpanded = button.getAttribute("aria-expanded") === "true";
    const key = isExpanded ? "cases.btnHide" : "cases.btnShow";
    button.textContent = dict[key] ?? (isExpanded ? "Hide Notes" : "Architecture Notes");
  });
}

function applyLocale(locale: Locale): void {
  currentLocale = locale;
  const dict = TRANSLATIONS[locale];

  document.documentElement.setAttribute("lang", locale);
  const titleText = dict["meta.title"];
  if (titleText) {
    document.title = titleText;
  }

  const i18nNodes = document.querySelectorAll<Element>("[data-i18n]");
  i18nNodes.forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (!key) {
      return;
    }
    const translated = dict[key];
    if (translated !== undefined) {
      node.textContent = translated;
    }
  });

  const langButtons = document.querySelectorAll<HTMLButtonElement>("[data-lang-btn]");
  langButtons.forEach((btn) => {
    const isActive = btn.getAttribute("data-lang-btn") === locale;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-pressed", isActive ? "true" : "false");
  });

  const currentTheme: ThemeMode =
    document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  applyTheme(currentTheme);
  updateFilterStatusText();
  updateDetailToggleLabels();
  runSecurityAudit();
}

function initLanguage(): void {
  let initial: Locale = "en";
  try {
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (stored === "th" || stored === "en") {
      initial = stored;
    }
  } catch {
    initial = "en";
  }

  applyLocale(initial);

  const switchEl = document.getElementById("lang-switch");
  if (!switchEl) {
    return;
  }

  switchEl.addEventListener("click", (event: MouseEvent) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    const btn = target.closest<HTMLButtonElement>("[data-lang-btn]");
    if (!btn) {
      return;
    }
    const chosen: Locale = btn.getAttribute("data-lang-btn") === "th" ? "th" : "en";
    if (chosen === currentLocale) {
      return;
    }
    applyLocale(chosen);
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, chosen);
    } catch {
      /* Storage unavailable under strict browser policy */
    }
  });
}

function initMobileNav(): void {
  const navToggle = document.getElementById("nav-toggle");
  const drawer = document.getElementById("mobile-drawer");
  if (!navToggle || !drawer) {
    return;
  }

  const setOpen = (isOpen: boolean): void => {
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    if (isOpen) {
      drawer.removeAttribute("hidden");
    } else {
      drawer.setAttribute("hidden", "");
    }
  };

  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    setOpen(!expanded);
  });

  const links = drawer.querySelectorAll("a");
  links.forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });
}

function parseFilterValue(raw: string | null): CaseFilter {
  if (raw === "systems" || raw === "security" || raw === "cloud") {
    return raw;
  }
  return "all";
}

function initCaseFilters(): void {
  const toolbar = document.getElementById("case-filters");
  const cards = document.querySelectorAll<HTMLElement>("#cases-list .case-card");
  if (!toolbar || cards.length === 0) {
    return;
  }

  totalCasesCount = cards.length;
  visibleCasesCount = cards.length;
  updateFilterStatusText();

  const buttons = toolbar.querySelectorAll<HTMLButtonElement>(".filter-btn");

  toolbar.addEventListener("click", (event: MouseEvent) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    const btn = target.closest<HTMLButtonElement>(".filter-btn");
    if (!btn) {
      return;
    }

    const filter = parseFilterValue(btn.getAttribute("data-filter"));
    buttons.forEach((button) => {
      const isActive = button === btn;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    let count = 0;
    cards.forEach((card) => {
      const categories = (card.getAttribute("data-categories") ?? "").split(/\s+/);
      const matches = filter === "all" || categories.includes(filter);
      if (matches) {
        card.removeAttribute("hidden");
        count += 1;
      } else {
        card.setAttribute("hidden", "");
      }
    });

    visibleCasesCount = count;
    updateFilterStatusText();
  });

  const detailButtons = document.querySelectorAll<HTMLButtonElement>(".detail-toggle");
  detailButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const controlId = button.getAttribute("aria-controls");
      if (!controlId) {
        return;
      }
      const panel = document.getElementById(controlId);
      if (!panel) {
        return;
      }
      const isExpanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", isExpanded ? "false" : "true");
      if (isExpanded) {
        panel.setAttribute("hidden", "");
      } else {
        panel.removeAttribute("hidden");
      }
      updateDetailToggleLabels();
    });
  });
}

function createAuditRow(controlName: string, measuredValue: string, isPass: boolean): HTMLTableRowElement {
  const row = document.createElement("tr");

  const controlCell = document.createElement("td");
  controlCell.textContent = controlName;

  const measuredCell = document.createElement("td");
  measuredCell.textContent = measuredValue;

  const statusCell = document.createElement("td");
  const badge = document.createElement("span");
  badge.className = `status-pill ${isPass ? "is-pass" : "is-warn"}`;
  badge.textContent = isPass ? "PASS" : "CHECK";
  statusCell.appendChild(badge);

  row.appendChild(controlCell);
  row.appendChild(measuredCell);
  row.appendChild(statusCell);
  return row;
}

function runSecurityAudit(): void {
  const tbody = document.getElementById("security-audit-rows");
  const timestamp = document.getElementById("audit-status");
  if (!tbody) {
    return;
  }

  const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
  const cspContent = cspMeta?.getAttribute("content") ?? "";
  const cspOk =
    cspContent.includes("default-src 'none'") &&
    cspContent.includes("script-src 'self'") &&
    cspContent.includes("style-src 'self'") &&
    !cspContent.includes("unsafe-inline") &&
    !cspContent.includes("unsafe-eval");

  const inlineStylesCount = document.querySelectorAll("style").length;
  const inlineStyleAttrCount = document.querySelectorAll("[style]").length;

  let inlineScriptCount = 0;
  let externalOriginCount = 0;
  let sriVerifiedCount = 0;
  let bundledAssetCount = 0;

  document.querySelectorAll("script").forEach((scriptEl) => {
    const src = scriptEl.getAttribute("src");
    if (!src) {
      inlineScriptCount += 1;
      return;
    }
    bundledAssetCount += 1;
    if (isExternalHttpUrl(src)) {
      externalOriginCount += 1;
    }
    if ((scriptEl.getAttribute("integrity") ?? "").startsWith("sha384-")) {
      sriVerifiedCount += 1;
    }
  });

  document.querySelectorAll('link[rel="stylesheet"]').forEach((linkEl) => {
    const href = linkEl.getAttribute("href") ?? "";
    bundledAssetCount += 1;
    if (isExternalHttpUrl(href)) {
      externalOriginCount += 1;
    }
    if ((linkEl.getAttribute("integrity") ?? "").startsWith("sha384-")) {
      sriVerifiedCount += 1;
    }
  });

  const externalAnchors = document.querySelectorAll('a[target="_blank"]');
  let missingRelCount = 0;
  externalAnchors.forEach((anchor) => {
    const relTokens = (anchor.getAttribute("rel") ?? "").toLowerCase().split(/\s+/);
    if (!relTokens.includes("noopener") || !relTokens.includes("noreferrer")) {
      missingRelCount += 1;
    }
  });

  const isThai = currentLocale === "th";
  const rows = [
    createAuditRow(
      isThai ? "Content Security Policy (CSP)" : "Content Security Policy",
      isThai
        ? cspOk
          ? "เข้มงวดระดับ default-src 'none', ปลอด unsafe-inline"
          : "ไม่พบหรือตั้งค่า CSP ไม่เข้มงวด"
        : cspOk
          ? "Strict default-src 'none', zero unsafe-inline"
          : "Missing or relaxed CSP meta",
      cspOk
    ),
    createAuditRow(
      isThai ? "การแยกโค้ดและสไตล์ออกจาก HTML" : "Inline Code & Style Isolation",
      isThai
        ? `${inlineScriptCount} inline script, ${inlineStylesCount + inlineStyleAttrCount} inline style`
        : `${inlineScriptCount} inline scripts, ${inlineStylesCount + inlineStyleAttrCount} inline styles`,
      inlineScriptCount === 0 && inlineStylesCount === 0 && inlineStyleAttrCount === 0
    ),
    createAuditRow(
      isThai ? "ทรัพยากรจากโดเมนภายนอก" : "Third-Party Network Origins",
      isThai
        ? `${externalOriginCount} โดเมน CSS/JS ภายนอก (Self-hosted 100%)`
        : `${externalOriginCount} external CSS/JS origins (100% self-hosted)`,
      externalOriginCount === 0
    ),
    createAuditRow(
      isThai ? "การป้องกัน Tabnabbing ลิงก์ภายนอก" : "External Link Tabnabbing Guard",
      isThai
        ? `ตรวจสอบแล้ว ${externalAnchors.length} ลิงก์ (${missingRelCount} ขาด rel)`
        : `${externalAnchors.length} external links verified (${missingRelCount} missing rel)`,
      missingRelCount === 0
    ),
    createAuditRow(
      "Subresource Integrity (SHA-384)",
      isThai
        ? bundledAssetCount > 0 && sriVerifiedCount === bundledAssetCount
          ? `ตรึงแฮช SHA-384 ครบ ${sriVerifiedCount}/${bundledAssetCount} ไฟล์`
          : `ตรึงแฮช ${sriVerifiedCount}/${bundledAssetCount} ไฟล์`
        : bundledAssetCount > 0 && sriVerifiedCount === bundledAssetCount
          ? `${sriVerifiedCount}/${bundledAssetCount} static bundles cryptographically pinned`
          : `${sriVerifiedCount}/${bundledAssetCount} bundles pinned`,
      bundledAssetCount > 0 && sriVerifiedCount === bundledAssetCount
    )
  ];

  tbody.replaceChildren(...rows);

  if (timestamp) {
    const nowText = new Date().toLocaleTimeString();
    timestamp.textContent = isThai
      ? `ตรวจสอบ DOM สำเร็จเมื่อ ${nowText}`
      : `DOM inspection verified at ${nowText}`;
  }
}

function initSecurityInspector(): void {
  runSecurityAudit();
  const auditButton = document.getElementById("run-audit-btn");
  if (auditButton) {
    auditButton.addEventListener("click", runSecurityAudit);
  }
}

initTheme();
initMobileNav();
initCaseFilters();
initSecurityInspector();
initLanguage();
