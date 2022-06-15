export const picSetsNames = [
  'feiyunxi',
  'xiao',
  'cat.ts',
] as const;

export type PicSetNames = (typeof picSetsNames)[number]

export type ImageModule = { default: string }
