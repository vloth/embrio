/** Types generated for queries found in "src/core/todo/storage.adapter/sql/todo.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetTodos' parameters type */
export interface IGetTodosParams {
  done: boolean | null | void;
}

/** 'GetTodos' return type */
export interface IGetTodosResult {
  id: number;
  description: string;
  done: boolean;
  duedate: Date | null;
}

/** 'GetTodos' query type */
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


/** 'AddTodo' parameters type */
export interface IAddTodoParams {
  todo: {
    description: string | null | void,
    done: boolean | null | void
  };
}

/** 'AddTodo' return type */
export interface IAddTodoResult {
  id: number;
}

/** 'AddTodo' query type */
export interface IAddTodoQuery {
  params: IAddTodoParams;
  result: IAddTodoResult;
}

const addTodoIR: any = {"name":"addTodo","params":[{"name":"todo","codeRefs":{"defined":{"a":96,"b":99,"line":8,"col":10},"used":[{"a":172,"b":175,"line":10,"col":44}]},"transform":{"type":"pick_tuple","keys":["description","done"]}}],"usedParamSet":{"todo":true},"statement":{"body":"INSERT INTO todo(description, done) VALUES :todo returning id","loc":{"a":128,"b":188,"line":10,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO todo(description, done) VALUES :todo returning id
 * ```
 */
export const addTodo = new PreparedQuery<IAddTodoParams,IAddTodoResult>(addTodoIR);


