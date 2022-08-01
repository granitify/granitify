import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const style = {
  width: '100%',
  maxWidth: 180,
  bgcolor: 'background.paper',
};

export default function FilterMenu() {
  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
      <ListItem button>
        <ListItemText primary="Images" /> 
      </ListItem>
      <Divider />
      <ListItem button divider>
        <ListItemText primary="Video-Tutorial" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Code Snippets" />
      </ListItem>
      <Divider light />
      <ListItem button>
        <ListItemText primary="Documentation" />
      </ListItem>
    </List>
  );
}
