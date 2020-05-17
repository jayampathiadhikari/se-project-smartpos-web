
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
import AddUser from "./views/examples/AddUser";
import ResetPassword from "./views/examples/ResetPassword";
//agent
import AddEmployeeAgent from "./views/agent/AddEmployeeAgent";
import AgentMap from "./views/agent/Maps";
//executive
import AddEmployeeEx from "./views/executive/AddEmployeeEx";
import ExecMap from './views/executive/Maps';
import StockReq from "./views/executive/StockReq";
import MyAgents from "./views/executive/MyAgents";

/**
 *changed tables to TestComponent
 */

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
    path: "/adduser",
    name: "Add Employee",
    icon: "ni ni-circle-08 text-pink",
    component: AddUser,
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
    layout: "/executive"
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
  {
    path: "/edit",
    name: "Edit",
    icon: "ni ni-circle-08 text-pink",
    component: Edit,
    layout: "/admin"
  },
  {
    path: "/reset-password",
    name: "Reset Password",
    icon: "ni ni-circle-08 text-pink",
    component: ResetPassword,
    layout: "/executive"
  },
//
  {
    path: "/agent-profile",
    name: "Agent Profile",
    icon: "ni ni-single-02 text-yellow",
    component: AgentProfile,
    layout: "/executive"
  },
  {
    path: "/owner-profile",
    name: "Profile",
    icon: "ni ni-single-02 text-yellow",
    component: OwnerProfile,
    layout: "/executive"
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
    layout: "/executive"
  },
  {
    path: "/edit",
    name: "Edit",
    icon: "ni ni-circle-08 text-pink",
    component: Edit,
    layout: "/executive"
  },

];

export const executiveSidebar = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/executive"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: ExecMap,
    layout: "/executive"
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/executive"
  },
  {
    path: "/add-employee",
    name: "Add Employee",
    icon: "ni ni-circle-08 text-primary",
    component: AddEmployeeEx,
    layout: "/executive"
  },
  {
    path: "/stock-requests",
    name: "Stock Requests",
    icon: "ni ni-box-2 text-red",
    component: StockReq,
    layout: "/executive"
  },
  {
    path: "/my-agents",
    name: "My Agents",
    icon: "ni ni-user-run text-primary",
    component: MyAgents,
    layout: "/executive"
  },

];
export const agentSidebar = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/agent"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: AgentMap,
    layout: "/agent"
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/agent"
  },
  {
    path: "/adduser",
    name: "Add Employee",
    icon: "ni ni-circle-08 text-pink",
    component: AddEmployeeAgent,
    layout: "/agent"
  }
];



export default [...sideBarRoutes,...hiddenRoutes,...executiveSidebar, ...agentSidebar];
