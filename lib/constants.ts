export type Mode = {
    label: string,
    value: string
}

export const modes: Mode[] = [
  {
    label: 'Hold-to-talk',
    value: 'hold',
  },
  {
    label: 'Automatic',
    value: 'auto',
  },
  {
    label: 'Manual',
    value: 'manual',
  },
];