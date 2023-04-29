
import { Box, styled } from '@mui/material';

import Slide from './Slide';

const Component = styled(Box)`
    display: flex;
    flex-direction: row-reverse;
`

const LeftComponent = styled(Box)(({ theme}) => ({
    width: '83%',
    [theme.breakpoints.down('md')]: {
        width: '100%'
    }
}))

const RightComponent = styled(Box)(({ theme}) => ({
    marginTop: 10,
    background: '#FFFFFF',
    width: '17%',
    marginRight: 10,
    padding: 5,
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
        display: 'none'
    }
}));

const MidSlide = ({ products }) => {
    const adURL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Vkl63eibarwS3uL2PBHDBRTF9vyfYK1rs-nYilIVEzCm4FVsy70-iahP-hJDK2M7kYk&usqp=CAU';

    return (
        <Component>
            <LeftComponent>
                <Slide 
                    data={products} 
                    title='Deals of the Day'
                    timer={true} 
                    multi={true} 
                />
            </LeftComponent>
            <RightComponent>
                <img src={adURL} style={{width: 217 , height:390}}/>
            </RightComponent>
        </Component>
    )
}

export default MidSlide;