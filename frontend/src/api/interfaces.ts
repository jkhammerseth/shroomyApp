export interface IMusroom {
  id: number;
  name: string;
  description: string;
  edible: boolean;
  poisonous: boolean;
  area: string;
  image_url: string;
  latin_name: string;
}
export interface IPrediction {
  prediction: IMusroom[];
  name: string;
  probability: number; //Number between 0 and 1
}
