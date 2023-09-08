import styled from 'styled-components'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import PeopleIcon from '@mui/icons-material/People';
import AnalyticsIcon from '@mui/icons-material/Analytics';

import {useNavigate, useLocation} from 'react-router-dom'

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

export default function MobileFooter() {

  const navigate = useNavigate()

  const location = useLocation();

  return (
    <StyledFooter>
      <InfoBar>
        <InfoBarButton onClick={()=>{navigate('/home')}} className={location.pathname.startsWith("/home") ? 'active' : ""}>
          <HomeIcon/>
          <div>Home</div>
        </InfoBarButton>
        <InfoBarButton onClick={()=>{navigate('/plans')}} className={location.pathname.startsWith("/plans") ? 'active' : ""}>
          <ArticleIcon/>
          <div>Plans</div>
        </InfoBarButton>
        <InfoBarButton onClick={()=>{navigate('/template/FullBody')}} className={location.pathname.startsWith("/template") ? 'active' : ""}>
          <FitnessCenterIcon/>
          <div >Workout</div>
        </InfoBarButton>
        <InfoBarButton onClick={()=>{navigate('/forums')}} className={location.pathname.startsWith("/forums") ? 'active' : ""}>
          <PeopleIcon/>
          <div>Forums</div>
        </InfoBarButton>
        <InfoBarButton onClick={()=>{navigate('/activity')}} className={location.pathname.startsWith("/activity") ? 'active' : ""}>
          <AnalyticsIcon/>
          <div>Activity</div>
        </InfoBarButton>
      </InfoBar>
    </StyledFooter>
  )
}
