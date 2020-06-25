/** Types generated for queries found in "src/core/todo/storage.adapter/sql/todo.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetTodos' parameters type */
export type IGetTodosParams = void;

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

const getTodosIR: any = {"name":"getTodos","params":[],"usedParamSet":{},"statement":{"body":"select * from todo","loc":{"a":21,"b":38,"line":2,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * select * from todo
 * ```
 */
export const getTodos = new PreparedQuery<IGetTodosParams,IGetTodosResult>(getTodosIR);


/** 'Get' parameters type */
export interface IGetParams {
  id: number | null | void;
}

/** 'Get' return type */
export interface IGetResult {
  id: number;
  description: string;
  done: boolean;
  duedate: Date | null;
}

/** 'Get' query type */
export interface IGetQuery {
  params: IGetParams;
  result: IGetResult;
}

const getIR: any = {"name":"get","params":[{"name":"id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":89,"b":90,"line":5,"col":31}]}}],"usedParamSet":{"id":true},"statement":{"body":"select * from todo where id = :id","loc":{"a":58,"b":90,"line":5,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * select * from todo where id = :id
 * ```
 */
export const get = new PreparedQuery<IGetParams,IGetResult>(getIR);


/** 'Update' parameters type */
export interface IUpdateParams {
  done: boolean | null | void;
  description: string | null | void;
  duedate: Date | null | void;
  id: number | null | void;
}

/** 'Update' return type */
export type IUpdateResult = void;

/** 'Update' query type */
export interface IUpdateQuery {
  params: IUpdateParams;
  result: IUpdateResult;
}

const updateIR: any = {"name":"update","params":[{"name":"done","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":134,"b":137,"line":9,"col":10}]}},{"name":"description","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":153,"b":163,"line":9,"col":29}]}},{"name":"duedate","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":175,"b":181,"line":9,"col":51}]}},{"name":"id","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":193,"b":194,"line":10,"col":10}]}}],"usedParamSet":{"done":true,"description":true,"duedate":true,"id":true},"statement":{"body":"update todo\nset done=:done, description=:description, duedate=:duedate\nwhere id=:id","loc":{"a":112,"b":194,"line":8,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * update todo
 * set done=:done, description=:description, duedate=:duedate
 * where id=:id
 * ```
 */
export const update = new PreparedQuery<IUpdateParams,IUpdateResult>(updateIR);


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

const addTodoIR: any = {"name":"addTodo","params":[{"name":"todo","codeRefs":{"defined":{"a":228,"b":231,"line":14,"col":10},"used":[{"a":304,"b":307,"line":16,"col":44}]},"transform":{"type":"pick_tuple","keys":["description","done"]}}],"usedParamSet":{"todo":true},"statement":{"body":"insert into todo(description, done) values :todo returning id","loc":{"a":260,"b":320,"line":16,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * insert into todo(description, done) values :todo returning id
 * ```
 */
export const addTodo = new PreparedQuery<IAddTodoParams,IAddTodoResult>(addTodoIR);


