import type { Question } from '../../types';

export const containerQuestions: Question[] = [
  {
    id: 'do-cnt-001',
    topic: 'Containers',
    difficulty: 'easy',
    question: 'Which Linux kernel features underpin container isolation? (Select all that apply)',
    options: ['Namespaces', 'Control groups (cgroups)', 'Hypervisor ring -1', 'Capabilities'],
    answers: [0, 1, 3],
    explanation:
      'Namespaces isolate what a process can see (PID, net, mnt, uts, ipc, user), cgroups limit what it can consume, and capabilities restrict privileged operations. Containers do not use a hypervisor.',
  },
  {
    id: 'do-cnt-002',
    topic: 'Containers',
    difficulty: 'easy',
    question: 'What is the difference between a container image and a container?',
    options: [
      'An image is a running process; a container is the file on disk',
      'An image is an immutable, layered filesystem plus metadata; a container is a running (or stopped) instance created from it with a writable layer',
      'They are the same thing with different names',
      'An image can only be used once',
    ],
    answers: [1],
    explanation:
      'Images are read-only templates. Instantiating one adds a thin writable layer and a set of namespaces/cgroups, producing a container.',
  },
  {
    id: 'do-cnt-003',
    topic: 'Containers',
    difficulty: 'medium',
    question: 'In a Dockerfile, why should dependency installation come before copying application source?',
    options: [
      'Because COPY cannot run after RUN',
      'So the expensive dependency layer stays cached when only application source changes',
      'Because dependencies must exist before the WORKDIR is created',
      'It has no effect on build time',
    ],
    answers: [1],
    explanation:
      'Docker invalidates a layer and everything after it when its inputs change. Copying only the manifest (package.json, requirements.txt, go.mod) and installing first keeps that layer cached across source edits.',
  },
  {
    id: 'do-cnt-004',
    topic: 'Containers',
    difficulty: 'medium',
    question: 'What is the primary benefit of a multi-stage Docker build?',
    options: [
      'It parallelises the build across machines',
      'Build-time toolchains stay in an intermediate stage so the final image contains only runtime artifacts',
      'It automatically signs the image',
      'It allows multiple ENTRYPOINT instructions',
    ],
    answers: [1],
    explanation:
      'Multi-stage builds copy just the compiled output into a slim final stage, dramatically reducing image size and attack surface by excluding compilers, headers, and build caches.',
  },
  {
    id: 'do-cnt-005',
    topic: 'Containers',
    difficulty: 'medium',
    question: 'What is the practical difference between CMD and ENTRYPOINT?',
    options: [
      'ENTRYPOINT defines the executable that always runs; CMD supplies default arguments that `docker run` can override',
      'CMD runs at build time; ENTRYPOINT runs at run time',
      'Only one of them can appear in a Dockerfile',
      'ENTRYPOINT is deprecated',
    ],
    answers: [0],
    explanation:
      'With exec-form ENTRYPOINT, the CMD value becomes its default arguments. Arguments passed to `docker run` replace CMD but not ENTRYPOINT unless `--entrypoint` is used.',
  },
  {
    id: 'do-cnt-006',
    topic: 'Containers',
    difficulty: 'hard',
    question: 'Why does running an application as PID 1 in a container often cause problems? (Select all that apply)',
    options: [
      'PID 1 does not get default signal handlers, so SIGTERM may be ignored and the container is SIGKILLed after the grace period',
      'PID 1 must reap orphaned zombie processes, which most applications do not do',
      'PID 1 cannot open network sockets',
      'PID 1 is always run as root regardless of USER',
    ],
    answers: [0, 1],
    explanation:
      'The kernel skips default signal dispositions for PID 1 and expects it to reap orphans. Using a tiny init (tini, dumb-init, or `docker run --init`) fixes graceful shutdown and zombie accumulation.',
  },
  {
    id: 'do-cnt-007',
    topic: 'Containers',
    difficulty: 'medium',
    question: 'Which practices reduce container image attack surface? (Select all that apply)',
    options: [
      'Use a distroless or minimal base image',
      'Run as a non-root USER',
      'Pin base images by digest rather than a floating tag',
      'Install a full package manager and shell for easier debugging in production',
    ],
    answers: [0, 1, 2],
    explanation:
      'Minimal bases, non-root users, and digest pinning all shrink and stabilise the attack surface. Shipping shells and package managers to production gives an attacker convenient tooling.',
  },
  {
    id: 'do-cnt-008',
    topic: 'Containers',
    difficulty: 'medium',
    question: 'What does the `.dockerignore` file control?',
    options: [
      'Which files are excluded from the build context sent to the builder',
      'Which layers are excluded from the registry push',
      'Which environment variables are unset at runtime',
      'Which containers are skipped by `docker ps`',
    ],
    answers: [0],
    explanation:
      'Excluding .git, node_modules, and build output from the context speeds up builds, avoids busting the cache on irrelevant changes, and prevents secrets from accidentally landing in layers.',
  },
  {
    id: 'do-cnt-009',
    topic: 'Containers',
    difficulty: 'hard',
    question: 'Why is `ARG SECRET=...` an unsafe way to pass a credential into a Docker build?',
    options: [
      'ARG values are visible in image history and layer metadata',
      'ARG values cannot exceed 64 characters',
      'ARG is only available at runtime',
      'ARG values are logged to syslog',
    ],
    answers: [0],
    explanation:
      'Build arguments are recorded in the image metadata and can be recovered with `docker history`. BuildKit secret mounts (`--mount=type=secret`) keep the value out of the final image entirely.',
  },
  {
    id: 'do-cnt-010',
    topic: 'Containers',
    difficulty: 'easy',
    question: 'What is a container registry?',
    options: [
      'A service that stores and distributes container images and their manifests by name and tag or digest',
      'A local directory of running containers',
      'A DNS service for container hostnames',
      'A database of container logs',
    ],
    answers: [0],
    explanation:
      'Registries (Docker Hub, ECR, GCR, GHCR, Harbor) implement the OCI distribution spec: clients push and pull layered images addressed by repository, tag, and content digest.',
  },
  {
    id: 'do-cnt-011',
    topic: 'Containers',
    difficulty: 'medium',
    question: 'Why is referencing an image by digest (`@sha256:...`) more reliable than by tag?',
    options: [
      'Digests download faster',
      'Tags are mutable pointers that can be moved to a different image; a digest is immutable and content-addressed',
      'Digests skip registry authentication',
      'Tags are not supported by OCI registries',
    ],
    answers: [1],
    explanation:
      'A tag such as `:latest` or even `:1.2.3` can be overwritten. Pinning a digest guarantees the exact bytes you tested are the ones deployed.',
  },
  {
    id: 'do-cnt-012',
    topic: 'Containers',
    difficulty: 'medium',
    question: 'What does a Docker bind mount do that a named volume does not?',
    options: [
      'Maps a specific host directory path directly into the container',
      'Persists data after the container is removed',
      'Supports read-only access',
      'Works on Linux only',
    ],
    answers: [0],
    explanation:
      'Bind mounts attach an exact host path (useful for local development), while named volumes are managed by the container runtime in its own storage area and are more portable.',
  },
  {
    id: 'do-cnt-013',
    topic: 'Containers',
    difficulty: 'hard',
    question: 'A container is repeatedly killed with exit code 137. What is the most likely cause?',
    options: [
      'A failed health check',
      'The process received SIGKILL, typically from the OOM killer after exceeding its memory limit',
      'A missing entrypoint binary',
      'An image pull failure',
    ],
    answers: [1],
    explanation:
      'Exit code 137 is 128 + 9 (SIGKILL). In containers this almost always means the cgroup memory limit was exceeded and the kernel OOM killer terminated the process.',
  },
  {
    id: 'do-cnt-014',
    topic: 'Containers',
    difficulty: 'medium',
    question: 'What is a container image manifest list (multi-arch index) used for?',
    options: [
      'Listing the files inside an image',
      'Mapping a single image reference to platform-specific manifests so the right variant is pulled per architecture/OS',
      'Recording the build log',
      'Declaring required environment variables',
    ],
    answers: [1],
    explanation:
      'A manifest list lets `myimage:1.0` resolve to the linux/amd64 or linux/arm64 image automatically based on the pulling node\'s platform.',
  },
  {
    id: 'do-cnt-015',
    topic: 'Containers',
    difficulty: 'medium',
    question: 'Which statements about container storage layers are true? (Select all that apply)',
    options: [
      'Each Dockerfile instruction that changes the filesystem creates a new layer',
      'Deleting a file in a later layer removes its bytes from the earlier layer',
      'Layers are shared between images that have identical parents, saving disk and network',
      'The container\'s writable layer is discarded when the container is removed',
    ],
    answers: [0, 2, 3],
    explanation:
      'Layers are additive and content-addressed. A deletion adds a whiteout marker but the original bytes remain in the earlier layer, which is why secrets removed in a later RUN are still recoverable.',
  },
  {
    id: 'do-cnt-016',
    topic: 'Containers',
    difficulty: 'easy',
    question: 'What is the purpose of a HEALTHCHECK instruction?',
    options: [
      'To let the runtime periodically probe whether the application inside the container is actually working',
      'To scan the image for CVEs',
      'To validate the Dockerfile syntax',
      'To restart the container on a schedule',
    ],
    answers: [0],
    explanation:
      'A health check distinguishes "process is running" from "service is usable", allowing orchestrators and load balancers to route away from unhealthy instances.',
  },
  {
    id: 'do-cnt-017',
    topic: 'Containers',
    difficulty: 'hard',
    question: 'What does the `--privileged` flag grant, and why is it dangerous?',
    options: [
      'It only increases CPU priority',
      'It disables most isolation — all capabilities, device access, and unmasked /proc — effectively giving root on the host',
      'It allows binding to ports below 1024 only',
      'It enables verbose logging',
    ],
    answers: [1],
    explanation:
      'Privileged containers can load kernel modules, access host devices, and escape trivially. Prefer granting individual capabilities with `--cap-add` for the specific need.',
  },
  {
    id: 'do-cnt-018',
    topic: 'Containers',
    difficulty: 'medium',
    question: 'What is the OCI (Open Container Initiative) responsible for?',
    options: [
      'Standardising the image format, runtime behaviour, and distribution API for containers',
      'Certifying cloud providers',
      'Managing the Kubernetes release cycle',
      'Publishing base images',
    ],
    answers: [0],
    explanation:
      'OCI defines the image-spec, runtime-spec, and distribution-spec, which is why images built by Docker, Buildah, or Kaniko all run under containerd, CRI-O, or Podman.',
  },
  {
    id: 'do-cnt-019',
    topic: 'Containers',
    difficulty: 'medium',
    question: 'Why do many teams build container images with Kaniko or BuildKit rootless mode inside CI?',
    options: [
      'They produce smaller images by design',
      'They avoid needing a privileged Docker socket or daemon on the build node',
      'They are the only tools that support multi-stage builds',
      'They automatically deploy to Kubernetes',
    ],
    answers: [1],
    explanation:
      'Mounting the host Docker socket into a build container grants root-equivalent host access. Daemonless/rootless builders remove that escalation path.',
  },
  {
    id: 'do-cnt-020',
    topic: 'Containers',
    difficulty: 'medium',
    question: 'Which signal does a container runtime send first during a graceful stop?',
    options: ['SIGKILL', 'SIGTERM', 'SIGHUP', 'SIGSTOP'],
    answers: [1],
    explanation:
      'The runtime sends SIGTERM, waits for a grace period, then escalates to SIGKILL. Applications should trap SIGTERM to drain connections and flush state.',
  },
  {
    id: 'do-cnt-021',
    topic: 'Containers',
    difficulty: 'hard',
    question: 'An image scanner reports a critical CVE in a base image layer. Which responses are appropriate? (Select all that apply)',
    options: [
      'Rebuild against an updated base image that includes the fix',
      'Switch to a smaller base that does not ship the affected package',
      'Assess exploitability — whether the vulnerable component is actually reachable in your runtime',
      'Add the CVE to a permanent global ignore list without review',
    ],
    answers: [0, 1, 2],
    explanation:
      'Patching, reducing surface, and triaging reachability are valid. Permanently suppressing findings without review turns the scanner into noise and hides real risk.',
  },
  {
    id: 'do-cnt-022',
    topic: 'Containers',
    difficulty: 'medium',
    question: 'What is an SBOM and why attach one to a container image?',
    options: [
      'A Software Bill of Materials listing every component and version in the artifact, enabling rapid impact analysis when a new CVE lands',
      'A build script that outputs metrics',
      'A signature format for images',
      'A summary of build output messages',
    ],
    answers: [0],
    explanation:
      'When a vulnerability like Log4Shell is announced, an SBOM lets you answer "which of our images contain this component and version?" in seconds instead of days.',
  },
  {
    id: 'do-cnt-023',
    topic: 'Containers',
    difficulty: 'easy',
    question: 'Where should application logs be written in a containerised environment?',
    options: [
      'To a rotating file inside the container',
      'To stdout/stderr so the runtime\'s logging driver collects and ships them',
      'To a shared NFS mount',
      'To the host syslog directly',
    ],
    answers: [1],
    explanation:
      'Treating logs as event streams on stdout/stderr (a twelve-factor principle) lets the platform handle collection, rotation, and shipping without container-specific configuration.',
  },
  {
    id: 'do-cnt-024',
    topic: 'Containers',
    difficulty: 'hard',
    question: 'Why can a JVM or Go application misbehave when memory limits are set only via cgroups without container-awareness?',
    options: [
      'The runtime may read host-wide memory from /proc and size its heap or GC targets far above the cgroup limit, triggering OOM kills',
      'cgroups do not apply to compiled languages',
      'The kernel disables swap for containers',
      'Garbage collection is not supported in containers',
    ],
    answers: [0],
    explanation:
      'Older runtimes read total host memory instead of the cgroup limit. Modern JVMs are container-aware by default; for Go, GOMEMLIMIT should be set relative to the container limit.',
  },
  {
    id: 'do-cnt-025',
    topic: 'Containers',
    difficulty: 'medium',
    question: 'What is the difference between a container runtime such as containerd and a low-level runtime such as runc?',
    options: [
      'containerd manages image pull, storage, and container lifecycle, then calls runc to actually create the process using kernel primitives',
      'runc is a replacement for containerd',
      'containerd only works with Kubernetes',
      'runc handles networking while containerd handles storage',
    ],
    answers: [0],
    explanation:
      'containerd is the high-level supervisor exposing an API (and CRI for Kubernetes); runc is the OCI-compliant binary that sets up namespaces/cgroups and execs the process.',
  },
  {
    id: 'do-cnt-026',
    topic: 'Containers',
    difficulty: 'medium',
    question: 'Why should container images avoid the `latest` tag in production manifests?',
    options: [
      '`latest` is rate-limited by registries',
      'It is a mutable pointer, so identical manifests can produce different running code and rollbacks become ambiguous',
      '`latest` images are always larger',
      'Kubernetes rejects the `latest` tag',
    ],
    answers: [1],
    explanation:
      'Without an immutable reference you lose reproducibility and traceability: two nodes pulling at different times may run different code, and there is no reliable version to roll back to.',
  },
];
