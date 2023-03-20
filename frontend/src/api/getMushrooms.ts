import { mushroomFetch } from "./apicontext";
import { IMusroom } from "./interfaces";
//Gets all mushrooms from the database
const endpoint = "mushrooms";

export const getMushrooms: () => Promise<[IMusroom]> = async () =>
  await mushroomFetch({ endpoint });
