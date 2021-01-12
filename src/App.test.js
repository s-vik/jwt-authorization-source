
import { authAPI } from "./api/api";
import { login } from "./redux/auth-reducer";

jest.mock("./api/api");

const authAPIMock = authAPI;

const response = {
  data: {
    statusCode: 200,
    body: {
      access_token: "access_token",
      refresh_token: "refresh_token",
    },
  },
};

test("success login", async () => {
  authAPIMock.loginUser.mockReturnValue(Promise.resolve(response));
  const thunk = login("any1@yo.com", 124816);
  const dispatchMock = jest.fn();

  await thunk(dispatchMock);
  expect(dispatchMock).toBeCalledTimes(3);
});

