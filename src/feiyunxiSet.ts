import { ImageModule } from "./picSetsNames";

export const regular = import.meta.globEager<ImageModule>('../assets/images/feiyunxi/*');
export const love = import.meta.globEager<ImageModule>('../assets/images/feiyunxi/love/*');
