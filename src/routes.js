
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
import RequestStock from "./views/agent/Request Stock";
import MyShops from "./views/agent/My Shops";
import ShopSuggestShop from "./views/agent/Shop-SuggestShop";
import MyReports from "./views/agent/My Reports";
import MyStock from "./views/agent/My Stock";
import MyStockLoad from "./views/agent/My Stock - Load";
import MyStockAddToWarehouse from "./views/agent/My Stock - AddToWarehouse";
//executive
import AddEmployeeEx from "./views/executive/AddEmployeeEx";
import ExecMap from './views/executive/Maps';
import StockReq from "./views/executive/StockReq";
import MyAgents from "./views/executive/MyAgents";
import Stock from "./views/executive/Stock";
import StockAddNewProduct from "./views/executive/Stock-AddNewProduct";
import StockAddToWarehouse from "./views/executive/Stock-AddToWarehouse";
import ExecReports from "./views/executive/Reports";
import ViewReports from "./views/executive/ViewReports";
import AcceptShop from "./views/executive/AcceptShop";
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
  {
    path: "/my-stock/add-new-product",
    name: "add new product",
    icon: "ni ni-circle-08 text-pink",
    component: StockAddNewProduct,
    layout: "/executive"
  },
  {
    path: "/my-stock/add-to-warehouse",
    name: "add to warehouse",
    icon: "ni ni-circle-08 text-pink",
    component: StockAddToWarehouse,
    layout: "/executive"
  },
  {
    path: "/reports/view-reports",
    name: "View Reports",
    icon: "ni ni-circle-08 text-pink",
    component: ViewReports,
    layout: "/executive"
  },
  {
    path: "/my-shops/suggest-shop",
    name: "suggest shop",
    icon: "ni ni-circle-08 text-pink",
    component: ShopSuggestShop,
    layout: "/agent"
  },
  {
    path: "/my-stock/load",
    name: "load",
    icon: "ni ni-circle-08 text-pink",
    component: MyStockLoad,
    layout: "/agent"
  },
  {
    path: "/my-stock/add-to-warehouse",
    name: "add to warehouse",
    icon: "ni ni-circle-08 text-pink",
    component: MyStockAddToWarehouse,
    layout: "/agent"
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
    icon: "ni ni-delivery-fast text-red",
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
  {
    path: "/my-stock",
    name: "My Stock",
    icon: "ni ni-box-2 text-primary",
    component: Stock,
    layout: "/executive"
  },
  {
    path: "/reports",
    name: "Reports",
    icon: "ni ni-collection text-primary",
    component: ExecReports,
    layout: "/executive"
  },
  {
    path: "/accept-shop",
    name: "Accept shop",
    icon: "ni ni-shop text-primary",
    component: AcceptShop,
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
  },
  {
    path: "/request-stock",
    name: "Request Stock",
    icon: "ni ni-delivery-fast text-red",
    component: RequestStock,
    layout: "/agent"
  },
  {
    path: "/my-shops",
    name: "My Shops",
    icon: "ni ni-shop text-primary",
    component: MyShops,
    layout: "/agent"
  },
  {
    path: "/my-reports",
    name: "My Reports",
    icon: "ni ni-collection text-primary",
    component: MyReports,
    layout: "/agent"
  },
  {
    path: "/my-stock",
    name: "My Stock",
    icon: "ni ni-box-2 text-primary",
    component: MyStock,
    layout: "/agent"
  },
];



export default [...sideBarRoutes,...hiddenRoutes,...executiveSidebar, ...agentSidebar];
