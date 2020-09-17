import * as actionTypes from "../action/actionTypes";
import reducer from "./auth";

describe("auth reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined)).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: null,
      authRedirect: "/",
    });
  });
  it("should store the token upon login", () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: null,
          authRedirect: "/",
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          idToken: "some-token",
          userId: "some-user",
        }
      )
    ).toEqual({
      type: actionTypes.AUTH_SUCCESS,
      idToken: "some-token",
      userId: "some-user",
    });
  });
});
