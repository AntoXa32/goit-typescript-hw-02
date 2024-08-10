import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com";
axios.defaults.headers.common[
  "Authorization"
] = `Client-ID KE2eNsmbWOmdm1I1oKpIQqQofZoMX8u9JE1HJVUqoVw`;

export const fetchImages = async (topic, currentPage = 1) => {
  const res = await axios.get("/search/photos", {
    params: {
      query: topic,
      page: currentPage,
      per_page: 12,
    },
  });
  return res.data.results;
};
