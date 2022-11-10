import React from "react";
import {
	Box,
	Stack,
	IconButton,
	NativeSelect,
} from "@mui/material";
import { styled } from "@mui/system";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import { setMonth, getMonth, setYear, getYear } from "date-fns";

interface HeaderProps {
	date: Date;
	months?: string[];
	setDate: (date: Date) => void;
	nextDisabled: boolean;
	prevDisabled: boolean;
	onClickNext: () => void;
	onClickPrevious: () => void;
}

const StyledIconButton = styled(IconButton)(({ theme }) => ({
	padding: theme.spacing(2),
	'&:hover': {
		background: 'none'
	}
}))

const StyledNativeSelect = styled(NativeSelect)(({ theme }) => ({
	color: "#f1f", 
	'& .MuiInputBase-input': {
		padding: `${theme.spacing(2)} ${theme.spacing(6)} ${theme.spacing(2)} ${theme.spacing(2)} !important`,
	}
}))

const MONTHS = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"June",
	"July",
	"Aug",
	"Sept",
	"Oct",
	"Nov",
	"Dec"
];

const generateYears = (relativeTo: Date, count: number) => {
	const half = Math.floor(count / 2);
	return Array(count)
		.fill(0)
		.map((y, i) => relativeTo.getFullYear() - half + i); // TODO: make part of the state
};

const Header: React.FunctionComponent<HeaderProps> = ({
	date,
	setDate,
	nextDisabled,
	prevDisabled,
	months = MONTHS,
	onClickNext,
	onClickPrevious
}) => {
	const handleMonthChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		setDate(setMonth(date, parseInt(event.target.value as string)));
	};

	const handleYearChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		setDate(setYear(date, parseInt(event.target.value as string)));
	};

	return (
		<Stack direction='row' justifyContent="space-between" alignItems="center">
			<Box p={1}>
				<StyledIconButton
					disabled={prevDisabled}
					onClick={onClickPrevious}>
					<ChevronLeft color={prevDisabled ? "disabled" : "action"} />
				</StyledIconButton>
			</Box>
			<Box>
				<StyledNativeSelect
					value={getMonth(date)}
					onChange={handleMonthChange}>
					{months.map((month, idx) => (
						<option key={month} value={idx}>
							{month}
						</option>
					))}
				</StyledNativeSelect>
			</Box>
			<Box>
				<StyledNativeSelect
					value={getYear(date)}
					onChange={handleYearChange}>
					{generateYears(date, 30).map(year => (
						<option key={year} value={year}>
							{year}
						</option>
					))}
				</StyledNativeSelect>

				{/* <Typography>{format(date, "MMMM YYYY")}</Typography> */}
			</Box>
			<Box p={1}>
				<StyledIconButton disabled={nextDisabled} onClick={onClickNext}>
					<ChevronRight color={nextDisabled ? "disabled" : "action"} />
				</StyledIconButton>
			</Box>
		</Stack>
	);
};

export default Header;
