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
      sectionId: "#services",
    },
    {
      label: "Про нас",
      href: "/",
      sectionId: "#about",
    },
    {
      label: "WOW-фішки",
      href: "/",
      sectionId: "#advantages",
    },
    {
      label: "Контакти",
      href: "/",
      sectionId: "#contacts",
    },
  ] as NavigationItem[],
};
