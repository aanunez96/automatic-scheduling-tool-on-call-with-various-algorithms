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
import SearchIcon from '@material-ui/icons/Search';
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
          }
        }
      }
    }
`;

function Content(props) {
    const { classes } = props;

    const [uciId, setUciId] = useState("");
    const [textToFind, textToFindChange] = useState("");

    const { loading, data } = useQuery(USER_LIST, {
        variables: { uciId },
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
                                onClick={() => {setUciId(textToFind)}}
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
                                <Table className={classes.table} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Nombre</TableCell>
                                            <TableCell align="center">Disponible</TableCell>
                                            <TableCell align="center">Rol</TableCell>
                                            <TableCell align="center">Hijos</TableCell>
                                            <TableCell align="center">Sexo</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.personal.edges.map(row => (
                                            <TableRow key={row.node.id}>
                                                <TableCell align="center">{row.node.name}</TableCell>
                                                <TableCell align="center">{row.node.available ? "Activo" : "Inactivo"}</TableCell>
                                                <TableCell align="center">{row.node.role === 'S'?"Profesor" : "Estudiante" }</TableCell>
                                                <TableCell align="center">{row.node.children ? "SI" : "No"}</TableCell>
                                                <TableCell align="center">{row.node.sex === 'F'?"Mujer" : "Hombre" }</TableCell>

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
        </Paper>
    );
}

Content.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);
