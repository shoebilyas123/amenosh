import { createContext, FC, useContext } from 'react';
import { IConfig } from '~/interfaces/common';

const useConfigController = (config: IConfig) => {
  return {
    config,
  };
};
const ConfigContext = createContext<ReturnType<typeof useConfigController>>({
  config: {
    appSettings: { colors: {} },
    contentControls: {
      aboutContent: '',
      bannerImage: '',
      welcomeContent: '',
      phone: '',
      email: '',
      address: '',
      workingHoursDays: '',
      workingHoursTimings: '',
      welcomeTitle: '',
      aboutTitle: '',
    },
    marketplaces: [],
    fontControls: {
      aboutTitleItalics: false,
      aboutContentItalics: false,
      navbarLinksItalics: false,
      welcomeContentItalics: false,
      welcomeTitleItalics: false,
    },
  },
});

interface ICtxProps {
  config: IConfig;
  children: any;
}

export const ConfigProvider: FC<ICtxProps> = ({ config, children }) => {
  return (
    <ConfigContext.Provider value={useConfigController(config)}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);
