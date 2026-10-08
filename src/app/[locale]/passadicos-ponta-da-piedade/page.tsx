import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { TOPICS } from '@/lib/topics';
import TopicPage, { buildTopicMetadata } from '@/components/TopicPage';

const SLUG = 'passadicos-ponta-da-piedade';

export function generateStaticParams() {
  return [{ locale: 'pt' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildTopicMetadata(SLUG, locale as 'pt');
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const topic = TOPICS.find((t) => t.slug === SLUG && t.locale === locale);
  if (!topic) notFound();
  return <TopicPage topic={topic} />;
}
