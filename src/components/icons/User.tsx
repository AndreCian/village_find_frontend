import clsx from 'clsx';

import UserSvg from '/assets/common/icons/User.svg';

export interface IUserIconProps {
  className?: string;
}

export function UserIcon({ className }: IUserIconProps) {
  return (
    <img alt="User Icon" src={UserSvg} className={clsx('h-6 w-6', className)} />
  );
}
