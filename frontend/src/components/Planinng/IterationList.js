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
import {useQuery, useMutation} from "@apollo/react-hooks";
import IconButton from '@material-ui/core/IconButton';
import {NavigateBefore, NavigateNext,DeleteForever} from '@material-ui/icons';
import Modal from '@material-ui/core/Modal';

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
    modal : {

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
    const {classes} = props;
    const [daleteIteration, infoDelete] = useMutation(DELETE_ITERATION);
    const [paginator, setPaginator] = useState({
       before: "",
       after:"",
    });

    const {loading, data} = useQuery(ITERATION_LIST, {
        variables: {before: paginator.before, after: paginator.after},
    });
    const[openModal,setOpenModal] = useState(false);
    const[openResult,setOpenResult] = useState(false);
    const[idIteration,setIdIteration] = useState(false);
    const deleteForever = () =>{
        console.log(idIteration);
        daleteIteration({variables: { id:idIteration}});
        setOpenModal(false);
    };

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
                                                <TableCell align="center">{row.node.typeGuard == "P" ? "Profesores":"Estudiantes"}</TableCell>
                                                <TableCell align="center">
                                                    <IconButton onClick={() => {setOpenModal(true);setIdIteration(row.node.id);}}>
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
                                No users for this project yet
                            </Typography>

                }
        </div>
        <AppBar className={classes.searchBar} position="static" color="transparent" elevation={0}>
                <Toolbar>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <IconButton
                                // disabled={data.iteration.pageInfo.hasPreviousPage}
                                onClick={() => setPaginator({before: data.iteration.pageInfo.startCursor, after: ""})}
                                >
                                <NavigateBefore/>
                            </IconButton>
                            <IconButton
                                onClick={() => {setPaginator({before:"", after: data.iteration.pageInfo.endCursor})}}
                                // disabled={data.iteration.pageInfo.hasNextPage}
                            >
                                <NavigateNext/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Modal
                open={openModal}
                onClose={()=> setOpenModal(false)}
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
                            <Button onClick={()=> {setOpenModal(false)}}>
                                Cancelar
                            </Button>
                        </Grid>
                        </Grid>
                    </Paper>
             </Modal>
            <Modal
                open={openResult}
                onClose={()=> setOpenResult(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
                    <Paper className={classes.paperModal}>
                        <Typography>
                            {infoDelete.ititeration}
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