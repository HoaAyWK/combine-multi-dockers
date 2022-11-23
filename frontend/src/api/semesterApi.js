import axiosClient from "./axiosClient";
const semesterApi = {
  getSemester() {
    const url = "/api/v1/Semesters";
    return axiosClient.get(url);
  },
  getSemesterId(id) {
    const url = `/api/v1/Semesters/${id}`;
    return axiosClient.get(url);
  },
  createSemester(data) {
    const url = `/api/v1/Semesters/create`;
    return axiosClient.post(url, data);
  },
  updateSemester(id, data) {
    const url = `/api/v1/Semesters/update?id=${id}`;
    return axiosClient.put(url, data);
  },
  deleteSemester(id) {
    const url = `/api/v1/Semesters/delete?SemesterId=${id}`;
    return axiosClient.delete(url);
  },
};
export default semesterApi;
