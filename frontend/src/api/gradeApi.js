import axiosClient from "./axiosClient";

const gradeApi = {
  getGrades() {
    const url = "/api/v1/Grades";
    return axiosClient.get(url);
  },
  getGradesId(id) {
    const url = `/api/v1/Grades/${id}`;
    return axiosClient.get(url);
  },
  createGrades(data) {
    const url = "/api/v1/Grades/create";
    return axiosClient.post(url, data);
  },
  deleteGrades(id) {
    const url = `/api/v1/Grades/${id}`;
    return axiosClient.delete();
  },
};
export default gradeApi;
