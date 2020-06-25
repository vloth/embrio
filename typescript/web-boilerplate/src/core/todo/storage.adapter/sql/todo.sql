/* @name getTodos */
select * from todo;

/* @name get */
select * from todo where id = :id;

/* @name update*/
update todo
set done=:done, description=:description, duedate=:duedate
where id=:id;

/*
   @name addTodo
   @param todo -> (description, done)
 */
insert into todo(description, done) values :todo returning id;
