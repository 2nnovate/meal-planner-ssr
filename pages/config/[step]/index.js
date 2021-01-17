import { useRouter } from 'next/router';
import {
  Progress,
  Radio,
  Input,
} from 'antd';

import { mealPlanConfigContext } from '../../../src/contexts/mealPlanConfigContext';
import Layout from '../../../src/components/Layout';

import styles from './index.module.scss';

const { Search } = Input;

const STEP_INFO = [{
  key: 'goal',
  title: '식단조절의 목표를 설정해주세요.',
  description: '',
}, {
  key: 'weight',
  title: '현재 체중을 입력해주세요.',
  description: '',
}, {
  key: 'sex',
  title: '성별을 입력해주세요.',
  description: '',
}, {
  key: 'tall',
  title: '신장을 입력해주세요.',
  description: '',
}, {
  key: 'age',
  title: '만 나이를 입력해주세요.',
  description: '',
}, {
  key: 'activity',
  title: '하루에 얼마나 활동하는지 선택해주세요.',
  description: '',
}, {
  key: 'mealCounts',
  title: '하루에 몇 끼를 먹을지 설정해주세요.',
  description: '',
}];

const GOAL_OPTIONS = [{
  value: 'loose',
  label: '체중 감량',
}, {
  value: 'maintain',
  label: '체중 유지',
}, {
  value: 'gain',
  label: '체중 증량',
}];

const SEX_OPTIONS =[{
  value: 'male',
  label: '남성',
}, {
  value: 'female',
  label: '여성',
}];

const ACTIVITY_OPTIONS =[{
  value: 'less',
  label: '거의 앉아서 일함',
}, {
  value: 'little',
  label: '적은 활동',
}, {
  value: 'normal',
  label: '평균적인 활동',
}, {
  value: 'more',
  label: '많은 활동',
}, {
  value: 'many',
  label: '아주 많은 활동량',
}];

const MEAL_COUNTS_OPTIONS =[{
  value: 1,
  label: '한 끼',
}, {
  value: 2,
  label: '두 끼',
}, {
  value: 3,
  label: '세 끼',
}, {
  value: 4,
  label: '네 끼',
}];

const renderInput = ({ key, config, handleChange }) => {
  const currentValue = config[key];

  switch(key) {
    case 'goal': {
      const setValue = ({ target }) => handleChange(target.value);

      return (
        <Radio.Group
          size="large"
          className={styles.radioGroup}
          value={currentValue}
          onChange={setValue}
        >
          {GOAL_OPTIONS.map(({ value, label }) => (
              <Radio.Button
                  className={styles.radio}
                  value={value}
                  key={value}
              >
                {label}
              </Radio.Button>
          ))}
        </Radio.Group>
      );
    }
    case 'weight': {
      const setValue = (value) => handleChange(value);

      return (
        <Search
          defaultValue={currentValue}
          onSearch={setValue}
          suffix="kg"
          enterButton="입력 완료"
        />
      );
    }
    case 'sex': {
      const setValue = ({ target }) => handleChange(target.value);

      return (
          <Radio.Group
              size="large"
              className={styles.radioGroup}
              value={currentValue}
              onChange={setValue}
          >
            {SEX_OPTIONS.map(({ value, label }) => (
                <Radio.Button
                    className={styles.radio}
                    value={value}
                    key={value}
                >
                  {label}
                </Radio.Button>
            ))}
          </Radio.Group>
      );
    }
    case 'tall': {
      const setValue = (value) => handleChange(value);

      return (
          <Search
              defaultValue={currentValue}
              onSearch={setValue}
              suffix="cm"
              enterButton="입력 완료"
          />
      );
    }
    case 'age': {
      const setValue = (value) => handleChange(value);

      return (
          <Search
              defaultValue={currentValue}
              onSearch={setValue}
              suffix="세"
              enterButton="입력 완료"
          />
      );
    }
    case 'activity': {
      const setValue = ({ target }) => handleChange(target.value);

      return (
          <Radio.Group
              size="large"
              className={styles.radioGroup}
              value={currentValue}
              onChange={setValue}
          >
            {ACTIVITY_OPTIONS.map(({ value, label }) => (
                <Radio.Button
                    className={styles.radio}
                    value={value}
                    key={value}
                >
                  {label}
                </Radio.Button>
            ))}
          </Radio.Group>
      );
    }
    case 'mealCounts': {
      const setValue = ({ target }) => handleChange(target.value);

      return (
          <Radio.Group
              size="large"
              className={styles.radioGroup}
              value={currentValue}
              onChange={setValue}
          >
            {MEAL_COUNTS_OPTIONS.map(({ value, label }) => (
                <Radio.Button
                    className={styles.radio}
                    value={value}
                    key={value}
                >
                  {label}
                </Radio.Button>
            ))}
          </Radio.Group>
      );
    }
    default:
      return null;
  }
};

const Config = ({ stepKey, nextUrl, percent }) => {
  const router = useRouter();

  const stepInfo = STEP_INFO.find(({ key }) => key === stepKey) || {};

  const { title } = stepInfo;

  return (
    <mealPlanConfigContext.Consumer>
      {({ config, setConfig }) => {
        const handleChange = (value) => {
          setConfig({
            ...config,
            [stepKey]: value,
          });
          router.push(nextUrl);
        };

        return (
          <Layout>
            <div className={styles.progress}>
              <Progress
                  percent={percent}
                  size="large"
                  steps={STEP_INFO.length + 1}
                  showInfo={false}
                  strokeColor="#FFC53D"
              />
            </div>
            <h1 className={styles.title}>
              {title}
            </h1>
            {renderInput({
              key: stepKey,
              config,
              handleChange,
            })}
          </Layout>
        );
      }}
    </mealPlanConfigContext.Consumer>
  );
};

export async function getStaticPaths() {
  const stepKeys = STEP_INFO.map(({key}) => key);
  const paths = stepKeys.map(key => `/config/${key}`);

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const { step: currentStep } = params;

  const currentIndex = STEP_INFO.findIndex(({ key }) => key === currentStep);
  const stepInfo = STEP_INFO[currentIndex];

  const nextStepInfo = STEP_INFO[currentIndex + 1];
  const nextUrl = nextStepInfo ? `/config/${nextStepInfo.key}` : '/result';

  const percent = (currentIndex + 1) / (STEP_INFO.length + 1) * 100;

  return {
    props: {
      stepKey: stepInfo.key,
      percent,
      nextUrl,
    },
  }
}

export default Config;
