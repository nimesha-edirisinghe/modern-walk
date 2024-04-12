import { FC, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  IProduct,
  getProductRequest,
  productSliceSelector,
} from 'store/slices/productSlice';
import { useSelector } from 'react-redux';
import PageLayout from 'components/Layout/PageLayout/PageLayout';
import Card from 'components/Common/Card/Card';

interface Props {}

const MensClothing: FC<Props> = () => {
  const dispatch = useDispatch();
  const productState: IProduct = useSelector(productSliceSelector);
  const products = productState.products;

  const menProducts = products.filter(
    (item) => item.category === "men's clothing"
  );

  useEffect(() => {
    dispatch(getProductRequest());
  }, []);

  const menPageContent = useCallback(() => {
    return (
      <main className="home-page-container">
        <section className="home-title-section">Mens Clothing</section>
        <section className="home-card-section">
          {menProducts.map((item) => (
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
      </main>
    );
  }, [products]);

  return (
    <>
      <PageLayout children={menPageContent()} />
    </>
  );
};

export default MensClothing;
