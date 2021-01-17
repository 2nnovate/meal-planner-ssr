import { useContext } from 'react';

import { mealPlanConfigContext } from '../src/contexts/mealPlanConfigContext';

import Layout from '../src/components/Layout';

const Result = () => {
  const { config } = useContext(mealPlanConfigContext);

  return (
      <Layout>
        <div>result is...</div>
        {JSON.stringify(config)}
      </Layout>
  );
};

export default Result;
