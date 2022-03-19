const HomeCard = ({ title, subtitle, imageUrl, isDarkText }) => {
  return (
    <section className="section">
      <article className="img-container">
        <img className="img" alt="" src={imageUrl} />
        <div className="text-wrapper">
          <div className="text-container">
            <div className="flex-container">
              <h2
                className={`heading has-text-weight-semibold ${
                  isDarkText && "is-text-black"
                }`}
              >
                {title}
              </h2>
              <h3
                className={`sub-heading has-text-weight-semibold ${
                  isDarkText && "is-text-black"
                }`}
              >
                {subtitle}
              </h3>
              <div className="btn-container">
                <button className="btn">
                  <span className="has-text-weight-semibold">Shop Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default HomeCard;
