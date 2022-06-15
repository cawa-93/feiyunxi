export const picSetsNames = [
  'feiyunxi',
  'xiao',
  'cat',
] as const;

export type PicSetNames = (typeof picSetsNames)[number]

export type ImageModule = { default: string }
