import React, {useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {Link as RouterLink} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import LinearProgress from '@material-ui/core/LinearProgress';
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import IconButton from '@material-ui/core/IconButton';
import {NavigateBefore, NavigateNext} from '@material-ui/icons';
import {gql} from 'apollo-boost';
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

function Content(props) {
    const {classes} = props;
    let list = [];
    const [paginator, setPaginator] = useState({
        before: "",
        after: "",
    });
    const PERSONAL = gql`
    query Personal(
        $name: String!,
        $before:String!,
        $after:String!
    ) {
      directoryPersonal(
        ${(paginator.before !== "" ? "last" : "first")}:20,
        before:$before,
        after:$after,
        name: $name,
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
            name
            sex
            role
          }
        }
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
    const [previusPage, setPreviusPage] = useState("");
    let personalSystem = [];
    const [name, setName] = useState("");
    const [textToFind, textToFindChange] = useState("");
    const {loading, data} = useQuery(PERSONAL, {
        variables: {name, before: paginator.before, after: paginator.after}, fetchPolicy: "cache-and-network",
    });

    if (data?.personal?.edges && data?.directoryPersonal?.edges) {
        personalSystem = data.personal.edges.map(row => row.node.id);
        list = data.directoryPersonal.edges.filter(row => personalSystem.indexOf(row.node.id.toString()) === -1);
    }
    return (
        <Paper className={classes.paper}>
            <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
                <Toolbar>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <SearchIcon className={classes.block} color="inherit"/>
                        </Grid>
                        <Grid item xs>
                            <TextField
                                fullWidth
                                placeholder="Buscar por Nombre"
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
                                onClick={() => {
                                    setName(textToFind);
                                    setPreviusPage("");
                                    setPaginator({before: "", after: "",})
                                }}
                            >
                                Buscar
                            </Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <div className={classes.contentWrapper}>
                {(!list) ?
                    <LinearProgress/>
                    :
                    <TableContainer component={Paper}>
                        {(loading) ?
                            <LinearProgress/>
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
                                        <TableRow color="secundary" key={row.node.id}>
                                            <TableCell align="center">{row.node.name}</TableCell>
                                            <TableCell align="center">{row.node.sex}</TableCell>
                                            <TableCell align="center">{row.node.role}</TableCell>
                                            <TableCell align="center">
                                                <Button disabled={loading} variant="contained" component={RouterLink}
                                                        to={`/modify/add/${row.node.id}`}>
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
            <AppBar className={classes.searchBar} position="static" color="inherit" elevation={0}>
                <Toolbar>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <IconButton
                                disabled={!(data?.directoryPersonal?.pageInfo?.hasPreviousPage || previusPage === 'next')}
                                onClick={() => {
                                    setPaginator({before: data.directoryPersonal.pageInfo.startCursor, after: ""});
                                    setPreviusPage('previous');
                                }}
                            >
                                <NavigateBefore/>
                            </IconButton>
                            <IconButton
                                disabled={!(data?.directoryPersonal?.pageInfo?.hasNextPage || previusPage === 'previous')}
                                onClick={() => {
                                    setPaginator({before: "", after: data.directoryPersonal.pageInfo.endCursor});
                                    setPreviusPage('next');
                                }}
                            >
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
