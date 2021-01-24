import Footer from '../../components/footer';

import styles from './index.module.scss';

const Index = ({ children }) => (
  <div>
    <div className={styles.content}>
      {children}
    </div>
    <Footer />
  </div>
);

export default Index;
