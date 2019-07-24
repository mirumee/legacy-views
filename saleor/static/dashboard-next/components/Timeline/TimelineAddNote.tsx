import React from "react";

import i18n from "@saleor/i18n";

import SduiTimelineAddNote, {
  TimelineAddNoteLabels,
  TimelineAddNoteProps as SduiTimelineAddNoteProps
} from "@ui/Timeline/TimelineAddNote";

export type TimelineAddNoteProps = Omit<
  SduiTimelineAddNoteProps,
  "avatarColor" | "avatarSrc" | "labels"
>;

const TimelineAddNote: React.FC<TimelineAddNoteProps> = props => {
  const labels: TimelineAddNoteLabels = {
    sendButtonLabel: i18n.t("Send", {
      context: "add timeline note"
    }),
    textInputPlaceholder: i18n.t("Leave your note here...", {
      context: "add timeline note input placeholder"
    })
  };
  return <SduiTimelineAddNote labels={labels} {...props} />;
};

TimelineAddNote.displayName = "TimelineAddNote";
export default TimelineAddNote;
