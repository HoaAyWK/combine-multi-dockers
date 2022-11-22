import axios from "axios";

// trong create truyền vào những config
const axiosClient = axios.create({
  // tức là khi gọi API luôn luôn bắt đầu bằng 1 cái đường dẫn nó khác là chỉ khác cái path name thôi (khi mình gọi API thì mình chỉ cần chỉ định cái phía sau thôi)
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/JSON",
  },
});

//* Interceptors
// mình muốn làm cái gì đấy cho tất cả các request hoặc cho tất cả các response mình có thể gắn cái Interceptors này vào
// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const { config, status, data } = error.response;
    console.log(error.message);
    const URLs = [
      "/api/v1/Auth/login",

      "/api/v1/Courses",
      "/api/v1/Courses/:id",
      "/api/v1/Courses/create",
      "/api/v1/Courses/update",
      "/api/v1/Courses/delete",

      "/api/v1/Enrollments",
      "/api/v1/Enrollments/:id",
      "/api/v1/Enrollments/create",
      "/api/v1/Enrollments/delete",

      "/api/v1/Grades",
      "/api/v1/Grades/:id",
      "/api/v1/Grades/create",
      "/api/v1/Grades/delete",

      "/api/v1/Instructors",
      "/api/v1/Semesters",
      "/api/v1/Students",
      "/api/v1/Subjects",
    ];
    if (
      (URLs.includes(config.url) && status === 500) ||
      status == 400 ||
      status == 401 ||
      status == 404
    ) {
      throw new Error(data.message);
    }
    return Promise.reject(error);
  }
);
export default axiosClient;
