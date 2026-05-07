import { API } from "../_api";

export const getAuthors = async () => {
  const { data } = await API.get("authors");
  return data.data;
};

export const createAuthor = async (authorData) => {
  const formData = new FormData();
  formData.append("name", authorData.name);
  formData.append("bio", authorData.bio);
  if (authorData.photo) {
    formData.append("photo", authorData.photo);
  }

  const { data } = await API.post("authors", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return data.data;
};

export const updateAuthor = async (id, authorData) => {
  const formData = new FormData();
  formData.append("name", authorData.name);
  formData.append("bio", authorData.bio);
  if (authorData.photo) {
    formData.append("photo", authorData.photo);
  }
  formData.append("_method", "PUT");

  const { data } = await API.post(`authors/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return data.data;
};

export const deleteAuthor = async (id) => {
  const { data } = await API.delete(`authors/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return data;
};
