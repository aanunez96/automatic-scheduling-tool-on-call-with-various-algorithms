import React, {useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link as RouterLink } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import LinearProgress from '@material-ui/core/LinearProgress';
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import { gql } from 'apollo-boost';
import {useQuery} from "@apollo/react-hooks";

const styles = theme => ({
    paper: {
        margin: 'auto',
        overflow: 'hidden',
    },
    searchBar: {
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    searchInput: {
        fontSize: theme.typography.fontSize,
    },
    block: {
        display: 'block',
    },
    addUser: {
        marginRight: theme.spacing(1),
    },
    contentWrapper: {
        margin: '40px 16px',
    },
});

const PERSONAL = gql`
{
directoryPersonal{
   id
   sex
   name
   role
}
personal{
  edges{
    node{
      id
    }
  }
}
}
`;

function Content(props) {
    const { classes } = props;
    let list = [];
    let personalSistem = [];
    // const [name, setname] = useState("");
    const [textToFind, textToFindChange] = useState("");
    const { loading, data } = useQuery(PERSONAL,{fetchPolicy: "cache-and-network"});


    if (data?.personal?.edges && data?.directoryPersonal){
        personalSistem = data.personal.edges.map(row => row.node.id);
        list = data.directoryPersonal.filter(row => personalSistem.indexOf(row.id.toString()) === -1);
    }
    return (
        <Paper className={classes.paper}>
            <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
                <Toolbar>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <SearchIcon className={classes.block} color="inherit" />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                fullWidth
                                placeholder="Buscar por uci id"
                                InputProps={{
                                    disableUnderline: true,
                                    className: classes.searchInput,
                                }}
                                value={textToFind}
                                onChange={event => {
                                    textToFindChange(event.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.addUser}
                                onClick={() => {}}
                            >
                                Buscar
                            </Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <div className={classes.contentWrapper}>
                    {(!list) ?
                        <LinearProgress />
                    :
                            <TableContainer component={Paper}>
                                {(loading)?
                                <LinearProgress />
                                :
                                ""}
                                <Table className={classes.table} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">name</TableCell>
                                            <TableCell align="center">sex</TableCell>
                                            <TableCell align="center">role</TableCell>
                                            <TableCell align="center">action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            list.map(row => (
                                            <TableRow color="secundary" key={row.id}>
                                                <TableCell align="center">{row.name}</TableCell>
                                                <TableCell align="center">{row.sex}</TableCell>
                                                <TableCell align="center">{row.role}</TableCell>
                                                <TableCell align="center">
                                                    <Button disanbled={loading} variant="contained" component={RouterLink} to={`/modify/add/${row.id}`} >
                                                      Add
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
        }
            </div>
        </Paper>
    );
}

Content.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);
