import _ from 'lodash';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { authUtil } from '@leaa/dashboard/utils';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Icon, message } from 'antd';

import { IAttachmentParams } from '@leaa/common/interfaces';
import { envConfig } from '@leaa/dashboard/configs';

import style from './style.less';

interface IProps {
  value?: number | undefined;
  attachmentParams: IAttachmentParams;
  onUploadedCallback?: (uploaded: number) => void;
}

export const AttachmentDropzone = (props: IProps) => {
  const { t } = useTranslation();

  const onDrop = useCallback(acceptedFiles => {
    const token = authUtil.getAuthToken();

    acceptedFiles.forEach((file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      _.map(props.attachmentParams, (v, k) => formData.append(`${k}`, `${v}`));

      axios
        .post(`${envConfig.UPLOAD_ENDPOINT}`, formData, {
          headers: { Authorization: token ? `Bearer ${token}` : '' },
        })
        .then(() => {
          message.success(t('_lang:updatedSuccessfully'));

          if (props.onUploadedCallback) {
            props.onUploadedCallback(new Date().getMilliseconds());
          }
        })
        .catch((e: Error) => {
          message.info(e.message);
        });
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*' });
  const dropTipsDom = <Icon type="plus" className={style['file-icon']} />;

  return (
    <div {...getRootProps()} className={style['wrapper']}>
      <input {...getInputProps()} className={style['file-input']} />
      {isDragActive ? dropTipsDom : dropTipsDom}
    </div>
  );
};
