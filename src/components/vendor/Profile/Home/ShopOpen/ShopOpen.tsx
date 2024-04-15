import { Card } from '@/components/common';
import { Radio, RadioGroup } from '@/components/forms';
import { HttpService } from '@/services';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';

export function ShopOpen() {
  const [status, setStatus] = useState('closed');

  const onShopOpenClick = (value: string) => {
    HttpService.put('/user/vendor/profile/open', {
      open: status === 'opened',
    }).then(response => {
      const { status } = response;
      if (status === 200) {
        setStatus(value);
        enqueueSnackbar(`Shop ${value}.`, { variant: 'success' });
      } else {
        enqueueSnackbar('Invalid user.', {
          variant: 'warning',
        });
      }
    });
  };

  useEffect(() => {
    HttpService.get('/user/vendor/profile/open').then(response => {
      setStatus(!!response ? 'opened' : 'closed');
    });
  }, []);

  return (
    <Card title="Shop Open">
      <RadioGroup value={status} updateValue={onShopOpenClick}>
        <Radio value="closed" label="Closed" />
        <Radio value="opened" label="Open" />
      </RadioGroup>
    </Card>
  );
}
