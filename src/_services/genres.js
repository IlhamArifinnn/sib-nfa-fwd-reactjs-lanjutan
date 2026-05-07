import { API } from "../_api";

export const getGenres = async () => {
  const { data } = await API.get("genres");
  return data.data;
};

export const createGenre = async (genreData) => {
  const { data } = await API.post("genres", genreData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return data.data;
};

export const updateGenre = async (id, genreData) => {
  const { data } = await API.put(`genres/${id}`, genreData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return data.data;
};

export const deleteGenre = async (id) => {
  const { data } = await API.delete(`genres/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return data;
};
