import {
  Avatar,
  Box,
  Divider,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import PropTypes from 'prop-types';
import { ReactComponent as MarkerPin } from '../assets/markerPin.svg';
import { ReactComponent as Calendar } from '../assets/calendar.svg';
import { ReactComponent as Favorite } from '../assets/heart.svg';
import IzamBadge from './IzamBadge';

const JobCardContainer = styled(Box)(({ theme, bgColor }) => ({
  borderRadius: '8px',
  backgroundColor:
    bgColor === 'green'
      ? theme.palette.background.lightGreen
      : theme.palette.background.default,
  border: '1px solid white',
  borderColor:
    bgColor === 'green'
      ? theme.palette.border.darkGreen
      : theme.palette.border.default,
  padding: '24px 0',
}));

const JobCardFavoriteIcon = styled(Box)(({ theme, active }) => ({
  borderRadius: '50%',
  padding: '12px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: active
    ? theme.palette.background.lightGreen
    : theme.palette.background.default,
  border: '1px solid',
  borderColor: active
    ? theme.palette.border.darkGreen
    : theme.palette.border.default,
}));

const JobCard = (props) => {
  const {
    bgColor,
    title,
    companyName,
    companyAvatar,
    isFavorite,
    onFavoriteClick,
    jobAddress,
    postDate,
    badges,
    skills,
  } = props;
  const theme = useTheme();
  return (
    <JobCardContainer bgColor={bgColor}>
      {/* Card Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
            gap: '12px',
          }}
        >
          <Avatar src={companyAvatar} />
          <Box>
            <Typography variant="h4">{title}</Typography>
            <Typography variant="body1" color={theme.palette.primary.main}>
              {companyName}
            </Typography>
          </Box>
        </Box>
        <JobCardFavoriteIcon active={isFavorite} onClick={onFavoriteClick}>
          <Favorite stroke={theme.palette.border.default} />
        </JobCardFavoriteIcon>
      </Box>

      {/* Card Sub-Header */}
      <Box
        sx={{
          gap: '16px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          margin: '16px',
        }}
      >
        <Box sx={{ gap: '8px', display: 'flex', alignItems: 'center' }}>
          <MarkerPin stroke={theme.palette.grey[300]} />
          <Typography variant="body1" color={theme.palette.grey[700]}>
            {jobAddress}
          </Typography>
        </Box>
        <Box sx={{ gap: '8px', display: 'flex', alignItems: 'center' }}>
          <Calendar stroke={theme.palette.grey[300]} />
          <Typography variant="body1" color={theme.palette.grey[700]}>
            {postDate}
          </Typography>
        </Box>
      </Box>

      {/* Card Badge list */}
      <Box
        sx={{
          margin: '24px 0',
          gap: '8px',
          display: 'flex',
          padding: '16px 32px',
        }}
      >
        {badges.map((badge) => (
          <IzamBadge {...badge} bgColor="lightgrey" />
        ))}
      </Box>
      <Divider sx={{ margin: '24px 0' }} />
      {/* Card skills list */}
      <Box sx={{ display: 'flex', padding: '0 32px' }}>
        {skills.map((skill) => (
          <Typography variant="body1" color={theme.palette.grey[400]}>
            {skill}
          </Typography>
        ))}
      </Box>
    </JobCardContainer>
  );
};

JobCard.prototype = {
  bgColor: PropTypes.oneOf(['green', 'white']),
  title: PropTypes.string,
  companyName: PropTypes.string,
  companyAvatar: PropTypes.string,
  isFavorite: PropTypes.bool,
  jobAddress: PropTypes.string,
  postDate: PropTypes.string,
  badges: PropTypes.arrayOf(PropTypes.shape()),
  skills: PropTypes.arrayOf(PropTypes.string),
};

export default JobCard;
