import axiosClient from "./axiosClient";

const enrollmentApi = {
  getEnrollments() {
    const url = "/api/v1/Enrollments";
    return axiosClient.get(url);
  },
  getEnrollmentsId(id) {
    const url = `/api/v1/Enrollments/${id}`;
    return axiosClient.get(url);
  },
  createEnrollments(data) {
    const url = `/api/v1/Enrollments/create`;
    return axiosClient.post(url, data);
  },
  deleteEnrollments(id) {
    const url = `/api/v1/Enrollments/${id}`;
    return axiosClient.delete(url);
  },
};
export default enrollmentApi;
