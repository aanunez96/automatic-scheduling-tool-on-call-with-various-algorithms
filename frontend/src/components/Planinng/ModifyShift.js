import React, {useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import {gql} from 'apollo-boost';
import {useQuery} from "@apollo/react-hooks";
import {Link as RouterLink} from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import {NavigateBefore, NavigateNext} from '@material-ui/icons';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";

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
    const [paginator, setPaginator] = useState({
        before: "",
        after: "",
    });
    const USER_LIST = gql`
    query Personal(
        $name: String!,
        $before:String!,
        $after:String!
    ) {
      personal(
        ${(paginator.before !== "" ? "last" : "first")}:20,
        before:$before,
        after:$after,
        name_Icontains: $name,
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
            available
            role
          }
        }
      }
    }
`;
    const {classes} = props;
    const [name, setName] = useState("");
    const [textToFind, textToFindChange] = useState("");
    const [previusPage, setPreviusPage] = useState("");
    const {loading, data} = useQuery(USER_LIST, {
        variables: {name, before: paginator.before, after: paginator.after}, fetchPolicy: "cache-and-network",
    });

    return (
        <Paper className={classes.paper}>
            <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
                <Grid>
                    <Card>
                        <CardContent>
                            <Typography align="center" color={"textSecondary"}>
                                {`turno${'aaa'}`}
                            </Typography>
                            <Typography align="center" color={"textSecondary"}>
                                Personal
                            </Typography>
                            {row.node.person.edges.map(item => (
                                <Grid container key={row.node.id}>
                                    <Avatar aria-label="recipe"
                                            className={(item.node.personal.role === "P") ? classes.avatarP : classes.avatars}>
                                        {(item.node.personal.role === "P") ? "P" : "S"}
                                    </Avatar>
                                    <Typography
                                        color={(item.node.personal.id === personal.id) ? "textPrimary" : "textSecondary"}
                                        align="inherit">
                                        {item.node.personal.name}
                                    </Typography>
                                </Grid>
                            ))}
                        </CardContent>
                    </Card>
                </Grid>
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
                {(!data) ?
                    <LinearProgress/>
                    :

                    (data?.personal?.edges) ?
                        <TableContainer component={Paper}>
                            {(loading) ?
                                <LinearProgress/>
                                :
                                ""}
                            <Table aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Nombre</TableCell>
                                        <TableCell align="center">Disponible</TableCell>
                                        <TableCell align="center">Rol</TableCell>
                                        <TableCell align="center"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.personal.edges.map(row => (
                                        <TableRow key={row.node.id}>
                                            <TableCell align="center">
                                                <Link component={RouterLink} color="inherit"
                                                      to={`/modify/update/${row.node.id}`}>{row.node.name}</Link>
                                            </TableCell>
                                            <TableCell
                                                align="center">{row.node.available ? "Activo" : "Inactivo"}</TableCell>
                                            <TableCell
                                                align="center">{row.node.role === 'P' ? "Profesor" : "Estudiante"}</TableCell>
                                            <TableCell align="center">{row.node.children ? "SI" : "No"}</TableCell>
                                            <TableCell align="center">
                                                <Button disabled={loading} variant="contained" component={RouterLink}
                                                        to={`/modify/update/${row.node.id}`}>
                                                    Modificar
                                                </Button>
                                            </TableCell>
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
            <AppBar className={classes.searchBar} position="static" color="inherit" elevation={0}>
                <Toolbar>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <IconButton
                                disabled={!(data?.personal?.pageInfo?.hasPreviousPage || previusPage === 'next')}
                                onClick={() => {
                                    setPaginator({before: data.personal.pageInfo.startCursor, after: ""});
                                    setPreviusPage('previous');
                                }}
                            >
                                <NavigateBefore/>
                            </IconButton>
                            <IconButton
                                disabled={!(data?.personal?.pageInfo?.hasNextPage || previusPage === 'previous')}
                                onClick={() => {
                                    setPaginator({before: "", after: data.personal.pageInfo.endCursor});
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
