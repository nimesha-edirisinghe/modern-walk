import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card component', () => {
  const props = {
    name: 'Test Name',
    img: 'test-image.jpg',
    price: 100,
    desc: 'Test Description',
    type: "men's clothing",
  };

  test('renders card with correct data', () => {
    render(<Card {...props} />);
    const nameElement = screen.getByText(props.name);
    const priceElement = screen.getByText(`Rs : ${props.price}`);
    const descElement = screen.getByText(props.desc);
    const imgElement = screen.getByAltText('Mens Clothing');

    expect(nameElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
    expect(descElement).toBeInTheDocument();
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', props.img);
  });
});
