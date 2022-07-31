import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

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

  const mapImageUrl = resources.imageUrls.map((item) => {
    return (<ImageListItem key={item}>
      <img
        src={item}
        srcSet={item}
        alt={item}
        loading="lazy"
      />
    </ImageListItem>
  )});

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
      <Typography variant="h3" component="div">
        {subject && `${subject}`}
      </Typography>
      <ImageList sx={{ width: 500, height: 250 }} cols={3} rowHeight={164}>
      {mapImageUrl.length && mapImageUrl}
      </ImageList>
      <Typography variant="body2">
          {resources.codeSnippets && `${resources.codeSnippets}`}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          <a href={resources.linkUrls}>{resources.linkUrls && `${resources.linkUrls}`}</a>
        </Typography>

      </CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {`Sent by ${user} on ${date}`}
        </Typography>
    </Card>
  );
}
