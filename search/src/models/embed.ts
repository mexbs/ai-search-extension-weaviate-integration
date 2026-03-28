import { pipeline } from "@xenova/transformers";

type EmbedFunction = (text: string) => Promise<number[]>;

let embedderPromise: Promise<any> | null = null;

async function getEmbedder() {
  if (!embedderPromise) {
    embedderPromise = pipeline("feature-extraction", "Xenova/all-mpnet-base-v2", {
      quantized: false, // This forces the 32-bit version to match standard Python
    });
  }
  return embedderPromise;
}

export const embed: EmbedFunction = async (text) => {
  const embedder = await getEmbedder();

  const output = await embedder(text, {
    pooling: "mean",
    normalize: true,
  });

  return Array.from(output.data);
};
