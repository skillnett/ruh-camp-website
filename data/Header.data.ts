export interface NavigationItem {
  label: string;
  href: string;
  sectionId?: string;
}

export const headerData = {
  navigationData: [
    {
      label: "Сезони",
      href: "/",
      sectionId: "seasons",
    },
    {
      label: "Про нас",
      href: "/",
      sectionId: "about",
    },
    {
      label: "WOW-фішки",
      href: "/",
      sectionId: "services",
    },
    {
      label: "Контакти",
      href: "/",
      sectionId: "contacts",
    },
  ] as NavigationItem[],
};
