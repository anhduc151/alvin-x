import ChangePass from "./Auth/ChangePass";
import ForgotPassword from "./Auth/ForgotPass";
import SignIn from "./Auth/SignIn";
import SignInOTP from "./Auth/SignIn/OTP";
import SignUp from "./Auth/SignUp";
import VerifyEmail from "./Auth/Verify";
import DashBoard from "./pages/Dashboard";
import Home from "./pages/Home";

interface RouteItem {
  path: string;
  component: React.ComponentType<any>;
  layout?: React.ComponentType<any> | null;
}

const RoutesApp: RouteItem[] = [
  { path: "/", component: Home },
  { path: "/sign-in", component: SignIn, layout: null },
  { path: "/sign-up", component: SignUp, layout: null },
  { path: "/forgot-password", component: ForgotPassword, layout: null },
  { path: "/verify-email/:email", component: VerifyEmail, layout: null },
  { path: "/sign-in-otp", component: SignInOTP, layout: null },
  { path: "/changepass", component: ChangePass, layout: null },
  { path: "/dashboard", component: DashBoard },
  // { path: "/dashboard/:id", component: CoinDetails },
  // { path: "/blog", component: Blog },
  // { path: "/blog/:id", component: BlogDetail },
  // { path: "/posts-crypto", component: PostCrypto },
  // { path: "/posts-crypto/:id", component: DetailsPosts },
  // { path: "/blogs", component: BlogLanding, layout: null },
  // { path: "/post-crypto", component: HotPosts, layout: null },
  // { path: "/topics", component: Topics },
  // { path: "/topics/:topicId", component: TopicPosts },
  
];

export { RoutesApp };
