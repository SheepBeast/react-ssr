import NestedRoute from "./NestedRoute";
import StatusRoute from "./StatusRoute";

import loadable from "@loadable/component";

// import Bar from "../views/Bar";
// import Baz from "../views/Baz";
// import Foo from "../views/Foo";
// import TopList from "../containers/TopList";
// import TopDetail from "../containers/TopDetail";

const router = [
  {
    path: "/bar",
    component: loadable(() => import("../views/Bar"))
  },
  {
    path: "/baz",
    component: loadable(() => import("../views/Baz"))
  },
  {
    path: "/foo",
    component: loadable(() => import("../views/Foo"))
  },
  {
    path: "/top-list",
    component: loadable(() => import("../containers/TopList")),
    exact: true
  },
  {
    path: "/top-list/:id",
    component: loadable(() => import("../containers/TopDetail"))
  }
];

export default router;

export {
  router,
  NestedRoute,
  StatusRoute
}
