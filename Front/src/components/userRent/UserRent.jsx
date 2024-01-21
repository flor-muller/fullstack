import React from 'react';
import { Avatar, Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/system';


const Container = styled('div')({
});


const StyledCard = styled(Card)({
    width: '450px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.12)',
});


const AvatarImage = styled(Avatar)({
    width: '100px',
    height: '100px',
    margin: '0 auto',
    marginBottom: '16px',
    backgroundColor: 'var(--twelth-color)'
});


const StyledTypography = styled(Typography)({
    textAlign: 'left',
    fontFamily: 'var(--principal-font)',
    color: 'var(--fifth-color)',
    fontSize: '1.2rem',
    padding: '0.5rem'
});


const UserRent = ({user}) => {
    return (
        <Container>
        <StyledCard variant="outlined">
            <CardContent>
            <AvatarImage />
            <StyledTypography><strong>Nombre:</strong> {user.firstname}</StyledTypography>
            <StyledTypography><strong>Apellido:</strong> {user.lastname}</StyledTypography>
            <StyledTypography><strong>Email:</strong> {user.email}</StyledTypography>
            <StyledTypography><strong>DNI:</strong> {user.dni}</StyledTypography>
            </CardContent>
        </StyledCard>
        </Container>
    );
};


export default UserRent;