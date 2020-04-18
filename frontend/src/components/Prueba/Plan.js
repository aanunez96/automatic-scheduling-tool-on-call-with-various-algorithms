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

const SHIFTS_LIST = gql`
 {
  shift(iteration:246){
    edges{
      node{
        id
        date
        number
        person{
          edges{
            node{
              id
            }
          }
        }
        }
      }
    }
  }
`;
const PROFESOR_LIST = gql`
{
  personal(role_Iexact:"p",available:true){
    edges{
      node{
        id
        role
        person{
          id
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
    const [currentDate, setCurrentDate] = React.useState(new Date(2020, 3, 29));
    const [currentMonth, setCurrentMonth] = React.useState(currentDate.getMonth()+1)
    const [currentYear, setCurrentYear] = React.useState(currentDate.getFullYear())
    const appointments = new Array(0)
    const resources = [
        {
        fieldName: 'personal',
        title: 'Personal',
        allowMultiple: true,
        instances:  [
            { id: "1", text: 'Andrew Glover' },
            { id: "2", text: 'Arnie Schwartz' },
            { id: "3", text: 'John Heart' },
            { id: "4", text: 'Taylor Riley' },
            { id: "5", text: 'Brad Farkus' },
            { id: "6", text: 'Firulais' },
            { id: "7", text: 'la cosi' },
            { id: "8", text: 'este soy yo' },
            { id: "9", text: 'Sheilita' },
          ],
        }
    ]
    const { loading, data } = useQuery(SHIFTS_LIST,);
    const resourse = new Array(1)
    if (data){
        data.shift.edges.map(row => (
            row.node.person.edges.map(row1 =>(
                resourse.length = 0,
                resourse.push(row1.node.id)
            )),
            appointments.push(
                {
                    id: row.node.id,
                    title: "turno "+row.node.number,
                    startDate: new Date(row.node.date),
                    personal: resourse
                }
                )
        ));
    }

//     const appointments = [
//   {
//     id: 0,
//     title: 'Watercolor Landscape',
//     startDate: new Date(2018, 6, 23, 9, 30),
//     endDate: new Date(2018, 6, 23, 11, 30),
//     ownerId: 1,
//   }, {
//     id: 1,
//     title: 'Monthly Planning',
//     startDate: new Date(2018, 5, 28, 9, 30),
//     endDate: new Date(2018, 5, 28, 11, 30),
//     ownerId: 1,
//   }, {
//     id: 2,
//     title: 'Recruiting students',
//     startDate: new Date(2018, 6, 9, 12, 0),
//     endDate: new Date(2018, 6, 9, 13, 0),
//     ownerId: 2,
//   }, {
//     id: 3,
//     title: 'Oil Painting',
//     startDate: new Date(2018, 6, 18, 14, 30),
//     endDate: new Date(2018, 6, 18, 15, 30),
//     ownerId: 2,
//   }, {
//     id: 4,
//     title: 'Open Day',
//     startDate: new Date(2018, 6, 20, 12, 0),
//     endDate: new Date(2018, 6, 20, 13, 35),
//     ownerId: 6,
//   }, {
//     id: 5,
//     title: 'Watercolor Landscape',
//     startDate: new Date(2018, 6, 6, 13, 0),
//     endDate: new Date(2018, 6, 6, 14, 0),
//     rRule: 'FREQ=WEEKLY;BYDAY=FR;UNTIL=20180816',
//     exDate: '20180713T100000Z,20180727T100000Z',
//     ownerId: 2,
//   }, {
//     id: 6,
//     title: 'Meeting of Instructors',
//     startDate: new Date(2018, 5, 28, 12, 0),
//     endDate: new Date(2018, 5, 28, 12, 30),
//     rRule: 'FREQ=WEEKLY;BYDAY=TH;UNTIL=20180727',
//     exDate: '20180705T090000Z,20180719T090000Z',
//     ownerId: 5,
//   }, {
//     id: 7,
//     title: 'Oil Painting for Beginners',
//     startDate: new Date(2018, 6, 3, 11, 0),
//     endDate: new Date(2018, 6, 3, 12, 0),
//     rRule: 'FREQ=WEEKLY;BYDAY=TU;UNTIL=20180801',
//     exDate: '20180710T0800020Z,20180724T080000Z',
//     ownerId: 3,
//   }, {
//     id: 8,
//     title: 'Watercolor Workshop',
//     startDate: new Date(2018, 6, 9, 11, 0),
//     endDate: new Date(2018, 6, 9, 12, 0),
//     ownerId: 3,
//   },
// ];
    console.log(appointments)

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
            onCurrentDateChange={date => {
                setCurrentDate(date);
                setCurrentMonth(date.getMonth()+1);
                setCurrentYear(date.getFullYear());
            }}
            currentDate={currentDate}
            currentViewName={currentViewName}
            onCurrentViewNameChange={setCurrentViewName}
          />

          <WeekView
            startDayHour={7}
            endDayHour={21}
            cellDuration={60}
          />

          <MonthView
              TimeTableCell={timeTableCell}
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
