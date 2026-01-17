import instance from "./req";

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("files", file);
  return await instance.post("/files/upload-single", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
