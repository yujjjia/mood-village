import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export interface Lantern {
  id: string;
  mood: string;
  message: string;
  author: string;
  createdAt: string;
  replies: Reply[];
}

export interface Reply {
  id: string;
  lanternId: string;
  message: string;
  author: string;
  createdAt: string;
}

const mockLanterns: Lantern[] = [
  {
    id: "1",
    mood: "cozy",
    message: "Wrapped in a blanket with hot cocoa, watching rain tap the window",
    author: "ember",
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    replies: [
      { id: "r1", lanternId: "1", message: "That sounds so peaceful", author: "willow", createdAt: new Date(Date.now() - 1000 * 60 * 3).toISOString() },
    ],
  },
  {
    id: "2",
    mood: "anxious",
    message: "Big presentation tomorrow, can't stop running through slides in my head",
    author: "drift",
    createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    replies: [],
  },
  {
    id: "3",
    mood: "focused",
    message: "Deep in a coding flow, everything else has faded away",
    author: "nova",
    createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    replies: [
      { id: "r2", lanternId: "3", message: "Love that feeling, ride the wave!", author: "spark", createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString() },
    ],
  },
  {
    id: "4",
    mood: "low-energy",
    message: "Just existing today, and that's okay",
    author: "mist",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    replies: [
      { id: "r3", lanternId: "4", message: "Rest is productive too", author: "pebble", createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString() },
    ],
  },
  {
    id: "5",
    mood: "social",
    message: "Had the best lunch chat with old friends today",
    author: "fern",
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    replies: [],
  },
  {
    id: "6",
    mood: "cozy",
    message: "Baking cookies while lo-fi plays softly in the background",
    author: "maple",
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    replies: [],
  },
  {
    id: "7",
    mood: "anxious",
    message: "Waiting for test results, trying to stay calm",
    author: "ripple",
    createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    replies: [
      { id: "r4", lanternId: "7", message: "Sending good thoughts your way", author: "ember", createdAt: new Date(Date.now() - 1000 * 60 * 80).toISOString() },
    ],
  },
  {
    id: "8",
    mood: "focused",
    message: "Three hours into painting, losing track of time completely",
    author: "canvas",
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    replies: [],
  },
  {
    id: "9",
    mood: "social",
    message: "Game night with the crew, laughter filling every corner",
    author: "pixel",
    createdAt: new Date(Date.now() - 1000 * 60 * 150).toISOString(),
    replies: [
      { id: "r5", lanternId: "9", message: "Nothing beats a good game night!", author: "drift", createdAt: new Date(Date.now() - 1000 * 60 * 140).toISOString() },
    ],
  },
  {
    id: "10",
    mood: "low-energy",
    message: "Watching clouds move slowly across an afternoon sky",
    author: "haze",
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    replies: [],
  },
  {
    id: "11",
    mood: "cozy",
    message: "Finally started that book I've been putting off, it's wonderful",
    author: "page",
    createdAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    replies: [],
  },
  {
    id: "12",
    mood: "anxious",
    message: "Too many tabs open, in my browser and in my mind",
    author: "glitch",
    createdAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
    replies: [
      { id: "r6", lanternId: "12", message: "Close them one at a time, you got this", author: "fern", createdAt: new Date(Date.now() - 1000 * 60 * 290).toISOString() },
    ],
  },
  {
    id: "13",
    mood: "focused",
    message: "Writing in my journal, untangling thoughts one line at a time",
    author: "ink",
    createdAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    replies: [],
  },
  {
    id: "14",
    mood: "social",
    message: "Volunteered at the community garden, met so many kind people",
    author: "root",
    createdAt: new Date(Date.now() - 1000 * 60 * 420).toISOString(),
    replies: [],
  },
  {
    id: "15",
    mood: "low-energy",
    message: "Listening to rain sounds and letting the world blur",
    author: "drizzle",
    createdAt: new Date(Date.now() - 1000 * 60 * 480).toISOString(),
    replies: [
      { id: "r7", lanternId: "15", message: "Rain sounds are the best therapy", author: "mist", createdAt: new Date(Date.now() - 1000 * 60 * 470).toISOString() },
    ],
  },
];

let lanterns: Lantern[] = [...mockLanterns];

export async function getAllLanterns(): Promise<Lantern[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from("lanterns")
      .select("*, replies(*)")
      .order("createdAt", { ascending: false });
    if (!error && data) return data as Lantern[];
  }
  return [...lanterns].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function createLantern(
  mood: string,
  message: string,
  author: string
): Promise<Lantern> {
  const newLantern: Lantern = {
    id: crypto.randomUUID(),
    mood,
    message,
    author,
    createdAt: new Date().toISOString(),
    replies: [],
  };
  if (supabase) {
    const { replies, ...row } = newLantern;
    void replies;
    await supabase.from("lanterns").insert(row);
  }
  lanterns.unshift(newLantern);
  return newLantern;
}

export async function createReply(
  lanternId: string,
  message: string,
  author: string
): Promise<Reply> {
  const newReply: Reply = {
    id: crypto.randomUUID(),
    lanternId,
    message,
    author,
    createdAt: new Date().toISOString(),
  };
  if (supabase) {
    await supabase.from("replies").insert(newReply);
  }
  const target = lanterns.find((l) => l.id === lanternId);
  if (target) target.replies.push(newReply);
  return newReply;
}

export function getConversationCount(lantern: Lantern): number {
  return lantern.replies.length + 1;
}
