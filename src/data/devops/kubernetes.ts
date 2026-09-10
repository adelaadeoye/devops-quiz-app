import type { Question } from '../../types';

export const kubernetesQuestions: Question[] = [
  {
    id: 'do-k8s-001',
    topic: 'Kubernetes',
    difficulty: 'easy',
    question: 'What is the smallest deployable unit in Kubernetes?',
    options: ['Container', 'Pod', 'Deployment', 'Node'],
    answers: [1],
    explanation:
      'A Pod wraps one or more tightly coupled containers that share a network namespace, IP address, and storage volumes, and are always scheduled together.',
  },
  {
    id: 'do-k8s-002',
    topic: 'Kubernetes',
    difficulty: 'easy',
    question: 'Which components run on the Kubernetes control plane? (Select all that apply)',
    options: ['kube-apiserver', 'etcd', 'kubelet', 'kube-scheduler'],
    answers: [0, 1, 3],
    explanation:
      'The control plane comprises the API server, etcd, scheduler, and controller manager. The kubelet is a node agent that runs on every worker.',
  },
  {
    id: 'do-k8s-003',
    topic: 'Kubernetes',
    difficulty: 'medium',
    question: 'What is the role of a controller in Kubernetes?',
    options: [
      'It watches the desired state in the API and takes action to move the actual state toward it',
      'It authenticates users',
      'It stores cluster data',
      'It assigns IP addresses to Pods',
    ],
    answers: [0],
    explanation:
      'Controllers implement level-triggered reconciliation loops: observe current state, compare with spec, act, repeat. This is the core of Kubernetes\' self-healing behaviour.',
  },
  {
    id: 'do-k8s-004',
    topic: 'Kubernetes',
    difficulty: 'medium',
    question: 'Which workload controller should you use for a stateful database requiring stable network identity and per-replica persistent storage?',
    options: ['Deployment', 'DaemonSet', 'StatefulSet', 'Job'],
    answers: [2],
    explanation:
      'StatefulSets give ordinal, stable pod names and DNS entries plus per-pod PersistentVolumeClaims, with ordered rolling updates — exactly what clustered databases need.',
  },
  {
    id: 'do-k8s-005',
    topic: 'Kubernetes',
    difficulty: 'medium',
    question: 'What does a DaemonSet guarantee?',
    options: [
      'Exactly N replicas cluster-wide',
      'One pod per matching node, including on nodes added later',
      'Pods run only on control plane nodes',
      'Pods restart daily',
    ],
    answers: [1],
    explanation:
      'DaemonSets are used for node-level agents — log shippers, CNI plugins, node exporters — because they schedule one pod onto every node that matches the selectors and tolerations.',
  },
  {
    id: 'do-k8s-006',
    topic: 'Kubernetes',
    difficulty: 'hard',
    question: 'A pod is stuck in `Pending`. Which are plausible causes? (Select all that apply)',
    options: [
      'No node satisfies the pod\'s CPU/memory requests',
      'A required PersistentVolumeClaim is unbound',
      'Node taints that the pod does not tolerate',
      'The container process is crashing on startup',
    ],
    answers: [0, 1, 2],
    explanation:
      'Pending means the scheduler has not placed the pod: insufficient resources, unbound volumes, or taint/affinity mismatches. A crashing process yields CrashLoopBackOff, which happens after scheduling.',
  },
  {
    id: 'do-k8s-007',
    topic: 'Kubernetes',
    difficulty: 'medium',
    question: 'What is the difference between a liveness probe and a readiness probe?',
    options: [
      'Liveness failure restarts the container; readiness failure removes the pod from Service endpoints without restarting it',
      'Liveness runs once at startup; readiness runs continuously',
      'Readiness failure restarts the container; liveness only logs',
      'They are functionally identical',
    ],
    answers: [0],
    explanation:
      'Use readiness for temporary unavailability (warming caches, dependency down) and liveness only for unrecoverable deadlock — an over-aggressive liveness probe can amplify an outage into a restart storm.',
  },
  {
    id: 'do-k8s-008',
    topic: 'Kubernetes',
    difficulty: 'medium',
    question: 'What does a startup probe solve?',
    options: [
      'It prevents liveness probes from killing slow-starting containers before initialisation completes',
      'It runs init containers in parallel',
      'It pre-pulls images',
      'It validates the pod manifest',
    ],
    answers: [0],
    explanation:
      'While a startup probe is failing, liveness and readiness checks are suspended, so legacy applications with long boot times get the time they need without loosening the steady-state liveness thresholds.',
  },
  {
    id: 'do-k8s-009',
    topic: 'Kubernetes',
    difficulty: 'hard',
    question: 'What is the practical effect of setting a CPU limit equal to the CPU request in Kubernetes?',
    options: [
      'The pod gets Guaranteed QoS class and is the last to be evicted under node pressure, but is throttled at that ceiling',
      'The pod can burst indefinitely',
      'The pod is scheduled on a dedicated node',
      'CPU limits are ignored by the scheduler',
    ],
    answers: [0],
    explanation:
      'When every container has requests equal to limits for CPU and memory, the pod is Guaranteed QoS. CPU limits are enforced by CFS quota, so the workload is throttled rather than killed.',
  },
  {
    id: 'do-k8s-010',
    topic: 'Kubernetes',
    difficulty: 'medium',
    question: 'Which Service type exposes a workload on a stable cluster-internal virtual IP only?',
    options: ['ClusterIP', 'NodePort', 'LoadBalancer', 'ExternalName'],
    answers: [0],
    explanation:
      'ClusterIP is the default and is reachable only from inside the cluster. NodePort and LoadBalancer build on top of it to add external reachability.',
  },
  {
    id: 'do-k8s-011',
    topic: 'Kubernetes',
    difficulty: 'medium',
    question: 'What does an Ingress resource provide that a Service does not?',
    options: [
      'Layer 7 HTTP routing by host and path, TLS termination, and consolidation of many services behind one entry point',
      'Pod-to-pod encryption',
      'Automatic horizontal scaling',
      'Persistent storage',
    ],
    answers: [0],
    explanation:
      'An Ingress is a declarative L7 routing spec implemented by an ingress controller (NGINX, Traefik, Envoy-based), avoiding one cloud load balancer per service.',
  },
  {
    id: 'do-k8s-012',
    topic: 'Kubernetes',
    difficulty: 'hard',
    question: 'Which statements about NetworkPolicy are correct? (Select all that apply)',
    options: [
      'Without any NetworkPolicy, all pod-to-pod traffic is allowed by default',
      'Once a pod is selected by any policy, only explicitly allowed traffic in that direction is permitted',
      'NetworkPolicy requires a CNI plugin that implements it',
      'NetworkPolicy can filter by HTTP method and path',
    ],
    answers: [0, 1, 2],
    explanation:
      'NetworkPolicy is L3/L4 (namespaces, pod selectors, ports, CIDRs) and is enforced by the CNI. HTTP-aware filtering requires a service mesh or L7 policy extension such as Cilium\'s.',
  },
  {
    id: 'do-k8s-013',
    topic: 'Kubernetes',
    difficulty: 'medium',
    question: 'What is a PodDisruptionBudget used for?',
    options: [
      'Limiting how many pods of an application can be voluntarily disrupted at once, e.g. during node drains',
      'Capping the CPU budget of a namespace',
      'Preventing pods from being OOM killed',
      'Setting a maximum pod restart count',
    ],
    answers: [0],
    explanation:
      'A PDB tells the eviction API to keep at least `minAvailable` (or at most `maxUnavailable`) pods running, so cluster upgrades and autoscaler scale-downs do not take a service below quorum.',
  },
  {
    id: 'do-k8s-014',
    topic: 'Kubernetes',
    difficulty: 'medium',
    question: 'What is the difference between a taint and a toleration?',
    options: [
      'A taint is applied to a node to repel pods; a toleration is applied to a pod to allow it to be scheduled onto tainted nodes',
      'A taint is applied to pods; a toleration to nodes',
      'Both apply to namespaces',
      'Taints affect networking; tolerations affect storage',
    ],
    answers: [0],
    explanation:
      'Taints/tolerations are a repel mechanism (keep pods off unless they opt in). Node affinity is the attract mechanism (steer pods toward specific nodes).',
  },
  {
    id: 'do-k8s-015',
    topic: 'Kubernetes',
    difficulty: 'medium',
    question: 'How does the Horizontal Pod Autoscaler decide the replica count?',
    options: [
      'It compares observed metric values against a target and scales replicas proportionally',
      'It adds one replica per minute until CPU drops',
      'It uses the node autoscaler\'s decision',
      'It scales based on the number of open connections only',
    ],
    answers: [0],
    explanation:
      'HPA computes desiredReplicas = ceil(currentReplicas × currentMetric / targetMetric), using resource metrics or custom/external metrics, with stabilisation windows to avoid flapping.',
  },
  {
    id: 'do-k8s-016',
    topic: 'Kubernetes',
    difficulty: 'hard',
    question: 'Why should the Vertical Pod Autoscaler in "Auto" mode generally not be combined with an HPA on the same CPU metric?',
    options: [
      'They are incompatible API versions',
      'Both react to the same signal, so they fight each other — VPA raises requests while HPA adds replicas, causing oscillation',
      'VPA requires StatefulSets',
      'HPA disables the metrics server',
    ],
    answers: [1],
    explanation:
      'Use HPA on CPU with VPA in recommendation-only mode, or drive HPA from a custom metric (e.g. queue depth) so the two controllers optimise different dimensions.',
  },
  {
    id: 'do-k8s-017',
    topic: 'Kubernetes',
    difficulty: 'medium',
    question: 'What is the purpose of an init container?',
    options: [
      'To run setup tasks to completion before the application containers start',
      'To keep running alongside app containers as a sidecar',
      'To provide the pod\'s network namespace',
      'To collect logs',
    ],
    answers: [0],
    explanation:
      'Init containers run sequentially and must each exit successfully. They are ideal for schema migrations, waiting on dependencies, or fetching configuration with tooling you do not want in the runtime image.',
  },
  {
    id: 'do-k8s-018',
    topic: 'Kubernetes',
    difficulty: 'medium',
    question: 'Which statements about Kubernetes Secrets are accurate? (Select all that apply)',
    options: [
      'By default they are stored base64-encoded in etcd, which is encoding, not encryption',
      'Encryption at rest must be explicitly enabled with an EncryptionConfiguration',
      'RBAC should restrict which service accounts can read them',
      'Mounting a Secret as a file is impossible; only environment variables are supported',
    ],
    answers: [0, 1, 2],
    explanation:
      'Secrets can be projected as files (preferred, since env vars leak into child processes and crash dumps). Base64 provides no confidentiality, so at-rest encryption and tight RBAC are essential.',
  },
  {
    id: 'do-k8s-019',
    topic: 'Kubernetes',
    difficulty: 'hard',
    question: 'What does a mutating admission webhook do?',
    options: [
      'Validates that a resource conforms to policy and rejects it if not',
      'Modifies an incoming object before it is persisted, e.g. injecting a sidecar or default labels',
      'Rewrites objects already stored in etcd',
      'Filters which resources appear in `kubectl get`',
    ],
    answers: [1],
    explanation:
      'Admission runs mutating webhooks first, then validating webhooks. Service meshes use mutating webhooks to inject proxy sidecars transparently.',
  },
  {
    id: 'do-k8s-020',
    topic: 'Kubernetes',
    difficulty: 'medium',
    question: 'What is a Custom Resource Definition (CRD) plus a controller commonly called?',
    options: ['A Helm chart', 'An operator', 'A CNI plugin', 'A kubelet plugin'],
    answers: [1],
    explanation:
      'The operator pattern encodes domain-specific operational knowledge — backups, failover, upgrades — into a controller that reconciles a custom resource.',
  },
  {
    id: 'do-k8s-021',
    topic: 'Kubernetes',
    difficulty: 'medium',
    question: 'During a Deployment rolling update, what do `maxSurge` and `maxUnavailable` control?',
    options: [
      'How many extra pods may exist above the desired count, and how many may be unavailable below it, during the rollout',
      'The CPU headroom reserved on each node',
      'The maximum number of rollout revisions retained',
      'The timeout before the rollout is marked failed',
    ],
    answers: [0],
    explanation:
      'Tuning these controls the trade-off between rollout speed and capacity: maxSurge 0 / maxUnavailable 1 is capacity-conservative, maxSurge 1 / maxUnavailable 0 preserves full serving capacity.',
  },
  {
    id: 'do-k8s-022',
    topic: 'Kubernetes',
    difficulty: 'hard',
    question: 'A pod shows `CrashLoopBackOff`. Which commands help diagnose it? (Select all that apply)',
    options: [
      '`kubectl logs <pod> --previous` to see output from the crashed instance',
      '`kubectl describe pod <pod>` to inspect events, probe failures, and exit codes',
      '`kubectl get events --sort-by=.lastTimestamp` for cluster-level context',
      '`kubectl scale deploy <name> --replicas=0` to view logs',
    ],
    answers: [0, 1, 2],
    explanation:
      'Previous-container logs, pod description, and events reveal the failure. Scaling to zero destroys the evidence rather than exposing it.',
  },
  {
    id: 'do-k8s-023',
    topic: 'Kubernetes',
    difficulty: 'medium',
    question: 'What does a ResourceQuota enforce?',
    options: [
      'Aggregate limits on compute resources and object counts within a namespace',
      'Per-container default limits',
      'Node-level disk quotas',
      'Network bandwidth caps',
    ],
    answers: [0],
    explanation:
      'ResourceQuota caps a namespace\'s total requests/limits and object counts. LimitRange is the complementary object that sets per-container defaults and min/max values.',
  },
  {
    id: 'do-k8s-024',
    topic: 'Kubernetes',
    difficulty: 'hard',
    question: 'Why is `kubectl apply` preferred over `kubectl replace` for managing manifests in a pipeline?',
    options: [
      'apply is faster',
      'apply performs a three-way merge against the last-applied configuration, preserving fields set by other controllers',
      'replace requires cluster-admin',
      'apply skips admission control',
    ],
    answers: [1],
    explanation:
      'Three-way merge (or server-side apply with field ownership) keeps fields injected by controllers — like autoscaler-managed replicas or mesh sidecars — instead of clobbering the whole object.',
  },
  {
    id: 'do-k8s-025',
    topic: 'Kubernetes',
    difficulty: 'medium',
    question: 'What is the function of a ServiceAccount?',
    options: [
      'To provide an identity for processes running in pods so the API server can authenticate and authorise their requests',
      'To store user passwords',
      'To manage node registration',
      'To define pod scheduling preferences',
    ],
    answers: [0],
    explanation:
      'Pods authenticate to the API using projected ServiceAccount tokens, and RBAC bindings determine what that identity may do. ServiceAccounts can also federate to cloud IAM roles.',
  },
  {
    id: 'do-k8s-026',
    topic: 'Kubernetes',
    difficulty: 'medium',
    question: 'What happens when you delete a Deployment without `--cascade=orphan`?',
    options: [
      'Only the Deployment object is removed; ReplicaSets and Pods remain',
      'Garbage collection removes the owned ReplicaSets and their Pods via owner references',
      'The namespace is deleted',
      'Pods are restarted',
    ],
    answers: [1],
    explanation:
      'Kubernetes garbage collection follows ownerReferences: deleting the owner cascades to dependents by default. `--cascade=orphan` explicitly leaves them behind.',
  },
];
