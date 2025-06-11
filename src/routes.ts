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
    
    route("/modules", "./app/modules/ModulPage.tsx", [
      route("/:moduleId", "./app/modules/TopicPage.tsx", [
        route("/topics/:topicId", "./app/modules/DetailTopicPage.tsx"),
        route("/exams/:examId", "./app/modules/DetailExamPage.tsx"),
      ]),
    ]),
    route("/studyplan", "./app/studyplan/Studyplan.tsx"),
    //route("/todo", "./app/todo/Todo.tsx"),
  ])
] satisfies RouteConfig;
