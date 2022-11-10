import React from "react";
import {
	Paper,
	Grid,
	Divider,
	Stack,
} from "@mui/material";
import { format, differenceInCalendarMonths } from "date-fns";
import ArrowRightAlt from "@material-ui/icons/ArrowRightAlt";
import Month from "./Month";
import DefinedRanges from "./DefinedRanges";
import { DateRange, DefinedRange, Setter, NavigationAction } from "../types";
import { MARKERS } from "..";

interface MenuProps {
	dateRange: DateRange;
	ranges: DefinedRange[];
	minDate: Date;
	maxDate: Date;
	firstMonth: Date;
	secondMonth: Date;
	weekDays?: string[];
	months?: string[];
	setFirstMonth: Setter<Date>;
	setSecondMonth: Setter<Date>;
	setDateRange: Setter<DateRange>;
	helpers: {
		inHoverRange: (day: Date) => boolean;
	};
	handlers: {
		onDayClick: (day: Date) => void;
		onDayHover: (day: Date) => void;
		onMonthNavigate: (marker: symbol, action: NavigationAction) => void;
	};
}

const Menu: React.FunctionComponent<MenuProps> = props => {
	const {
		weekDays,
		months,
		ranges,
		dateRange,
		minDate,
		maxDate,
		firstMonth,
		setFirstMonth,
		secondMonth,
		setSecondMonth,
		setDateRange,
		helpers,
		handlers
	} = props;
	const { startDate, endDate } = dateRange;
	const canNavigateCloser = differenceInCalendarMonths(secondMonth, firstMonth) >= 2;
	const commonProps = { dateRange, minDate, maxDate, helpers, handlers, weekDays, months };
	return (
		<Paper elevation={5} square>
			<Stack direction="row" flexWrap="nowrap" py={2}>
				<Grid>
					<Stack direction="row" 
						justifyContent="center"
						flexWrap="nowrap"
						divider={<Divider orientation="vertical" flexItem />}>
						<Month
							{...commonProps}
							value={firstMonth}
							setValue={setFirstMonth}
							navState={[true, canNavigateCloser]}
							marker={MARKERS.FIRST_MONTH}
							/>
						<Month
							{...commonProps}
							value={secondMonth}
							setValue={setSecondMonth}
							navState={[canNavigateCloser, true]}
							marker={MARKERS.SECOND_MONTH}
							/>
					</Stack>
				</Grid>
				{/* <Grid>
					<DefinedRanges
						selectedRange={dateRange}
						ranges={ranges}
						setRange={setDateRange}
					/>
				</Grid> */}
			</Stack>
		</Paper>
	);
};

export default Menu;
