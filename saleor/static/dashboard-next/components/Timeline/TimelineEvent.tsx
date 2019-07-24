import React from "react";

import { DateTime } from "../Date";

import SduiTimelineEvent, {
  TimelineEventProps as SduiTimelineEventProps
} from "@ui/Timeline/TimelineEvent";

export type TimelineEventProps = Omit<SduiTimelineEventProps, "date"> & {
  date: string;
};

export const TimelineEvent: React.FC<TimelineEventProps> = ({
  date,
  ...props
}) => {
  const Date = <DateTime date={date} />;
  return <SduiTimelineEvent date={Date} {...props} />;
};

TimelineEvent.displayName = "TimelineEvent";
export default TimelineEvent;
