import * as React from "react";
import {
	Box,
	IconButton,
	Typography
} from "@mui/material";
import { styled } from "@mui/system";
import { combine } from "../utils";

interface DayProps {
	filled?: boolean;
	outlined?: boolean;
	highlighted?: boolean;
	disabled?: boolean;
	startOfRange?: boolean;
	endOfRange?: boolean;
	onClick?: () => void;
	onHover?: () => void;
	value: number | string;
}

const StyledBox = styled(Box)(({ theme }) => ({
	'&.highlighted': {
		backgroundColor: theme.palette.action.hover
	},
	'&.leftBorderRadius': {
		borderRadius: "50% 0 0 50%"
	},
	'&.rightBorderRadius': {
		borderRadius: "0 50% 50% 0"
	}
}))
const StyledIconButton = styled(IconButton)(({ theme }) => ({
	height: 36,
	width: 36,
	padding: 0,
	'&.outlined': {
		border: `1px solid ${theme.palette.primary.dark}`
	},
	'&.filled': {
		"&:hover": {
			backgroundColor: theme.palette.primary.dark
		},
		backgroundColor: theme.palette.primary.dark
	}
}))
const StyledTypography = styled(Typography)(({ theme }) => ({
	'&.contrast': {
		color: theme.palette.primary.contrastText
	}
}))

const Day: React.FunctionComponent<DayProps> = props => {
	return (
		<StyledBox className={combine(
				props.startOfRange && 'leftBorderRadius',
				props.endOfRange && 'rightBorderRadius',
				!props.disabled && props.highlighted && 'highlighted'
			)} display='flex'>
			<StyledIconButton
				className={combine(
					!props.disabled && props.outlined && 'outlined',
					!props.disabled && props.filled && 'filled'
				)}
				disabled={props.disabled}
				onClick={props.onClick}
				onMouseOver={props.onHover}>
				<StyledTypography
					color={!props.disabled ? "initial" : "textSecondary"}
					className={combine(
						!props.disabled && props.filled && 'contrast'
					)}
					variant="body2">
					{props.value}
				</StyledTypography>
			</StyledIconButton>
		</StyledBox>
	);
};

export default Day;
