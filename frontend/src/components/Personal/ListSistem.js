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
import { gql } from 'apollo-boost';
import {useQuery} from "@apollo/react-hooks";
import { Link as RouterLink } from 'react-router-dom';
import TablePersonal from "./TablePersonal";
import Single from "./SinglePersonal";

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
const week =[
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
    'Domingo',
];

const wordDay = (item) =>{
   let index = [].filter.call(item,e => e != ",");
   return index.map(e => week[parseInt(e,10)+1])
};

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
                            (uciId!== "")?
                                <Single personal={uciId}/>
                                :
                                <TablePersonal data={data}/>
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
