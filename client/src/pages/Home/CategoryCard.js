const CategoryCard = ({ title, imageUrl }) => {
  return (
    <a className="category-item">
      <img className="circular-img" alt="" src={imageUrl} />
      <h2 className="category-title">{title}</h2>
    </a>
  );
};

export default CategoryCard;
