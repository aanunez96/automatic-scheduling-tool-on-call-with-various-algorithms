import React, {useState} from 'react';
import { useMutation } from '@apollo/react-hooks';
import {useParams} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { withStyles,useTheme } from '@material-ui/core/styles';
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { gql } from 'apollo-boost';


const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 250,
      width: 250,
    },
  },
};
const styles = theme => ({
    paper: {
        margin: 'auto',
        overflow: 'hidden',
    },
      formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
    button: {
        padding: theme.spacing(2),
    }
});
const shiftList = [
  {
    "_id": 44232,
    "sex": "Female",
    "name": "Woods Lamb",
    "role": "Profesor"
  },
  {
    "_id": 59337,
    "sex": "Female",
    "name": "Mcfarland Burns",
    "role": "Profesor"
  },
  {
    "_id": 61797,
    "sex": "Male",
    "name": "Kay Dawson",
    "role": "Profesor"
  },
  {
    "_id": 66691,
    "sex": "Male",
    "name": "Matthews Mcguire",
    "role": "Student"
  },
  {
    "_id": 69857,
    "sex": "Female",
    "name": "Mclean Harper",
    "role": "Student"
  },
  {
    "_id": 75630,
    "sex": "Male",
    "name": "Allen Taylor",
    "role": "Profesor"
  },
  {
    "_id": 31821,
    "sex": "Male",
    "name": "Silvia Mooney",
    "role": "Profesor"
  },
  {
    "_id": 65351,
    "sex": "Female",
    "name": "Newton Clayton",
    "role": "Student"
  },
  {
    "_id": 40739,
    "sex": "Female",
    "name": "Hooper Avila",
    "role": "Profesor"
  },
  {
    "_id": 19902,
    "sex": "Male",
    "name": "Juliana Reese",
    "role": "Student"
  },
  {
    "_id": 99688,
    "sex": "Male",
    "name": "Fisher Manning",
    "role": "Profesor"
  },
  {
    "_id": 75634,
    "sex": "Female",
    "name": "Coffey Lott",
    "role": "Profesor"
  },
  {
    "_id": 36400,
    "sex": "Female",
    "name": "Ratliff Velazquez",
    "role": "Student"
  },
  {
    "_id": 74400,
    "sex": "Male",
    "name": "Jackie Barnes",
    "role": "Profesor"
  },
  {
    "_id": 40826,
    "sex": "Female",
    "name": "Kirby Guerrero",
    "role": "Profesor"
  },
  {
    "_id": 46752,
    "sex": "Male",
    "name": "Stevens Suarez",
    "role": "Student"
  },
  {
    "_id": 60796,
    "sex": "Male",
    "name": "Matilda Levine",
    "role": "Student"
  },
  {
    "_id": 86524,
    "sex": "Female",
    "name": "Skinner Howard",
    "role": "Profesor"
  },
  {
    "_id": 37473,
    "sex": "Male",
    "name": "Santiago Baldwin",
    "role": "Profesor"
  },
  {
    "_id": 40179,
    "sex": "Male",
    "name": "Hester Haley",
    "role": "Student"
  },
  {
    "_id": 12828,
    "sex": "Male",
    "name": "Hutchinson Melendez",
    "role": "Student"
  },
  {
    "_id": 68747,
    "sex": "Male",
    "name": "Cathy Cannon",
    "role": "Profesor"
  },
  {
    "_id": 45532,
    "sex": "Male",
    "name": "Anna Sparks",
    "role": "Student"
  },
  {
    "_id": 38345,
    "sex": "Female",
    "name": "Macdonald Powers",
    "role": "Profesor"
  },
  {
    "_id": 23500,
    "sex": "Female",
    "name": "Duncan Tanner",
    "role": "Student"
  },
  {
    "_id": 17328,
    "sex": "Male",
    "name": "Marva Cantu",
    "role": "Profesor"
  },
  {
    "_id": 90903,
    "sex": "Male",
    "name": "Ruby Stein",
    "role": "Profesor"
  },
  {
    "_id": 89005,
    "sex": "Female",
    "name": "Savage Collins",
    "role": "Student"
  },
  {
    "_id": 51709,
    "sex": "Male",
    "name": "Glenda Steele",
    "role": "Profesor"
  },
  {
    "_id": 27693,
    "sex": "Male",
    "name": "Allison Mcbride",
    "role": "Profesor"
  },
  {
    "_id": 77524,
    "sex": "Male",
    "name": "Welch Hartman",
    "role": "Student"
  },
  {
    "_id": 15864,
    "sex": "Female",
    "name": "Luisa Daugherty",
    "role": "Student"
  },
  {
    "_id": 82243,
    "sex": "Male",
    "name": "Iva Shaw",
    "role": "Profesor"
  },
  {
    "_id": 89048,
    "sex": "Male",
    "name": "Delgado Ayers",
    "role": "Student"
  },
  {
    "_id": 65737,
    "sex": "Female",
    "name": "Reilly Klein",
    "role": "Profesor"
  },
  {
    "_id": 84781,
    "sex": "Female",
    "name": "Dixon Merrill",
    "role": "Student"
  },
  {
    "_id": 21802,
    "sex": "Female",
    "name": "Florence Crosby",
    "role": "Profesor"
  },
  {
    "_id": 80690,
    "sex": "Male",
    "name": "Jerry Johnson",
    "role": "Profesor"
  },
  {
    "_id": 17311,
    "sex": "Male",
    "name": "Salas Love",
    "role": "Profesor"
  },
  {
    "_id": 76663,
    "sex": "Female",
    "name": "Effie Gray",
    "role": "Profesor"
  },
  {
    "_id": 16084,
    "sex": "Male",
    "name": "Tommie Delgado",
    "role": "Profesor"
  },
  {
    "_id": 21159,
    "sex": "Male",
    "name": "Horne Crane",
    "role": "Profesor"
  },
  {
    "_id": 56017,
    "sex": "Female",
    "name": "Rosalyn Stokes",
    "role": "Profesor"
  },
  {
    "_id": 17588,
    "sex": "Female",
    "name": "Joyce Rollins",
    "role": "Profesor"
  },
  {
    "_id": 75258,
    "sex": "Male",
    "name": "Claudine Hull",
    "role": "Profesor"
  },
  {
    "_id": 58553,
    "sex": "Male",
    "name": "Patsy Roach",
    "role": "Profesor"
  },
  {
    "_id": 25188,
    "sex": "Male",
    "name": "Emily Giles",
    "role": "Profesor"
  },
  {
    "_id": 89035,
    "sex": "Female",
    "name": "Wade Moreno",
    "role": "Profesor"
  },
  {
    "_id": 58325,
    "sex": "Female",
    "name": "Robinson Pope",
    "role": "Student"
  },
  {
    "_id": 45735,
    "sex": "Male",
    "name": "Lourdes Crawford",
    "role": "Student"
  },
  {
    "_id": 50516,
    "sex": "Female",
    "name": "Shepherd Meadows",
    "role": "Profesor"
  },
  {
    "_id": 10573,
    "sex": "Female",
    "name": "Leanne Morris",
    "role": "Profesor"
  },
  {
    "_id": 59240,
    "sex": "Male",
    "name": "Adrian Carney",
    "role": "Profesor"
  },
  {
    "_id": 33708,
    "sex": "Male",
    "name": "Best Dickson",
    "role": "Student"
  },
  {
    "_id": 90796,
    "sex": "Female",
    "name": "Franco Watson",
    "role": "Student"
  },
  {
    "_id": 44745,
    "sex": "Female",
    "name": "Mandy Leach",
    "role": "Profesor"
  },
  {
    "_id": 52657,
    "sex": "Male",
    "name": "Booth Logan",
    "role": "Student"
  },
  {
    "_id": 30325,
    "sex": "Female",
    "name": "Morton Ford",
    "role": "Profesor"
  },
  {
    "_id": 71324,
    "sex": "Female",
    "name": "Imogene Middleton",
    "role": "Student"
  },
  {
    "_id": 66850,
    "sex": "Female",
    "name": "Aurelia Wall",
    "role": "Profesor"
  },
  {
    "_id": 75548,
    "sex": "Male",
    "name": "Stacey Parsons",
    "role": "Profesor"
  },
  {
    "_id": 97878,
    "sex": "Male",
    "name": "Samantha Booth",
    "role": "Profesor"
  },
  {
    "_id": 63669,
    "sex": "Female",
    "name": "Bradshaw Ingram",
    "role": "Profesor"
  },
  {
    "_id": 56812,
    "sex": "Female",
    "name": "Drake Dominguez",
    "role": "Student"
  },
  {
    "_id": 54136,
    "sex": "Female",
    "name": "Veronica Roy",
    "role": "Profesor"
  },
  {
    "_id": 96950,
    "sex": "Female",
    "name": "Vazquez Lowery",
    "role": "Profesor"
  },
  {
    "_id": 60271,
    "sex": "Male",
    "name": "Knapp Carter",
    "role": "Profesor"
  },
  {
    "_id": 39114,
    "sex": "Male",
    "name": "Marcella Dalton",
    "role": "Student"
  },
  {
    "_id": 56075,
    "sex": "Female",
    "name": "Deleon Morrow",
    "role": "Student"
  },
  {
    "_id": 41472,
    "sex": "Female",
    "name": "Guthrie Schmidt",
    "role": "Profesor"
  },
  {
    "_id": 78586,
    "sex": "Male",
    "name": "Lindsay Conner",
    "role": "Student"
  },
  {
    "_id": 54110,
    "sex": "Male",
    "name": "Maynard Mann",
    "role": "Profesor"
  },
  {
    "_id": 38512,
    "sex": "Male",
    "name": "Allyson Lynch",
    "role": "Profesor"
  },
  {
    "_id": 95595,
    "sex": "Male",
    "name": "Mara Cain",
    "role": "Student"
  },
  {
    "_id": 19934,
    "sex": "Male",
    "name": "Marquita Bullock",
    "role": "Profesor"
  },
  {
    "_id": 88813,
    "sex": "Male",
    "name": "Burke Dennis",
    "role": "Student"
  },
  {
    "_id": 61776,
    "sex": "Male",
    "name": "Munoz Griffin",
    "role": "Profesor"
  },
  {
    "_id": 75243,
    "sex": "Male",
    "name": "Fulton Villarreal",
    "role": "Student"
  },
  {
    "_id": 15508,
    "sex": "Male",
    "name": "Norris Head",
    "role": "Profesor"
  },
  {
    "_id": 86916,
    "sex": "Male",
    "name": "Reid Rojas",
    "role": "Student"
  },
  {
    "_id": 61346,
    "sex": "Female",
    "name": "Consuelo Garza",
    "role": "Profesor"
  },
  {
    "_id": 58883,
    "sex": "Male",
    "name": "Flynn Hill",
    "role": "Student"
  },
  {
    "_id": 53019,
    "sex": "Male",
    "name": "Lilia Houston",
    "role": "Student"
  },
  {
    "_id": 88458,
    "sex": "Male",
    "name": "Oliver Hunter",
    "role": "Profesor"
  },
  {
    "_id": 79615,
    "sex": "Female",
    "name": "Hall Cohen",
    "role": "Profesor"
  },
  {
    "_id": 73098,
    "sex": "Male",
    "name": "Cecile Vincent",
    "role": "Profesor"
  },
  {
    "_id": 67875,
    "sex": "Female",
    "name": "Viola Woodard",
    "role": "Student"
  },
  {
    "_id": 11239,
    "sex": "Female",
    "name": "Leonor Gould",
    "role": "Profesor"
  },
  {
    "_id": 83975,
    "sex": "Female",
    "name": "Concetta Washington",
    "role": "Profesor"
  },
  {
    "_id": 52204,
    "sex": "Male",
    "name": "Ina James",
    "role": "Profesor"
  },
  {
    "_id": 69870,
    "sex": "Female",
    "name": "Louella Mcclure",
    "role": "Profesor"
  },
  {
    "_id": 20007,
    "sex": "Female",
    "name": "Reba Levy",
    "role": "Profesor"
  },
  {
    "_id": 73247,
    "sex": "Female",
    "name": "Foster Justice",
    "role": "Profesor"
  },
  {
    "_id": 81088,
    "sex": "Male",
    "name": "Sweet Higgins",
    "role": "Profesor"
  },
  {
    "_id": 52851,
    "sex": "Male",
    "name": "Hayden Marks",
    "role": "Student"
  },
  {
    "_id": 31647,
    "sex": "Male",
    "name": "Weiss Fisher",
    "role": "Student"
  },
  {
    "_id": 87572,
    "sex": "Male",
    "name": "Constance Saunders",
    "role": "Profesor"
  },
  {
    "_id": 88316,
    "sex": "Male",
    "name": "Chaney Petersen",
    "role": "Profesor"
  },
  {
    "_id": 73647,
    "sex": "Male",
    "name": "Frances Harding",
    "role": "Student"
  },
  {
    "_id": 81118,
    "sex": "Female",
    "name": "Bertha Carlson",
    "role": "Student"
  }
];
const week =[
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
    'Domingo',
]
function getStyles(day, weekDay, theme) {
  return {
    fontWeight:
      weekDay.indexOf(day) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const ADD_PERSONAL = gql`
mutation CratePersonal(
  $id: String!,
  $available: Boolean!,
  $days: [String]!,
  $sex: String!,
  $role: String!,
  $name: String!,
  $children: Boolean!,
  
){
  createPersonal(input:{
    id: $id,
    available: $available,
    days: $days,
    sex: $sex
    role: $role
    name: $name
    children: $children
    
  }){
    personal{
      id
    }
  }
}
`;

function Content(props){
    const { classes } = props;
    const { idPersonal } = useParams();
    const [addPersonal,] = useMutation(ADD_PERSONAL);
    const personal = shiftList.find(row => row._id == idPersonal);
    const theme = useTheme();
    const [weekDay, setWeekDay] = useState([]);
    const [available, setAvailable] = useState(true);
    const [children, setChildren] = useState(false);
    console.log(weekDay);
    const handleChange = (event) => {
        setWeekDay(event.target.value);
    };
    const addPerson = ()=>{
        const id = personal._id
        const sex = personal.sex
        const role = personal.role
        const name = personal.name
        const days = weekDay
        addPersonal({variables: { id, available, days, sex, role, name, children }});
    };


    return (
        <Paper className={classes.paper}>
            <div className={classes.contentWrapper}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Nombre</TableCell>
                                <TableCell align="center">Sexo</TableCell>
                                <TableCell align="center">Rol</TableCell>
                                <TableCell align="center">Hijos</TableCell>
                                <TableCell align="center">Disponible</TableCell>
                                <TableCell align="center">Dias Inasignables</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow color="secundary" key={personal._id}>
                                <TableCell align="center">{personal.name}</TableCell>
                                <TableCell align="center">{personal.sex}</TableCell>
                                <TableCell align="center">{personal.role}</TableCell>
                                <TableCell align="center">
                                     <Switch
                                        checked={children}
                                        onChange={e => setChildren(e.target.checked)}
                                        color="primary"
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                     />
                                </TableCell>
                                <TableCell align="center">
                                     <Switch
                                        checked={available}
                                        onChange={e => setAvailable(e.target.checked)}
                                        color="primary"
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                     />
                                </TableCell>
                                <TableCell align="center">
                                    <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-mutiple-name-label">Dias</InputLabel>
                                        <Select
                                            labelId="demo-mutiple-name-label"
                                            id="demo-mutiple-name"
                                            multiple
                                            value={weekDay}
                                            onChange={handleChange}
                                            input={<Input />}
                                            MenuProps={MenuProps}
                                        >
                                            {week.map((day) => (
                                            <MenuItem key={day} value={day} style={getStyles(day, weekDay, theme)}>
                                                {day}
                                            </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </TableCell>


                            </TableRow>
                        </TableBody>
                    </Table>
                    <Grid  alignItems="flex-end" className={classes.button}>
                    <Button  variant="contained" onClick={addPerson} color="primary">
                        Agragar al Sistema
                    </Button>
                    </Grid>
                </TableContainer>
            </div>
        </Paper>
  );
}
export default withStyles(styles)(Content);
