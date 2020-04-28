import Typography from '@material-ui/core/Typography';
import React from 'react';
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
import { useMutation,useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  expasionPanel: {
    width: '100%',
    padding: theme.spacing(0,0,2),
  },
  linear: {
      padding: theme.spacing(1.5),
  },
  details: {
    alignItems: 'center',
  },
});
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
const PERCENT = gql`
{
  message(state:"pending"){
    edges{
      node{
        percent
      }
    }
  }
}
`;

function Content(props) {
  const { classes } = props;
  var completed = 0;
  var buffer = 10;
  const [addMessage,] = useMutation(ADD_MESSAGE);
  // const [completed, setCompleted] = React.useState(0);
  // const [buffer, setBuffer] = React.useState(10);
  const { loading, data } = useQuery(PERCENT,{pollInterval:2000});
  if(data?.message?.edges.length > 0){
      let array = data.message.edges.map(row => row.node.percent);
      let total = (array.reduce((accumulator, currentValue) => accumulator + currentValue))/data.message.edges.length;
      // let total = data.message.edges.reduce((accumulator, currentValue) => accumulator + currentValue.node.percent);
      completed = total;
      buffer = Math.random() * 10 + completed;
      // setBuffer( diff2);
  }

  // const progress = React.useRef(() => {});
  // React.useEffect(() => {
  //   progress.current = function(){
  //       const { loading, data } = useQuery(PERCENT);
  //       const diff2 = Math.random() * 10;
  //       if(data?.message?.edge.length != 0){
  //           let total = data.message.edge.reduce((t,row)=> t + row.node.percent);
  //           setCompleted(total/data.message.edge.length);
  //           setBuffer(completed + diff2);
  //           }
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

return (
    <div className={classes.expasionPanel}>
      <ExpansionPanel >
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1c-content"
                      id="panel1c-header"
                    >

                    {(loading || data?.message?.edges.length === 0)?
                        <Typography >No hay planificacion en Curso</Typography>
                    :
                      <Grid container spacing={1}>
                      <Grid item xs={4}>
                        <Typography >Planificacion en Proceso</Typography>
                      </Grid>
                      <Grid item xs={8}>
                          <LinearProgress className={classes.linear} variant="buffer" value={completed} valueBuffer={buffer} />
                      </Grid>
                      </Grid>
                    }
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
);
}
export default withStyles(styles)(Content);