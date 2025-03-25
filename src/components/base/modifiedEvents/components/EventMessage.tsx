import React from "react";

type EventMessageProps = {
  name: string;
  eventName: string;
  messageType?: number;
  eventtime?: string;
};

const EventMessage: React.FC<EventMessageProps> = ({
  name,
  eventName,
  messageType = 0,
  eventtime,
}) => {
  const messages: string[] = [
    `You have just cancelled your ${eventName} event. We have found a few 
      similar event for you against your today's cancelled event. And 
      one of them is just starting in an ${eventtime?.split(":")[0]} hour and ${
      eventtime?.split(":")[1]
    } minutes drive away.`,

    `As you have just rescheduled your ${eventName} event and your slot is free, 
      we have found alternate events for you. 
      And one of them is just an ${eventtime?.split(":")[0]} hour and ${
      eventtime?.split(":")[1]
    } minutes drive away.`,

    `We have a few similar event for you against your today's cancelled event 
      ${eventName} because of unfavorable conditions. 
      And one of them is just starting in an ${
        eventtime?.split(":")[0]
      } hour and ${eventtime?.split(":")[1]} minutes drive away.`,
  ];

  return (
    <div className="events_messageBox">
      <p className="events_messageBox_para">Hey {name},</p>
      <p className="events_messageBox_subPara">{messages[messageType]}</p>
    </div>
  );
};

export default EventMessage;
