import { getLocale } from "next-intl/server";
import FuelPage from "@/components/sections/FuelPage";

export default async function FuelProjectPage() {
  const locale = await getLocale();
  return <FuelPage locale={locale} />;
}
