import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import CreateUser from "../../Types/User.types";
import { BACK_END_USER } from "../../Constants";

/**
 * Async thunk for creating a user
 */
const createUser = createAsyncThunk(
  "data/createUser",
  async (payloadData: CreateUser) => {
    const response = await axios.post(`${BACK_END_USER}/sign-up`, payloadData);
    return response.status;
  }
);

export default createUser;
