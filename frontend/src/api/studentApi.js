import axiosClient from "./axiosClient";
const studentApi = {
  getStudent() {
    const url = "/api/v1/Students";
    return axiosClient.get(url);
  },
  getStudentId(id) {
    const url = `/api/v1/Students/${id}`;
    return axiosClient.get(url);
  },
  createStudent(data) {
    const url = "/api/v1/Students/create";
    return axiosClient.post(url, data);
  },
  updateStudent(id, data) {
    const url = `/api/v1/Students/update?id=${id}`;
    return axiosClient.put(url, data);
  },
  deleteStudent(id) {
    const url = `/api/v1/Students/delete?StudentId=${id}`;
    return axiosClient.delete(url);
  },
};
export default studentApi;
