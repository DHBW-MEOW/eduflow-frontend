import {
  type RouteConfig,
  route,
  index,
  layout,
  prefix,
} from "@react-router/dev/routes";

export default [
  layout("./app/Layout.tsx", [
    index("./app/home/Home.tsx"),

    route("/modules", "./app/modules/ModulPage.tsx"),
    route("/modules/:moduleId", "./app/modules/TopicPage.tsx"),
    route("/modules/:moduleId/topics/:topicId", "./app/modules/DetailPage.tsx"),

    route("/studyplan", "./app/studyplan/Studyplan.tsx"),
    //route("/todo", "./app/todo/Todo.tsx"),
  ])
] satisfies RouteConfig;