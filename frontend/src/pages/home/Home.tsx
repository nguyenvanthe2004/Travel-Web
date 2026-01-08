import type React from "react";
import HomeLayout from "../../layouts/HomeLayout";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

const Home: React.FC = () => {
    const current = useSelector((state: RootState) => state.auth.currentUser);

    return (
        <HomeLayout>
            <div>Home Page</div>
            <h2>Welcome to the Home Page</h2>
            <h4>{current?.email}</h4>
        </HomeLayout>
    );
}
export default Home;
