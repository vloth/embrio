/** Types generated for queries found in "src/todo/adapter/sql/todo.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'getTodos' parameters type */
export interface IGetTodosParams {
  done: boolean | null | void;
}

/** 'getTodos' return type */
export interface IGetTodosResult {
  id: number;
  description: string;
  done: boolean;
  duedate: Date | null;
}

/** 'getTodos' query type */
export interface IGetTodosQuery {
  params: IGetTodosParams;
  result: IGetTodosResult;
}

const getTodosIR: any = {"name":"getTodos","params":[{"name":"done","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":59,"b":62,"line":4,"col":33}]}}],"usedParamSet":{"done":true},"statement":{"body":"select * from todo where done = :done","loc":{"a":26,"b":62,"line":4,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * select * from todo where done = :done
 * ```
 */
export const getTodos = new PreparedQuery<IGetTodosParams,IGetTodosResult>(getTodosIR);


