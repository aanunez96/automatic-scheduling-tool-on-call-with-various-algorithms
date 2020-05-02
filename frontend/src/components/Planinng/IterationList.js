import React, {useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import { gql } from 'apollo-boost';
import {useQuery} from "@apollo/react-hooks";
import IconButton from '@material-ui/core/IconButton';
import {NavigateBefore, NavigateNext} from '@material-ui/icons';

const styles = theme => ({
    paper: {
        maxWidth: 936,
        margin: 'auto',
        overflow: 'hidden',
    },
    addUser: {
        marginRight: theme.spacing(1),
    },
    contentWrapper: {
        margin: '40px 16px',
    },
    searchBar: {
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
});

const ITERATION_LIST = gql`
query(  
  $before:String!,
  $after:String!
){
  iteration(
    first:1,
    before:$before,
    after:$after,
    orderBy:"-date_end"
  ){
    pageInfo{
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges{
      node{
        id
        algorithm
        heuristic
        typeGuard
        dateStart
        dateEnd 
      }
    }
  }
}
`;

function Content(props) {
    const {classes} = props;

    const [paginator, setPaginator] = useState({
       before: "",
       after:"",
    });

    const {loading, data} = useQuery(ITERATION_LIST, {
        variables: {before: paginator.before, after: paginator.after},
    });
    if(data){
        console.log(!data.iteration.pageInfo.hasPreviousPage);
    }

    return (
        <Paper className={classes.paper}>
        <div className={classes.contentWrapper}>
            {(loading) ?
                        <Typography color="textSecondary" align="center">
                            Loading...

                        </Typography>
                    :
                        (data?.iteration?.edges)?
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Fecha de Inicio</TableCell>
                                            <TableCell align="center">Fecha de Fin</TableCell>
                                            <TableCell align="center">Algoritmo</TableCell>
                                            <TableCell align="center">heuristica</TableCell>
                                            <TableCell align="center">Tipo de Guardia</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.iteration.edges.map(row => (
                                            <TableRow key={row.node.id}>
                                                <TableCell align="center">{row.node.dateStart}</TableCell>
                                                <TableCell align="center">{row.node.dateEnd}</TableCell>
                                                <TableCell align="center">{row.node.algorithm}</TableCell>
                                                <TableCell align="center">{row.node.heuristic}</TableCell>
                                                <TableCell align="center">{row.node.typeGuard == "P" ? "Profesores":"Estudiantes"}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            :
                            <Typography color="textSecondary" align="center">
                                No users for this project yet
                            </Typography>

                }
        </div>
        <AppBar className={classes.searchBar} position="static" color="transparent" elevation={0}>
                <Toolbar>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <IconButton  disabled={false} onClick={() => {setPaginator({before: data.iteration.pageInfo.startCursor, after: ""})}} >
                                <NavigateBefore/>
                            </IconButton>
                            <IconButton disabled={false} onClick={() => {setPaginator({before:"", after: data.iteration.pageInfo.endCursor})}}>
                                <NavigateNext/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Paper>
    );
}
Content.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);