import React from 'react'
import App from 'next/app'

import "antd/dist/antd.css";

import { mealPlanConfigContext } from '../src/contexts/mealPlanConfigContext'

class MyApp extends App {
    constructor(props) {
        super(props);

        this.setConfig = (key, value) => {
            this.setState(state => ({
                ...state,
                config: {
                    ...state.config,
                    [key]: value,
                },
            }));
        };

        this.state = {
            config: {},
            setConfig: this.setConfig,
        };
    }

    render() {
        const { Component, pageProps } = this.props

        return (
            <mealPlanConfigContext.Provider value={this.state}>
                <Component {...pageProps} />
            </mealPlanConfigContext.Provider>
        );
    }
};

export default MyApp;