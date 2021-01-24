import ResultPage from '../src/pages/result'

const mockOptions = {
  carbohydrateOptions: [{
    id: 1,
    label: '고구마 100g',
    type: 'carbohydrate',
    calorie: 500,
  }, {
    id: 2,
    label: '고구마 200g',
    type: 'carbohydrate',
    calorie: 1000,
  }],
  proteinOptions: [{
    id: 3,
    label: '닭가슴살 200g',
    type: 'protein',
    calorie: 600,
  }, {
    id: 4,
    label: '닭가슴살 400g',
    type: 'protein',
    calorie: 1200,
  }],
  fatOptions: [{
    id: 5,
    label: '달걀 노른자 1개',
    type: 'fat',
    calorie: 200,
  }],
};

const Result = ({ options }) => (
  <ResultPage
    options={options}
  />
);

export async function getStaticProps() {
  const options = mockOptions;

  return {
    props: { options },
  }
}

export default Result;
