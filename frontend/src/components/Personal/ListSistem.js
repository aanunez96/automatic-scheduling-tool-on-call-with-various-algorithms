import React, {useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { gql } from 'apollo-boost';
import {useQuery} from "@apollo/react-hooks";
import { Link as RouterLink } from 'react-router-dom';
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
const week =[
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
    'Domingo',
];
const wordDay = (item) =>{
   let index = [].filter.call(item,e => e !== ",");
   return index.map(e => week[parseInt(e,10)-1]);
};

function Content(props) {
    const [paginator, setPaginator] = useState({
       before: "",
       after:"",
    });
    const USER_LIST = gql`
    query Personal(
        $name: String!,
        $before:String!,
        $after:String!
    ) {
      personal(
        ${(paginator.before !== ""?"last": "first")}:20,
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
            sex
            role
            children
            days
          }
        }
      }
    }
`;
    const { classes } = props;
    const [name, setName] = useState("");
    const [textToFind, textToFindChange] = useState("");
    const [previusPage, setPreviusPage] = useState("");
    const { loading, data } = useQuery(USER_LIST, {
        variables: { name ,before: paginator.before, after: paginator.after},fetchPolicy: "cache-network",
    });

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
                                onClick={() => {setName(textToFind); setPreviusPage("");setPaginator({before: "", after:"",})}}
                            >
                                Buscar
                            </Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <div className={classes.contentWrapper}>
                {(loading) ?
                        <Typography color="textSecondary" align="center">
                            Loading...
                        </Typography>
                    :

                        (data?.personal?.edges)?
                            <TableContainer component={Paper}>
                                <Table aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Nombre</TableCell>
                                            <TableCell align="center">Disponible</TableCell>
                                            <TableCell align="center">Rol</TableCell>
                                            <TableCell align="center">Hijos</TableCell>
                                            <TableCell align="center">Sexo</TableCell>
                                            <TableCell align="center">Dias Inasignables</TableCell>
                                            <TableCell align="center"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.personal.edges.map(row => (
                                            <TableRow key={row.node.id}>
                                                <TableCell align="center">
                                                    <Link component={RouterLink} color="inherit" to ={`/modify/update/${row.node.id}`}>{row.node.name}</Link>
                                                </TableCell>
                                                <TableCell align="center">{row.node.available ? "Activo" : "Inactivo"}</TableCell>
                                                <TableCell align="center">{row.node.role === 'S'?"Profesor" : "Estudiante" }</TableCell>
                                                <TableCell align="center">{row.node.children ? "SI" : "No"}</TableCell>
                                                <TableCell align="center">{row.node.sex === 'F'?"Mujer" : "Hombre" }</TableCell>
                                                <TableCell align="center">{wordDay(row.node.days).map((item, index, arr) => arr.length - 1 === index ? `${item}.` : `${item}, `)}</TableCell>
                                                <TableCell align="center">
                                                    <Button variant="contained" component={RouterLink} to={`/modify/update/${row.node.id}`} >
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
                                onClick={() => {setPaginator({before: data.personal.pageInfo.startCursor, after: ""}); setPreviusPage('previous');}}
                                >
                                <NavigateBefore/>
                            </IconButton>
                            <IconButton
                                disabled={!(data?.personal?.pageInfo?.hasNextPage || previusPage === 'previous')}
                                onClick={() => {setPaginator({before: "" , after: data.personal.pageInfo.endCursor}); setPreviusPage('next');}}
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
