// ═══════════════════════════════════════════════════════════════════════════
//  CV Data — Luis Meyehen Paz  |  Cloud Engineer
//  Single source of truth for professional experience, skills, and education.
// ═══════════════════════════════════════════════════════════════════════════

export interface Experience {
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string | null; // null = current position
  responsibilities: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
  proficiency: number;
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
}

// ── Experience ──────────────────────────────────────────────────────────────

export const experience: Experience[] = [
  {
    company: 'Interbank',
    role: 'Cloud Platform Engineer',
    location: 'Peru · Remote',
    startDate: '10/2023',
    endDate: null,
    responsibilities: [
      'Built CI/CD pipelines in GitHub Actions and Bitbucket Pipelines, extending a shared template framework with AWS CloudFormation and CDK (Python) to provision and modify cloud infrastructure.',
      'Build and maintain container images (ECR) for SageMaker training pipelines, handling reusable libraries and complex configurations so Data Science teams can focus on model training.',
      'Developed Internal Developer Platform (IDP) features — including a self-service variable catalog (FastAPI + React) — to reduce manual toil and align with internal Data Science workflows.',
      'Enabled AI-assisted development for Data Science teams by delivering reusable MCP integrations, prompt patterns, and local agent workflows; reduced repetitive development effort across the team.',
      'Set up centralized process and pipeline monitoring: log aggregation, pipeline health tracking, and operational reporting via Step Functions, Glue, Athena and QuickSight.',
    ],
  },
  {
    company: 'Prisma Medios de Pago',
    role: 'AWS Data Platform Engineer',
    location: 'Argentina',
    startDate: '08/2022',
    endDate: '10/2023',
    responsibilities: [
      'Executed large-scale IaC modernization: migrated platform infrastructure from AWS CDK to Terraform.',
      'Developed data ingestion pipelines using AWS SDLF with event-driven orchestration (SQS, SNS, EventBridge) to process incremental and batch loads from multiple source systems.',
      'Built Salesforce API integration to ingest high-volume daily records into the enterprise Data Lake on S3.',
      'Implemented data quality validation checks and automated monitoring for ingestion pipelines, improving data integrity and reducing incidents.',
      'Integrated infrastructure and data components using Python, Step Functions, Lambda, S3, Glue, EMR, Athena and Terraform.',
    ],
  },
  {
    company: 'Tiendanube',
    role: 'Data Platform Engineer',
    location: 'Argentina',
    startDate: '10/2021',
    endDate: '08/2022',
    responsibilities: [
      'Designed and built ETL pipelines using AWS Glue and Databricks to ingest and transform data into the Lakehouse platform.',
      'Contributed to Lakehouse architecture design, enabling SQL-based data access across teams through Trino.',
      'Developed and maintained ingestion pipelines for the company Lakehouse platform using Databricks and Trino.',
    ],
  },
  {
    company: 'Walmart / Dorinka',
    role: 'Data Engineer',
    location: 'Argentina',
    startDate: '02/2021',
    endDate: '10/2021',
    responsibilities: [
      'Supported data migration and server decommissioning during Walmart Argentina\'s transition to Dorinka, migrating databases to new Oracle Cloud-hosted servers.',
      'Ensured data integrity during migration of operational databases and warehouse schemas into the new environment.',
    ],
  },
  {
    company: 'Tsoft',
    role: 'Data Engineer',
    location: 'Argentina',
    startDate: '10/2020',
    endDate: '02/2021',
    responsibilities: [
      'DirectTV: Developed automation processes for data ingestion and transformation via APIs from multiple external services using Python.',
    ],
  },
  {
    company: 'Monsun',
    role: 'Data Engineer',
    location: 'Argentina',
    startDate: '01/2020',
    endDate: '10/2020',
    responsibilities: [
      'Banco Supervielle: Implemented and tested predictive models in Microsoft SQL Server; developed and tested SQL scripts.',
      'AGIP: Developed automation processes in Python; built ETL pipelines with Pentaho Data Integration and managed SQL Server databases.',
    ],
  },
  {
    company: 'Dthink',
    role: 'Data Engineer',
    location: 'Argentina',
    startDate: '09/2019',
    endDate: '01/2020',
    responsibilities: [
      'Hendel Hogar: Developed SQL Server databases and automated ETL processes using SSIS; created Power BI reports.',
      'Secretaria de Salud: Developed Oracle databases and ETL processes with Pentaho Data Integration; built Metabase dashboards.',
      'Wunderman Thompson: Created Power BI reports for marketing analytics.',
    ],
  },
];

// ── Skills ─────────────────────────────────────────────────────────────────

export const skillCategories: SkillCategory[] = [
  {
    category: 'Cloud & IaC',
    skills: 'AWS · Terraform · AWS CDK · AWS CloudFormation · Lambda · ECS · S3 · Step Functions · SageMaker · Glue · DynamoDB · IAM · ECR · CloudWatch · EMR · SQS · SNS · EventBridge · RDS'.split(' · '),
    proficiency: 5,
  },
  {
    category: 'CI/CD & DevOps',
    skills: 'GitHub Actions · GitLab CI · Bitbucket Pipelines · Docker · Git · Secrets Manager · Parameter Store'.split(' · '),
    proficiency: 5,
  },
  {
    category: 'Data & Processing',
    skills: 'Athena · QuickSight · Databricks · Trino · Data Lake · Batch Processing · SQL · ETL · PySpark · SSIS · Pentaho Data Integration'.split(' · '),
    proficiency: 4,
  },
  {
    category: 'Python Libraries',
    skills: 'Pandas · NumPy · Boto3 · Requests · OCI'.split(' · '),
    proficiency: 4,
  },
  {
    category: 'Databases',
    skills: 'SQL Server · Oracle · BigQuery · ElasticSearch'.split(' · '),
    proficiency: 4,
  },
  {
    category: 'Data Visualization',
    skills: 'Power BI · Metabase · Elastic-Kibana'.split(' · '),
    proficiency: 3,
  },
  {
    category: 'Platform Engineering',
    skills: 'Internal Developer Platforms · FastAPI · React · Cost Observability · Workload Monitoring · Developer Enablement'.split(' · '),
    proficiency: 5,
  },
  {
    category: 'AI Tooling',
    skills: 'AWS Bedrock · MCP · OpenAI APIs · GitHub Copilot · Prompt Engineering'.split(' · '),
    proficiency: 4,
  },
  {
    category: 'Web Dev',
    skills: 'Flask · Bootstrap · HTML5'.split(' · '),
    proficiency: 3,
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
    detail: 'In progress · Amazon Web Services',
  },
  {
    title: 'Data Architect',
    detail: 'NTT Data Academy · 2024',
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
  role: 'Cloud Engineer',
  location: 'Buenos Aires, Argentina',
  email: 'luis.m.paz.03@gmail.com',
  linkedin: 'https://linkedin.com/in/luisarg03',
  github: 'https://github.com/luisarg03',
  availability: 'Currently at Interbank',
  summary:
    'Cloud Engineer with 7+ years building and operating cloud infrastructure, CI/CD pipelines, and data platforms on AWS. Bridges Infrastructure as Code (Terraform, AWS CDK), pipeline automation (GitHub Actions), and data services (Glue, Athena, Databricks) to deliver production platforms. Experience spanning cloud infrastructure, internal developer platforms, cost and workload observability, and AI-assisted developer workflows. Track record enabling Data Science and engineering teams through reusable infrastructure, self-service tooling, and platform engineering.',
};
