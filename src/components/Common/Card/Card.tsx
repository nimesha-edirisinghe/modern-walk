import { FC } from 'react';
import './Card.scss';

interface Props {
  name: string;
  img: string;
  price: number;
  desc: string;
  type?: string;
}
const Card: FC<Props> = ({ name, img, price, desc, type = 'men' }) => {
  const descBgColor = type === "men's clothing" ? '#2BD9AF' : '#FF5E84';
  return (
    <div className="card-container">
      <section className="name-section">{name}</section>
      <section className="image-section">
        <img className="image-container" src={img} alt="Mens Clothing" />
      </section>
      <section
        className="desc-section"
        style={{ backgroundColor: descBgColor }}
        data-testid="desc-section"
      >
        <div className="price-section">Rs : {price} </div>
        <div className="info-section">{desc}</div>
      </section>
    </div>
  );
};

export default Card;
