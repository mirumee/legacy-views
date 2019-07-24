import * as colors from "@material-ui/core/colors";
import CRC from "crc-32";
import React from "react";

import { DateTime } from "../Date";

import SduiTimelineNote, {
  TimelineNoteProps as SduiTimelineNoteProps
} from "@ui/Timeline/TimelineNote";

const palette = [
  colors.amber,
  colors.blue,
  colors.cyan,
  colors.deepOrange,
  colors.deepPurple,
  colors.green,
  colors.indigo,
  colors.lightBlue,
  colors.lightGreen,
  colors.lime,
  colors.orange,
  colors.pink,
  colors.purple,
  colors.red,
  colors.teal,
  colors.yellow
].map(color => color[500]);

export type TimelineNoteProps = Omit<
  SduiTimelineNoteProps,
  "avatarColor" | "avatarSrc" | "date"
> & {
  date: string;
};

export const TimelineNote: React.FC<TimelineNoteProps> = ({
  date,
  email,
  ...props
}) => {
  const Date = <DateTime date={date} />;

  return (
    <SduiTimelineNote
      avatarColor={palette[CRC.str(email) % palette.length]}
      date={Date}
      email={email}
      {...props}
    />
  );
};
TimelineNote.displayName = "TimelineNote";
export default TimelineNote;
