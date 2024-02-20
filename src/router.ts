import LoginAdmin from "./Admin/Login";
import CreateBlog from "./Admin/pages/Create-Blog";
import CreatePosts from "./Admin/pages/Create-Posts";
import CreateTopics from "./Admin/pages/Create-Topics";
import DashboardAdmin from "./Admin/pages/Dashboard-Admin";
import ChangePass from "./Auth/ChangePass";
import ForgotPassword from "./Auth/ForgotPass";
import SignIn from "./Auth/SignIn";
import SignInOTP from "./Auth/SignIn/OTP";
import SignUp from "./Auth/SignUp";
import VerifyEmail from "./Auth/Verify";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/Blog/DetailsBlog";
import DashBoard from "./pages/Dashboard";
import BlogLanding from "./pages/Landingpages/Blog-Landing";
import Home from "./pages/Landingpages/Home";
import HotPosts from "./pages/Landingpages/Post-Crypto";
import NotFound from "./pages/NotFound";
import PostCrypto from "./pages/Post";
import DetailsPosts from "./pages/Post/DetailsPost";
import Topics from "./pages/Topics";
import TopicsPost from "./pages/Topics/Topics_Post";

interface RouteItem {
  path: string;
  component: React.ComponentType<any>;
  layout?: React.ComponentType<any> | null;
}

const RoutesApp: RouteItem[] = [
  { path: "/", component: Home, layout: null },
  { path: "/sign-in", component: SignIn, layout: null },
  { path: "/sign-up", component: SignUp, layout: null },
  { path: "/forgot-password", component: ForgotPassword, layout: null },
  { path: "/verify-email/:email", component: VerifyEmail, layout: null },
  { path: "/sign-in-otp", component: SignInOTP, layout: null },
  { path: "/changepass", component: ChangePass, layout: null },
  { path: "/dashboard", component: DashBoard },
  // { path: "/dashboard/:id", component: CoinDetails },
  { path: "/blog", component: Blog },
  { path: "/blog/:id", component: BlogDetail },
  { path: "/posts-crypto", component: PostCrypto },
  { path: "/posts-crypto/:id", component: DetailsPosts },
  { path: "/blogs", component: BlogLanding, layout: null },
  { path: "/post-crypto", component: HotPosts, layout: null },
  { path: "/topics", component: Topics },
  { path: "/topics/:topicId", component: TopicsPost },

  // Routes Admin
  { path: "/admin", component: LoginAdmin, layout: null },
  { path: "/admin/dashboard", component: DashboardAdmin, layout: null },
  { path: "/admin/create-blog", component: CreateBlog, layout: null },
  { path: "/create-posts", component: CreatePosts, layout: null },
  { path: "/create-topics", component: CreateTopics, layout: null },

  // 404
  { path: "/404", component: NotFound, layout: null },
];

export { RoutesApp };
