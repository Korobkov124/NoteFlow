import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar.jsx";
import CardsGrid from "../components/CardsGrid.jsx";
import "./Home.css";

const Home = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <div className="home">
            <Header />

            <div className="home-content">
                <div className="cards-wrapper">
                    <CardsGrid />
                </div>

                <Sidebar isOpen={isOpen} onToggle={toggleOpen} />
            </div>
        </div>
    );
}

export default Home;