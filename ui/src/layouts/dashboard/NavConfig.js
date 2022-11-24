import Iconify from "../../components/Iconify";

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: "student",
    path: "/dashboard/students",
    icon: getIcon("clarity:node-group-line"),
  },
  {
    title: "instructor",
    path: "/dashboard/instructors",
    icon: getIcon("eva:pie-chart-2-fill"),
  },
  {
    title: "course",
    path: "/dashboard/courses",
    icon: getIcon("ic:round-work"),
  },
  {
    title: "subject",
    path: "/dashboard/subjects",
    icon: getIcon("clarity:employee-group-solid"),
  },
  {
    title: "enrollment",
    path: "/dashboard/enrollments",
    icon: getIcon("ic:round-people"),
  },
  {
    title: "grade",
    path: "/dashboard/grades",
    icon: getIcon("ic:outline-category"),
  },

  {
    title: "semester",
    path: "/dashboard/semesters",
    icon: getIcon("mdi:package-outline"),
  },
];

export default navConfig;
