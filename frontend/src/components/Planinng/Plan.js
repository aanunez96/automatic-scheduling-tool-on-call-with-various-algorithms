import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  DateNavigator,
  Appointments,
  Toolbar,
  ViewSwitcher,
  DayView,
  TodayButton,
  AppointmentTooltip,
  Resources,
} from '@devexpress/dx-react-scheduler-material-ui';
import { gql } from 'apollo-boost';
import {useQuery} from "@apollo/react-hooks";
import * as Moment from 'moment';
import { Link as RouterLink } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import Link from '@material-ui/core/Link';
import {REFETCH_PLAN} from '../../reactRedux';
import {useSelector,useDispatch} from 'react-redux';

const SHIFTS_LIST = gql`
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
              id
              }
            }
          }
        }
      }
    }
  }
}
`;

function Content(props){
    const dispatch = useDispatch();
    const [currentViewName, setCurrentViewName] = React.useState("Day");
    const [currentDate, setCurrentDate] = React.useState();
    let appointments;
    let resources;
    const ofTime = (currentViewName === "Day")? 'day' : 'week';
    const gte = Moment(currentDate).startOf(ofTime);
    const lte = Moment(currentDate).endOf(ofTime);

    const { loading, data , refetch } = useQuery(SHIFTS_LIST,{
        variables:{
            date_Gte: gte,
            date_Lte: lte,
        },fetchPolicy: "cache-and-network"
    });
    const selectFunction = (state) => {
        if(state.plan){
            refetch();
            dispatch({type: REFETCH_PLAN});
        }
    };
    useSelector(selectFunction);
    if (!loading && data?.shift){
        let instance = [];
        data.shift.edges.forEach(row => {
           row.node.person.edges.forEach(item => {
               instance.push({
                    id: item.node.personal.id,
                    text: <Link component={RouterLink} color="inherit" to ={`/modify/update/${item.node.personal.id}`}>{item.node.personal.name}</Link>,
                })});
        });
        resources = [
            {
                fieldName: 'personal',
                title: 'Personal',
                allowMultiple: true,
                instances: instance,
            }];
        appointments = data.shift.edges.map(row => ({
            id: row.node.id,
            title: "turno " + row.node.number,
            startDate: Moment(row.node.date),
            endDate: Moment(row.node.date).add(2,'h'),
            personal: row.node.person.edges.map(item => item.node.personal.id),
        }));
    }

    return (
      <Paper>
        {(loading)?
            <LinearProgress />
        :
        ""
    }
        <Scheduler
          data={appointments}
        >
          <ViewState
            onCurrentDateChange={setCurrentDate}
            currentDate={currentDate}
            currentViewName={currentViewName}
            onCurrentViewNameChange={ data => {
                setCurrentViewName(data);
            }}
          />

          <WeekView
            startDayHour={7}
            endDayHour={21}
            cellDuration={60}
          />
          <DayView
            startDayHour={7}
            endDayHour={21}
            cellDuration={60}
          />
          <Appointments />
          <AppointmentTooltip
            showCloseButton
          />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <ViewSwitcher />
          <Resources
              data={resources}
              mainResourceName="personal"
           />
        </Scheduler>
      </Paper>
    );
}
export default Content;