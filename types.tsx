export type BrewImage = {
  localURI: string;
  height: number;
  width: number;
};

export enum AllowedBrewGrouping {
  Brewery = "brewery",
  Style = "style",
}

export type Brew = {
  [key: string]: any;
  name: string;
  [AllowedBrewGrouping.Brewery]: string;
  rating: number;
  [AllowedBrewGrouping.Style]: string;
  brewImage?: BrewImage;
  brewId?: string;
};

export type BrewMap = {
  [id: string]: Brew;
};

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type TabThreeParamList = {
  TabThreeScreen: undefined;
};
