import React from 'react';
import { Box, Container, Typography, Paper, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  backgroundColor: '#fff',
}));

const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom color="primary" textAlign="center">
        Welcome to NSS TCE
      </Typography>

      <StyledPaper elevation={3}>
        <Typography variant="h5" gutterBottom color="secondary">
          About NSS
        </Typography>
        <Typography paragraph>
          National Service Scheme (NSS) was introduced in the year 1969 with the primary objective of developing the personality
          and character of the student through voluntary community service. 'Education through Service' is the purpose of the NSS.
          The ideological orientation of the NSS is inspired by the ideals of Mahatma Gandhi.
        </Typography>
      </StyledPaper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <StyledPaper elevation={3}>
            <Typography variant="h5" gutterBottom color="secondary">
              NSS Logo
            </Typography>
            <Typography paragraph>
              The logo for the NSS is based on the Giant Rath Wheel of the world-famous Konark Sun Temple situated in Odisha,
              India. The wheel portrays the cycle of creation, preservation and release. The eight bars in the wheel represent
              24 hours of a day. The red color indicates young blood that is lively, active, energetic and full of high spirit.
            </Typography>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper elevation={3}>
            <Typography variant="h5" gutterBottom color="secondary">
              Motto: "NOT ME BUT YOU"
            </Typography>
            <Typography paragraph>
              This reflects the essence of democratic living and upholds the need for selfless service. It underlines that
              the welfare of an individual is ultimately dependent on the welfare of society as a whole.
            </Typography>
          </StyledPaper>
        </Grid>
      </Grid>

      <StyledPaper elevation={3}>
        <Typography variant="h5" gutterBottom color="secondary">
          Our Activities
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Classroom Activities
            </Typography>
            <Typography>
              • Group discussions
              • Debates
              • Social issue awareness
              • Personality development
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Special Events
            </Typography>
            <Typography>
              • Blood donation camps
              • NSS Day celebration
              • Republic day celebration
              • Awareness programs
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Camp Activities
            </Typography>
            <Typography>
              • Seven-day village camps
              • Medical camps
              • Plantation drives
              • Village surveys
            </Typography>
          </Grid>
        </Grid>
      </StyledPaper>
    </Container>
  );
};

export default Home;