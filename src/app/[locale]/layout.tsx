import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";
import ConsoleEasterEgg from "@/components/ui/ConsoleEasterEgg";

type Locale = "en" | "fr";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === "fr") {
    return {
      description:
        "Étudiante en génie logiciel à Polytechnique Montréal. Développeuse full-stack, passionnée par le frontend, le design et les projets concrets.",
      openGraph: {
        locale: "fr_FR",
        description:
          "Étudiante en génie logiciel à Polytechnique Montréal. Développeuse full-stack, passionnée par le frontend, le design et les projets concrets.",
      },
    };
  }
  return {};
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
        <ConsoleEasterEgg />
        <CustomCursor />
        {children}
      </SmoothScrollProvider>
    </NextIntlClientProvider>
  );
}
