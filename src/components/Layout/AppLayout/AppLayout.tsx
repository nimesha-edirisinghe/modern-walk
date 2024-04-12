import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import './AppLayout.scss';

const AppLayout = () => {
  return (
    <main className="layout-container">
      <section>
        <Header />
        <Outlet />
      </section>
    </main>
  );
};

export default AppLayout;
