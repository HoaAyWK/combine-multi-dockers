import axiosClient from "./axiosClient";
const intructorApi = {
  getInstructor() {
    const url = "/api/v1/Instructors";
    return axiosClient.get(url);
  },
  getInstructorId(id) {
    const url = `/api/v1/Instructors/${id}`;
    return axiosClient.get(url);
  },
  createInstructor(data) {
    const url = `/api/v1/Instructors/create`;
    return axiosClient.post(url, data);
  },
  updateInstructor(id, data) {
    const url = `/api/v1/Instructors/update?id=${id}`;
    return axiosClient.put(url, data);
  },
  deleteInstructor(id) {
    const url = `/api/v1/Instructors/${id}`;
    return axiosClient.delete(url);
  },
};
export default intructorApi;
