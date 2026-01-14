import { getHeader } from "@/lib/getHeader";
import { Header } from "./Header";

export async function HeaderWrapper() {
  const headerData = await getHeader();

  const menuItems =
    headerData?.menu?.map((item) => {
      const href = item.url || "/";

      const anchor = item.url ? undefined : item.anchor || undefined;
      return {
        label: item.label,
        href,
        anchor,
      };
    }) || [];

  return <Header menuItems={menuItems} phone={headerData?.phone || ""} />;
}
