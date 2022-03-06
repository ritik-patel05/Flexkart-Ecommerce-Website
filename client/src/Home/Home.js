import "./Home.css";
import HomeCard from "./HomeCard";
import { cardsData } from "./cardsData";

const Home = () => {
  return (
    <main>
      <div className="layout">
        <div className="categories">
          <h2 className="title">Trending categories</h2>
          <div className="categories-list"></div>
        </div>

        {/* Cards */}
        {cardsData.map((card, index) => (
          <HomeCard key={index} {...card} />
        ))}
      </div>
    </main>
  );
};

export default Home;
