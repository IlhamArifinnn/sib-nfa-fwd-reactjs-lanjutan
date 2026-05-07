import { API } from "../_api";

export const getTransactions = async () => {
  try {
    const { data } = await API.get("/transactions", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return data.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

export const createTransaction = async (transactionData) => {
  try {
    const { data } = await API.post("/transactions", transactionData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return data.data;
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw error;
  }
};
