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
    workingHoursDays: string;
    workingHoursTimings: string;
    welcomeTitle: string;
    aboutTitle: string;
    favicon: string;
  };
  marketplaces: Array<{ name: string; url: string; id: string }>;
  fontControls: {
    aboutTitleItalics: boolean;
    aboutContentItalics: boolean;
    navbarLinksItalics: boolean;
    welcomeContentItalics: boolean;
    welcomeTitleItalics: boolean;
  };
  // amazon: '';
  // flipkart:"";
  // shopsy:"";
  //  meesho:""; indiaMart:""; tradeIndia:"", Udaan, Blinkit
}
