import type { Player } from "../types";
import { PLAYERS as FALLBACK } from "./players";

const KEY = "players-cache-v1";
export async function loadPlayers(): Promise<Player[]> {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 4000); // 4s timeout
    const res = await fetch("/api/players", { signal: ctrl.signal });
    clearTimeout(t);
    if (!res.ok) throw new Error("bad status");
    const players = (await res.json()) as Player[];
    localStorage.setItem(KEY, JSON.stringify(players));
    return players;
  } catch {
    const cached = localStorage.getItem(KEY);
    if (cached) return JSON.parse(cached) as Player[];
    return FALLBACK;
  }
}
