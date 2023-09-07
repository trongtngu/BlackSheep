import styled from 'styled-components'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SettingsIcon from '@mui/icons-material/Settings';

const StyledFooter = styled.div`
  background: linear-gradient(160deg, #20B2AA 0%, #40E0D0 120%);
  width: 100vw;
  position: fixed;
  bottom: 0px;
  z-index: 99;
  height: 22vh;
  
  display: flex;

  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  padding-top: 1vh;

  gap: 3vw;
  padding-left: 2vw;
  padding-right: 2vw;
`

const InfoBarButton = styled.button`
  background: none;
  border: 0;
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;

  border-bottom: 2px solid white;
`

export default function MobileFooter() {
  return (
    <StyledFooter>
      <InfoBarButton>
        <AccountCircleIcon />
        <div>account</div>
      </InfoBarButton>
      <InfoBarButton>
        <FitnessCenterIcon />
        <div>workouts</div>
      </InfoBarButton>
      <InfoBarButton>
        <SettingsIcon />
        <div>settings</div>
      </InfoBarButton>
    </StyledFooter>
  )
}
