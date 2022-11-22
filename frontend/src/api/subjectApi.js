import axiosClient from "./axiosClient";
const subjectApi = {
  getSubject() {
    const url = "/api/v1/Subjects";
    return axiosClient.get(url);
  },
  getSubjectId(id) {
    const url = `/api/v1/Subjects/${id}`;
    return axiosClient.get(url);
  },
  createSubject(data) {
    const url = "/api/v1/Subjects/create";
    return axiosClient.post(url, data);
  },
  updateSubject(id, data) {
    const url = `/api/v1/Subjects/update?id=${id}`;
    return axiosClient.put(url, data);
  },
  deleteSubject(id) {
    const url = `/api/v1/Subjects/delete?SubjectId=${id}`;
    return axiosClient.delete(url);
  },
};
export default subjectApi;
