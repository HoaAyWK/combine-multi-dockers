import axiosClient from "./axiosClient";
const courseApi = {
  getCourses() {
    const url = "/api/v1/Courses";
    return axiosClient.get(url);
  },
  getCoursesId(id) {
    const url = `/api/v1/Courses/${id}`;
    return axiosClient.get(url);
  },
  createCourse(data) {
    const url = "/api/v1/Courses/create";
    return axiosClient.post(url, data);
  },
  updateCourse(id, data) {
    const url = `/api/v1/Courses/update?id=${id}`;
    return axiosClient.put(url, data);
  },
  deleteCourse(id) {
    const url = `/api/v1/Courses/${id}`;
    return axiosClient.delete(url);
  },
};
export default courseApi;
