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
    route("/home", "./app/home/Home.tsx"),
    route("/modules", "./app/modules/Modules.tsx", [
      //route(":moduleID", "./app/modules/TopicPage.tsx")
    ]),
    route("/studyplan", "./app/studyplan/Studyplan.tsx"),
    //route("/todo", "./app/todo/Todo.tsx"),
  ])
] satisfies RouteConfig;
