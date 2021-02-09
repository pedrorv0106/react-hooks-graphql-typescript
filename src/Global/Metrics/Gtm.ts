import TagManager from 'react-gtm-module';

const GtmConfig = {
  gtmId: process.env.REACT_APP_GTM_TOKEN || 'GTM_ID',
}

export function GTM_INIT(params: any) {
  TagManager.initialize({
    ...GtmConfig,
    ...params,
  });
}

export function GTM_EVENT(params: any) {
  GTM_INIT({
    events: params,
  });
}

export function GTM_DATALAYER(params: any) {
  TagManager.dataLayer({
    ...GtmConfig,
    ...params,
  });
}