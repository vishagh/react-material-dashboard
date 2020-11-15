import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';

import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import {messageService} from 'src/utils/message.service';


const App = () => {
  const routing = useRoutes(routes);
  const [message, setMessage] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  useEffect(() => {
    const subscription = messageService.getMessage().subscribe(text => {
      if (text) {
        // add message to local state if not empty
        setMessage(text);
        setOpen(true)
      } 
      else {
        // clear messages when empty message received
        setMessage();
      }
    });
    return subscription.unsubscribe;
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      { message && <Snackbar onClose={handleClose} open={open} autoHideDuration={6000} message={message.text}></Snackbar> }
      {routing}
    </ThemeProvider>
  );
};

export default App;
