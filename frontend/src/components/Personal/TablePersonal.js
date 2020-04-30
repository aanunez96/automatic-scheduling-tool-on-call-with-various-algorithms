import React, {useState} from 'react';
import PropTypes from 'prop-types';
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';


function Content(props) {
    const {classes, data} = props;
    return (
        <TableContainer component={Paper}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Nombre</TableCell>
                        <TableCell align="center">Disponible</TableCell>
                        <TableCell align="center">Rol</TableCell>
                        <TableCell align="center">Hijos</TableCell>
                        <TableCell align="center">Sexo</TableCell>
                        <TableCell align="center"></TableCell>
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
                            <TableCell align="center">
                                <Button variant="contained" component={RouterLink} to={"/modify/update/".concat(row.node.id)} >
                                    Add
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                 </TableBody>
            </Table>
        </TableContainer>
    );
}
Content.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default (Content);