export interface ICommonProps {
  config?: IConfig;
}

export interface IConfig {
  appSettings: {
    colors: any;
  };
  contentControls: {
    welcomeContent: string;
    aboutContent: string;
    bannerImage: string;
    phone: string;
    email: string;
    address: string;
  };
}
