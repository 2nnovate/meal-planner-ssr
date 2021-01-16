import Layout from '../../../components/Layout';

const STEP_INFO = [{
  key: 'goal',
  title: '식단조절의 목표를 설정해주세요.',
  description: '',
  inputType: '',
}, {
  key: 'weight',
  title: '현재 체중을 입력해주세요.',
  description: '',
  inputType: '',
}, {
  key: 'sex',
  title: '성별을 입력해주세요.',
  description: '',
  inputType: '',
}, {
  key: 'tall',
  title: '신장을 입력해주세요.',
  description: '',
  inputType: '',
}, {
  key: 'age',
  title: '만 나이를 입력해주세요.',
  description: '',
  inputType: '',
}, {
  key: 'activity',
  title: '하루에 얼마나 활동하는지 선택해주세요.',
  description: '',
  inputType: '',
}, {
  key: 'mealCounts',
  title: '하루에 몇 끼를 먹을지 설정해주세요.',
  description: '',
  inputType: '',
}];

const Config = ({ stepInfo }) => (
    <Layout>
      <h1>{stepInfo.title}</h1>
    </Layout>
);

export async function getStaticPaths() {
  const stepKeys = STEP_INFO.map(({key}) => key);
  const paths = stepKeys.map(id => `/config/${id}`);

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const { step: currentStep } = params;
  const stepInfo = STEP_INFO.find(({ key }) => key == currentStep);

  return {
    props: {
      stepInfo,
    },
  }
}

export default Config;
