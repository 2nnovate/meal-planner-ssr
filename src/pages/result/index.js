import { useContext } from 'react';

import { mealPlanConfigContext } from '../../contexts/mealPlanConfigContext';

import Layout from '../Layout';


const ResultPage = () => {
  const { config } = useContext(mealPlanConfigContext);

  return (
    <Layout>
      <div>
        <div>result</div>
        <div>{JSON.stringify(config)}</div>
      </div>
    </Layout>
  )
};

export default ResultPage;
