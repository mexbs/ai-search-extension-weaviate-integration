import { Weaviate } from "./Weaviate";
import { embed } from "./embed";

let instance: Weaviate | null = null;

export async function initWeaviate() {
  instance = await Weaviate.create(embed);
}

export function getWeaviate(): Weaviate {
  if (!instance) {
    throw new Error("Weaviate not initialized");
  }
  return instance;
}
