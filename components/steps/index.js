import styles from './index.module.css';

const Cover = () => (
    <div className={styles.cover}>
      <h1>나만의 식단 구성하기</h1>
      <div className={styles.description}>
        체중 조절 목표를 설정하고 나에게 맞는 식단을 구성해보세요.
      </div>
    </div>
);

export default Cover;
