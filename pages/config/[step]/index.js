import { useRouter } from 'next/router'
import { Radio, Input } from 'antd';

import { mealPlanConfigContext } from '../../../src/contexts/mealPlanConfigContext';
import Layout from '../../../src/components/Layout';

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
}

const STEP_INFO = [{
  key: 'goal',
  title: '식단조절의 목표를 설정해주세요.',
  description: '',
}, {
  key: 'weight',
  title: '현재 체중을 입력해주세요.',
  description: '',
  input: '',
}, {
  key: 'sex',
  title: '성별을 입력해주세요.',
  description: '',
  input: '',
}, {
  key: 'tall',
  title: '신장을 입력해주세요.',
  description: '',
  input: '',
}, {
  key: 'age',
  title: '만 나이를 입력해주세요.',
  description: '',
  input: '',
}, {
  key: 'activity',
  title: '하루에 얼마나 활동하는지 선택해주세요.',
  description: '',
  input: '',
}, {
  key: 'mealCounts',
  title: '하루에 몇 끼를 먹을지 설정해주세요.',
  description: '',
  input: '',
}];

const renderInput = ({ key, config, handleChange }) => {
  const currnetValue = config[key];

  switch(key) {
    case 'goal': {
      const setValue = ({ target }) => handleChange(target.value);

      return (
        <Radio.Group
          value={currnetValue}
          onChange={setValue}
        >
          <Radio.Button style={radioStyle} value="loose">
            체중 감량
          </Radio.Button>
          <Radio.Button style={radioStyle} value="maintain">
            체중 유지
          </Radio.Button>
          <Radio.Button style={radioStyle} value="gain">
            체중 증량
          </Radio.Button>
        </Radio.Group>
      );
    }
    case 'weight': {
      const setValue = ({ target }) => handleChange(target.value);

      return (
        <Input
          defaultValue={currnetValue}
          onPressEnter={setValue}
          suffix="kg"
        />
      );
    }
    default:
      return null;
  }
};

const Config = ({ stepKey, nextUrl }) => {
  const router = useRouter();

  const stepInfo = STEP_INFO.find(({ key }) => key === stepKey) || {};

  const {
    title,
    description,
    input,
  } = stepInfo;

  return (
    <mealPlanConfigContext.Consumer>
      {({ config, setConfig }) => {
        const handleChange = (value) => {
          setConfig(stepKey, value);
          router.push(nextUrl);
        };

        return (
          <Layout>
            <h1>{title}</h1>
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

  return {
    props: {
      stepKey: stepInfo.key,
      nextUrl,
    },
  }
}

export default Config;
