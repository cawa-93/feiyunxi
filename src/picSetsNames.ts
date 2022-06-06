export const picSetsNames = [
  'feiyunxi',
  'xiao',
] as const;

export type PicSetNames = (typeof picSetsNames)[number]

export type ImageModule = { default: string }
