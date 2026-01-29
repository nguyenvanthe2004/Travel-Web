import instance from "./req";

export const callGetAllUser = (page: number, limit: number) => {
  return instance.get("/users", {
    params: { page, limit },
  });
};
