// ═══════════════════════════════════════════════════════════════════════════
//  CV — Luis Meyehen Paz  |  Cloud Engineer
//  Layout: single column, ATS-safe
// ═══════════════════════════════════════════════════════════════════════════

#import "templates/layout.typ": *

// ── Page ─────────────────────────────────────────────────────────────────────
#set document(title: "Luis Meyehen Paz — Cloud Engineer")
#set page(
  paper: "a4",
  margin: (x: 1.6cm, top: 1cm, bottom: 1cm),
)
#set text(font: "Inter", size: 8.5pt, fill: ink, lang: "en")
#set par(leading: 0.5em, justify: false)
#set text(hyphenate: false)

// ── Header ───────────────────────────────────────────────────────────────────
#text(size: 20pt, weight: "bold", fill: ink, "Luis Meyehen Paz")
#v(0.08em)
#text(size: 10pt, weight: "semibold", fill: accent, "Cloud Engineer")
#v(0.2em)
#text(size: 8pt, fill: muted, "Buenos Aires, Argentina · luis.m.paz.03@gmail.com · linkedin.com/in/luisarg03 · github.com/luisarg03")

// ── Summary ──────────────────────────────────────────────────────────────────
#section("Summary")
#text(size: 9pt, fill: ink)[
  Cloud Engineer with 7+ years building and operating cloud infrastructure, CI/CD pipelines, and data platforms on AWS. Bridges Infrastructure as Code (Terraform, AWS CDK), pipeline automation (GitHub Actions), and data services (Glue, Athena, Databricks) to deliver production platforms. Experience spanning cloud infrastructure, internal developer platforms, cost and workload observability, and AI-assisted developer workflows. Track record enabling Data Science and engineering teams through reusable infrastructure, self-service tooling, and platform engineering.
]

// ── Experience ───────────────────────────────────────────────────────────────
#section("Experience")

#job(
  "Cloud Platform Engineer", "Interbank", "Peru · Remote", "10/2023 – Present",
  (
    "Built CI/CD pipelines in GitHub Actions and Bitbucket Pipelines, extending a shared template framework with AWS CloudFormation and CDK (Python) to provision and modify cloud infrastructure.",
    "Build and maintain container images (ECR) for SageMaker training pipelines, handling reusable libraries and complex configurations so Data Science teams can focus on model training.",
    "Developed Internal Developer Platform (IDP) features — including a self-service variable catalog (FastAPI + React) — to reduce manual toil and align with internal Data Science workflows.",
    "Enabled AI-assisted development for Data Science teams by delivering reusable MCP integrations, prompt patterns, and local agent workflows; reduced repetitive development effort across the team.",
    "Set up centralized process and pipeline monitoring: log aggregation, pipeline health tracking, and operational reporting via Step Functions, Glue, Athena and QuickSight.",
  )
)

#job(
  "AWS Data Platform Engineer", "Prisma Medios de Pago", "Argentina", "08/2022 – 10/2023",
  (
    "Executed large-scale IaC modernization: migrated platform infrastructure from AWS CDK to Terraform.",
    "Developed data ingestion pipelines using AWS SDLF with event-driven orchestration (SQS, SNS, EventBridge) to process incremental and batch loads from multiple source systems.",
    "Built Salesforce API integration to ingest high-volume daily records into the enterprise Data Lake on S3.",
    "Implemented data quality validation checks and automated monitoring for ingestion pipelines, improving data integrity and reducing incidents.",
    "Integrated infrastructure and data components using Python, Step Functions, Lambda, S3, Glue, EMR, Athena and Terraform.",
  )
)

#job(
  "Data Platform Engineer", "Tiendanube", "Argentina", "10/2021 – 08/2022",
  (
    "Designed and built ETL pipelines using AWS Glue and Databricks to ingest and transform data into the Lakehouse platform.",
    "Contributed to Lakehouse architecture design, enabling SQL-based data access across teams through Trino.",
    "Developed and maintained ingestion pipelines for the company Lakehouse platform using Databricks and Trino.",
  )
)

#job(
  "Data Engineer", "Walmart / Dorinka", "Argentina", "02/2021 – 10/2021",
  (
    "Supported data migration and server decommissioning during Walmart Argentina's transition to Dorinka, migrating databases to new Oracle Cloud-hosted servers.",
    "Ensured data integrity during migration of operational databases and warehouse schemas into the new environment.",
  )
)

#job(
  "Data Engineer", "Tsoft", "Argentina", "10/2020 – 02/2021",
  (
    "DirectTV: Developed automation processes for data ingestion and transformation via APIs from multiple external services using Python.",
  )
)

#job(
  "Data Engineer", "Monsun", "Argentina", "01/2020 – 10/2020",
  (
    "Banco Supervielle: Implemented and tested predictive models in Microsoft SQL Server; developed and tested SQL scripts.",
    "AGIP: Developed automation processes in Python; built ETL pipelines with Pentaho Data Integration and managed SQL Server databases.",
  )
)

#job(
  "Data Engineer", "Dthink", "Argentina", "09/2019 – 01/2020",
  (
    "Hendel Hogar: Developed SQL Server databases and automated ETL processes using SSIS; created Power BI reports.",
    "Secretaria de Salud: Developed Oracle databases and ETL processes with Pentaho Data Integration; built Metabase dashboards.",
    "Wunderman Thompson: Created Power BI reports for marketing analytics.",
  )
)

// ── Technical Skills ─────────────────────────────────────────────────────────
#section("Technical Skills")
#skill-row("Cloud & IaC", "AWS · Terraform · AWS CDK · AWS CloudFormation · Lambda · ECS · S3 · Step Functions · SageMaker · Glue · DynamoDB · IAM · ECR · CloudWatch · EMR · SQS · SNS · EventBridge · RDS")
#skill-row("CI/CD & DevOps", "GitHub Actions · GitLab CI · Bitbucket Pipelines · Docker · Git · Secrets Manager · Parameter Store")
#skill-row("Data & Processing", "Athena · QuickSight · Databricks · Trino · Data Lake · Batch Processing · SQL · ETL · PySpark · SSIS · Pentaho Data Integration")
#skill-row("Python Libraries", "Pandas · NumPy · Boto3 · Requests · OCI")
#skill-row("Databases", "SQL Server · Oracle · BigQuery · ElasticSearch")
#skill-row("Data Visualization", "Power BI · Metabase · Elastic-Kibana")
#skill-row("Platform Engineering", "Internal Developer Platforms (IDP) · FastAPI · React · Cost Observability · Workload Monitoring · Developer Enablement")
#skill-row("AI Tooling", "AWS Bedrock · MCP · OpenAI APIs · GitHub Copilot · Prompt Engineering")
#skill-row("Web Dev", "Flask · Bootstrap · HTML5")
#skill-row("Languages", "Python · SQL · Bash · YAML")

// ── Education & Certifications ────────────────────────────────────────────────
#section("Education & Certifications")
#text(weight: "bold", size: 9pt, fill: ink, "AWS Certified DevOps Engineer Professional (DOP-C02)")
#text(size: 8.8pt, fill: muted, " — In progress · Amazon Web Services")
#v(0.2em)
#linebreak()
#text(weight: "bold", size: 9pt, fill: ink, "Data Architect")
#text(size: 8.8pt, fill: muted, " — NTT Data Academy · 2024")

// ── Languages ────────────────────────────────────────────────────────────────
#section("Languages")
#text(size: 9pt, fill: ink, "Spanish — Native · English — Reading: Intermediate / Writing: Basic / Speaking: Basic")
