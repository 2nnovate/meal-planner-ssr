import Footer from './footer';

import styles from './Layout.module.css';

const Layout = ({ children }) => (
  <div className={styles.layout}>
    {children}
    <Footer />
  </div>
);

export default Layout;
