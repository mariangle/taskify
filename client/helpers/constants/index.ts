export type Mode = {
    label: string,
    value: string
}

export const modes: Mode[] = [
  {
    label: 'Automatic',
    value: 'auto',
  },
  {
    label: 'Manual',
    value: 'manual',
  },
  {
    label: 'Hold-to-talk',
    value: 'hold',
  },
];

export type Language = {
  label: string,
  value: string | undefined
}

export const languageOptions: Language[] = [
  {
    label: 'Any',
    value: undefined,
  },
  {
    label: 'English',
    value: 'en-US',
  },
  {
    label: 'German',
    value: 'de-DE',
  },
];  

export const crudOperations: { [key: string]: string[] } = {
  create: ['create', 'add', 'insert'],
  read: ['read', 'get', 'fetch', 'retrieve', 'show'],
  update: ['update', 'edit', 'modify', 'change'],
  delete: ['delete', 'remove', 'erase', 'clear'],
};