import { Card } from '@/components/common';
import { Radio, RadioGroup } from '@/components/forms';

export interface IShopOpenProps {
  isOpen: boolean;
  setOpen: (_isOpen: boolean) => void;
}

export function ShopOpen({ isOpen, setOpen }: IShopOpenProps) {
  const onShopOpen = (value: string) => {
    setOpen(value === 'open' ? true : false);
  };

  return (
    <Card title="Shop Open">
      <RadioGroup value={isOpen ? 'open' : 'close'} updateValue={onShopOpen}>
        <Radio value="close" label="Closed" />
        <Radio value="open" label="Open" />
      </RadioGroup>
    </Card>
  );
}
