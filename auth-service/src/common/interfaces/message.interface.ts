export interface CodeMessageInterface {
  enum: string;
  number: number;
}

export interface TextMessageInterface {
  developer: string;
  client: string;
}

export interface MessageInterface {
  code: CodeMessageInterface;
  text: TextMessageInterface;
}

export interface MetaPaginationInterface {
  count_page?: number;
  current_page?: number;
  next_page?: number | null;
  previous_page?: number | null;
  per_page?: number;
  from?: number | null;
  to?: number | null;
  total?: number;
}

export interface MetaInterface {
  server_time?: Date;
  has_error?: boolean;
  pagination?: MetaPaginationInterface;
  message: MessageInterface[];
}
