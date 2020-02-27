import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import IconButton from '@material-ui/core/IconButton';
import LocationOn from '@material-ui/icons/LocationOn';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import TodayIcon from '@material-ui/icons/Today';
import EcoIcon from '@material-ui/icons/Eco';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SettingsInputAntennaIcon from '@material-ui/icons/SettingsInputAntenna';
import FaceGroup from '@mui-treasury/components/group/face';
import { useWideCardMediaStyles } from '@mui-treasury/styles/cardMedia/wide';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import { usePushingGutterStyles } from '@mui-treasury/styles/gutter/pushing';
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles(() => ({
  root: {
    overflow: 'initial',
    maxWidth: 350,
  },
  title: {
    marginBottom: 0,
  },
  rateValue: {
    fontWeight: 'bold',
    marginTop: 2,
  },
  content: {
    position: 'relative',
    padding: 24,
    margin: '-24% 16px 0',
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  favorite: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  locationIcon: {
    marginRight: 4,
    fontSize: 18,
  },
}));

const ReviewCard = (props) => {
  const styles = useStyles();
  const mediaStyles = useWideCardMediaStyles();
  const shadowStyles = useFadedShadowStyles();
  const gutterStyles = usePushingGutterStyles({ firstExcluded: true });
  return (
    <Card elevation={0} className={styles.root} style={{margin:'25px'}}>
      <CardMedia
        classes={mediaStyles}
        image={
          'https://res.cloudinary.com/jaacker25/image/upload/v1582783684/IOTFARM/agtech_wghb2m.jpg'
        }
      />
      <CardContent className={cx(shadowStyles.root, styles.content)}>
        <IconButton className={styles.favorite}>
          <EcoIcon style={{color:'green'}} />
        </IconButton>
        <h3 className={styles.title}>Farm #00025</h3>
        <br/>
        <Box color={'grey.500'} display={'flex'} alignItems={'center'} mb={1}>
          <LocationOn className={styles.locationIcon} />
          <span>Chiapas, México</span>
        </Box>
        <Box color={'grey.500'} display={'flex'} alignItems={'center'} mb={1}>
          <TodayIcon className={styles.locationIcon} />
          <span>Created: 18/02/2020</span>
        </Box>
       
        <Typography color={'textSecondary'} variant={'body2'}>
        Control and investigation in wine farm with 12 iot nodes. At the moment, the production is increissing 5%.
        </Typography>
        <Box
          mt={2}
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Box
            display={'flex'}
            alignItems={'center'}
            className={gutterStyles.parent}
          >
            
            <Avatar src={props.img} className={styles.avatar} />
      <Box>
      <h3 className={styles.heading}>{props.fname}&nbsp;&nbsp;{props.lname}</h3>
       </Box>
          </Box>


          <IconButton size={'small'}>
            <ExpandMoreIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};


export default ReviewCard;