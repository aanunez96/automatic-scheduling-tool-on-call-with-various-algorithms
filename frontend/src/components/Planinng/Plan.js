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
  MonthView,
  DayView,
  TodayButton,
  AppointmentTooltip,
  Resources,
} from '@devexpress/dx-react-scheduler-material-ui';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { gql } from 'apollo-boost';
import {useQuery} from "@apollo/react-hooks";
import * as Moment from 'moment';
import {createSvgIcon} from "@material-ui/core/utils";
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

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
const timeTableCell = props => (
  <MonthView.TimeTableCell
    onDoubleClick={console.log("doble click")}
  />
);


function Content(props){
    const { classes } = props;
    const [currentViewName, setCurrentViewName] = React.useState("Day");
    const [currentDate, setCurrentDate] = React.useState();
    let appointments;
    let resources;
    const ofTime = (currentViewName === "Day")? 'day' : 'week';
    const gte = Moment(currentDate).startOf(ofTime);
    const lte = Moment(currentDate).endOf(ofTime);

    const { loading, data } = useQuery(SHIFTS_LIST,{
        variables:{
            date_Gte: gte,
            date_Lte: lte,
        },
    });

    if (!loading && data?.shift){
        let instance = new Array()
        data.shift.edges.forEach(row => {
           row.node.person.edges.forEach(item => {
               instance.push({
                    id: item.node.id,
                    text: <Link component={RouterLink} color="inherit" to ={`/single/${item.node.personal.id}`}>{item.node.personal.name}</Link>,
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
            personal: row.node.person.edges.map(item => item.node.id),
        }));
    }

    return (
      <Paper>
        {(loading)?
            <Typography color="textSecondary" align="center">
                            Loading...
                        </Typography>
        :
        <Scheduler
          data={appointments}
        >
          <ViewState
            onCurrentDateChange={setCurrentDate}
            currentDate={currentDate}
            currentViewName={currentViewName}
            onCurrentViewNameChange={ data => {
                setCurrentViewName(data);
                console.log(data);
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
        }
      </Paper>
    );
}
Content.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default (Content);