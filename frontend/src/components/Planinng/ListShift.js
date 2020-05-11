import React, {useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { gql } from 'apollo-boost';
import {useQuery,useMutation} from "@apollo/react-hooks";
import * as Moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import {NavigateBefore ,Search,NavigateNext,Autorenew} from '@material-ui/icons';
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TextField from '@material-ui/core/TextField';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';





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
    button: {
        margin: theme.spacing(1),
    },
    contentWrapper: {
        margin: '40px 16px',
    },
});
const UPDATE_SHIFT = gql`
mutation UpdateShift(
  $person1:ID!
  $person2:ID!
  $shift1:ID!
  $shift2:ID! 
){
updateShift(input:{
  person1:$person1
  person2:$person2
  shift1:$shift1
  shift2:$shift2
}){
  shift{
    id
  }
}  
}
`;

const SHIFT_LIST = gql`
query Shift(
  $date_Gte: DateTime!
  $date_Lte: DateTime!
) {
  shift(
    date_Gte: $date_Gte,
    date_Lte: $date_Lte
  ){
    edges{
      node{
        id
        date
        number
        person{
          edges{
            node{
              id
              personal{
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
`;

function Content(props) {
    const { classes } = props;
    const [currentDate, setCurrentDate] = useState(Moment().format());
    const date_Gte = Moment(currentDate).startOf('month');
    const date_Lte = Moment(currentDate).endOf('month');
    const { loading, data,refetch } = useQuery(SHIFT_LIST, {
        variables: { date_Gte, date_Lte},
    });
    const [changePersonalMigration,{data:info}] = useMutation(UPDATE_SHIFT);
    if (info){
        refetch();
    }
    const [changePersonal ,setChangePersonal] = useState({
        personal: false,
        shift:false,
    });
    const commitChange = (shift,personal) => {
        if(changePersonal.personal){
            changePersonalMigration({variables: {
                person1:changePersonal.personal,
                person2:personal,
                shift1:changePersonal.shift,
                shift2:shift,
            }});
        }
        setChangePersonal((changePersonal.personal)?{personal:false,shift:false}:{personal:personal,shift:shift});

    };

    const [uciId, setUciId] = useState("");
    const [textToFind, textToFindChange] = useState("");

    return (
        <Paper className={classes.paper}>
            <AppBar className={classes.searchBar} position="static" color="transparent" elevation={0}>
                <Toolbar>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Button
                                variant="outlined"
                                className={classes.button}
                                onClick={() => {setCurrentDate(Moment().format())}}
                            >
                                Mes Actual
                            </Button>
                            <IconButton onClick={() => {setCurrentDate(Moment(currentDate).subtract(1,"month").format())}} >
                                <NavigateBefore/>
                            </IconButton>
                            <IconButton onClick={() => {setCurrentDate(Moment(currentDate).add(1,"month").format())}}>
                                <NavigateNext/>
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <Typography align="center">
                                {Moment(Moment(currentDate).month()+1,"MM").format('MMMM') }, {Moment(currentDate).year()}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Search className={classes.block} color="inherit" />
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
                        (data?.shift?.edges)?
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Nombre</TableCell>
                                            <TableCell align="center">Fecha</TableCell>
                                            <TableCell align="center">Hora</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.shift.edges.map(row => (
                                            <TableRow key={row.node.id}>
                                                <TableCell align="center">
                                                    {row.node.person.edges.map(item => (
                                                        <div key={item.node.id}>
                                                            <Link component={RouterLink} color="inherit" to ={`/modify/${item.node.id}`}>{item.node.personal.name}</Link>
                                                            <IconButton color ={(changePersonal.personal)?(item.node.id === changePersonal.personal && row.node.id === changePersonal.shift)?"secondary":"primary" : "default"}  onClick={()=>commitChange(row.node.id,item.node.id)} >
                                                                <Autorenew/>
                                                            </IconButton>
                                                        </div>
                                                    ))}
                                                </TableCell>
                                                <TableCell align="center">{Moment(row.node.date).format("DD-MM-YYYY")}</TableCell>
                                                <TableCell align="center">{`${Moment(row.node.date).format("LT")}`}</TableCell>
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
