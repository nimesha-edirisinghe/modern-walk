import { FC } from 'react';
import './Header.scss';
import { useNavigate } from 'react-router-dom';

interface Props {}

const Header: FC<Props> = () => {
  const navigate = useNavigate();
  return (
    <main className="header-container">
      <div className="header-title" onClick={() => navigate('/')}>
        Modern Walk
      </div>
    </main>
  );
};

export default Header;
