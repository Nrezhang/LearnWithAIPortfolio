import { notFound } from "next/navigation";
import { SUBJECTS } from "@/lib/data";
import type { Subject } from "@/types";
import ChatInterface from "@/components/learn/ChatInterface";

interface Props {
  params: Promise<{ subject: string }>;
}

export default async function LearnPage({ params }: Props) {
  const { subject } = await params;
  const config = SUBJECTS.find((s) => s.id === subject);

  if (!config) notFound();

  return <ChatInterface subject={config} />;
}

export function generateStaticParams() {
  return [{ subject: "system-design" }, { subject: "algorithms" }];
}