
import Index from "views/Index.js";
import OwnerProfile from "views/examples/Profile.js";
import AgentProfile from "views/agent/Profile.js";
//import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Mapbox from "./views/examples/Mapbox3";
//import Icons from "views/examples/Icons.js";
import Edit from "views/examples/Edit.js";

export var sideBarRoutes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Mapbox,
    layout: "/admin"
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin"
  },

  {
    path: "/edit",
    name: "Edit",
    icon: "ni ni-circle-08 text-pink",
    component: Edit,
    layout: "/admin"
  }
];
var hiddenRoutes = [
  {
    path: "/agent-profile",
    name: "Agent Profile",
    icon: "ni ni-single-02 text-yellow",
    component: AgentProfile,
    layout: "/admin"
  },
  {
    path: "/owner-profile",
    name: "Profile",
    icon: "ni ni-single-02 text-yellow",
    component: OwnerProfile,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth"
  },
]

export default [...sideBarRoutes,...hiddenRoutes];
