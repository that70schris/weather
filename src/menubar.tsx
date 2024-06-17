import { Cache, Icon, MenuBarExtra, getPreferenceValues } from '@raycast/api';
import { usePromise } from '@raycast/utils';
import { location } from 'swift:..';

const preferences: Preferences.Menubar = getPreferenceValues();
const cache = new Cache();

interface Data {
  condition?: string;
  FeelsLike?: {
    value?: Number;
    text?: string;
  };

  air?: {
    index?: Number;
    category?: string;
  };

  precipitation?: {
    chance?: Number;
    amount?: string;
  };

  wind?: {
    speed?: string;
    direction?: Number;
  };
}

class Current {
  isLoading = true;

  constructor() {
    if (!this.time || (Date.now() - this.time.getTime()) / 1000 > 60) {
      try {
        // this.data = execSync('shortcuts run current').toString();
        // console.log('success:', this.data);
        // console.log(execSync('shortcuts run location').toString());
      } catch {
        // console.log('error:', this.data);
      }

      this.time = new Date();
    }
  }

  get time(): Date | null {
    let time = cache.get('time');
    return time ? new Date(time) : null;
  }

  set time(value: Date) {
    cache.set('time', value.toString());
  }

  get data(): Data | null {
    return JSON.parse(cache.get('data') ?? null);
  }

  set data(value: string) {
    cache.set('data', value);
  }

  get icon(): Icon | undefined {
    return {
      Clear: Icon.Moon,
      Cloudy: Icon.Cloud,
      MostlyCloudy: Icon.CloudSun,
      MostlyClear: Icon.Moonrise,
      MostlySunny: Icon.Sunrise,
      Windy: Icon.Wind,
      Sunny: Icon.Sun,
    }[this.data?.condition || ''];
  }
}

export default function MenuCommand(): JSX.Element {
  // const current = new Current();

  const { isLoading, data, error } = usePromise(async () => {
    let _location = await location();
    console.log('location: ', _location);
    return location();
  });

  if (error) {
    console.log('error:', error);
  }

  return (
    <MenuBarExtra
      isLoading={isLoading}
      // icon={preferences.showIcon ? current.icon : undefined}
      title={preferences.showText ? `${data}°` : undefined}
    >
      {/* <MenuBarExtra.Section title="Weather">
        <MenuBarExtra.Item
          title="Condition"
          subtitle={current.data?.condition}
          icon={current.icon}
          onAction={() => {}}
        ></MenuBarExtra.Item>
      </MenuBarExtra.Section>
      <MenuBarExtra.Section title="Air">
        <MenuBarExtra.Item
          title="Chance of Rain"
          subtitle={`${current.data?.precipitation?.chance?.toString() || ''}%`}
          icon={Icon.Raindrop}
          onAction={() => {}}
        ></MenuBarExtra.Item>
        <MenuBarExtra.Item
          title="Air Quality Index"
          subtitle={`${current.data?.air?.index?.toString()} ${current.data?.air?.category ? `(${current.data?.air?.category})` : ''}`}
          icon={Icon.Check}
          onAction={() => {}}
        ></MenuBarExtra.Item>
        <MenuBarExtra.Item
          title="Wind"
          subtitle={current.data?.wind?.speed}
          icon={Icon.Windsock}
          onAction={() => {}}
        ></MenuBarExtra.Item>
      </MenuBarExtra.Section> */}
    </MenuBarExtra>
  );
}
