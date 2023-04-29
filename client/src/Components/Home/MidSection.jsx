import {  Grid, styled } from '@mui/material';

const ImageURL = [
    'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/purple-toy-drive-fundraising-square-video-design-template-ce14c840c31bc4306942b0a64696dda5.jpg?ts=1567075698',
    'https://images.creatopy.com/public/templates/gallery/img/bu8yd558u/Favorite-Bunny-Easter-Toys.jpg',
    'https://img.freepik.com/premium-vector/toys-banner-templates-flat-design_146957-76.jpg'
];

const Wrapper = styled(Grid)`
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
`;

const Image = styled('img')(({ theme }) => ({ 
    display: 'flex',
    marginTop: 20,
    justifyContent: 'space-between',
    width: '100%',
    height: '400px',
    [theme.breakpoints.down('md')]: {
        objectFit: 'cover',
        height: 120
    }
}));

const MidSection = () => {
    return (
        <>
            <Wrapper lg={12} sm={12} md={12} xs={12} container>
                {
                    ImageURL.map(image => (
                        <Grid item lg={4} md={4} sm={12} xs={12}>
                            <Image src={image} style={{ width: '100%' }} />
                        </Grid>
                    ))
                }
            </Wrapper>
        </>
    )
}

export default MidSection;