import enPage from "@/config/translations/en/page.json";
import enNav from "@/config/translations/en/nav.json";
import enComponent from "@/config/translations/en/component.json";

import elPage from "@/config/translations/el/page.json";
import elNav from "@/config/translations/el/nav.json";
import elComponent from "@/config/translations/el/component.json";

export const translations = {
  en: {
    ...enPage,
    ...enNav,
    ...enComponent,
  },
  el: {
    ...elPage,
    ...elNav,
    ...elComponent,
  },
} as const;
