import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CircularProgress, Select, MenuItem, Typography } from '@mui/material';
import { styled } from '@mui/system';
import '../styles/listUser.css';
import { endpointHost } from '../variables/endpoint';
import swal from 'sweetalert';

const Container = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  justifyContent: 'center',
  height: '80vh',
  paddingBottom: '50px'
});

const StyledCard = styled(Card)({
  width: '350px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.12)',
  marginBottom: '100px',
  margin: '0 16px 16px 0', // Añadir margen derecho y abajo para separar las tarjetas
});

const Separator = styled('hr')({
  width: '100%',
  border: 0,
  borderBottom: '1px solid #ccc',
  margin: '8px 0',
});

const ListUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${endpointHost}/user/listAll`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de usuarios:', error);
    }
  };

  const handleRoleChange = async (userEmail, newRole) => {
    try {
      await axios.put(`${endpointHost}/user/updateRolUser`, { role: newRole, email: userEmail });
      setUsers(prevUsers => {
        return prevUsers.map(user => {
          if (user.email === userEmail) {
            return { ...user, role: newRole };
          }
          return user;
        });
      });
      swal('Cambio de rol exitoso', 'El cambio de rol se ha realizado correctamente.', 'success');
    } catch (error) {
      console.error('Error al actualizar el rol del usuario:', error);
    }
  };
  return (
    <Container>
      {users.map(user => (
        <StyledCard key={user.email}>
          <CardContent>
            <Typography variant="subtitle1" gutterBottom><strong>Nombre:</strong> {user.firstname}</Typography>
            <Typography variant="subtitle1" gutterBottom><strong>Apellido:</strong> {user.lastname}</Typography>
            <Typography variant="subtitle1" gutterBottom><strong>E-mail:</strong> {user.email}</Typography>
            <Typography variant="subtitle1" gutterBottom><strong>DNI:</strong> {user.dni}</Typography>
            <Typography variant="subtitle1" gutterBottom><strong>Rol actual:</strong> {user.role}</Typography>
            <label>
              Nuevo rol:
              <Select
                className='role-select'
                value={user.role}
                onChange={e => handleRoleChange(user.email, e.target.value)}
              >
                <MenuItem value="ADMIN">ADMIN</MenuItem>
                <MenuItem value="USER">USER</MenuItem>
              </Select>
            </label>
          </CardContent>
        </StyledCard>
      ))}
    </Container>
  );
};

export default ListUser;
