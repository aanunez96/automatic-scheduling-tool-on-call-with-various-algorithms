import React, {useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import {gql} from 'apollo-boost';
import {useQuery, useMutation} from "@apollo/react-hooks";
import IconButton from '@material-ui/core/IconButton';
import {NavigateBefore, NavigateNext, DeleteForever} from '@material-ui/icons';
import Modal from '@material-ui/core/Modal';
import {REFETCH_LIST_ITERATION} from '../../reactRedux';
import {useSelector, useDispatch} from 'react-redux';

const styles = theme => ({
    paper: {
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
    paperModal: {
        position: 'absolute',
        width: 300,
        padding: theme.spacing(2, 4, 3),
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    },
});
const DELETE_ITERATION = gql`
mutation DeleteIteration(
    $id: ID!
){
  deleteMutation(input:{idIteration: $id}){
    iteration
  }
}

`;

function Content(props) {
    const [paginator, setPaginator] = useState({
        before: "",
        after: "",
    });
    const ITERATION_LIST = gql`
    query(  
      $before:String!,
      $after:String!
    ){
      iteration(
        ${(paginator.before !== "" ? "last" : "first")}:10,
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
    const {classes} = props;
    const dispatch = useDispatch();
    const [daleteIteration, {data: infoDelete}] = useMutation(DELETE_ITERATION);
    const [previusPage, setPreviusPage] = useState("");
    const {loading, data, refetch} = useQuery(ITERATION_LIST, {
        variables: {before: paginator.before, after: paginator.after}, fetchPolicy: "cache-and-network",
    });
    const [openModal, setOpenModal] = useState(false);
    const [openResult, setOpenResult] = useState(false);
    const [renderOpen, setRenderOpen] = useState(false);
    const [idIteration, setIdIteration] = useState(false);
    if (infoDelete?.deleteMutation?.iteration) {
        refetch();
        if (!renderOpen) {
            setRenderOpen(true);
            setOpenResult(true);
        }
    }
    const deleteForever = () => {
        daleteIteration({variables: {id: idIteration}});
        setOpenModal(false);
    };

    const selectFunction = (state) => {
        if (state.listIteration) {
            refetch();
            dispatch({type: REFETCH_LIST_ITERATION});
        }
    }
    useSelector(selectFunction);


    return (
        <Paper className={classes.paper}>
            <div className={classes.contentWrapper}>
                {(!data) ?
                    <LinearProgress/>
                    :
                    (data?.iteration?.edges) ?
                        <TableContainer component={Paper}>
                            {(loading) ?
                                <LinearProgress/>
                                :
                                ""}
                            <Table className={classes.table} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Fecha de Inicio</TableCell>
                                        <TableCell align="center">Fecha de Fin</TableCell>
                                        <TableCell align="center">Algoritmo</TableCell>
                                        <TableCell align="center">heuristica</TableCell>
                                        <TableCell align="center">Tipo de Guardia</TableCell>
                                        <TableCell align="center"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.iteration.edges.map(row => (
                                        <TableRow key={row.node.id}>
                                            <TableCell align="center">{row.node.dateStart}</TableCell>
                                            <TableCell align="center">{row.node.dateEnd}</TableCell>
                                            <TableCell align="center">{row.node.algorithm}</TableCell>
                                            <TableCell align="center">{row.node.heuristic}</TableCell>
                                            <TableCell
                                                align="center">{row.node.typeGuard === "P" ? "Profesores" : "Estudiantes"}</TableCell>
                                            <TableCell align="center">
                                                <IconButton disanbled={loading} onClick={() => {
                                                    setOpenModal(true);
                                                    setIdIteration(row.node.id);
                                                }}>
                                                    <DeleteForever/>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        :
                        <Typography color="textSecondary" align="center">
                            No Iteration for this project yet
                        </Typography>

                }
            </div>
            <AppBar className={classes.searchBar} position="static" color="inherit" elevation={0}>
                <Toolbar>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <IconButton
                                disabled={!(data?.iteration?.pageInfo?.hasPreviousPage || previusPage === 'next')}
                                onClick={() => {
                                    setPaginator({before: data.iteration.pageInfo.startCursor, after: ""});
                                    setPreviusPage('previous');
                                }}
                            >
                                <NavigateBefore/>
                            </IconButton>
                            <IconButton
                                onClick={() => {
                                    setPaginator({before: "", after: data.iteration.pageInfo.endCursor});
                                    setPreviusPage('next');
                                }}
                                disabled={!(data?.iteration?.pageInfo?.hasNextPage || previusPage === 'previous')}
                            >
                                <NavigateNext/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <Paper className={classes.paperModal}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography>
                                Estas seguro que deseas eliminar la Iteracion?
                            </Typography>
                        </Grid>
                        <Grid item xs>
                        </Grid>
                        <Grid item>
                            <Button onClick={deleteForever}>
                                Aceptar
                            </Button>
                            <Button onClick={() => {
                                setOpenModal(false)
                            }}>
                                Cancelar
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Modal>
            <Modal
                open={openResult}
                onClose={() => setOpenResult(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <Paper className={classes.paperModal}>
                    <Typography>
                        {(infoDelete?.deleteMutation?.iteration) ? "Se ha eliminado la Itreracion Correctamente" : "Ha ocurrido un error inesperado "}
                    </Typography>
                </Paper>
            </Modal>
        </Paper>
    );
}

Content.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);