import { useState } from 'react';
import 'antd/dist/antd.css';

import '../src/styles/layout.scss';

import { mealPlanConfigContext } from '../src/contexts/mealPlanConfigContext';

const app = ({ Component, pageProps }) => {
    const [config, setConfig] = useState({});

    return (
        <mealPlanConfigContext.Provider value={{ config, setConfig }}>
            <Component {...pageProps} />
        </mealPlanConfigContext.Provider>
    );
};

export default app;
