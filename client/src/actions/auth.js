import * as api from "../api/index";

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signup(formData);
    console.log(data);

    dispatch({ type: "AUTH", payload: data });
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};
export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signin(formData);
    // console.log(data);

    dispatch({ type: "AUTH", payload: data });
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};
