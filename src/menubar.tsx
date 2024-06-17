import { MenuBarExtra } from '@raycast/api';
import { usePromise } from '@raycast/utils';
import { enabled, location } from 'swift:..';

export default function MenuCommand(): JSX.Element {
  const { isLoading, data, error } = usePromise(async () => {
    let _enabled = await enabled();
    console.log('enabled:', _enabled);

    let _location = await location();
    console.log('location: ', _location);
    return _enabled;
  });

  if (error) {
    console.log('error:', error);
  }

  return <MenuBarExtra isLoading={isLoading} title={data}></MenuBarExtra>;
}
