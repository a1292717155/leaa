import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, message } from 'antd';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { Role } from '@leaa/common/entrys';
import { GET_PERMISSIONS, GET_ROLE } from '@leaa/common/graphqls';
import { UPDATE_ROLE } from '@leaa/common/graphqls/role.mutation';
import { UPDATE_BUTTON_ICON } from '@leaa/dashboard/constants';
import { RoleArgs, UpdateRoleInput } from '@leaa/common/dtos/role';
import { PermissionsObject, PermissionsArgs } from '@leaa/common/dtos/permission';
import { IPage } from '@leaa/dashboard/interfaces';
import { PageCard } from '@leaa/dashboard/components/PageCard';
import { ErrorCard } from '@leaa/dashboard/components/ErrorCard';
import { SubmitBar } from '@leaa/dashboard/components/SubmitBar/SubmitBar';

import { RoleInfoForm } from '../_components/RoleInfoForm/RoleInfoForm';
import { RolePermissionsForm } from '../_components/RolePermissionsForm/RolePermissionsForm';

import style from './style.less';

export default (props: IPage) => {
  const { t } = useTranslation();

  const { id } = props.match.params as { id: string };

  let roleInfoFormRef: any;
  let rolePermissionsFormRef: any;

  const getRoleVariables = { id: Number(id) };
  const { loading, data: roleData, error: roleError } = useQuery<{ role: Role }, RoleArgs>(GET_ROLE, {
    variables: getRoleVariables,
  });

  if (roleError) {
    return <ErrorCard message={roleError.message} />;
  }

  const getPermissionsVariables = { pageSize: 9999 };
  const { data: permissionsData, error: rolesError } = useQuery<{ permissions: PermissionsObject }, PermissionsArgs>(
    GET_PERMISSIONS,
    {
      variables: getPermissionsVariables,
    },
  );

  if (rolesError) {
    return <ErrorCard message={rolesError.message} />;
  }

  const [submitVariables, setSubmitVariables] = useState<{ id: number; role: UpdateRoleInput }>({
    id: Number(id),
    role: {},
  });

  const [updateRoleMutate, { loading: submitLoading }] = useMutation<Role>(UPDATE_ROLE, {
    variables: submitVariables,
    onError(e) {
      message.error(e.message);
    },
    onCompleted() {
      message.success(t('_lang:updatedSuccessfully'));
    },
    refetchQueries: () => [{ query: GET_ROLE, variables: getRoleVariables }],
  });

  const onSubmit = async () => {
    let hasError = false;
    let submitData: UpdateRoleInput = { permissionIds: [] };

    rolePermissionsFormRef.props.form.validateFieldsAndScroll((err: any, formData: { permissionIds: number[] }) => {
      if (err) {
        hasError = true;
        message.error(err[Object.keys(err)[0]].errors[0].message);
      }

      submitData.permissionIds = formData.permissionIds;
    });

    if (hasError) {
      return;
    }

    roleInfoFormRef.props.form.validateFieldsAndScroll((err: any, formData: Role) => {
      if (err) {
        hasError = true;
        message.error(err[Object.keys(err)[0]].errors[0].message);
      }

      submitData = {
        ...submitData,
        ...formData,
      };

      console.log('submitData', submitData);
    });

    if (hasError) {
      return;
    }

    const nextSubmitData = {
      ...submitVariables,
      ...{ role: submitData },
    };

    console.log(nextSubmitData);

    await setSubmitVariables(nextSubmitData);
    await updateRoleMutate();
  };

  return (
    <PageCard title={t(`${props.route.namei18n}`)} className={style['page-wapper']} loading={false}>
      <RoleInfoForm
        item={roleData && roleData.role}
        loading={loading}
        wrappedComponentRef={(inst: unknown) => {
          roleInfoFormRef = inst;
        }}
      />

      <RolePermissionsForm
        item={roleData && roleData.role}
        loading={loading}
        permissions={permissionsData && permissionsData.permissions && permissionsData.permissions.items}
        wrappedComponentRef={(inst: unknown) => {
          rolePermissionsFormRef = inst;
        }}
      />

      <SubmitBar>
        <Button
          type="primary"
          size="large"
          icon={UPDATE_BUTTON_ICON}
          className="submit-button"
          loading={submitLoading}
          onClick={onSubmit}
        >
          {t('_lang:update')}
        </Button>
      </SubmitBar>
    </PageCard>
  );
};
