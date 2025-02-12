import AalertBox from '../../components/AalertBox';
import JobCard from '../../components/JobCard';
import { jobs } from '../../utils/DumpData';
// import { jobs } from "../../utils/DumpData";
import { ReactComponent as ChevronDown } from '../../assets/chevronDown.svg';

import { useEffect } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { getNavs, postNavs } from '../../apis/actions';
import { useSideNavStore } from '../../store/useSideNavStore';
import SideNav from '../../components/sideNav/SideNav';

const Dashboard = () => {
  const {
    sideNav: { setNavs, navs, setEditedNavs, favorites, setFavorites },
  } = useSideNavStore();

  useEffect(() => {
    if (!navs.length) {
      getNavs().then((navList) => {
        if (navList.length) {
          setNavs(navList);
          setEditedNavs(navList);
          postNavs(navList);
        }
      });
    }
  }, []);

  return (
    <Container sx={{ display: 'flex', gap: '3rem', padding: '2rem' }}>
      <Box
        sx={{
          width: '30vw',
          padding: '16px',
          backgroundColor: 'white',
          height: 'fit-content',
          minWidth: '400px',
        }}
      >
        <Typography variant="body1" color="warning" mb={1}>
          Long press any item to enter editing mode
        </Typography>

        <SideNav />
      </Box>
      <Box
        sx={{
          width: '70vw',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Typography variant="h6">Sorting by:</Typography>
          <Button
            variant="text"
            color="primary"
            endIcon={<ChevronDown stroke="green" />}
          >
            Top Match
          </Button>
        </Box>
        <AalertBox
          title="UI Designer in Egypt"
          description="70 Job positions"
          switchProps={{ title: 'Set Alert' }}
        />

        {jobs.map((job, index) => (
          <JobCard
            key={index}
            {...job}
            isFavorite={favorites.includes(job.id)}
            onFavoriteClick={(newId) => {
              if (favorites.includes(newId)) {
                setFavorites(favorites.filter((id) => id !== newId));
              } else {
                setFavorites([...favorites, newId]);
              }
            }}
            badges={[
              { label: job.experience },
              { label: job.jobType },
              { label: job.remote },
            ]}
            bgColor="green"
          />
        ))}
      </Box>
    </Container>
  );
};

export default Dashboard;
