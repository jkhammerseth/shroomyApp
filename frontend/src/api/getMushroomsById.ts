import { mushroomFetch } from "./apicontext";
import { IMusroom } from "./interfaces";
//Gets all mushrooms from the database
const endpoint = "mushrooms";

export const getMushroomsById: (id: number) => Promise<IMusroom> = async (id) =>
  await mushroomFetch({ endpoint: endpoint + "/" + id });
