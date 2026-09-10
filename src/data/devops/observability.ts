import type { Question } from '../../types';

export const observabilityQuestions: Question[] = [
  {
    id: 'do-obs-001',
    topic: 'Observability & SRE',
    difficulty: 'easy',
    question: 'What are the three commonly cited pillars of observability?',
    options: [
      'Metrics, logs, and traces',
      'Alerts, dashboards, and runbooks',
      'CPU, memory, and disk',
      'Availability, latency, and cost',
    ],
    answers: [0],
    explanation:
      'Metrics give cheap aggregate trends, logs give detailed discrete events, and traces show causal request flow across services. Together they let you ask new questions about a system without shipping new code.',
  },
  {
    id: 'do-obs-002',
    topic: 'Observability & SRE',
    difficulty: 'medium',
    question: 'What is the difference between monitoring and observability?',
    options: [
      'Monitoring watches predefined failure modes; observability is the property of being able to explain novel, unanticipated behaviour from telemetry',
      'Observability is the open-source version of monitoring',
      'Monitoring uses logs; observability uses metrics',
      'They are marketing terms for the same thing',
    ],
    answers: [0],
    explanation:
      'Monitoring answers known questions ("is CPU above 90%?"). Observability is about having enough high-cardinality context to debug the unknown-unknowns you did not think to alert on.',
  },
  {
    id: 'do-obs-003',
    topic: 'Observability & SRE',
    difficulty: 'medium',
    question: 'What are the four golden signals of SRE monitoring?',
    options: [
      'Latency, traffic, errors, and saturation',
      'CPU, memory, disk, and network',
      'Availability, durability, scalability, and security',
      'Deploys, incidents, tickets, and MTTR',
    ],
    answers: [0],
    explanation:
      'Google\'s golden signals focus on user-visible service health rather than machine internals, so they generalise across almost any request-driven system.',
  },
  {
    id: 'do-obs-004',
    topic: 'Observability & SRE',
    difficulty: 'medium',
    question: 'What is the USE method used for?',
    options: [
      'Analysing resources by Utilisation, Saturation, and Errors to find bottlenecks',
      'Estimating user experience scores',
      'Calculating uptime SLAs',
      'Structuring incident postmortems',
    ],
    answers: [0],
    explanation:
      'USE (Brendan Gregg) is resource-oriented and complements the request-oriented RED/golden-signals view: for every resource, check utilisation, saturation, and errors.',
  },
  {
    id: 'do-obs-005',
    topic: 'Observability & SRE',
    difficulty: 'hard',
    question: 'Why is a p99 latency figure usually more actionable than an average?',
    options: [
      'Averages hide the tail; a small fraction of very slow requests can dominate user pain and are invisible in the mean',
      'p99 is cheaper to compute',
      'Averages cannot be graphed over time',
      'p99 is always lower than the average',
    ],
    answers: [0],
    explanation:
      'Latency distributions are heavily skewed. High percentiles expose queuing, GC pauses, and lock contention that a mean smooths away — and every user hits the tail eventually.',
  },
  {
    id: 'do-obs-006',
    topic: 'Observability & SRE',
    difficulty: 'hard',
    question: 'Why can you not simply average p99 values from multiple instances to get a fleet-wide p99?',
    options: [
      'Percentiles are not additive or averageable; you need the underlying distribution (e.g. histogram buckets) to compute an aggregate quantile',
      'Instances use different clocks',
      'p99 is stored as a string',
      'You can, and it is exact',
    ],
    answers: [0],
    explanation:
      'This is why Prometheus histograms store bucket counts: `histogram_quantile()` aggregates buckets across series first, then computes the quantile.',
  },
  {
    id: 'do-obs-007',
    topic: 'Observability & SRE',
    difficulty: 'medium',
    question: 'What is an SLI, an SLO, and an SLA respectively?',
    options: [
      'A measured indicator, an internal target for that indicator, and an external contractual commitment with consequences',
      'A log, a metric, and a trace',
      'Three names for the same availability number',
      'An alert, a dashboard, and a report',
    ],
    answers: [0],
    explanation:
      'SLIs are the measurement, SLOs the target you engineer toward, and SLAs the customer-facing promise — normally set looser than the SLO to leave engineering headroom.',
  },
  {
    id: 'do-obs-008',
    topic: 'Observability & SRE',
    difficulty: 'medium',
    question: 'What is an error budget?',
    options: [
      'The allowed amount of unreliability implied by an SLO, used to balance feature velocity against stability work',
      'The money set aside to fix incidents',
      'The maximum number of failed builds per sprint',
      'The count of alerts a team may receive',
    ],
    answers: [0],
    explanation:
      'A 99.9% SLO permits 0.1% failure. While budget remains, ship features; when it is exhausted, the policy shifts the team to reliability work. It converts reliability into an objective decision rule.',
  },
  {
    id: 'do-obs-009',
    topic: 'Observability & SRE',
    difficulty: 'hard',
    question: 'What does multi-window, multi-burn-rate alerting achieve?',
    options: [
      'It pages quickly on fast budget burn while using longer windows to avoid alerting on brief, insignificant blips',
      'It sends alerts to multiple channels',
      'It reduces metric storage costs',
      'It merges alerts from several services',
    ],
    answers: [0],
    explanation:
      'Combining a short and a long window at each burn rate gives both fast detection and low false-positive rate, and automatically resets when the condition clears.',
  },
  {
    id: 'do-obs-010',
    topic: 'Observability & SRE',
    difficulty: 'medium',
    question: 'Which properties should a page-worthy alert have? (Select all that apply)',
    options: [
      'It is symptom-based and reflects real user impact',
      'It is actionable — there is something a human can do right now',
      'It links to a runbook with context',
      'It fires on every anomaly in any internal metric',
    ],
    answers: [0, 1, 2],
    explanation:
      'Cause-based alerts on internal metrics generate noise and fatigue. Page on user-visible symptoms; keep cause metrics for dashboards and diagnosis.',
  },
  {
    id: 'do-obs-011',
    topic: 'Observability & SRE',
    difficulty: 'medium',
    question: 'How does Prometheus collect metrics by default?',
    options: [
      'It scrapes HTTP endpoints exposing metrics in a text exposition format at a configured interval',
      'Applications push metrics to it over UDP',
      'It tails log files',
      'It queries a central SQL database',
    ],
    answers: [0],
    explanation:
      'The pull model makes target health explicit (a failed scrape is itself a signal) and simplifies service discovery. Push is available via the Pushgateway for short-lived batch jobs.',
  },
  {
    id: 'do-obs-012',
    topic: 'Observability & SRE',
    difficulty: 'hard',
    question: 'Why is high-cardinality labelling dangerous in a metrics system like Prometheus?',
    options: [
      'Every unique label combination creates a separate time series, so unbounded values like user ID or request ID explode memory and storage',
      'Labels are not indexed',
      'Cardinality breaks the scrape protocol',
      'High cardinality is only a problem for logs',
    ],
    answers: [0],
    explanation:
      'Put unbounded identifiers in logs or traces, which are designed for high cardinality, and keep metric labels to bounded dimensions such as service, endpoint class, and status code.',
  },
  {
    id: 'do-obs-013',
    topic: 'Observability & SRE',
    difficulty: 'medium',
    question: 'What is distributed tracing context propagation?',
    options: [
      'Passing trace and span identifiers across service boundaries (usually in headers) so spans can be assembled into one end-to-end trace',
      'Copying logs between services',
      'Replicating metrics across regions',
      'Synchronising clocks between nodes',
    ],
    answers: [0],
    explanation:
      'W3C Trace Context (`traceparent`) standardises this. Any service that drops the header breaks the trace into disconnected fragments.',
  },
  {
    id: 'do-obs-014',
    topic: 'Observability & SRE',
    difficulty: 'medium',
    question: 'What does OpenTelemetry provide?',
    options: [
      'Vendor-neutral APIs, SDKs, and a collector for generating and exporting metrics, logs, and traces',
      'A hosted dashboarding service',
      'A time-series database',
      'An incident management platform',
    ],
    answers: [0],
    explanation:
      'OTel decouples instrumentation from the backend: instrument once, then route telemetry to any compatible vendor via the collector without changing application code.',
  },
  {
    id: 'do-obs-015',
    topic: 'Observability & SRE',
    difficulty: 'medium',
    question: 'Why is structured logging preferred over free-text logs?',
    options: [
      'Key/value or JSON fields can be indexed, filtered, and aggregated reliably without brittle regex parsing',
      'Structured logs use less disk space',
      'Free-text logs cannot be written to stdout',
      'Structured logs are automatically encrypted',
    ],
    answers: [0],
    explanation:
      'Structured logs also carry consistent correlation fields (trace_id, request_id, tenant), which is what makes jumping between logs and traces possible.',
  },
  {
    id: 'do-obs-016',
    topic: 'Observability & SRE',
    difficulty: 'hard',
    question: 'What is tail-based sampling in tracing and why use it?',
    options: [
      'The sampling decision is made after the trace completes, so slow or erroring traces can be kept while routine ones are dropped',
      'Only the last span of each trace is stored',
      'Traces are sampled from the tail of the log file',
      'It samples a fixed 1% of requests at ingress',
    ],
    answers: [0],
    explanation:
      'Head-based sampling decides at the first span and cannot know the outcome. Tail-based sampling retains the interesting traces at a fraction of the cost, but requires buffering full traces in a collector.',
  },
  {
    id: 'do-obs-017',
    topic: 'Observability & SRE',
    difficulty: 'medium',
    question: 'What is the purpose of a blameless postmortem?',
    options: [
      'To surface systemic and contributing factors honestly by removing fear of individual punishment',
      'To determine which engineer caused the outage',
      'To satisfy an audit requirement',
      'To estimate the financial loss',
    ],
    answers: [0],
    explanation:
      'People act rationally given the information and tools they had. Blame suppresses information; blamelessness surfaces the process and system weaknesses that actually need fixing.',
  },
  {
    id: 'do-obs-018',
    topic: 'Observability & SRE',
    difficulty: 'medium',
    question: 'What roles are typically defined in an incident command structure? (Select all that apply)',
    options: [
      'Incident commander who coordinates and makes decisions',
      'Communications lead who handles stakeholder and customer updates',
      'Operations/subject-matter responders doing hands-on mitigation',
      'A designated engineer to be held responsible afterwards',
    ],
    answers: [0, 1, 2],
    explanation:
      'Clear roles prevent duplicated work and unmanaged communications during an incident. Assigning blame is explicitly not part of incident response.',
  },
  {
    id: 'do-obs-019',
    topic: 'Observability & SRE',
    difficulty: 'medium',
    question: 'During an active incident, what should the first priority be?',
    options: [
      'Mitigate customer impact — restore service — before performing deep root cause analysis',
      'Find the root cause before changing anything',
      'Write the postmortem document',
      'Identify who deployed the change',
    ],
    answers: [0],
    explanation:
      'Stop the bleeding first: roll back, fail over, shed load, or flip a feature flag. Diagnosis continues afterwards with the pressure off, using preserved telemetry.',
  },
  {
    id: 'do-obs-020',
    topic: 'Observability & SRE',
    difficulty: 'hard',
    question: 'What is chaos engineering?',
    options: [
      'Running controlled experiments that inject realistic failures to validate a hypothesis about system resilience',
      'Randomly deleting production resources without warning',
      'Load testing to find capacity limits',
      'Fuzzing application inputs',
    ],
    answers: [0],
    explanation:
      'Proper chaos engineering has a steady-state hypothesis, a limited blast radius, an abort condition, and ideally runs in production where the real failure modes live.',
  },
  {
    id: 'do-obs-021',
    topic: 'Observability & SRE',
    difficulty: 'medium',
    question: 'What is toil in SRE terms?',
    options: [
      'Manual, repetitive, automatable work that scales linearly with service growth and adds no enduring value',
      'Any operational work',
      'On-call time',
      'Time spent in meetings',
    ],
    answers: [0],
    explanation:
      'Capping toil (commonly at 50% of an SRE\'s time) protects capacity for engineering work that structurally reduces future operational load.',
  },
  {
    id: 'do-obs-022',
    topic: 'Observability & SRE',
    difficulty: 'medium',
    question: 'Why should dashboards distinguish between symptom panels and cause panels?',
    options: [
      'Responders need to establish user impact first, then drill into likely causes; mixing them slows triage',
      'Symptom panels render faster',
      'Cause panels require different data sources',
      'It is only a stylistic preference',
    ],
    answers: [0],
    explanation:
      'A good service dashboard leads with the golden signals for the service, then offers dependency and resource panels beneath for diagnosis.',
  },
  {
    id: 'do-obs-023',
    topic: 'Observability & SRE',
    difficulty: 'hard',
    question: 'A service\'s availability SLO is met but users complain. What are plausible explanations? (Select all that apply)',
    options: [
      'The SLI measures server-side success and misses client-side or network failures',
      'The SLO is averaged over a long window that hides short, severe outages',
      'Impact is concentrated in a subset of users or regions that the aggregate hides',
      'Users are always wrong when the SLO is green',
    ],
    answers: [0, 1, 2],
    explanation:
      'Aggregate, server-measured SLIs routinely hide per-tenant or per-region pain. Slicing SLIs by customer, region, and client type reveals it.',
  },
  {
    id: 'do-obs-024',
    topic: 'Observability & SRE',
    difficulty: 'medium',
    question: 'What is the value of a runbook?',
    options: [
      'It captures diagnostic steps and safe mitigations so any responder can act consistently under pressure',
      'It replaces monitoring',
      'It documents the system architecture for new hires only',
      'It is required for SOC 2 and has no operational value',
    ],
    answers: [0],
    explanation:
      'Runbooks reduce time-to-mitigate and reliance on individual memory. The best ones are short, linked from the alert, and get pruned as steps are automated away.',
  },
  {
    id: 'do-obs-025',
    topic: 'Observability & SRE',
    difficulty: 'medium',
    question: 'Why should alerting rules themselves be version-controlled and code-reviewed?',
    options: [
      'They are production configuration whose errors cause missed incidents or alert storms, so they need the same rigour as application code',
      'Version control makes them evaluate faster',
      'It is required by Prometheus',
      'To allow rollback of metric data',
    ],
    answers: [0],
    explanation:
      'Alerts-as-code gives review, history, testing (e.g. promtool unit tests), and consistent deployment across environments.',
  },
];
