import React, {useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
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

const shiftList = [
  {
    "id": 35916,
    "sex": "Male",
    "name": "Burns Gilbert",
    "role": "Student"
  },
  {
    "id": 54361,
    "sex": "Male",
    "name": "Kathleen Mullins",
    "role": "Student"
  },
  {
    "id": 30820,
    "sex": "Male",
    "name": "Sullivan Rojas",
    "role": "Profesor"
  },
  {
    "id": 29399,
    "sex": "Male",
    "name": "Lizzie Larson",
    "role": "Profesor"
  },
  {
    "id": 80471,
    "sex": "Female",
    "name": "Mullins Bradley",
    "role": "Profesor"
  },
  {
    "id": 13875,
    "sex": "Female",
    "name": "Mayra Todd",
    "role": "Profesor"
  },
  {
    "id": 60962,
    "sex": "Female",
    "name": "Priscilla Ratliff",
    "role": "Profesor"
  },
  {
    "id": 83490,
    "sex": "Male",
    "name": "Ashlee Salas",
    "role": "Profesor"
  },
  {
    "id": 50281,
    "sex": "Female",
    "name": "Hutchinson Bradford",
    "role": "Profesor"
  },
  {
    "id": 33255,
    "sex": "Male",
    "name": "Dyer Pittman",
    "role": "Student"
  },
  {
    "id": 80405,
    "sex": "Male",
    "name": "Beard Hall",
    "role": "Student"
  },
  {
    "id": 77309,
    "sex": "Female",
    "name": "Knowles Daugherty",
    "role": "Student"
  },
  {
    "id": 98680,
    "sex": "Female",
    "name": "Ortiz Blankenship",
    "role": "Profesor"
  },
  {
    "id": 69117,
    "sex": "Male",
    "name": "Dickerson Mccarthy",
    "role": "Profesor"
  },
  {
    "id": 10204,
    "sex": "Female",
    "name": "Alberta Branch",
    "role": "Profesor"
  },
  {
    "id": 13710,
    "sex": "Female",
    "name": "Louella Cleveland",
    "role": "Profesor"
  },
  {
    "id": 13755,
    "sex": "Female",
    "name": "Lynn Carrillo",
    "role": "Student"
  },
  {
    "id": 70512,
    "sex": "Female",
    "name": "Lorena Pate",
    "role": "Profesor"
  },
  {
    "id": 10385,
    "sex": "Female",
    "name": "Joyner Kirkland",
    "role": "Student"
  },
  {
    "id": 13657,
    "sex": "Male",
    "name": "Araceli Allen",
    "role": "Student"
  },
  {
    "id": 59151,
    "sex": "Female",
    "name": "Dorthy Cruz",
    "role": "Profesor"
  },
  {
    "id": 35058,
    "sex": "Male",
    "name": "Cheryl Mcdowell",
    "role": "Student"
  },
  {
    "id": 41411,
    "sex": "Male",
    "name": "Vaughan Tillman",
    "role": "Student"
  },
  {
    "id": 26232,
    "sex": "Female",
    "name": "Becky Talley",
    "role": "Student"
  },
  {
    "id": 88140,
    "sex": "Female",
    "name": "Owen Hines",
    "role": "Student"
  },
  {
    "id": 84849,
    "sex": "Male",
    "name": "Rose Collins",
    "role": "Student"
  },
  {
    "id": 30336,
    "sex": "Female",
    "name": "Maggie Bradshaw",
    "role": "Profesor"
  },
  {
    "id": 79604,
    "sex": "Female",
    "name": "Jillian Elliott",
    "role": "Student"
  },
  {
    "id": 89841,
    "sex": "Female",
    "name": "Marina Harrington",
    "role": "Student"
  },
  {
    "id": 92326,
    "sex": "Male",
    "name": "Paul Mcbride",
    "role": "Student"
  },
  {
    "id": 62034,
    "sex": "Female",
    "name": "Mcclure Barr",
    "role": "Profesor"
  },
  {
    "id": 40346,
    "sex": "Female",
    "name": "Glenn Mccray",
    "role": "Profesor"
  },
  {
    "id": 30554,
    "sex": "Female",
    "name": "Bridges Dawson",
    "role": "Profesor"
  },
  {
    "id": 96754,
    "sex": "Female",
    "name": "Lenore Clay",
    "role": "Profesor"
  },
  {
    "id": 47619,
    "sex": "Male",
    "name": "Cherry Delgado",
    "role": "Student"
  },
  {
    "id": 95647,
    "sex": "Male",
    "name": "Luna Evans",
    "role": "Student"
  },
  {
    "id": 31050,
    "sex": "Male",
    "name": "Steele Gates",
    "role": "Student"
  },
  {
    "id": 74892,
    "sex": "Female",
    "name": "Terry James",
    "role": "Profesor"
  },
  {
    "id": 61833,
    "sex": "Female",
    "name": "Castillo Stein",
    "role": "Student"
  },
  {
    "id": 92270,
    "sex": "Male",
    "name": "Jensen Hale",
    "role": "Profesor"
  },
  {
    "id": 60620,
    "sex": "Female",
    "name": "Dunn Velasquez",
    "role": "Student"
  },
  {
    "id": 47451,
    "sex": "Female",
    "name": "Maura Carroll",
    "role": "Student"
  },
  {
    "id": 30312,
    "sex": "Male",
    "name": "Jo Powers",
    "role": "Profesor"
  },
  {
    "id": 97438,
    "sex": "Female",
    "name": "Estella Joyce",
    "role": "Student"
  },
  {
    "id": 73061,
    "sex": "Female",
    "name": "April Watson",
    "role": "Profesor"
  },
  {
    "id": 21479,
    "sex": "Male",
    "name": "Nanette Gonzalez",
    "role": "Profesor"
  },
  {
    "id": 89842,
    "sex": "Male",
    "name": "Bertie Nelson",
    "role": "Profesor"
  },
  {
    "id": 17328,
    "sex": "Female",
    "name": "Serena Ramirez",
    "role": "Student"
  },
  {
    "id": 97986,
    "sex": "Female",
    "name": "Wendy Whitney",
    "role": "Student"
  },
  {
    "id": 32415,
    "sex": "Male",
    "name": "Cunningham Golden",
    "role": "Student"
  },
  {
    "id": 76961,
    "sex": "Female",
    "name": "Mcintyre Slater",
    "role": "Profesor"
  },
  {
    "id": 45293,
    "sex": "Female",
    "name": "Vilma Estes",
    "role": "Profesor"
  },
  {
    "id": 66650,
    "sex": "Male",
    "name": "Wheeler Baird",
    "role": "Profesor"
  },
  {
    "id": 97451,
    "sex": "Male",
    "name": "Karin English",
    "role": "Student"
  },
  {
    "id": 75646,
    "sex": "Male",
    "name": "Winnie Wheeler",
    "role": "Student"
  },
  {
    "id": 69921,
    "sex": "Male",
    "name": "Tabatha Ramos",
    "role": "Profesor"
  },
  {
    "id": 70503,
    "sex": "Female",
    "name": "Amber Hays",
    "role": "Profesor"
  },
  {
    "id": 73719,
    "sex": "Female",
    "name": "Bullock Fulton",
    "role": "Student"
  },
  {
    "id": 37112,
    "sex": "Male",
    "name": "Brown Sheppard",
    "role": "Student"
  },
  {
    "id": 11112,
    "sex": "Male",
    "name": "Consuelo Park",
    "role": "Student"
  },
  {
    "id": 97365,
    "sex": "Female",
    "name": "Marci Hopkins",
    "role": "Profesor"
  },
  {
    "id": 93761,
    "sex": "Male",
    "name": "Bowers Holt",
    "role": "Student"
  },
  {
    "id": 73579,
    "sex": "Female",
    "name": "Tyson Kirby",
    "role": "Student"
  },
  {
    "id": 92371,
    "sex": "Female",
    "name": "Leanne Kirk",
    "role": "Profesor"
  },
  {
    "id": 94759,
    "sex": "Female",
    "name": "Arnold Anderson",
    "role": "Student"
  },
  {
    "id": 75144,
    "sex": "Female",
    "name": "Farrell Little",
    "role": "Profesor"
  },
  {
    "id": 25085,
    "sex": "Male",
    "name": "Slater Ward",
    "role": "Student"
  },
  {
    "id": 87300,
    "sex": "Male",
    "name": "Rita Combs",
    "role": "Profesor"
  },
  {
    "id": 15582,
    "sex": "Male",
    "name": "Chandra Landry",
    "role": "Student"
  },
  {
    "id": 30801,
    "sex": "Female",
    "name": "Downs Clements",
    "role": "Profesor"
  },
  {
    "id": 38591,
    "sex": "Female",
    "name": "Kelli Odom",
    "role": "Student"
  },
  {
    "id": 85197,
    "sex": "Male",
    "name": "Rivas Casey",
    "role": "Student"
  },
  {
    "id": 79497,
    "sex": "Female",
    "name": "Davenport Mitchell",
    "role": "Profesor"
  },
  {
    "id": 67331,
    "sex": "Female",
    "name": "Mendoza Dominguez",
    "role": "Profesor"
  },
  {
    "id": 17461,
    "sex": "Male",
    "name": "Twila Townsend",
    "role": "Student"
  },
  {
    "id": 92115,
    "sex": "Female",
    "name": "Lea Herman",
    "role": "Profesor"
  },
  {
    "id": 40381,
    "sex": "Female",
    "name": "Jeannette Harris",
    "role": "Student"
  },
  {
    "id": 84418,
    "sex": "Male",
    "name": "Kristy Davis",
    "role": "Student"
  },
  {
    "id": 36182,
    "sex": "Male",
    "name": "Cross Bullock",
    "role": "Profesor"
  },
  {
    "id": 54222,
    "sex": "Male",
    "name": "Franks Hahn",
    "role": "Profesor"
  },
  {
    "id": 59323,
    "sex": "Male",
    "name": "Beatriz Pennington",
    "role": "Student"
  },
  {
    "id": 41308,
    "sex": "Female",
    "name": "Mcdonald Mendoza",
    "role": "Student"
  },
  {
    "id": 67498,
    "sex": "Female",
    "name": "Madeleine Flowers",
    "role": "Profesor"
  },
  {
    "id": 59238,
    "sex": "Female",
    "name": "Irma Stanton",
    "role": "Profesor"
  },
  {
    "id": 85470,
    "sex": "Female",
    "name": "Goff Bernard",
    "role": "Profesor"
  },
  {
    "id": 42480,
    "sex": "Female",
    "name": "Miriam Petty",
    "role": "Student"
  },
  {
    "id": 33602,
    "sex": "Male",
    "name": "Brigitte Ball",
    "role": "Profesor"
  },
  {
    "id": 93052,
    "sex": "Female",
    "name": "Betty Morse",
    "role": "Profesor"
  },
  {
    "id": 47863,
    "sex": "Male",
    "name": "Herman Frye",
    "role": "Student"
  },
  {
    "id": 66370,
    "sex": "Male",
    "name": "Dunlap Brewer",
    "role": "Profesor"
  },
  {
    "id": 90179,
    "sex": "Male",
    "name": "Inez Love",
    "role": "Student"
  },
  {
    "id": 75329,
    "sex": "Male",
    "name": "Doris Jackson",
    "role": "Student"
  },
  {
    "id": 72358,
    "sex": "Female",
    "name": "Lane Wade",
    "role": "Profesor"
  },
  {
    "id": 72530,
    "sex": "Female",
    "name": "Nita Warner",
    "role": "Profesor"
  },
  {
    "id": 14816,
    "sex": "Female",
    "name": "Maldonado Snow",
    "role": "Profesor"
  },
  {
    "id": 59765,
    "sex": "Male",
    "name": "Loraine Brennan",
    "role": "Profesor"
  },
  {
    "id": 80731,
    "sex": "Male",
    "name": "Mcconnell Conner",
    "role": "Profesor"
  },
  {
    "id": 58456,
    "sex": "Male",
    "name": "Vargas Barnes",
    "role": "Student"
  },
  {
    "id": 50002,
    "sex": "Female",
    "name": "Francis Winters",
    "role": "Student"
  },
  {
    "id": 88029,
    "sex": "Male",
    "name": "Naomi Paul",
    "role": "Profesor"
  }
];
const PERSONAL = gql`
{
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
    const [name, setname] = useState("");
    const [textToFind, textToFindChange] = useState("");
    const { loading, data } = useQuery(PERSONAL,{fetchPolicy: "network-only"});


    if (data?.personal?.edges){
      console.log(data.personal);
        personalSistem = data.personal.edges.map(row => row.node.id);
        list = shiftList.filter(row => personalSistem.indexOf(row.id.toString()) === -1);
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
                            <TableContainer component={Paper}>
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
                                        {list.map(row => (
                                            <TableRow color="secundary" key={row.id}>
                                                <TableCell align="center">{row.name}</TableCell>
                                                <TableCell align="center">{row.sex}</TableCell>
                                                <TableCell align="center">{row.role}</TableCell>
                                                <TableCell align="center">
                                                    <Button variant="contained" component={RouterLink} to={`/modify/add/${row.id}`} >
                                                      Add
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
            </div>
        </Paper>
    );
}

Content.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);
