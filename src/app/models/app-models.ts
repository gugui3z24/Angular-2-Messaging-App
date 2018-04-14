export interface SentMessage {
  sent_id: number;
  sent_message_body: string;
  sent_message_date_sent: Date;
  sent_message_recipient: string;
  sent_message_sender: string;
  sent_message_subject: string;
}

export interface DraftMessage {
  message_body: string;
  message_date_received: Date;
  message_id: number;
  message_read: string;
  message_recipient: string;
  message_sender: string;
  message_state: string;
  message_subject: string;
}

export interface User {
  user_username: string;
}

export interface Message {
  message_body: string;
  message_date_received: Date;
  message_id: number;
  message_read: string;
  message_recipient: string;
  message_sender: string;
  message_state: string;
  message_subject: string;
}
