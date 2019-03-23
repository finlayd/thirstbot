exports.setpoints = function(m,tr, con){
  if (tr.has(m.author.id))
  return;
  con.query(`SELECT * FROM userpointstable WHERE userid = '${m.author.id}'`,(err, rows) => {
    if(err) throw err;
    let sql
    console.log(rows);
    if(rows.length < 1){
      sql = `INSERT INTO userpointstable (userid,userpoints) VALUES ('${m.author.id}',1)`
    } else {
      let points = rows[0].userpoints;

      sql = `UPDATE userpointstable SET userpoints = (${points} + 1) WHERE userid = ${m.author.id}`
    };//endif
    con.query(sql, console.log);
  });
  tr.add(m.author.id);
  setTimeout(() => {
    tr.delete(m.author.id);
}, 180000);
};//end setpoints
