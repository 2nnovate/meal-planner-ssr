import {
  useState,
  useEffect,
  useRef,
} from 'react';

import useElementWidth from '../../hooks/useElementWidth';

import styles from './index.module.scss';

const ProgressBar = (props) => {
  const {
    step,
    total,
  } = props;

  const [steps, setSteps] = useState([]);
  useEffect(() => {
    if (!total) return;

    const allStep = new Array(total);
    allStep.fill(0);
    for (let i = 0; i < step; i++) {
      allStep[i] = 1;
    }
    setSteps(allStep);
  }, [total, step]);

  const containerRef = useRef(null);
  const containerWidth = useElementWidth(containerRef);

  return (
      <div ref={containerRef} >
        <div className={styles["progress-info"]}>
          {step} / {total}
        </div>
        <div className={styles["progress-bar"]}>
          {steps.map((completed, index) => (
            <div
              key={`progress-item-${index}`}
              className={`${styles["progress-item"]} ${completed ? styles.fill : styles.empty}`}
              style={{
                width: containerWidth / total,
              }}
            />
          ))}
        </div>
      </div>
  );
};

export default ProgressBar;

