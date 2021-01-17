import Link from 'next/link'
import Image from 'next/image'
import {
  Button,
} from 'antd';

import styles from './index.module.css';


const mainPage = () => (
    <div className={styles.cover}>
      <h1>나만의 식단 구성하기</h1>
      <div className={styles.description}>
        체중 조절 목표를 설정하고 나에게 맞는 식단을 구성해보세요.
      </div>
      <div className={styles.coverImage}>
        <Image
            src="/coverMain.png"
            layout="responsive"
            width={280}
            height={280}
        />
      </div>
      <Link href="/config/goal">
        <Button
            type="primary"
            size="large"
            block
        >
          나만의 식단 구성하기
        </Button>
      </Link>
    </div>
);

export default mainPage;
