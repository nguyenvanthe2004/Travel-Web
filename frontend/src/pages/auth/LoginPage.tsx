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
            src="/images/bg-login.png"
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