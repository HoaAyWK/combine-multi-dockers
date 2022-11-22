import axiosClient from "./axiosClient";
const Api = {
  login(data) {
    const url = "/api/v1/Auth/login";
    return axiosClient.post(url, data);
  },

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
  deleteCourse() {
    const url = "/api/v1/Courses/delete";
    return axiosClient.delete(url);
  },

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
  deleteEnrollments() {
    const url = `/api/v1/Enrollments/delete`;
    return axiosClient.delete(url);
  },

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
  deleteGrades() {
    const url = "/api/v1/Grades/delete";
    return axiosClient.delete();
  },

  getInstructor() {
    const url = "/api/v1/Instructors";
    return axiosClient.get(url);
  },
  getInstructorId(id) {
    const url = `/api/v1/Instructors/${id}`;
    return axiosClient.get(url);
  },

  getSemester() {
    const url = "/api/v1/Semesters";
    return axiosClient.get(url);
  },
  getStudent() {
    const url = "/api/v1/Students";
    return axiosClient.get(url);
  },
  getSubject() {
    const url = "/api/v1/Subjects";
    return axiosClient.get(url);
  },
};
export default Api;
