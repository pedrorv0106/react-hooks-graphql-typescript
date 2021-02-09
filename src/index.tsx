import React from 'react';
import ReactDOM from 'react-dom';
import Amplify from 'aws-amplify';

import awsconfig from './aws-exports';
import App from './App';

import 'semantic-ui-css/semantic.min.css';
import './Styles/styles.scss';
import { GTM_INIT } from './Global/Metrics/Gtm';

Amplify.configure(awsconfig);
GTM_INIT({});

ReactDOM.render(<App />, document.getElementById('root'));
