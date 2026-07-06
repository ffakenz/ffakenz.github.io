export const profile = {
  name: "Franco Testagrossa",
  tagline: "Computer Scientist · Software Craftsman · Blockchain Advocate · AI Enthusiast",
  location: "Córdoba, Argentina",
  origin: "Born in Italy · raised in Argentina",
  interests: ["Boxing", "asados", "music"],
  links: {
    linkedin: "https://www.linkedin.com/in/franco-testagrossa/",
    github: "https://github.com/ffakenz",
    cv: "/Franco-Testagrossa-CV.pdf",
  },
  summary:
    "Passionate engineer focused on high-throughput, event-driven, distributed systems. Core contributor to Cardano's Hydra — an open-source layer-2 scaling protocol — and led multi-provider payment integrations for LATAM's largest e-commerce. Operate with domain-level ownership: driving architecture across teams, setting the reliability and quality bar, and mentoring engineers. Conference speaker and open-source maintainer.",
  stats: [
    { value: 10, suffix: "+", label: "yrs building systems" },
    { value: 9, suffix: "", label: "yrs with Scala" },
    { value: 5, suffix: "", label: "companies" },
  ],
  experience: [
    {
      company: "Input Output (IOHK)",
      title: "Software Engineer — Hydra Protocol",
      dates: "Jul 2022 – Feb 2026",
      location: "Remote",
      context: "Core contributor to Hydra — Cardano's open-source layer-2 protocol for fast, low-cost payments — in a research-first environment.",
      bullets: [
        "Drove protocol and state-machine architecture independently, adopted across squads; co-authored major updates (incremental commit/decommit, deposit recovery with deterministic FIFO ordering).",
        "Guaranteed fund safety: made deposited funds recoverable from any protocol state and added side-loaded snapshot recovery for stuck heads, avoiding costly on-chain settlement.",
        "Owned production reliability — event-log checkpointing/rotation, network fault-tolerance test suites, Prometheus/Grafana observability, and same-day root-cause of a silent node hang under load during the Midnight GlacierDrop.",
        "Core maintainer of three tools (hydra-tui, hydra-chain-observer, hydra-explorer), maintained the formal specification with researchers, onboarded most of the team, and delivered IOG's \"Developing Hydra\" masterclass at the 2023 Cardano Summit.",
      ],
      stack: ["Haskell", "Plutus", "Nix", "Docker", "Prometheus/Grafana", "event-sourcing"],
    },
    {
      company: "Valsea IT",
      title: "Software Engineer — Analytics Platform",
      dates: "Sep 2020 – Jun 2022",
      location: "Marbella",
      context: "Founding-team engineer on a multi-tenant licensed online-gaming platform — 24+ providers, 3,000+ games, 6 brands across 3 regulatory licenses.",
      bullets: [
        "Led the analytics domain — metrics, audit reports, and insights via a GraphQL back-office over Elasticsearch and Druid, fed from Kafka through parallel event-consumer and Spark-pipeline ingestion.",
        "Built a Google-Analytics-style query API translating client requests into Druid queries with post-aggregation metrics and currency conversion.",
      ],
      stack: ["AWS EKS", "k8s", "Terraform", "Cassandra", "Kafka", "Sangria GraphQL", "Akka", "Druid", "Spark", "Rust"],
    },
    {
      company: "Letgo",
      title: "Software Engineer",
      dates: "Nov 2019 – Aug 2020",
      location: "Barcelona",
      context: "",
      bullets: [
        "Built the rules-engine (\"brain of the platform\") for a second-hand marketplace on Siddhi complex-event processing — taking a Java POC to a production Scala system with the lead architects.",
        "Managed k8s rules-cluster state, rule versioning, and debug-mode execution; earlier contributed to the akka-cluster chat platform.",
      ],
      stack: ["AWS EKS", "k8s", "Terraform", "DynamoDB", "Kafka", "Siddhi", "AWS SQS/SNS"],
    },
    {
      company: "Tiendanube",
      title: "Technical Lead — Payments Platform",
      dates: "Jun 2018 – Oct 2019",
      location: "Buenos Aires",
      context: "Led the payments platform for the largest e-commerce in LATAM.",
      bullets: [
        "Designed a plugin architecture where each payment-provider integration ran as its own state machine and reconciled the core payment system on every provider/system event — the reusable pattern every new integration followed.",
        "Integrated multiple payment providers across countries, regulations, security profiles, and SLA regimes.",
        "Owned system design, backlog prioritization (RICE), and third-party integration governance (audits and SLAs).",
      ],
      stack: ["AWS EKS", "k8s", "Terraform", "Akka Cluster", "MongoDB", "Akka Persistence", "Kafka"],
    },
    {
      company: "Wicom",
      title: "Data Engineer",
      dates: "Jun 2015 – May 2018",
      location: "Argentina",
      context: "",
      bullets: ["First professional role, in data engineering."],
      stack: [],
    },
  ],
  skills: [
    { group: "Languages", items: ["Scala (9y)", "Haskell (4y)", "Rust (4y)"] },
    { group: "Backend", items: ["Akka (6y)", "Typelevel (6y)", "ZIO (4y)"] },
    { group: "Cloud", items: ["AWS (7y)", "GCP (2y)"] },
    { group: "Infrastructure", items: ["Docker (7y)", "Kubernetes (7y)", "Terraform (7y)"] },
    { group: "Data & streaming", items: ["Kafka (7y)", "Spark (3y)", "Druid", "Elasticsearch", "Cassandra", "DynamoDB", "PostgreSQL"] },
    { group: "Domain & focus", items: ["Payments & multi-PSP", "Blockchain / smart contracts", "Event-driven / CQRS", "Microservices & APIs", "Observability", "AI (Claude Code, Codex)"] },
  ],
  education: [
    { school: "Universidad Blas Pascal", program: "Informatics Engineering (Software Engineering)", dates: "2013 – 2019", note: "" },
    { school: "Universidad Blas Pascal", program: "Teaching Assistant, Basic Sciences", dates: "Jan 2014 – Dec 2015", note: "Tutored and supported undergraduate students in foundational science courses." },
  ],
} as const;

export type Profile = typeof profile;
