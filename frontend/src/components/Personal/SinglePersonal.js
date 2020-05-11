import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink,useParams,useRouteMatch } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import TablePersonal from "./TablePersonal";
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import { red,blue } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import * as Moment from 'moment';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    paper: {
        margin: 'auto',
        overflow: 'hidden',
    },
    container: {
        margin: theme.spacing(1),
    },
    contentWrapper: {
        margin: '40px 16px',
    },
    avatarP: {
    backgroundColor: blue[500],
    },
    avatars: {
    backgroundColor: red[500],
    },
});
const USER_LIST = gql`

    query Personal(
        $uciId: String!
    ) {
      personal(
        id: $uciId
      ){
        edges{
          node{
            id
            name
            available
            sex
            role
            children
            days
            person{
              shiftSet{
                edges{
                  node{
                    date
                    number
                    person{
                      edges{
                        node{
                          personal{
                            id
                            name
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
`;
function Content(props) {
    const {classes , personal} = props;
    const { path } = useRouteMatch();
    const {idPersonal} = useParams();
    var shift = [];
    const id = (path === '/personalSistem') ? personal : idPersonal;
    const { loading, data } = useQuery(USER_LIST, {
        variables: { uciId: id },
    });
    if (data?.personal?.edges){
        shift = data.personal.edges.find(item => item.node.id === id);
        console.log(shift);
    }
    return (
        <Paper className={classes.paper}>
        {(loading) ?
            <Typography color="textSecondary" align="center">
                Loading...
            </Typography>
        :
        (data?.personal?.edges)?
        <div className={classes.contentWrapper}>
            <TablePersonal data={data}/>
            <Grid container spacing={3} alignItems="center" className={classes.container}>
                {shift.node.person.shiftSet.edges.map(row => (
                    <Grid item key={row.node.id} >
                        <Card>
                            <CardContent>
                                <Typography  align="center">
                                    {Moment(row.node.date).format('LLL')}
                                </Typography>
                                {row.node.person.edges.map(item =>(
                                    <Grid container key={row.node.id}>
                                        <Avatar  aria-label="recipe" className={(item.node.personal.role == "P")? classes.avatarP: classes.avatars}>
                                            {(item.node.personal.role == "P")? "P": "S"}
                                        </Avatar>
                                        <Typography color={(item.node.personal.id==id)?"textPrymary":"textSecondary"} align="inherit">
                                                {item.node.personal.name}
                                        </Typography>
                                    </Grid>
                                        ))}
                            </CardContent>
                        </Card>
                    </Grid>
                            ))}
            </Grid>
    </div>
            :
                <Typography color="textSecondary" align="center">
                    No users for this project yet
                </Typography>
    }
    </Paper>
    );
}
export default withStyles(styles)(Content);
