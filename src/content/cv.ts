// ═══════════════════════════════════════════════════════════════════════════
//  CV Data — Luis Meyehen Paz  |  Cloud & Data Platform Engineer
//  Single source of truth. Simple, direct, low-profile. No invented metrics.
// ═══════════════════════════════════════════════════════════════════════════

export interface Experience {
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string | null; // null = current position
  responsibilities: string[];
  impact?: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
  proficiency: number;
  evidence?: string;
}

export interface Education {
  title: string;
  detail: string;
}

export interface Language {
  language: string;
  level: string;
}

export interface SiteConfig {
  name: string;
  role: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  availability: string;
  summary: string;
  positioning: string;
  about: {
    philosophy: string;
    stack: string;
    focus: string;
  };
}

// ── Experience ──────────────────────────────────────────────────────────────

export const experience: Experience[] = [
  {
    company: 'Interbank',
    role: 'Platform Engineer',
    location: 'Peru · Remote',
    startDate: '10/2023',
    endDate: null,
    responsibilities: [
      'Data Science teams ship without waiting on the platform team: self-service pipelines, automated SQL generation, and monitoring they can use on their own.',
      'Production data stays healthy: quality checks, pipeline monitoring, and drift detection — maintained by me.',
      'Repetitive work gets automated, including LLM-based workflows with model fallbacks, so teams keep moving when a provider changes.',
      'I work on AWS (Step Functions, Lambda, Glue, Athena) and maintain what I ship.',
    ],
  },
  {
    company: 'Prisma Medios de Pago',
    role: 'AWS Data Platform Engineer',
    location: 'Argentina',
    startDate: '08/2022',
    endDate: '10/2023',
    responsibilities: [
      'Made deployments reproducible: migrated the platform to infrastructure as code (Terraform).',
      'Made ingestion reliable: event-driven pipelines into the company data lake, with quality checks and monitoring.',
    ],
  },
  {
    company: 'Tiendanube',
    role: 'Data Platform Engineer',
    location: 'Argentina',
    startDate: '10/2021',
    endDate: '08/2022',
    responsibilities: [
      'Helped build the data platform from scratch so teams query with SQL instead of asking for exports.',
    ],
  },
  {
    company: 'Walmart / Dorinka',
    role: 'Data Engineer',
    location: 'Argentina',
    startDate: '02/2021',
    endDate: '10/2021',
    responsibilities: [
      'Migrated databases to Oracle Cloud with data integrity during the Walmart Argentina to Dorinka transition.',
    ],
  },
  {
    company: 'Tsoft',
    role: 'Data Engineer',
    location: 'Argentina',
    startDate: '10/2020',
    endDate: '02/2021',
    responsibilities: [
      'Automated data ingestion and transformation from external APIs with Python (DirectTV).',
    ],
  },
  {
    company: 'Monsun',
    role: 'Data Engineer',
    location: 'Argentina',
    startDate: '01/2020',
    endDate: '10/2020',
    responsibilities: [
      'Banco Supervielle: built and tested predictive models and SQL on SQL Server.',
      'AGIP: automated processes and ETL with Pentaho on SQL Server.',
    ],
  },
  {
    company: 'Dthink',
    role: 'Data Engineer',
    location: 'Argentina',
    startDate: '09/2019',
    endDate: '01/2020',
    responsibilities: [
      'Built databases, ETL processes, and BI dashboards (Power BI, Metabase) that clients used.',
    ],
  },
];

// ── Skills ─────────────────────────────────────────────────────────────────

export const skillCategories: SkillCategory[] = [
  {
    category: 'Cloud & IaC',
    skills: 'AWS · Terraform · AWS CDK · CloudFormation · Lambda · Step Functions · Glue · Athena · SageMaker · S3 · EMR · ECS · ECR · DynamoDB'.split(' · '),
    proficiency: 5,
  },
  {
    category: 'CI/CD & DevOps',
    skills: 'GitHub Actions · GitLab CI · CodePipeline · CodeBuild · Bitbucket · Docker · Git · Linux'.split(' · '),
    proficiency: 5,
  },
  {
    category: 'Data Engineering',
    skills: 'ETL · SQL · PySpark · Databricks · Trino · Airflow · Pentaho · SSIS'.split(' · '),
    proficiency: 4,
  },
  {
    category: 'Databases',
    skills: 'SQL Server · Oracle · PostgreSQL · MySQL · Athena · Redshift · BigQuery'.split(' · '),
    proficiency: 4,
  },
  {
    category: 'Platform Engineering',
    skills: 'Internal Developer Platforms · Observability · Developer Enablement'.split(' · '),
    proficiency: 5,
  },
  {
    category: 'AI Engineering',
    skills: 'LangGraph · Agent Orchestration · AWS Bedrock · opencode · OpenAI APIs'.split(' · '),
    proficiency: 4,
  },
  {
    category: 'Languages',
    skills: 'Python · SQL · Bash · YAML'.split(' · '),
    proficiency: 4,
  },
];

// ── Education ───────────────────────────────────────────────────────────────

export const education: Education[] = [
  {
    title: 'AWS Certified DevOps Engineer Professional (DOP-C02)',
    detail: 'In progress · Amazon Web Services · Target Q4 2026',
  },
  {
    title: 'Data Architect',
    detail: 'NTT Data Academy · 2024',
  },
  {
    title: 'Computer Technician',
    detail: 'Sec. Técnica N°3 · Buenos Aires',
  },
];

// ── Languages ───────────────────────────────────────────────────────────────

export const languages: Language[] = [
  { language: 'Spanish', level: 'Native' },
  { language: 'English', level: 'Reading: Intermediate / Writing: Basic / Speaking: Basic' },
];

// ── Site Config ─────────────────────────────────────────────────────────────

export const siteConfig: SiteConfig = {
  name: 'Luis Meyehen Paz',
  role: 'Cloud & Data Platform Engineer',
  location: 'Buenos Aires, Argentina',
  email: 'luis.m.paz.03@gmail.com',
  linkedin: 'https://linkedin.com/in/luisarg03',
  github: 'https://github.com/luisarg03',
  availability: 'Open to senior roles · notice: immediate',
  summary:
    'Cloud & data platform engineer with 7+ years on AWS. I build platforms, pipelines, and tools that make data teams faster: less waiting on infrastructure, fewer incidents, more shipping. I work close to the team, automate the repetitive, and maintain what I deliver.',
  positioning: 'I help data teams ship faster.',
  about: {
    philosophy: 'Keep it simple. Automate repetitive work.',
    stack: 'Arch + Hyprland · terminal-first · when docs fail, I read the source',
    focus: 'Cloud platforms, data pipelines, AI-assisted workflows',
  },
};
