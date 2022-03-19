import "./Home.css";
import HomeCard from "./HomeCard";
import { cardsData } from "./cardsData";
import { categoriesData } from "./categoriesData";
import CategoryCard from "./CategoryCard";

const Home = () => {
  return (
    <main>
      <div className="layout">
        <section className="section categories">
          <h2 className="title">Trending categories</h2>
          {/* Trending Categories Cards */}
          <div className="categories-list">
            {categoriesData.map((card, index) => (
              <CategoryCard key={index} {...card} />
            ))}
          </div>
        </section>

        {/* Cards */}
        {cardsData.map((card, index) => (
          <HomeCard key={index} {...card} />
        ))}
      </div>
    </main>
  );
};

export default Home;
