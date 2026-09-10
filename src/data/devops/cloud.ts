import type { Question } from '../../types';

export const cloudNetworkingQuestions: Question[] = [
  {
    id: 'do-cld-001',
    topic: 'Cloud & Networking',
    difficulty: 'easy',
    question: 'What does the shared responsibility model mean in public cloud?',
    options: [
      'The provider secures the infrastructure "of" the cloud; the customer secures what they run "in" the cloud',
      'The provider is responsible for all security',
      'The customer is responsible for physical data centre security',
      'Responsibility rotates monthly',
    ],
    answers: [0],
    explanation:
      'Providers cover hardware, hypervisor, and facility security. Customers own identity, network configuration, OS patching (for IaaS), data classification, and application security.',
  },
  {
    id: 'do-cld-002',
    topic: 'Cloud & Networking',
    difficulty: 'easy',
    question: 'What is the difference between an availability zone and a region?',
    options: [
      'A region is a geographic area containing multiple isolated availability zones connected by low-latency links',
      'An availability zone contains multiple regions',
      'They are the same concept',
      'Regions are logical; availability zones are billing constructs',
    ],
    answers: [0],
    explanation:
      'Spreading across AZs protects against a single data centre failure with negligible latency cost; spreading across regions protects against regional failure but adds latency and data-transfer cost.',
  },
  {
    id: 'do-cld-003',
    topic: 'Cloud & Networking',
    difficulty: 'medium',
    question: 'What distinguishes a security group from a network ACL in AWS-style networking?',
    options: [
      'Security groups are stateful and attach to instances/ENIs; network ACLs are stateless and attach to subnets',
      'Security groups are stateless; NACLs are stateful',
      'Both are stateful',
      'NACLs only support allow rules',
    ],
    answers: [0],
    explanation:
      'Because security groups are stateful, allowing inbound traffic automatically permits the return path. Stateless NACLs require explicit rules for both directions, including ephemeral ports.',
  },
  {
    id: 'do-cld-004',
    topic: 'Cloud & Networking',
    difficulty: 'medium',
    question: 'What is CIDR notation `10.0.0.0/24` describing?',
    options: [
      'A network with 24 usable addresses',
      'A network whose first 24 bits are the network prefix, leaving 256 total addresses',
      'A network with 24 subnets',
      'A routing metric of 24',
    ],
    answers: [1],
    explanation:
      'The suffix is the prefix length in bits. /24 leaves 8 host bits → 256 addresses, of which cloud providers typically reserve about five.',
  },
  {
    id: 'do-cld-005',
    topic: 'Cloud & Networking',
    difficulty: 'medium',
    question: 'Why place application servers in private subnets with a NAT gateway rather than public subnets?',
    options: [
      'Instances can reach the internet for updates while remaining unreachable from inbound internet traffic',
      'It reduces data transfer costs',
      'Private subnets have faster networking',
      'It is required for DNS resolution',
    ],
    answers: [0],
    explanation:
      'The NAT gateway provides outbound-only connectivity. Combined with a load balancer in the public subnet, this keeps the application tier off the public internet.',
  },
  {
    id: 'do-cld-006',
    topic: 'Cloud & Networking',
    difficulty: 'hard',
    question: 'Which are valid strategies to reduce cloud egress and inter-AZ data transfer costs? (Select all that apply)',
    options: [
      'Use VPC endpoints / private service connectivity instead of routing through NAT gateways to reach managed services',
      'Keep chatty services and their data in the same availability zone where availability requirements allow',
      'Put a CDN in front of static and cacheable content',
      'Increase instance sizes',
    ],
    answers: [0, 1, 2],
    explanation:
      'Private endpoints, zone-aware routing, and CDN caching all reduce billable transfer. Instance size affects compute cost, not data transfer.',
  },
  {
    id: 'do-cld-007',
    topic: 'Cloud & Networking',
    difficulty: 'medium',
    question: 'What is the principle of least privilege in cloud IAM?',
    options: [
      'Grant only the permissions required to perform a task, for only as long as needed',
      'Give every engineer read-only access',
      'Use one shared admin account with strong MFA',
      'Rotate credentials weekly',
    ],
    answers: [0],
    explanation:
      'Least privilege limits blast radius. In practice it means scoped, resource-specific policies, short-lived role assumption, and periodic access reviews.',
  },
  {
    id: 'do-cld-008',
    topic: 'Cloud & Networking',
    difficulty: 'medium',
    question: 'Why should workloads use IAM roles/managed identities rather than embedded access keys?',
    options: [
      'Roles issue short-lived, automatically rotated credentials with no secret to store or leak',
      'Roles have higher API rate limits',
      'Access keys do not support MFA',
      'Roles are cheaper',
    ],
    answers: [0],
    explanation:
      'Instance/pod identities are delivered through the metadata service or a projected token and rotate automatically, removing the biggest source of credential leakage.',
  },
  {
    id: 'do-cld-009',
    topic: 'Cloud & Networking',
    difficulty: 'medium',
    question: 'What does a layer 7 load balancer do that a layer 4 load balancer does not?',
    options: [
      'Inspect and route on HTTP attributes such as host, path, headers, and cookies',
      'Distribute traffic across targets',
      'Perform health checks',
      'Terminate TCP connections',
    ],
    answers: [0],
    explanation:
      'L4 balances TCP/UDP flows without understanding payloads. L7 parses HTTP, enabling path-based routing, header manipulation, retries, and content-aware policies.',
  },
  {
    id: 'do-cld-010',
    topic: 'Cloud & Networking',
    difficulty: 'hard',
    question: 'A service is intermittently unreachable right after scaling. DNS-based service discovery is in use. What is the most likely cause?',
    options: [
      'Clients are caching DNS records past their TTL and continue sending traffic to terminated instances',
      'The load balancer is misconfigured for HTTP/2',
      'The VPC ran out of route table entries',
      'The security group is stateless',
    ],
    answers: [0],
    explanation:
      'Many runtimes cache DNS indefinitely or ignore TTLs. Short TTLs plus client-side refresh, or a load balancer with a stable address, avoid stale-endpoint traffic.',
  },
  {
    id: 'do-cld-011',
    topic: 'Cloud & Networking',
    difficulty: 'medium',
    question: 'What is the difference between vertical and horizontal scaling?',
    options: [
      'Vertical adds capacity to a single instance; horizontal adds more instances',
      'Vertical adds more instances; horizontal adds capacity to one instance',
      'Vertical only applies to databases',
      'Horizontal requires a service mesh',
    ],
    answers: [0],
    explanation:
      'Vertical scaling is simple but bounded by the largest instance and usually needs a restart. Horizontal scaling is elastic and fault-tolerant but requires the workload to be stateless or shard-aware.',
  },
  {
    id: 'do-cld-012',
    topic: 'Cloud & Networking',
    difficulty: 'medium',
    question: 'Which pricing models typically reduce steady-state cloud compute cost? (Select all that apply)',
    options: [
      'Reserved instances or committed-use discounts for predictable baseline load',
      'Savings plans covering a committed spend level',
      'Spot/preemptible instances for interruption-tolerant workloads',
      'On-demand pricing for all workloads',
    ],
    answers: [0, 1, 2],
    explanation:
      'Commitments discount predictable baselines and spot capacity discounts fault-tolerant batch work. On-demand is the most expensive per unit and should cover only variable peaks.',
  },
  {
    id: 'do-cld-013',
    topic: 'Cloud & Networking',
    difficulty: 'hard',
    question: 'Why is exposing the cloud instance metadata service to application code a security concern?',
    options: [
      'A server-side request forgery bug can make the application fetch instance credentials from the metadata endpoint and leak them',
      'It increases network latency',
      'It disables IAM roles',
      'It bypasses DNS',
    ],
    answers: [0],
    explanation:
      'This is the classic SSRF-to-credential-theft path. Mitigations include IMDSv2-style session-token requirements, hop-limit settings, and blocking the metadata IP from application namespaces.',
  },
  {
    id: 'do-cld-014',
    topic: 'Cloud & Networking',
    difficulty: 'medium',
    question: 'What does mutual TLS (mTLS) add over standard TLS?',
    options: [
      'The client also presents a certificate, so both sides authenticate each other',
      'Stronger cipher suites',
      'Compression of the payload',
      'Automatic certificate renewal',
    ],
    answers: [0],
    explanation:
      'mTLS gives cryptographic workload identity, which is the basis for zero-trust service-to-service authorisation in service meshes such as Istio or Linkerd.',
  },
  {
    id: 'do-cld-015',
    topic: 'Cloud & Networking',
    difficulty: 'medium',
    question: 'What is the purpose of a service mesh?',
    options: [
      'To move cross-cutting concerns — mTLS, retries, timeouts, traffic splitting, telemetry — out of application code into a sidecar or node proxy layer',
      'To replace the CNI plugin',
      'To provide persistent storage',
      'To schedule pods',
    ],
    answers: [0],
    explanation:
      'A mesh gives uniform, language-agnostic traffic management and observability, at the cost of extra latency, resource overhead, and operational complexity.',
  },
  {
    id: 'do-cld-016',
    topic: 'Cloud & Networking',
    difficulty: 'easy',
    question: 'What is the CAP theorem\'s practical implication for distributed systems?',
    options: [
      'When a network partition occurs you must choose between consistency and availability',
      'You can always have all three properties with enough replicas',
      'Partitions never happen in a single region',
      'Consistency and availability are the same property',
    ],
    answers: [0],
    explanation:
      'Partition tolerance is not optional in a real network, so the real design decision is how the system behaves during a partition: reject requests (CP) or serve possibly stale data (AP).',
  },
  {
    id: 'do-cld-017',
    topic: 'Cloud & Networking',
    difficulty: 'hard',
    question: 'Which techniques prevent a retry storm from turning a partial failure into a full outage? (Select all that apply)',
    options: [
      'Exponential backoff with jitter',
      'Circuit breakers that stop calling a failing dependency',
      'A retry budget capping the fraction of traffic that may be retries',
      'Unlimited immediate retries to maximise success rate',
    ],
    answers: [0, 1, 2],
    explanation:
      'Naive retries multiply load exactly when a dependency is already struggling. Backoff+jitter, circuit breaking, and retry budgets bound the amplification.',
  },
  {
    id: 'do-cld-018',
    topic: 'Cloud & Networking',
    difficulty: 'medium',
    question: 'What is the difference between RTO and RPO?',
    options: [
      'RTO is how long recovery may take; RPO is how much data loss is acceptable',
      'RTO is data loss tolerance; RPO is recovery duration',
      'Both measure uptime',
      'RPO applies only to backups of virtual machines',
    ],
    answers: [0],
    explanation:
      'Recovery Time Objective drives failover architecture; Recovery Point Objective drives backup/replication frequency. Tighter targets cost more.',
  },
  {
    id: 'do-cld-019',
    topic: 'Cloud & Networking',
    difficulty: 'medium',
    question: 'Why is a backup untested until it has been restored?',
    options: [
      'Backups can silently fail, be encrypted with a lost key, or omit required data — only a restore drill proves recoverability',
      'Restores are always faster than backups',
      'Backup tooling deletes data after 30 days',
      'It is a compliance formality with no technical basis',
    ],
    answers: [0],
    explanation:
      'Regular restore exercises validate integrity, completeness, key availability, and that the documented RTO is actually achievable.',
  },
  {
    id: 'do-cld-020',
    topic: 'Cloud & Networking',
    difficulty: 'medium',
    question: 'What does an Auto Scaling group\'s health check integration with a load balancer provide?',
    options: [
      'Instances failing load balancer health checks are replaced, not just removed from rotation',
      'It caps the maximum instance size',
      'It enables spot pricing',
      'It provides DNS failover',
    ],
    answers: [0],
    explanation:
      'Using ELB health checks (rather than only EC2 status checks) means application-level failures trigger instance replacement, restoring capacity automatically.',
  },
  {
    id: 'do-cld-021',
    topic: 'Cloud & Networking',
    difficulty: 'hard',
    question: 'Which statements about multi-region active-active architectures are true? (Select all that apply)',
    options: [
      'They require a data strategy that tolerates cross-region replication lag or uses conflict resolution',
      'They significantly increase operational and testing complexity',
      'They can improve latency by serving users from the nearest region',
      'They eliminate the need for backups',
    ],
    answers: [0, 1, 2],
    explanation:
      'Active-active buys availability and latency at the price of distributed data consistency challenges. Backups remain essential — replication propagates logical corruption and deletions.',
  },
  {
    id: 'do-cld-022',
    topic: 'Cloud & Networking',
    difficulty: 'medium',
    question: 'What problem does a CDN primarily solve?',
    options: [
      'It caches content at edge locations near users, cutting latency and origin load',
      'It encrypts data at rest',
      'It replaces the load balancer',
      'It provides database replication',
    ],
    answers: [0],
    explanation:
      'CDNs also absorb traffic spikes and provide a DDoS-absorbing layer, but the core value is edge caching for latency and origin offload.',
  },
  {
    id: 'do-cld-023',
    topic: 'Cloud & Networking',
    difficulty: 'medium',
    question: 'What is the purpose of a bastion host or session-manager style access?',
    options: [
      'To provide a single audited, hardened entry point for administrative access to private resources',
      'To load balance traffic',
      'To cache DNS entries',
      'To store backups',
    ],
    answers: [0],
    explanation:
      'Modern equivalents (SSM Session Manager, IAP, Teleport) remove the need for open SSH ports entirely while adding identity-based access and full session recording.',
  },
  {
    id: 'do-cld-024',
    topic: 'Cloud & Networking',
    difficulty: 'hard',
    question: 'A managed database is hitting connection limits as the number of application pods grows. What is the standard fix?',
    options: [
      'Introduce a connection pooler (e.g. PgBouncer/RDS Proxy) between the application and the database',
      'Increase the pod CPU limits',
      'Switch to a NoSQL database',
      'Enable multi-AZ failover',
    ],
    answers: [0],
    explanation:
      'Each pod holding its own pool multiplies connections. An external pooler multiplexes many client connections onto a small number of server connections.',
  },
  {
    id: 'do-cld-025',
    topic: 'Cloud & Networking',
    difficulty: 'medium',
    question: 'Why is it recommended to separate environments into distinct cloud accounts/projects/subscriptions?',
    options: [
      'It creates a hard security and quota boundary so a production incident or compromise cannot spread from development',
      'It is required to use IaC',
      'It reduces the number of IAM roles needed',
      'It makes billing untraceable',
    ],
    answers: [0],
    explanation:
      'Account-level isolation is the strongest boundary cloud providers offer, and it also gives clean per-environment cost attribution and service quotas.',
  },
];
