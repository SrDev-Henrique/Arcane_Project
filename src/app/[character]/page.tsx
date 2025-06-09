// app/[character]/page.tsx
import { notFound } from "next/navigation";
import { characters } from "@/data/Characters";
import CharacterPageClient from "./CharacterPageClient";

export async function generateStaticParams() {
  return Object.keys(characters).map((character) => ({ character }));
}

export default async function CharacterPage({
  params,
}: {
  params: Promise<{ character: string }>;
}) {
  
  const { character } = await params;

  const key = character as keyof typeof characters;
  const characterData = characters[key];

  if (!characterData) {
    return notFound();
  }

  return <CharacterPageClient characterKey={key} data={characterData} />;
}