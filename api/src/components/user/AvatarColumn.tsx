// AvatarColumn.tsx
import React from 'react';
import { TableCell, Avatar} from '@mui/material';
import { User } from '../../types/userTypes';

type AvatarColumnProps = {
  user: User;
};

const AvatarColumn: React.FC<AvatarColumnProps> = ({ user }) => (
  <TableCell>
    <Avatar alt={user.nome_usuario} src={user.userPhoto} />
  </TableCell>
);

export default AvatarColumn;
