// Catálogos estáticos: personajes narradores, insignias y avatares.

import type { Avatar, Badge, Character, CharacterId, BadgeId, AvatarId } from "./types";

export const CHARACTERS: Record<CharacterId, Character> = {
  byte: {
    id: "byte",
    name: "Byte",
    emoji: "🤖",
    color: "#6366f1",
    personality: "Un robot curioso que adora ordenar y construir cosas.",
  },
  pixel: {
    id: "pixel",
    name: "Pixel",
    emoji: "👾",
    color: "#ec4899",
    personality: "Un alien artista al que le encantan los colores.",
  },
  luna: {
    id: "luna",
    name: "Luna",
    emoji: "🦊",
    color: "#f59e0b",
    personality: "Una zorra exploradora que organiza grandes aventuras.",
  },
  max: {
    id: "max",
    name: "Max",
    emoji: "🐙",
    color: "#10b981",
    personality: "Un pulpo que hace muchas cosas a la vez con sus brazos.",
  },
};

export const BADGES: Record<BadgeId, Badge> = {
  "primer-codigo": {
    id: "primer-codigo",
    name: "Primer Código",
    emoji: "🌟",
    description: "Escribiste tu primera línea de código.",
  },
  "maestro-html": {
    id: "maestro-html",
    name: "Maestro del HTML",
    emoji: "🏗️",
    description: "Completaste los fundamentos de HTML.",
  },
  "artista-css": {
    id: "artista-css",
    name: "Artista del CSS",
    emoji: "🎨",
    description: "Diste color y estilo a tus páginas.",
  },
  constructor: {
    id: "constructor",
    name: "Constructor",
    emoji: "🧱",
    description: "Aprendiste a estructurar páginas completas.",
  },
  disenador: {
    id: "disenador",
    name: "Diseñador",
    emoji: "✏️",
    description: "Dominaste el diseño con CSS intermedio.",
  },
  "responsive-hero": {
    id: "responsive-hero",
    name: "Héroe Responsive",
    emoji: "📱",
    description: "Tus páginas se ven bien en cualquier pantalla.",
  },
  explorador: {
    id: "explorador",
    name: "Explorador",
    emoji: "🧭",
    description: "Completaste 5 aventuras.",
  },
  creador: {
    id: "creador",
    name: "Creador",
    emoji: "🚀",
    description: "Creaste tu primer proyecto libre.",
  },
};

export const AVATARS: Avatar[] = [
  { id: "robot", name: "Robot", emoji: "🤖" },
  { id: "alien", name: "Alien", emoji: "👾" },
  { id: "gato", name: "Gato", emoji: "🐱" },
  { id: "dragon", name: "Dragón", emoji: "🐉" },
  { id: "astronauta", name: "Astronauta", emoji: "🧑‍🚀" },
  { id: "unicornio", name: "Unicornio", emoji: "🦄" },
  { id: "pulpo", name: "Pulpo", emoji: "🐙" },
  { id: "zorro", name: "Zorro", emoji: "🦊" },
];

export function getAvatar(id: AvatarId): Avatar {
  return AVATARS.find((a) => a.id === id) ?? AVATARS[0];
}
