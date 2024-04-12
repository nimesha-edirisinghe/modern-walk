import { ReactNode } from 'react';
import './PageLayout.scss';

type Props = {
  children: ReactNode;
};

const PageLayout = ({ children }: Props) => {
  return <main className="page-layout-container">{children}</main>;
};

export default PageLayout;
