import React, { useEffect, useState } from 'react';
import { Avatar, Card, CardContent, CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { endpointHost } from '../variables/endpoint';

const Container = styled('div')({
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'center',
  height: '80vh',
  marginTop: '100px'
});

const StyledCard = styled(Card)({
  width: '400px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.12)',
  height:'40vh'
});

const AvatarImage = styled(Avatar)({
  width: '150px',
  height: '150px',
  margin: '0 auto',
  marginBottom: '16px',
});

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const email = localStorage.getItem("EMAIL DEL USUARIO")
      const response = await axios.post(`${endpointHost}/user/searchUserEmail`, { email });
      setUser(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener la información del usuario:', error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <StyledCard variant="outlined">
        <CardContent>
          <AvatarImage alt={user.name} src={user.avatarUrl} />
          <Typography variant="h5" align="center" gutterBottom>{user.firstname} {user.lastname}</Typography>
          <Typography variant="body1" gutterBottom><strong>Email:</strong> {user.email}</Typography>
          <Typography variant="body1" gutterBottom><strong>DNI:</strong> {user.dni}</Typography>
          <Typography variant="body1" gutterBottom><strong>Rol:</strong> {user.role}</Typography>
        </CardContent>
      </StyledCard>
    </Container>
  );
};

export default Profile;


