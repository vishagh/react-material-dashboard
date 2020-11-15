import React,{useState, useEffect, useCallback} from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Box,
  List,
  ListItemText,
  makeStyles
} from '@material-ui/core';
 
import Page from 'src/components/Page';
import Budget from './Budget';
import LatestOrders from './LatestOrders';
import LatestProducts from './LatestProducts';
import Sales from './Sales';
import TasksProgress from './TasksProgress';
import TotalCustomers from './TotalCustomers';
import TotalProfit from './TotalProfit';
import TrafficByDevice from './TrafficByDevice';
import dataShare from '../../../utils/dataShare.service';
import { messageService } from '../../../utils/message.service';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  /***Sample API call implementation***/

  const url = 'https://jsonplaceholder.typicode.com/posts';
  const [data, setData] = useState(null);

  const classes = useStyles();

  const fetchData = useCallback(async () => {
    const response = await fetch(url);
    const jsonData = await response.json();
    setData(jsonData);
    dataShare.setData(jsonData); //Sharing data through singleton service
    console.log('DataShare inside Dashboard....', dataShare);
  },[]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const sendMessage = () => {
    // send message to subscribers via observable subject. Implementation on observables usage to share data
    messageService.sendMessage('Message from Dashboard Component to App Component!');
  }

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Budget />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalCustomers />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TasksProgress />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalProfit />
          </Grid>
          <Grid
            item
            lg={12}
            sm={12}
            xl={12}
            xs={12}
          >
            <Card>
              <CardContent>
                {
                  <Box component="div"><button type='button' onClick={sendMessage}>Click for Message</button></Box>
                }
                {
                  data ? data.map(item => <List key={item.id}><ListItemText key={item.id}>{item.title}</ListItemText></List>)
                       : <Box component="div"> Loading ...</Box>
                }
              </CardContent>
            </Card>              
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <Sales />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <TrafficByDevice />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <LatestProducts />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LatestOrders />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
