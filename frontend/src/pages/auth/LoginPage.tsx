import AuthHeader from "../../components/auth/AuthHeader";
import LoginForm from "../../components/auth/LoginForm";
import AuthLayout from "../../layouts/AuthLayout";

const LoginPage: React.FC = () => {

  return (
    <AuthLayout>
      <AuthHeader />
      <main className="relative flex-1 flex items-center justify-center p-3 sm:p-4 lg:p-8 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBF78ORBvxCtTdkXzK1fiX-5nXOi6J2XeArwdzt62cHaeY6iewi3IOV-dDvtI803JcjhBCHsT-LMmdEcW6BFKyBwke3pU9V2nSpTvy5LRxnY2gYju8-hVwI1eNQO0ATLmVlGLREWG9TSlJVaTb7G_-c4bi50YAr62VtXCwblEoJOvNzd54wCPnSrS_BTaHXTkTCVEEh3rjUt9fZUabOYMHqreHtHNc4WFwJwYdHpgKfAvcgNATa1rxniL0Dn8SUTx14ZQQpwdso1gw"
            className="w-full h-full object-cover block"
            alt="Background"
          />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-[440px] sm:max-w-[480px]">
          <LoginForm />
        </div>
      </main>
    </AuthLayout>
  );
};

export default LoginPage;