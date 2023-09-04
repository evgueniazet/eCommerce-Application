import React, { FC } from 'react';
import { IMyCustomerAddressResponse } from '../../types/addressesTypes';
import UserPersonalContactRow from '../UserPersonalContactRow/UserPersonalContactRow';
import Box from '@mui/material/Box';

interface IUserPersonalAddressTabProps {
  addresses: IMyCustomerAddressResponse[];
  index: number;
  value: number;
}

const UserPersonalAddressTab: FC<IUserPersonalAddressTabProps> = ({ addresses, value, index }) => {
  return (
    <Box pt={2}
      role="tabpanel"
      hidden={value !== index}
    >
      {value === index && addresses.map((address) => (<UserPersonalContactRow address={address}
                                                                              key={address.id}/>))}
    </Box>
  );
};

export default UserPersonalAddressTab;
