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
