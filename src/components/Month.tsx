import * as React from "react";
import {
	Box,
	Paper,
	Typography,
	Stack
} from "@mui/material";
import { getDate, isSameMonth, isToday, format, isWithinInterval } from "date-fns";
import {
	chunks,
	getDaysInMonth,
	isStartOfRange,
	isEndOfRange,
	inDateRange,
	isRangeSameDay
} from "../utils";
import Header from "./Header";
import Day from "./Day";
import { NavigationAction, DateRange } from "../types";

const WEEK_DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const styled = { width: 290 }

interface MonthProps {
	value: Date;
	weekDays?: string[];
	months?: string[];
	marker: symbol;
	dateRange: DateRange;
	minDate: Date;
	maxDate: Date;
	navState: [boolean, boolean];
	setValue: (date: Date) => void;
	helpers: {
		inHoverRange: (day: Date) => boolean;
	};
	handlers: {
		onDayClick: (day: Date) => void;
		onDayHover: (day: Date) => void;
		onMonthNavigate: (marker: symbol, action: NavigationAction) => void;
	};
}

const Month: React.FunctionComponent<MonthProps> = props => {
	const {
		weekDays = WEEK_DAYS,
		months,
		// classes,
		helpers,
		handlers,
		value: date,
		dateRange,
		marker,
		setValue: setDate,
		minDate,
		maxDate
	} = props;

	const [back, forward] = props.navState;
	return (
		<Paper square elevation={0} sx={styled}>
			<Box>
				<Header
					date={date}
					setDate={setDate}
					nextDisabled={!forward}
					prevDisabled={!back}
					months={months}
					onClickPrevious={() =>
						handlers.onMonthNavigate(marker, NavigationAction.Previous)
					}
					onClickNext={() => handlers.onMonthNavigate(marker, NavigationAction.Next)}
				/>

				<Stack direction="row" justifyContent="space-between" mt={2} px={6}>
					{weekDays.map(day => (
						<Typography color="textSecondary" key={day} variant="caption">
							{day}
						</Typography>
					))}
				</Stack>

				<Stack direction="column" justifyContent="space-between" px={3} mt={3}>
					{chunks(getDaysInMonth(date), 7).map((week, idx) => (
						<Stack key={idx} direction="row" justifyContent="center">
							{week.map(day => {
								const isStart = isStartOfRange(dateRange, day);
								const isEnd = isEndOfRange(dateRange, day);
								const isRangeOneDay = isRangeSameDay(dateRange);
								const highlighted =
									inDateRange(dateRange, day) || helpers.inHoverRange(day);

								return (
									<Day
										key={format(day, "mm-dd-yyyy")}
										filled={isStart || isEnd}
										outlined={isToday(day)}
										highlighted={highlighted && !isRangeOneDay}
										disabled={
											!isSameMonth(date, day) ||
											!isWithinInterval(day, {
												start: minDate,
												end: maxDate
											})
										}
										startOfRange={isStart && !isRangeOneDay}
										endOfRange={isEnd && !isRangeOneDay}
										onClick={() => handlers.onDayClick(day)}
										onHover={() => handlers.onDayHover(day)}
										value={getDate(day)}
									/>
								);
							})}
						</Stack>
					))}
				</Stack>
			</Box>
		</Paper>
	);
};

export default Month;
