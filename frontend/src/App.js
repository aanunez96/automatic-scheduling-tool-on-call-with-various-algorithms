import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LinearProgress from '@material-ui/core/LinearProgress';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import Navigator from './components/themes/Navigator';
import Header from './components/themes/Header';

import UserList from './components/User/List';

import Prueba from './components/Prueba/Plan';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

let theme = createMuiTheme({
  palette: {
    primary: {
      light: '#63ccff',
      main: '#009be5',
      dark: '#006db3',
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: '#18202c',
      },
    },
    MuiButton: {
      label: {
        textTransform: 'none',
      },
      contained: {
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none',
        },
      },
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing(1),
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.common.white,
      },
    },
    MuiTab: {
      root: {
        textTransform: 'none',
        margin: '0 16px',
        minWidth: 0,
        padding: 0,
        [theme.breakpoints.up('md')]: {
          padding: 0,
          minWidth: 0,
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing(1),
      },
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: '#404854',
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    MuiListItemIcon: {
      root: {
        color: 'inherit',
        marginRight: 0,
        '& svg': {
          fontSize: 20,
        },
      },
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32,
      },
    },
  },
};

const drawerWidth = 256;

const styles = {
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  app: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flex: 1,
    padding: theme.spacing(3, 4),
    background: '#eaeff1',
  },
  expasionPanel: {
    width: '100%',
    padding: theme.spacing(0,0,2),

  },
  linear: {
      padding: theme.spacing(1.5),
  },
  footer: {
    padding: theme.spacing(2),
    background: '#eaeff1',
  },
  details: {
    alignItems: 'center',
  },
};
const ADD_MESSAGE = gql`
mutation CreateMessage(
  $algorithmStudent: [String]!,
  $algorithmProfesor: [String]!,
  $guard: [String]!,
  $dateStart: [Date]!
){
  createMessage(input:{
    algorithmStudent: $algorithmStudent,
    algorithmProfesor: $algorithmProfesor,
    typeGuard: $guard,
    dateStart: $dateStart
  }){
    message{
      id
    }
  }
}
`;
function Paperbase(props) {
  const [addMessage,] = useMutation(ADD_MESSAGE);
  const [completed, setCompleted] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);
  // const progress = React.useRef(() => {});
  // React.useEffect(() => {
  //   progress.current = () => {
  //     if (completed > 100) {
  //       setCompleted(0);
  //       setBuffer(10);
  //     } else {
  //       const diff = Math.random() * 10;
  //       const diff2 = Math.random() * 10;
  //       setCompleted(completed + diff);
  //       setBuffer(completed + diff + diff2);
  //     }
  //   };
  // });
  //
  // React.useEffect(() => {
  //   function tick() {
  //     progress.current();
  //   }
  //   const timer = setInterval(tick, 500);
  //
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);
  const generatePlanning = ()=>{
      const algorithmStudent = [];
      const algorithmProfesor = [];
      const guard = [];
      const dateStart = new Array(2);
      if(dateProfesor)dateStart[1]=dateProfesor;
      if(dateStudent)dateStart[0]=dateStudent;
      for (let key in checkboxState){
          if (checkboxState[key]){
              (key === 'P' ||key === 'S')?guard.push(key) : (key === 'staticStudent')? algorithmStudent.push(key) : algorithmProfesor.push(key);
          }
      }
      addMessage({variables: { algorithmStudent,algorithmProfesor,guard,dateStart}});
    }
  const { classes } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [checkboxState, setCheckboxState] = React.useState({
    grasp: true,
    staticProfesor: true,
    staticStudent: true,
    P: true,
    S: true,
  });
  const [dateStudent,setDateStudent] = React.useState()
  const [dateProfesor,setDateProfesor] = React.useState()
  const handleChangeCheckbox = (event) => {
    setCheckboxState({...checkboxState, [event.target.name]: event.target.checked });
    if(event.target.name === 'P'){
        (event.target.checked === false)? setCheckboxState(checkboxState =>({ ...checkboxState, grasp: false ,staticProfesor: false })):
        setCheckboxState(checkboxState =>({ ...checkboxState, grasp: true ,staticProfesor: true }));
    }
    if(event.target.name === 'S'){
        (event.target.checked === false)? setCheckboxState(checkboxState =>({ ...checkboxState, staticStudent: false})):
        setCheckboxState(checkboxState =>({ ...checkboxState, staticStudent: true}));
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
          <div className={classes.root}>
            <CssBaseline />
            <nav className={classes.drawer}>
              <Hidden smUp implementation="js">
                <Navigator
                  PaperProps={{ style: { width: drawerWidth } }}
                  variant="temporary"
                  open={mobileOpen}
                  onClose={handleDrawerToggle}
                />
              </Hidden>
              <Hidden xsDown implementation="css">
                <Navigator PaperProps={{ style: { width: drawerWidth } }} />
              </Hidden>
            </nav>
            <div className={classes.app}>
              <Header onDrawerToggle={handleDrawerToggle} />
              <main className={classes.main}>
                <div className={classes.expasionPanel}>
                  <ExpansionPanel >
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1c-content"
                      id="panel1c-header"
                    >
                    <Grid container spacing={1}>
                      <Grid item xs={4}>
                        <Typography >Planificacion en Proceso</Typography>
                      </Grid>
                      <Grid item xs={8}>
                          <LinearProgress className={classes.linear} variant="buffer" value={completed} valueBuffer={buffer} />
                      </Grid>
                    </Grid>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.details}>
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <div >
                                  <Typography >Tipos de Guardias</Typography>
                                </div>
                                <div>
                                    <Checkbox
                                    checked={checkboxState.P}
                                    onChange={handleChangeCheckbox}
                                    name="P"
                                    color="primary"
                                  />
                                        Profesores
                                </div>
                                <div>
                                    <Checkbox
                                    checked={checkboxState.S}
                                    onChange={handleChangeCheckbox}
                                    name="S"
                                  />
                                        Estudiantes
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <div className={classes.column}>
                                  <Typography >Algoritmos</Typography>
                                </div>
                                <div >
                                    <Checkbox
                                    checked={checkboxState.grasp}
                                    onChange={handleChangeCheckbox}
                                    name="grasp"
                                    color="primary"
                                    disabled={checkboxState.P? false: true }
                                  />
                                     Metaheuristico Grasp
                                </div>
                                <div>
                                    <Checkbox
                                    checked={checkboxState.staticProfesor}
                                    onChange={handleChangeCheckbox}
                                    name="staticProfesor"
                                    color="primary"
                                    disabled={checkboxState.P? false: true }
                                  />
                                        Estatico Profesores
                                </div>
                                <div>
                                    <Checkbox
                                    checked={checkboxState.staticStudent}
                                    onChange={handleChangeCheckbox}
                                    name="staticStudent"
                                    disabled={checkboxState.S? false: true }
                                  />
                                        Estatico Estudiantes
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                              <div >
                                  <Typography >Establecer Fecha de Inicio</Typography>
                              </div>
                              <TextField
                                id="date"
                                label="Pofesores"
                                type="date"
                                value={dateProfesor}
                                onChange={setDateProfesor}
                                disabled={checkboxState.P? false: true }
                                className={classes.textField}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              />
                              <TextField
                                id="date"
                                label="Estudiantes"
                                type="date"
                                value={dateStudent}
                                disabled={checkboxState.S? false: true }
                                onChange={setDateStudent}
                                className={classes.textField}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              />
                            </Grid>
                        </Grid>
                    </ExpansionPanelDetails>
                    <ExpansionPanelActions>
                      <Button variant="contained" onClick={generatePlanning} color="primary">
                        Generar
                      </Button>
                    </ExpansionPanelActions>
                  </ExpansionPanel>
                </div>
                <Switch>
                  <Route exact path="/">
                    <Prueba />
                  </Route>
                </Switch>
              </main>
              <footer className={classes.footer}>
                <Copyright />
              </footer>
            </div>
          </div>
      </ThemeProvider>
    </Router>
  );
}

Paperbase.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Paperbase);
