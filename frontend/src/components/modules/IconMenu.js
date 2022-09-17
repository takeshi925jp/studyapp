import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import { Link } from "react-router-dom";
import ListItem from '@mui/material/ListItem';

export default function IconMenu(props) {
  return (
    <Paper sx={{ width: 320, maxWidth: '100%' }}>
      <MenuList>

        {props.studyschedule &&
          <>
            <MenuItem>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItem button component={Link} to={`/studyschedule`}>
                <ListItemText>学習計画一覧画面</ListItemText>
              </ListItem>
              <Typography variant="body2" color="text.secondary">

              </Typography>
            </MenuItem>
          </>
        }

        {props.studying &&
          <>
            <MenuItem>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItem button component={Link} to={`/studying`}>
                <ListItemText>学習中画面</ListItemText>
              </ListItem>
              <Typography variant="body2" color="text.secondary">
                ⌘X
              </Typography>
            </MenuItem>
          </>
        }

        {props.history &&
          <>
            <MenuItem>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItem button component={Link} to={`/history`}>
                <ListItemText>学習履歴画面</ListItemText>
              </ListItem>
              <Typography variant="body2" color="text.secondary">

              </Typography>
            </MenuItem>
          </>
        }

        {props.login &&
          <>
            <MenuItem>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItem button component={Link} to={`/login`}>
                <ListItemText>ログイン画面</ListItemText>
              </ListItem>
              <Typography variant="body2" color="text.secondary">

              </Typography>
            </MenuItem>
          </>
        }



      </MenuList>
    </Paper>
  );
}