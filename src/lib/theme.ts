import type { TrackId } from '../types';

interface Accent {
  text: string;
  border: string;
  ring: string;
  bg: string;
  solid: string;
  solidHover: string;
  gradient: string;
}

export const accents: Record<TrackId, Accent> = {
  devops: {
    text: 'text-sky-300',
    border: 'border-sky-400/40',
    ring: 'ring-sky-400/40',
    bg: 'bg-sky-400/10',
    solid: 'bg-sky-500',
    solidHover: 'hover:bg-sky-400',
    gradient: 'from-sky-400 to-cyan-300',
  },
  'build-release': {
    text: 'text-violet-300',
    border: 'border-violet-400/40',
    ring: 'ring-violet-400/40',
    bg: 'bg-violet-400/10',
    solid: 'bg-violet-500',
    solidHover: 'hover:bg-violet-400',
    gradient: 'from-violet-400 to-fuchsia-300',
  },
};
