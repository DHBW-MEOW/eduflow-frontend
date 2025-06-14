import {
  type RouteConfig,
  route,
  index,
  layout,
  prefix,
} from "@react-router/dev/routes";

export default [
  index("./app/start/Start.tsx"),
  route("/login", "./app/login/Login.tsx"),
  route("/register", "./app/register/Register.tsx"),
  layout("./app/AppLayout.tsx", [
    route("/profile", "./app/profile/Profile.tsx"),
    route("/home", "./app/home/Home.tsx"),
    route("/studyplan", "./app/studyplan/Studyplan.tsx"),

    route("/modules", "./app/modules/ModulPage.tsx",),
    route("/modules/:moduleId", "./app/modules/TopicPage.tsx"),
    route("/modules/:moduleId/topics/:topicId", "./app/modules/DetailTopicPage.tsx"),
    route("/modules/:moduleId/exams/:examId", "./app/modules/DetailExamPage.tsx"),
  ]),
  //route("/todo", "./app/todo/Todo.tsx"),
] satisfies RouteConfig;