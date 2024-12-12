export interface MessageType {
  sender: "user" | "bot";
  text: string;
  reference?: string;
}
