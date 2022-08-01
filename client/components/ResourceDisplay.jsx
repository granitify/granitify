import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Paper } from '@mui/material';
import '../../styles/app.scss'

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function ResourceDisplay(props) {
  const { id, user, date, resources, subject, category } = props.resource;

  const handleClickImage = (e) => {
    window.open(e.target.src);
  }
  
  const handleClickLink = (e) => {
    e.preventDefault();
    window.open(e.target.href);
  }

  const mapImageUrl = resources.imageUrls.map((item) => {
    return (<ImageListItem key={item}>
      <img
        className='listImage'
        src={item}
        srcSet={item}
        alt={item}
        loading="lazy"
        onClick={handleClickImage}
      />
    </ImageListItem>
  )});


  const codeBlocks = resources.codeSnippets.map(e => {
    return (
      <Paper sx={{ maxWidth: 400 }} elevation={3}>
        <code>{e}</code>
      </Paper>
    )
  })

  const links = resources.linkUrls.map(e => {
    return (
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        <a onClick={handleClickLink} href={resources.linkUrls}>{resources.linkUrls && `${resources.linkUrls}`}</a>
      </Typography>
    )
  })

  return (
    <Card sx={{m: 2 }}>
      <CardContent >
      {/* {subject && <Typography variant="h3" component="div">
        `${subject}`
      </Typography>} */}
      
      {mapImageUrl[0] && <Typography variant="h6" component="div">Images:</Typography>}
      <ImageList sx={{ maxWidth: 500, maxHeight: 200 }} cols={3} rowHeight={164}>
      {mapImageUrl[0] && mapImageUrl}
      </ImageList>

      {codeBlocks[0] && <Typography variant="h6" component="div">Code:</Typography>}
      {codeBlocks}

      {links[0] && <Typography variant="h6" component="div">Links:</Typography>}
      {links}

      </CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {`Sent by ${user} on ${new Date(date).toLocaleString()}`}
        </Typography>
    </Card>
  );
}
