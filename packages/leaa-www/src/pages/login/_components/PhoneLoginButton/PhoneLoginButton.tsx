import cx from 'classnames';
import React, { useState } from 'react';
import { Button, message } from 'antd';

import { Rcon } from '@leaa/www/src/components';

import style from './style.module.less';

export default () => {
  const [type, setType] = useState<string>('ri-smartphone-line');

  const onSubmitWechat = async () => {
    message.success('Coming Soon');
    setType(type !== 'ri-mail-line' ? 'ri-mail-line' : 'ri-smartphone-line');
  };

  return (
    <div className={style['wrapper']}>
      <Button
        type="primary"
        shape="circle"
        onClick={onSubmitWechat}
        icon={<Rcon type={type} />}
        className={cx({
          [style['mobile-login-button']]: type === 'ri-smartphone-line',
          [style['mail-login-button']]: type === 'ri-mail-line',
        })}
      />
    </div>
  );
};
