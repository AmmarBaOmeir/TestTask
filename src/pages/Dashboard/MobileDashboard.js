import AalertBox from '../../components/AalertBox';
import JobCard from '../../components/JobCard';
import { jobs } from '../../utils/DumpData';
import { ReactComponent as Menu } from '../../assets/menu.svg';
import { ReactComponent as ArrowLeft } from '../../assets/arrowLeft.svg';

import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Fade,
  Pagination,
  Slide,
  Typography,
  useTheme,
} from '@mui/material';
import { getNavs } from '../../apis/actions';
import { useSideNavStore } from '../../store/useSideNavStore';
import SideNav from '../../components/sideNav/SideNav';
import { useLocation } from 'react-router-dom';

const MobileDashboard = () => {
  const {
    sideNav: { setNavs, navs, setEditedNavs, favorites, setFavorites },
  } = useSideNavStore();
  const { pathname } = useLocation();
  const currentPage = pathname.split('/').pop() || 'Dashboard';

  const theme = useTheme();
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);

  useEffect(() => {
    if (!navs.length) {
      getNavs().then((navList) => {
        if (navList.length) {
          setNavs(navList);
          setEditedNavs(navList);
        }
      });
    }
  }, []);

  return (
    <Container sx={{ padding: '2rem' }}>
      <Slide
        in={isMenuExpanded}
        timeout={300}
        unmountOnExit
        direction={isMenuExpanded ? 'right' : 'top'}
      >
        <Box
          sx={{
            padding: '16px',
            backgroundColor: 'white',
            height: 'fit-content',
          }}
        >
          <Box
            sx={{
              padding: '16px',
              backgroundColor: theme.palette.grey[400],
              display: 'flex',
              justifyContent: 'flex-start',
              mb: '12px',
            }}
          >
            <ArrowLeft
              cursor="pointer"
              onClick={() => setIsMenuExpanded(false)}
            />
          </Box>
          <SideNav />
        </Box>
      </Slide>
      <Fade in={!isMenuExpanded} timeout={500} unmountOnExit>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <Box
            sx={{
              gap: '12px',
              borderRadius: '1px',
              padding: '16px',
              backgroundColor: theme.palette.grey[400],
              position: 'relative',
            }}
          >
            <Typography variant="h6" align="center">
              {currentPage}
            </Typography>
            <Menu
              width={40}
              height={40}
              style={{ position: 'absolute', right: '10px', top: '12px' }}
              onClick={() => setIsMenuExpanded(true)}
              cursor="pointer"
            />
          </Box>
          <AalertBox
            title="UI Designer in Egypt"
            description="70 Job positions"
            switchProps={{ title: 'Set Alert' }}
            isMobile
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
              isMobile
            />
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination count={3} variant="outlined" shape="rounded" />
          </Box>
        </Box>
      </Fade>
    </Container>
  );
};

export default MobileDashboard;
