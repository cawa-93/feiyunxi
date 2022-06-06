import { ImageModule } from "./picSetsNames";

export const regular = import.meta.globEager<ImageModule>('../assets/images/xiao/*');
export const love = import.meta.globEager<ImageModule>('../assets/images/xiao/love/*');
