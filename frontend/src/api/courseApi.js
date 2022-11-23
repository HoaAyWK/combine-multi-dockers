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
  updateCourse(data) {
    const url = "/api/v1/Courses/update";
    return axiosClient.put(url, data);
  },
  deleteCourse() {
    const url = "/api/v1/Courses/delete";
    return axiosClient.delete(url);
  },
};
export default courseApi;
