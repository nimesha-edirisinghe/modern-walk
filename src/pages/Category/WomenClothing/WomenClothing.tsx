import { FC, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  IProduct,
  getProductRequest,
  productSliceSelector,
} from 'store/slices/productSlice';
import { useSelector } from 'react-redux';
import Card from 'components/Common/Card/Card';
import PageLayout from 'components/Layout/PageLayout/PageLayout';

interface Props {}

const WomenClothing: FC<Props> = () => {
  const dispatch = useDispatch();
  const productState: IProduct = useSelector(productSliceSelector);
  const products = productState.products;

  const womenProducts = products.filter(
    (item) => item.category === "women's clothing"
  );

  useEffect(() => {
    dispatch(getProductRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const womenPageContent = useCallback(() => {
    return (
      <main className="home-page-container">
        <section className="home-title-section">Women's Clothing</section>
        <section className="home-card-section">
          {womenProducts.map((item) => (
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
      <PageLayout children={womenPageContent()} />
    </>
  );
};

export default WomenClothing;
