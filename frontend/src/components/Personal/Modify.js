import React, {useState} from 'react';
import {useMutation, useQuery} from '@apollo/react-hooks';
import {useParams, Redirect} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import {withStyles, useTheme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
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
import {gql} from 'apollo-boost';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import {red, blue} from '@material-ui/core/colors';
import * as Moment from 'moment';
import Modal from '@material-ui/core/Modal';

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
    },
    avatarP: {
        backgroundColor: blue[500],
    },
    avatars: {
        backgroundColor: red[500],
    },
    container: {
        margin: theme.spacing(1),
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
const week = [
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
    'Domingo',
];

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
      available
      days
      children
    }
  }
}
`;


const wordDay = (item) => {
    let index = [].filter.call(item, e => e !== ",");
    return index.map(e => week[parseInt(e, 10) - 1]);
};

function Content(props) {
    const {classes} = props;
    const {idPersonal, action} = useParams();
    const USER_LIST = gql`
    query Personal(
        $uciId: String!
    ) {
    ${(action === "add") ?
        `directoryPersonal(
          idUci:$uciId
            ){
              edges{
                node{
                  id
                  sex
                  role
                  name
                }
              }
            }`
        :
        `personal(
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
            days
            person{
              shiftSet{
                edges{
                  node{
                    date
                    number
                    person{
                      edges{
                        node{
                          personal{
                            id
                            name
                            role
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }`
        }
    }
`;
    const [addPersonal, {data: infoMutate}] = useMutation(ADD_PERSONAL);
    const [weekDay, setWeekDay] = useState([]);
    const [render, setRender] = useState({day: false, modal: false});
    const [openModal, setOpenModal] = useState(false);

    let personal = false;
    const {loading, data} = useQuery(USER_LIST, {
        variables: {uciId: idPersonal},
    });
    if (data) {
        if (action === "add") {
            personal = data.directoryPersonal.edges[0].node;
        } else {
            personal = (data.personal.edges.find(row => row.node.id === idPersonal)).node;
            if (!render.day) {
                setRender({...render, day: true});
                setWeekDay(wordDay(personal.days));
            }
        }
    }
    if (infoMutate?.createPersonal && !render.modal) {
        setRender({...render, modal: true});
        setOpenModal(true);
    }
    const theme = useTheme();
    const [available, setAvailable] = useState(true);
    const [children, setChildren] = useState(false);
    const handleChange = (event) => {
        setWeekDay(event.target.value);
    };
    const modifyPerson = () => {
        const id = personal.id
        const sex = personal.sex
        const role = personal.role
        const name = personal.name
        const days = weekDay
        addPersonal({variables: {id, available, days, sex, role, name, children}});
    };

    return (
        <Paper className={classes.paper}>
            {(render.modal && !openModal) ?
                <Redirect to={(action === "add") ? "/directory" : "/personal-system"}/>
                :
                (loading) ?
                    <Typography color="textSecondary" align="center">
                        Loading...
                    </Typography>
                    :
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

                                    <TableRow color="secundary" key={personal.id}>
                                        <TableCell align="center">{personal.name}</TableCell>
                                        <TableCell align="center">{personal.sex}</TableCell>
                                        <TableCell align="center">{personal.role}</TableCell>
                                        <TableCell align="center">
                                            <Switch
                                                checked={children}
                                                onChange={e => setChildren(e.target.checked)}
                                                color="primary"
                                                inputProps={{'aria-label': 'primary checkbox'}}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <Switch
                                                checked={available}
                                                onChange={e => setAvailable(e.target.checked)}
                                                color="primary"
                                                inputProps={{'aria-label': 'primary checkbox'}}
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
                                                    input={<Input/>}
                                                    MenuProps={MenuProps}
                                                >
                                                    {week.map((day) => (
                                                        <MenuItem key={day} value={day}
                                                                  style={getStyles(day, weekDay, theme)}>
                                                            {day}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <Grid container className={classes.button}>
                                <Grid item xs>
                                </Grid>
                                <Grid item>
                                    <Button align="right" variant="contained" onClick={modifyPerson} color="primary">
                                        Agragar al Sistema
                                    </Button>
                                </Grid>
                            </Grid>
                        </TableContainer>
                        {(action !== "add") ?
                            <Grid container spacing={3} alignItems="center" className={classes.container}>
                                {personal.person.shiftSet.edges.map(row => (
                                    <Grid item key={row.node.id}>
                                        <Card>
                                            <CardContent>
                                                <Typography align="center">
                                                    {Moment(row.node.date).format('LLL')}
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
                                ))}
                            </Grid>
                            :
                            <div>
                            </div>
                        }
                    </div>
            }
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <Paper className={classes.paperModal}>
                    <Typography>
                        {`Se ha ${(action === "add") ? 'añadido' : 'modificado'} la Persona Correctamente`}
                    </Typography>
                </Paper>
            </Modal>
        </Paper>
    );
}

export default withStyles(styles)(Content);
