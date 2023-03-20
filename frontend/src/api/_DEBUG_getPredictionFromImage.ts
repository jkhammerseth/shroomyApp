import { mushroomFetch } from "./apicontext";
import { IMusroom } from "./interfaces";
//Gets all mushrooms from the database
const target = "mushrooms/predict";

export const _DEBUG_getPredictionFromImage: (image: File) => Promise<{
  prediction: string;
  probability: number;
}> = async (image?: File) =>
  await mushroomFetch({ endpoint: target, body: image });
