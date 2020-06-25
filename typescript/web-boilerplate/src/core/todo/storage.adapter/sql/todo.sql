/*
    @name getTodos
 */
select * from todo where done = :done;

/*
   @name addTodo
   @param todo -> (description, done)
 */
INSERT INTO todo(description, done) VALUES :todo returning id;
