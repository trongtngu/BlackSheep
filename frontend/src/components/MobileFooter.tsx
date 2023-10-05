import styled from 'styled-components'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import PeopleIcon from '@mui/icons-material/People';
import AnalyticsIcon from '@mui/icons-material/Analytics';

import {useNavigate, useLocation, useParams} from 'react-router-dom'

const StyledFooter = styled.div`
  width: 100vw;
  position: fixed;
  bottom: 0px;
  z-index: 99;
  height: 70px;
  
  display: flex;

  justify-content: center;

  background: white;
`

const InfoBar = styled.div`
  display: flex;
  padding-left: 2vw;
  padding-right: 2vw;

  width: 100vw;
  justify-content: space-between;

  border-top: 1px solid lightgrey;
`

const InfoBarButton = styled.button`
  background: none;
  border: 0;
  color: lightgrey;

  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;

  font-size: 0.8rem;

  &.active {
    color: #555555;
  }
`

const StartBanner = styled.div`
  position: fixed;
  bottom: 90px;
  z-index: 99;

  display: flex;

  align-items: center;
  justify-content: center;

  width: 100%;
`

const StartButton = styled.button`
  border: 0;
  border-radius: 5px;

  color: white;
  background: linear-gradient(160deg, black 0%, #333333 70%);

  font-size: 1rem;

  padding: 1vh 10vw 1vh 10vw;
`
interface MobileFooterProps {
  planName?: string;
}

export default function MobileFooter({ planName }: MobileFooterProps) {

  const navigate = useNavigate()

  const location = useLocation();
  const { userID } = useParams();

  return (<>
    {
      planName &&
      <StartBanner>
        <StartButton>Start</StartButton>
      </StartBanner>
    }

    <StyledFooter>
      <InfoBar>
        <InfoBarButton onClick={()=>{navigate(`/user/${userID}/home`)}} className={location.pathname.startsWith(`/user/${userID}/home`) ? 'active' : ""}>
          <HomeIcon/>
          <div>Home</div>
        </InfoBarButton>
        <InfoBarButton onClick={()=>{navigate(`/user/${userID}/plans`)}} className={location.pathname.startsWith(`/user/${userID}/plans`) ? 'active' : ""}>
          <ArticleIcon/>
          <div>Plans</div>
        </InfoBarButton>
        <InfoBarButton onClick={()=>{navigate(`/user/${userID}/savedTemplates`)}} className={location.pathname.startsWith(`/user/${userID}/savedTemplates`) ? 'active' : ""}>
          <FitnessCenterIcon/>
          <div>Workout</div>
        </InfoBarButton>
        <InfoBarButton onClick={()=>{navigate(`/user/${userID}/forums`)}} className={location.pathname.startsWith(`/user/${userID}/forums`) ? 'active' : ""}>
          <PeopleIcon/>
          <div>Forums</div>
        </InfoBarButton>
        <InfoBarButton onClick={()=>{navigate(`/user/${userID}/activity`)}} className={location.pathname.startsWith(`/user/${userID}/activity`) ? 'active' : ""}>
          <AnalyticsIcon/>
          <div>Activity</div>
        </InfoBarButton>
      </InfoBar>
    </StyledFooter>
  </>)
}
