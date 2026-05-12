import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";

type Locale = "en" | "fr";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <SmoothScrollProvider>
        <CustomCursor />
        {children}
      </SmoothScrollProvider>
    </NextIntlClientProvider>
  );
}
