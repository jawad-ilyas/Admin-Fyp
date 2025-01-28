import Header from "../components/Header";
import SearchFilter from "../components/SearchFilter";
import CardSection from "../components/CardSection";

const Dashboard = () => {
    return (
        <div className="h-screen ">
     
            <main className=" mx-auto h-full bg-gray-700 mt-4 py-20 px-4">
                <SearchFilter />
                <CardSection />
            </main>
        </div>
    );
};

export default Dashboard;
