import type { ChallengeTest, RunResult } from '../types';
import PythonWorker from './pythonWorker?worker';

/** An accidental `while True` would otherwise pin a core forever. */
const RUN_TIMEOUT_MS = 20_000;

type Outgoing =
  | { type: 'status'; message: string }
  | { type: 'result'; id: number; result: RunResult }
  | { type: 'failure'; id: number; message: string };

let worker: Worker | null = null;
let nextId = 1;
let statusListener: ((message: string) => void) | null = null;
const pending = new Map<number, { resolve: (r: RunResult) => void; reject: (e: Error) => void }>();

function getWorker(): Worker {
  if (worker) return worker;
  const created = new PythonWorker();
  created.onmessage = (event: MessageEvent<Outgoing>) => {
    const message = event.data;
    if (message.type === 'status') {
      statusListener?.(message.message);
      return;
    }
    const entry = pending.get(message.id);
    if (!entry) return;
    pending.delete(message.id);
    if (message.type === 'result') entry.resolve(message.result);
    else entry.reject(new Error(message.message));
  };
  worker = created;
  return created;
}

/** Drops the worker so the next run starts from a clean interpreter. */
function resetWorker(reason: string) {
  worker?.terminate();
  worker = null;
  for (const [, entry] of pending) entry.reject(new Error(reason));
  pending.clear();
}

export function warmUpPython() {
  getWorker().postMessage({ type: 'run', id: 0, code: '', tests: [] });
}

export function onPythonStatus(listener: ((message: string) => void) | null) {
  statusListener = listener;
}

export function runPython(code: string, tests: ChallengeTest[]): Promise<RunResult> {
  const id = nextId++;
  const target = getWorker();
  return new Promise<RunResult>((resolve, reject) => {
    const timer = setTimeout(() => {
      resetWorker('Timed out after 20 seconds — check for an infinite loop.');
    }, RUN_TIMEOUT_MS);

    pending.set(id, {
      resolve: (result) => {
        clearTimeout(timer);
        resolve(result);
      },
      reject: (error) => {
        clearTimeout(timer);
        reject(error);
      },
    });

    target.postMessage({ type: 'run', id, code, tests });
  });
}
