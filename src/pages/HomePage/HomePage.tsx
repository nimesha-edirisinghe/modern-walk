import { FC, useCallback, useEffect } from 'react';
import PageLayout from '../../components/Layout/PageLayout/PageLayout';
import './HomePage.scss';
import Card from '../../components/Common/Card/Card';
import { useDispatch } from 'react-redux';
import {
  IProduct,
  getProductRequest,
  productSliceSelector,
} from 'store/slices/productSlice';
import { useSelector } from 'react-redux';
import Button from 'components/MicroCompoponents/Button';
import { useNavigate } from 'react-router-dom';

interface Props {}

const HomePage: FC<Props> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productState: IProduct = useSelector(productSliceSelector);
  const products = productState.products;

  useEffect(() => {
    dispatch(getProductRequest());
  }, []);

  const homePageContent = useCallback(() => {
    return (
      <main className="home-page-container">
        <section className="home-title-section">Flash Sale</section>
        <section className="home-card-section">
          {products.map((item) => (
            <Card
              key={item.id}
              name={item.title}
              desc={item.description}
              img={item.image}
              price={item.price}
              type={item.category}
            />
          ))}
        </section>

        <section className="home-category-section">Catagories</section>
        <section className="home-button-section">
          <Button onClick={() => navigate('/men-clothing')}>
            Men's Clothing
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate('/women-clothing')}
          >
            Women's Clothing
          </Button>
        </section>
      </main>
    );
  }, [products]);

  return (
    <>
      <PageLayout children={homePageContent()} />
    </>
  );
};

export default HomePage;
