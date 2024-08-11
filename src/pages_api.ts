import axios from "axios";
import { Image } from "./types";

axios.defaults.baseURL = "https://api.unsplash.com";
axios.defaults.headers.common[
  "Authorization"
] = `Client-ID KE2eNsmbWOmdm1I1oKpIQqQofZoMX8u9JE1HJVUqoVw`;

export const fetchImages = async (
  topic: string,
  currentPage: number = 1
): Promise<Image[]> => {
  const res = await axios.get("/search/photos", {
    params: {
      query: topic,
      page: currentPage,
      per_page: 12,
    },
  });
  return res.data.results;
};
