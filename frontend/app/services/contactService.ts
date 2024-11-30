import { Contact } from "~/routes/_index";
import axiosInstance from "./axiosInstance";



export const getContactsList = async ():Promise<Contact[]> => {
  try {
    const response = await axiosInstance.get("contacts-list/");
    
    return response.data;
  } catch (error) {
    throw error;
  }
};



