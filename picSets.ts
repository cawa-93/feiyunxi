export const picSets = [
    'feiyunxi',
    'xiao',
] as const;

export type PicSet = (typeof picSets)[number]
